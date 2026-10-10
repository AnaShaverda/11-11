import { useLanguage } from "../../localization/LanguageContext.jsx";

export function useRibbonCopy() {
  return useLanguage().t;
}
