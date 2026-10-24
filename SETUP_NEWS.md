# TIPSSE 自動新聞聚合系統 — 設定指南

這份文件說明如何完整啟用**每日自動抓取太空新聞 + Claude 摘要 + 自動加入 Google Calendar** 的系統。

## 架構總覽

```
GitHub Actions (每天 00:00 UTC = 08:00 台北時間)
   ↓
scripts/aggregate-news.mjs
   ├─ RSS 抓取（NASA / ESA / SpaceNews / JAXA）
   ├─ Claude Agent SDK 生成中文摘要 + 抽取事件
   ├─ 產出 news.json          ← 首頁新聞卡片讀取
   ├─ 產出 news/{id}.html     ← 每則新聞獨立詳細頁（社群分享的目標網址）
   ├─ 產出 .events-queue.json ← 待寫入行事曆的事件
   └─ 產出 .social-queue.json ← 待發到社群的貼文（P3）
   ↓
scripts/sync-calendar.mjs
   └─ Google Calendar API 寫入 TIPSSE 學會行事曆
   ↓
[P3, 未開發] scripts/post-social.mjs
   ├─ FB Graph API → TIPSSE 粉專
   └─ LinkedIn Posts API → TIPSSE Company Page
   ↓
git commit + push → GitHub Pages 自動部署
```

### 流量設計

**所有新聞卡片 / 社群貼文都連到 `tipsse.space/news/{id}.html`**，不直接連到外部新聞來源。
用戶到我們的頁面看完中文摘要後，才能透過「查看原文」按鈕連到 NASA / ESA / SpaceNews 等原網站。

好處：
- 流量留在自己網站
- FB/LinkedIn 分享預覽是我們的品牌（每則新聞獨立 OG image / title）
- 每頁獨立 URL 有利 SEO

## 本機測試（不需要任何 API key / OAuth token）

```bash
npm install
npm run news:dry          # 抓真的 RSS，用原文摘要（免費、快，跳過 Claude）
```

跑完後：
- `news.json` 會更新為真實新聞
- `news/*.html` 會生成每則新聞的獨立詳細頁
- 啟動 `python3 -m http.server 8765` 後打開 `http://localhost:8765/#news` 即可看到

## 上線流程 — 三個步驟

### Step 1：Claude 授權（用你的 Pro/Max 訂閱，不用付 API 費）

**1-1. 在本機 terminal 執行：**
```bash
claude setup-token
```
按照指示登入你的 Claude 帳號，會生成一個長期 OAuth token（`sk-ant-oat01-...`），複製起來。

**1-2. 存到 GitHub Secrets（見 Step 3）**。

> 💡 這個 token 用的是你 Pro/Max 訂閱的額度，不會另外扣 API 費。缺點：會使用你訂閱的 rate limit，每天約 12 次 Claude 呼叫。

### Step 2：建立 Google Service Account（讓程式可以寫入行事曆）

**2-1. 開啟 Google Cloud Console**
- 前往 https://console.cloud.google.com
- 用你的 Google 帳號登入
- 點左上「選取專案」→「新增專案」，名稱：`tipsse-automation`

**2-2. 啟用 Calendar API**
- 左側選單 → `APIs & Services → Library`
- 搜尋 `Google Calendar API` → 點進去 → 按「啟用」

**2-3. 建立 Service Account**
- 左側選單 → `IAM & Admin → Service Accounts`
- 頂端「+ 建立服務帳戶」
- Name: `tipsse-news-bot`
- 角色（Role）可以不選，直接按「完成」
- 建立後點進該帳號 → 上方 `Keys` 分頁 → `Add Key → Create new key → JSON`
- 會自動下載一個 `tipsse-automation-xxxx.json` 檔案，**這是機密金鑰**
- 檔案裡有一個 `client_email` 欄位，長這樣：
  ```
  tipsse-news-bot@tipsse-automation.iam.gserviceaccount.com
  ```
  **記下這個 email**。

**2-4. 把 TIPSSE Calendar 分享給機器人**
- 打開 https://calendar.google.com
- 左側找到「TIPSSE 學會行事曆」
- 滑鼠移到上面 → 點三個點 → `設定和共用`
- 「與特定使用者或群組共用」→ 加入剛剛的 `client_email`
- 權限選「**變更事件**」
- 儲存

