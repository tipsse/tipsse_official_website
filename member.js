// ══════════════════════════════════════════════════════════════════════
// 會員專區 — 暫停開發（Dormant）
// ══════════════════════════════════════════════════════════════════════
//
// 【現況】此檔案不被任何頁面載入，網站上不會出現。保留於版控供日後接後端時沿用。
//
// 【為何暫停】原本以前端常數 MEMBER_PASS / BOARD_PASS 做密碼驗證，但純靜態網站
//   的 JS 一律會送到瀏覽器，密碼等同公開在原始碼中，且驗證邏輯本身可被繞過
//   （改 sessionStorage 即可偽造身分）。前端無法實作真正的存取控制。
//   兩組明文密碼已於停用時移除，切勿再寫回前端。
//
// 【目前替代方案】導覽列「會員專區」按鈕直接連往 Google Drive 資料夾，
//   由 Drive 的「限特定人員」共用設定做真正的權限管控。
//
// 【日後接後端時】
//   1. 身分驗證改由伺服器處理（Netlify Identity、Supabase Auth 等皆可），
//      前端只保留「已登入 / 角色為何」的狀態查詢，不再持有任何密碼。
//   2. getMemberRole() / isBoardMember() 改為讀取後端回傳的 session，
//      而非 sessionStorage。
//   3. 上傳資料原本存於瀏覽器 IndexedDB（僅存在該台電腦、不跨裝置同步），
//      需改為上傳至後端儲存空間，dbAdd/dbQuery/dbDelete 換成 API 呼叫。
//   4. 對應樣式見 member.css，藍圖階段的 HTML 樣板見 member-section.html。
//
// 【可沿用的部分】圖片壓縮（compressImage）、上傳介面、燈箱（openLightbox）
//   與各階段的資料渲染邏輯皆與驗證方式無關，可直接沿用。
// ══════════════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════════
// 存取控制 — 待後端實作
// ─────────────────────────────────────────────────────────────────
// 原本此處有兩組明文密碼常數，因會隨 JS 公開而移除。
// 接後端後，attemptLogin() 應改為呼叫驗證 API，前端不得持有任何密碼。
// ═══════════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════════
// MEMBER RECORDS — 靜態預設資料（可在 JS 直接填寫）
// ─────────────────────────────────────────────────────────────────
// photos:   [{ url: 'https://...', caption: '說明' }]
// meetings: [{ date: '2024-06', title: '...', summary: '...' }]
// ═══════════════════════════════════════════════════════════════════
const memberRecords = {
  ph1: {
    photos:   [ /* { url: 'photos/ph1.jpg', caption: '2019 學會成立' } */ ],
    meetings: [ /* { date: '2019-12', title: '第一屆理監事就職', summary: '規劃首年工作方向。' } */ ],
  },
  ph2: {
    photos:   [],
    meetings: [],
  },
  ph3: { photos: [], meetings: [] },
  ph4: { photos: [], meetings: [] },
  ph5: { photos: [], meetings: [] },
};

// ═══════════════════════════════════════════════════════════════════
// ROLE MANAGEMENT
// ═══════════════════════════════════════════════════════════════════
function getMemberRole()    { return sessionStorage.getItem('tipsse-role'); }
function setMemberRole(r)   { r ? sessionStorage.setItem('tipsse-role', r) : sessionStorage.removeItem('tipsse-role'); }
function isMemberLoggedIn() { return !!getMemberRole(); }
function isBoardMember()    { return getMemberRole() === 'board'; }

