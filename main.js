/* ===========================
   TIPSSE – main.js
   =========================== */

// ══════════════════════════════════
// i18n Translations
// ══════════════════════════════════
const translations = {
  zh: {
    'logo.sub':         '中華民國行星科學系統工程學會',
    'nav.about':        '關於學會',
    'nav.projects':     '專案成果',
    'nav.roadmap':      '發展藍圖',
    'nav.mbse':         'MBSE 工具',
    'nav.contact':      '聯絡我們',
    // Hero
    'hero.title':       '探索宇宙，<br />工程未來',
    'hero.subtitle':    '致力於推動太空科學、行星研究與系統工程的跨領域整合，<br />連結台灣與國際的學術交流。',
    'hero.btn1':        '了解我們',
    'hero.btn2':        '查看藍圖',
    'hero.scroll':      '滾動探索',
    // About
    'about.tag':        '關於學會',
    'about.h2':         '我們是誰',
    'about.p':          '中華民國行星科學系統工程學會（TIPSSE）是依法設立之非營利社會組織，匯聚來自台灣各大學與國際機構的研究者，共同推進太空探索、行星科學與系統工程的前沿研究。',
    'about.mission.h3': '使命',
    'about.mission.p':  '促進太空科學、行星科學與系統工程領域的研究，並推動台灣與國際學術界之間的合作交流。',
    'about.vision.h3':  '願景',
    'about.vision.p':   '成為亞太地區行星科學與系統工程最具影響力的學術組織，孕育下一世代的太空科技人才。',
    'about.values.h3':  '價值觀',
    'about.values.p':   '開放協作、嚴謹研究、跨域整合，以及對宇宙探索永不止息的好奇心與熱情。',
    'about.story.h3':   '我們的故事',
    'about.story.p1':   'TIPSSE 由一群對太空充滿熱情的研究者與工程師共同創立，旨在填補台灣在行星科學與系統工程領域的研究空缺。學會自成立以來，積極參與國際研討會，主導多項衛星與火箭研發計畫，並持續透過 STEM 推廣教育，將太空夢想帶給更多台灣年輕學子。',
    'about.story.p2':   '從 SSsat-1 衛星原型到 RNX-71V 火箭發動機靜態測試，每一步都見證了台灣太空科技的成長與突破。',
    'stat.groups':      '專業分組',
    'stat.years':       '年以上歷史',
    'stat.intl':        '國際合作計畫',
    'stat.members':     '會員遍及全台',
    // Groups
    'groups.tag':       '組織架構',
    'groups.h2':        '四大專業分組',
    'groups.p':         '學會下設四個專業研究小組，各司其職，涵蓋系統工程、行星科學、STEM 教育及航太研發。',
    'g1.h3': '系統工程組',     'g1.p': '負責統籌技術研發專案，整合各子系統設計，確保任務架構的可靠性與可行性。',
    'g1.t1': '系統架構',       'g1.t2': '技術整合',       'g1.t3': '品質管理',
    'g2.h3': '行星科學暨國際合作組', 'g2.p': '推動行星科學研究，並建立與國際學術機構的合作橋樑，促進跨國研究交流。',
    'g2.t1': '行星探測',       'g2.t2': '國際合作',       'g2.t3': '學術交流',
    'g3.h3': 'STEM 推廣組',   'g3.p': '致力於太空科學教育推廣，透過工作坊、講座與活動，激發青少年對科技的興趣。',
    'g3.t1': '科普教育',       'g3.t2': '工作坊',         'g3.t3': '人才培育',
    'g4.h3': '航太系統研發組', 'g4.p': '專注於衛星、火箭及酬載系統的研發設計，從概念驗證到原型製作全程投入。',
    'g4.t1': '衛星研發',       'g4.t2': '火箭技術',       'g4.t3': '酬載系統',
    // Projects
    'proj.tag':    '專案成果',
    'proj.h2':     '重要里程碑',
    'proj.p':      '以下為學會近年來完成或進行中的重要研究與工程專案。',
    'proj.badge':  '旗艦計畫',
    'p1.h3': 'SSsat-1 衛星原型',      'p1.p': '自主研發之小型衛星原型，驗證關鍵子系統技術，為未來正式任務奠定基礎。涵蓋結構、電力、通訊與姿態控制等系統整合。',
    'p2.h3': 'RNX-71V 火箭發動機',   'p2.p': '完成 140mm 固態火箭發動機靜態點火測試，驗證推力特性與燃燒穩定性。',
    'p3.h3': 'GNSS-R 酬載計畫',      'p3.p': '2022 年 3 月啟動，利用 GPS 反射訊號進行地球遙測，探索海面高度與土壤濕度等應用。',
    'p4.h3': '星系研究計畫',          'p4.p': '2022 年 5 月展開，結合觀測資料與模擬分析，研究星系結構演化與行星系統形成機制。',
    'p5.h3': '國際研討會參與',        'p5.p': '2022 年 10 月代表台灣出席土耳其伊斯坦堡 PreMIC8 國際研討會，發表最新研究成果。',
    'status.active':  '進行中', 'status.active2': '進行中', 'status.active3': '進行中',
    'status.done':    '已完成', 'status.done2':   '已完成',
    // Roadmap
    'rm.tag': '發展藍圖',
    'rm.p':   '學會的短、中、長期發展目標，從技術研發到國際拓展，步步為營，邁向太空。',
    'badge.done':    '已達成', 'badge.done2':  '已達成',
    'badge.current': '進行中',
    'badge.upcoming':'規劃中',
    'badge.future':  '長期目標',
    'ph1.h3': '基礎建設與組織成立',
    'ph1.p':  '完成學會正式立案、建立四大專業分組架構、招募核心研究團隊，並啟動第一批內部研究計畫。',
    'ph1.m1': '✓ 學會依法正式立案', 'ph1.m2': '✓ 四大分組架構建立',
    'ph1.m3': '✓ 核心會員招募完成', 'ph1.m4': '✓ 內部研究計畫啟動',
    'ph2.h3': '技術驗證與國際接軌',
    'ph2.p':  '完成關鍵技術原型測試，建立國際合作網絡，積極參與國際學術研討會，提升台灣太空科技能見度。',
    'ph2.m1': '✓ RNX-71V 火箭發動機靜態測試', 'ph2.m2': '✓ SSsat-1 子系統整合驗證',
    'ph2.m3': '✓ GNSS-R 酬載計畫啟動',       'ph2.m4': '✓ 參與土耳其 PreMIC8 研討會',
    'ph2.m5': '✓ 定期會員大會與理監事會制度化',
    'ph3.h3': '能量積累與計畫深化',
    'ph3.p':  '深化各項研究計畫、擴大 STEM 推廣觸角、強化與國際機構的合作協議，並建立更完善的會員培訓體系。',
    'ph3.m1': '✓ STEM 工作坊系列課程',   'ph3.m2': '✓ SSsat-1 原型整合測試',
    'ph3.m3': '◑ GNSS-R 資料分析與發表', 'ph3.m4': '◑ 國際合作備忘錄簽署',
    'ph3.m5': '○ 學會官方出版品發行',
    'ph4.h3': '任務發射準備',
    'ph4.p':  '完成 SSsat-1 完整飛行版本設計，取得發射資格認證，並籌備第一次任務發射，同時擴大學生參與計畫。',
    'ph4.m1': '○ SSsat-1 飛行版本完成', 'ph4.m2': '○ 發射資格驗證與認證',
    'ph4.m3': '○ 學生衛星競賽計畫',     'ph4.m4': '○ 年度國際太空研討會主辦',
    'ph5.h3': '亞太領航、深空探索',
    'ph5.p':  '成為亞太區行星科學與系統工程的標竿組織，主導多顆衛星任務，推動台灣深空探測計畫，並建立完整的太空人才培育生態系。',
    'ph5.m1': '○ 多衛星任務部署',         'ph5.m2': '○ 深空探測可行性研究',
    'ph5.m3': '○ 設立常設太空科學研究中心','ph5.m4': '○ 亞太區學術聯盟召集',
    // Events
    'events.tag': '近期動態', 'events.h2': '活動紀錄',
    'events.p':   '學會定期舉辦會員聯誼、學術講座與工作坊，促進成員交流與學術成長。',
    'ev1.month': 'DEC', 'ev1.h4': '台北會員聯誼活動',
    'ev1.p':   '年度會員交流活動，促進成員互動，共同回顧年度成果與展望未來計畫。', 'ev1.tag': '聯誼活動',
    'ev2.month': 'DEC', 'ev2.h4': '第○○屆理監事聯席會議',
    'ev2.p':   '年度治理會議，審議學會重要議案、報告財務狀況，並規劃次年度工作方向。', 'ev2.tag': '正式會議',
    'ev3.month': 'JUL', 'ev3.h4': '宜蘭夏季郊遊活動',
    'ev3.p':   '學會會員夏季戶外聯誼，增進彼此情誼，凝聚學會向心力。', 'ev3.tag': '聯誼活動',
    'ev4.month': 'JUN', 'ev4.h4': '會員大會暨理監事會',
    'ev4.p':   '半年度全體會員大會，選舉學會幹部，審議重要提案，全體會員共同參與學會決策。', 'ev4.tag': '正式會議',
    'ev5.month': 'OCT', 'ev5.h4': 'PreMIC8 國際研討會（土耳其·伊斯坦堡）',
    'ev5.p':   '代表台灣赴伊斯坦堡出席國際研討會，發表學會研究成果，拓展國際合作網絡。', 'ev5.tag': '國際交流',
    // Contact
    'contact.tag': '聯絡我們', 'contact.h2': '加入我們的行列',
    'contact.p':   '無論你是研究者、工程師、學生，或是單純對太空充滿好奇，歡迎與我們聯繫。',
    'contact.web.h4': '官方網站', 'contact.li.a': 'TIPSSE LinkedIn', 'contact.fb.a': 'TIPSSE 粉絲專頁',
    // Footer
    'footer.brand.p':  'Taiwan Institute of Planetary Science<br />and System Engineering',
    'footer.brand.cn': '中華民國行星科學系統工程學會',
    'footer.copy':     '© 2024 中華民國行星科學系統工程學會 TIPSSE. All rights reserved.',
  },

  en: {
    'logo.sub':         'Taiwan Institute of Planetary Science and System Engineering',
    'nav.about':        'About',
    'nav.projects':     'Projects',
    'nav.roadmap':      'Roadmap',
    'nav.mbse':         'MBSE Tool',
    'nav.contact':      'Contact',
    // Hero
    'hero.title':       'Explore the Universe,<br />Engineer the Future',
    'hero.subtitle':    'Advancing interdisciplinary research in space science, planetary exploration, and system engineering — connecting Taiwan with the global academic community.',
    'hero.btn1':        'Learn More',
    'hero.btn2':        'View Roadmap',
    'hero.scroll':      'Scroll',
    // About
    'about.tag':        'About Us',
    'about.h2':         'Who We Are',
    'about.p':          'The Taiwan Institute of Planetary Science and System Engineering (TIPSSE) is a legally established non-profit organization. We bring together researchers from Taiwanese universities and international institutions to advance frontier research in space exploration, planetary science, and system engineering.',
    'about.mission.h3': 'Mission',
    'about.mission.p':  'To promote research in space science, planetary science, and system engineering, and to foster academic collaboration between Taiwan and the international community.',
    'about.vision.h3':  'Vision',
    'about.vision.p':   'To become the most influential academic organization for planetary science and system engineering in the Asia-Pacific region, nurturing the next generation of space technology talent.',
    'about.values.h3':  'Values',
    'about.values.p':   'Open collaboration, rigorous research, cross-disciplinary integration, and an unceasing curiosity and passion for exploring the cosmos.',
    'about.story.h3':   'Our Story',
    'about.story.p1':   'TIPSSE was co-founded by a group of researchers and engineers passionate about space, aiming to fill the gap in planetary science and system engineering research in Taiwan. Since its establishment, the institute has actively participated in international conferences, led satellite and rocket development projects, and continuously promoted STEM education to bring space dreams to more young people in Taiwan.',
    'about.story.p2':   'From the SSsat-1 satellite prototype to the RNX-71V rocket motor static test, every step bears witness to the growth and breakthroughs of Taiwan\'s space technology.',
    'stat.groups':      'Specialized Groups',
    'stat.years':       'Years of History',
    'stat.intl':        'International Projects',
    'stat.members':     'Members Nationwide',
    // Groups
    'groups.tag':       'Organization',
    'groups.h2':        'Four Specialized Groups',
    'groups.p':         'TIPSSE operates through four specialized research groups, each with a distinct focus covering system engineering, planetary science, STEM education, and aerospace R&D.',
    'g1.h3': 'System Engineering Group',
    'g1.p':  'Coordinates technical R&D projects, integrates subsystem designs, and ensures mission architecture reliability and feasibility.',
    'g1.t1': 'System Architecture', 'g1.t2': 'Tech Integration', 'g1.t3': 'Quality Management',
    'g2.h3': 'Planetary Science & International Cooperation Group',
    'g2.p':  'Advances planetary science research and builds collaborative bridges with international academic institutions to promote cross-border research exchange.',
    'g2.t1': 'Planetary Exploration', 'g2.t2': 'International Cooperation', 'g2.t3': 'Academic Exchange',
    'g3.h3': 'STEM Outreach Group',
    'g3.p':  'Dedicated to promoting space science education through workshops, lectures, and activities to spark young people\'s interest in technology.',
    'g3.t1': 'Science Education', 'g3.t2': 'Workshops', 'g3.t3': 'Talent Development',
    'g4.h3': 'Aerospace Systems R&D Group',
    'g4.p':  'Focused on the design and development of satellite, rocket, and payload systems — from concept verification to prototype production.',
    'g4.t1': 'Satellite R&D', 'g4.t2': 'Rocket Technology', 'g4.t3': 'Payload Systems',
    // Projects
    'proj.tag':   'Projects',
    'proj.h2':    'Key Milestones',
    'proj.p':     'Below are the major research and engineering projects completed or underway by the institute in recent years.',
    'proj.badge': 'Flagship',
    'p1.h3': 'SSsat-1 Satellite Prototype',
    'p1.p':  'An independently developed small satellite prototype validating key subsystem technologies, laying the foundation for future missions. Covers structure, power, communications, and attitude control system integration.',
    'p2.h3': 'RNX-71V Rocket Motor',
    'p2.p':  'Completed static ignition testing of a 140mm solid rocket motor, validating thrust characteristics and combustion stability.',
    'p3.h3': 'GNSS-R Payload Project',
    'p3.p':  'Initiated in March 2022, using GPS reflected signals for Earth remote sensing to explore applications in sea surface height and soil moisture.',
    'p4.h3': 'Galaxy Research Initiative',
    'p4.p':  'Launched in May 2022, combining observational data and simulation analysis to study galaxy structural evolution and planetary system formation mechanisms.',
    'p5.h3': 'International Conference Participation',
    'p5.p':  'Represented Taiwan at the PreMIC8 international conference in Istanbul, Turkey in October 2022, presenting the institute\'s latest research.',
    'status.active':  'In Progress', 'status.active2': 'In Progress', 'status.active3': 'In Progress',
    'status.done':    'Completed',   'status.done2':   'Completed',
    // Roadmap
    'rm.tag': 'Roadmap',
    'rm.p':   'Short, medium, and long-term development goals — from technical R&D to international expansion, advancing step by step toward space.',
    'badge.done':    'Achieved', 'badge.done2':  'Achieved',
    'badge.current': 'In Progress',
    'badge.upcoming':'Planned',
    'badge.future':  'Long-term Goal',
    'ph1.h3': 'Foundation & Establishment',
    'ph1.p':  'Officially registered the institute, established the four-group organizational structure, recruited the core research team, and launched the first batch of internal research projects.',
    'ph1.m1': '✓ Official legal registration completed', 'ph1.m2': '✓ Four-group structure established',
    'ph1.m3': '✓ Core membership recruited',             'ph1.m4': '✓ Internal research projects launched',
    'ph2.h3': 'Technology Validation & Global Integration',
    'ph2.p':  'Completed key technology prototype testing, established international collaboration networks, and actively participated in international academic conferences to raise the visibility of Taiwan\'s space technology.',
    'ph2.m1': '✓ RNX-71V rocket motor static test',        'ph2.m2': '✓ SSsat-1 subsystem integration verification',
    'ph2.m3': '✓ GNSS-R payload project launched',         'ph2.m4': '✓ Participated in PreMIC8 in Turkey',
    'ph2.m5': '✓ General assembly & board meeting regularized',
    'ph3.h3': 'Capability Building & Program Deepening',
    'ph3.p':  'Deepening ongoing research projects, expanding STEM outreach, strengthening cooperation agreements with international institutions, and building a more comprehensive member training system.',
    'ph3.m1': '✓ STEM workshop series launched',      'ph3.m2': '✓ SSsat-1 prototype integration test',
    'ph3.m3': '◑ GNSS-R data analysis & publication', 'ph3.m4': '◑ MOU signing with international partners',
    'ph3.m5': '○ Official institute publication launch',
    'ph4.h3': 'Mission Launch Preparation',
    'ph4.p':  'Complete the full flight version design of SSsat-1, obtain launch qualification certification, prepare for the first mission launch, and expand student participation programs.',
    'ph4.m1': '○ SSsat-1 flight version complete',          'ph4.m2': '○ Launch qualification & certification',
    'ph4.m3': '○ Student satellite competition program',    'ph4.m4': '○ Host annual international space symposium',
    'ph5.h3': 'Asia-Pacific Leadership & Deep Space Exploration',
    'ph5.p':  'Become the benchmark organization for planetary science and system engineering in the Asia-Pacific region, lead multi-satellite missions, advance Taiwan\'s deep space exploration initiatives, and build a complete space talent development ecosystem.',
    'ph5.m1': '○ Multi-satellite mission deployment',         'ph5.m2': '○ Deep space exploration feasibility study',
    'ph5.m3': '○ Establish a permanent space science research center', 'ph5.m4': '○ Convene Asia-Pacific academic alliance',
    // Events
    'events.tag': 'Latest News', 'events.h2': 'Activity Log',
    'events.p':   'TIPSSE regularly organizes member meetups, academic lectures, and workshops to promote exchange and academic growth among members.',
    'ev1.month': 'DEC', 'ev1.h4': 'Taipei Member Social Event',
    'ev1.p':   'Annual member exchange event to foster interaction, review achievements of the year, and look ahead to future plans.', 'ev1.tag': 'Social',
    'ev2.month': 'DEC', 'ev2.h4': 'Board & Supervisory Joint Meeting',
    'ev2.p':   'Annual governance meeting to review important proposals, report financial status, and plan the work direction for the following year.', 'ev2.tag': 'Official Meeting',
    'ev3.month': 'JUL', 'ev3.h4': 'Yilan Summer Outing',
    'ev3.p':   'Summer outdoor social for institute members to strengthen friendships and build camaraderie.', 'ev3.tag': 'Social',
    'ev4.month': 'JUN', 'ev4.h4': 'General Assembly & Board Meeting',
    'ev4.p':   'Semi-annual full member assembly to elect institute officers, deliberate on proposals, and allow all members to participate in governance.', 'ev4.tag': 'Official Meeting',
    'ev5.month': 'OCT', 'ev5.h4': 'PreMIC8 International Conference (Istanbul, Turkey)',
    'ev5.p':   'Represented Taiwan at an international conference in Istanbul, presenting the institute\'s research results and expanding the international collaboration network.', 'ev5.tag': 'International',
    // Contact
    'contact.tag': 'Contact Us', 'contact.h2': 'Join Our Community',
    'contact.p':   'Whether you are a researcher, engineer, student, or simply curious about space — we welcome you to reach out.',
    'contact.web.h4': 'Official Website', 'contact.li.a': 'TIPSSE on LinkedIn', 'contact.fb.a': 'TIPSSE Facebook Page',
    // Footer
    'footer.brand.p':  'Taiwan Institute of Planetary Science<br />and System Engineering',
    'footer.brand.cn': 'Republic of China',
    'footer.copy':     '© 2024 Taiwan Institute of Planetary Science and System Engineering (TIPSSE). All rights reserved.',
  }
};

