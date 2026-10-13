import type { L } from "../i18n";
import { ESSAY_SUBJECTS, LANGUAGES, type SubjectId } from "./subjects";

export type CourseId =
  | "medicine" | "dentistry" | "vet" | "pharmacy" | "nursing" | "biomed"
  | "chemistry" | "physics" | "maths" | "cs" | "engineering" | "natsci"
  | "economics" | "accfin" | "business" | "law" | "ppe" | "politics" | "psychology"
  | "history" | "english" | "geography" | "languages" | "philosophy"
  | "architecture" | "art" | "sport"
  // health
  | "pharmacology" | "midwifery" | "physio" | "radiography" | "optometry" | "ot" | "slt" | "dietetics" | "neuroscience"
  // biosciences
  | "biochem" | "zoology" | "marine" | "ecology" | "agriculture" | "foodsci"
  // physical sciences
  | "astro" | "earth" | "envsci" | "materials"
  // maths & computing
  | "stats" | "actuarial" | "datasci" | "ai"
  // engineering
  | "mech" | "civil" | "eee" | "chemeng" | "aero" | "bioeng"
  // built environment
  | "planning"
  // social sciences
  | "criminology" | "sociology" | "socialpolicy" | "socialwork" | "anthropology" | "education" | "linguistics" | "marketing"
  // humanities
  | "classics" | "archaeology" | "theology" | "histart" | "creative" | "eastasian" | "middleeast" | "liberal"
  // creative
  | "music" | "drama" | "film" | "journalism" | "fashion" | "design";

export type CourseGroup = "health" | "bio" | "science" | "engineering" | "built" | "social" | "humanities" | "creative";

export type Competitiveness = "top" | "high" | "mid" | "low";

// One requirement group: at least `count` of `anyOf`.
export type Req = { anyOf: SubjectId[]; count: number; label: L; strictness: "required" | "usually" };

export type Course = {
  id: CourseId;
  name: L;
  group: CourseGroup;
  blurb: L;
  reqs: Req[];
  helpful: SubjectId[];
  tests?: L;
  extra?: L;
  competitiveness: Competitiveness;
  suits: L;
  careers: string[];
  // Extra search words, e.g. "real estate" for Planning.
  aliases?: string[];
};

const SCI_NO_CHEM: SubjectId[] = ["biology", "physics", "maths"];

const rq = (anyOf: SubjectId[], count: number, en: string, zh: string, strictness: Req["strictness"] = "usually"): Req => ({ anyOf, count, label: { en, zh }, strictness });
const MATHS_REQ = rq(["maths"], 1, "Maths", "数学", "required");
const MATHS_PHYS = [MATHS_REQ, rq(["physics"], 1, "Physics", "物理")];

function c(
  id: CourseId,
  name: L,
  group: CourseGroup,
  blurb: L,
  reqs: Req[],
  helpful: SubjectId[],
  competitiveness: Competitiveness,
  suits: L,
  careers: string[],
  more: Partial<Course> = {},
): Course {
  return { id, name, group, blurb, reqs, helpful, competitiveness, suits, careers, ...more };
}

