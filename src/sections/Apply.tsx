import { useLang, type L } from "../i18n";
import { KEY_DATES } from "../data/facts";
import { Callout, Card, ExtLink, SectionTitle } from "../components/ui";

const TESTS: { name: string; what: L; who: L }[] = [
  {
    name: "TMUA",
    what: { en: "Maths reasoning test (UAT-UK)", zh: "数学推理考试（UAT-UK）" },
    who: { en: "Economics, Maths, Computer Science at Cambridge, Oxford, Imperial, LSE, UCL, Warwick and others", zh: "剑桥、牛津、帝国理工、LSE、UCL、华威等校的经济、数学、计算机专业" },
  },
  {
    name: "ESAT",
    what: { en: "Engineering & science test (UAT-UK)", zh: "工程与理科考试（UAT-UK）" },
    who: { en: "Sciences and engineering at Cambridge, Imperial, and Oxford (e.g. Physics)", zh: "剑桥、帝国理工的理工科，以及牛津部分专业（如物理）" },
  },
  {
    name: "TARA",
    what: { en: "Academic reasoning & writing (UAT-UK)", zh: "学术推理与写作（UAT-UK）" },
    who: { en: "Oxford (e.g. PPE) and some other courses from 2027 entry", zh: "2027 入学起牛津（如 PPE）及部分其他专业" },
  },
  {
    name: "LNAT",
    what: { en: "Law reasoning and essay", zh: "法学推理与写作" },
    who: { en: "Law at Oxford, Cambridge, UCL, KCL, LSE, Bristol, Durham and others", zh: "牛津、剑桥、UCL、KCL、LSE、布里斯托、杜伦等校法学" },
  },
  {
    name: "UCAT",
    what: { en: "Aptitude test for medicine & dentistry", zh: "医学和牙医能力测试" },
    who: { en: "Most UK medical schools, now including Oxford and Cambridge", zh: "英国大多数医学院，现在包括牛津和剑桥" },
  },
  {
    name: "STEP",
    what: { en: "Advanced maths papers, sat in June", zh: "高阶数学考试，6 月考" },
    who: { en: "Often part of Cambridge Maths offers; sometimes Warwick / Imperial", zh: "剑桥数学录取条件常包含，华威、帝国理工有时也会要求" },
  },
];

const PS_QUESTIONS: L[] = [
  { en: "Why do you want to study this course or subject?", zh: "你为什么想学这个专业？" },
  { en: "How have your qualifications and studies helped you to prepare for this course or subject?", zh: "你的课程和学习经历如何帮助你为这个专业做准备？" },
  { en: "What else have you done to prepare outside of education, and why are these experiences useful?", zh: "在课堂之外你还做了哪些准备？这些经历为什么有帮助？" },
];

