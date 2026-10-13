import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ExternalLink, Search } from "lucide-react";
import { gbp, useLang } from "../i18n";
import { COURSES, GROUPS, courseById, matchesCourse, type CourseGroup, type CourseId } from "../data/courses";
import { careerById } from "../data/careers";
import { subjectName } from "../data/subjects";
import { UNIVERSITIES } from "../data/universities";
import { EXAMPLE_DEGREES, ucasSearchUrl } from "../data/availability";
import { LIVING_BY_TIER, offerFor, offers, scoreToGrades } from "../lib/recommend";
import { Callout, Card, ExtLink, Pill, Select, ToggleChip, UniPhoto } from "../components/ui";
import { homeFeeText, intlFeeText } from "../components/UniDetail";

export default function Courses({ openUni, focus }: { openUni: (id: string) => void; focus: CourseId | null }) {
  const { t } = useLang();
  const [group, setGroup] = useState<CourseGroup | "all">("all");
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState<CourseId | null>(focus);
  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => setSelected(focus), [focus]);
  useEffect(() => {
    if (selected) topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [selected]);

  const list = useMemo(() => COURSES.filter((c) => (group === "all" || c.group === group) && matchesCourse(c, q)), [group, q]);

  if (selected) return <CourseCompare id={selected} onBack={() => setSelected(null)} openUni={openUni} refEl={topRef} />;

  return (
    <div ref={topRef}>
      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">{t({ en: "Courses", zh: "专业" })}</h2>
        <p className="mt-2 max-w-3xl text-slate-600">
          {t({
            en: `${COURSES.length} subject areas — from Medicine to Planning & Real Estate, Actuarial Science or Marine Biology. Tap one to compare every university on our list that teaches it.`,
            zh: `${COURSES.length} 个专业方向，从医学到城市规划与房地产、精算、海洋生物都有。点开任意专业，就能对比本站所有开设它的大学。`,
          })}
        </p>
      </div>

      <Card className="mb-5 space-y-3">
        <label className="relative block">
          <span className="sr-only">{t({ en: "Search courses", zh: "搜索专业" })}</span>
          <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t({ en: "Search, e.g. real estate, aerospace, physio, Chinese…", zh: "搜索，例如 real estate、航空、物理治疗、中文…" })}
            className="min-h-[44px] w-full rounded-xl border border-slate-300 bg-white pl-10 pr-3 text-base outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </label>
        <div className="flex flex-wrap gap-2">
          {GROUPS.map((g) => (
            <ToggleChip key={g.id} on={group === g.id} onClick={() => setGroup(g.id)}>
              {t(g.label)}
            </ToggleChip>
          ))}
        </div>
      </Card>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((c) => {
          const count = UNIVERSITIES.filter((u) => offers(u, c)).length;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => setSelected(c.id)}
              className="flex flex-col rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:border-blue-400 hover:shadow"
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold text-slate-900">{t(c.name)}</h3>
                <span className="shrink-0 rounded-full bg-blue-50 px-2 py-0.5 text-xs font-semibold text-blue-700">
                  {t({ en: `${count} unis`, zh: `${count} 所` })}
                </span>
              </div>
              <p className="mt-1 text-sm text-slate-600">{t(c.blurb)}</p>
              <div className="mt-auto flex flex-wrap gap-1.5 pt-3">
                {c.reqs.length === 0 ? (
                  <Pill tone="green">{t({ en: "No set A-levels", zh: "无指定 A-Level" })}</Pill>
                ) : (
                  c.reqs.map((r, i) => (
                    <Pill key={i} tone={r.strictness === "required" ? "blue" : "violet"}>
                      {t(r.label)}
                    </Pill>
                  ))
                )}
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-6">
        <Callout>
          {list.length === 0 ? t({ en: "Nothing on our list matches that. ", zh: "本站没有匹配的专业。" }) : t({ en: "Can't see your exact course? ", zh: "没找到你想要的具体课程？" })}
          <a href={ucasSearchUrl(q || "")} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-semibold underline">
            {t({ en: `Search all UK courses on UCAS${q ? ` for “${q}”` : ""}`, zh: `在 UCAS 搜索全英国课程${q ? `：“${q}”` : ""}` })} <ExternalLink size={14} />
          </a>
        </Callout>
      </div>
    </div>
  );
}

