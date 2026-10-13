import type { L } from "../i18n";
import type { CourseId } from "./courses";

export type Career = {
  id: string;
  name: L;
  blurb: L;
  route: L;
  courses: CourseId[];
  apprenticeship?: L;
};

export const CAREERS: Career[] = [
  {
    id: "doctor",
    name: { en: "Doctor", zh: "医生" },
    blurb: { en: "Diagnose and treat patients in hospitals or GP surgeries.", zh: "在医院或全科诊所诊断和治疗病人。" },
    route: { en: "Medicine degree (5–6 years) → 2-year Foundation Programme → specialty training (several more years).", zh: "医学学位（5–6 年）→ 2 年基础培训（Foundation Programme）→ 专科培训（再需数年）。" },
    courses: ["medicine"],
  },
  {
    id: "dentist",
    name: { en: "Dentist", zh: "牙医" },
    blurb: { en: "Look after teeth and oral health, in the NHS or private practice.", zh: "在 NHS 或私立诊所负责牙齿和口腔健康。" },
    route: { en: "Dentistry degree (5 years) → usually one year of foundation training.", zh: "牙医学位（5 年）→ 通常有一年基础培训。" },
    courses: ["dentistry"],
  },
  {
    id: "vet",
    name: { en: "Vet", zh: "兽医" },
    blurb: { en: "Care for pets, farm animals or wildlife.", zh: "照顾宠物、农场动物或野生动物。" },
    route: { en: "Veterinary degree (5–6 years) → register with the RCVS.", zh: "兽医学位（5–6 年）→ 在皇家兽医学院（RCVS）注册。" },
    courses: ["vet"],
  },
  {
    id: "pharmacist",
    name: { en: "Pharmacist", zh: "药剂师" },
    blurb: { en: "Expert in medicines, in community pharmacies, hospitals or industry.", zh: "药物专家，在社区药房、医院或药企工作。" },
    route: { en: "4-year MPharm → foundation training year → registration exam.", zh: "4 年药学硕士 → 一年基础培训 → 注册考试。" },
    courses: ["pharmacy", "chemistry"],
  },
  {
    id: "nurse",
    name: { en: "Nurse", zh: "护士" },
    blurb: { en: "Hands-on care for patients across hospitals and communities.", zh: "在医院和社区为病人提供直接照护。" },
    route: { en: "Nursing degree (3 years) → register with the NMC.", zh: "护理学位（3 年）→ 在护理与助产委员会（NMC）注册。" },
    courses: ["nursing"],
    apprenticeship: { en: "Nursing degree apprenticeships exist with NHS trusts.", zh: "也可以通过 NHS 的护理学位学徒制入行。" },
  },
  {
    id: "lawyer",
    name: { en: "Solicitor or barrister", zh: "律师（Solicitor / Barrister）" },
    blurb: { en: "Advise clients, draft contracts, or argue cases in court.", zh: "为客户提供法律建议、起草合同，或出庭辩护。" },
    route: {
      en: "Solicitor: any degree → SQE1 & SQE2 exams + 2 years' qualifying work experience. Barrister: law degree (or conversion) → Bar course → pupillage.",
      zh: "Solicitor：任何学位 → 通过 SQE1 和 SQE2 考试 + 2 年合格工作经验。Barrister：法学学位（或转换课程）→ 大律师课程 → 实习律师（pupillage）。",
    },
    courses: ["law", "history", "ppe", "politics", "english", "philosophy"],
    apprenticeship: { en: "Solicitor apprenticeships let you qualify while working, without a separate degree.", zh: "Solicitor 学徒制可以边工作边取得资格，不需要另读学位。" },
  },
  {
    id: "finance",
    name: { en: "Banking & finance", zh: "银行与金融" },
    blurb: { en: "Investment banking, asset management, trading and fintech.", zh: "投资银行、资产管理、交易和金融科技。" },
    route: {
      en: "Any strong degree (economics, maths, STEM common) → internships (spring weeks in Year 1, summer internships in Year 2/3) → graduate scheme.",
      zh: "任何好的学位（经济、数学、理工科常见）→ 实习（大一 Spring Week、大二/大三暑期实习）→ 毕业生项目。",
    },
    courses: ["economics", "maths", "accfin", "physics", "cs", "ppe"],
    apprenticeship: { en: "Several banks run degree apprenticeships.", zh: "多家银行有学位学徒项目。" },
  },
  {
    id: "accountant",
    name: { en: "Accountant", zh: "会计师" },
    blurb: { en: "Audit, tax and advisory work, often at the 'Big Four' firms.", zh: "审计、税务和咨询工作，常在“四大”会计师事务所。" },
    route: { en: "Any degree → graduate job with professional training (ACA, ACCA or CIMA), about 3 years.", zh: "任何学位 → 入职并参加职业资格培训（ACA、ACCA 或 CIMA），约 3 年。" },
    courses: ["accfin", "economics", "maths", "business"],
    apprenticeship: { en: "School-leaver and degree apprenticeships are common.", zh: "高中毕业生学徒和学位学徒项目很常见。" },
  },
  {
    id: "consulting",
    name: { en: "Management consultant", zh: "管理咨询" },
    blurb: { en: "Help organisations solve business problems.", zh: "帮助企业和机构解决经营问题。" },
    route: { en: "Any strong degree → internships → graduate analyst role.", zh: "任何好的学位 → 实习 → 毕业生分析师岗位。" },
    courses: ["economics", "business", "engineering", "ppe", "maths", "natsci"],
  },
  {
    id: "software",
    name: { en: "Software engineer", zh: "软件工程师" },
    blurb: { en: "Build apps, systems and AI products.", zh: "开发应用、系统和人工智能产品。" },
    route: { en: "Computer Science or another maths-heavy degree → internships → graduate role. A strong portfolio of projects helps.", zh: "计算机或其他数学类学位 → 实习 → 毕业生岗位。有好的项目作品集会加分。" },
    courses: ["cs", "maths", "engineering", "physics"],
    apprenticeship: { en: "Software degree apprenticeships are widely available.", zh: "软件类学位学徒项目很多。" },
  },
  {
    id: "data",
    name: { en: "Data scientist / analyst", zh: "数据科学家 / 分析师" },
    blurb: { en: "Turn data into decisions using statistics and code.", zh: "用统计和编程把数据变成决策依据。" },
    route: { en: "Maths, CS, physics, economics or another quantitative degree → graduate role (a master's can help).", zh: "数学、计算机、物理、经济等量化学位 → 毕业生岗位（读硕士会有帮助）。" },
    courses: ["maths", "cs", "economics", "physics", "psychology", "geography"],
  },
  {
    id: "engineer",
    name: { en: "Chartered engineer", zh: "特许工程师" },
    blurb: { en: "Design bridges, aircraft, energy systems, medical devices and more.", zh: "设计桥梁、飞机、能源系统、医疗器械等。" },
    route: { en: "Accredited MEng (4 years) → graduate scheme → Chartered Engineer (CEng) after several years.", zh: "认证的工程硕士（MEng，4 年）→ 毕业生项目 → 数年后成为特许工程师（CEng）。" },
    courses: ["engineering", "physics", "chemistry"],
    apprenticeship: { en: "Engineering degree apprenticeships are offered by many large employers.", zh: "很多大企业提供工程学位学徒项目。" },
  },
  {
    id: "architect",
    name: { en: "Architect", zh: "建筑师" },
    blurb: { en: "Design buildings and places.", zh: "设计建筑和空间。" },
    route: { en: "Part 1 degree (3 yrs) → practical experience → Part 2 master's (2 yrs) → Part 3 → register with ARB. Around 7 years in total.", zh: "Part 1 学位（3 年）→ 实践经验 → Part 2 硕士（2 年）→ Part 3 → 在 ARB 注册，共约 7 年。" },
    courses: ["architecture", "art"],
    apprenticeship: { en: "Architecture apprenticeships now exist at Part 1–3 level.", zh: "现在也有 Part 1–3 阶段的建筑学徒制。" },
  },
  {
    id: "psychologist",
    name: { en: "Psychologist", zh: "心理学家" },
    blurb: { en: "Clinical, educational, forensic or occupational psychology.", zh: "临床、教育、司法或职业心理学。" },
    route: { en: "BPS-accredited psychology degree → experience → doctorate (e.g. 3-year DClinPsy for clinical psychology).", zh: "BPS 认证的心理学学位 → 积累经验 → 博士（如临床心理学需 3 年 DClinPsy）。" },
    courses: ["psychology"],
  },
  {
    id: "teacher",
    name: { en: "Teacher", zh: "教师" },
    blurb: { en: "Teach in primary or secondary schools.", zh: "在小学或中学任教。" },
    route: { en: "Any degree → teacher training (e.g. PGCE) to gain Qualified Teacher Status. Bursaries exist for some subjects.", zh: "任何学位 → 教师培训（如 PGCE），获得合格教师资格（QTS）。部分学科有助学金。" },
    courses: ["maths", "physics", "chemistry", "english", "history", "languages", "geography", "biomed", "sport"],
  },
  {
    id: "civil_service",
    name: { en: "Civil service & policy", zh: "公务员与政策" },
    blurb: { en: "Shape and deliver government policy.", zh: "参与制定和执行政府政策。" },
    route: { en: "Any degree → Civil Service Fast Stream or direct entry.", zh: "任何学位 → 公务员快速通道（Fast Stream）或直接应聘。" },
    courses: ["ppe", "politics", "economics", "history", "geography", "law", "languages"],
  },
  {
    id: "journalist",
    name: { en: "Journalist / media", zh: "记者 / 媒体" },
    blurb: { en: "Reporting, broadcasting and digital content.", zh: "新闻报道、广播和数字内容。" },
    route: { en: "Any degree + a portfolio (student paper, blog, radio) → NCTJ training or a graduate scheme.", zh: "任何学位 + 作品集（校报、博客、电台）→ NCTJ 培训或毕业生项目。" },
    courses: ["english", "history", "politics", "languages", "ppe"],
  },
  {
    id: "marketing",
    name: { en: "Marketing & creative industries", zh: "市场营销与创意产业" },
    blurb: { en: "Brands, advertising, design and digital marketing.", zh: "品牌、广告、设计和数字营销。" },
    route: { en: "Any degree → internships or graduate schemes; a portfolio matters for creative roles.", zh: "任何学位 → 实习或毕业生项目；创意类岗位看重作品集。" },
    courses: ["business", "english", "psychology", "art", "languages"],
  },
  {
    id: "scientist",
    name: { en: "Research scientist", zh: "科研人员" },
    blurb: { en: "Discover new knowledge in universities, labs or industry.", zh: "在大学、实验室或企业中探索新知识。" },
    route: { en: "Science degree (often an integrated master's) → PhD (3–4 years) → research career.", zh: "理科学位（常为本硕连读）→ 博士（3–4 年）→ 科研职业。" },
    courses: ["natsci", "physics", "chemistry", "biomed", "maths"],
  },
  {
    id: "entrepreneur",
    name: { en: "Entrepreneur", zh: "创业者" },
    blurb: { en: "Start and grow your own business.", zh: "创办并经营自己的企业。" },
    route: { en: "No set route — many universities have incubators and start-up funding for students.", zh: "没有固定路线，很多大学为学生提供孵化器和创业资金。" },
    courses: ["business", "cs", "engineering", "art"],
  },
  {
    id: "planner",
    name: { en: "Town planner / chartered surveyor", zh: "城市规划师 / 特许测量师" },
    blurb: { en: "Shape how towns grow, or value, develop and manage property.", zh: "规划城镇发展，或评估、开发和管理房地产。" },
    route: {
      en: "Planning: RTPI-accredited degree (often a 4-year integrated master's) → chartered membership. Surveying: RICS-accredited degree → APC assessment.",
      zh: "规划：RTPI 认证学位（常为 4 年本硕连读）→ 特许会员。测量：RICS 认证学位 → APC 考核。",
    },
    courses: ["planning", "geography", "civil", "architecture", "economics"],
    apprenticeship: { en: "Planning and surveying degree apprenticeships are available.", zh: "规划和测量都有学位学徒项目。" },
  },
  {
    id: "ahp",
    name: { en: "Allied health professional", zh: "医疗相关专业人员" },
    blurb: { en: "Physiotherapist, radiographer, midwife, optometrist, OT, speech therapist, dietitian…", zh: "物理治疗师、放射技师、助产士、视光师、职业治疗师、言语治疗师、营养师等。" },
    route: { en: "Approved degree (3–4 years) → register with the HCPC, NMC (midwives) or GOC (optometrists).", zh: "认证学位（3–4 年）→ 在 HCPC、NMC（助产）或 GOC（视光）注册。" },
    courses: ["physio", "radiography", "midwifery", "optometry", "ot", "slt", "dietetics"],
    apprenticeship: { en: "Some NHS trusts offer degree apprenticeships in these professions.", zh: "部分 NHS 机构提供这些职业的学位学徒项目。" },
  },
  {
    id: "social_worker",
    name: { en: "Social worker", zh: "社会工作者" },
    blurb: { en: "Protect and support children, families and vulnerable adults.", zh: "保护和支持儿童、家庭及弱势成人。" },
    route: { en: "Social Work degree (or a postgraduate route) → register with Social Work England / the relevant UK regulator.", zh: "社会工作学位（或研究生路线）→ 在 Social Work England 或相应机构注册。" },
    courses: ["socialwork", "sociology", "psychology", "criminology", "socialpolicy"],
  },
  {
    id: "heritage",
    name: { en: "Museums, heritage & archaeology", zh: "博物馆、文化遗产与考古" },
    blurb: { en: "Curate collections, run heritage sites or dig up the past.", zh: "策展、管理文化遗产地，或从事考古发掘。" },
    route: { en: "Relevant degree + volunteering experience; a master's is common for curatorial roles.", zh: "相关学位 + 志愿经历，策展类岗位常需硕士。" },
    courses: ["archaeology", "histart", "history", "classics", "anthropology"],
  },
  {
    id: "actuary",
    name: { en: "Actuary", zh: "精算师" },
    blurb: { en: "Measure financial risk for insurers, pension funds and banks.", zh: "为保险公司、养老基金和银行衡量金融风险。" },
    route: { en: "Maths-heavy degree → graduate role while taking IFoA professional exams (several years).", zh: "数学类学位 → 入职并参加 IFoA 精算考试（需数年）。" },
    courses: ["actuarial", "maths", "stats", "economics"],
  },
  {
    id: "environment",
    name: { en: "Environmental & conservation work", zh: "环境与保护工作" },
    blurb: { en: "Environmental consultancy, conservation, climate policy and sustainability.", zh: "环境咨询、自然保护、气候政策与可持续发展。" },
    route: { en: "Science or geography degree + practical experience; a master's helps for specialist roles.", zh: "理科或地理学位 + 实践经验，专业岗位读硕士更有优势。" },
    courses: ["envsci", "ecology", "geography", "earth", "zoology", "marine"],
  },
  {
    id: "creative_arts",
    name: { en: "Performer, musician or film-maker", zh: "表演者、音乐人或电影人" },
    blurb: { en: "Careers on stage, screen, in music or behind the camera.", zh: "在舞台、银幕、音乐领域或镜头背后工作。" },
    route: { en: "No single route — build a portfolio and network; many work freelance.", zh: "没有固定路线，需要积累作品和人脉，很多人是自由职业。" },
    courses: ["music", "drama", "film", "creative", "fashion", "design"],
  },
];

export const careerById = (id: string) => CAREERS.find((c) => c.id === id);
