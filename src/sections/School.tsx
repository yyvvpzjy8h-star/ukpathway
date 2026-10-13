import { useLang, type L } from "../i18n";
import { Callout, Card, SectionTitle } from "../components/ui";

const ROUTES: { name: string; text: L }[] = [
  {
    name: "A-levels",
    text: {
      en: "Usually 3 subjects over two years, assessed mainly by final exams. Accepted everywhere; most university offers are written in A-level grades.",
      zh: "通常学 3 门，读两年，主要靠期末考试。所有大学都认可，大部分 offer 都以 A-Level 成绩表示。",
    },
  },
  {
    name: "IB Diploma",
    text: {
      en: "Six subjects (3 Higher, 3 Standard) plus the Extended Essay, TOK and CAS. Broad and demanding; offers are given in points (e.g. 38–42 with HL scores).",
      zh: "6 门课（3 门高级、3 门普通），外加拓展论文、知识论和 CAS。课程面广、难度大；offer 以总分表示（如 38–42 分，并对高级课程有分数要求）。",
    },
  },
  {
    name: "BTEC / T-levels",
    text: {
      en: "Vocational routes with more coursework. Accepted for many courses, often combined with A-levels — check each course's entry requirements.",
      zh: "职业类课程，课程作业比重更大。很多专业接受，常与 A-Level 搭配，请查看各专业的入学要求。",
    },
  },
  {
    name: "Scottish Highers",
    text: {
      en: "Usually 4–5 Highers in S5, then Advanced Highers in S6. Scottish universities often make offers on Highers alone.",
      zh: "通常 S5 考 4–5 门 Highers，S6 再考 Advanced Highers。苏格兰大学常常只凭 Highers 发 offer。",
    },
  },
];

const TIPS: L[] = [
  {
    en: "Work backwards: look up the required subjects for courses you might want before choosing. Maths is required or strongly preferred for Economics, Computer Science, Engineering and Physics; Further Maths helps at top universities.",
    zh: "倒推选课：选课前先查清你可能想读的专业要求哪些科目。经济、计算机、工程、物理通常要求或强烈建议学数学；顶尖大学还看重进阶数学（Further Maths）。",
  },
  {
    en: "Medicine and dentistry almost always need Chemistry, usually with Biology or another science.",
    zh: "医学和牙医几乎都要求化学，通常还要生物或另一门理科。",
  },
  {
    en: "Not sure yet? Pick subjects you enjoy and do well in — grades matter more than looking ‘impressive’. Keeping one essay subject and one quantitative subject keeps more doors open.",
    zh: "还没想好？选你喜欢、也擅长的科目，成绩比科目“好不好听”更重要。同时保留一门写作类和一门数理类科目，以后的选择会更多。",
  },
  {
    en: "Go beyond the syllabus: an EPQ, wider reading, online courses, competitions or work experience give you material for personal statement question 3.",
    zh: "课外拓展：EPQ（拓展项目）、课外阅读、网课、竞赛或工作实习，都能为个人陈述第 3 题提供素材。",
  },
  {
    en: "GCSEs count too: competitive courses look at GCSE grades, especially Maths and English.",
    zh: "GCSE 成绩也重要：竞争激烈的专业会看 GCSE 成绩，尤其是数学和英语。",
  },
];

export default function School() {
  const { t } = useLang();
  return (
    <div className="space-y-8">
      <SectionTitle
        title={t({ en: "Sixth form choices", zh: "高中阶段的选择" })}
        subtitle={t({
          en: "The subjects you choose at 16 shape what you can apply for at 18. Here's how the main routes compare.",
          zh: "16 岁时选的科目，决定了 18 岁时能申请哪些专业。下面对比几种主要路线。",
        })}
      />
      <div className="grid gap-4 sm:grid-cols-2">
        {ROUTES.map((r) => (
          <Card key={r.name}>
            <div className="text-lg font-bold text-slate-900">{r.name}</div>
            <p className="mt-1 text-sm text-slate-600">{t(r.text)}</p>
          </Card>
        ))}
      </div>
      <Card>
        <h3 className="text-lg font-semibold text-slate-900">{t({ en: "Choosing subjects", zh: "怎么选科" })}</h3>
        <ul className="mt-3 space-y-3">
          {TIPS.map((tip) => (
            <li key={tip.en} className="flex gap-3 text-sm text-slate-700">
              <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-blue-500" aria-hidden />
              {t(tip)}
            </li>
          ))}
        </ul>
      </Card>
      <Callout>
        {t({
          en: "International qualifications (e.g. Chinese Gaokao, AP, other national diplomas) are accepted by many UK universities, sometimes with a foundation year. Search “international entry requirements” on each university's site.",
          zh: "很多英国大学也接受国际学历（如中国高考、AP、其他国家的高中文凭），有时需要先读预科（Foundation）。可以在各校官网搜索 “international entry requirements”。",
        })}
      </Callout>
    </div>
  );
}
