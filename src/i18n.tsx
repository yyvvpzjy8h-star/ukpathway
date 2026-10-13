import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "en" | "zh";
export type L = { en: string; zh: string };

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (s: L) => string };

const LangContext = createContext<Ctx | null>(null);

function initialLang(): Lang {
  try {
    const saved = localStorage.getItem("lang");
    if (saved === "en" || saved === "zh") return saved;
  } catch {
    /* storage unavailable */
  }
  return navigator.language?.toLowerCase().startsWith("zh") ? "zh" : "en";
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang);

  useEffect(() => {
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en-GB";
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem("lang", l);
    } catch {
      /* storage unavailable */
    }
  };

  return (
    <LangContext.Provider value={{ lang, setLang, t: (s) => s[lang] }}>{children}</LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside LangProvider");
  return ctx;
}

export const gbp = (n: number) => "£" + Math.round(n).toLocaleString("en-GB");