export default function Apply() {
  const { t } = useLang();
  const now = new Date();
  return (
    <div className="space-y-8">
      <SectionTitle
        title={t({ en: "UCAS timeline & admissions tests (2027 entry)", zh: "UCAS 时间线与入学考试（2027 入学）" })}
        subtitle={t({
          en: "You apply once through UCAS with up to 5 choices, one personal statement and a teacher reference with predicted grades.",
          zh: "通过 UCAS 统一申请，最多选 5 个专业，提交一份个人陈述和一封含预估成绩的老师推荐信。",
        })}
      />

      <Card>
        <ol className="relative space-y-5 border-l-2 border-slate-200 pl-6">
          {KEY_DATES.map((d) => {
            const past = new Date(d.date) < now;
            return (
              <li key={d.date} className={past ? "opacity-50" : ""}>
                <span
                  className={`absolute -left-[9px] mt-1.5 h-4 w-4 rounded-full border-2 border-white ${past ? "bg-slate-300" : "bg-blue-600"}`}
                  aria-hidden
                />
                <div className="text-sm font-semibold text-blue-700">
                  {new Date(d.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                  {past && <span className="ml-2 font-normal text-slate-500">{t({ en: "passed", zh: "已过" })}</span>}
                </div>
                <div className="font-medium text-slate-900">{t(d.label)}</div>
                {d.note && <div className="text-sm text-slate-500">{t(d.note)}</div>}
              </li>
            );
          })}
        </ol>
      </Card>

      <div>
        <h3 className="mb-3 text-lg font-semibold text-slate-900">{t({ en: "Admissions tests", zh: "入学考试" })}</h3>
        <Callout tone="amber">
          {t({
            en: "Big change for 2027 entry: Oxford has replaced its own tests (TSA, MAT, PAT and others) with the shared UAT-UK tests. Always check the exact test for your course — requirements differ even within one university.",
            zh: "2027 入学的重大变化：牛津用 UAT-UK 统一考试取代了原来的 TSA、MAT、PAT 等自主考试。请务必核对你所报专业的具体考试要求，同一所大学不同专业也可能不一样。",
          })}
        </Callout>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {TESTS.map((x) => (
            <Card key={x.name}>
              <div className="text-lg font-bold text-slate-900">{x.name}</div>
              <div className="text-sm text-slate-600">{t(x.what)}</div>
              <div className="mt-2 text-sm text-slate-500">{t(x.who)}</div>
            </Card>
          ))}
        </div>
        <div className="mt-2">
          <ExtLink href="https://www.uat-uk.org/">UAT-UK (ESAT / TMUA / TARA)</ExtLink>
        </div>
      </div>

      <Card>
        <h3 className="text-lg font-semibold text-slate-900">{t({ en: "The new personal statement", zh: "新版个人陈述" })}</h3>
        <p className="mt-1 text-sm text-slate-600">
          {t({
            en: "Since 2026 entry, the personal statement is three questions instead of one free essay — still 4,000 characters in total, with a minimum of 350 characters per answer.",
            zh: "从 2026 入学起，个人陈述由一篇自由文章改为回答三个问题，总字数仍为 4,000 字符，每题至少 350 字符。",
          })}
        </p>
        <ol className="mt-4 space-y-3">
          {PS_QUESTIONS.map((q, i) => (
            <li key={i} className="flex gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-violet-100 font-bold text-violet-700">{i + 1}</span>
              <span className="pt-1 text-slate-800">{t(q)}</span>
            </li>
          ))}
        </ol>
        <div className="mt-3">
          <ExtLink href="https://www.ucas.com/undergraduate/applying-to-university/writing-your-personal-statement">
            {t({ en: "UCAS guidance", zh: "UCAS 官方指南" })}
          </ExtLink>
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <h4 className="font-semibold text-slate-900">{t({ en: "Predicted grades", zh: "预估成绩" })}</h4>
          <p className="mt-1 text-sm text-slate-600">
            {t({ en: "Offers are made mostly on predicted grades, so Year 12 mocks matter. Ask your school how predictions are set.", zh: "大学主要根据预估成绩发 offer，所以 Year 12 的模拟考很重要。可以问学校预估成绩是怎么定的。" })}
          </p>
        </Card>
        <Card>
          <h4 className="font-semibold text-slate-900">{t({ en: "Contextual offers", zh: "情境录取" })}</h4>
          <p className="mt-1 text-sm text-slate-600">
            {t({
              en: "Many universities lower offers for students from under-represented backgrounds or schools — check eligibility on each university's site.",
              zh: "很多大学会给来自教育资源较少地区或学校的学生降低录取要求，具体条件请查各校官网。",
            })}
          </p>
        </Card>
        <Card>
          <h4 className="font-semibold text-slate-900">{t({ en: "Firm & insurance", zh: "Firm 与 Insurance" })}</h4>
          <p className="mt-1 text-sm text-slate-600">
            {t({ en: "Pick one ambitious firm choice and a realistic insurance with a lower offer.", zh: "选一个有挑战的首选（Firm），再选一个要求更低、把握更大的保底（Insurance）。" })}
          </p>
        </Card>
      </div>
    </div>
  );
}
