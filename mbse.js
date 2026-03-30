/* ===========================
   TIPSSE – mbse.js
   =========================== */

// ── i18n (reuse same translations + MBSE-specific keys) ──
const translations = {
  zh: {
    'nav.about': '學會簡介', 'nav.groups': '專業分組', 'nav.projects': '專案成果',
    'nav.roadmap': '發展路徑', 'nav.roadmap2': '發展藍圖',
    'nav.events': '近期活動', 'nav.contact': '聯絡我們', 'nav.mbse': 'MBSE 工具',
    'footer.copy': '© 2024 中華民國行星科學系統工程學會 TIPSSE. All rights reserved.',
    // Hero
    'mbse.hero.tag':  '線上工具',
    'mbse.hero.h1':   'MBSE 線上建模平台',
    'mbse.hero.p':    '在瀏覽器中直接建立 SysML 系統模型。支援 BDD 圖形編輯、Cameo .mdzip 匯入、STPA 安全分析與需求追溯矩陣，無需安裝任何軟體。',
    'mbse.hero.btn1': '立即使用工具',
    'mbse.hero.btn2': '什麼是 MBSE？',
    // What is MBSE
    'mbse.what.tag': '概念介紹',
    'mbse.what.h2':  '什麼是 MBSE？',
    'mbse.what.p':   'Model-Based Systems Engineering，以模型為核心的系統工程方法論',
    'mbse.def.h3':   '傳統 vs. 模型驅動',
    'mbse.compare.old': '傳統文件式工程',
    'mbse.compare.new': 'MBSE 模型驅動',
    'mbse.c1.old': '📄 規格書、Word 文件散落各處',
    'mbse.c2.old': '🔄 更新一份文件，其他未同步',
    'mbse.c3.old': '❌ 需求與設計難以追溯',
    'mbse.c4.old': '🗣️ 工程師各說各話，理解不同',
    'mbse.c1.new': '🗂️ 單一模型為唯一真實來源（SSOT）',
    'mbse.c2.new': '🔗 所有圖表自動同步更新',
    'mbse.c3.new': '✅ 需求追溯矩陣一目了然',
    'mbse.c4.new': '🤝 跨部門共享同一語義模型',
    'mbse.sysml.h4': 'SysML', 'mbse.sysml.p': 'Systems Modeling Language，MBSE 的標準建模語言。以 UML 為基礎，新增 Block、Requirement、Activity 等系統工程專用圖型。',
    'mbse.bdd.h4':   'BDD / IBD',  'mbse.bdd.p':   'Block Definition Diagram 定義系統架構與元件層級；Internal Block Diagram 描述內部連線與介面關係。',
    'mbse.stpa.h4':  'STPA 安全分析', 'mbse.stpa.p': 'Systems-Theoretic Process Analysis，從系統層級識別危害與不安全控制動作，廣泛用於航太與汽車安全驗證。',
    'mbse.rtm.h4':   '需求追溯矩陣 RTM', 'mbse.rtm.p': 'Requirements Traceability Matrix，驗證每一條需求都對應到設計元素，確保無遺漏，是航太系統認證的必備文件。',
    'mbse.why.h3':    '為什麼學會採用 MBSE？',
    'mbse.why.p1':    'TIPSSE 開發的衛星與火箭系統涉及結構、電力、通訊、姿態控制等多個子系統。傳統文件難以管理複雜的跨系統介面與需求追溯，MBSE 讓各分組在同一模型語境下協作，大幅降低溝通成本與設計錯誤。',
    'mbse.why.p2':    '我們以開源工具實現原本需要高價商業軟體（Cameo、Rhapsody）才能完成的工作，並讓學生也能直接在瀏覽器上學習與實踐系統工程。',
    'mbse.why.stack': '我們使用的技術棧',
    // Features
    'mbse.feat.tag': '功能特色', 'mbse.feat.h2': '平台功能一覽',
    'mbse.feat.p':   '開源、免安裝，直接在瀏覽器中使用完整的系統建模工具。',
    'mbse.f1.h3': 'SysML 視覺化編輯器',
    'mbse.f1.p':  '拖拉式介面建立 BDD / IBD 圖形。支援 Block、Requirement、Actor、ValueType 等節點，以及 Composition、Generalization、Satisfy 等七種連線類型。',
    'mbse.f1.l1': '左側 Palette 一鍵新增元素', 'mbse.f1.l2': '右側 Property Panel 即時編輯屬性',
    'mbse.f1.l3': '多圖表分頁管理', 'mbse.f1.l4': 'Undo / Redo（⌘Z）',
    'mbse.f2.h3': 'Cameo / XMI 匯入', 'mbse.f2.p': '直接匯入 Cameo .mdzip 壓縮檔或標準 XMI 2.x 檔案，自動解析並以 Dagre 階層排版顯示。',
    'mbse.f2.l1': '支援 .mdzip / .xml / .xmi', 'mbse.f2.l2': '相容 Cameo 19SP3 ～ 2024RF2', 'mbse.f2.l3': 'Sparx EA、Rhapsody 匯出格式',
    'mbse.f3.h3': 'STPA 安全分析', 'mbse.f3.p': '支援 DLR-FT ModelBasedSTPA Profile，完整呈現 Loss、Hazard、ControlStructure、UnsafeControlAction 等分析元素。',
    'mbse.f3.l1': 'Loss / Hazard / SystemConstraint', 'mbse.f3.l2': 'ControlAction / UnsafeControlAction', 'mbse.f3.l3': 'LossScenario / SafetyConstraint',
    'mbse.f4.h3': '需求追溯矩陣 RTM', 'mbse.f4.p': '一鍵開啟 RTM 面板，以矩陣呈現需求與設計元素的 Satisfy / Derive / Realize 覆蓋關係，含覆蓋率統計。',
    'mbse.f5.h3': '全域搜尋', 'mbse.f5.p': '⌘K 快速開啟搜尋面板，即時模糊比對元素名稱、種類、reqId，點擊即跳轉至對應圖表並選取。',
    'mbse.f6.h3': '模型品質指標', 'mbse.f6.p': '自動偵測未連線元素、空需求文字、缺少追溯關係等品質問題，協助提升模型完整度。',
    'mbse.f7.h3': 'XMI 匯出', 'mbse.f7.p': '匯出含完整 SysML stereotype 的標準 XMI，可直接匯入回 Cameo，實現雙向互通。',
    'mbse.f8.h3': '自動儲存', 'mbse.f8.p': '即時存入 localStorage，重新整理也不遺失。⌘S 快速儲存，Save As 另存為本地檔案。',
    // Tool
    'mbse.tool.tag': '立即使用', 'mbse.tool.h2': '開啟線上工具',
    'mbse.tool.p':   '無需帳號，無需安裝，開啟即用。內附衛星 ADCS 範例模型供快速體驗。',
    'mbse.launch.h3': 'TIPSSE MBSE Platform',
    'mbse.launch.p':  '基於 React Flow + SysML 的開源建模平台，適合學術研究、教學與小型任務規劃使用。',
    'mbse.launch.github': 'GitHub 原始碼',
    'mbse.launch.demo':   '查看範例模型',
    'mbse.launch.note':   '自行部署：',
    // Steps
    'mbse.gs.tag': '快速上手', 'mbse.gs.h2': '三步驟開始建模',
    'mbse.s1.h4': '開啟工具或匯入模型', 'mbse.s1.p': '直接在瀏覽器中建立新模型，或點擊 Import 匯入現有的 Cameo .mdzip 或 XMI 檔案。',
    'mbse.s2.h4': '拖拉建立系統架構',   'mbse.s2.p': '從左側 Palette 拖入 Block 和 Requirement，在畫布上連線定義系統層級架構與需求關係。',
    'mbse.s3.h4': '驗證需求與匯出',     'mbse.s3.p': '開啟 RTM 確認需求覆蓋率，用 Quality 面板偵測問題，最後匯出標準 XMI 與團隊共享或匯入 Cameo。',
  },

  en: {
    'nav.about': 'About', 'nav.groups': 'Groups', 'nav.projects': 'Projects',
    'nav.roadmap': 'Roadmap', 'nav.roadmap2': 'Roadmap',
    'nav.events': 'Events', 'nav.contact': 'Contact', 'nav.mbse': 'MBSE Tool',
    'footer.copy': '© 2024 Taiwan Institute of Planetary Science and System Engineering (TIPSSE). All rights reserved.',
    // Hero
    'mbse.hero.tag':  'Online Tool',
    'mbse.hero.h1':   'MBSE Online Modeling Platform',
    'mbse.hero.p':    'Build SysML system models directly in your browser. Supports BDD visual editing, Cameo .mdzip import, STPA safety analysis, and requirements traceability — no installation required.',
    'mbse.hero.btn1': 'Launch the Tool',
    'mbse.hero.btn2': 'What is MBSE?',
    // What is MBSE
    'mbse.what.tag': 'Concept',
    'mbse.what.h2':  'What is MBSE?',
    'mbse.what.p':   'Model-Based Systems Engineering — a methodology that places a central system model at the core of the engineering process',
    'mbse.def.h3':   'Traditional vs. Model-Driven',
    'mbse.compare.old': 'Document-Based Engineering',
    'mbse.compare.new': 'MBSE Model-Driven',
    'mbse.c1.old': '📄 Specs and Word docs scattered everywhere',
    'mbse.c2.old': '🔄 Update one doc, others fall out of sync',
    'mbse.c3.old': '❌ Requirements hard to trace to design',
    'mbse.c4.old': '🗣️ Engineers interpret requirements differently',
    'mbse.c1.new': '🗂️ Single model as the Single Source of Truth (SSOT)',
    'mbse.c2.new': '🔗 All diagrams auto-sync from the same model',
    'mbse.c3.new': '✅ Requirements Traceability Matrix at a glance',
    'mbse.c4.new': '🤝 Cross-team shared semantic model',
    'mbse.sysml.h4': 'SysML', 'mbse.sysml.p': 'Systems Modeling Language — the standard modeling language for MBSE. Built on UML with added Block, Requirement, and Activity diagram types tailored for systems engineering.',
    'mbse.bdd.h4':   'BDD / IBD',  'mbse.bdd.p':   'Block Definition Diagram defines system architecture and component hierarchy; Internal Block Diagram describes internal connections and interface relationships.',
    'mbse.stpa.h4':  'STPA Safety Analysis', 'mbse.stpa.p': 'Systems-Theoretic Process Analysis — identifies hazards and unsafe control actions at the system level. Widely used in aerospace and automotive safety verification.',
    'mbse.rtm.h4':   'Requirements Traceability Matrix', 'mbse.rtm.p': 'The RTM verifies that every requirement is mapped to a design element with no gaps. An essential document for aerospace system certification.',
    'mbse.why.h3':    'Why does TIPSSE use MBSE?',
    'mbse.why.p1':    "TIPSSE's satellite and rocket systems span multiple subsystems — structure, power, communications, and attitude control. Traditional documents struggle with complex cross-system interfaces and requirement traceability. MBSE lets all groups collaborate in a shared model context, significantly reducing communication overhead and design errors.",
    'mbse.why.p2':    'We use open-source tools to replicate what once required expensive commercial software (Cameo, Rhapsody), enabling students to learn and practice systems engineering directly in the browser.',
    'mbse.why.stack': 'Our Technology Stack',
    // Features
    'mbse.feat.tag': 'Features', 'mbse.feat.h2': 'Platform Capabilities',
    'mbse.feat.p':   'Open source, no install. Use a full-featured systems modeling tool directly in your browser.',
    'mbse.f1.h3': 'SysML Visual Editor',
    'mbse.f1.p':  'Drag-and-drop interface for building BDD / IBD diagrams. Supports Block, Requirement, Actor, ValueType nodes and seven connection types including Composition, Generalization, and Satisfy.',
    'mbse.f1.l1': 'Left Palette for quick element creation', 'mbse.f1.l2': 'Right Property Panel for real-time editing',
    'mbse.f1.l3': 'Multi-diagram tab management', 'mbse.f1.l4': 'Undo / Redo (⌘Z)',
    'mbse.f2.h3': 'Cameo / XMI Import', 'mbse.f2.p': 'Directly import Cameo .mdzip files or standard XMI 2.x exports. Auto-parsed and displayed with Dagre hierarchical layout.',
    'mbse.f2.l1': 'Supports .mdzip / .xml / .xmi', 'mbse.f2.l2': 'Compatible with Cameo 19SP3 – 2024RF2', 'mbse.f2.l3': 'Sparx EA and Rhapsody export formats',
    'mbse.f3.h3': 'STPA Safety Analysis', 'mbse.f3.p': 'Supports the DLR-FT ModelBasedSTPA Cameo Profile with full visualization of Loss, Hazard, ControlStructure, and UnsafeControlAction elements.',
    'mbse.f3.l1': 'Loss / Hazard / SystemConstraint', 'mbse.f3.l2': 'ControlAction / UnsafeControlAction', 'mbse.f3.l3': 'LossScenario / SafetyConstraint',
    'mbse.f4.h3': 'Requirements Traceability Matrix', 'mbse.f4.p': 'One-click RTM panel shows Satisfy / Derive / Realize coverage between requirements and design elements, with coverage statistics.',
    'mbse.f5.h3': 'Global Search', 'mbse.f5.p': '⌘K opens the search panel for instant fuzzy matching of element names, types, and reqId. Click any result to jump to its diagram.',
    'mbse.f6.h3': 'Model Quality Metrics', 'mbse.f6.p': 'Auto-detects disconnected elements, empty requirement text, missing traceability links, and missing descriptions to improve model completeness.',
    'mbse.f7.h3': 'XMI Export', 'mbse.f7.p': 'Export standard XMI with complete SysML stereotypes, importable directly back into Cameo for full round-trip compatibility.',
    'mbse.f8.h3': 'Auto-Save', 'mbse.f8.p': 'Real-time save to localStorage — no data loss on refresh. ⌘S for quick save; Save As to export to a local file.',
    // Tool
    'mbse.tool.tag': 'Try It Now', 'mbse.tool.h2': 'Launch the Tool',
    'mbse.tool.p':   'No account, no installation required. Includes a satellite ADCS demo model to get started immediately.',
    'mbse.launch.h3': 'TIPSSE MBSE Platform',
    'mbse.launch.p':  'An open-source SysML modeling platform built on React Flow, designed for academic research, education, and small mission planning.',
    'mbse.launch.github': 'View on GitHub',
    'mbse.launch.demo':   'View Demo Model',
    'mbse.launch.note':   'Self-host: ',
    // Steps
    'mbse.gs.tag': 'Get Started', 'mbse.gs.h2': 'Three Steps to Start Modeling',
    'mbse.s1.h4': 'Open the tool or import a model', 'mbse.s1.p': 'Create a new model from scratch in the browser, or click Import to load an existing Cameo .mdzip or XMI file.',
    'mbse.s2.h4': 'Drag to build your system architecture', 'mbse.s2.p': 'Drag Blocks and Requirements from the left Palette onto the canvas, then draw connections to define system hierarchy and requirement relationships.',
    'mbse.s3.h4': 'Validate requirements and export', 'mbse.s3.p': 'Open RTM to check requirement coverage, use the Quality panel to detect gaps, then export standard XMI to share with your team or import into Cameo.',
  }
};

