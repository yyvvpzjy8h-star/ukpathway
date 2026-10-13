import { useLang, type L } from "../i18n";
import { BOARDS } from "../data/subjects";
import { Callout, Card, ExtLink, SectionTitle } from "../components/ui";

const LEVELS: { title: L; text: L; boards: string[] }[] = [
  {
    title: { en: "GCSE (England, Wales, NI)", zh: "GCSE（英格兰、威尔士、北爱）" },
    text: {
      en: "Taken at 16, usually 8–10 subjects. England grades 9 (top) to 1; a 4 is a 'standard pass' and 5 a 'strong pass'. Universities look at Maths and English especially.",
      zh: "16 岁考，通常 8–10 门。英格兰按 9（最高）到 1 评分，4 分为“标准及格”，5 分为“良好及格”。大学尤其看重数学和英语成绩。",
    },
    boards: ["aqa", "edexcel", "ocr", "eduqas", "ccea"],
  },
  {
    title: { en: "IGCSE / International GCSE", zh: "IGCSE / 国际 GCSE" },
    text: {
      en: "The international version, common in international and independent schools. Cambridge offers A*–G or 9–1 grading; Pearson uses 9–1. UK universities treat them like GCSEs.",
      zh: "国际版 GCSE，国际学校和私立学校常见。剑桥提供 A*–G 或 9–1 两种评分，培生使用 9–1。英国大学视同 GCSE。",
    },
    boards: ["cie", "pearson_intl", "oxfordaqa"],
  },
  {
    title: { en: "A-levels", zh: "A-Level" },
    text: {
      en: "Two years, usually 3 subjects (4 with Further Maths), graded A* to E, assessed mostly by final exams in Year 13. The most common route to UK universities.",
      zh: "读两年，通常 3 门（加进阶数学为 4 门），成绩分 A* 到 E，主要靠 Year 13 的期末考试。是进入英国大学最常见的路线。",
    },
    boards: ["aqa", "edexcel", "ocr", "eduqas", "ccea"],
  },
  {
    title: { en: "International A-levels", zh: "国际 A-Level" },
    text: {
      en: "Same A* to E grades, accepted like UK A-levels. Pearson IAL is modular (units can be resat across several series a year); Cambridge International has AS + A2 with series in May/June and Oct/Nov.",
      zh: "同样是 A* 到 E 评分，与英国 A-Level 同等认可。培生 IAL 是模块制，一年多个考季可重考单元；剑桥国际分 AS 和 A2，考季在 5–6 月和 10–11 月。",
    },
    boards: ["cie", "pearson_intl", "oxfordaqa"],
  },
  {
    title: { en: "IB Diploma", zh: "IB 文凭" },
    text: {
      en: "Six subjects (three Higher Level) plus Extended Essay, TOK and CAS, scored out of 45. Offers usually give a total plus HL scores (e.g. 38 with 6,6,6 at HL).",
      zh: "6 门课（3 门高级）外加拓展论文、知识论和 CAS，满分 45。offer 通常给出总分加高级课程分数要求（如 38 分，高级课程 6,6,6）。",
    },
    boards: ["ib"],
  },
  {
    title: { en: "BTEC & T-levels", zh: "BTEC 与 T-Level" },
    text: {
      en: "Vocational routes with more coursework. BTECs are accepted for many courses (often with an A-level); T-levels include an industry placement. Check each course's requirements.",
      zh: "职业类路线，课程作业比重大。很多专业接受 BTEC（常需搭配一门 A-Level）；T-Level 包含行业实习。请查各专业要求。",
    },
    boards: ["btec"],
  },
  {
    title: { en: "Scottish Highers & Advanced Highers", zh: "苏格兰 Highers 与 Advanced Highers" },
    text: {
      en: "Usually 4–5 Highers in S5, then Advanced Highers in S6. Scottish universities often make offers on Highers alone; English universities may also ask for Advanced Highers.",
      zh: "通常 S5 考 4–5 门 Highers，S6 考 Advanced Highers。苏格兰大学常只凭 Highers 发 offer，英格兰大学可能还要求 Advanced Highers。",
    },
    boards: ["sqa"],
  },
];

export default function Qualifications() {
  const { t } = useLang();
  return (
    <div className="space-y-8">
      <SectionTitle
        title={t({ en: "Qualifications & exam boards", zh: "学历与考试局" })}
        subtitle={t({
          en: "GCSE, IGCSE, A-level, International A-level, IB, BTEC, Highers — and AQA, Edexcel, OCR, CIE and the rest, explained simply.",
          zh: "GCSE、IGCSE、A-Level、国际 A-Level、IB、BTEC、Highers，以及 AQA、Edexcel、OCR、CIE 等考试局，简单讲清楚。",
        })}
      />
      <Callout tone="green">
        {t({
          en: "Good news: UK universities don't prefer one exam board over another. An A in AQA Chemistry and an A in OCR or CIE Chemistry count the same. What matters is the subject and the grade.",
          zh: "好消息：英国大学不会偏好某个考试局。AQA 化学拿 A，和 OCR 或 CIE 化学拿 A 是一样的。重要的是科目和成绩。",
        })}
      </Callout>
      <div className="grid gap-4 md:grid-cols-2">
        {LEVELS.map((lv) => (
          <Card key={lv.title.en}>
            <h3 className="text-lg font-semibold text-slate-900">{t(lv.title)}</h3>
            <p className="mt-1 text-sm text-slate-600">{t(lv.text)}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {lv.boards.map((b) => (
                <span key={b} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
                  {BOARDS[b].name}
                </span>
              ))}
            </div>
          </Card>
        ))}
      </div>

      <div>
        <h3 className="mb-3 text-lg font-semibold text-slate-900">{t({ en: "The exam boards", zh: "各考试局" })}</h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {Object.values(BOARDS).map((b) => (
            <Card key={b.id}>
              <div className="font-semibold text-slate-900">{b.name}</div>
              <p className="mt-1 text-sm text-slate-600">{t(b.info)}</p>
              <ExtLink href={b.url}>{t({ en: "Website", zh: "官网" })}</ExtLink>
            </Card>
          ))}
        </div>
      </div>

      <Card>
        <h3 className="text-lg font-semibold text-slate-900">{t({ en: "Choosing sixth-form subjects", zh: "怎么选高中科目" })}</h3>
        <ul className="mt-3 space-y-2 text-sm text-slate-700">
          {[
            { en: "Work backwards from courses you might want — use “My plan” to see which subjects they need.", zh: "从你可能想读的专业倒推，用“我的规划”查看它们需要哪些科目。" },
            { en: "Maths opens the most doors: it's needed for economics, CS, engineering and physics at most top universities.", zh: "数学能打开最多的门：多数顶尖大学的经济、计算机、工程和物理都要求数学。" },
            { en: "Medicine, dentistry and vet need Chemistry, usually with Biology.", zh: "医学、牙医和兽医要求化学，通常还要生物。" },
            { en: "Not sure yet? Pick subjects you enjoy and are good at, ideally mixing one essay subject with one quantitative one.", zh: "还没想好？选你喜欢、也擅长的科目，最好一门写作类加一门数理类。" },
            { en: "An EPQ, wider reading, competitions and work experience all help your personal statement.", zh: "EPQ、课外阅读、竞赛和工作经历都能为个人陈述加分。" },
          ].map((tip) => (
            <li key={tip.en} className="flex gap-3">
              <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-blue-500" aria-hidden />
              {t(tip)}
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
