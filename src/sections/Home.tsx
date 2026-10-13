import { CalendarClock, Calculator, GraduationCap, PoundSterling, Plane, School } from "lucide-react";
import { gbp, useLang } from "../i18n";
import { HOME_FEE, KEY_DATES } from "../data/facts";
import { Card } from "../components/ui";
import type { Tab } from "../App";

function nextDeadline(now: Date) {
  return KEY_DATES.find((d) => new Date(d.date) > now);
}

export default function Home({ go }: { go: (t: Tab) => void }) {
  const { t } = useLang();
  const now = new Date();
  const next = nextDeadline(now);
  const days = next ? Math.ceil((new Date(next.date).getTime() - now.getTime()) / 86400000) : 0;

  const tiles: { tab: Tab; icon: typeof GraduationCap; title: { en: string; zh: string }; text: { en: string; zh: string } }[] = [
    {
      tab: "universities",
      icon: GraduationCap,
      title: { en: "Compare universities", zh: "对比大学" },
      text: { en: "Rankings, typical offers, admissions tests and fees side by side.", zh: "排名、常见录取要求、入学考试和学费一目了然。" },
    },
    {
      tab: "fees",
      icon: PoundSterling,
      title: { en: "Home vs international fees", zh: "本地 vs 国际学费" },
      text: { en: "Which fee status you're likely to get, and what student finance covers.", zh: "你可能属于哪种学费身份，以及学生贷款能覆盖什么。" },
    },
    {
      tab: "calculator",
      icon: Calculator,
      title: { en: "Cost calculator", zh: "费用计算器" },
      text: { en: "Tuition + rent + living costs for your whole degree.", zh: "学费 + 房租 + 生活费，算出整个学位的总花费。" },
    },
    {
      tab: "apply",
      icon: CalendarClock,
      title: { en: "UCAS timeline & tests", zh: "UCAS 时间线与考试" },
      text: { en: "Key 2027-entry dates, admissions tests and the new personal statement.", zh: "2027 入学关键日期、入学考试和新版个人陈述。" },
    },
    {
      tab: "international",
      icon: Plane,
      title: { en: "International students", zh: "国际学生" },
      text: { en: "Visa costs, proof of funds and the Graduate Route.", zh: "签证费用、资金证明和毕业工签。" },
    },
    {
      tab: "school",
      icon: School,
      title: { en: "Sixth form choices", zh: "高中选课" },
      text: { en: "A-levels, IB and other routes — and choosing subjects that keep doors open.", zh: "A-Level、IB 等路线，以及怎样选课才不限制以后的专业。" },
    },
  ];

  return (
    <div className="space-y-10">
      <section className="rounded-3xl bg-gradient-to-br from-blue-50 via-white to-violet-50 px-6 py-10 sm:px-10 sm:py-14">
        <h1 className="max-w-3xl text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          {t({ en: "Plan your route to a UK university", zh: "规划你的英国大学之路" })}
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-600">
          {t({
            en: "A free, independent guide for sixth-formers in the UK and international students: universities, fees, costs and deadlines — with sources for every number.",
            zh: "一个免费、独立的升学指南，面向英国本地高中生和国际学生：大学、学费、生活成本和截止日期，每个数字都附有来源。",
          })}
        </p>
        {next && (
          <button
            onClick={() => go("apply")}
            className="mt-8 flex min-h-[44px] w-full max-w-xl items-center gap-4 rounded-2xl border border-blue-200 bg-white p-4 text-left shadow-sm transition hover:border-blue-400 sm:w-auto"
          >
            <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-xl bg-blue-600 text-white">
              <span className="text-xl font-bold leading-none">{days}</span>
              <span className="text-[10px] uppercase">{t({ en: "days", zh: "天" })}</span>
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wide text-blue-700">{t({ en: "Next key date", zh: "下一个关键日期" })}</div>
              <div className="font-semibold text-slate-900">{t(next.label)}</div>
              <div className="text-sm text-slate-500">
                {new Date(next.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
              </div>
            </div>
          </button>
        )}
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        <Card>
          <div className="text-sm text-slate-500">{t({ en: "Home fee cap (England) 2026/27", zh: "英格兰本地生学费上限 2026/27" })}</div>
          <div className="mt-1 text-3xl font-bold text-slate-900">{gbp(HOME_FEE.england2627)}</div>
          <div className="mt-1 text-sm text-slate-500">
            {t({ en: `Rising to ${gbp(HOME_FEE.england2728)} in 2027/28`, zh: `2027/28 涨到 ${gbp(HOME_FEE.england2728)}` })}
          </div>
        </Card>
        <Card>
          <div className="text-sm text-slate-500">{t({ en: "Scottish students at Scottish universities", zh: "苏格兰学生读苏格兰大学" })}</div>
          <div className="mt-1 text-3xl font-bold text-slate-900">£0</div>
          <div className="mt-1 text-sm text-slate-500">{t({ en: "Tuition paid by SAAS", zh: "学费由 SAAS 支付" })}</div>
        </Card>
        <Card>
          <div className="text-sm text-slate-500">{t({ en: "International fees (examples, 2026/27)", zh: "国际生学费（举例，2026/27）" })}</div>
          <div className="mt-1 text-3xl font-bold text-slate-900">£28k–£70k</div>
          <div className="mt-1 text-sm text-slate-500">{t({ en: "Per year — depends heavily on course", zh: "每年，差别主要看专业" })}</div>
        </Card>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tiles.map(({ tab, icon: Icon, title, text }) => (
          <button
            key={tab}
            onClick={() => go(tab)}
            className="group rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:border-blue-300 hover:shadow"
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
