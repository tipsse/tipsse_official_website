/* ===========================
   TIPSSE – calendar.js
   中華民國行事曆
   =========================== */

// ── i18n ──
const translations = {
  zh: {
    'nav.about': '學會簡介', 'nav.projects': '專案成果', 'nav.roadmap': '發展藍圖',
    'nav.mbse': 'MBSE 工具', 'nav.academy': '太空學堂', 'nav.calendar': '行事曆',
    'nav.contact': '聯絡我們',
    'logo.sub': '中華民國行星科學系統工程學會',
    'footer.copy': '© 2024 中華民國行星科學系統工程學會 TIPSSE. All rights reserved.',
    // Hero
    'cal.hero.tag': '行事曆',
    'cal.hero.h1': '中華民國行事曆',
    'cal.hero.p': '匯整國定假日、農曆傳統節日與補假日期，一覽重要節慶。',
    // Calendar controls
    'cal.today': '今天',
    'cal.months': ['一月','二月','三月','四月','五月','六月',
                   '七月','八月','九月','十月','十一月','十二月'],
    'cal.weekdays': ['日','一','二','三','四','五','六'],
    'cal.year.suffix': ' 年',
    // Legend
    'cal.legend.title': '圖例',
    'cal.legend.national': '國定假日',
    'cal.legend.lunar': '農曆節日',
    'cal.legend.substitute': '補假',
    // Event panel
    'cal.panel.title': '本月節假日',
    'cal.panel.date': '日期',
    'cal.panel.name': '節日名稱',
    'cal.panel.empty': '本月無節假日記錄',
    'cal.note': '＊農曆節日日期依各年曆書換算；補假日期以行政院公告為準，本頁資料僅供參考。',
  },
  en: {
    'nav.about': 'About', 'nav.projects': 'Projects', 'nav.roadmap': 'Roadmap',
    'nav.mbse': 'MBSE Tool', 'nav.academy': 'Space Academy', 'nav.calendar': 'Calendar',
    'nav.contact': 'Contact',
    'logo.sub': 'Taiwan Institute of Planetary Science and System Engineering',
    'footer.copy': '© 2024 Taiwan Institute of Planetary Science and System Engineering (TIPSSE). All rights reserved.',
    // Hero
    'cal.hero.tag': 'Calendar',
    'cal.hero.h1': 'ROC Holiday Calendar',
    'cal.hero.p': 'Compiling national holidays, traditional lunar festivals, and substitute days in one place.',
    // Calendar controls
    'cal.today': 'Today',
    'cal.months': ['January','February','March','April','May','June',
                   'July','August','September','October','November','December'],
    'cal.weekdays': ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
    'cal.year.suffix': '',
    // Legend
    'cal.legend.title': 'Legend',
    'cal.legend.national': 'National Holiday',
    'cal.legend.lunar': 'Lunar Festival',
    'cal.legend.substitute': 'Substitute Day',
    // Event panel
    'cal.panel.title': "This Month's Holidays",
    'cal.panel.date': 'Date',
    'cal.panel.name': 'Holiday',
    'cal.panel.empty': 'No holidays recorded this month',
    'cal.note': '* Lunar dates are converted from the traditional calendar. Substitute days follow official Executive Yuan announcements. For reference only.',
  }
};

