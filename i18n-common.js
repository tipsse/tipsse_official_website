// ══════════════════════════════════
// 共用翻譯 — 導覽列與頁尾
// ══════════════════════════════════
// 這些字串在每個頁面都會出現，集中管理避免各頁複製後漂移。
// 修改導覽列文字或版權年份，改這裡一處即可，四個頁面同步生效。
//
// 使用方式：在頁面 JS 之前載入，然後在該頁的 translations 中展開：
//   const translations = {
//     zh: { ...COMMON_I18N.zh, /* 本頁專屬字串 */ },
//     en: { ...COMMON_I18N.en, /* 本頁專屬字串 */ },
//   };

const COMMON_I18N = {
  zh: {
    'nav.about':    '關於學會',
    'nav.projects': '專案成果',
    'nav.roadmap':  '發展藍圖',
    'nav.mbse':     'MBSE 工具',
    'nav.academy':  '太空學堂',
    'nav.calendar': '行事曆',
    'nav.contact':  '聯絡我們',
    'footer.copy':  `© 2021–${new Date().getFullYear()} 中華民國行星科學系統工程學會 TIPSSE. All rights reserved.`,
  },
  en: {
    'nav.about':    'About',
    'nav.projects': 'Projects',
    'nav.roadmap':  'Roadmap',
    'nav.mbse':     'MBSE Tool',
    'nav.academy':  'Space Academy',
    'nav.calendar': 'Calendar',
    'nav.contact':  'Contact',
    'footer.copy':  `© 2021–${new Date().getFullYear()} Taiwan Institute of Planetary Science and System Engineering (TIPSSE). All rights reserved.`,
  },
};