// ── Language state ──
let currentLang = localStorage.getItem('tipsse-lang') || 'zh';

function applyLang(lang) {
  currentLang = lang;
  localStorage.setItem('tipsse-lang', lang);
  document.documentElement.lang = lang === 'zh' ? 'zh-TW' : 'en';

  const t = translations[lang];

  // textContent elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (t[key] !== undefined) el.textContent = t[key];
  });

  // innerHTML elements (contain <br> or tags)
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.dataset.i18nHtml;
    if (t[key] !== undefined) el.innerHTML = t[key];
  });

  // Update lang button label
  const btn = document.getElementById('langBtn');
  btn.textContent = lang === 'zh' ? 'EN' : '中文';
  btn.setAttribute('aria-label', lang === 'zh' ? 'Switch to English' : '切換為中文');
}

// ── Navbar scroll effect ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// ── Mobile nav toggle ──
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');
navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ── Language toggle button ──
document.getElementById('langBtn').addEventListener('click', () => {
  applyLang(currentLang === 'zh' ? 'en' : 'zh');
});

// ── Starfield ──
(function createStars() {
  const container = document.getElementById('stars');
  if (!container) return;
  const frag = document.createDocumentFragment();
  for (let i = 0; i < 160; i++) {
    const s = document.createElement('div');
    s.className = 'star';
    const size = Math.random() * 2.5 + 0.5;
    s.style.cssText = [
      `width:${size}px`, `height:${size}px`,
      `top:${Math.random() * 100}%`, `left:${Math.random() * 100}%`,
      `--op:${Math.random() * 0.6 + 0.1}`,
      `--dur:${Math.random() * 4 + 2}s`,
      `--delay:-${Math.random() * 5}s`,
    ].join(';');
    frag.appendChild(s);
  }
  container.appendChild(frag);
})();

