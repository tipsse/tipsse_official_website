/* ===========================
   TIPSSE – space-academy.js
   Space Knowledge Academy
   =========================== */

// ── Register Chart.js datalabels plugin ──────────────
Chart.register(ChartDataLabels);

// ── i18n ─────────────────────────────────────────────
const translations = {
  zh: {
    'nav.about':    '學會簡介',
    'nav.projects': '專案成果',
    'nav.roadmap':  '發展路徑',
    'nav.roadmap2': '發展藍圖',
    'nav.mbse':     'MBSE 工具',
    'nav.academy':  '太空學堂',
    'nav.contact':  '聯絡我們',
    'footer.copy':  '© 2024 中華民國行星科學系統工程學會 TIPSSE. All rights reserved.',
    // Hero
    'sa.hero.tag':  '知識科普',
    'sa.hero.h1':   '太空知識小學堂',
    'sa.hero.p':    '截至 2025 年，全球共有 648 人抵達 100 公里 Kármán 線以上的太空。<br />他們是誰？從事什麼職業？來自哪些國家？用數據告訴你答案。',
    'sa.hero.btn1': '探索數據',
    'sa.hero.btn2': '台灣的連結',
    // Overview
    'sa.ov.tag':    '數字總覽',
    'sa.ov.h2':     '太空人全球統計',
    'sa.ov.p':      '以 FAI 定義之 100 公里 Kármán 線為準，截至 2025 年 3 月。Virgin Galactic（飛行高度通常低於 100km）不計入本統計。',
    'sa.stat.total':    '累計太空人總數',
    'sa.stat.gov':      '政府機構太空人',
    'sa.stat.com':      '商業 / 民間飛行',
    'sa.stat.countries':'代表國家數',
    'sa.split.gov':  '政府 555人 (85.6%)',
    'sa.split.com':  '民間 93人 (14.4%)',
    'sa.legend.gov': '政府機構（NASA、Roscosmos、ESA、JAXA、CNSA 等）',
    'sa.legend.com': '商業 / 民間（SpaceX 私人任務、Blue Origin New Shepard 等）',
    // Occupations
    'sa.occ.tag':       '職業分類',
    'sa.occ.h2':        '太空人的原始職業',
    'sa.occ.p':         '以「進入太空前的主要職業背景」歸類，政府機構與商業民間分開呈現。',
    'sa.occ.tabGov':    '政府機構太空人（555 人）',
    'sa.occ.tabCom':    '商業 / 民間（93 人）',
    'sa.occ.gov.label': '政府機構太空人職業分布（共 555 人）',
    'sa.occ.com.label': '商業 / 民間太空人職業分布（共 93 人）',
    // Engineers
    'sa.eng.tag':  '工程師細分',
    'sa.eng.h2':   '工程師類型分析',
    'sa.eng.p':    '政府與商業太空人中所有工程師背景者（共 140 人）的專業領域細分。',
    'sa.eng.note': '💡 航太工程師佔工程師類別近一半，反映了太空任務對飛行動力學、推進與系統整合專業的高度需求。',
    // Scientists
    'sa.sci.tag':  '科學家細分',
    'sa.sci.h2':   '科學家 / 研究員類型分析',
    'sa.sci.p':    '政府與商業太空人中所有科學研究背景者（共 103 人）的學科領域細分。',
    'sa.sci.note': '💡 物理學家與生物學家並列前二，反映國際太空站長期任務中微重力物理實驗與太空生物醫學研究的雙重需求。',
    // Nationality
    'sa.nat.tag': '國籍統計',
    'sa.nat.h2':  '太空人國籍排名',
    'sa.nat.p':   '47 個國家曾有公民進入太空，以下為前 10 大國家及其他合計。',
    'sa.tbl.rank':    '排名',
    'sa.tbl.country': '國家',
    'sa.tbl.count':   '人數',
    'sa.tbl.pct':     '佔比',
    // Ethnicity
    'sa.eth.tag': '族裔分布',
    'sa.eth.h2':  '太空人族裔 / 人種分布',
    'sa.eth.p':   '按族裔與人種背景分類（近似統計，部分人員具複合背景，以主要認同歸類）。',
    // Taiwan
    'sa.tw.tag':  '台灣的連結',
    'sa.tw.h2':   '中華民國（台灣）與太空的連結',
    'sa.tw.p':    '目前尚無持有中華民國（台灣）現行國籍者以太空人身分進入太空，但台灣與太空史之間早有深厚淵源。',
    'sa.tw.banner.h3': '中華民國籍太空人：目前 0 人',
    'sa.tw.banner.p':  '截至 2025 年，尚無持有中華民國（台灣）現行國籍的人正式以太空人身分抵達 100 公里以上高空。台灣由國家太空中心（TASA）主導太空計畫，目前尚未啟動載人太空飛行計畫。',
    'sa.tw.badge.wang':  '最具台灣淵源',
    'sa.tw.badge.chiao': '華裔美籍',
    'sa.tw.badge.flag':  '旗幟之旅',
    'sa.tw.wang.p':  '生於中華民國昆明，幼年隨家人遷居台灣，就讀台南成功高中，後赴美取得博士學位。1985 年以 NASA 酬載專家身分搭乘挑戰者號太空梭執行 STS-51-B 任務，成為<strong>史上第一位進入太空的華裔人士</strong>。其成長背景與求學經歷（成功中學、台灣大學）使他被台灣廣泛視為代表性人物。',
    'sa.tw.chiao.p': '生於美國密爾瓦基，父親出身中華民國山東。執行 4 次太空任務，並擔任 ISS 第 10 屆遠征隊指揮官（2004–2005），是<strong>首位擔任 ISS 指揮官的亞裔人士</strong>，也是首位以亞裔身分進行太空漫步的太空人（1996 年）。',
    'sa.tw.flag.title': '中華民國國旗進入太空',
    'sa.tw.flag.p':   '1965 年 12 月，NASA 太空人 Wally Schirra 搭乘雙子星六號任務進入太空，並攜帶了中華民國國旗，那是<strong>中華民國國旗首次進入太空</strong>。冷戰時期美台關係的歷史見證，並附有 Schirra 親筆題詞。',
    'sa.tw.note.h': '台灣太空發展現況',
    'sa.tw.note.p': '台灣以衛星研發與遙測為主要太空計畫方向，TASA 已規劃多顆福爾摩沙衛星（FORMOSAT）任務。隨著全球商業太空旅行蓬勃發展，未來不排除有台灣公民以商業方式進入太空。',
    // Sources
    'sa.src.h4':   '資料來源 / Data Sources',
    'sa.src.note': '所有數字均為近似統計，截至 2025 年 3 月。部分人員具複合職業背景，以最具代表性之主職歸類。All figures are approximate estimates as of March 2025.',
  },

  en: {
    'nav.about':    'About',
    'nav.projects': 'Projects',
    'nav.roadmap':  'Roadmap',
    'nav.roadmap2': 'Roadmap',
    'nav.mbse':     'MBSE Tool',
    'nav.academy':  'Space Academy',
    'nav.contact':  'Contact',
    'footer.copy':  '© 2024 Taiwan Institute of Planetary Science and System Engineering (TIPSSE). All rights reserved.',
    // Hero
    'sa.hero.tag':  'Knowledge',
    'sa.hero.h1':   'Space Knowledge Academy',
    'sa.hero.p':    'As of 2025, 648 people have reached space above the 100 km Kármán line.<br />Who are they? What were their jobs? Which countries do they come from? The data tells the story.',
    'sa.hero.btn1': 'Explore the Data',
    'sa.hero.btn2': 'Taiwan Connection',
    // Overview
    'sa.ov.tag':    'Overview',
    'sa.ov.h2':     'Global Astronaut Statistics',
    'sa.ov.p':      'Based on the FAI 100 km Kármán line definition, as of March 2025. Virgin Galactic (typically below 100 km) is not included.',
    'sa.stat.total':    'Total Space Travelers',
    'sa.stat.gov':      'Government Astronauts',
    'sa.stat.com':      'Commercial / Civilian',
    'sa.stat.countries':'Countries Represented',
    'sa.split.gov':  'Government 555 (85.6%)',
    'sa.split.com':  'Civilian 93 (14.4%)',
    'sa.legend.gov': 'Government agencies (NASA, Roscosmos, ESA, JAXA, CNSA, etc.)',
    'sa.legend.com': 'Commercial / civilian (SpaceX private missions, Blue Origin New Shepard, etc.)',
    // Occupations
    'sa.occ.tag':       'Occupations',
    'sa.occ.h2':        'Pre-Spaceflight Occupations',
    'sa.occ.p':         'Classified by primary career before flying to space. Government and commercial/civilian travelers shown separately.',
    'sa.occ.tabGov':    'Government Astronauts (555)',
    'sa.occ.tabCom':    'Commercial / Civilian (93)',
    'sa.occ.gov.label': 'Government astronaut occupations (555 total)',
    'sa.occ.com.label': 'Commercial / civilian occupations (93 total)',
    // Engineers
    'sa.eng.tag':  'Engineer Breakdown',
    'sa.eng.h2':   'Engineer Types',
    'sa.eng.p':    'Specialization breakdown of all 140 engineers among government and commercial space travelers.',
    'sa.eng.note': '💡 Aerospace engineers make up nearly half of all engineer-background travelers, reflecting the high demand for flight dynamics, propulsion, and systems integration expertise.',
    // Scientists
    'sa.sci.tag':  'Scientist Breakdown',
    'sa.sci.h2':   'Scientist / Researcher Types',
    'sa.sci.p':    'Discipline breakdown of all 103 scientist/researcher-background travelers.',
    'sa.sci.note': '💡 Physicists and biologists rank top two, reflecting the dual demand for microgravity physics experiments and space biomedical research on long-duration ISS missions.',
    // Nationality
    'sa.nat.tag': 'Nationality',
    'sa.nat.h2':  'Space Travelers by Nationality',
    'sa.nat.p':   'Citizens from 47 countries have reached space. Below are the top 10 nations plus all others combined.',
    'sa.tbl.rank':    'Rank',
    'sa.tbl.country': 'Country',
    'sa.tbl.count':   'Count',
    'sa.tbl.pct':     'Share',
    // Ethnicity
    'sa.eth.tag': 'Ethnicity',
    'sa.eth.h2':  'Space Travelers by Ethnicity / Race',
    'sa.eth.p':   'Approximate breakdown by ethnic/racial background (some individuals have mixed heritage; classified by primary identity).',
    // Taiwan
    'sa.tw.tag':  'Taiwan Connection',
    'sa.tw.h2':   'Republic of China (Taiwan) & Space',
    'sa.tw.p':    'No person currently holding ROC (Taiwan) nationality has flown as an astronaut, yet Taiwan has meaningful connections to spaceflight history.',
    'sa.tw.banner.h3': 'ROC-Nationality Astronauts: Currently 0',
    'sa.tw.banner.p':  'As of 2025, no person with current Republic of China (Taiwan) nationality has officially reached 100 km as an astronaut. Taiwan\'s space program is led by TASA (Taiwan Space Agency), which has not yet initiated a crewed spaceflight program.',
    'sa.tw.badge.wang':  'Strongest Taiwan Ties',
    'sa.tw.badge.chiao': 'Chinese-American',
    'sa.tw.badge.flag':  'Flag Journey',
    'sa.tw.wang.p':  'Born in Kunming, Republic of China, Wang grew up in Taiwan, attended Tainan\'s Cheng Kung High School, then earned a doctorate in the U.S. In 1985, he flew on the Space Shuttle Challenger (STS-51-B) as a NASA payload specialist, becoming the <strong>first person of Chinese descent to reach space</strong>. His upbringing and education in Taiwan make him a widely recognized symbol for the island.',
    'sa.tw.chiao.p': 'Born in Milwaukee; his father was originally from Shandong, Republic of China. Leroy Chiao flew four space missions and commanded ISS Expedition 10 (2004–2005), becoming the <strong>first Asian to command the ISS</strong> and the first Asian to perform a spacewalk (1996).',
    'sa.tw.flag.title': 'ROC Flag in Space',
    'sa.tw.flag.p':   'In December 1965, NASA astronaut Wally Schirra carried the ROC flag aboard Gemini VI — <strong>the first time the ROC flag entered space</strong>. A Cold War–era symbol of US–Taiwan relations, accompanied by Schirra\'s personal inscription.',
    'sa.tw.note.h': 'Taiwan\'s Space Program Today',
    'sa.tw.note.p': 'Taiwan\'s space efforts focus on satellite development and remote sensing, with multiple FORMOSAT missions under TASA. As commercial spaceflight grows, it is not out of the question that a Taiwanese citizen could reach space on a commercial vehicle in the future.',
    // Sources
    'sa.src.h4':   '資料來源 / Data Sources',
    'sa.src.note': 'All figures are approximate estimates as of March 2025. Individuals with mixed career backgrounds are classified by their most representative primary occupation.',
  },
};

