import { useState, type ReactNode } from "react";
import { BadgeCheck, CircleAlert, ExternalLink } from "lucide-react";
import { useLang } from "../i18n";
import { photoUrl, type FeeStatus, type Photo } from "../data/universities";

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-2xl border border-slate-200 bg-white p-5 shadow-sm ${className}`}>{children}</div>;
}

export function SectionTitle({ title, subtitle, eyebrow }: { title: string; subtitle?: string; eyebrow?: string }) {
  return (
    <div className="mb-6">
      {eyebrow && <div className="mb-1 text-sm font-semibold uppercase tracking-wide text-blue-600">{eyebrow}</div>}
      <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">{title}</h2>
      {subtitle && <p className="mt-2 max-w-3xl text-slate-600">{subtitle}</p>}
    </div>
  );
}

const PILL_TONES = {
  slate: "bg-slate-100 text-slate-700",
  blue: "bg-blue-50 text-blue-700",
  violet: "bg-violet-50 text-violet-700",
  amber: "bg-amber-50 text-amber-800",
  green: "bg-emerald-50 text-emerald-700",
  rose: "bg-rose-50 text-rose-700",
};
export type Tone = keyof typeof PILL_TONES;

export function Pill({ children, tone = "slate" }: { children: ReactNode; tone?: Tone }) {
  return <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${PILL_TONES[tone]}`}>{children}</span>;
}

export function FeeStatusPill({ status }: { status: FeeStatus }) {
  const { t } = useLang();
  if (status === "official")
    return (
      <Pill tone="green">
        <BadgeCheck size={14} /> {t({ en: "Official figure", zh: "官方数据" })}
      </Pill>
    );
  return (
    <Pill tone="amber">
      <CircleAlert size={14} /> {status === "unofficial" ? t({ en: "Unverified", zh: "待核实" }) : t({ en: "Check official site", zh: "请查官网" })}
    </Pill>
  );
}

export function ExtLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[44px] items-center gap-1 font-medium text-blue-700 underline-offset-2 hover:underline">
      {children} <ExternalLink size={14} aria-hidden />
    </a>
  );
}

export function Callout({ children, tone = "blue" }: { children: ReactNode; tone?: "blue" | "amber" | "green" }) {
  const cls = {
    blue: "border-blue-200 bg-blue-50 text-blue-900",
    amber: "border-amber-200 bg-amber-50 text-amber-900",
    green: "border-emerald-200 bg-emerald-50 text-emerald-900",
  }[tone];
  return <div className={`rounded-xl border p-4 text-sm leading-relaxed ${cls}`}>{children}</div>;
}

export function ToggleChip({ on, onClick, children }: { on: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={on}
      className={`min-h-[44px] rounded-xl px-4 text-sm font-medium transition ${
        on ? "bg-blue-600 text-white shadow-sm" : "border border-slate-300 bg-white text-slate-700 hover:border-blue-400"
      }`}
    >
      {children}
    </button>
  );
}

// A Wikimedia Commons photo; falls back to a soft illustrated banner if the image can't load.
export function UniPhoto({ photo, alt, className = "", width = 960 }: { photo: Photo; alt: string; className?: string; width?: number }) {
  const [failed, setFailed] = useState(false);
  if (failed)
    return (
      <div className={`flex items-end bg-gradient-to-br from-blue-200 via-indigo-100 to-violet-200 ${className}`} role="img" aria-label={alt}>
        <svg viewBox="0 0 200 60" className="h-1/2 w-full text-white/70" preserveAspectRatio="xMidYMax meet" aria-hidden>
          <path fill="currentColor" d="M0 60V40h20V28h8v-8h4v8h8v12h16V22l10-10 10 10v18h14V30h6v-6h6v6h6v10h20V18h4V8h4v10h4v22h16V32h10v8h18v20z" />
        </svg>
      </div>
    );
  return (
    <img
      src={photoUrl(photo.file, width)}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className={`bg-gradient-to-br from-blue-100 to-violet-100 object-cover ${className}`}
    />
  );
}

export function Select<T extends string>({
  value,
  onChange,
  options,
  label,
  className = "",
}: {
  value: T;
  onChange: (v: T) => void;
  options: { value: T; label: string }[];
  label: string;
  className?: string;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as T)}
      aria-label={label}
      className={`min-h-[44px] rounded-xl border border-slate-300 bg-white px-3 text-base ${className}`}
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}