// ═══════════════════════════════════════════════════════════════════
// INDEXEDDB — 儲存上傳的照片、文件、會議記錄
// ═══════════════════════════════════════════════════════════════════
let _db = null;
function openDB() {
  return new Promise((resolve, reject) => {
    if (_db) return resolve(_db);
    const req = indexedDB.open('tipsseMemberDB', 1);
    req.onupgradeneeded = e => {
      const d = e.target.result;
      if (!d.objectStoreNames.contains('uploads')) {
        d.createObjectStore('uploads', { keyPath: 'id', autoIncrement: true })
         .createIndex('phase', 'phase');
      }
    };
    req.onsuccess = e => { _db = e.target.result; resolve(_db); };
    req.onerror   = e => reject(e.target.error);
  });
}
async function dbQuery(phase) {
  const d = await openDB();
  return new Promise((res, rej) => {
    const req = d.transaction('uploads','readonly').objectStore('uploads').index('phase').getAll(phase);
    req.onsuccess = () => res(req.result);
    req.onerror   = () => rej(req.error);
  });
}
async function dbAdd(rec) {
  const d = await openDB();
  return new Promise((res, rej) => {
    const req = d.transaction('uploads','readwrite').objectStore('uploads').add(rec);
    req.onsuccess = () => res(req.result);
    req.onerror   = () => rej(req.error);
  });
}
async function dbDelete(id) {
  const d = await openDB();
  return new Promise((res, rej) => {
    const req = d.transaction('uploads','readwrite').objectStore('uploads').delete(id);
    req.onsuccess = () => res();
    req.onerror   = () => rej(req.error);
  });
}

// ═══════════════════════════════════════════════════════════════════
// IMAGE PROCESSING
// ═══════════════════════════════════════════════════════════════════
function compressImage(file, maxPx = 1400, q = 0.82) {
  return new Promise(resolve => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      const scale = Math.min(1, maxPx / Math.max(img.width, img.height));
      const canvas = Object.assign(document.createElement('canvas'), {
        width:  Math.round(img.width  * scale),
        height: Math.round(img.height * scale),
      });
      canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL('image/jpeg', q));
    };
    img.onerror = () => { URL.revokeObjectURL(url); resolve(null); };
    img.src = url;
  });
}
function fileToDataUrl(file) {
  return new Promise((res, rej) => {
    const r = new FileReader();
    r.onload  = () => res(r.result);
    r.onerror = () => rej(r.error);
    r.readAsDataURL(file);
  });
}