// ── Current language ──────────────────────────────────
let currentLang = 'zh';

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (translations[currentLang][key]) el.textContent = translations[currentLang][key];
  });
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.dataset.i18nHtml;
    if (translations[currentLang][key]) el.innerHTML = translations[currentLang][key];
  });
  // hero sub uses innerHTML for <br>
  const heroP = document.querySelector('.sa-hero-sub');
  if (heroP) heroP.innerHTML = translations[currentLang]['sa.hero.p'];
  // tw card paragraphs (contain <strong>)
  document.querySelectorAll('[data-i18n-inner]').forEach(el => {
    const key = el.dataset.i18nInner;
    if (translations[currentLang][key]) el.innerHTML = translations[currentLang][key];
  });
  document.documentElement.lang = currentLang === 'zh' ? 'zh-TW' : 'en';
}

// ── Data ──────────────────────────────────────────────
const TOTAL = 648;

const govOcc = [
  { zh: '軍事飛行員 / 試飛員', en: 'Military Pilot / Test Pilot', count: 270, color: '#4f8ef7' },
  { zh: '工程師',               en: 'Engineer',                    count: 130, color: '#7b5ef6' },
  { zh: '科學家 / 研究員',      en: 'Scientist / Researcher',      count:  95, color: '#10b981' },
  { zh: '醫師 / 醫學專業',      en: 'Physician / Medical',         count:  40, color: '#06b6d4' },
  { zh: '教育工作者',           en: 'Educator',                    count:  12, color: '#f59e0b' },
  { zh: '其他',                 en: 'Other',                       count:   8, color: '#ec4899' },
];

