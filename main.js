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
    'nav.academy':      '太空學堂',
    'nav.contact':      '聯絡我們',
    'nav.login':        '會員登入',
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
    'stat.members':     '會員遍及全球',
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
    // Member auth
    'nav.login':            '會員登入',
    'nav.logout':           '登出',
    'login.title':          '會員專區',
    'login.subtitle':       '請輸入會員密碼以查看專屬內容',
    'login.placeholder':    '會員密碼',
    'login.btn':            '登入',
    'login.error':          '密碼錯誤，請再試一次',
    'member.login.hint':    '登入後查看活動照片與會議記錄',
    'member.zone.title':    '會員專區 · 活動照片 & 會議記錄',
    'member.photos.title':  '活動照片',
    'member.meetings.title':'會議記錄',
    'member.no.photos':     '尚未上傳活動照片',
    'member.no.meetings':   '尚未新增會議記錄',
    'member.docs.title':    '相關文件',
    'upload.photo':         '上傳照片',
    'upload.doc':           '上傳文件',
    'upload.meeting':       '新增會議記錄',
    'meeting.date.ph':      'YYYY-MM（日期）',
    'meeting.title.ph':     '會議名稱',
    'meeting.summary.ph':   '會議摘要（可選）',
    'doc.download':         '下載',
    'confirm.delete':       '確認刪除？',
    'board.badge':          '理監事',
    'login.subtitle':       '輸入密碼登入（一般會員 / 理監事）',
  },

  en: {
    'logo.sub':         '',
    'nav.about':        'About',
    'nav.projects':     'Projects',
    'nav.roadmap':      'Roadmap',
    'nav.mbse':         'MBSE Tool',
    'nav.academy':      'Space Academy',
    'nav.contact':      'Contact',
    'nav.login':        'Member Login',
    // Hero
    'hero.title':       'Explore the Universe,<br />Engineer the Future',
    'hero.subtitle':    'Advancing research in space science, planetary exploration,<br />and system engineering — bridging Taiwan and the world.',
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
    'stat.members':     'Members Worldwide',
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
    // Member auth
    'nav.login':            'Member Login',
    'nav.logout':           'Log Out',
    'login.title':          'Members Area',
    'login.subtitle':       'Enter the member password to access exclusive content',
    'login.placeholder':    'Member password',
    'login.btn':            'Login',
    'login.error':          'Incorrect password. Please try again.',
    'member.login.hint':    'Log in to view activity photos & meeting records',
    'member.zone.title':    'Members · Photos & Meeting Records',
    'member.photos.title':  'Activity Photos',
    'member.meetings.title':'Meeting Records',
    'member.no.photos':     'No photos uploaded yet',
    'member.no.meetings':   'No meeting records yet',
    'member.docs.title':    'Documents',
    'upload.photo':         'Upload Photo',
    'upload.doc':           'Upload File',
    'upload.meeting':       'Add Meeting Record',
    'meeting.date.ph':      'YYYY-MM (date)',
    'meeting.title.ph':     'Meeting title',
    'meeting.summary.ph':   'Summary (optional)',
    'doc.download':         'Download',
    'confirm.delete':       'Confirm deletion?',
    'board.badge':          'Board',
    'login.subtitle':       'Enter password (Member / Board Officer)',
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

  // placeholder elements
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    if (t[key] !== undefined) el.placeholder = t[key];
  });

  // Update lang button label
  const btn = document.getElementById('langBtn');
  btn.textContent = lang === 'zh' ? 'EN' : '中文';
  btn.setAttribute('aria-label', lang === 'zh' ? 'Switch to English' : '切換為中文');

  // Refresh member UI text & rebuild visible zones for new language
  if (typeof updateMemberUI === 'function') updateMemberUI();
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
  const suffix = el.dataset.suffix || '';
  const start  = performance.now();
  const update = (now) => {
    const p = Math.min((now - start) / 1800, 1);
    el.textContent = Math.round((1 - Math.pow(1 - p, 3)) * target) + suffix;
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

// ═══════════════════════════════════════════════════════════════════
// PASSWORDS — 修改這裡設定密碼
// ─────────────────────────────────────────────────────────────────
// 靜態網站的輕量存取控制，密碼可在原始碼中看見。
// 如需更強的安全性請搭配後端服務。
// ═══════════════════════════════════════════════════════════════════
const MEMBER_PASS = 'tipsse2024';       // ← 一般會員密碼
const BOARD_PASS  = 'tipsse-board2024'; // ← 理監事密碼（可上傳）

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

  function attemptLogin() {
    const v = pwInput.value;
    if (v === MEMBER_PASS)      { setMemberRole('member'); closeModal(); updateMemberUI(); }
    else if (v === BOARD_PASS)  { setMemberRole('board');  closeModal(); updateMemberUI(); }
    else {
      errorEl.textContent = translations[currentLang]['login.error'];
      pwInput.value = ''; pwInput.focus();
    }
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
