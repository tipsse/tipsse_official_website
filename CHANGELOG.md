# Changelog

All notable changes to the TIPSSE official website.

---

## [Unreleased]

### In progress — 太空新聞（尚未上線，僅存在於本機工作區）
自動彙整太空新聞的功能已完成開發但**刻意未提交**，等內容與維運人力到位後再發布。
未提交的部分包含：
- `index.html` — 導覽列「太空新聞」連結、`#news` 區塊
- `main.js` — `news.*` 中英文翻譯字串、`initNews()` 渲染程式（含來源色票、SVG 佔位圖生成、來源篩選）
- `style.css` — `.news-*` 系列樣式
- `news.json`、`news/`（12 篇已生成的內容）、`news-detail.css`
- `scripts/aggregate-news.mjs` — 每日彙整腳本
- `.github/workflows/news-aggregation.yml` — 每日 08:00（台北）自動執行的 GitHub Actions
- `package.json` / `package-lock.json` — 上述腳本的相依套件

發布前待辦：確認新聞來源授權與 AI 摘要免責聲明措辭、確認 Actions 的 API 金鑰設定。

### Planned
- Member profile section
- Membership application flow
- SEO meta tags & Open Graph
- Favicon from logo icon
- Instagram / Facebook 官方帳號開通後，取消 `index.html` 聯絡區的註解並補上連結
- `tipsse.contact@epchu.uk` 信箱建置

---

## [0.4.0] — 2026-07-19

### Changed
- 聯絡區改版：移除「官方網站」卡片（連向站內自身，無實質作用），改為 Email 卡片
- 聯絡卡片改為橫向窄卡（icon 左、文字右），高度約減半，改善留白比例失衡
- 整張卡片改為 `<a>` 元素，點擊熱區涵蓋整塊；hover 時邊框變亮、上浮並加陰影，補足原本缺乏的可點擊提示
- 聯絡卡片文案精簡：LinkedIn / Facebook 由「TIPSSE LinkedIn」「TIPSSE 粉絲專頁」統一縮短為「TIPSSE」，避免與上方標籤重複
- LinkedIn 連結指向 https://www.linkedin.com/company/tipsse/
- 頁尾版權年份由固定的 `© 2024` 改為 `© 2021–<當年>`，結束年份改用 `new Date().getFullYear()` 動態產生，免除每年手動更新（HTML 內保留靜態年份作為 JS 未載入時的 fallback）
- Hero 區放寬版面：`.hero-content` 700px → 880px、`.hero-subtitle` 560px → 700px、標題字級微調為 `clamp(2.2rem, 5.2vw, 4.2rem)`

### Removed
- `contact.web.h4`、`contact.li.a`、`contact.fb.a` 三組已無元素引用的 i18n 字串
- Instagram / Facebook 聯絡卡片暫時註解（帳號尚未開通，連結為 `#` 會造成點擊無反應）

---

## [0.3.0] — 2026-03-30

### Added
- Official TIPSSE logo placed in Navbar, Hero section, and Footer
- Logo background removed using luminosity-based alpha extraction (Pillow)
- Two logo variants generated: `logo-white.png` (white/transparent) and `logo-blue.png` (accent blue #4f8ef7)
- `TODO.md` and `CHANGELOG.md` for project tracking

### Changed
- Switched all `logo.png` references to `logo-blue.png`
- Removed `mix-blend-mode: screen` hack — no longer needed with proper transparency
- Hero logo size increased to 60px height for better visibility

---

## [0.2.0] — 2026-03-30

### Added
- Full Chinese / English language toggle button in Navbar
- `data-i18n` and `data-i18n-html` attribute system for all translatable elements
- Language preference persisted in `localStorage`
- Complete English translation for all sections
- Hero title overflow fix for long English text (`clamp` font-size, `max-width` subtitle)

### Changed
- Navbar layout: added `.nav-right` wrapper for lang button + hamburger menu

---

## [0.1.0] — 2026-03-30

### Added
- Initial website build — single-page frontend, no framework dependencies
- **Sections:** Hero, About, Four Groups, Projects, Roadmap (5 phases), Events, Contact, Footer
- Dark space theme with CSS custom properties
- Animated starfield (JS canvas-free, pure DOM)
- Scroll-triggered entry animations via `IntersectionObserver`
- Animated number counters in About stats
- Responsive design (mobile hamburger menu, fluid typography with `clamp`)
- GitHub Actions workflow (`.github/workflows/deploy.yml`) for automatic GitHub Pages deployment
- Local dev server via `python3 -m http.server 3333`

### Content
- Organization info sourced and adapted from tipsse.org
- Roadmap: 5 phases from 2019 foundation to 2028+ deep space goals
- Activity log: 5 events from 2022–2023