const comOcc = [
  { zh: '企業家 / 商業人士', en: 'Entrepreneur / Business',  count: 45, color: '#f59e0b' },
  { zh: '一般民眾 / 太空旅客',en: 'Civilian Tourist',          count: 20, color: '#34d399' },
  { zh: '工程師',             en: 'Engineer',                  count: 10, color: '#7b5ef6' },
  { zh: '科學家 / 研究員',    en: 'Scientist / Researcher',    count:  8, color: '#10b981' },
  { zh: '藝人 / 名人',        en: 'Celebrity / Entertainer',   count:  5, color: '#f97316' },
  { zh: '其他',               en: 'Other',                     count:  5, color: '#ec4899' },
];

const engTypes = [
  { zh: '航太工程師',           en: 'Aerospace Engineer',              count: 62, color: '#7b5ef6' },
  { zh: '機械工程師',           en: 'Mechanical Engineer',             count: 26, color: '#8b6ef7' },
  { zh: '電機 / 電子工程師',    en: 'Electrical / Electronics Eng.',   count: 23, color: '#9b7ef8' },
  { zh: '電腦 / 軟體工程師',    en: 'Computer / Software Eng.',        count: 14, color: '#ab8ef9' },
  { zh: '化工工程師',           en: 'Chemical Engineer',               count:  9, color: '#bb9efa' },
  { zh: '其他工程領域',         en: 'Other Engineering',               count:  6, color: '#cbaefb' },
];

