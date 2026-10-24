#!/usr/bin/env node
/**
 * sync-calendar.mjs
 *
 * Reads ../.events-queue.json (produced by aggregate-news.mjs) and pushes each
 * event into the TIPSSE Google Calendar via Google Calendar API. Uses a stable
 * iCalUID per (news_id, datetime) so re-runs update rather than duplicate.
 *
 * Modes:
 *   --dry-run          Show what would be inserted; skip API calls.
 *   (default)          Requires GOOGLE_SERVICE_ACCOUNT_JSON.
 *
 * Env:
 *   GOOGLE_SERVICE_ACCOUNT_JSON   Path to service-account key file
 *                                 OR the raw JSON string.
 *   TIPSSE_CALENDAR_ID            Target calendar ID (defaults to the TIPSSE one).
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { JWT } from 'google-auth-library';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const EVENTS_QUEUE = path.join(ROOT, '.events-queue.json');

const DRY_RUN = process.argv.includes('--dry-run');
const CALENDAR_ID = process.env.TIPSSE_CALENDAR_ID
  || '3d6c9581fe93538c22cbce53135a86e97a9bc3ec484ccca2acbc6077123000a2@group.calendar.google.com';

async function loadCredentials() {
  const val = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (!val) throw new Error('GOOGLE_SERVICE_ACCOUNT_JSON not set (path or raw JSON).');
  if (val.trim().startsWith('{')) return JSON.parse(val);
  const raw = await fs.readFile(val, 'utf-8');
  return JSON.parse(raw);
}

async function getAuthClient() {
  const creds = await loadCredentials();
  const jwt = new JWT({
    email: creds.client_email,
    key: creds.private_key,
    scopes: ['https://www.googleapis.com/auth/calendar.events'],
  });
  await jwt.authorize();
  return jwt;
}

function buildEventBody(ev) {
  const start = new Date(ev.datetime);
  const precision = ev.precision || 'day';

  let startBody, endBody;
  if (precision === 'day') {
    const y = start.getUTCFullYear();
    const m = String(start.getUTCMonth() + 1).padStart(2, '0');
    const d = String(start.getUTCDate()).padStart(2, '0');
    const dateStr = `${y}-${m}-${d}`;
    const next = new Date(start); next.setUTCDate(next.getUTCDate() + 1);
    const ny = next.getUTCFullYear();
    const nm = String(next.getUTCMonth() + 1).padStart(2, '0');
    const nd = String(next.getUTCDate()).padStart(2, '0');
    startBody = { date: dateStr };
    endBody   = { date: `${ny}-${nm}-${nd}` };
  } else {
    const end = new Date(start.getTime() + 60 * 60 * 1000);
    startBody = { dateTime: start.toISOString(), timeZone: 'Asia/Taipei' };
    endBody   = { dateTime: end.toISOString(),   timeZone: 'Asia/Taipei' };
  }

  const iCalUID = `tipsse-news-${ev.news_id}-${start.getTime()}@tipsse.space`;

  return {
    iCalUID,
    summary: `[${ev.source}] ${ev.title}`,
    description: `自動由 TIPSSE 新聞聚合系統加入\n\n來源：${ev.source}\n原文連結：${ev.source_url}\n\n※ 由 Claude 從新聞內容抽取，實際時間請以官方公告為準。`,
    location: ev.location || undefined,
    source: { title: ev.source, url: ev.source_url },
    extendedProperties: {
      private: { tipsseNewsId: ev.news_id, tipsseSource: ev.source },
    },
  };
}

async function upsertEvent(auth, ev) {
  const body = buildEventBody(ev);
  const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(CALENDAR_ID)}/events/import`;

  const res = await auth.request({
    url,
    method: 'POST',
    data: body,
  });
  return res.data;
}

async function main() {
  console.log(`\n📅 TIPSSE calendar sync — ${DRY_RUN ? 'DRY RUN' : 'LIVE'}`);
  console.log(`   calendar: ${CALENDAR_ID}\n`);

  let queue;
  try {
    queue = JSON.parse(await fs.readFile(EVENTS_QUEUE, 'utf-8'));
  } catch {
    console.log('ℹ  No .events-queue.json — nothing to sync. Exiting.');
    return;
  }
  if (!Array.isArray(queue) || queue.length === 0) {
    console.log('ℹ  Queue empty — nothing to sync.');
    return;
  }

  if (DRY_RUN) {
    for (const ev of queue) {
      const body = buildEventBody(ev);
      console.log(`  📆 ${body.summary}`);
      console.log(`     ${JSON.stringify(body.start || {})}   ${ev.location || ''}`);
    }
    console.log(`\n✅ (dry-run) would insert ${queue.length} events.`);
    return;
  }

  const auth = await getAuthClient();
  let ok = 0, fail = 0;
  for (const ev of queue) {
    try {
      const result = await upsertEvent(auth, ev);
      console.log(`  ✓ ${ev.title} → ${result.htmlLink || result.id}`);
      ok++;
    } catch (e) {
      console.warn(`  ✗ ${ev.title}: ${e.response?.data?.error?.message || e.message}`);
      fail++;
    }
  }

  console.log(`\n✅ Done: ${ok} inserted/updated, ${fail} failed.`);
  if (ok > 0) {
    await fs.rm(EVENTS_QUEUE, { force: true });
  }
}

main().catch(e => {
  console.error('\n❌ Fatal:', e);
  process.exit(1);
});
