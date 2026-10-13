import type { ReactNode } from "react";
import { BadgeCheck, CircleAlert, ExternalLink } from "lucide-react";
import { useLang } from "../i18n";
import type { FeeStatus } from "../data/universities";

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-2xl border border-slate-200 bg-white p-5 shadow-sm ${className}`}>{children}</div>;
}

export function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">{title}</h2>
      {subtitle && <p className="mt-2 max-w-3xl text-slate-600">{subtitle}</p>}
    </div>
  );
}

export function Pill({ children, tone = "slate" }: { children: ReactNode; tone?: "slate" | "blue" | "violet" | "amber" | "green" }) {
  const tones = {
    slate: "bg-slate-100 text-slate-700",
    blue: "bg-blue-50 text-blue-700",
    violet: "bg-violet-50 text-violet-700",
    amber: "bg-amber-50 text-amber-800",
    green: "bg-emerald-50 text-emerald-700",
  };
  return <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${tones[tone]}`}>{children}</span>;
}

export function FeeStatusPill({ status }: { status: FeeStatus }) {
  const { t } = useLang();
  if (status === "official")
    return (
      <Pill tone="green">
        <BadgeCheck size={14} /> {t({ en: "Official figure", zh: "官方数据" })}
      </Pill>
    );
  if (status === "unofficial")
    return (
      <Pill tone="amber">
        <CircleAlert size={14} /> {t({ en: "Unverified", zh: "待核实" })}
      </Pill>
    );
  return (
    <Pill tone="amber">
      <CircleAlert size={14} /> {t({ en: "Check official site", zh: "请查官网" })}
    </Pill>
  );
}

export function ExtLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex min-h-[44px] items-center gap-1 font-medium text-blue-700 underline-offset-2 hover:underline"
    >
      {children} <ExternalLink size={14} aria-hidden />
    </a>
  );
}

export function Callout({ children, tone = "blue" }: { children: ReactNode; tone?: "blue" | "amber" }) {
  const cls = tone === "blue" ? "border-blue-200 bg-blue-50 text-blue-900" : "border-amber-200 bg-amber-50 text-amber-900";
  return <div className={`rounded-xl border p-4 text-sm leading-relaxed ${cls}`}>{children}</div>;
}