const sciTypes = [
  { zh: '物理學家',              en: 'Physicist',                    count: 26, color: '#10b981' },
  { zh: '生物 / 生命科學',       en: 'Biologist / Life Scientist',   count: 22, color: '#14c48a' },
  { zh: '醫學研究員',            en: 'Medical Researcher',           count: 19, color: '#18cd93' },
  { zh: '地質 / 地球科學',       en: 'Geologist / Earth Scientist',  count: 14, color: '#1cd69c' },
  { zh: '天文 / 天體物理',       en: 'Astronomer / Astrophysicist',  count: 13, color: '#20dfa5' },
  { zh: '化學家',                en: 'Chemist',                      count:  6, color: '#24e8ae' },
  { zh: '其他',                  en: 'Other',                        count:  3, color: '#34d399' },
];

const nationalities = [
  { zh: '美國',           en: 'United States',   count: 355, flag: '🇺🇸', color: '#4f8ef7' },
  { zh: '俄羅斯 / 蘇聯',  en: 'Russia / USSR',   count: 130, flag: '🇷🇺', color: '#ef4444' },
  { zh: '中國（中共）',   en: 'China (PRC)',      count:  24, flag: '🇨🇳', color: '#f97316' },
  { zh: '日本',           en: 'Japan',            count:  12, flag: '🇯🇵', color: '#f59e0b' },
  { zh: '德國',           en: 'Germany',          count:  11, flag: '🇩🇪', color: '#eab308' },
  { zh: '加拿大',         en: 'Canada',           count:  10, flag: '🇨🇦', color: '#84cc16' },
  { zh: '法國',           en: 'France',           count:  10, flag: '🇫🇷', color: '#10b981' },
  { zh: '義大利',         en: 'Italy',            count:   7, flag: '🇮🇹', color: '#06b6d4' },
  { zh: '英國',           en: 'United Kingdom',   count:   5, flag: '🇬🇧', color: '#8b5cf6' },
  { zh: '印度',           en: 'India',            count:   4, flag: '🇮🇳', color: '#ec4899' },
  { zh: '其他 37 國',     en: 'Other 37 Nations', count:  80, flag: '🌍', color: '#64748b' },
];