type Sort = "qs" | "offer" | "cost";

function CourseCompare({ id, onBack, openUni, refEl }: { id: CourseId; onBack: () => void; openUni: (id: string) => void; refEl: React.RefObject<HTMLDivElement | null> }) {
  const { t } = useLang();
  const c = courseById(id);
  const [sort, setSort] = useState<Sort>("qs");
  const rows = useMemo(
    () =>
      UNIVERSITIES.filter((u) => offers(u, c))
        .map((u) => ({ u, offer: offerFor(u, c) }))
        .sort((a, b) =>
          sort === "offer"
            ? b.offer - a.offer || (a.u.qs2027 ?? 999) - (b.u.qs2027 ?? 999)
            : sort === "cost"
              ? LIVING_BY_TIER[a.u.costTier] - LIVING_BY_TIER[b.u.costTier]
              : (a.u.qs2027 ?? 999) - (b.u.qs2027 ?? 999),
        ),
    [c, sort],
  );
  const examples = EXAMPLE_DEGREES.filter((e) => e.course === id);
  const searchTerm = c.id === "planning" ? "planning real estate" : c.name.en;

  return (
    <div ref={refEl} className="scroll-mt-32 space-y-6">
      <button type="button" onClick={onBack} className="flex min-h-[44px] items-center gap-2 font-medium text-blue-700 hover:underline">
        <ArrowLeft size={18} /> {t({ en: "All courses", zh: "全部专业" })}
      </button>

      <div className="rounded-3xl bg-gradient-to-br from-blue-50 via-white to-violet-50 p-6 sm:p-8">
        <h2 className="text-3xl font-bold text-slate-900">{t(c.name)}</h2>
        <p className="mt-2 max-w-3xl text-slate-700">{t(c.blurb)}</p>
        <div className="mt-4 grid gap-4 text-sm md:grid-cols-2">
          <div>
            <div className="font-semibold text-slate-800">{t({ en: "Subject requirements", zh: "科目要求" })}</div>
            {c.reqs.length === 0 ? (
              <p className="text-slate-600">{t({ en: "No specific A-levels required.", zh: "没有指定的 A-Level 科目要求。" })}</p>
            ) : (
              <ul className="mt-1 space-y-1">
                {c.reqs.map((r, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Pill tone={r.strictness === "required" ? "blue" : "violet"}>
                      {r.strictness === "required" ? t({ en: "Required", zh: "必需" }) : t({ en: "Usually", zh: "通常要求" })}
                    </Pill>
                    {t(r.label)}
                  </li>
                ))}
              </ul>
            )}
            {c.helpful.length > 0 && (
              <p className="mt-2 text-slate-600">
                <b>{t({ en: "Helpful: ", zh: "有帮助：" })}</b>
                {c.helpful.slice(0, 6).map((s) => t(subjectName(s))).join(", ")}
              </p>
            )}
          </div>
          <div className="space-y-2 text-slate-700">
            {c.tests && (
              <p>
                <b>{t({ en: "Tests: ", zh: "考试：" })}</b>
                {t(c.tests)}
              </p>
            )}
            {c.extra && <p>{t(c.extra)}</p>}
            <p>
              <b>{t({ en: "Suits: ", zh: "适合：" })}</b>
              {t(c.suits)}
            </p>
            <div className="flex flex-wrap items-center gap-1.5">
              <b>{t({ en: "Careers: ", zh: "职业：" })}</b>
              {c.careers.map((k) => {
                const career = careerById(k);
                return career ? (
                  <Pill key={k} tone="violet">
                    {t(career.name)}
                  </Pill>
                ) : null;
              })}
            </div>
          </div>
        </div>
      </div>

      {examples.length > 0 && (
        <Card>
          <h3 className="font-semibold text-slate-900">{t({ en: "Example degrees (checked)", zh: "具体学位示例（已核实）" })}</h3>
          <ul className="mt-2 space-y-1">
            {examples.map((e) => (
              <li key={e.url} className="text-sm">
                <b>{UNIVERSITIES.find((u) => u.id === e.uni)?.name}:</b> <ExtLink href={e.url}>{e.title}</ExtLink>
              </li>
            ))}
          </ul>
        </Card>
      )}

      <div>
        <div className="mb-3 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h3 className="text-xl font-bold text-slate-900">{t({ en: `Compare ${rows.length} universities`, zh: `对比 ${rows.length} 所大学` })}</h3>
            <p className="text-sm text-slate-500">{t({ en: "Tap a university for full details.", zh: "点击学校查看完整详情。" })}</p>
          </div>
          <Select
            label={t({ en: "Sort", zh: "排序" })}
            value={sort}
            onChange={setSort}
            options={[
              { value: "qs" as const, label: t({ en: "Sort: QS 2027", zh: "排序：QS 2027" }) },
              { value: "offer" as const, label: t({ en: "Sort: highest offer", zh: "排序：录取要求从高到低" }) },
              { value: "cost" as const, label: t({ en: "Sort: living costs", zh: "排序：生活成本" }) },
            ]}
          />
        </div>
        <Card className="overflow-x-auto !p-0">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 text-slate-600">
              <tr>
                <th className="p-3">{t({ en: "University", zh: "大学" })}</th>
                <th className="p-3">QS 2027</th>
                <th className="p-3">{t({ en: "Typical offer (est.)", zh: "常见要求（估算）" })}</th>
                <th className="p-3">{t({ en: "Living / yr (est.)", zh: "生活费/年（估算）" })}</th>
                <th className="p-3">{t({ en: "Home fee", zh: "本地生学费" })}</th>
                <th className="p-3">{t({ en: "International fee", zh: "国际生学费" })}</th>
                <th className="p-3">{t({ en: "Exact courses", zh: "具体课程" })}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(({ u, offer }) => (
                <tr key={u.id} className="border-b border-slate-100 last:border-0">
                  <td className="p-3">
                    <button type="button" onClick={() => openUni(u.id)} className="flex min-h-[44px] items-center gap-3 text-left hover:text-blue-700">
                      <UniPhoto photo={u.photo} alt="" width={120} className="h-10 w-12 shrink-0 rounded-md" />
                      <span>
                        <span className="font-semibold">{u.name}</span>
                        <span className="block text-xs text-slate-500">
                          {u.zhName} · {t(u.city)}
                        </span>
                      </span>
                    </button>
                  </td>
                  <td className="p-3">{u.qs2027 ? `#${u.qs2027}` : "—"}</td>
                  <td className="p-3 font-semibold">{scoreToGrades(offer)}</td>
                  <td className="p-3">{gbp(LIVING_BY_TIER[u.costTier])}</td>
                  <td className="p-3">{homeFeeText(u, t)}</td>
                  <td className="p-3">{intlFeeText(u, t)}</td>
                  <td className="p-3">
                    <a
                      href={ucasSearchUrl(`${searchTerm} ${u.name}`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[44px] items-center gap-1 font-medium text-blue-700 hover:underline"
                    >
                      UCAS <ExternalLink size={14} />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
        <p className="mt-2 text-xs text-slate-500">
          {t({
            en: "Typical offers are our estimate from each university's usual range for this kind of subject; living costs are rough estimates for rent (44 weeks) plus other costs. Our course list is a guide — use the UCAS links for every current degree.",
            zh: "常见要求是根据各校该类专业的常见范围估算的；生活费是房租（44 周）加其他开销的粗略估计。本站课程列表仅供参考，最新的完整学位请点 UCAS 链接查看。",
          })}
        </p>
      </div>

      <Callout>
        <a href={ucasSearchUrl(searchTerm)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-semibold underline">
          {t({ en: `See every UK university offering ${c.name.en} on UCAS`, zh: `在 UCAS 查看全英国所有开设「${c.name.zh}」的大学` })} <ExternalLink size={14} />
        </a>
      </Callout>
    </div>
  );
}
