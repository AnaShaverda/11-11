import ThemeGallery from "./ThemeGallery.jsx";
import { birthdayThemes, weddingThemes, isThemeActive } from "../data/themeRegistry.js";
import { useLanguage } from "../../localization/LanguageContext.jsx";

export default function ThemeExplorer({ category }) {
  const { t } = useLanguage();
  const themes = (category === "birthday" ? birthdayThemes : weddingThemes).filter(isThemeActive);
  return (
    <section id="themes" className="theme-explorer">
      <div className="theme-explorer-heading"><span>{t("themeExplorer.choose")}</span><h2>{t("themeExplorer.title")}</h2><p>{t("themeExplorer.description")}</p><strong>{themes.length} {t(`common.${category}`)} {t("common.themes")}</strong></div>
      <ThemeGallery themes={themes} />
    </section>
  );
}
