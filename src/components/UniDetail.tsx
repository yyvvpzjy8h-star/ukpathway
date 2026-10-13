import { useEffect, useState } from "react";
import { CircleCheck, CircleMinus, ExternalLink, Search, X } from "lucide-react";
import { gbp, useLang, type L } from "../i18n";
import { COURSES, GROUPS, matchesCourse, type CourseId } from "../data/courses";
import { EXAMPLE_DEGREES, ucasSearchUrl } from "../data/availability";
import { TAGS, homeFeeFor, photoPage, uniById, type University } from "../data/universities";
import { offers, scoreToGrades } from "../lib/recommend";
import { ExtLink, FeeStatusPill, Pill, UniPhoto } from "./ui";

export function intlFeeText(u: University, t: (s: L) => string) {
  const { from, to } = u.intlFee;
  if (from && to) return `${gbp(from)} – ${gbp(to)}`;
  if (from) return t({ en: `from ${gbp(from)}`, zh: `${gbp(from)} 起` });
  return t({ en: "See official site", zh: "见官网" });
}

export function homeFeeText(u: University, t: (s: L) => string) {
  if (u.nation === "Scotland") return t({ en: "£0 (Scottish) · £9,535 (rest of UK)", zh: "£0（苏格兰学生）· £9,535（英国其他地区）" });
  const f = homeFeeFor(u, false);
  if (f === null)
    return u.nation === "Wales"
      ? t({ en: "Set by Wales — check official site", zh: "由威尔士政府设定，请查官网" })
      : t({ en: "Set by N. Ireland — check official site", zh: "由北爱尔兰设定，请查官网" });
  return gbp(f);
}

export const COST_LABEL: Record<1 | 2 | 3, L> = {
  1: { en: "Lower", zh: "较低" },
  2: { en: "Medium", zh: "中等" },
  3: { en: "High", zh: "较高" },
};

export function offerRange(u: University) {
  return u.offerMin === u.offerMax ? scoreToGrades(u.offerMax) : `${scoreToGrades(u.offerMax)} – ${scoreToGrades(u.offerMin)}`;
}