### Step 3：把兩個秘密塞進 GitHub Secrets

前往 repo → `Settings → Secrets and variables → Actions → New repository secret`

| Name | Value |
|---|---|
| `CLAUDE_CODE_OAUTH_TOKEN` | Step 1 拿到的 `sk-ant-oat01-...` |
| `GOOGLE_SERVICE_ACCOUNT_JSON` | Step 2-3 下載的 JSON 檔案**整個內容**（複製貼上） |

（選填）如果要換成別的 Calendar：

| Name | Value |
|---|---|
| `TIPSSE_CALENDAR_ID` | Google Calendar 設定頁裡的「日曆 ID」 |

## 本機完整流程測試

如果你已經拿到 OAuth token + Service Account JSON，可以在本機跑完整版：

```bash
# 匯出環境變數
export CLAUDE_CODE_OAUTH_TOKEN="sk-ant-oat01-..."
export GOOGLE_SERVICE_ACCOUNT_JSON="/path/to/tipsse-automation-xxxx.json"

# 抓新聞 + Claude 摘要（會產生 .events-queue.json + .social-queue.json）
npm run news

# 把事件塞進 Google Calendar
npm run calendar

# 或先 dry-run 看看要塞什麼
npm run calendar:dry
```

如果你在本機已用 Claude Code 登入（`claude` 指令可正常使用），SDK 會自動繼承你的認證，`CLAUDE_CODE_OAUTH_TOKEN` 可以不設。

## GitHub Actions 觸發

- **自動：** 每天 00:00 UTC（08:00 台北時間）
- **手動：** GitHub repo → `Actions → Daily Space News Aggregation → Run workflow`
  - 可勾選 `dry_run` 只跑 RSS 抓取，不呼叫 Claude / Calendar

## 費用估算

| 項目 | 每月成本 |
|---|---|
| Claude Agent SDK（用你 Pro/Max 訂閱） | **$0**（走訂閱額度） |
| Google Calendar API | 免費 |
| GitHub Actions（公開 repo） | 免費 |
| **合計** | **$0** |

## P3 準備：FB + LinkedIn 自動發文（未開發）

### 你要先準備的事

**FB 粉專**
1. 建立 TIPSSE FB 粉專（若還沒有）
2. 到 https://developers.facebook.com/apps 建立 App
3. 用 Graph API Explorer 取得「Page Access Token」（記得換成 long-lived token）
4. 把 Page ID + Access Token 記下來

**LinkedIn Company Page**
- ✅ 你已經有 Company Page（ID: `82095530`）
- 需要：到 https://developer.linkedin.com 註冊 Developer App
- 需要：申請 Marketing Developer Platform 存取權（**審核 1-2 週**）
- 審核過後：走 OAuth 流程取得 access token（含 `w_organization_social` scope）

準備好後告訴我，我會建 `scripts/post-social.mjs` 串接。

## 常見問題

**Q: 新聞卡片圖片會不會被原網站告？**
沒有搬圖片。程式只**連結到**原新聞 RSS 中的 OG image URL（就是網頁分享時會出現的縮圖）。RSS 本來就是設計來被機器讀取的，這符合合理使用。若原網站無 OG image，我們用**自動生成的 SVG 品牌卡片**（TIPSSE 自己設計的）取代，不涉及第三方圖片版權。

**Q: 事件抽取會不會抓錯？**
Claude 已被指示「寧可漏抓，不要亂猜」。系統 Prompt 明訂：只抓明確未來時程、不抓模糊字眼、時間不確定就不抓。行事曆上的事件說明會註明「由 AI 從新聞抽取，實際時間請以官方公告為準」。

**Q: 想暫停自動更新怎麼辦？**
- 短期：GitHub → `Actions → Daily Space News Aggregation → ... → Disable workflow`
- 立刻停止行事曆寫入：Google Calendar 設定 → 移除機器人 email 的共用權限

**Q: 想加更多新聞來源？**
編輯 `scripts/aggregate-news.mjs` 頂端的 `SOURCES` 陣列即可。

**Q: 舊的 news/xxx.html 會不會越積越多？**
會 — 這是故意的。每則新聞的獨立頁保留下來對 SEO 有利、也讓社群貼文的連結永遠可打開。之後可以考慮加個「新聞封存」頁面列出全部歷史文章。