const ethnicity = [
  { zh: '白人（美籍、歐洲、俄羅斯等）', en: 'White / Caucasian (American, European, Russian)',   count: 485, color: '#4f8ef7' },
  { zh: '黑人 / 非裔美國人',            en: 'Black / African American',                          count:  26, color: '#8b5cf6' },
  { zh: '漢族（中共籍）',               en: 'Han Chinese (PRC nationals)',                        count:  24, color: '#ef4444' },
  { zh: '華裔（其他國籍）',             en: 'Chinese heritage (other nationalities)',              count:  21, color: '#f97316' },
  { zh: '東亞裔（日、韓等）',           en: 'East Asian – Japanese, Korean, etc.',                count:  18, color: '#f59e0b' },
  { zh: '拉丁裔 / 西班牙裔',            en: 'Hispanic / Latino',                                  count:  16, color: '#10b981' },
  { zh: '南亞裔',                        en: 'South Asian',                                        count:   5, color: '#06b6d4' },
  { zh: '其他 / 混血',                   en: 'Other / Multiracial',                               count:  53, color: '#64748b' },
];

// ── Helpers ───────────────────────────────────────────
function label(d) { return currentLang === 'zh' ? d.zh : d.en; }

const chartDefaults = {
  color: '#8892a4',
  font: { family: "'Inter','Noto Sans TC',sans-serif", size: 12 },
};
Chart.defaults.color = chartDefaults.color;
Chart.defaults.font  = chartDefaults.font;

// Common horizontal bar config
function hBarCfg(data, total) {
  const sorted = [...data].sort((a, b) => b.count - a.count);
  return {
    type: 'bar',
    data: {
      labels: sorted.map(d => label(d)),
      datasets: [{
        data: sorted.map(d => d.count),
        backgroundColor: sorted.map(d => d.color + 'cc'),
        borderColor:     sorted.map(d => d.color),
        borderWidth: 1.5,
        borderRadius: 5,
        borderSkipped: false,
      }],
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: true,
      layout: { padding: { right: 72 } },
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: ctx => ` ${ctx.parsed.x} 人 (${(ctx.parsed.x / total * 100).toFixed(1)}%)`,
          },
        },
        datalabels: {
          anchor: 'end',
          align:  'end',
          color:  '#e8edf5',
          font:   { size: 12, weight: '600' },
          formatter: (val) => `${val} 人`,
          offset: 4,
        },
      },
      scales: {
        x: {
          beginAtZero: true,
          grid:  { color: 'rgba(255,255,255,0.05)' },
          ticks: { color: '#64748b', font: { size: 11 } },
        },
        y: {
          grid:  { display: false },
          ticks: { color: '#94a3b8', font: { size: 12 } },
        },
      },
    },
  };
}

// ── Build charts ──────────────────────────────────────
let chartInstances = {};

