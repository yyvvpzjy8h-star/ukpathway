import type { L } from "../i18n";

export type SubjectId =
  | "maths" | "further_maths" | "physics" | "chemistry" | "biology" | "computer_science"
  | "economics" | "business" | "accounting" | "psychology" | "sociology" | "politics" | "law"
  | "history" | "geography" | "english_lit" | "english_lang" | "religious_studies" | "philosophy" | "classics"
  | "french" | "spanish" | "german" | "chinese" | "other_language"
  | "art" | "design_tech" | "music" | "drama" | "media" | "pe" | "environmental"
  | "thinking_skills" | "global_perspectives" | "info_tech" | "marine_science" | "travel_tourism";

export const SUBJECTS: { id: SubjectId; name: L }[] = [
  { id: "maths", name: { en: "Mathematics", zh: "数学" } },
  { id: "further_maths", name: { en: "Further Mathematics", zh: "进阶数学" } },
  { id: "physics", name: { en: "Physics", zh: "物理" } },
  { id: "chemistry", name: { en: "Chemistry", zh: "化学" } },
  { id: "biology", name: { en: "Biology", zh: "生物" } },
  { id: "computer_science", name: { en: "Computer Science", zh: "计算机科学" } },
  { id: "economics", name: { en: "Economics", zh: "经济" } },
  { id: "business", name: { en: "Business", zh: "商科" } },
  { id: "accounting", name: { en: "Accounting", zh: "会计" } },
  { id: "psychology", name: { en: "Psychology", zh: "心理学" } },
  { id: "sociology", name: { en: "Sociology", zh: "社会学" } },
  { id: "politics", name: { en: "Politics", zh: "政治" } },
  { id: "law", name: { en: "Law", zh: "法律" } },
  { id: "history", name: { en: "History", zh: "历史" } },
  { id: "geography", name: { en: "Geography", zh: "地理" } },
  { id: "english_lit", name: { en: "English Literature", zh: "英语文学" } },
  { id: "english_lang", name: { en: "English Language", zh: "英语语言" } },
  { id: "religious_studies", name: { en: "Religious Studies", zh: "宗教研究" } },
  { id: "philosophy", name: { en: "Philosophy", zh: "哲学" } },
  { id: "classics", name: { en: "Classics / Latin", zh: "古典学 / 拉丁语" } },
  { id: "french", name: { en: "French", zh: "法语" } },
  { id: "spanish", name: { en: "Spanish", zh: "西班牙语" } },
  { id: "german", name: { en: "German", zh: "德语" } },
  { id: "chinese", name: { en: "Chinese", zh: "中文" } },
  { id: "other_language", name: { en: "Other language", zh: "其他语言" } },
  { id: "art", name: { en: "Art & Design", zh: "艺术与设计" } },
  { id: "design_tech", name: { en: "Design & Technology", zh: "设计与技术" } },
  { id: "music", name: { en: "Music", zh: "音乐" } },
  { id: "drama", name: { en: "Drama & Theatre", zh: "戏剧" } },
  { id: "media", name: { en: "Media / Film Studies", zh: "媒体 / 电影" } },
  { id: "pe", name: { en: "Physical Education", zh: "体育" } },
  { id: "environmental", name: { en: "Environmental Science / Management", zh: "环境科学 / 环境管理" } },
  { id: "info_tech", name: { en: "Information Technology", zh: "信息技术" } },
  { id: "marine_science", name: { en: "Marine Science (CIE)", zh: "海洋科学（CIE）" } },
  { id: "travel_tourism", name: { en: "Travel & Tourism (CIE)", zh: "旅游（CIE）" } },
  { id: "thinking_skills", name: { en: "Thinking Skills (CIE)", zh: "思维技能（CIE）" } },
  { id: "global_perspectives", name: { en: "Global Perspectives & Research (CIE)", zh: "全球视野与研究（CIE）" } },
];

// Subjects some universities don't count among your three main A-levels.
export const OFTEN_NOT_COUNTED: SubjectId[] = ["thinking_skills", "global_perspectives"];

export const subjectName = (id: SubjectId) => SUBJECTS.find((s) => s.id === id)!.name;

export const LANGUAGES: SubjectId[] = ["french", "spanish", "german", "chinese", "other_language"];
export const SCIENCES: SubjectId[] = ["biology", "chemistry", "physics", "maths"];
export const ESSAY_SUBJECTS: SubjectId[] = [
  "english_lit", "history", "politics", "religious_studies", "philosophy", "classics", "geography", "economics", "sociology",
];

// ---------- Qualifications & exam boards ----------

export type QualId = "alevel" | "cie" | "ial" | "ib" | "btec" | "scottish";
export type GcseQualId = "gcse" | "igcse";

export type Board = { id: string; name: string; info: L; url: string };