// ── Holiday data (2025–2026) ──
// types: 'national' | 'lunar' | 'substitute'
const HOLIDAYS = {
  // ════════════ 2025 ════════════
  '2025-01-01': { zh: '開國紀念日',              en: 'Republic Day',                          type: 'national'    },
  '2025-01-27': { zh: '農曆春節連假（補假）',      en: 'Spring Festival Holiday (Bridge)',       type: 'substitute'  },
  '2025-01-28': { zh: '農曆除夕',                 en: "Lunar New Year's Eve",                  type: 'lunar'       },
  '2025-01-29': { zh: '農曆春節 正月初一',         en: 'Lunar New Year – Day 1',                type: 'lunar'       },
  '2025-01-30': { zh: '農曆春節 正月初二',         en: 'Lunar New Year – Day 2',                type: 'lunar'       },
  '2025-01-31': { zh: '農曆春節 正月初三',         en: 'Lunar New Year – Day 3',                type: 'lunar'       },
  '2025-02-01': { zh: '農曆春節連假（補假）',      en: 'Spring Festival Holiday (Bridge)',       type: 'substitute'  },
  '2025-02-02': { zh: '農曆春節連假（補假）',      en: 'Spring Festival Holiday (Bridge)',       type: 'substitute'  },
  '2025-02-03': { zh: '農曆春節連假（補假）',      en: 'Spring Festival Holiday (Bridge)',       type: 'substitute'  },
  '2025-02-04': { zh: '農曆春節連假（補假）',      en: 'Spring Festival Holiday (Bridge)',       type: 'substitute'  },
  '2025-02-28': { zh: '和平紀念日',               en: 'Peace Memorial Day',                    type: 'national'    },
  '2025-04-03': { zh: '兒童節補假',               en: "Children's Day (Bridge)",               type: 'substitute'  },
  '2025-04-04': { zh: '兒童節 ／ 清明節',          en: "Children's Day / Qingming Festival",    type: 'national'    },
  '2025-05-01': { zh: '勞動節',                   en: "Labour Day",                            type: 'national'    },
  '2025-05-31': { zh: '端午節',                   en: 'Dragon Boat Festival',                  type: 'lunar'       },
  '2025-06-02': { zh: '端午節補假',               en: 'Dragon Boat Festival (Bridge)',          type: 'substitute'  },
  '2025-09-28': { zh: '教師節',                   en: "Teacher's Day",                         type: 'national'    },
  '2025-10-06': { zh: '中秋節',                   en: 'Mid-Autumn Festival',                   type: 'lunar'       },
  '2025-10-10': { zh: '中華民國國慶日',            en: 'National Day',                          type: 'national'    },
  '2025-12-25': { zh: '行憲紀念日',               en: 'Constitution Day',                      type: 'national'    },

  // ════════════ 2026 ════════════
  // 資料來源：行政院人事行政總處 https://www.dgpa.gov.tw/information?uid=41&pid=12573
  '2026-01-01': { zh: '開國紀念日',              en: 'Republic Day',                           type: 'national'    },
  '2026-02-13': { zh: '農曆春節補假',            en: 'Spring Festival Holiday (Bridge)',        type: 'substitute'  },
  '2026-02-16': { zh: '農曆除夕',                en: "Lunar New Year's Eve",                   type: 'lunar'       },
  '2026-02-17': { zh: '農曆春節 正月初一',        en: 'Lunar New Year – Day 1',                 type: 'lunar'       },
  '2026-02-18': { zh: '農曆春節 正月初二',        en: 'Lunar New Year – Day 2',                 type: 'lunar'       },
  '2026-02-19': { zh: '農曆春節 正月初三',        en: 'Lunar New Year – Day 3',                 type: 'lunar'       },
  '2026-02-20': { zh: '農曆春節連假（補假）',     en: 'Spring Festival Holiday (Bridge)',        type: 'substitute'  },
  '2026-02-21': { zh: '農曆春節連假（補假）',     en: 'Spring Festival Holiday (Bridge)',        type: 'substitute'  },
  '2026-02-27': { zh: '和平紀念日補假',           en: 'Peace Memorial Day (Bridge)',            type: 'substitute'  },
  '2026-02-28': { zh: '和平紀念日',              en: 'Peace Memorial Day',                     type: 'national'    },
  '2026-04-03': { zh: '兒童節 ／ 清明節補假',    en: "Children's Day / Qingming (Bridge)",      type: 'substitute'  },
  '2026-04-04': { zh: '兒童節',                  en: "Children's Day",                         type: 'national'    },
  '2026-04-05': { zh: '清明節',                  en: 'Qingming Festival',                      type: 'lunar'       },
  '2026-04-06': { zh: '清明節補假',              en: 'Qingming Festival (Bridge)',              type: 'substitute'  },
  '2026-05-01': { zh: '勞動節',                  en: "Labour Day",                             type: 'national'    },
  '2026-06-19': { zh: '端午節',                  en: 'Dragon Boat Festival',                   type: 'lunar'       },
  '2026-09-25': { zh: '中秋節',                  en: 'Mid-Autumn Festival',                    type: 'lunar'       },
  '2026-09-28': { zh: '中秋節 ／ 教師節補假',    en: "Mid-Autumn / Teacher's Day (Bridge)",    type: 'substitute'  },
  '2026-10-09': { zh: '國慶日補假',              en: 'National Day (Bridge)',                   type: 'substitute'  },
  '2026-10-10': { zh: '中華民國國慶日',           en: 'National Day',                           type: 'national'    },
  '2026-12-25': { zh: '行憲紀念日',              en: 'Constitution Day',                        type: 'national'    },
};

// ── State ──
let currentLang = localStorage.getItem('tipsse-lang') || 'zh';
const today = new Date();
let viewYear  = today.getFullYear();
let viewMonth = today.getMonth(); // 0-indexed

// ── i18n helpers ──
function t(key) {
  const lang = translations[currentLang] || translations.zh;
  return lang[key] ?? key;
}

function applyLang(lang) {
  currentLang = lang;
  localStorage.setItem('tipsse-lang', lang);
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    const val = t(key);
    if (val !== key) el.textContent = val;
  });
  const btn = document.getElementById('langBtn');
  if (btn) btn.textContent = lang === 'zh' ? 'EN' : '中';
  renderCalendar();
}

// ── Date formatting ──
function dateKey(year, month, day) {
  const mm = String(month + 1).padStart(2, '0');
  const dd = String(day).padStart(2, '0');
  return `${year}-${mm}-${dd}`;
}

