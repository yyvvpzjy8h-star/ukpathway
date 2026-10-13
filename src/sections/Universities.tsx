import { useMemo, useState } from "react";
import { Check, ChevronDown, Plus, Search, X } from "lucide-react";
import { gbp, useLang, type L } from "../i18n";
import { UNIVERSITIES, homeFeeFor, type University } from "../data/universities";
import { Callout, Card, ExtLink, FeeStatusPill, Pill, SectionTitle } from "../components/ui";

type Where = "all" | "london" | "england" | "scotland";
type Sort = "qs" | "fee" | "name";

export function intlFeeText(u: University, t: (s: L) => string) {
  const { from, to } = u.intlFee;
  if (from && to) return `${gbp(from)} – ${gbp(to)}`;
  if (from) return t({ en: `from ${gbp(from)}`, zh: `${gbp(from)} 起` });
  return t({ en: "See official site", zh: "见官网" });
}

function homeFeeText(u: University, t: (s: L) => string) {
  if (u.nation === "Scotland")
    return t({ en: "£0 (Scottish) · £9,535 (rest of UK)", zh: "£0（苏格兰学生）· £9,535（英国其他地区）" });
  return gbp(homeFeeFor(u, false));
}

export default function Universities() {
  const { t } = useLang();
  const [q, setQ] = useState("");
  const [where, setWhere] = useState<Where>("all");
  const [sort, setSort] = useState<Sort>("qs");
  const [open, setOpen] = useState<string | null>(null);
  const [compare, setCompare] = useState<string[]>([]);

  const list = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return UNIVERSITIES.filter((u) => {
      if (where === "london" && !u.london) return false;
      if (where === "england" && (u.london || u.nation !== "England")) return false;
      if (where === "scotland" && u.nation !== "Scotland") return false;
      if (!needle) return true;
      return [u.name, u.zhName, u.strengths.en, u.strengths.zh, u.city.en].some((s) => s.toLowerCase().includes(needle));
    }).sort((a, b) => {
      if (sort === "name") return a.name.localeCompare(b.name);
      if (sort === "fee") return (a.intlFee.from ?? a.calcIntlDefault) - (b.intlFee.from ?? b.calcIntlDefault);
      return (a.qs2027 ?? 999) - (b.qs2027 ?? 999);
    });
  }, [q, where, sort]);

  const toggleCompare = (id: string) =>
    setCompare((c) => (c.includes(id) ? c.filter((x) => x !== id) : c.length < 3 ? [...c, id] : c));

  const whereOpts: { v: Where; l: L }[] = [
    { v: "all", l: { en: "All", zh: "全部" } },
    { v: "london", l: { en: "London", zh: "伦敦" } },
    { v: "england", l: { en: "Rest of England", zh: "英格兰其他地区" } },
    { v: "scotland", l: { en: "Scotland", zh: "苏格兰" } },
  ];

  const compared = UNIVERSITIES.filter((u) => compare.includes(u.id));

  return (
    <div>
      <SectionTitle
        title={t({ en: "Universities", zh: "大学" })}
        subtitle={t({
          en: "A starting shortlist, not a league table. Rankings measure research and reputation — the right course matters more than the overall rank.",
          zh: "这是一份入门参考名单，不是排行榜。综合排名主要反映科研和声誉，选对专业比综合排名更重要。",
        })}
      />

      <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center">
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
        <div className="flex flex-wrap gap-2">
          {whereOpts.map((o) => (
            <button
              key={o.v}
              onClick={() => setWhere(o.v)}
              className={`min-h-[44px] rounded-xl px-4 text-sm font-medium transition ${
                where === o.v ? "bg-blue-600 text-white" : "border border-slate-300 bg-white text-slate-700 hover:border-blue-400"
              }`}
            >
              {t(o.l)}
            </button>
          ))}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            aria-label={t({ en: "Sort", zh: "排序" })}
            className="min-h-[44px] rounded-xl border border-slate-300 bg-white px-3 text-sm"
          >
            <option value="qs">{t({ en: "Sort: QS 2027 rank", zh: "排序：QS 2027 排名" })}</option>
            <option value="fee">{t({ en: "Sort: international fee", zh: "排序：国际生学费" })}</option>
            <option value="name">{t({ en: "Sort: A–Z", zh: "排序：校名" })}</option>
          </select>
        </div>
      </div>

      <p className="mb-4 text-sm text-slate-500">
        {t({ en: "Tap “Compare” on up to 3 universities to see them side by side.", zh: "最多可选 3 所大学点“对比”，并排查看。" })}
      </p>

      {compared.length > 0 && <CompareTable unis={compared} onRemove={toggleCompare} />}

      <div className="grid gap-4">
        {list.map((u) => {
          const isOpen = open === u.id;
          const inCompare = compare.includes(u.id);
          return (
            <Card key={u.id} className="!p-0">
              <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-start">
                <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-xl bg-slate-900 text-white">
                  <span className="text-[10px] uppercase opacity-70">QS</span>
                  <span className="text-lg font-bold leading-none">{u.qs2027 ?? "–"}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg font-semibold text-slate-900">
                    {u.name} <span className="font-normal text-slate-500">{u.zhName}</span>
                  </h3>
                  <div className="mt-1 flex flex-wrap gap-2">
                    <Pill tone="blue">{t(u.city)}</Pill>
                    <Pill>{t(u.setting)}</Pill>
                    {u.qsNote && <Pill tone="violet">{t(u.qsNote)}</Pill>}
                  </div>
                  <dl className="mt-3 grid gap-x-6 gap-y-2 text-sm sm:grid-cols-3">
                    <div>
                      <dt className="text-slate-500">{t({ en: "Typical A-level offers", zh: "常见 A-Level 要求" })}</dt>
                      <dd className="font-medium">{u.typicalOffer}</dd>
                    </div>
                    <div>
                      <dt className="text-slate-500">{t({ en: "Home fee / yr", zh: "本地生学费/年" })}</dt>
                      <dd className="font-medium">{homeFeeText(u, t)}</dd>
                    </div>
                    <div>
                      <dt className="text-slate-500">{t({ en: "International fee / yr", zh: "国际生学费/年" })}</dt>
                      <dd className="flex flex-wrap items-center gap-2 font-medium">
                        {intlFeeText(u, t)} <FeeStatusPill status={u.intlFee.status} />
                      </dd>
                    </div>
                  </dl>
                </div>
                <div className="flex gap-2 sm:flex-col">
                  <button
                    onClick={() => toggleCompare(u.id)}
                    disabled={!inCompare && compare.length >= 3}
                    className={`flex min-h-[44px] flex-1 items-center justify-center gap-1 rounded-xl px-4 text-sm font-medium transition disabled:opacity-40 ${
                      inCompare ? "bg-violet-600 text-white" : "border border-slate-300 bg-white text-slate-700 hover:border-violet-400"
                    }`}
                  >
                    {inCompare ? <Check size={16} /> : <Plus size={16} />} {t({ en: "Compare", zh: "对比" })}
                  </button>
                  <button
                    onClick={() => setOpen(isOpen ? null : u.id)}
                    aria-expanded={isOpen}
                    className="flex min-h-[44px] flex-1 items-center justify-center gap-1 rounded-xl border border-slate-300 bg-white px-4 text-sm font-medium text-slate-700 hover:border-blue-400"
                  >
                    {t({ en: "Details", zh: "详情" })}
                    <ChevronDown size={16} className={`transition ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                </div>
              </div>
              {isOpen && (
                <div className="grid gap-5 border-t border-slate-100 bg-slate-50/60 p-5 text-sm md:grid-cols-2">
                  <div className="space-y-3">
                    <Detail label={t({ en: "Known for", zh: "优势学科" })} value={t(u.strengths)} />
                    <Detail label={t({ en: "Admissions tests", zh: "入学考试" })} value={t(u.tests)} />
                    <Detail
                      label={t({ en: "Usual degree length", zh: "本科学制" })}
                      value={t({ en: `${u.degreeYears} years (longer for integrated masters / medicine)`, zh: `${u.degreeYears} 年（本硕连读和医学更长）` })}
                    />
                    {u.intlFee.note && <Detail label={t({ en: "Fee note", zh: "学费说明" })} value={t(u.intlFee.note)} />}
                  </div>
                  <div className="space-y-3">
                    <ProsCons title={t({ en: "Good to know", zh: "优点" })} items={u.pros.map(t)} tone="good" />
                    <ProsCons title={t({ en: "Think about", zh: "需要考虑" })} items={u.cons.map(t)} tone="warn" />
                    <div className="flex flex-wrap gap-x-5">
                      <ExtLink href={u.website}>{t({ en: "Undergraduate site", zh: "本科官网" })}</ExtLink>
                      <ExtLink href={u.feesUrl}>{t({ en: "Official fees", zh: "官方学费" })}</ExtLink>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          );
        })}
        {list.length === 0 && <p className="text-slate-500">{t({ en: "No matches.", zh: "没有匹配结果。" })}</p>}
      </div>

      <div className="mt-6">
        <Callout tone="amber">
          {t({
            en: "Typical offers are ranges across courses — always check the exact offer and required subjects on the course page. For graduate salaries by course, use Discover Uni rather than university-wide averages.",
            zh: "录取要求是不同专业的大致范围，具体要求和必修科目请以专业页面为准。毕业薪资请用 Discover Uni 按专业查询，不要看全校平均值。",
          })}
        </Callout>
      </div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="font-semibold text-slate-700">{label}</div>
      <div className="text-slate-600">{value}</div>
    </div>
  );
}

function ProsCons({ title, items, tone }: { title: string; items: string[]; tone: "good" | "warn" }) {
  return (
    <div>
      <div className="font-semibold text-slate-700">{title}</div>
      <ul className="mt-1 space-y-1">
        {items.map((i) => (
          <li key={i} className="flex gap-2 text-slate-600">
            <span className={tone === "good" ? "text-emerald-600" : "text-amber-600"}>{tone === "good" ? "+" : "–"}</span>
            {i}
          </li>
        ))}
      </ul>
    </div>
  );
}

function CompareTable({ unis, onRemove }: { unis: University[]; onRemove: (id: string) => void }) {
  const { t } = useLang();
  const rows: { label: L; get: (u: University) => string }[] = [
    { label: { en: "QS 2027", zh: "QS 2027" }, get: (u) => (u.qs2027 ? `#${u.qs2027}` : "–") },
    { label: { en: "Location", zh: "地点" }, get: (u) => t(u.city) },
    { label: { en: "Typical offers", zh: "常见要求" }, get: (u) => u.typicalOffer },
    { label: { en: "Home fee / yr", zh: "本地生学费/年" }, get: (u) => homeFeeText(u, t) },
    { label: { en: "International fee / yr", zh: "国际生学费/年" }, get: (u) => intlFeeText(u, t) },
    { label: { en: "Degree length", zh: "学制" }, get: (u) => t({ en: `${u.degreeYears} years`, zh: `${u.degreeYears} 年` }) },
    { label: { en: "Tests", zh: "入学考试" }, get: (u) => t(u.tests) },
    { label: { en: "Known for", zh: "优势学科" }, get: (u) => t(u.strengths) },
  ];
  return (
    <Card className="mb-6 overflow-x-auto !p-0">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead>
          <tr className="border-b border-slate-200 bg-violet-50">
            <th className="p-3 font-semibold text-slate-600">{t({ en: "Compare", zh: "对比" })}</th>
            {unis.map((u) => (
              <th key={u.id} className="p-3 align-top">
                <div className="flex items-start justify-between gap-2">
                  <span className="font-semibold text-slate-900">
                    {u.name}
                    <br />
                    <span className="font-normal text-slate-500">{u.zhName}</span>
                  </span>
                  <button
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
              <th className="w-40 p-3 align-top font-medium text-slate-600">{t(r.label)}</th>
              {unis.map((u) => (
                <td key={u.id} className="p-3 align-top text-slate-800">
                  {r.get(u)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