// ═══════════════════════════════════════════════════════════════════
// RENDER A SINGLE MEMBER ZONE
// ═══════════════════════════════════════════════════════════════════
async function renderMemberZone(zone) {
  const phKey   = zone.dataset.phase;
  const content = zone.querySelector('.member-zone-content');
  const locked  = zone.querySelector('.member-zone-locked');
  const t       = translations[currentLang];
  const board   = isBoardMember();

  if (!isMemberLoggedIn()) {
    if (locked)  locked.style.display = '';
    if (content) content.classList.remove('visible');
    return;
  }
  if (locked)  locked.style.display = 'none';
  if (!content) return;
  content.classList.add('visible');

  // Calendar zone: content is static HTML (Google Calendar embed), no DB ops needed
  if (phKey === 'calendar') return;

  // Fetch from IndexedDB + static defaults
  const dbRecs    = await dbQuery(phKey);
  const dbPhotos  = dbRecs.filter(r => r.type === 'photo');
  const dbDocs    = dbRecs.filter(r => r.type === 'doc');
  const dbMeets   = dbRecs.filter(r => r.type === 'meeting');
  const stat      = memberRecords[phKey] || { photos: [], meetings: [] };
  const allPhotos = [...stat.photos.map(p => ({...p, _static: true})), ...dbPhotos];
  const allMeets  = [...stat.meetings.map(m => ({...m, _static: true})), ...dbMeets];

  // ── Header ──
  const header = `
    <div class="member-zone-header">
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><rect x="1" y="4" width="14" height="11" rx="1.5"/><circle cx="6" cy="9.5" r="2"/><path d="M10 8h3M10 11h2"/></svg>
      <span>${t['member.zone.title']}</span>
      ${board ? `<span class="board-badge">${t['board.badge']}</span>` : ''}
    </div>`;

  // ── Upload toolbar (board only) ──
  const toolbar = board ? `
    <div class="upload-toolbar">
      <button class="upload-btn" data-action="upload-photo">
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><rect x="1" y="5" width="14" height="10" rx="1.5"/><circle cx="8" cy="10" r="2.5"/><path d="M6 5V4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v1"/></svg>
        + ${t['upload.photo']}
      </button>
      <button class="upload-btn" data-action="upload-doc">
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M4 2h6l4 4v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z"/><path d="M10 2v4h4"/><line x1="5" y1="9" x2="11" y2="9"/><line x1="5" y1="12" x2="9" y2="12"/></svg>
        + ${t['upload.doc']}
      </button>
    </div>` : '';

  // ── Photos ──
  let photosHTML;
  if (allPhotos.length > 0) {
    const items = allPhotos.map(p => {
      const src  = p.dataUrl || p.url || '';
      const cap  = (p.caption || '').replace(/"/g, '&quot;');
      const del  = (board && !p._static)
        ? `<button class="photo-delete-btn" data-id="${p.id}">×</button>` : '';
      return `<div class="member-photo-item" data-url="${src}" data-caption="${cap}">
        <img src="${src}" alt="${p.caption||''}" loading="lazy"/>
        ${p.caption ? `<div class="member-photo-caption">${p.caption}</div>` : ''}${del}
      </div>`;
    }).join('');
    photosHTML = `<p class="member-section-title">${t['member.photos.title']}</p>
      <div class="member-photo-grid">${items}</div>`;
  } else {
    photosHTML = `<p class="member-section-title">${t['member.photos.title']}</p>
      <div class="member-empty">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><rect x="3" y="7" width="18" height="14" rx="2"/><circle cx="12" cy="14" r="3.5"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
        ${t['member.no.photos']}
      </div>`;
  }

  // ── Documents ──
  let docsHTML = '';
  if (dbDocs.length > 0) {
    const items = dbDocs.map(d => {
      const del = board
        ? `<button class="member-doc-delete" data-id="${d.id}" title="刪除">×</button>` : '';
      return `<div class="member-doc-item">
        <div class="member-doc-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="12" y2="17"/></svg></div>
        <span class="member-doc-name">${d.name}</span>
        <a class="member-doc-download" href="${d.dataUrl}" download="${d.name}">${t['doc.download']}</a>
        ${del}
      </div>`;
    }).join('');
    docsHTML = `<p class="member-section-title">${t['member.docs.title']}</p>
      <div class="member-doc-list">${items}</div>`;
  }

  // ── Meeting records ──
  const addMeetBtn = board ? `
    <button class="upload-btn meeting-add-toggle" style="margin-bottom:10px">
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><line x1="8" y1="3" x2="8" y2="13"/><line x1="3" y1="8" x2="13" y2="8"/></svg>
      + ${t['upload.meeting']}
    </button>
    <div class="meeting-add-form" id="mForm-${phKey}">
      <div class="meeting-form-row">
        <input class="meeting-form-input" id="mfD-${phKey}" placeholder="${t['meeting.date.ph']}" style="max-width:130px"/>
        <input class="meeting-form-input" id="mfT-${phKey}" placeholder="${t['meeting.title.ph']}"/>
      </div>
      <textarea class="meeting-form-textarea" id="mfS-${phKey}" placeholder="${t['meeting.summary.ph']}"></textarea>
      <div class="meeting-form-actions">
        <button class="meeting-form-cancel" data-phase="${phKey}">${translations.zh['cancel']||'取消'}</button>
        <button class="meeting-form-save"   data-phase="${phKey}">${translations.zh['save']||'儲存'}</button>
      </div>
    </div>` : '';

  let meetHTML;
  if (allMeets.length > 0) {
    const items = allMeets.map(m => {
      const del = (board && !m._static)
        ? `<button class="member-doc-delete" data-id="${m.id}" style="margin-left:auto">×</button>` : '';
      return `<div class="member-meeting-item">
        <div class="member-meeting-meta">
          <span class="member-meeting-date">${m.date}</span>
          <span class="member-meeting-title">${m.title}</span>${del}
        </div>
        ${m.summary ? `<p class="member-meeting-summary">${m.summary}</p>` : ''}
      </div>`;
    }).join('');
    meetHTML = `<p class="member-section-title">${t['member.meetings.title']}</p>
      ${addMeetBtn}<div class="member-meeting-list">${items}</div>`;
  } else {
    meetHTML = `<p class="member-section-title">${t['member.meetings.title']}</p>
      ${addMeetBtn}
      <div class="member-empty" style="margin-top:0">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/><line x1="9" y1="12" x2="15" y2="12"/><line x1="9" y1="16" x2="13" y2="16"/></svg>
        ${t['member.no.meetings']}
      </div>`;
  }

  content.innerHTML = header + toolbar + photosHTML + docsHTML + meetHTML;
  _attachZoneEvents(content, phKey, zone);
}

function _attachZoneEvents(content, phKey, zone) {
  // Lightbox
  content.querySelectorAll('.member-photo-item').forEach(item => {
    item.addEventListener('click', e => {
      if (e.target.classList.contains('photo-delete-btn')) return;
      openLightbox(item.dataset.url, item.dataset.caption);
    });
  });

  // Delete buttons (photos, docs, meetings)
  content.querySelectorAll('.photo-delete-btn, .member-doc-delete').forEach(btn => {
    btn.addEventListener('click', async e => {
      e.stopPropagation();
      if (!confirm(translations[currentLang]['confirm.delete'])) return;
      await dbDelete(parseInt(btn.dataset.id));
      await renderMemberZone(zone);
    });
  });

  // Upload photo
  const upPhoto = content.querySelector('[data-action="upload-photo"]');
  if (upPhoto) upPhoto.addEventListener('click', () => {
    const inp = document.createElement('input');
    inp.type = 'file'; inp.accept = 'image/*'; inp.multiple = true;
    inp.addEventListener('change', () => _handlePhotoUpload(inp.files, phKey, zone));
    inp.click();
  });

  // Upload doc
  const upDoc = content.querySelector('[data-action="upload-doc"]');
  if (upDoc) upDoc.addEventListener('click', () => {
    const inp = document.createElement('input');
    inp.type = 'file'; inp.accept = '.pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx'; inp.multiple = true;
    inp.addEventListener('change', () => _handleDocUpload(inp.files, phKey, zone));
    inp.click();
  });

  // Meeting form toggle
  const toggle = content.querySelector('.meeting-add-toggle');
  const form   = content.querySelector(`#mForm-${phKey}`);
  if (toggle && form) toggle.addEventListener('click', () => form.classList.toggle('open'));

  // Meeting cancel
  const cancel = content.querySelector('.meeting-form-cancel');
  if (cancel && form) cancel.addEventListener('click', () => form.classList.remove('open'));

  // Meeting save
  const save = content.querySelector('.meeting-form-save');
  if (save && form) save.addEventListener('click', async () => {
    const date    = content.querySelector(`#mfD-${phKey}`)?.value.trim();
    const title   = content.querySelector(`#mfT-${phKey}`)?.value.trim();
    const summary = content.querySelector(`#mfS-${phKey}`)?.value.trim();
    if (!date || !title) return;
    await dbAdd({ phase: phKey, type: 'meeting', date, title, summary: summary || '', uploadedAt: Date.now() });
    await renderMemberZone(zone);
  });
}

async function _handlePhotoUpload(files, phKey, zone) {
  if (!files?.length) return;
  for (const f of files) {
    if (f.size > 15 * 1024 * 1024) { alert(`${f.name} 超過 15MB，請先壓縮。`); continue; }
    const dataUrl = f.type === 'image/gif' ? await fileToDataUrl(f) : await compressImage(f);
    if (dataUrl) await dbAdd({ phase: phKey, type: 'photo', name: f.name, dataUrl, caption: '', uploadedAt: Date.now() });
  }
  await renderMemberZone(zone);
}

async function _handleDocUpload(files, phKey, zone) {
  if (!files?.length) return;
  for (const f of files) {
    if (f.size > 20 * 1024 * 1024) { alert(`${f.name} 超過 20MB`); continue; }
    const dataUrl = await fileToDataUrl(f);
    await dbAdd({ phase: phKey, type: 'doc', name: f.name, dataUrl, mimeType: f.type, uploadedAt: Date.now() });
  }
  await renderMemberZone(zone);
}

// ── Photo lightbox ──
function openLightbox(url, caption) {
  const lb  = document.getElementById('photoLightbox');
  const img = document.getElementById('lightboxImg');
  const cap = document.getElementById('lightboxCaption');
  img.src           = url;
  cap.textContent   = caption || '';
  cap.style.display = caption ? '' : 'none';
  lb.classList.add('active');
}
document.getElementById('photoLightbox').addEventListener('click', () => {
  document.getElementById('photoLightbox').classList.remove('active');
});

// ── Sync all member UI ──
async function updateMemberUI() {
  const loggedIn = isMemberLoggedIn();
  const t        = translations[currentLang];
  const btn      = document.getElementById('memberBtn');
  if (btn) {
    btn.classList.toggle('logged-in', loggedIn);
    const el = btn.querySelector('.member-btn-text');
    if (el) el.textContent = loggedIn ? t['nav.logout'] : t['nav.login'];
  }
  for (const zone of document.querySelectorAll('.member-zone')) {
    await renderMemberZone(zone);
  }
}

// ── Auth init ──
function initMemberAuth() {
  const overlay   = document.getElementById('loginOverlay');
  const closeBtn  = document.getElementById('loginClose');
  const submitBtn = document.getElementById('loginSubmit');
  const pwInput   = document.getElementById('loginPassword');
  const errorEl   = document.getElementById('loginError');
  const memberBtn = document.getElementById('memberBtn');

  function openModal()  { overlay.classList.add('active'); setTimeout(() => pwInput.focus(), 80); }
  function closeModal() { overlay.classList.remove('active'); errorEl.textContent = ''; pwInput.value = ''; }

  // TODO(後端)：改為呼叫驗證 API，例如
  //   const res  = await fetch('/api/login', { method: 'POST', body: ... });
  //   const role = (await res.json()).role;   // 'member' | 'board' | null
  //   role ? (setMemberRole(role), closeModal(), updateMemberUI()) : showError();
  // 前端不得持有密碼，也不可用 sessionStorage 作為唯一的身分依據
  // ——使用者可自行竄改，需由後端在每次存取資料時驗證。
  async function attemptLogin() {
    throw new Error('會員登入尚未實作：需搭配後端驗證。詳見本檔開頭說明。');
  }

  memberBtn.addEventListener('click', () => {
    if (isMemberLoggedIn()) { setMemberRole(null); updateMemberUI(); }
    else openModal();
  });
  document.querySelectorAll('.member-zone-locked').forEach(el => {
    el.addEventListener('click', openModal);
    el.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') openModal(); });
  });
  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
  submitBtn.addEventListener('click', attemptLogin);
  pwInput.addEventListener('keydown', e => { if (e.key === 'Enter') attemptLogin(); });

  updateMemberUI();
}

initMemberAuth();


// ══════════════════════════════════════════════════════════════════════
// 停用時一併移出的 i18n 字串（原在 main.js 的 translations）
// ──────────────────────────────────────────────────────────────────────
// 日後恢復會員專區時，把下列字串放回 main.js 的 zh / en 區塊。
// 注意 'member.cal.*' 不在此列 —— 首頁行事曆嵌入仍在使用，字串留在 main.js。
//
// 'nav.login':        '會員登入',
// 'nav.login':            '會員登入',
// 'login.title':          '會員專區',
// 'login.subtitle':       '請輸入會員密碼以查看專屬內容',
// 'login.placeholder':    '會員密碼',
// 'login.btn':            '登入',
// 'login.error':          '密碼錯誤，請再試一次',
// 'member.login.hint':    '登入後查看活動照片與會議記錄',
// 'member.zone.title':    '會員專區 · 活動照片 & 會議記錄',
// 'member.photos.title':  '活動照片',
// 'member.meetings.title':'會議記錄',
// 'member.no.photos':     '尚未上傳活動照片',
// 'member.no.meetings':   '尚未新增會議記錄',
// 'member.docs.title':    '相關文件',
// 'login.subtitle':       '輸入密碼登入（一般會員 / 理監事）',
// 'nav.login':        'Member Login',
// 'nav.login':            'Login',
// 'login.title':          'Members Area',
// 'login.subtitle':       'Enter the member password to access exclusive content',
// 'login.placeholder':    'Member password',
// 'login.btn':            'Login',
// 'login.error':          'Incorrect password. Please try again.',
// 'member.login.hint':    'Log in to view activity photos & meeting records',
// 'member.zone.title':    'Members · Photos & Meeting Records',
// 'member.photos.title':  'Activity Photos',
// 'member.meetings.title':'Meeting Records',
// 'member.no.photos':     'No photos uploaded yet',
// 'member.no.meetings':   'No meeting records yet',
// 'member.docs.title':    'Documents',
// 'login.subtitle':       'Enter password (Member / Board Officer)',
