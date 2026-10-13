import { useCallback, useEffect, useState } from "react";
import { Languages } from "lucide-react";
import { useLang, type L } from "./i18n";
import Home from "./sections/Home";
import Plan from "./sections/Plan";
import Universities from "./sections/Universities";
import Courses from "./sections/Courses";
import Careers from "./sections/Careers";
import Qualifications from "./sections/Qualifications";
import Fees from "./sections/Fees";
import Calculator from "./sections/Calculator";
import Apply from "./sections/Apply";
import International from "./sections/International";
import Sources from "./sections/Sources";
import UniDetail from "./components/UniDetail";

export type Tab =
  | "home" | "plan" | "universities" | "courses" | "careers" | "quals" | "fees" | "calculator" | "apply" | "international" | "sources";

const TABS: { id: Tab; label: L }[] = [
  { id: "home", label: { en: "Home", zh: "首页" } },
  { id: "plan", label: { en: "✨ My plan", zh: "✨ 我的规划" } },
  { id: "universities", label: { en: "Universities", zh: "大学" } },
  { id: "courses", label: { en: "Courses", zh: "专业" } },
  { id: "careers", label: { en: "Careers", zh: "职业" } },
  { id: "quals", label: { en: "Exam boards", zh: "考试局" } },
  { id: "fees", label: { en: "Fees", zh: "学费" } },
  { id: "calculator", label: { en: "Calculator", zh: "计算器" } },
  { id: "apply", label: { en: "Apply", zh: "申请" } },
  { id: "international", label: { en: "International", zh: "国际生" } },
  { id: "sources", label: { en: "Sources", zh: "来源" } },
];

function tabFromHash(): Tab {
  const h = window.location.hash.replace("#", "");
  return TABS.find((t) => t.id === h)?.id ?? "home";
}

export default function App() {
  const { t, lang, setLang } = useLang();
  const [tab, setTab] = useState<Tab>(tabFromHash);
  const [uniOpen, setUniOpen] = useState<string | null>(null);

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
  const closeUni = useCallback(() => setUniOpen(null), []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 pt-3">
          <button type="button" onClick={() => go("home")} className="flex min-h-[44px] items-center gap-2 font-bold tracking-tight">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-sm text-white">UK</span>
            <span>UKPathway</span>
          </button>
          <button
            type="button"
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
                  type="button"
                  onClick={() => go(x.id)}
                  aria-current={tab === x.id ? "page" : undefined}
                  className={`min-h-[44px] whitespace-nowrap rounded-xl px-3 text-sm font-medium transition ${
                    tab === x.id ? "bg-blue-50 text-blue-700" : x.id === "plan" ? "text-violet-700 hover:bg-violet-50" : "text-slate-600 hover:bg-slate-100"
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
        {tab === "home" && <Home go={go} openUni={setUniOpen} />}
        {tab === "plan" && <Plan openUni={setUniOpen} />}
        {tab === "universities" && <Universities openUni={setUniOpen} />}
        {tab === "courses" && <Courses openUni={setUniOpen} />}
        {tab === "careers" && <Careers />}
        {tab === "quals" && <Qualifications />}
        {tab === "fees" && <Fees />}
        {tab === "calculator" && <Calculator />}
        {tab === "apply" && <Apply />}
        {tab === "international" && <International />}
        {tab === "sources" && <Sources />}
      </main>

      {uniOpen && <UniDetail id={uniOpen} onClose={closeUni} />}

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-slate-500">
          {t({
            en: "Independent guide, not affiliated with any university or UCAS. Always check official sources. Photos: Wikimedia Commons contributors.",
            zh: "独立参考网站，与任何大学或 UCAS 无关，请以官方信息为准。照片来自维基共享资源的贡献者。",
          })}{" "}
          <button type="button" onClick={() => go("sources")} className="min-h-[44px] font-medium text-blue-700 hover:underline">
            {t({ en: "Sources & credits", zh: "来源与署名" })}
          </button>
        </div>
      </footer>
    </div>
  );
}