function buildCharts() {
  Object.values(chartInstances).forEach(c => c.destroy());
  chartInstances = {};

  const govTotal = govOcc.reduce((s, d) => s + d.count, 0); // 555
  const comTotal = comOcc.reduce((s, d) => s + d.count, 0); // 93
  const engTotal = engTypes.reduce((s, d) => s + d.count, 0);
  const sciTotal = sciTypes.reduce((s, d) => s + d.count, 0);

  // Government occupations
  const cfgGov = hBarCfg(govOcc, govTotal);
  cfgGov.options.aspectRatio = 2.4;
  chartInstances.govOcc = new Chart(document.getElementById('chartGovOcc'), cfgGov);

  // Commercial occupations
  const cfgCom = hBarCfg(comOcc, comTotal);
  cfgCom.options.aspectRatio = 2.8;
  chartInstances.comOcc = new Chart(document.getElementById('chartComOcc'), cfgCom);

  // Engineer types
  const cfgEng = hBarCfg(engTypes, engTotal);
  cfgEng.options.aspectRatio = 2.8;
  chartInstances.eng = new Chart(document.getElementById('chartEng'), cfgEng);

  // Scientist types
  const cfgSci = hBarCfg(sciTypes, sciTotal);
  cfgSci.options.aspectRatio = 2.6;
  chartInstances.sci = new Chart(document.getElementById('chartSci'), cfgSci);

  // Nationality bar
  chartInstances.nat = new Chart(document.getElementById('chartNat'), {
    type: 'bar',
    data: {
      labels: nationalities.map(d => `${d.flag} ${label(d)}`),
      datasets: [{
        data: nationalities.map(d => d.count),
        backgroundColor: nationalities.map(d => d.color + 'cc'),
        borderColor:     nationalities.map(d => d.color),
        borderWidth: 1.5,
        borderRadius: 5,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: 1.5,
      layout: { padding: { top: 28 } },
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: ctx => ` ${ctx.parsed.y} 人 (${(ctx.parsed.y / TOTAL * 100).toFixed(1)}%)`,
          },
        },
        datalabels: {
          anchor: 'end',
          align:  'end',
          color:  '#e8edf5',
          font:   { size: 11, weight: '600' },
          formatter: val => val,
          offset: 2,
        },
      },
      scales: {
        x: { grid: { display: false }, ticks: { color: '#94a3b8', font: { size: 10 }, maxRotation: 30 } },
        y: { beginAtZero: true, grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#64748b', font: { size: 11 } } },
      },
    },
  });

  // Ethnicity doughnut
  chartInstances.eth = new Chart(document.getElementById('chartEth'), {
    type: 'doughnut',
    data: {
      labels: ethnicity.map(d => label(d)),
      datasets: [{
        data: ethnicity.map(d => d.count),
        backgroundColor: ethnicity.map(d => d.color + 'cc'),
        borderColor:     ethnicity.map(d => d.color),
        borderWidth: 1.5,
        hoverOffset: 8,
      }],
    },
    options: {
      responsive: true,
      cutout: '58%',
      plugins: {
        legend: {
          position: 'bottom',
          labels: { color: '#94a3b8', font: { size: 10 }, padding: 10, boxWidth: 11, boxHeight: 11 },
        },
        tooltip: {
          callbacks: {
            label: ctx => ` ${ctx.label}: ${ctx.parsed} 人 (${(ctx.parsed / TOTAL * 100).toFixed(1)}%)`,
          },
        },
        datalabels: { display: false },
      },
    },
  });
}

// ── Nationality table ─────────────────────────────────
function buildNatTable() {
  const tbody = document.getElementById('natTableBody');
  if (!tbody) return;
  tbody.innerHTML = '';
  nationalities.forEach((d, i) => {
    const pct = (d.count / TOTAL * 100).toFixed(1);
    const badgeCls = i === 0 ? 'sa-rank-1' : i === 1 ? 'sa-rank-2' : i === 2 ? 'sa-rank-3' : 'sa-rank-n';
    tbody.innerHTML += `
      <tr>
        <td><span class="sa-rank-badge ${badgeCls}">${i + 1}</span></td>
        <td class="flag">${d.flag}</td>
        <td>${currentLang === 'zh' ? d.zh : d.en}</td>
        <td>${d.count}</td>
        <td class="pct">${pct}%</td>
      </tr>`;
  });
}