const MORE_COURSES: Course[] = [
  // ---------- health ----------
  c("pharmacology", { en: "Pharmacology", zh: "药理学" }, "health", { en: "How drugs act on the body — lab science, not a route to becoming a pharmacist.", zh: "研究药物如何作用于人体，是实验科学，不是成为药剂师的路线。" },
    [rq(["chemistry"], 1, "Chemistry", "化学", "required"), rq(["biology"], 1, "Biology", "生物")], ["maths"], "mid",
    { en: "Scientists curious about medicines and research.", zh: "对药物和科研感兴趣的理科生。" }, ["scientist", "pharmacist"]),
  c("midwifery", { en: "Midwifery", zh: "助产" }, "health", { en: "Support people through pregnancy and birth; half the course is placements.", zh: "陪伴孕产妇度过孕期和分娩，一半时间在实习。" },
    [], ["biology", "psychology", "sociology"], "mid", { en: "Calm, caring people who can stay steady under pressure.", zh: "冷静、有爱心、压力下也能稳住的人。" }, ["ahp"],
    { extra: { en: "Interviews and caring experience expected.", zh: "需要面试，最好有照护经历。" } }),
  c("physio", { en: "Physiotherapy", zh: "物理治疗" }, "health", { en: "Help people recover movement after injury or illness. Very competitive.", zh: "帮助伤病患者恢复运动能力，竞争非常激烈。" },
    [rq(["biology", "pe"], 1, "Biology or PE", "生物或体育")], ["chemistry", "psychology"], "high",
    { en: "Active, hands-on people who like coaching others.", zh: "热爱运动、动手能力强、喜欢指导别人的人。" }, ["ahp"], { aliases: ["physical therapy"] }),
  c("radiography", { en: "Radiography", zh: "放射技术" }, "health", { en: "Diagnostic imaging (X-ray, CT, MRI) or radiotherapy for cancer.", zh: "诊断影像（X 光、CT、MRI）或癌症放射治疗。" },
    [rq(["biology", "physics", "chemistry", "maths"], 1, "A science", "一门理科")], [], "mid",
    { en: "Tech-minded people who want patient contact.", zh: "喜欢技术、也愿意接触病人的人。" }, ["ahp"], { aliases: ["imaging", "radiotherapy"] }),
  c("optometry", { en: "Optometry", zh: "视光学" }, "health", { en: "Examine eyes and prescribe lenses; leads to registration as an optometrist.", zh: "检查眼睛、验配镜片，毕业后可注册为视光师。" },
    [rq(["biology", "chemistry", "physics", "maths"], 2, "Two sciences / Maths", "两门理科或数学")], [], "high",
    { en: "Precise people who like science and working with patients.", zh: "细致、喜欢科学、愿意服务病人的人。" }, ["ahp"], { aliases: ["eye", "ophthalmic"] }),
  c("ot", { en: "Occupational Therapy", zh: "职业治疗" }, "health", { en: "Help people manage daily life after illness, injury or disability.", zh: "帮助伤病或残障人士重新应对日常生活。" },
    [], ["biology", "psychology", "sociology"], "low", { en: "Creative problem-solvers who care about independence.", zh: "富有创意、重视帮助别人独立生活的人。" }, ["ahp"]),
  c("slt", { en: "Speech & Language Therapy", zh: "言语治疗" }, "health", { en: "Support children and adults with communication and swallowing difficulties.", zh: "帮助有沟通和吞咽困难的儿童和成人。" },
    [], ["english_lang", "biology", "psychology"], "mid", { en: "Patient communicators interested in language and people.", zh: "有耐心、对语言和人感兴趣的沟通者。" }, ["ahp"], { aliases: ["speech therapy"] }),
  c("dietetics", { en: "Nutrition & Dietetics", zh: "营养与膳食" }, "health", { en: "The science of food and health; dietetics leads to a registered profession.", zh: "食物与健康的科学，膳食学可通向注册职业。" },
    [rq(["chemistry", "biology"], 1, "Chemistry or Biology", "化学或生物")], ["biology", "chemistry"], "mid",
    { en: "Scientists who want to help people eat and live well.", zh: "想帮助别人吃得健康、活得更好的理科生。" }, ["ahp", "scientist"], { aliases: ["nutrition", "diet"] }),
  c("neuroscience", { en: "Neuroscience", zh: "神经科学" }, "health", { en: "The brain and nervous system, from molecules to behaviour.", zh: "研究大脑和神经系统，从分子到行为。" },
    [rq(["biology", "chemistry"], 1, "Biology or Chemistry", "生物或化学")], ["psychology", "maths"], "mid",
    { en: "Curious scientists fascinated by how the brain works.", zh: "对大脑运作着迷的理科生。" }, ["scientist", "psychologist", "doctor"]),
  // ---------- biosciences ----------
  c("biochem", { en: "Biochemistry", zh: "生物化学" }, "bio", { en: "The chemistry of life: proteins, DNA and metabolism.", zh: "生命的化学：蛋白质、DNA 和新陈代谢。" },
    [rq(["chemistry"], 1, "Chemistry", "化学", "required"), rq(["biology"], 1, "Biology", "生物")], ["maths"], "mid",
    { en: "Lab-lovers who enjoy both biology and chemistry.", zh: "喜欢实验、生物和化学都爱的人。" }, ["scientist", "pharmacist"]),
  c("zoology", { en: "Zoology", zh: "动物学" }, "bio", { en: "Animal biology, behaviour and evolution, often with fieldwork.", zh: "动物生物学、行为与进化，常有野外考察。" },
    [rq(["biology"], 1, "Biology", "生物", "required")], ["chemistry", "geography"], "mid",
    { en: "Animal-lovers who like science and the outdoors.", zh: "热爱动物、喜欢科学和户外的人。" }, ["scientist", "environment"]),
  c("marine", { en: "Marine Biology & Ocean Science", zh: "海洋生物与海洋科学" }, "bio", { en: "Life in the oceans, ocean processes and conservation.", zh: "海洋生命、海洋过程与保护。" },
    [rq(["biology", "chemistry", "geography"], 1, "Biology (or another science)", "生物（或另一门理科）")], ["chemistry", "maths"], "mid",
    { en: "People who love the sea and don't mind getting wet on fieldwork.", zh: "热爱大海、不怕野外考察被打湿的人。" }, ["scientist", "environment"], { aliases: ["oceanography"] }),
  c("ecology", { en: "Ecology & Conservation", zh: "生态与保护" }, "bio", { en: "Ecosystems, biodiversity and how to protect them.", zh: "生态系统、生物多样性及其保护。" },
    [rq(["biology"], 1, "Biology", "生物")], ["geography", "environmental"], "mid",
    { en: "Nature-lovers who want to tackle the biodiversity crisis.", zh: "热爱自然、想应对生物多样性危机的人。" }, ["environment", "scientist"], { aliases: ["conservation", "wildlife"] }),
  c("agriculture", { en: "Agriculture & Animal Science", zh: "农业与动物科学" }, "bio", { en: "Food production, farm animals, crops and agri-business.", zh: "粮食生产、农场动物、作物与农业经营。" },
    [rq(["biology", "chemistry", "geography"], 1, "A science", "一门理科")], [], "low",
    { en: "Practical people interested in food, land and animals.", zh: "对食物、土地和动物感兴趣的务实的人。" }, ["environment", "scientist", "entrepreneur"], { aliases: ["farming", "agri"] }),
  c("foodsci", { en: "Food Science", zh: "食品科学" }, "bio", { en: "The science and safety of food, from farm to supermarket.", zh: "从农场到超市的食品科学与安全。" },
    [rq(["chemistry", "biology"], 1, "Chemistry or Biology", "化学或生物")], [], "low",
    { en: "Scientists who like applying chemistry and biology to everyday life.", zh: "喜欢把化学和生物用在日常生活中的人。" }, ["scientist", "entrepreneur"]),
  // ---------- physical sciences ----------
  c("astro", { en: "Astrophysics & Astronomy", zh: "天体物理与天文学" }, "science", { en: "Physics applied to stars, galaxies and the universe.", zh: "把物理用于研究恒星、星系和宇宙。" },
    MATHS_PHYS.map((r) => ({ ...r, strictness: "required" as const })), ["further_maths"], "top",
    { en: "Physics lovers who look up at night.", zh: "热爱物理、喜欢仰望星空的人。" }, ["scientist", "data", "software"], { aliases: ["astronomy", "space"] }),
  c("earth", { en: "Geology & Earth Sciences", zh: "地质与地球科学" }, "science", { en: "Rocks, volcanoes, climate history and natural resources, with fieldtrips.", zh: "岩石、火山、气候历史与自然资源，有野外实习。" },
    [rq(["chemistry", "physics", "maths", "biology", "geography"], 2, "Two sciences (Geography often counts)", "两门理科（地理常可算）")], [], "mid",
    { en: "Outdoorsy scientists curious about how the planet works.", zh: "喜欢户外、好奇地球如何运作的理科生。" }, ["environment", "engineer", "scientist"], { aliases: ["geology", "geophysics"] }),
  c("envsci", { en: "Environmental Science", zh: "环境科学" }, "science", { en: "Climate, pollution, sustainability and environmental data.", zh: "气候、污染、可持续发展与环境数据。" },
    [rq(["biology", "chemistry", "geography", "maths", "physics", "environmental"], 1, "A science or Geography", "一门理科或地理")], [], "mid",
    { en: "People who want science careers that help the planet.", zh: "想从事对地球有益的科学工作的人。" }, ["environment", "civil_service", "scientist"], { aliases: ["sustainability", "climate"] }),
  c("materials", { en: "Materials Science", zh: "材料科学" }, "science", { en: "Designing new materials — metals, polymers, semiconductors, batteries.", zh: "设计新材料：金属、高分子、半导体、电池。" },
    [MATHS_REQ, rq(["chemistry", "physics"], 1, "Chemistry or Physics", "化学或物理", "required")], [], "mid",
    { en: "Scientists who like engineering real things.", zh: "喜欢把科学变成真实产品的人。" }, ["engineer", "scientist"]),
  // ---------- maths & computing ----------
  c("stats", { en: "Statistics", zh: "统计学" }, "science", { en: "Probability, data and modelling uncertainty.", zh: "概率、数据与不确定性建模。" },
    [MATHS_REQ], ["further_maths"], "high", { en: "Mathematicians who like real-world data.", zh: "喜欢真实数据的数学人。" }, ["data", "actuary", "finance"]),
  c("actuarial", { en: "Actuarial Science", zh: "精算" }, "science", { en: "Maths and statistics for insurance and pensions risk, with exam exemptions.", zh: "用于保险和养老金风险的数学与统计，可减免部分精算考试。" },
    [MATHS_REQ], ["further_maths", "economics"], "high", { en: "Strong mathematicians who want a well-paid professional route.", zh: "数学强、想走高薪专业路线的人。" }, ["actuary", "finance", "data"]),
  c("datasci", { en: "Data Science", zh: "数据科学" }, "science", { en: "Statistics, programming and machine learning on real data.", zh: "统计、编程和机器学习在真实数据上的应用。" },
    [MATHS_REQ], ["further_maths", "computer_science"], "high", { en: "Numerate coders who like finding patterns.", zh: "擅长数字、喜欢发现规律的程序员。" }, ["data", "software", "finance"]),
  c("ai", { en: "Artificial Intelligence", zh: "人工智能" }, "engineering", { en: "Machine learning, robotics and intelligent systems — usually within computer science.", zh: "机器学习、机器人与智能系统，通常属于计算机系。" },
    [MATHS_REQ], ["further_maths", "computer_science"], "top", { en: "Strong mathematicians excited by AI.", zh: "数学强、对人工智能着迷的人。" }, ["software", "data", "scientist"], { aliases: ["machine learning", "robotics"] }),
  // ---------- engineering ----------
  c("mech", { en: "Mechanical Engineering", zh: "机械工程" }, "engineering", { en: "Machines, energy, vehicles and manufacturing.", zh: "机械、能源、交通工具与制造。" }, MATHS_PHYS, ["further_maths", "design_tech"], "high",
    { en: "Builders and tinkerers who like physics.", zh: "喜欢动手和物理的人。" }, ["engineer"]),
  c("civil", { en: "Civil Engineering", zh: "土木工程" }, "engineering", { en: "Bridges, buildings, transport, water and infrastructure.", zh: "桥梁、建筑、交通、水利与基础设施。" }, MATHS_PHYS, ["further_maths"], "high",
    { en: "People who want to shape cities and infrastructure.", zh: "想塑造城市和基础设施的人。" }, ["engineer", "planner"], { aliases: ["structural"] }),
  c("eee", { en: "Electrical & Electronic Engineering", zh: "电子电气工程" }, "engineering", { en: "Circuits, power, communications and chips.", zh: "电路、电力、通信与芯片。" }, MATHS_PHYS, ["further_maths", "computer_science"], "high",
    { en: "People who like physics, electronics and coding.", zh: "喜欢物理、电子和编程的人。" }, ["engineer", "software"], { aliases: ["electronics", "electrical"] }),
  c("chemeng", { en: "Chemical Engineering", zh: "化学工程" }, "engineering", { en: "Turning chemistry into products at scale — energy, pharma, food.", zh: "把化学变成规模化产品：能源、制药、食品。" },
    [MATHS_REQ, rq(["chemistry"], 1, "Chemistry", "化学", "required")], ["physics", "further_maths"], "high",
    { en: "Chemists who think like engineers.", zh: "有工程思维的化学爱好者。" }, ["engineer", "consulting"]),
  c("aero", { en: "Aerospace Engineering", zh: "航空航天工程" }, "engineering", { en: "Aircraft, spacecraft, aerodynamics and propulsion.", zh: "飞机、航天器、空气动力学与推进。" }, MATHS_PHYS.map((r) => ({ ...r, strictness: "required" as const })), ["further_maths"], "top",
    { en: "Physics-lovers who dream about flight and space.", zh: "热爱物理、梦想飞行和太空的人。" }, ["engineer"], { aliases: ["aeronautical", "aviation"] }),
  c("bioeng", { en: "Biomedical Engineering", zh: "生物医学工程" }, "engineering", { en: "Engineering for health: implants, devices and imaging.", zh: "服务健康的工程：植入物、医疗器械与影像。" }, [MATHS_REQ, rq(["physics", "chemistry", "biology"], 1, "Physics, Chemistry or Biology", "物理、化学或生物")], ["biology"], "high",
    { en: "Engineers who want to work in healthcare.", zh: "想在医疗领域工作的工程人。" }, ["engineer", "scientist"], { aliases: ["medical engineering"] }),
  // ---------- built environment ----------
  c("planning", { en: "Planning & Real Estate", zh: "城市规划与房地产" }, "built", { en: "Town planning, urban development, property and real estate. Often accredited by RTPI and/or RICS.", zh: "城市规划、城市开发、物业与房地产，常有 RTPI 和/或 RICS 认证。" },
    [], ["geography", "economics", "maths"], "mid",
    { en: "People interested in cities, property markets and how places are shaped.", zh: "对城市、房地产市场和空间如何形成感兴趣的人。" }, ["planner", "consulting", "civil_service"],
    { aliases: ["real estate", "property", "surveying", "town planning", "urban planning", "urban studies", "land economy", "rics", "rtpi"],
      extra: { en: "Check accreditation: RTPI (planning) and RICS (surveying / real estate).", zh: "注意认证：RTPI（规划）和 RICS（测量/房地产）。" } }),
  // ---------- social sciences ----------
  c("criminology", { en: "Criminology", zh: "犯罪学" }, "social", { en: "Crime, justice, policing and punishment.", zh: "犯罪、司法、警务与刑罚。" }, [], ESSAY_SUBJECTS.concat(["psychology", "sociology", "law"]), "mid",
    { en: "People interested in justice and why crime happens.", zh: "关注公正、好奇犯罪成因的人。" }, ["lawyer", "civil_service", "social_worker"]),
  c("sociology", { en: "Sociology", zh: "社会学" }, "social", { en: "How societies work: inequality, identity, culture and change.", zh: "社会如何运作：不平等、身份、文化与变迁。" }, [], ["sociology", "history", "politics"], "mid",
    { en: "Critical thinkers curious about people and power.", zh: "爱思考、关注人与权力的人。" }, ["civil_service", "marketing", "social_worker"]),
  c("socialpolicy", { en: "Social Policy", zh: "社会政策" }, "social", { en: "How governments tackle poverty, health, housing and welfare.", zh: "政府如何应对贫困、健康、住房与福利问题。" }, [], ["politics", "sociology", "economics"], "mid",
    { en: "People who want to fix social problems through policy.", zh: "想通过政策解决社会问题的人。" }, ["civil_service", "social_worker"]),
  c("socialwork", { en: "Social Work", zh: "社会工作" }, "social", { en: "Professional training to support children, families and vulnerable adults, with placements.", zh: "支持儿童、家庭和弱势成人的专业培训，含实习。" }, [], ["sociology", "psychology"], "low",
    { en: "Resilient, empathetic people who want to make a direct difference.", zh: "有韧性、有同理心、想直接帮助别人的人。" }, ["social_worker"],
    { extra: { en: "Relevant experience and an interview are usually required.", zh: "通常需要相关经历和面试。" } }),
  c("anthropology", { en: "Anthropology", zh: "人类学" }, "social", { en: "Human cultures and societies around the world, past and present.", zh: "研究世界各地古今的人类文化与社会。" }, [], ["sociology", "history", "biology"], "mid",
    { en: "Curious people who love understanding other ways of life.", zh: "好奇心强、喜欢理解不同生活方式的人。" }, ["civil_service", "heritage", "marketing"]),
  c("education", { en: "Education Studies", zh: "教育学" }, "social", { en: "How people learn, education policy and (sometimes) teacher training.", zh: "人如何学习、教育政策，有时包含教师培训。" }, [], ["psychology", "sociology", "english_lit"], "low",
    { en: "People who enjoy explaining things and helping others learn.", zh: "喜欢讲解、帮助别人学习的人。" }, ["teacher", "civil_service"]),
  c("linguistics", { en: "Linguistics", zh: "语言学" }, "social", { en: "The science of language: sounds, grammar, meaning and how we acquire it.", zh: "语言的科学：语音、语法、语义与语言习得。" }, [], ["english_lang", "french", "spanish", "maths"], "mid",
    { en: "Language nerds who like patterns.", zh: "痴迷语言、喜欢找规律的人。" }, ["ahp", "teacher", "software"]),
  c("marketing", { en: "Marketing", zh: "市场营销" }, "social", { en: "Consumer behaviour, branding, digital marketing and analytics.", zh: "消费者行为、品牌、数字营销与分析。" }, [], ["business", "psychology", "media"], "mid",
    { en: "Creative, people-focused students who like data too.", zh: "有创意、懂人心、也不怕数据的人。" }, ["marketing", "entrepreneur"]),
  // ---------- humanities ----------
  c("classics", { en: "Classics & Ancient History", zh: "古典学与古代史" }, "humanities", { en: "Ancient Greece and Rome: literature, history and languages (beginners welcome at many unis).", zh: "古希腊和古罗马的文学、历史与语言（很多学校接受零基础）。" }, [], ["classics", "history", "english_lit"], "mid",
    { en: "Readers who love stories, history and languages.", zh: "热爱故事、历史和语言的人。" }, ["lawyer", "heritage", "teacher"], { aliases: ["latin", "greek", "ancient history"] }),
  c("archaeology", { en: "Archaeology", zh: "考古学" }, "humanities", { en: "Uncovering the human past through excavation, science and objects.", zh: "通过发掘、科学方法和文物揭示人类的过去。" }, [], ["history", "geography", "biology"], "mid",
    { en: "Hands-on historians who like fieldwork and science.", zh: "喜欢动手、野外工作和科学的历史爱好者。" }, ["heritage", "scientist"]),
  c("theology", { en: "Theology & Religion", zh: "神学与宗教学" }, "humanities", { en: "Religions, ethics, texts and their role in society.", zh: "宗教、伦理、经典及其社会作用。" }, [], ["religious_studies", "history", "philosophy"], "mid",
    { en: "Big-question thinkers interested in belief and culture.", zh: "关注信仰与文化、爱思考大问题的人。" }, ["teacher", "civil_service", "journalist"], { aliases: ["religious studies", "divinity"] }),
  c("histart", { en: "History of Art", zh: "艺术史" }, "humanities", { en: "Art, architecture and visual culture across history.", zh: "历史上的艺术、建筑与视觉文化。" }, [], ["history", "art", "english_lit"], "mid",
    { en: "Visual people who love museums and galleries.", zh: "喜欢视觉艺术、热爱博物馆和美术馆的人。" }, ["heritage", "marketing"]),
  c("creative", { en: "Creative Writing", zh: "创意写作" }, "humanities", { en: "Fiction, poetry and scriptwriting — often combined with English or Film.", zh: "小说、诗歌和剧本写作，常与英语文学或电影结合。" },
    [rq(["english_lit", "english_lang"], 1, "English", "英语")], ["drama", "media"], "mid", { en: "Writers who want to develop their voice.", zh: "想找到自己写作风格的人。" }, ["journalist", "marketing", "creative_arts"]),
  c("eastasian", { en: "Chinese & East Asian Studies", zh: "中文与东亚研究" }, "humanities", { en: "Chinese, Japanese or Korean language and culture, usually with a year abroad.", zh: "中文、日语或韩语的语言与文化，通常有一年海外学习。" }, [], ["chinese", "history"], "mid",
    { en: "Linguists drawn to East Asia (beginners usually welcome).", zh: "对东亚感兴趣的语言爱好者（通常接受零基础）。" }, ["civil_service", "finance", "journalist"], { aliases: ["chinese", "japanese", "korean", "asian"] }),
  c("middleeast", { en: "Arabic & Middle Eastern Studies", zh: "阿拉伯语与中东研究" }, "humanities", { en: "Arabic, Persian or Hebrew with the region's history and politics.", zh: "阿拉伯语、波斯语或希伯来语，以及中东地区的历史与政治。" }, [], ["history", "politics"], "mid",
    { en: "People fascinated by languages and global affairs.", zh: "对语言和国际事务着迷的人。" }, ["civil_service", "journalist"], { aliases: ["arabic", "persian", "islamic"] }),
  c("liberal", { en: "Liberal Arts", zh: "文理通识" }, "humanities", { en: "Design your own interdisciplinary degree across arts and sciences.", zh: "跨文理学科，自己设计学位组合。" }, [], ["english_lit", "history", "maths"], "high",
    { en: "Curious all-rounders who don't want to pick just one subject.", zh: "兴趣广泛、不想只选一门学科的人。" }, ["civil_service", "consulting", "journalist"], { aliases: ["arts and sciences", "interdisciplinary"] }),
  // ---------- creative ----------
  c("music", { en: "Music", zh: "音乐" }, "creative", { en: "Performance, composition, musicology and music technology.", zh: "演奏、作曲、音乐学与音乐科技。" },
    [rq(["music"], 1, "Music (plus a high instrument grade)", "音乐（及较高的乐器等级）")], [], "mid", { en: "Musicians who also enjoy thinking about music.", zh: "既爱演奏也爱研究音乐的人。" }, ["creative_arts", "teacher"]),
  c("drama", { en: "Drama & Theatre", zh: "戏剧" }, "creative", { en: "Performance, directing, playwriting and theatre history.", zh: "表演、导演、剧本写作与戏剧史。" }, [], ["drama", "english_lit"], "mid",
    { en: "Performers and storytellers who love collaboration.", zh: "热爱合作的表演者和讲故事的人。" }, ["creative_arts", "teacher", "marketing"], { aliases: ["theatre", "performance"] }),
  c("film", { en: "Film & Media", zh: "电影与媒体" }, "creative", { en: "Film studies, screen production and media culture.", zh: "电影研究、影视制作与媒体文化。" }, [], ["media", "english_lit", "art"], "mid",
    { en: "Storytellers obsessed with screens.", zh: "痴迷影像的讲故事的人。" }, ["creative_arts", "journalist", "marketing"], { aliases: ["television", "media studies", "communication"] }),
  c("journalism", { en: "Journalism", zh: "新闻学" }, "creative", { en: "Reporting, editing and digital news, often NCTJ-accredited.", zh: "采访、编辑与数字新闻，常有 NCTJ 认证。" }, [], ["english_lit", "english_lang", "politics"], "mid",
    { en: "Curious writers who like deadlines.", zh: "好奇心强、不怕截稿期的写作者。" }, ["journalist", "marketing"]),
  c("fashion", { en: "Fashion & Textiles", zh: "时尚与纺织" }, "creative", { en: "Fashion design, textiles, marketing and management.", zh: "时装设计、纺织、时尚营销与管理。" },
    [rq(["art", "design_tech"], 1, "Art or Design (for design courses)", "艺术或设计（设计类专业）")], ["business"], "mid",
    { en: "Creative people interested in style and the fashion business.", zh: "对风格和时尚产业感兴趣的创意人。" }, ["creative_arts", "marketing", "entrepreneur"], { extra: { en: "Design courses need a portfolio.", zh: "设计类专业需要作品集。" } }),
  c("design", { en: "Product & Industrial Design", zh: "产品与工业设计" }, "creative", { en: "Designing products people use, combining creativity with engineering.", zh: "设计人们使用的产品，结合创意与工程。" },
    [rq(["design_tech", "art"], 1, "Design & Technology or Art", "设计与技术或艺术")], ["maths", "physics"], "mid",
    { en: "Makers who sketch and build.", zh: "爱画草图、爱动手做东西的人。" }, ["engineer", "creative_arts", "entrepreneur"], { aliases: ["industrial design", "ux"] }),
];

