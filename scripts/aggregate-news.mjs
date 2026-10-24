#!/usr/bin/env node
/**
 * aggregate-news.mjs
 *
 * Fetches RSS feeds from configured space-news sources, optionally passes each
 * item through Claude Haiku to (a) rewrite a zh-TW summary and (b) extract any
 * upcoming event mentioned in the body, then writes ../news.json.
 *
 * Modes:
 *   --dry-run          Skip Claude; use raw RSS description as summary; no event extraction.
 *   (default)          Uses Claude Agent SDK (subscription-based via
 *                      CLAUDE_CODE_OAUTH_TOKEN, or your local Claude Code auth).
 *
 * Env:
 *   CLAUDE_CODE_OAUTH_TOKEN   Long-lived OAuth token for Claude Code subscription.
 *                             Get one with:  claude setup-token
 *                             (Not needed if running locally with claude already
 *                             authenticated — SDK inherits the auth.)
 *   MAX_ITEMS                 Max items to keep in news.json (default 15)
 *   PER_SOURCE_LIMIT          Max items per source per run (default 3)
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { XMLParser } from 'fast-xml-parser';
import { query } from '@anthropic-ai/claude-agent-sdk';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const NEWS_JSON = path.join(ROOT, 'news.json');
const EVENTS_QUEUE = path.join(ROOT, '.events-queue.json');
const SOCIAL_QUEUE = path.join(ROOT, '.social-queue.json');
const NEWS_DIR = path.join(ROOT, 'news');
const SITE_ORIGIN = 'https://tipsse.space';

const DRY_RUN = process.argv.includes('--dry-run');
const MAX_ITEMS = Number(process.env.MAX_ITEMS || 15);
const PER_SOURCE_LIMIT = Number(process.env.PER_SOURCE_LIMIT || 3);

const SOURCES = [
  { name: 'NASA',      url: 'https://www.nasa.gov/news-release/feed/' },
  { name: 'ESA',       url: 'https://www.esa.int/rssfeed/Our_Activities/Space_News' },
  { name: 'SpaceNews', url: 'https://spacenews.com/feed/' },
  { name: 'JAXA',      url: 'https://global.jaxa.jp/rss/press.rdf' },
  // TASA 官網為 Next.js SPA，目前無公開 RSS，先略過。
];

// ──────────────────────────────────────────────────────────
// RSS fetching + parsing
// ──────────────────────────────────────────────────────────
const xmlParser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '',
  removeNSPrefix: true,
  parseTagValue: false,
  trimValues: true,
});

function stripHtml(html) {
  if (!html) return '';
  return String(html)
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(+n))
    .replace(/\s+/g, ' ')
    .trim();
}

function firstOgImage(html) {
  if (!html) return null;
  const m = String(html).match(/<img[^>]+src=["']([^"']+)["']/i);
  return m ? m[1] : null;
}

function pickString(v) {
  if (typeof v === 'string') return v;
  if (v && typeof v === 'object') return v['#text'] || v['@_text'] || '';
  return '';
}

async function fetchRss(source) {
  try {
    const res = await fetch(source.url, {
      headers: { 'User-Agent': 'TIPSSE-NewsBot/1.0 (+https://tipsse.space)' },
      signal: AbortSignal.timeout(20_000),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const xml = await res.text();
    const parsed = xmlParser.parse(xml);

    let items = [];
    if (parsed.rss?.channel?.item) items = arr(parsed.rss.channel.item);
    else if (parsed.feed?.entry)   items = arr(parsed.feed.entry);
    else if (parsed.RDF?.item)     items = arr(parsed.RDF.item);

    return items.slice(0, PER_SOURCE_LIMIT).map(it => {
      const link = pickString(it.link) || it.link?.href || '';
      const title = stripHtml(pickString(it.title));
      const rawBody = pickString(it.description) || pickString(it.summary) || pickString(it.content) || '';
      const body = stripHtml(rawBody);
      const pubDate = pickString(it.pubDate) || pickString(it.published) || pickString(it.date) || pickString(it.updated) || '';
      const image = firstOgImage(rawBody) || (it.enclosure?.url ?? null);

      return {
        source: source.name,
        title,
        raw_summary: body.slice(0, 800),
        url: link,
        published_at: pubDate ? new Date(pubDate).toISOString() : new Date().toISOString(),
        image: image || null,
      };
    }).filter(i => i.title && i.url);
  } catch (e) {
    console.warn(`  ⚠ ${source.name} failed:`, e.message);
    return [];
  }
}

function arr(v) { return Array.isArray(v) ? v : [v]; }

// ──────────────────────────────────────────────────────────
// Claude Agent SDK — summarise + extract event (uses subscription)
// ──────────────────────────────────────────────────────────
const SYSTEM_PROMPT = `你是一位太空科技新聞編輯，服務於「中華民國行星科學系統工程學會」（TIPSSE）。
你的工作是把英文太空新聞改寫成 2-3 句流暢、準確的繁體中文摘要，並辨識新聞中提到的具體時程事件。

輸出必須是嚴格 JSON（不要加 markdown code fence、不要多餘說明文字），格式如下：
{
  "summary_zh": "2-3 句繁體中文摘要，不含 emoji 或誇飾語。",
  "event": null | {
    "title": "事件名稱（繁中）",
    "datetime_iso": "YYYY-MM-DDTHH:mm:ss+00:00（若只有日期給 00:00 UTC）",
    "datetime_precision": "day" | "hour" | "minute",
    "location": "地點（若原文有提到，繁中或英文；沒有就填 null）"
  }
}

事件抽取規則：
- 只抽取「明確未來時程」：火箭發射、太空船抵達、研討會、徵件截止、任務發射窗口等。
- 過去已發生的事件不抽取（event=null）。
- 若時間只有「本週」「下個月」等模糊字眼，event=null。
- 若時間是範圍（例：Oct 12–16），取起始日。
- 若對日期不確定，寧可 event=null。`;

function extractJson(text) {
  if (!text) return null;
  const stripped = text.replace(/^```(?:json)?\s*|\s*```$/g, '').trim();
  try { return JSON.parse(stripped); } catch {}
  const start = stripped.indexOf('{');
  const end = stripped.lastIndexOf('}');
  if (start >= 0 && end > start) {
    try { return JSON.parse(stripped.slice(start, end + 1)); } catch {}
  }
  return null;
}

async function callClaude(item) {
  const userPrompt = `【新聞來源】${item.source}
【原文標題】${item.title}
【發布時間】${item.published_at}
【原文摘要】${item.raw_summary}

請輸出 JSON（不要包 code fence，直接純 JSON）。`;

  let responseText = '';
  const iter = query({
    prompt: userPrompt,
    options: {
      systemPrompt: SYSTEM_PROMPT,
      model: 'claude-haiku-4-5-20251001',
      maxTurns: 1,
      allowedTools: [],
      permissionMode: 'bypassPermissions',
    },
  });

  for await (const msg of iter) {
    if (msg.type === 'assistant' && msg.message?.content) {
      for (const block of msg.message.content) {
        if (block.type === 'text') responseText += block.text;
      }
    }
  }

  const parsed = extractJson(responseText);
  if (!parsed) {
    console.warn('  ⚠ Claude output not valid JSON:', responseText.slice(0, 200));
    return { summary_zh: item.raw_summary.slice(0, 200), event: null };
  }
  return parsed;
}

// ──────────────────────────────────────────────────────────
// Detail page generation — one HTML per news item
// ──────────────────────────────────────────────────────────
const SOURCE_COLORS = {
  NASA:      ['#0b3d91', '#fc3d21'],
  ESA:       ['#003247', '#0068b3'],
  SpaceNews: ['#1a1a2e', '#e94560'],
  JAXA:      ['#003876', '#c8102e'],
  TASA:      ['#004b87', '#00a3e0'],
  default:   ['#161d2e', '#4f8ef7'],
};

function svgPlaceholder(item) {
  const [c1, c2] = SOURCE_COLORS[item.source] || SOURCE_COLORS.default;
  const stars = Array.from({ length: 30 }, () => {
    const x = Math.random() * 400, y = Math.random() * 225, r = Math.random() * 1.2 + 0.3;
    const o = (Math.random() * 0.7 + 0.3).toFixed(2);
    return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(2)}" fill="#fff" opacity="${o}"/>`;
  }).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 225" preserveAspectRatio="xMidYMid slice">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/>
      </linearGradient>
      <radialGradient id="glow" cx="0.75" cy="0.25" r="0.6">
        <stop offset="0" stop-color="#fff" stop-opacity="0.35"/>
        <stop offset="1" stop-color="#fff" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="400" height="225" fill="url(#g)"/>
    <rect width="400" height="225" fill="url(#glow)"/>
    ${stars}
    <text x="20" y="205" font-family="Inter, sans-serif" font-size="11" font-weight="600" fill="#fff" opacity="0.9" letter-spacing="1.5">${item.source || 'SPACE'}</text>
    <text x="20" y="30"  font-family="Inter, sans-serif" font-size="9" fill="#fff" opacity="0.6" letter-spacing="2">TIPSSE · SPACE NEWS</text>
  </svg>`;
}

function htmlEsc(s) {
  return String(s ?? '').replace(/[&<>"']/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]));
}

function fmtDateZh(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  if (isNaN(d)) return '';
  return d.toLocaleDateString('zh-TW', { year: 'numeric', month: '2-digit', day: '2-digit' });
}

function renderDetailPage(item) {
  const permalink = `${SITE_ORIGIN}/news/${item.id}.html`;
  const ogImage = item.image || `${SITE_ORIGIN}/og-image.png`;
  const heroMedia = item.image
    ? `<img src="${htmlEsc(item.image)}" alt="${htmlEsc(item.title)}"/>`
    : svgPlaceholder(item);
  const aiBadge = (!item.image || item.image_ai_generated)
    ? `<span class="ai-badge">AI illustration</span>` : '';
  const eventBlock = item.event ? `
    <div class="detail-event">
      <svg viewBox="0 0 22 22" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><rect x="2" y="4" width="18" height="16" rx="2"/><path d="M2 9h18M7 1v4M15 1v4"/></svg>
      <div class="detail-event-body">
        <div class="detail-event-title">📅 相關事件</div>
        <div class="detail-event-name">${htmlEsc(item.event.title)}</div>
        <div class="detail-event-when">${htmlEsc(fmtDateZh(item.event.datetime))}${item.event.location ? ' · ' + htmlEsc(item.event.location) : ''}</div>
      </div>
    </div>` : '';

  return `<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${htmlEsc(item.title)} — TIPSSE 太空快訊</title>
  <meta name="description" content="${htmlEsc(item.summary.slice(0, 160))}"/>
  <meta name="robots" content="index, follow"/>
  <link rel="canonical" href="${permalink}"/>

  <meta property="og:type" content="article"/>
  <meta property="og:title" content="${htmlEsc(item.title)}"/>
  <meta property="og:description" content="${htmlEsc(item.summary.slice(0, 200))}"/>
  <meta property="og:image" content="${htmlEsc(ogImage)}"/>
  <meta property="og:url" content="${permalink}"/>
  <meta property="og:site_name" content="TIPSSE 中華民國行星科學系統工程學會"/>
  <meta property="og:locale" content="zh_TW"/>
  <meta property="article:published_time" content="${htmlEsc(item.published_at)}"/>
  <meta property="article:section" content="${htmlEsc(item.source)}"/>

  <meta name="twitter:card" content="summary_large_image"/>
  <meta name="twitter:title" content="${htmlEsc(item.title)}"/>
  <meta name="twitter:description" content="${htmlEsc(item.summary.slice(0, 200))}"/>
  <meta name="twitter:image" content="${htmlEsc(ogImage)}"/>

  <link rel="icon" type="image/png" href="../logo-icon.png"/>
  <link rel="stylesheet" href="../style.css"/>
  <link rel="stylesheet" href="../news-detail.css"/>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Noto+Sans+TC:wght@300;400;500;700&display=swap" rel="stylesheet"/>

  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": ${JSON.stringify(item.title)},
    "description": ${JSON.stringify(item.summary.slice(0, 240))},
    "datePublished": "${item.published_at}",
    "url": "${permalink}",
    "image": "${ogImage}",
    "publisher": {
      "@type": "Organization",
      "name": "TIPSSE 中華民國行星科學系統工程學會",
      "logo": { "@type": "ImageObject", "url": "${SITE_ORIGIN}/logo-blue.png" }
    },
    "isBasedOn": ${JSON.stringify(item.url)},
    "articleSection": ${JSON.stringify(item.source)}
  }
  </script>
</head>
<body class="news-detail-page">

  <nav class="detail-nav">
    <div class="container">
      <a href="../index.html" class="detail-nav-logo">
        <img src="../logo-icon.png" alt="TIPSSE"/>
        <span class="detail-nav-logo-text">TIPSSE 太空快訊</span>
      </a>
      <a href="../index.html#news" class="detail-nav-back">
        <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M9 3L5 7l4 4"/></svg>
        返回新聞列表
      </a>
    </div>
  </nav>

  <article class="news-detail-article">
    <div class="detail-meta">
      <span class="source-badge">${htmlEsc(item.source)}</span>
      <time datetime="${item.published_at}">${fmtDateZh(item.published_at)}</time>
    </div>

    <h1>${htmlEsc(item.title)}</h1>

    <div class="detail-hero">
      ${heroMedia}
      ${aiBadge}
    </div>

    <div class="detail-summary">${htmlEsc(item.summary)}</div>

    ${eventBlock}

    <div class="detail-source-cta">
      <a href="${htmlEsc(item.url)}" target="_blank" rel="noopener noreferrer" class="cta-btn">
        查看 ${htmlEsc(item.source)} 原文
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M6 3H3v10h10V10M9 3h4v4M13 3L7 9"/></svg>
      </a>
      <p class="detail-source-note">
        本文摘要由 TIPSSE 新聞聚合系統自動翻譯整理，內容以原文為準。<br/>
        新聞著作權屬 ${htmlEsc(item.source)}。
      </p>
    </div>

    <div class="detail-join-cta">
      <h3>喜歡我們的太空快訊？</h3>
      <p>加入 TIPSSE 中華民國行星科學系統工程學會，深入探索太空科技與行星科學。</p>
      <div class="join-btns">
        <a href="../index.html#contact" class="join-btn primary">加入學會</a>
        <a href="../index.html#projects" class="join-btn ghost">查看專案</a>
      </div>
    </div>
  </article>

  <footer class="detail-footer">
    <div class="container">
      <a href="../index.html">TIPSSE 中華民國行星科學系統工程學會</a> ·
      <a href="../index.html#news">太空新聞</a> ·
      <a href="../index.html#contact">聯絡我們</a>
      <br/>
      © ${new Date().getUTCFullYear()} TIPSSE. All rights reserved.
    </div>
  </footer>

</body>
</html>`;
}

async function writeDetailPages(items) {
  await fs.mkdir(NEWS_DIR, { recursive: true });
  let written = 0;
  for (const item of items) {
    const filePath = path.join(NEWS_DIR, `${item.id}.html`);
    await fs.writeFile(filePath, renderDetailPage(item), 'utf-8');
    written++;
  }
  return written;
}

// ──────────────────────────────────────────────────────────
// Main
// ──────────────────────────────────────────────────────────
function hashId(source, url) {
  let h = 0;
  const s = `${source}|${url}`;
  for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0;
  return `n${Math.abs(h).toString(36)}`;
}

async function loadExisting() {
  try {
    const raw = await fs.readFile(NEWS_JSON, 'utf-8');
    const j = JSON.parse(raw);
    return Array.isArray(j.items) ? j.items : [];
  } catch { return []; }
}

async function main() {
  console.log(`\n📡 TIPSSE news aggregation — ${DRY_RUN ? 'DRY RUN (no Claude)' : 'LIVE'}\n`);

  if (!DRY_RUN && !process.env.CLAUDE_CODE_OAUTH_TOKEN && !process.env.ANTHROPIC_API_KEY) {
    console.warn('⚠  No CLAUDE_CODE_OAUTH_TOKEN — SDK will fall back to local Claude Code auth.');
    console.warn('   If that also fails, run:  claude setup-token');
  }

  const existing = await loadExisting();
  const existingUrls = new Set(existing.map(i => i.url));

  const allFetched = [];
  for (const src of SOURCES) {
    console.log(`→ ${src.name}`);
    const items = await fetchRss(src);
    console.log(`  fetched ${items.length}`);
    allFetched.push(...items);
  }

  const fresh = allFetched.filter(i => !existingUrls.has(i.url));
  console.log(`\n🆕 ${fresh.length} new items (of ${allFetched.length} fetched)`);

  const newEvents = [];
  const processed = [];

  for (const item of fresh) {
    let summary = item.raw_summary.slice(0, 220);
    let event = null;

    if (!DRY_RUN) {
      try {
        console.log(`  ✨ Claude: ${item.title.slice(0, 55)}…`);
        const out = await callClaude(item);
        summary = out.summary_zh || summary;
        event = out.event || null;
      } catch (e) {
        console.warn(`  ⚠ Claude failed: ${e.message}`);
      }
    }

    const id = hashId(item.source, item.url);
    processed.push({
      id,
      source: item.source,
      title: item.title,
      summary,
      url: item.url,
      published_at: item.published_at,
      image: item.image,
      image_ai_generated: !item.image,
      event: event ? {
        title: event.title,
        datetime: event.datetime_iso,
        location: event.location || null,
      } : null,
    });

    if (event) {
      newEvents.push({
        news_id: id,
        source: item.source,
        source_url: item.url,
        title: event.title,
        datetime: event.datetime_iso,
        precision: event.datetime_precision || 'day',
        location: event.location || null,
      });
    }
  }

  const merged = [...processed, ...existing]
    .sort((a, b) => new Date(b.published_at) - new Date(a.published_at))
    .slice(0, MAX_ITEMS);

  const payload = {
    generated_at: new Date().toISOString(),
    items: merged,
  };

  await fs.writeFile(NEWS_JSON, JSON.stringify(payload, null, 2), 'utf-8');
  console.log(`\n✅ Wrote ${NEWS_JSON} (${merged.length} items)`);

  // Write per-item detail pages for all items on the homepage (not only new ones)
  // so every homepage card has a valid permalink target.
  const wrote = await writeDetailPages(merged);
  console.log(`📄 Wrote ${wrote} detail pages → ${NEWS_DIR}/`);

  if (newEvents.length) {
    await fs.writeFile(EVENTS_QUEUE, JSON.stringify(newEvents, null, 2), 'utf-8');
    console.log(`📅 Queued ${newEvents.length} events → ${EVENTS_QUEUE}`);
    console.log(`   (run: npm run calendar   to push to Google Calendar)`);
  } else {
    await fs.rm(EVENTS_QUEUE, { force: true });
    console.log('📅 No new events extracted.');
  }

  // Queue for social posting (P3): newest processed items with permalinks
  if (processed.length) {
    const socialItems = processed.map(i => ({
      news_id: i.id,
      source: i.source,
      title: i.title,
      summary: i.summary,
      permalink: `${SITE_ORIGIN}/news/${i.id}.html`,
      image: i.image || null,
      event: i.event,
    }));
    await fs.writeFile(SOCIAL_QUEUE, JSON.stringify(socialItems, null, 2), 'utf-8');
    console.log(`📢 Queued ${socialItems.length} items → ${SOCIAL_QUEUE} (P3 social posting)`);
  } else {
    await fs.rm(SOCIAL_QUEUE, { force: true });
  }
}

main().catch(e => {
  console.error('\n❌ Fatal:', e);
  process.exit(1);
});
