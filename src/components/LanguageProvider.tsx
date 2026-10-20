import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import ar from "@/lib/translations-ar.json";
import en from "@/lib/translations-en.json";
import es from "@/lib/translations-es.json";
import it from "@/lib/translations-it.json";
import zgh from "@/lib/translations-zgh.json";

export type Language = "fr" | "ar" | "zgh" | "en" | "es" | "it";
export const languages: { code: Language; label: string; flag: "fr" | "ma" | "amz" | "gb" | "es" | "it" }[] = [
  { code: "fr", label: "Français", flag: "fr" },
  { code: "ar", label: "العربية", flag: "ma" },
  { code: "zgh", label: "ⵜⴰⵎⴰⵣⵉⵖⵜ", flag: "amz" },
  { code: "en", label: "English", flag: "gb" },
  { code: "es", label: "Español", flag: "es" },
  { code: "it", label: "Italiano", flag: "it" },
];

const dictionaries: Record<Exclude<Language, "fr">, Record<string, string>> = { ar, zgh, en, es, it };
const LanguageContext = createContext<{ language: Language; setLanguage: (language: Language) => void; t: (text: string) => string }>({ language: "fr", setLanguage: () => {}, t: text => text });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, updateLanguage] = useState<Language>("fr");
  useEffect(() => {
    const saved = localStorage.getItem("fatnassi-language");
    if (saved === "ar" || saved === "fr" || saved === "zgh" || saved === "en" || saved === "es" || saved === "it") updateLanguage(saved);
  }, []);
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);
  function setLanguage(next: Language) {
    updateLanguage(next);
    localStorage.setItem("fatnassi-language", next);
  }
  function t(text: string) {
    const key = text.replace(/\s+/g, " ").trim();
    if (language === "fr") return text;
    return dictionaries[language][key] ?? text;
  }
  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>;
}
export function useLanguage() { return useContext(LanguageContext); }