export const COURSES: Course[] = [
  {
    id: "medicine",
    name: { en: "Medicine", zh: "医学" },
    group: "health",
    blurb: { en: "Five or six years of science and clinical training to become a doctor.", zh: "5–6 年的科学与临床训练，毕业后成为医生。" },
    reqs: [
      { anyOf: ["chemistry"], count: 1, label: { en: "Chemistry", zh: "化学" }, strictness: "required" },
      { anyOf: SCI_NO_CHEM, count: 1, label: { en: "Biology, Physics or Maths", zh: "生物、物理或数学之一" }, strictness: "required" },
    ],
    helpful: ["biology"],
    tests: { en: "UCAT at almost all medical schools. Interviews (often MMI).", zh: "几乎所有医学院都要考 UCAT，并有面试（常为多站式 MMI）。" },
    extra: { en: "Work experience or volunteering in care settings really matters. Deadline 15 October.", zh: "医疗或护理相关的工作经历、志愿服务非常重要。10 月 15 日截止。" },
    competitiveness: "high",
    suits: { en: "Caring, resilient people who enjoy science and teamwork and are ready for a long training path.", zh: "有同理心、抗压能力强、喜欢科学和团队合作，并愿意接受漫长培训的人。" },
    careers: ["doctor"],
  },
  {
    id: "dentistry",
    name: { en: "Dentistry", zh: "牙医" },
    group: "health",
    blurb: { en: "A five-year clinical degree with lots of hands-on practice.", zh: "5 年制临床学位，大量动手实操。" },
    reqs: [
      { anyOf: ["chemistry"], count: 1, label: { en: "Chemistry", zh: "化学" }, strictness: "required" },
      { anyOf: ["biology"], count: 1, label: { en: "Biology", zh: "生物" }, strictness: "usually" },
    ],
    helpful: [],
    tests: { en: "UCAT and an interview.", zh: "UCAT 加面试。" },
    competitiveness: "high",
    suits: { en: "Scientists with good manual skills who like working with people.", zh: "动手能力强、喜欢和人打交道的理科生。" },
    careers: ["dentist"],
  },
  {
    id: "vet",
    name: { en: "Veterinary Medicine", zh: "兽医" },
    group: "health",
    blurb: { en: "Five to six years training to treat animals.", zh: "5–6 年培训，学习为动物看病。" },
    reqs: [
      { anyOf: ["chemistry"], count: 1, label: { en: "Chemistry", zh: "化学" }, strictness: "required" },
      { anyOf: ["biology"], count: 1, label: { en: "Biology", zh: "生物" }, strictness: "required" },
    ],
    helpful: ["maths", "physics"],
    extra: { en: "Animal-related work experience is expected.", zh: "需要有与动物相关的工作经历。" },
    competitiveness: "high",
    suits: { en: "Animal lovers with strong science grades and plenty of stamina.", zh: "热爱动物、理科成绩好、体力充沛的人。" },
    careers: ["vet"],
  },
  {
    id: "pharmacy",
    name: { en: "Pharmacy", zh: "药学" },
    group: "health",
    blurb: { en: "A four-year MPharm on how medicines work, then a foundation training year.", zh: "4 年制药学硕士（MPharm），学习药物原理，之后有一年基础培训。" },
    reqs: [
      { anyOf: ["chemistry"], count: 1, label: { en: "Chemistry", zh: "化学" }, strictness: "required" },
      { anyOf: SCI_NO_CHEM, count: 1, label: { en: "Biology, Maths or Physics", zh: "生物、数学或物理之一" }, strictness: "usually" },
    ],
    helpful: [],
    competitiveness: "mid",
    suits: { en: "Careful, detail-minded scientists interested in health.", zh: "细心严谨、对健康领域感兴趣的理科生。" },
    careers: ["pharmacist"],
  },
  {
    id: "nursing",
    name: { en: "Nursing", zh: "护理" },
    group: "health",
    blurb: { en: "Half the course is clinical placements in hospitals and the community.", zh: "一半时间在医院和社区实习。" },
    reqs: [],
    helpful: ["biology", "psychology", "sociology"],
    extra: { en: "Choose a field: adult, children's, mental health or learning disability nursing. Interviews are common.", zh: "需选择方向：成人、儿童、精神健康或学习障碍护理，通常有面试。" },
    competitiveness: "low",
    suits: { en: "Calm, practical people who want a hands-on caring career.", zh: "冷静、务实、想从事照护工作的人。" },
    careers: ["nurse"],
  },
  {
    id: "biomed",
    name: { en: "Biology & Biomedical Sciences", zh: "生物 / 生物医学" },
    group: "bio",
    blurb: { en: "How living things work, from cells to ecosystems and disease.", zh: "研究生命如何运作，从细胞到生态系统再到疾病。" },
    reqs: [
      { anyOf: ["biology"], count: 1, label: { en: "Biology", zh: "生物" }, strictness: "required" },
      { anyOf: ["chemistry", "maths", "physics"], count: 1, label: { en: "Chemistry (or another science)", zh: "化学（或另一门理科）" }, strictness: "usually" },
    ],
    helpful: ["chemistry"],
    competitiveness: "mid",
    suits: { en: "Curious scientists who like labs; also a route into graduate-entry medicine.", zh: "好奇心强、喜欢做实验的人；也是读研究生医学的一条路。" },
    careers: ["scientist", "pharmacist", "teacher"],
  },
  {
    id: "chemistry",
    name: { en: "Chemistry", zh: "化学" },
    group: "science",
    blurb: { en: "Molecules, materials and reactions, with lots of lab work.", zh: "分子、材料和化学反应，实验课很多。" },
    reqs: [
      { anyOf: ["chemistry"], count: 1, label: { en: "Chemistry", zh: "化学" }, strictness: "required" },
      { anyOf: ["maths", "physics", "biology"], count: 1, label: { en: "Maths, Physics or Biology", zh: "数学、物理或生物之一" }, strictness: "usually" },
    ],
    helpful: ["maths"],
    competitiveness: "mid",
    suits: { en: "Problem-solvers who enjoy practical science.", zh: "喜欢动手做实验、解决问题的人。" },
    careers: ["scientist", "engineer", "teacher"],
  },
  {
    id: "physics",
    name: { en: "Physics", zh: "物理" },
    group: "science",
    blurb: { en: "The laws of the universe, from particles to astrophysics. Very mathematical.", zh: "宇宙的规律，从粒子到天体物理，数学要求高。" },
    reqs: [
      { anyOf: ["physics"], count: 1, label: { en: "Physics", zh: "物理" }, strictness: "required" },
      { anyOf: ["maths"], count: 1, label: { en: "Maths", zh: "数学" }, strictness: "required" },
    ],
    helpful: ["further_maths"],
    tests: { en: "ESAT at Cambridge, Imperial and Oxford.", zh: "剑桥、帝国理工和牛津要求 ESAT。" },
    competitiveness: "top",
    suits: { en: "People who love maths and big questions.", zh: "热爱数学、喜欢思考大问题的人。" },
    careers: ["scientist", "engineer", "data", "finance"],
  },
  {
    id: "maths",
    name: { en: "Mathematics", zh: "数学" },
    group: "science",
    blurb: { en: "Pure and applied maths, statistics and proof.", zh: "纯数学、应用数学、统计与证明。" },
    reqs: [
      { anyOf: ["maths"], count: 1, label: { en: "Maths", zh: "数学" }, strictness: "required" },
      { anyOf: ["further_maths"], count: 1, label: { en: "Further Maths (expected at top universities)", zh: "进阶数学（顶尖大学通常要求）" }, strictness: "usually" },
    ],
    helpful: ["physics"],
    tests: { en: "STEP (Cambridge, often Warwick), TMUA at several others.", zh: "剑桥（华威也常要求）考 STEP，其他多所学校考 TMUA。" },
    competitiveness: "top",
    suits: { en: "People who enjoy puzzles, logic and proof.", zh: "喜欢解题、逻辑和证明的人。" },
    careers: ["data", "finance", "accountant", "software", "teacher"],
  },
  {
    id: "cs",
    name: { en: "Computer Science", zh: "计算机科学" },
    group: "engineering",
    blurb: { en: "Programming, algorithms, AI, systems and theory.", zh: "编程、算法、人工智能、系统与理论。" },
    reqs: [{ anyOf: ["maths"], count: 1, label: { en: "Maths", zh: "数学" }, strictness: "required" }],
    helpful: ["further_maths", "computer_science", "physics"],
    tests: { en: "TMUA at Cambridge and some others; check each course.", zh: "剑桥等部分学校考 TMUA，请逐一核对。" },
    competitiveness: "top",
    suits: { en: "Logical builders who like making things work.", zh: "逻辑思维强、喜欢动手做出东西的人。" },
    careers: ["software", "data", "finance"],
  },
  {
    id: "engineering",
    name: { en: "Engineering", zh: "工程" },
    group: "engineering",
    blurb: { en: "Mechanical, civil, electrical, chemical, aerospace and more. Often a four-year MEng.", zh: "机械、土木、电子、化工、航空等方向，常为 4 年本硕连读（MEng）。" },
    reqs: [
      { anyOf: ["maths"], count: 1, label: { en: "Maths", zh: "数学" }, strictness: "required" },
      { anyOf: ["physics"], count: 1, label: { en: "Physics (Chemistry for chemical engineering)", zh: "物理（化工专业要求化学）" }, strictness: "usually" },
    ],
    helpful: ["further_maths", "design_tech"],
    tests: { en: "ESAT at Cambridge and Imperial.", zh: "剑桥和帝国理工要求 ESAT。" },
    competitiveness: "top",
    suits: { en: "Practical problem-solvers who want to build real things.", zh: "务实、想造出真实东西的问题解决者。" },
    careers: ["engineer", "consulting", "software"],
  },
  {
    id: "natsci",
    name: { en: "Natural Sciences", zh: "自然科学" },
    group: "science",
    blurb: { en: "A flexible degree combining two or more sciences.", zh: "灵活组合两门或以上理科的学位。" },
    reqs: [{ anyOf: ["biology", "chemistry", "physics", "maths"], count: 2, label: { en: "Two sciences / Maths", zh: "两门理科或数学" }, strictness: "required" }],
    helpful: ["further_maths"],
    tests: { en: "ESAT at Cambridge.", zh: "剑桥要求 ESAT。" },
    competitiveness: "top",
    suits: { en: "Strong scientists who don't want to choose just one subject yet.", zh: "理科强、暂时不想只选一门学科的人。" },
    careers: ["scientist", "data", "consulting", "teacher"],
  },
  {
    id: "economics",
    name: { en: "Economics", zh: "经济" },
    group: "social",
    blurb: { en: "How people, firms and governments make choices — increasingly mathematical.", zh: "研究个人、企业和政府如何做决策，数学要求越来越高。" },
    reqs: [{ anyOf: ["maths"], count: 1, label: { en: "Maths (required at most top universities)", zh: "数学（多数顶尖大学要求）" }, strictness: "usually" }],
    helpful: ["further_maths", "economics"],
    tests: { en: "TMUA at Cambridge, LSE, UCL, Warwick and others.", zh: "剑桥、LSE、UCL、华威等要求 TMUA。" },
    competitiveness: "top",
    suits: { en: "Analytical people interested in money, policy and society.", zh: "善于分析、对金融、政策和社会感兴趣的人。" },
    careers: ["finance", "consulting", "civil_service", "accountant", "data"],
  },
  {
    id: "accfin",
    name: { en: "Accounting & Finance", zh: "会计与金融" },
    group: "social",
    blurb: { en: "Financial reporting, markets and corporate finance; often with exemptions from professional exams.", zh: "财务报告、金融市场和公司金融，常可减免部分职业资格考试。" },
    reqs: [],
    helpful: ["maths", "economics", "accounting"],
    competitiveness: "mid",
    suits: { en: "Organised, numerate people heading for business careers.", zh: "有条理、擅长数字、想进入商界的人。" },
    careers: ["accountant", "finance", "consulting"],
  },
  {
    id: "business",
    name: { en: "Business & Management", zh: "商科与管理" },
    group: "social",
    blurb: { en: "Strategy, marketing, organisations and entrepreneurship; placement years are common.", zh: "战略、市场营销、组织管理和创业，常有带薪实习年。" },
    reqs: [],
    helpful: ["maths", "economics", "business"],
    competitiveness: "mid",
    suits: { en: "Sociable, practical people who want to understand how organisations work.", zh: "善于社交、务实、想了解组织如何运作的人。" },
    careers: ["consulting", "marketing", "finance", "entrepreneur"],
  },
  {
    id: "law",
    name: { en: "Law", zh: "法学" },
    group: "social",
    blurb: { en: "Legal reasoning, cases and statutes. In Scotland you study Scots law.", zh: "法律推理、判例与成文法。在苏格兰读的是苏格兰法。" },
    reqs: [],
    helpful: ESSAY_SUBJECTS,
    tests: { en: "LNAT at Oxford, Cambridge, UCL, KCL, LSE, Bristol, Durham and others.", zh: "牛津、剑桥、UCL、KCL、LSE、布里斯托、杜伦等要求 LNAT。" },
    competitiveness: "high",
    suits: { en: "Readers and arguers who like precise writing.", zh: "爱阅读、善于辩论、写作严谨的人。" },
    careers: ["lawyer", "civil_service", "consulting"],
  },
  {
    id: "ppe",
    name: { en: "PPE (Philosophy, Politics & Economics)", zh: "PPE（哲学、政治与经济）" },
    group: "social",
    blurb: { en: "Three subjects at once — a classic route into policy, journalism and finance.", zh: "同时学三门学科，是进入政策、新闻和金融领域的经典路线。" },
    reqs: [],
    helpful: ["maths", "history", "economics", "politics"],
    tests: { en: "TARA at Oxford (from 2027 entry).", zh: "牛津要求 TARA（2027 入学起）。" },
    competitiveness: "top",
    suits: { en: "All-rounders who love debate and big ideas.", zh: "全面发展、热爱辩论和思想的人。" },
    careers: ["civil_service", "consulting", "journalist", "finance"],
  },
  {
    id: "politics",
    name: { en: "Politics & International Relations", zh: "政治与国际关系" },
    group: "social",
    blurb: { en: "Power, governments, conflict and global institutions.", zh: "权力、政府、冲突与国际机构。" },
    reqs: [],
    helpful: ESSAY_SUBJECTS,
    competitiveness: "mid",
    suits: { en: "People who follow the news and love to argue about it.", zh: "关注时事、喜欢讨论时事的人。" },
    careers: ["civil_service", "journalist", "lawyer", "consulting"],
  },
  {
    id: "psychology",
    name: { en: "Psychology", zh: "心理学" },
    group: "social",
    blurb: { en: "The science of mind and behaviour, with statistics and experiments.", zh: "研究心智与行为的科学，包含统计和实验。" },
    reqs: [],
    helpful: ["biology", "maths", "psychology", "chemistry"],
    extra: { en: "Choose a BPS-accredited degree if you may want to become a psychologist.", zh: "如果以后想当心理学家，请选择 BPS（英国心理学会）认证的学位。" },
    competitiveness: "mid",
    suits: { en: "People-watchers who are comfortable with data.", zh: "喜欢观察人、也不怕数据的人。" },
    careers: ["psychologist", "teacher", "marketing", "data"],
  },
  {
    id: "history",
    name: { en: "History", zh: "历史" },
    group: "humanities",
    blurb: { en: "Reading sources, building arguments and understanding the past.", zh: "阅读史料、构建论证、理解过去。" },
    reqs: [{ anyOf: ["history"], count: 1, label: { en: "History", zh: "历史" }, strictness: "usually" }],
    helpful: ["english_lit", "politics", "classics"],
    competitiveness: "mid",
    suits: { en: "Curious readers and writers.", zh: "好奇心强、爱读爱写的人。" },
    careers: ["lawyer", "civil_service", "journalist", "teacher"],
  },
  {
    id: "english",
    name: { en: "English Literature", zh: "英语文学" },
    group: "humanities",
    blurb: { en: "Close reading and writing about poetry, novels and drama.", zh: "精读诗歌、小说和戏剧，并写评论文章。" },
    reqs: [{ anyOf: ["english_lit"], count: 1, label: { en: "English Literature", zh: "英语文学" }, strictness: "required" }],
    helpful: ["history", "drama", "classics"],
    competitiveness: "mid",
    suits: { en: "Book lovers who enjoy writing.", zh: "爱书、爱写作的人。" },
    careers: ["journalist", "marketing", "teacher", "lawyer"],
  },
  {
    id: "geography",
    name: { en: "Geography", zh: "地理" },
    group: "humanities",
    blurb: { en: "People and planet: climate, cities, development and data — with fieldwork.", zh: "人与地球：气候、城市、发展与数据，并有野外考察。" },
    reqs: [{ anyOf: ["geography"], count: 1, label: { en: "Geography", zh: "地理" }, strictness: "usually" }],
    helpful: ["biology", "maths", "economics", "environmental"],
    competitiveness: "mid",
    suits: { en: "Outdoorsy people who also like data and maps.", zh: "喜欢户外，也喜欢数据和地图的人。" },
    careers: ["civil_service", "consulting", "data", "teacher"],
  },
  {
    id: "languages",
    name: { en: "Modern Languages", zh: "现代语言" },
    group: "humanities",
    blurb: { en: "Languages, culture and literature, usually with a year abroad.", zh: "语言、文化与文学，通常有一年海外学习。" },
    reqs: [{ anyOf: LANGUAGES, count: 1, label: { en: "A language (some courses accept beginners)", zh: "一门外语（部分专业接受零基础）" }, strictness: "usually" }],
    helpful: ["english_lit", "history"],
    competitiveness: "mid",
    suits: { en: "Communicators who want to live abroad.", zh: "善于沟通、想去海外生活的人。" },
    careers: ["civil_service", "journalist", "marketing", "teacher"],
  },
  {
    id: "philosophy",
    name: { en: "Philosophy", zh: "哲学" },
    group: "humanities",
    blurb: { en: "Logic, ethics, mind and knowledge — rigorous arguments.", zh: "逻辑、伦理、心灵与知识，严谨的论证训练。" },
    reqs: [],
    helpful: ["maths", "religious_studies", "english_lit", "philosophy"],
    competitiveness: "mid",
    suits: { en: "Deep thinkers who enjoy debating ideas.", zh: "喜欢深度思考、辩论思想的人。" },
    careers: ["lawyer", "civil_service", "journalist", "consulting"],
  },
  {
    id: "architecture",
    name: { en: "Architecture", zh: "建筑" },
    group: "built",
    blurb: { en: "Design studio plus history, technology and theory. Qualifying takes around 7 years.", zh: "设计工作室加历史、技术和理论课。成为注册建筑师约需 7 年。" },
    reqs: [],
    helpful: ["art", "maths", "physics", "design_tech"],
    extra: { en: "A portfolio is usually required.", zh: "通常要求作品集。" },
    competitiveness: "high",
    suits: { en: "Creative people who also like maths and problem-solving.", zh: "有创意，也喜欢数学和解决问题的人。" },
    careers: ["architect"],
  },
  {
    id: "art",
    name: { en: "Art & Design", zh: "艺术与设计" },
    group: "creative",
    blurb: { en: "Fine art, product, graphic or fashion design, built around studio practice.", zh: "纯艺术、产品、平面或时装设计，以工作室创作为核心。" },
    reqs: [{ anyOf: ["art", "design_tech"], count: 1, label: { en: "Art or Design", zh: "艺术或设计" }, strictness: "usually" }],
    helpful: [],
    extra: { en: "A portfolio is essential; many students take a one-year Foundation in Art & Design first.", zh: "作品集必不可少，很多学生会先读一年艺术设计预科。" },
    competitiveness: "mid",
    suits: { en: "Makers with a strong creative voice.", zh: "有鲜明创作风格的创作者。" },
    careers: ["marketing", "architect", "entrepreneur"],
  },
  {
    id: "sport",
    name: { en: "Sport & Exercise Science", zh: "运动科学" },
    group: "science",
    blurb: { en: "Physiology, biomechanics, psychology and coaching.", zh: "生理学、生物力学、运动心理与教练学。" },
    reqs: [],
    helpful: ["biology", "pe", "chemistry", "psychology"],
    competitiveness: "low",
    suits: { en: "Active people interested in performance and health.", zh: "热爱运动、关注运动表现和健康的人。" },
    careers: ["teacher", "scientist", "entrepreneur"],
  },
  ...MORE_COURSES,
];