export default function UniDetail({ id, onClose, onOpenCourse }: { id: string; onClose: () => void; onOpenCourse: (c: CourseId) => void }) {
  const { t } = useLang();
  const u = uniById(id);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  if (!u) return null;
  const offered = COURSES.filter((c) => offers(u, c));

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/50 sm:items-center sm:p-6" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={u.name}
        className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-3xl bg-white shadow-xl sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <UniPhoto photo={u.photo} alt={u.name} width={1280} className="h-56 w-full sm:h-72" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/10 to-transparent" />
          <button
            type="button"
            onClick={onClose}
            aria-label={t({ en: "Close", zh: "关闭" })}
            className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow hover:bg-white"
          >
            <X size={20} />
          </button>
          <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
            <h2 className="text-2xl font-bold sm:text-3xl">{u.name}</h2>
            <div className="text-white/90">
              {u.zhName} · {t(u.city)}
            </div>
          </div>
        </div>
        {u.photo.caption && (
          <div className="px-5 pt-2 text-xs text-slate-500">
            {t(u.photo.caption)} ·{" "}
            <a href={photoPage(u.photo.file)} target="_blank" rel="noopener noreferrer" className="underline">
              {t({ en: "Photo", zh: "照片" })}: {u.photo.author ?? "Wikimedia Commons"}
              {u.photo.license ? `, ${u.photo.license}` : ""}
            </a>
          </div>
        )}

        <div className="space-y-6 p-5">
          <p className="text-lg text-slate-700">{t(u.tagline)}</p>
          <div className="flex flex-wrap gap-2">
            {u.qs2027 && <Pill tone="blue">QS 2027 #{u.qs2027}</Pill>}
            {u.qsNote && <Pill tone="violet">{t(u.qsNote)}</Pill>}
            {u.russell && <Pill>Russell Group</Pill>}
            {u.tags.map((tag) => (
              <Pill key={tag}>{t(TAGS[tag])}</Pill>
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl bg-emerald-50 p-4">
              <h3 className="font-semibold text-emerald-900">{t({ en: "Who it suits", zh: "适合什么样的人" })}</h3>
              <ul className="mt-2 space-y-2">
                {u.bestFor.map((b) => (
                  <li key={b.en} className="flex gap-2 text-sm text-emerald-900">
                    <CircleCheck size={18} className="mt-0.5 shrink-0" /> {t(b)}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-amber-50 p-4">
              <h3 className="font-semibold text-amber-900">{t({ en: "Maybe not for you if…", zh: "这些情况可能不适合" })}</h3>
              <ul className="mt-2 space-y-2">
                {u.notFor.map((b) => (
                  <li key={b.en} className="flex gap-2 text-sm text-amber-900">
                    <CircleMinus size={18} className="mt-0.5 shrink-0" /> {t(b)}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <dl className="grid gap-4 text-sm sm:grid-cols-2">
            <Fact label={t({ en: "Known for", zh: "优势学科" })} value={t(u.strengths)} />
            <Fact label={t({ en: "Typical A-level offers", zh: "常见 A-Level 要求" })} value={offerRange(u)} />
            <Fact label={t({ en: "Home fee / yr", zh: "本地生学费/年" })} value={homeFeeText(u, t)} />
            <div>
              <dt className="font-semibold text-slate-700">{t({ en: "International fee / yr", zh: "国际生学费/年" })}</dt>
              <dd className="mt-0.5 flex flex-wrap items-center gap-2 text-slate-600">
                {intlFeeText(u, t)} <FeeStatusPill status={u.intlFee.status} />
              </dd>
              {u.intlFee.note && <dd className="mt-1 text-xs text-slate-500">{t(u.intlFee.note)}</dd>}
            </div>
            <Fact label={t({ en: "Living costs", zh: "生活成本" })} value={t(COST_LABEL[u.costTier])} />
            <Fact
              label={t({ en: "Usual degree length", zh: "本科学制" })}
              value={t({ en: `${u.degreeYears} years (longer for integrated masters / medicine)`, zh: `${u.degreeYears} 年（本硕连读和医学更长）` })}
            />
            <div className="sm:col-span-2">
              <Fact label={t({ en: "Admissions tests", zh: "入学考试" })} value={t(u.tests)} />
            </div>
          </dl>

          <CourseList u={u} offered={offered} onOpenCourse={onOpenCourse} />

          <div className="flex flex-wrap gap-x-6 border-t border-slate-100 pt-3">
            <ExtLink href={u.website}>{t({ en: "University website", zh: "学校官网" })}</ExtLink>
            {u.feesUrl && <ExtLink href={u.feesUrl}>{t({ en: "Official fees", zh: "官方学费" })}</ExtLink>}
          </div>
        </div>
      </div>
    </div>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-semibold text-slate-700">{label}</dt>
      <dd className="mt-0.5 text-slate-600">{value}</dd>
    </div>
  );
}

function CourseList({ u, offered, onOpenCourse }: { u: University; offered: typeof COURSES; onOpenCourse: (c: CourseId) => void }) {
  const { t } = useLang();
  const [q, setQ] = useState("");
  const shown = offered.filter((c) => matchesCourse(c, q));
  const examples = EXAMPLE_DEGREES.filter((e) => e.uni === u.id);
  return (
    <div>
      <h3 className="font-semibold text-slate-900">{t({ en: `Subjects at ${u.name} (${offered.length})`, zh: `${u.zhName}开设的专业方向（${offered.length} 个）` })}</h3>
      <label className="relative mt-2 block">
        <span className="sr-only">{t({ en: "Search subjects", zh: "搜索专业" })}</span>
        <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={t({ en: "Search, e.g. real estate…", zh: "搜索，例如 real estate…" })}
          className="min-h-[44px] w-full rounded-xl border border-slate-300 pl-9 pr-3 text-base"
        />
      </label>
      <div className="mt-3 space-y-3">
        {GROUPS.filter((g) => g.id !== "all").map((g) => {
          const items = shown.filter((c) => c.group === g.id);
          if (items.length === 0) return null;
          return (
            <div key={g.id}>
              <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">{t(g.label)}</div>
              <div className="flex flex-wrap gap-1.5">
                {items.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => onOpenCourse(c.id)}
                    className="min-h-[36px] rounded-full border border-slate-200 bg-white px-3 text-sm text-slate-700 hover:border-blue-400 hover:text-blue-700"
                  >
                    {t(c.name)}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
        {shown.length === 0 && <p className="text-sm text-slate-500">{t({ en: "Not in our list for this university.", zh: "本站这所学校没有匹配的专业。" })}</p>}
      </div>
      {examples.length > 0 && (
        <div className="mt-4 rounded-xl bg-slate-50 p-3 text-sm">
          <div className="font-semibold text-slate-800">{t({ en: "Example degrees (checked)", zh: "具体学位示例（已核实）" })}</div>
          <ul className="mt-1">
            {examples.map((e) => (
              <li key={e.url}>
                <ExtLink href={e.url}>{e.title}</ExtLink>
              </li>
            ))}
          </ul>
        </div>
      )}
      <p className="mt-3 text-sm">
        <a href={ucasSearchUrl(q ? `${q} ${u.name}` : u.name)} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[44px] items-center gap-1 font-medium text-blue-700 hover:underline">
          {t({ en: `See every degree at ${u.name} on UCAS`, zh: `在 UCAS 查看${u.zhName}的全部学位` })} <ExternalLink size={14} />
        </a>
      </p>
      <p className="text-xs text-slate-500">{t({ en: "Tap a subject to compare it across universities. Our list groups degrees into broad areas and may miss some.", zh: "点击专业可在各大学之间对比。本站按大类归纳，可能有遗漏。" })}</p>
    </div>
  );
}
