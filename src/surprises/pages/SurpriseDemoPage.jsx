import { useLocation, useSearchParams } from "react-router-dom";
import { getThemeBySlug } from "../../themes/data/themes.js";
import SurpriseExperience from "../components/SurpriseExperience.jsx";
import { birthdaySurprise } from "../data/surprises.js";
import { useLanguage } from "../../localization/LanguageContext.jsx";
import { readPreviewConfig, previewPersonalization } from "../data/previewConfig.js";

export default function SurpriseDemoPage() {
  const { t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const { occasion, themeId, selectedModules } = readPreviewConfig(searchParams, { fullExample: true });
  const personalization = previewPersonalization(location.state?.personalization);
  const selectedTheme = getThemeBySlug(themeId);
  const themeChoices = occasion.themeIds;
  const enabledModules = ["main-message", ...selectedModules];
  const recipientName = personalization.recipientName.trim() || birthdaySurprise.recipientName;
  const creatorName = personalization.creatorName.trim() || birthdaySurprise.creatorName;
  const message = personalization.message.trim() || (occasion.id === "birthday" ? birthdaySurprise.content.personalMessage : t(`occasions.${occasion.id}.note`));
  const surprise = {
    ...birthdaySurprise, occasion: occasion.id, recipientName, creatorName,
    title: occasion.id === "birthday" ? t("product.surprise.birthday.title", { name: recipientName }) : t(`occasions.${occasion.id}.headline`),
    mainMessage: message,
    content: { ...birthdaySurprise.content, personalMessage: message,
      finalLetter: occasion.id === "birthday" && !Object.values(personalization).some((value) => value.trim()) ? birthdaySurprise.content.finalLetter : t("product.surprise.letter", { name: recipientName, message, from: creatorName }) },
  };

  function changeTheme(id) {
    setSearchParams((previous) => { const next = new URLSearchParams(previous); next.set("theme", id); return next; }, { replace: true, state: { ...location.state, personalization, preserveScroll: true } });
  }

  return <div className="surprise-demo-page"><div className="surprise-demo-toolbar"><span>{t("surprises.demo.label")}</span></div><div className="surprise-demo-intro"><div><span className="surprise-site-label">{t("surprises.demo.eyebrow")}</span><h2>{t("surprises.demo.title")}</h2><p>{t("surprises.demo.description")}</p></div><div className="surprise-demo-theme-switch" role="group" aria-label={t("surprises.demo.aria")}>{themeChoices.map((id) => { const theme = getThemeBySlug(id); return <button key={id} type="button" aria-pressed={selectedTheme.id === id} className={selectedTheme.id === id ? "is-selected" : ""} onClick={() => changeTheme(id)}>{t(`themes.${theme.id}.name`)}</button>; })}</div></div><SurpriseExperience surprise={surprise} theme={selectedTheme} enabledModules={enabledModules} /><div className="surprise-demo-end"><p>{t("surprises.demo.end")}</p></div></div>;
}
