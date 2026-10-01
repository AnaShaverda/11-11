import Icon from "../../components/ui/Icon.jsx";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import ThemeCanvas from "../components/ThemeCanvas.jsx";
import { getThemeBySlug } from "../data/themes.js";
import { themeDemoEvents } from "../data/demoEvents.js";
import { optionalModulesByCategory } from "../../modules/data/eventModules.js";
import { useLanguage } from "../../localization/LanguageContext.jsx";

export default function ThemePreviewPage() {
  const { t } = useLanguage();
  const { slug } = useParams();
  const theme = getThemeBySlug(slug);
  const options = theme ? optionalModulesByCategory[theme.category] : [];
  const [selectedModule, setSelectedModule] = useState(options[0]);

  if (!theme) return <section className="inner-page copy-page"><h1>{t("themePreview.notFound.title")}</h1><p>{t("themePreview.notFound.description")}</p><Link className="text-link" to="/#projects">{t("common.exploreEvents")} <Icon name="arrow-up-right" size={18} /></Link></section>;

  const event = themeDemoEvents[theme.category];
  const activeModule = options.includes(selectedModule) ? selectedModule : options[0];
  return (
    <div className="theme-preview-page">
      <div className="theme-preview-toolbar"><Link className="back-link" to={`/projects/${theme.category}#themes`}><Icon name="arrow-left" size={18} /> {t(`common.${theme.category}`)} {t("common.themes")}</Link><span>11:11 / {t("themePreview.experience")}</span></div>
      <div className="theme-preview-intro"><div><span className="section-label">{t(`common.${theme.category}`)} {t("themePreview.design")}</span><h1>{t(`themes.${theme.id}.name`)}</h1><p>{t(`themes.${theme.id}.description`)}</p></div><span className="theme-mood">{t(`themes.${theme.id}.mood`)}</span></div>
      <ThemeCanvas key={theme.slug} theme={theme} event={event} moduleId={activeModule} />
      <section className="theme-options"><div><span className="section-label">{t("themePreview.makeYours")}</span><h2>{t("themePreview.title")}</h2><p>{t("themePreview.description")}</p></div><div className="module-picker" role="group" aria-label={t("themePreview.aria")}>{options.map((id) => <button key={id} type="button" aria-pressed={activeModule === id} className={activeModule === id ? "is-active" : ""} onClick={() => setSelectedModule(id)}>{t(`modules.${id}.title`)}</button>)}</div></section>
      <div className="theme-preview-footer"><Link className="primary-link" to={`/projects/${theme.category}#themes`}>{t("themePreview.more")} <Icon name="arrow-up-right" size={18} /></Link></div>
    </div>
  );
}