// ── Scroll-in animations ──
const animObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const siblings = entry.target.parentElement.querySelectorAll('[data-animate]');
        let delay = 0;
        siblings.forEach((el, idx) => { if (el === entry.target) delay = idx * 80; });
        setTimeout(() => entry.target.classList.add('visible'), delay);
        animObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);
document.querySelectorAll('[data-animate]').forEach(el => animObserver.observe(el));

// ── Counter animation ──
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const start  = performance.now();
  const update = (now) => {
    const p = Math.min((now - start) / 1800, 1);
    el.textContent = Math.round((1 - Math.pow(1 - p, 3)) * target);
    if (p < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { animateCounter(entry.target); counterObserver.unobserve(entry.target); }
    });
  },
  { threshold: 0.5 }
);
document.querySelectorAll('.stat-number[data-target]').forEach(el => counterObserver.observe(el));

// ── Smooth anchor scroll ──
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 72, behavior: 'smooth' });
  });
});

// ── Active nav highlight ──
const sections   = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');
new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navAnchors.forEach(a => {
          a.style.color = '';
          if (a.getAttribute('href') === `#${entry.target.id}`) a.style.color = 'var(--accent)';
        });
      }
    });
  },
  { threshold: 0.35 }
).observe && sections.forEach(s => {
  new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navAnchors.forEach(a => {
            a.style.color = '';
            if (a.getAttribute('href') === `#${entry.target.id}`) a.style.color = 'var(--accent)';
          });
        }
      });
    },
    { threshold: 0.35 }
  ).observe(s);
});

// ── Init language on load ──
applyLang(currentLang);
