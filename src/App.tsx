import { useEffect, useState } from "react";
import { Languages } from "lucide-react";
import { useLang, type L } from "./i18n";
import Home from "./sections/Home";
import Universities from "./sections/Universities";
import Fees from "./sections/Fees";
import Calculator from "./sections/Calculator";
import Apply from "./sections/Apply";
import International from "./sections/International";
import School from "./sections/School";
import Sources from "./sections/Sources";

export type Tab = "home" | "universities" | "fees" | "calculator" | "apply" | "international" | "school" | "sources";

const TABS: { id: Tab; label: L }[] = [
  { id: "home", label: { en: "Home", zh: "首页" } },
  { id: "universities", label: { en: "Universities", zh: "大学" } },
  { id: "fees", label: { en: "Fees", zh: "学费" } },
  { id: "calculator", label: { en: "Calculator", zh: "计算器" } },
  { id: "apply", label: { en: "Apply", zh: "申请" } },
  { id: "international", label: { en: "International", zh: "国际生" } },
  { id: "school", label: { en: "Sixth form", zh: "高中选课" } },
  { id: "sources", label: { en: "Sources", zh: "来源" } },
];

function tabFromHash(): Tab {
  const h = window.location.hash.replace("#", "");
  return (TABS.find((t) => t.id === h)?.id ?? "home") as Tab;
}

export default function App() {
  const { t, lang, setLang } = useLang();
  const [tab, setTab] = useState<Tab>(tabFromHash);

  useEffect(() => {
    const onHash = () => setTab(tabFromHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const go = (next: Tab) => {
    window.location.hash = next === "home" ? "" : next;
    setTab(next);
    window.scrollTo({ top: 0 });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 pt-3">
          <button onClick={() => go("home")} className="flex min-h-[44px] items-center gap-2 font-bold tracking-tight">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-sm text-white">UK</span>
            <span>UKPathway</span>
          </button>
          <button
            onClick={() => setLang(lang === "en" ? "zh" : "en")}
            className="ml-auto flex min-h-[44px] items-center gap-2 rounded-xl border border-slate-300 px-3 text-sm font-medium hover:border-blue-400"
            aria-label="Switch language / 切换语言"
          >
            <Languages size={16} /> {lang === "en" ? "中文" : "English"}
          </button>
        </div>
        <nav className="mx-auto max-w-6xl overflow-x-auto px-2" aria-label={t({ en: "Sections", zh: "栏目" })}>
          <ul className="flex gap-1 py-2">
            {TABS.map((x) => (
              <li key={x.id}>
                <button
                  onClick={() => go(x.id)}
                  aria-current={tab === x.id ? "page" : undefined}
                  className={`min-h-[44px] whitespace-nowrap rounded-xl px-3 text-sm font-medium transition ${
                    tab === x.id ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {t(x.label)}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        {tab === "home" && <Home go={go} />}
        {tab === "universities" && <Universities />}
        {tab === "fees" && <Fees />}
        {tab === "calculator" && <Calculator />}
        {tab === "apply" && <Apply />}
        {tab === "international" && <International />}
        {tab === "school" && <School />}
        {tab === "sources" && <Sources />}
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-slate-500">
          {t({
            en: "Independent guide, not affiliated with any university or UCAS. Always check official sources.",
            zh: "独立参考网站，与任何大学或 UCAS 无关。请以官方信息为准。",
          })}{" "}
          <button onClick={() => go("sources")} className="min-h-[44px] font-medium text-blue-700 hover:underline">
            {t({ en: "Sources", zh: "数据来源" })}
          </button>
        </div>
      </footer>
    </div>
  );
}