// ── Ethnicity bars ────────────────────────────────────
function buildEthList() {
  const container = document.getElementById('ethList');
  if (!container) return;
  container.innerHTML = '';
  const max = Math.max(...ethnicity.map(d => d.count));
  ethnicity.forEach(d => {
    const pct     = (d.count / TOTAL * 100).toFixed(1);
    const barW    = (d.count / max * 100).toFixed(1);
    const nameStr = currentLang === 'zh' ? d.zh : d.en;
    container.innerHTML += `
      <div class="sa-eth-item">
        <div class="sa-eth-row">
          <span class="sa-eth-name">${nameStr}</span>
          <span class="sa-eth-count">${d.count} 人 &nbsp;${pct}%</span>
        </div>
        <div class="sa-eth-bar-bg">
          <div class="sa-eth-bar-fill" style="width:${barW}%;background:${d.color}"></div>
        </div>
      </div>`;
  });
}

// ── Counter animation ─────────────────────────────────
function animateCounters() {
  document.querySelectorAll('.sa-stat-num[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count, 10);
    const duration = 1200;
    const start = performance.now();
    function step(now) {
      const t = Math.min((now - start) / duration, 1);
      const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      el.textContent = Math.floor(ease * target).toLocaleString();
      if (t < 1) requestAnimationFrame(step);
      else el.textContent = target.toLocaleString();
    }
    requestAnimationFrame(step);
  });
}

// ── Tab toggle ────────────────────────────────────────
function initTabs() {
  const btnGov = document.getElementById('tabGov');
  const btnCom = document.getElementById('tabCom');
  const panelGov = document.getElementById('panelGov');
  const panelCom = document.getElementById('panelCom');
  if (!btnGov) return;

  btnGov.addEventListener('click', () => {
    btnGov.classList.add('active');
    btnCom.classList.remove('active');
    panelGov.classList.remove('hidden');
    panelCom.classList.add('hidden');
  });
  btnCom.addEventListener('click', () => {
    btnCom.classList.add('active');
    btnGov.classList.remove('active');
    panelCom.classList.remove('hidden');
    panelGov.classList.add('hidden');
  });
}

// ── Navbar scroll ──────────────────────────────────────
function initNavbar() {
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  const toggle = document.getElementById('navToggle');
  const links  = document.getElementById('navLinks');
  if (toggle && links) {
    toggle.addEventListener('click', () => links.classList.toggle('open'));
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));
  }
}

// ── Stars ─────────────────────────────────────────────
function initStars() {
  const container = document.getElementById('stars');
  if (!container) return;
  for (let i = 0; i < 120; i++) {
    const s = document.createElement('div');
    s.style.cssText = `
      position:absolute;
      width:${Math.random() < 0.85 ? 1 : 2}px;
      height:${Math.random() < 0.85 ? 1 : 2}px;
      background:rgba(255,255,255,${0.2 + Math.random() * 0.6});
      border-radius:50%;
      top:${Math.random() * 100}%;
      left:${Math.random() * 100}%;
      animation:twinkle ${2 + Math.random() * 4}s ease-in-out infinite;
      animation-delay:${Math.random() * 4}s;
    `;
    container.appendChild(s);
  }
  if (!document.getElementById('twinkle-style')) {
    const st = document.createElement('style');
    st.id = 'twinkle-style';
    st.textContent = `@keyframes twinkle{0%,100%{opacity:0.2}50%{opacity:1}}`;
    document.head.appendChild(st);
  }
}

// ── Language toggle ───────────────────────────────────
function initLangToggle() {
  const btn = document.getElementById('langBtn');
  if (!btn) return;
  btn.addEventListener('click', () => {
    currentLang = currentLang === 'zh' ? 'en' : 'zh';
    btn.textContent = currentLang === 'zh' ? 'EN' : '中';
    applyTranslations();
    buildCharts();
    buildNatTable();
    buildEthList();
  });
}

// ── Intersection observer for counter trigger ─────────
function initCounterObserver() {
  const statsEl = document.querySelector('.sa-stat-grid');
  if (!statsEl) return;
  const obs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) { animateCounters(); obs.disconnect(); }
  }, { threshold: 0.3 });
  obs.observe(statsEl);
}

// ── Init ──────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  applyTranslations();
  initNavbar();
  initStars();
  initTabs();
  initLangToggle();
  initCounterObserver();
  buildCharts();
  buildNatTable();
  buildEthList();
});