// ── Render calendar grid ──
function renderCalendar() {
  const year  = viewYear;
  const month = viewMonth;
  const months = t('cal.months');
  const weekdays = t('cal.weekdays');
  const suffix   = t('cal.year.suffix');

  // Update header
  document.getElementById('calMonthLabel').textContent =
    `${year}${suffix}${months[month]}`;

  // First day of month (0=Sun…6=Sat) and total days
  const firstDay  = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();
  const prevTotal = new Date(year, month, 0).getDate();

  // Build weekday header
  const headerRow = document.getElementById('calWeekdays');
  headerRow.innerHTML = '';
  weekdays.forEach(d => {
    const cell = document.createElement('div');
    cell.className = 'cal-cell cal-weekday';
    cell.textContent = d;
    headerRow.appendChild(cell);
  });

  // Build day cells
  const grid = document.getElementById('calGrid');
  grid.innerHTML = '';

  // Trailing days from previous month
  for (let i = 0; i < firstDay; i++) {
    const cell = document.createElement('div');
    cell.className = 'cal-cell cal-other';
    cell.textContent = prevTotal - firstDay + 1 + i;
    grid.appendChild(cell);
  }

  // Days of current month
  for (let day = 1; day <= totalDays; day++) {
    const key  = dateKey(year, month, day);
    const hol  = HOLIDAYS[key];
    const isToday = (year === today.getFullYear() &&
                     month === today.getMonth()   &&
                     day   === today.getDate());

    const cell = document.createElement('div');
    cell.className = 'cal-cell cal-day';
    if (isToday)     cell.classList.add('cal-today');
    if (hol)         cell.classList.add('cal-has-event', `cal-type-${hol.type}`);

    const num = document.createElement('span');
    num.className = 'cal-day-num';
    num.textContent = day;
    cell.appendChild(num);

    if (hol) {
      const dot = document.createElement('span');
      dot.className = `cal-dot cal-dot-${hol.type}`;
      cell.appendChild(dot);

      const label = document.createElement('span');
      label.className = 'cal-event-label';
      label.textContent = hol[currentLang] ?? hol.zh;
      cell.appendChild(label);
    }

    grid.appendChild(cell);
  }

  // Leading days for next month
  const totalCells = firstDay + totalDays;
  const remaining  = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
  for (let i = 1; i <= remaining; i++) {
    const cell = document.createElement('div');
    cell.className = 'cal-cell cal-other';
    cell.textContent = i;
    grid.appendChild(cell);
  }

  renderEventList(year, month);
}

// ── Event list for current month ──
function renderEventList(year, month) {
  const list = document.getElementById('calEventList');
  list.innerHTML = '';

  const monthKey = `${year}-${String(month + 1).padStart(2, '0')}`;
  const events = Object.entries(HOLIDAYS)
    .filter(([k]) => k.startsWith(monthKey))
    .sort(([a], [b]) => a.localeCompare(b));

  if (events.length === 0) {
    const empty = document.createElement('p');
    empty.className = 'cal-empty';
    empty.setAttribute('data-i18n', 'cal.panel.empty');
    empty.textContent = t('cal.panel.empty');
    list.appendChild(empty);
    return;
  }

  const months = t('cal.months');
  events.forEach(([key, hol]) => {
    const [, m, d] = key.split('-').map(Number);
    const row = document.createElement('div');
    row.className = `cal-event-row cal-event-row-${hol.type}`;

    const dateSpan = document.createElement('span');
    dateSpan.className = 'cal-event-row-date';
    dateSpan.textContent = currentLang === 'zh'
      ? `${months[m - 1]} ${d} 日`
      : `${months[m - 1]} ${d}`;

    const nameSpan = document.createElement('span');
    nameSpan.className = 'cal-event-row-name';
    nameSpan.textContent = hol[currentLang] ?? hol.zh;

    const badge = document.createElement('span');
    badge.className = `cal-badge cal-badge-${hol.type}`;
    badge.textContent = t(`cal.legend.${hol.type}`);

    row.appendChild(dateSpan);
    row.appendChild(nameSpan);
    row.appendChild(badge);
    list.appendChild(row);
  });
}

// ── Navigation ──
function navigate(delta) {
  viewMonth += delta;
  if (viewMonth > 11) { viewMonth = 0;  viewYear++; }
  if (viewMonth < 0)  { viewMonth = 11; viewYear--; }
  renderCalendar();
}

function goToday() {
  viewYear  = today.getFullYear();
  viewMonth = today.getMonth();
  renderCalendar();
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
navLinks.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => navLinks.classList.remove('open'))
);

// ── Lang button ──
document.getElementById('langBtn').addEventListener('click', () => {
  applyLang(currentLang === 'zh' ? 'en' : 'zh');
});

// ── Prev / Next / Today buttons ──
document.getElementById('calPrev').addEventListener('click',    () => navigate(-1));
document.getElementById('calNext').addEventListener('click',    () => navigate(1));
document.getElementById('calToday').addEventListener('click',   goToday);

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
const obs = new IntersectionObserver(entries => {
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

// ── Init ──
applyLang(currentLang);