export const courseById = (id: CourseId) => COURSES.find((c) => c.id === id)!;

// Rough map from a strong A-level subject to courses it naturally leads to.
export const SUBJECT_TO_COURSES: Partial<Record<SubjectId, CourseId[]>> = {
  maths: ["maths", "economics", "cs", "engineering"],
  further_maths: ["maths", "cs", "engineering", "physics"],
  physics: ["physics", "engineering", "natsci"],
  chemistry: ["chemistry", "medicine", "pharmacy", "natsci"],
  biology: ["biomed", "medicine", "psychology"],
  computer_science: ["cs"],
  economics: ["economics", "accfin", "ppe"],
  business: ["business", "accfin"],
  accounting: ["accfin"],
  psychology: ["psychology"],
  sociology: ["politics", "psychology"],
  politics: ["politics", "ppe", "law"],
  law: ["law"],
  history: ["history", "law", "politics"],
  geography: ["geography", "planning", "envsci"],
  english_lit: ["english", "law"],
  english_lang: ["english"],
  religious_studies: ["philosophy", "law"],
  philosophy: ["philosophy", "ppe"],
  classics: ["history", "philosophy"],
  french: ["languages"],
  spanish: ["languages"],
  german: ["languages"],
  chinese: ["languages"],
  other_language: ["languages"],
  art: ["art", "architecture"],
  design_tech: ["engineering", "architecture", "art"],
  pe: ["sport"],
  environmental: ["envsci", "ecology"],
  marine_science: ["marine"],
  info_tech: ["cs"],
  travel_tourism: ["business", "marketing"],
};

export const GROUPS: { id: CourseGroup | "all"; label: L }[] = [
  { id: "all", label: { en: "All", zh: "全部" } },
  { id: "health", label: { en: "Health & medicine", zh: "医疗健康" } },
  { id: "bio", label: { en: "Biosciences", zh: "生命科学" } },
  { id: "science", label: { en: "Physical sciences & maths", zh: "理科与数学" } },
  { id: "engineering", label: { en: "Engineering & computing", zh: "工程与计算机" } },
  { id: "built", label: { en: "Built environment", zh: "建筑与规划" } },
  { id: "social", label: { en: "Social sciences, law & business", zh: "社科、法律与商科" } },
  { id: "humanities", label: { en: "Humanities & languages", zh: "人文与语言" } },
  { id: "creative", label: { en: "Creative arts & media", zh: "艺术与媒体" } },
];

export function matchesCourse(c: Course, q: string) {
  const n = q.trim().toLowerCase();
  if (!n) return true;
  return [c.name.en, c.name.zh, ...(c.aliases ?? [])].some((s) => s.toLowerCase().includes(n));
}

