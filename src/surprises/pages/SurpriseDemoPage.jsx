import Icon from "../../components/ui/Icon.jsx";
import { Link, useSearchParams } from "react-router-dom";
import { getThemeBySlug } from "../../themes/data/themes.js";
import SurpriseExperience from "../components/SurpriseExperience.jsx";
import { birthdaySurprise, surpriseOptionalModuleIds } from "../data/surprises.js";
import { useLanguage } from "../../localization/LanguageContext.jsx";

const quickThemes = ["birthday-retro-disco", "birthday-coquette", "birthday-y2k-digital"];

export default function SurpriseDemoPage() {
  const { t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedTheme = getThemeBySlug(searchParams.get("theme")) ?? getThemeBySlug(birthdaySurprise.themeId);
  const themeChoices = quickThemes.includes(selectedTheme.id) ? quickThemes : [selectedTheme.id, ...quickThemes];
  const requestedModules = searchParams.has("modules") ? searchParams.get("modules").split(",") : birthdaySurprise.enabledModules;
  const enabledModules = ["main-message", ...surpriseOptionalModuleIds.filter((id) => requestedModules.includes(id))];

  function changeTheme(id) {
    setSearchParams((previous) => { const next = new URLSearchParams(previous); next.set("theme", id); return next; }, { replace: true });
  }

  return <div className="surprise-demo-page"><div className="surprise-demo-toolbar"><Link className="back-link" to="/surprises"><Icon name="arrow-left" size={18} /> {t("surprises.demo.back")}</Link><span>{t("surprises.demo.label")}</span></div><div className="surprise-demo-intro"><div><span className="surprise-site-label">{t("surprises.demo.eyebrow")}</span><h2>{t("surprises.demo.title")}</h2><p>{t("surprises.demo.description")}</p></div><div className="surprise-demo-theme-switch" role="group" aria-label={t("surprises.demo.aria")}>{themeChoices.map((id) => { const theme = getThemeBySlug(id); return <button key={id} type="button" aria-pressed={selectedTheme.id === id} className={selectedTheme.id === id ? "is-selected" : ""} onClick={() => changeTheme(id)}>{t(`themes.${theme.id}.name`)}</button>; })}</div></div><SurpriseExperience surprise={birthdaySurprise} theme={selectedTheme} enabledModules={enabledModules} /><div className="surprise-demo-end"><p>{t("surprises.demo.end")}</p><Link className="primary-link" to="/surprises#create-surprise">{t("surprises.home.action")} <Icon name="arrow-up-right" size={18} /></Link></div></div>;
}
