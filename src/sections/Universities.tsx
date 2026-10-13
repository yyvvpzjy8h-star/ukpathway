import { useMemo, useState, type ReactNode } from "react";
import { Check, Plus, Search, X } from "lucide-react";
import { useLang, type L } from "../i18n";
import { COURSES, courseById, type CourseId } from "../data/courses";
import { TAGS, UNIVERSITIES, type Tag, type University } from "../data/universities";
import { offers } from "../lib/recommend";
import { Callout, Card, Pill, Select, ToggleChip, UniPhoto } from "../components/ui";
import { COST_LABEL, homeFeeText, intlFeeText, offerRange } from "../components/UniDetail";

type Where = "all" | "london" | "england" | "scotland" | "wales_ni";
type Sort = "qs" | "name" | "cost";

const VIBES: Tag[] = ["campus", "city", "collegiate", "sporty", "nightlife", "quiet", "affordable", "careers", "international", "seaside"];

export default function Universities({ openUni }: { openUni: (id: string) => void }) {
  const { t } = useLang();
  const [q, setQ] = useState("");
  const [where, setWhere] = useState<Where>("all");
  const [vibes, setVibes] = useState<Tag[]>([]);
  const [course, setCourse] = useState<CourseId | "any">("any");
  const [sort, setSort] = useState<Sort>("qs");
  const [compare, setCompare] = useState<string[]>([]);

  const list = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return UNIVERSITIES.filter((u) => {
      if (where === "london" && !u.london) return false;
      if (where === "england" && (u.london || u.nation !== "England")) return false;
      if (where === "scotland" && u.nation !== "Scotland") return false;
      if (where === "wales_ni" && u.nation !== "Wales" && u.nation !== "Northern Ireland") return false;
      if (vibes.some((v) => !u.tags.includes(v))) return false;
      if (course !== "any" && !offers(u, courseById(course))) return false;
      if (!needle) return true;
      return [u.name, u.zhName, u.strengths.en, u.strengths.zh, u.city.en, u.city.zh].some((s) => s.toLowerCase().includes(needle));
    }).sort((a, b) => {
      if (sort === "name") return a.name.localeCompare(b.name);
      if (sort === "cost") return a.costTier - b.costTier || (a.qs2027 ?? 999) - (b.qs2027 ?? 999);
      return (a.qs2027 ?? 999) - (b.qs2027 ?? 999);
    });
  }, [q, where, vibes, course, sort]);

  const toggleCompare = (id: string) => setCompare((c) => (c.includes(id) ? c.filter((x) => x !== id) : c.length < 3 ? [...c, id] : c));
  const compared = UNIVERSITIES.filter((u) => compare.includes(u.id));

  const whereOpts: { v: Where; l: L }[] = [
    { v: "all", l: { en: "All", zh: "全部" } },
    { v: "london", l: { en: "London", zh: "伦敦" } },
    { v: "england", l: { en: "Rest of England", zh: "英格兰其他地区" } },
    { v: "scotland", l: { en: "Scotland", zh: "苏格兰" } },
    { v: "wales_ni", l: { en: "Wales / NI", zh: "威尔士 / 北爱" } },
  ];

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">{t({ en: "Universities", zh: "大学" })}</h2>
        <p className="mt-2 max-w-3xl text-slate-600">
          {t({
            en: `${UNIVERSITIES.length} universities with photos, who they suit, typical offers and costs. Rankings measure research and reputation — the right course and the right vibe matter more.`,
            zh: `${UNIVERSITIES.length} 所大学：实景照片、适合人群、常见录取要求和费用。排名主要反映科研和声誉，选对专业和氛围更重要。`,
          })}
        </p>
      </div>

      <Card className="mb-5 space-y-3">
        <div className="flex flex-col gap-3 lg:flex-row">
          <label className="relative flex-1">
            <span className="sr-only">{t({ en: "Search", zh: "搜索" })}</span>
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t({ en: "Search by name, city or subject…", zh: "按校名、城市或专业搜索…" })}
              className="min-h-[44px] w-full rounded-xl border border-slate-300 bg-white pl-10 pr-3 text-base outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </label>
          <Select
            label={t({ en: "Course", zh: "专业" })}
            value={course}
            onChange={setCourse}
            options={[{ value: "any" as const, label: t({ en: "Any course", zh: "所有专业" }) }, ...COURSES.map((c) => ({ value: c.id, label: t(c.name) }))]}
          />
          <Select
            label={t({ en: "Sort", zh: "排序" })}
            value={sort}
            onChange={setSort}
            options={[
              { value: "qs" as const, label: t({ en: "Sort: QS 2027", zh: "排序：QS 2027" }) },
              { value: "cost" as const, label: t({ en: "Sort: living costs", zh: "排序：生活成本" }) },
              { value: "name" as const, label: t({ en: "Sort: A–Z", zh: "排序：校名" }) },
            ]}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {whereOpts.map((o) => (
            <ToggleChip key={o.v} on={where === o.v} onClick={() => setWhere(o.v)}>
              {t(o.l)}
            </ToggleChip>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {VIBES.map((v) => (
            <ToggleChip key={v} on={vibes.includes(v)} onClick={() => setVibes((x) => (x.includes(v) ? x.filter((y) => y !== v) : [...x, v]))}>
              {t(TAGS[v])}
            </ToggleChip>
          ))}
        </div>
      </Card>

      {compared.length > 0 ? (
        <CompareTable unis={compared} onRemove={toggleCompare} />
      ) : (
        <p className="mb-4 text-sm text-slate-500">{t({ en: "Tip: tap “Compare” on up to 3 universities to see them side by side.", zh: "提示：最多可选 3 所大学点“对比”，并排查看。" })}</p>
      )}

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((u) => {
          const inCompare = compare.includes(u.id);
          return (
            <article key={u.id} className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
              <button type="button" onClick={() => openUni(u.id)} className="relative block text-left" aria-label={u.name}>
                <UniPhoto photo={u.photo} alt="" width={640} className="h-44 w-full" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent" />
                <div className="absolute bottom-0 left-0 p-4 text-white">
                  <div className="text-lg font-bold leading-tight">{u.name}</div>
                  <div className="text-sm text-white/85">
                    {u.zhName} · {t(u.city)}
                  </div>
                </div>
                {u.qs2027 && <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-bold text-slate-800">QS #{u.qs2027}</span>}
              </button>
              <div className="flex flex-1 flex-col p-4">
                <p className="text-sm text-slate-700">{t(u.tagline)}</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {u.tags.slice(0, 4).map((tag) => (
                    <Pill key={tag}>{t(TAGS[tag])}</Pill>
                  ))}
                </div>
                <div className="mt-3 rounded-xl bg-emerald-50 p-3 text-sm text-emerald-900">
                  <b>{t({ en: "Great for: ", zh: "适合：" })}</b>
                  {t(u.bestFor[0])}
                </div>
                <dl className="mt-3 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <dt className="text-slate-500">{t({ en: "Typical offers", zh: "常见要求" })}</dt>
                    <dd className="font-semibold text-slate-800">{offerRange(u)}</dd>
                  </div>
                  <div>
                    <dt className="text-slate-500">{t({ en: "Living costs", zh: "生活成本" })}</dt>
                    <dd className="font-semibold text-slate-800">{t(COST_LABEL[u.costTier])}</dd>
                  </div>
                </dl>
                <div className="mt-auto flex gap-2 pt-4">
                  <button
                    type="button"
                    onClick={() => openUni(u.id)}
                    className="min-h-[44px] flex-1 rounded-xl bg-blue-600 px-3 text-sm font-medium text-white hover:bg-blue-700"
                  >
                    {t({ en: "Details", zh: "详情" })}
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleCompare(u.id)}
                    disabled={!inCompare && compare.length >= 3}
                    aria-pressed={inCompare}
                    className={`flex min-h-[44px] flex-1 items-center justify-center gap-1 rounded-xl px-3 text-sm font-medium transition disabled:opacity-40 ${
                      inCompare ? "bg-violet-600 text-white" : "border border-slate-300 bg-white text-slate-700 hover:border-violet-400"
                    }`}
                  >
                    {inCompare ? <Check size={16} /> : <Plus size={16} />} {t({ en: "Compare", zh: "对比" })}
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
      {list.length === 0 && <p className="text-slate-500">{t({ en: "No universities match all these filters.", zh: "没有同时满足这些条件的大学。" })}</p>}

      <div className="mt-6">
        <Callout tone="amber">
          {t({
            en: "“Who it suits” and the vibe tags are our editorial view to help you shortlist — visit open days and talk to current students before deciding. Typical offers are ranges across courses; always check the exact course page.",
            zh: "“适合人群”和氛围标签是我们的编辑观点，帮助你初步筛选。做决定前请参加开放日、和在读学生聊聊。录取要求是不同专业的大致范围，请以具体专业页面为准。",
          })}
        </Callout>
      </div>
    </div>
  );
}

function CompareTable({ unis, onRemove }: { unis: University[]; onRemove: (id: string) => void }) {
  const { t } = useLang();
  const rows: { label: L; render: (u: University) => ReactNode }[] = [
    { label: { en: "QS 2027", zh: "QS 2027" }, render: (u) => (u.qs2027 ? `#${u.qs2027}` : t({ en: "Not confirmed", zh: "未确认" })) },
    { label: { en: "Location", zh: "地点" }, render: (u) => t(u.city) },
    { label: { en: "Vibe", zh: "氛围" }, render: (u) => u.tags.map((x) => t(TAGS[x])).join(" · ") },
    {
      label: { en: "Who it suits", zh: "适合人群" },
      render: (u) => (
        <ul className="list-disc space-y-1 pl-4">
          {u.bestFor.map((b) => (
            <li key={b.en}>{t(b)}</li>
          ))}
        </ul>
      ),
    },
    {
      label: { en: "Maybe not if…", zh: "可能不适合" },
      render: (u) => (
        <ul className="list-disc space-y-1 pl-4">
          {u.notFor.map((b) => (
            <li key={b.en}>{t(b)}</li>
          ))}
        </ul>
      ),
    },
    { label: { en: "Known for", zh: "优势学科" }, render: (u) => t(u.strengths) },
    { label: { en: "Typical offers", zh: "常见要求" }, render: (u) => offerRange(u) },
    { label: { en: "Admissions tests", zh: "入学考试" }, render: (u) => t(u.tests) },
    { label: { en: "Home fee / yr", zh: "本地生学费/年" }, render: (u) => homeFeeText(u, t) },
    { label: { en: "International fee / yr", zh: "国际生学费/年" }, render: (u) => intlFeeText(u, t) },
    { label: { en: "Living costs", zh: "生活成本" }, render: (u) => t(COST_LABEL[u.costTier]) },
    { label: { en: "Degree length", zh: "学制" }, render: (u) => t({ en: `${u.degreeYears} years`, zh: `${u.degreeYears} 年` }) },
    {
      label: { en: "Medicine / Law / Engineering", zh: "医学 / 法学 / 工程" },
      render: (u) =>
        (["medicine", "law", "engineering"] as CourseId[]).map((c) => `${t(courseById(c).name)} ${offers(u, courseById(c)) ? "✓" : "✗"}`).join(" · "),
    },
  ];
  return (
    <Card className="mb-6 overflow-x-auto !p-0">
      <table className="w-full min-w-[720px] text-left text-sm">
        <thead>
          <tr className="border-b border-slate-200 bg-violet-50">
            <th className="w-36 p-3 font-semibold text-slate-600">{t({ en: "Compare", zh: "对比" })}</th>
            {unis.map((u) => (
              <th key={u.id} className="p-3 align-top">
                <UniPhoto photo={u.photo} alt="" width={400} className="mb-2 h-24 w-full rounded-lg" />
                <div className="flex items-start justify-between gap-2">
                  <span className="font-semibold text-slate-900">
                    {u.name}
                    <br />
                    <span className="font-normal text-slate-500">{u.zhName}</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => onRemove(u.id)}
                    aria-label={t({ en: "Remove", zh: "移除" })}
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-slate-500 hover:bg-white"
                  >
                    <X size={16} />
                  </button>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.label.en} className="border-b border-slate-100 last:border-0">
              <th className="p-3 align-top font-medium text-slate-600">{t(r.label)}</th>
              {unis.map((u) => (
                <td key={u.id} className="p-3 align-top text-slate-800">
                  {r.render(u)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
