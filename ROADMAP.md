# TIPSSE Website — Roadmap

## 已完成 Done ✅

### 頁面與內容
- [x] 主頁 `index.html` — Hero、About、Groups、Projects、Roadmap、Events、Contact、Footer
- [x] MBSE 工具頁 `mbse.html` — 工具介紹、功能展示、Getting Started
- [x] 太空學院頁 `space-academy.html` — 太空人統計、Chart.js 圖表、台灣連結
- [x] ROC 假日行事曆頁 `calendar.html` — 互動月曆、2025–2026 節假日

### 中英雙語 (i18n)
- [x] Navbar 語言切換按鈕
- [x] `localStorage` 記憶使用者語言偏好
- [x] 300+ 翻譯 key，`data-i18n` / `data-i18n-html` / `data-i18n-placeholder` 三種模式

### 會員系統
- [x] 登入 Modal（一般會員 / 理監事兩級密碼）
- [x] 理監事可上傳照片（含說明文字）、文件（PDF / Office）
- [x] 理監事可新增 / 刪除會議記錄
- [x] 照片 Lightbox 預覽
- [x] IndexedDB 客戶端儲存（含圖片壓縮）

### 互動 & 動畫
- [x] 星空粒子背景動畫（160 顆星，純 DOM）
- [x] Scroll 觸發進場動畫（IntersectionObserver）
- [x] 數字計數器動畫（About 區塊統計數字）
- [x] 手機版漢堡選單（RWD）
- [x] Navbar 滾動 active 高亮
- [x] Smooth anchor 捲動

### 技術基礎設施
- [x] 官方 logo 去背（藍色版 `logo-blue.png`）
- [x] GitHub Actions 自動部署至 GitHub Pages
- [x] Chart.js 4.4.0 + DataLabels plugin 視覺化圖表
- [x] Google Calendar 嵌入（會員專區）

---

## 待修復 Fix 🔴

- [ ] **聯絡連結全部是 `href="#"`** — LinkedIn、Instagram、Facebook 三個按鈕無效，需填入正確網址
- [ ] **聯絡方式缺失** — Contact 區塊沒有 email 或表單，使用者無法聯絡
- [ ] **Events 資料過期** — 5 筆活動都是 2022–2023 年舊資料，需更新或新增近期活動
- [ ] **`og-image.png` 未連結** — 圖片已存在但沒有放進 `<meta>` tag
- [ ] **`tagline.png` / `logo-white.png` 未使用** — 存在於資料夾但無引用

---

## 進行中 In Progress 🟡

- [ ] 補上 LinkedIn / Instagram / Facebook 正確連結
- [ ] 補上聯絡 Email 或聯絡表單

---

## 待辦 Backlog ⚪

### SEO / 基礎
- [ ] 加入 `og:title`、`og:description`、`og:image` meta tags
- [ ] 加入 `<link rel="icon">` favicon（使用 `logo-icon.png`）
- [ ] 加入 `robots.txt` 與 sitemap
- [ ] 補充 `README.md`（目前幾乎空白，需補部署與開發說明）

### 頁面 / 內容
- [ ] 成員介紹頁面或區塊
- [ ] 入會申請流程說明
- [ ] 最新消息動態 feed 或獨立新聞頁

### UI / UX
- [ ] 手機版 Roadmap 排版優化
- [ ] 深色 / 淺色模式切換（optional）

### 數據 / 分析
- [ ] Google Analytics 整合

---

## 已知限制 Known Limitations

- 密碼明碼寫在前端原始碼中（靜態網站限制，需後端才能加強）
- 無密碼重設或會員申請流程（需後端支援）
- 會員上傳資料只存於 IndexedDB，清除瀏覽器資料即消失
