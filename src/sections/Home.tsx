import { ArrowRight, BookOpen, Briefcase, CalendarClock, Calculator, GraduationCap, Layers, Plane, PoundSterling, Sparkles } from "lucide-react";
import { gbp, useLang, type L } from "../i18n";
import { HERO_PHOTO, HOME_FEE, KEY_DATES } from "../data/facts";
import { UNIVERSITIES, photoPage } from "../data/universities";
import { Card, UniPhoto } from "../components/ui";
import type { Tab } from "../App";

const MOSAIC = ["oxford", "edinburgh", "durham", "glasgow", "bristol", "standrews"];

export default function Home({ go, openUni }: { go: (t: Tab) => void; openUni: (id: string) => void }) {
  const { t } = useLang();
  const now = new Date();
  const next = KEY_DATES.find((d) => new Date(d.date) > now);
  const days = next ? Math.ceil((new Date(next.date).getTime() - now.getTime()) / 86400000) : 0;

  const steps: { icon: typeof Sparkles; title: L; text: L }[] = [
    { icon: BookOpen, title: { en: "Add your grades", zh: "填写成绩" }, text: { en: "GCSEs, A-levels / IB / BTEC and your exam boards.", zh: "GCSE、A-Level / IB / BTEC 以及考试局。" } },
    { icon: Sparkles, title: { en: "Tell us what you like", zh: "说说你的兴趣" }, text: { en: "Courses, careers, cities, budget.", zh: "专业、职业、城市和预算。" } },
    { icon: GraduationCap, title: { en: "Get your shortlist", zh: "拿到推荐清单" }, text: { en: "Reach, match and safer universities — plus any subject gaps.", zh: "冲刺、匹配、稳妥三档大学，并提醒缺少的科目。" } },
  ];

  const tiles: { tab: Tab; icon: typeof Sparkles; title: L; text: L }[] = [
    { tab: "universities", icon: GraduationCap, title: { en: "Universities", zh: "大学" }, text: { en: "Photos, who each one suits, and side-by-side comparison.", zh: "实景照片、适合人群，还能并排对比。" } },
    { tab: "courses", icon: Layers, title: { en: "Courses", zh: "专业" }, text: { en: "What you study, required A-levels and where it leads.", zh: "学什么、需要哪些 A-Level、毕业去向。" } },
    { tab: "careers", icon: Briefcase, title: { en: "Careers", zh: "职业" }, text: { en: "Work backwards from a job to the right degree or apprenticeship.", zh: "从职业倒推合适的学位或学徒路线。" } },
    { tab: "quals", icon: BookOpen, title: { en: "Exam boards", zh: "考试局" }, text: { en: "GCSE, IGCSE, A-level, IB — AQA, Edexcel, OCR, CIE explained.", zh: "GCSE、IGCSE、A-Level、IB，以及 AQA、Edexcel、OCR、CIE 简介。" } },
    { tab: "fees", icon: PoundSterling, title: { en: "Home vs international fees", zh: "本地 vs 国际学费" }, text: { en: "Fee status, student finance and what each uni charges.", zh: "学费身份、学生贷款和各校学费。" } },
    { tab: "calculator", icon: Calculator, title: { en: "Cost calculator", zh: "费用计算器" }, text: { en: "Tuition + rent + living for the whole degree.", zh: "学费 + 房租 + 生活费，算出整个学位的花费。" } },
    { tab: "apply", icon: CalendarClock, title: { en: "UCAS timeline", zh: "UCAS 时间线" }, text: { en: "2027-entry dates, tests and the new personal statement.", zh: "2027 入学日期、考试和新版个人陈述。" } },
    { tab: "international", icon: Plane, title: { en: "International students", zh: "国际学生" }, text: { en: "Visa costs, proof of funds and the Graduate Route.", zh: "签证费用、资金证明和毕业工签。" } },
  ];

  return (
    <div className="space-y-12">
      <section className="relative -mx-4 overflow-hidden sm:mx-0 sm:rounded-3xl">
        <UniPhoto photo={HERO_PHOTO} alt={t({ en: "Graduates in gowns at a UK university ceremony", zh: "英国大学毕业典礼上身穿学位服的毕业生" })} width={1600} className="absolute inset-0 h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/85 via-slate-900/60 to-slate-900/20" />
        <div className="relative px-6 py-14 sm:px-12 sm:py-20">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-200">{t({ en: "For sixth-formers & international students", zh: "写给高中生和国际学生" })}</p>
          <h1 className="mt-3 max-w-2xl text-4xl font-bold leading-tight text-white sm:text-5xl">
            {t({ en: "Find the UK university that fits you", zh: "找到适合你的英国大学" })}
          </h1>
          <p className="mt-4 max-w-xl text-lg text-slate-100">
            {t({
              en: "Add your grades and interests, and get a personal shortlist of courses, universities and careers — free, and with sources for every number.",
              zh: "填写成绩和兴趣，获得专属于你的专业、大学和职业推荐。完全免费，每个数字都有来源。",
            })}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => go("plan")}
              className="flex min-h-[48px] items-center gap-2 rounded-xl bg-white px-6 font-semibold text-blue-700 shadow-lg transition hover:bg-blue-50"
            >
              <Sparkles size={18} /> {t({ en: "Build my plan", zh: "开始我的规划" })} <ArrowRight size={18} />
            </button>
            <button
              type="button"
              onClick={() => go("universities")}
              className="min-h-[48px] rounded-xl border border-white/60 px-6 font-semibold text-white transition hover:bg-white/10"
            >
              {t({ en: "Browse universities", zh: "浏览大学" })}
            </button>
          </div>
        </div>
        <a
          href={photoPage(HERO_PHOTO.file)}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-2 right-3 text-[11px] text-white/70 hover:text-white"
        >
          {t({ en: "Photo", zh: "照片" })}: {HERO_PHOTO.author}
        </a>
      </section>

      {next && (
        <button
          type="button"
          onClick={() => go("apply")}
          className="flex w-full items-center gap-4 rounded-2xl border border-blue-200 bg-white p-4 text-left shadow-sm transition hover:border-blue-400"
        >
          <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-xl bg-blue-600 text-white">
            <span className="text-2xl font-bold leading-none">{days}</span>
            <span className="text-[10px] uppercase">{t({ en: "days", zh: "天" })}</span>
          </div>
          <div className="min-w-0">
            <div className="text-xs font-semibold uppercase tracking-wide text-blue-700">{t({ en: "Next key date", zh: "下一个关键日期" })}</div>
            <div className="font-semibold text-slate-900">{t(next.label)}</div>
            <div className="text-sm text-slate-500">{new Date(next.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</div>
          </div>
          <ArrowRight className="ml-auto shrink-0 text-blue-600" />
        </button>
      )}

      <section>
        <h2 className="text-2xl font-bold text-slate-900">{t({ en: "How it works", zh: "怎么用" })}</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {steps.map((s, i) => (
            <Card key={i} className="relative">
              <span className="absolute right-4 top-3 text-4xl font-black text-slate-100">{i + 1}</span>
              <s.icon className="text-blue-600" size={26} aria-hidden />
              <div className="mt-3 font-semibold text-slate-900">{t(s.title)}</div>
              <p className="mt-1 text-sm text-slate-600">{t(s.text)}</p>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">{t({ en: "Picture yourself here", zh: "想象一下在这里上学" })}</h2>
            <p className="mt-1 text-slate-600">{t({ en: `${UNIVERSITIES.length} universities, from ancient colleges to modern campuses.`, zh: `${UNIVERSITIES.length} 所大学，从古老学院到现代校园。` })}</p>
          </div>
          <button type="button" onClick={() => go("universities")} className="hidden min-h-[44px] items-center gap-1 font-medium text-blue-700 hover:underline sm:flex">
            {t({ en: "See all", zh: "查看全部" })} <ArrowRight size={16} />
          </button>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3">
          {MOSAIC.map((id, i) => {
            const u = UNIVERSITIES.find((x) => x.id === id)!;
            return (
              <button
                key={id}
                type="button"
                onClick={() => openUni(id)}
                className={`group relative overflow-hidden rounded-2xl text-left ${i === 0 ? "col-span-2 row-span-2 md:col-span-1" : ""}`}
              >
                <UniPhoto photo={u.photo} alt={u.name} width={i === 0 ? 960 : 520} className={`w-full transition duration-500 group-hover:scale-105 ${i === 0 ? "h-64 md:h-full" : "h-36 sm:h-44"}`} />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/75 to-transparent" />
                <div className="absolute bottom-0 p-3 text-white">
                  <div className="font-semibold leading-tight">{u.name}</div>
                  <div className="text-xs text-white/80">{t(u.city)}</div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        <Card>
          <div className="text-sm text-slate-500">{t({ en: "Home fee cap (England) 2026/27", zh: "英格兰本地生学费上限 2026/27" })}</div>
          <div className="mt-1 text-3xl font-bold text-slate-900">{gbp(HOME_FEE.england2627)}</div>
          <div className="mt-1 text-sm text-slate-500">{t({ en: `${gbp(HOME_FEE.england2728)} in 2027/28`, zh: `2027/28 为 ${gbp(HOME_FEE.england2728)}` })}</div>
        </Card>
        <Card>
          <div className="text-sm text-slate-500">{t({ en: "Scottish students at Scottish universities", zh: "苏格兰学生读苏格兰大学" })}</div>
          <div className="mt-1 text-3xl font-bold text-slate-900">£0</div>
          <div className="mt-1 text-sm text-slate-500">{t({ en: "Tuition paid by SAAS", zh: "学费由 SAAS 支付" })}</div>
        </Card>
        <Card>
          <div className="text-sm text-slate-500">{t({ en: "International fees (2026/27 examples)", zh: "国际生学费（2026/27 举例）" })}</div>
          <div className="mt-1 text-3xl font-bold text-slate-900">£28k–£70k</div>
          <div className="mt-1 text-sm text-slate-500">{t({ en: "Per year — depends on course", zh: "每年，主要看专业" })}</div>
        </Card>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {tiles.map(({ tab, icon: Icon, title, text }) => (
          <button
            key={tab}
            type="button"
            onClick={() => go(tab)}
            className="rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:border-blue-300 hover:shadow"
          >
            <Icon className="text-blue-600" size={24} aria-hidden />
            <div className="mt-3 font-semibold text-slate-900">{t(title)}</div>
            <p className="mt-1 text-sm text-slate-600">{t(text)}</p>
          </button>
        ))}
      </section>
    </div>
  );
}
