import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { captions, defaultLanguage, languages } from "./captions.js";

const LanguageContext = createContext(null);
const storageKey = "1111-language";

function readLanguage() {
  try {
    const saved = localStorage.getItem(storageKey);
    return languages.includes(saved) ? saved : defaultLanguage;
  } catch {
    return defaultLanguage;
  }
}

export function translate(language, key, values = {}) {
  const value = captions[language]?.[key] ?? captions[defaultLanguage]?.[key];
  if (typeof value !== "string") return key;
  return value.replace(/\{(\w+)\}/g, (match, name) => String(values[name] ?? match));
}

export function LanguageProvider({ children }) {
  const [language, setCurrentLanguage] = useState(readLanguage);

  function setLanguage(nextLanguage) {
    if (!languages.includes(nextLanguage)) return;
    setCurrentLanguage(nextLanguage);
    try { localStorage.setItem(storageKey, nextLanguage); } catch { /* Storage may be unavailable. */ }
  }

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = translate(language, "meta.title");
    document.querySelector('meta[name="description"]')?.setAttribute("content", translate(language, "meta.description"));
  }, [language]);
  const value = useMemo(() => ({ language, setLanguage, t: (key, values) => translate(language, key, values) }), [language]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
}

// Scope creator-written wording to the invitation artwork, leaving the app UI localized.
export function CardCopyProvider({ overrides, children }) {
  const parent = useLanguage();
  const value = useMemo(() => ({ ...parent, t: (key, values = {}) => {
    const text = overrides?.[key];
    return typeof text === "string" ? text.replace(/\{(\w+)\}/g, (match, name) => String(values[name] ?? match)) : parent.t(key, values);
  } }), [parent, overrides]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
