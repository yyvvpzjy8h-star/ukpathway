import type { L } from "../i18n";

export type Nation = "England" | "Scotland";
export type FeeStatus = "official" | "unofficial" | "check";

export type University = {
  id: string;
  name: string;
  zhName: string;
  city: L;
  nation: Nation;
  london: boolean;
  qs2027: number | null;
  qsNote?: L;
  setting: L;
  typicalOffer: string;
  degreeYears: number;
  tests: L;
  strengths: L;
  intlFee: { from?: number; to?: number; status: FeeStatus; note?: L };
  calcIntlDefault: number;
  pros: L[];
  cons: L[];
  website: string;
  feesUrl: string;
};

// International fees are for 2026/27 entrants (the latest published at time of checking).
// 2027/28 fees are usually a few percent higher.
export const UNIVERSITIES: University[] = [
  {
    id: "oxford",
    name: "University of Oxford",
    zhName: "牛津大学",
    city: { en: "Oxford", zh: "牛津" },
    nation: "England",
    london: false,
    qs2027: 4,
    setting: { en: "Collegiate, historic city", zh: "学院制，古城" },
    typicalOffer: "A*A*A – AAA",
    degreeYears: 3,
    tests: {
      en: "Many courses use UAT-UK tests (ESAT / TMUA / TARA) from 2027 entry, replacing Oxford's own tests (TSA, MAT, PAT…). LNAT for Law, UCAT for Medicine. Interviews in December.",
      zh: "2027 入学起，很多专业改用 UAT-UK 统一考试（ESAT / TMUA / TARA），取代牛津原有的 TSA、MAT、PAT 等。法学考 LNAT，医学考 UCAT。12 月面试。",
    },
    strengths: { en: "PPE, Law, Maths, Medicine, Humanities", zh: "PPE（政经哲）、法学、数学、医学、人文" },
    intlFee: { from: 37380, to: 62820, status: "official", note: { en: "Varies by course", zh: "按专业不同" } },
    calcIntlDefault: 45000,
    pros: [
      { en: "Weekly tutorials in very small groups with academics", zh: "导师小组辅导（Tutorial），每周与学者深入讨论" },
      { en: "Most colleges house undergraduates for much or all of the degree", zh: "多数学院为本科生提供大部分甚至全部年份的住宿" },
    ],
    cons: [
      { en: "Eight-week terms are intense", zh: "每学期只有 8 周，节奏非常紧" },
      { en: "Can't apply to both Oxford and Cambridge in the same year; deadline is 15 October", zh: "牛津和剑桥同一年只能申请一所，10 月 15 日截止" },
    ],
    website: "https://www.ox.ac.uk/admissions/undergraduate",
    feesUrl: "https://www.ox.ac.uk/admissions/undergraduate/fees-and-funding/course-fees",
  },
  {
    id: "cambridge",
    name: "University of Cambridge",
    zhName: "剑桥大学",
    city: { en: "Cambridge", zh: "剑桥" },
    nation: "England",
    london: false,
    qs2027: 6,
    setting: { en: "Collegiate, small city", zh: "学院制，小城市" },
    typicalOffer: "A*A*A – A*AA",
    degreeYears: 3,
    tests: {
      en: "ESAT (sciences / engineering), TMUA (e.g. Economics, Computer Science), LNAT (Law), UCAT (Medicine). Maths offers usually include STEP. Interviews in December.",
      zh: "理工科考 ESAT，经济、计算机等考 TMUA，法学考 LNAT，医学考 UCAT。数学专业的录取条件通常包含 STEP。12 月面试。",
    },
    strengths: { en: "Natural Sciences, Maths, Engineering, Computer Science, Economics", zh: "自然科学、数学、工程、计算机、经济" },
    intlFee: {
      from: 29052,
      to: 70554,
      status: "official",
      note: {
        en: "University fee only — overseas students also pay a college fee (often c. £10k–£14k/yr)",
        zh: "这只是大学学费，国际生还需另交学院费（通常每年约 £1–1.4 万）",
      },
    },
    calcIntlDefault: 56000,
    pros: [
      { en: "Broad first year in Natural Sciences / Engineering before specialising", zh: "自然科学和工程大一先宽口径学习，之后再细分方向" },
      { en: "Small, safe, bikeable city", zh: "城市小、安全，骑车就能到处走" },
    ],
    cons: [
      { en: "Exam-heavy assessment in many subjects", zh: "很多专业主要靠期末考试定成绩" },
      { en: "Smaller city with less nightlife than London or Manchester", zh: "城市小，娱乐和夜生活不如伦敦、曼城" },
    ],
    website: "https://www.undergraduate.study.cam.ac.uk/",
    feesUrl: "https://www.undergraduate.study.cam.ac.uk/international-students/international-fees-and-costs",
  },
  {
    id: "imperial",
    name: "Imperial College London",
    zhName: "帝国理工学院",
    city: { en: "London (South Kensington)", zh: "伦敦（南肯辛顿）" },
    nation: "England",
    london: true,
    qs2027: 2,
    qsNote: { en: "Joint 2nd", zh: "并列第 2" },
    setting: { en: "Science, engineering, medicine & business only", zh: "只设理、工、医、商" },
    typicalOffer: "A*A*A – AAA",
    degreeYears: 3,
    tests: {
      en: "Either ESAT or TMUA is compulsory depending on the course; UCAT for Medicine. Interviews for many courses.",
      zh: "按专业不同，ESAT 或 TMUA 必考其一；医学考 UCAT。很多专业有面试。",
    },
    strengths: { en: "Engineering, Computing, Medicine, Natural Sciences", zh: "工程、计算机、医学、自然科学" },
    intlFee: {
      from: 45500,
      status: "official",
      note: { en: "£45,500 for Engineering (incl. Computing); Medicine is higher", zh: "工程类（含计算机）为 £45,500；医学更贵" },
    },
    calcIntlDefault: 45500,
    pros: [
      { en: "Very strong reputation with STEM and quant employers", zh: "在理工科和量化金融雇主中认可度很高" },
      { en: "Central London campus next to the museums", zh: "主校区在伦敦市中心，紧邻博物馆区" },
    ],
    cons: [
      { en: "Heavy workload; little humanities / social science mix", zh: "课业重，缺少人文社科氛围" },
      { en: "London rent is expensive; guaranteed halls usually first year only", zh: "伦敦房租贵，学校通常只保证大一住宿" },
    ],
    website: "https://www.imperial.ac.uk/study/",
    feesUrl: "https://www.imperial.ac.uk/students/fees-and-funding/tuition-fees/",
  },
  {
    id: "ucl",
    name: "University College London (UCL)",
    zhName: "伦敦大学学院",
    city: { en: "London (Bloomsbury)", zh: "伦敦（布卢姆斯伯里）" },
    nation: "England",
    london: true,
    qs2027: 8,
    setting: { en: "Large, comprehensive, central London", zh: "大型综合性大学，伦敦市中心" },
    typicalOffer: "A*A*A – ABB",
    degreeYears: 3,
    tests: {
      en: "TMUA (Economics), LNAT (Law), UCAT (Medicine), portfolio (Architecture). Check each course page.",
      zh: "经济考 TMUA，法学考 LNAT，医学考 UCAT，建筑需作品集。请以各专业页面为准。",
    },
    strengths: { en: "Architecture (Bartlett), Education, Medicine & Neuroscience, Economics", zh: "建筑（Bartlett）、教育、医学与神经科学、经济" },
    intlFee: {
      status: "check",
      note: { en: "Set per course; check UCL's fee schedule", zh: "按专业单独定价，请查 UCL 学费表" },
    },
    calcIntlDefault: 39000,
    pros: [
      { en: "Huge range of subjects and a strong global name", zh: "专业门类非常全，国际知名度高" },
      { en: "Central London location", zh: "地处伦敦市中心" },
    ],
    cons: [
      { en: "Large cohorts on popular courses", zh: "热门专业人数多" },
      { en: "Halls usually guaranteed for first year only", zh: "通常只保证大一住宿" },
    ],
    website: "https://www.ucl.ac.uk/prospective-students/undergraduate",
    feesUrl: "https://www.ucl.ac.uk/study/undergraduate-fees-2026-2027",
  },
  {
    id: "kcl",
    name: "King's College London",
    zhName: "伦敦国王学院",
    city: { en: "London (Strand & others)", zh: "伦敦（Strand 等多个校区）" },
    nation: "England",
    london: true,
    qs2027: 37,
    setting: { en: "Multi-campus, central London", zh: "多校区，伦敦市中心" },
    typicalOffer: "A*AA – ABB",
    degreeYears: 3,
    tests: { en: "LNAT (Law), UCAT (Medicine, Dentistry). Most other courses: no test.", zh: "法学考 LNAT，医学和牙医考 UCAT，其他大多数专业无需笔试。" },
    strengths: { en: "Law, Medicine & health sciences, War Studies, Humanities", zh: "法学、医学与健康科学、战争研究、人文" },
    intlFee: { status: "check", note: { en: "Set per course; check King's course pages", zh: "按专业定价，请查官网专业页面" } },
    calcIntlDefault: 33000,
    pros: [
      { en: "Major health-sciences and law school", zh: "健康科学和法学实力强" },
      { en: "Campuses on the Thames in central London", zh: "校区在伦敦市中心泰晤士河畔" },
    ],
    cons: [
      { en: "Campuses spread across London", zh: "校区分散在伦敦各处" },
      { en: "High London living costs", zh: "伦敦生活成本高" },
    ],
    website: "https://www.kcl.ac.uk/study/undergraduate",
    feesUrl: "https://www.kcl.ac.uk/study/undergraduate",
  },
  {
    id: "lse",
    name: "London School of Economics (LSE)",
    zhName: "伦敦政治经济学院",
    city: { en: "London (Holborn)", zh: "伦敦（霍本）" },
    nation: "England",
    london: true,
    qs2027: 62,
    qsNote: {
      en: "QS overall rank understates it: no science or medicine",
      zh: "没有理工医科，QS 综合排名低于它在社科领域的实际地位",
    },
    setting: { en: "Social sciences only, city campus", zh: "只设社科，城市校园" },
    typicalOffer: "A*AA – AAA",
    degreeYears: 3,
    tests: {
      en: "TMUA mandatory for BSc Economics and BSc Econometrics & Mathematical Economics (recommended for several others); LNAT for Law. Generally no interviews.",
      zh: "经济学、计量经济与数理经济学必考 TMUA（其他若干专业推荐考）；法学考 LNAT。一般不面试。",
    },
    strengths: { en: "Economics, Finance, Law, Politics & International Relations", zh: "经济、金融、法学、政治与国际关系" },
    intlFee: {
      status: "check",
      note: { en: "Tiered by programme, fixed for your whole degree; check LSE's table of fees", zh: "按专业分档，入学后整个学位期间不变；请查 LSE 学费表" },
    },
    calcIntlDefault: 36000,
    pros: [
      { en: "Leading name for economics, finance and law employers", zh: "在经济、金融、法律雇主中名气很大" },
      { en: "Overseas fee fixed for the whole degree", zh: "国际生学费整个学位期间锁定不涨" },
    ],
    cons: [
      { en: "Compact city campus, limited sports space", zh: "校园就是几栋城市楼，运动场地少" },
      { en: "Competitive internship culture from first year", zh: "从大一就开始卷实习，压力大" },
    ],
    website: "https://www.lse.ac.uk/study-at-lse/undergraduate",
    feesUrl: "https://www.lse.ac.uk/study-at-lse/undergraduate/fees-and-funding",
  },
  {
    id: "edinburgh",
    name: "University of Edinburgh",
    zhName: "爱丁堡大学",
    city: { en: "Edinburgh", zh: "爱丁堡" },
    nation: "Scotland",
    london: false,
    qs2027: 35,
    setting: { en: "Large, historic capital city", zh: "大型综合性大学，历史名城" },
    typicalOffer: "A*A*A – ABB",
    degreeYears: 4,
    tests: { en: "UCAT (Medicine). Most courses: no test.", zh: "医学考 UCAT，大多数专业无需笔试。" },
    strengths: { en: "Informatics / AI, Medicine, Veterinary, Humanities", zh: "信息学/人工智能、医学、兽医、人文" },
    intlFee: { status: "check", note: { en: "Set per course; check Edinburgh's fee tables", zh: "按专业定价，请查官网学费表" } },
    calcIntlDefault: 33000,
    pros: [
      { en: "Scottish students pay no tuition; rest-of-UK fee is £9,535", zh: "苏格兰本地学生免学费；英国其他地区学生学费 £9,535" },
      { en: "Beautiful, walkable city", zh: "城市漂亮，步行就能到处走" },
    ],
    cons: [
      { en: "Scottish degrees usually take 4 years (one more year of costs)", zh: "苏格兰本科通常读 4 年，多一年开销" },
      { en: "Accommodation pressure, especially during the festival season", zh: "住宿紧张，艺术节期间尤其明显" },
    ],
    website: "https://www.ed.ac.uk/studying/undergraduate",
    feesUrl: "https://www.ed.ac.uk/student-funding/tuition-fees",
  },
  {
    id: "manchester",
    name: "University of Manchester",
    zhName: "曼彻斯特大学",
    city: { en: "Manchester", zh: "曼彻斯特" },
    nation: "England",
    london: false,
    qs2027: 40,
    setting: { en: "Large red-brick, big city", zh: "大型红砖大学，大城市" },
    typicalOffer: "A*A*A – ABB",
    degreeYears: 3,
    tests: { en: "UCAT (Medicine). Most courses: no test.", zh: "医学考 UCAT，大多数专业无需笔试。" },
    strengths: { en: "Materials, Physics, Chemical Engineering, Business, Computer Science", zh: "材料、物理、化工、商科、计算机" },
    intlFee: {
      from: 26000,
      to: 39900,
      status: "unofficial",
      note: { en: "Third-party estimate; confirm on the course page", zh: "第三方数据，请到专业页面确认" },
    },
    calcIntlDefault: 32000,
    pros: [
      { en: "Huge student city with lower rents than London", zh: "学生城市，房租比伦敦低" },
      { en: "Heavily targeted by graduate employers", zh: "毕业生雇主校园招聘非常集中" },
    ],
    cons: [
      { en: "Large classes on popular courses", zh: "热门专业班级人数多" },
      { en: "Some areas need care at night", zh: "部分街区夜间需注意安全" },
    ],
    website: "https://www.manchester.ac.uk/study/undergraduate/",
    feesUrl: "https://www.manchester.ac.uk/study/undergraduate/fees-and-funding/",
  },
  {
    id: "bristol",
    name: "University of Bristol",
    zhName: "布里斯托大学",
    city: { en: "Bristol", zh: "布里斯托" },
    nation: "England",
    london: false,
    qs2027: 57,
    setting: { en: "Red-brick, lively city", zh: "红砖大学，城市氛围活跃" },
    typicalOffer: "A*A*A – ABB",
    degreeYears: 3,
    tests: { en: "LNAT (Law), UCAT (Medicine). Most courses: no test.", zh: "法学考 LNAT，医学考 UCAT，大多数专业无需笔试。" },
    strengths: { en: "Engineering, Economics, Law, Veterinary, Earth Sciences", zh: "工程、经济、法学、兽医、地球科学" },
    intlFee: { status: "check", note: { en: "Set per course; check Bristol's overseas fee page", zh: "按专业定价，请查官网国际生学费页面" } },
    calcIntlDefault: 32000,
    pros: [
      { en: "Strong all-rounder with a lively city", zh: "各学科均衡，城市生活丰富" },
      { en: "Good links with engineering and aerospace employers", zh: "与工程和航空航天企业联系紧密" },
    ],
    cons: [
      { en: "Hilly city; rents have risen fast", zh: "城市坡多，房租涨得快" },
      { en: "Popular courses are very competitive", zh: "热门专业竞争激烈" },
    ],
    website: "https://www.bristol.ac.uk/study/undergraduate/",
    feesUrl: "https://www.bristol.ac.uk/study/undergraduate/fees-funding/",
  },
  {
    id: "warwick",
    name: "University of Warwick",
    zhName: "华威大学",
    city: { en: "Coventry (campus)", zh: "考文垂（独立校园）" },
    nation: "England",
    london: false,
    qs2027: 68,
    qsNote: { en: "Joint 68th", zh: "并列第 68" },
    setting: { en: "Self-contained modern campus", zh: "现代化独立校园" },
    typicalOffer: "A*A*A – AAB",
    degreeYears: 3,
    tests: {
      en: "TMUA used for Maths, Economics and related courses (check whether required or optional); STEP may appear in Maths offers.",
      zh: "数学、经济等专业使用 TMUA（请确认是必考还是可选）；数学专业的录取条件可能包含 STEP。",
    },
    strengths: { en: "Maths, MORSE, Economics, Business (WBS), Computer Science", zh: "数学、MORSE、经济、商科（WBS）、计算机" },
    intlFee: {
      from: 27870,
      to: 35530,
      status: "official",
      note: { en: "Band 1 classroom courses £27,870; Band 2 (lab, Maths, Economics, WBS) £35,530", zh: "第一档（课堂类）£27,870；第二档（实验类、数学、经济、商学院）£35,530" },
    },
    calcIntlDefault: 35530,
    pros: [
      { en: "Respected by finance and consulting employers", zh: "金融和咨询行业认可度高" },
      { en: "Safe campus with everything within walking distance", zh: "校园安全，所有设施步行可达" },
    ],
    cons: [
      { en: "Campus is out of town; second-years often live in Leamington Spa", zh: "校园在郊区，大二学生多住在 Leamington Spa 小镇" },
      { en: "Quieter social scene than a big city", zh: "周边娱乐不如大城市" },
    ],
    website: "https://warwick.ac.uk/study/undergraduate/",
    feesUrl: "https://warwick.ac.uk/study/undergraduate/studentfunding/course-costs/",
  },
  {
    id: "durham",
    name: "Durham University",
    zhName: "杜伦大学",
    city: { en: "Durham", zh: "杜伦" },
    nation: "England",
    london: false,
    qs2027: 85,
    setting: { en: "Collegiate, small historic city", zh: "学院制，历史小城" },
    typicalOffer: "A*A*A – ABB",
    degreeYears: 3,
    tests: { en: "LNAT (Law). Most courses: no test.", zh: "法学考 LNAT，大多数专业无需笔试。" },
    strengths: { en: "Law, Economics, Theology, History, Natural Sciences", zh: "法学、经济、神学、历史、自然科学" },
    intlFee: { status: "check", note: { en: "Set per course; check Durham's fee pages", zh: "按专业定价，请查官网学费页面" } },
    calcIntlDefault: 31000,
    pros: [
      { en: "Collegiate system with strong community and sport", zh: "学院制，集体归属感强，体育氛围好" },
      { en: "Lower living costs than the South East", zh: "生活成本比英格兰东南部低" },
    ],
    cons: [
      { en: "Small city, quieter social life", zh: "城市小，娱乐较少" },
      { en: "Further from London (around 3 hours by train)", zh: "离伦敦较远（火车约 3 小时）" },
    ],
    website: "https://www.durham.ac.uk/study/undergraduate/",
    feesUrl: "https://www.durham.ac.uk/study/undergraduate/fees-and-funding/",
  },
  {
    id: "standrews",
    name: "University of St Andrews",
    zhName: "圣安德鲁斯大学",
    city: { en: "St Andrews", zh: "圣安德鲁斯" },
    nation: "Scotland",
    london: false,
    qs2027: 115,
    qsNote: { en: "From one source only", zh: "仅有一个来源" },
    setting: { en: "Small seaside town", zh: "海边小镇" },
    typicalOffer: "A*AA – ABB",
    degreeYears: 4,
    tests: { en: "UCAT (Medicine). Most courses: no test.", zh: "医学考 UCAT，大多数专业无需笔试。" },
    strengths: { en: "International Relations, Philosophy, English, History, Physics", zh: "国际关系、哲学、英语、历史、物理" },
    intlFee: {
      from: 33250,
      status: "official",
      note: { en: "£33,250 for Arts, Divinity and Science; Medicine £39,620", zh: "文、神学、理科 £33,250；医学 £39,620" },
    },
    calcIntlDefault: 33250,
    pros: [
      { en: "Very high student satisfaction; close-knit town", zh: "学生满意度很高，小镇社区氛围好" },
      { en: "Scottish students pay no tuition", zh: "苏格兰本地学生免学费" },
    ],
    cons: [
      { en: "4-year degree and a very small town", zh: "本科读 4 年，小镇很小" },
      { en: "Limited private housing; rents can be high", zh: "校外房源少，房租可能偏高" },
    ],
    website: "https://www.st-andrews.ac.uk/study/undergraduate/",
    feesUrl: "https://www.st-andrews.ac.uk/study/tuition-fees/undergraduate/",
  },
];

export function homeFeeFor(u: University, scottishStudent: boolean): number {
  if (u.nation === "Scotland") return scottishStudent ? 0 : 9535;
  return 9790;
}