export const BOARDS: Record<string, Board> = {
  aqa: {
    id: "aqa",
    name: "AQA",
    info: { en: "The largest exam board in England, offering GCSEs and A-levels.", zh: "英格兰规模最大的考试局，提供 GCSE 和 A-Level。" },
    url: "https://www.aqa.org.uk/",
  },
  edexcel: {
    id: "edexcel",
    name: "Pearson Edexcel",
    info: { en: "Run by Pearson. Offers GCSEs, A-levels and BTECs in the UK.", zh: "隶属培生（Pearson），在英国提供 GCSE、A-Level 和 BTEC。" },
    url: "https://qualifications.pearson.com/",
  },
  ocr: {
    id: "ocr",
    name: "OCR",
    info: { en: "Part of Cambridge University Press & Assessment. GCSEs and A-levels in the UK.", zh: "隶属剑桥大学出版与评估集团，在英国提供 GCSE 和 A-Level。" },
    url: "https://www.ocr.org.uk/",
  },
  eduqas: {
    id: "eduqas",
    name: "WJEC / Eduqas",
    info: { en: "WJEC sets Welsh qualifications; its Eduqas brand offers GCSEs and A-levels in England.", zh: "WJEC 负责威尔士的考试，旗下 Eduqas 品牌在英格兰提供 GCSE 和 A-Level。" },
    url: "https://www.eduqas.co.uk/",
  },
  ccea: {
    id: "ccea",
    name: "CCEA",
    info: { en: "The exam board for Northern Ireland.", zh: "北爱尔兰的考试局。" },
    url: "https://ccea.org.uk/",
  },
  cie: {
    id: "cie",
    name: "Cambridge International (CIE)",
    info: {
      en: "Cambridge's international board: IGCSE and International AS & A Levels, taken in many international schools. Main series in May/June and Oct/Nov.",
      zh: "剑桥的国际考试局：提供 IGCSE 和国际 AS/A-Level，很多国际学校都考。主要考季在 5–6 月和 10–11 月。",
    },
    url: "https://www.cambridgeinternational.org/",
  },
  pearson_intl: {
    id: "pearson_intl",
    name: "Pearson Edexcel International",
    info: {
      en: "International GCSE and International A Level (IAL). IAL is modular, with several exam series a year, so units can be resat.",
      zh: "提供 International GCSE 和国际 A-Level（IAL）。IAL 是模块制，一年有多个考季，可以重考单元。",
    },
    url: "https://qualifications.pearson.com/",
  },
  oxfordaqa: {
    id: "oxfordaqa",
    name: "OxfordAQA",
    info: { en: "International GCSEs and A-levels from Oxford University Press and AQA.", zh: "牛津大学出版社与 AQA 合办，提供国际 GCSE 和 A-Level。" },
    url: "https://www.oxfordaqa.com/",
  },
  ib: {
    id: "ib",
    name: "International Baccalaureate (IB)",
    info: { en: "IB Diploma: 6 subjects (3 HL + 3 SL) plus Extended Essay, TOK and CAS. Scored out of 45.", zh: "IB 文凭：6 门课（3 门高级 + 3 门普通），外加拓展论文、知识论和 CAS，满分 45。" },
    url: "https://www.ibo.org/",
  },
  btec: {
    id: "btec",
    name: "Pearson BTEC",
    info: { en: "Vocational Nationals graded Distinction*/Distinction/Merit/Pass. Often combined with A-levels.", zh: "职业类课程，成绩分 D*/D/M/P，常与 A-Level 搭配。" },
    url: "https://qualifications.pearson.com/",
  },
  sqa: {
    id: "sqa",
    name: "SQA (Scotland)",
    info: { en: "Scottish Highers (usually S5) and Advanced Highers (S6).", zh: "苏格兰 Highers（通常 S5）和 Advanced Highers（S6）。" },
    url: "https://www.sqa.org.uk/",
  },
};

export const QUALS: { id: QualId; name: L; boards: string[]; grades: string[] }[] = [
  { id: "alevel", name: { en: "A-levels (UK)", zh: "A-Level（英国）" }, boards: ["aqa", "edexcel", "ocr", "eduqas", "ccea"], grades: ["A*", "A", "B", "C", "D", "E"] },
  { id: "cie", name: { en: "Cambridge International A-levels (CIE)", zh: "剑桥国际 A-Level（CIE）" }, boards: ["cie"], grades: ["A*", "A", "B", "C", "D", "E"] },
  { id: "ial", name: { en: "Pearson Edexcel International / OxfordAQA A-levels", zh: "爱德思国际 / OxfordAQA A-Level" }, boards: ["pearson_intl", "oxfordaqa"], grades: ["A*", "A", "B", "C", "D", "E"] },
  { id: "ib", name: { en: "IB Diploma", zh: "IB 文凭" }, boards: ["ib"], grades: ["7", "6", "5", "4", "3", "2", "1"] },
  { id: "btec", name: { en: "BTEC Nationals", zh: "BTEC" }, boards: ["btec"], grades: ["D*", "D", "M", "P"] },
  { id: "scottish", name: { en: "Scottish Highers", zh: "苏格兰 Highers" }, boards: ["sqa"], grades: ["A", "B", "C", "D"] },
];

export const GCSE_QUALS: { id: GcseQualId; name: L; boards: string[]; grades: string[] }[] = [
  { id: "gcse", name: { en: "GCSE (9–1)", zh: "GCSE（9–1 分制）" }, boards: ["aqa", "edexcel", "ocr", "eduqas", "ccea"], grades: ["9", "8", "7", "6", "5", "4", "3", "2", "1"] },
  {
    id: "igcse",
    name: { en: "IGCSE / International GCSE", zh: "IGCSE / 国际 GCSE" },
    boards: ["cie", "pearson_intl", "oxfordaqa"],
    grades: ["9", "8", "7", "6", "5", "4", "3", "2", "1", "A*", "A", "B", "C", "D", "E"],
  },
];

// Converts a GCSE/IGCSE grade (9–1 or A*–G) to a 9–1 number for rough comparison.
export function gcsePoints(g: string): number {
  const letter: Record<string, number> = { "A*": 8.5, A: 7, B: 5.5, C: 4, D: 3, E: 2 };
  return letter[g] ?? Number(g);
}