let currentLang = localStorage.getItem('tipsse-lang') || 'zh';

function applyLang(lang) {
  currentLang = lang;
  localStorage.setItem('tipsse-lang', lang);
  document.documentElement.lang = lang === 'zh' ? 'zh-TW' : 'en';
  const t = translations[lang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const v = t[el.dataset.i18n];
    if (v !== undefined) el.textContent = v;
  });
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const v = t[el.dataset.i18nHtml];
    if (v !== undefined) el.innerHTML = v;
  });
  const btn = document.getElementById('langBtn');
  btn.textContent = lang === 'zh' ? 'EN' : '中文';
}

// ── Navbar scroll ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// ── Mobile nav ──
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');
navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

// ── Lang button ──
document.getElementById('langBtn').addEventListener('click', () => {
  applyLang(currentLang === 'zh' ? 'en' : 'zh');
});

// ── Starfield ──
(function () {
  const c = document.getElementById('stars');
  if (!c) return;
  const f = document.createDocumentFragment();
  for (let i = 0; i < 120; i++) {
    const s = document.createElement('div');
    s.className = 'star';
    const sz = Math.random() * 2 + 0.5;
    s.style.cssText = `width:${sz}px;height:${sz}px;top:${Math.random()*100}%;left:${Math.random()*100}%;--op:${Math.random()*0.5+0.1};--dur:${Math.random()*4+2}s;--delay:-${Math.random()*5}s`;
    f.appendChild(s);
  }
  c.appendChild(f);
})();

// ── Scroll animations ──
const obs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const siblings = entry.target.parentElement.querySelectorAll('[data-animate]');
    let delay = 0;
    siblings.forEach((el, i) => { if (el === entry.target) delay = i * 80; });
    setTimeout(() => entry.target.classList.add('visible'), delay);
    obs.unobserve(entry.target);
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('[data-animate]').forEach(el => obs.observe(el));

// ── Smooth scroll ──
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (!t) return;
    e.preventDefault();
    window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - 72, behavior: 'smooth' });
  });
});

applyLang(currentLang);
