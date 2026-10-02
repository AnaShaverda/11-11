import Icon from "../../components/ui/Icon.jsx";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { getThemeBySlug } from "../../themes/data/themes.js";
import SurprisePhonePreview from "../components/SurprisePhonePreview.jsx";
import { surpriseOccasions, surpriseOptionalModuleIds } from "../data/surprises.js";
import { useLanguage } from "../../localization/LanguageContext.jsx";
import { readPreviewConfig, previewParams, previewPersonalization } from "../data/previewConfig.js";

const steps = [0, 1, 2, 3, 4];

export default function SurpriseShowcasePage() {
  const { t } = useLanguage();
  const [params] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const initial = readPreviewConfig(params);
  const [personalization, setPersonalization] = useState(() => previewPersonalization(location.state?.personalization));
  const [occasionId, setOccasionId] = useState(initial.occasion.id);
  const [themeId, setThemeId] = useState(initial.themeId);
  const [selectedModules, setSelectedModules] = useState(initial.selectedModules);
  const occasion = surpriseOccasions.find((item) => item.id === occasionId);
  const theme = getThemeBySlug(themeId);
  const demoLink = `/surprises/demo?${previewParams(occasionId, theme.id, selectedModules)}`;
  const { availableModules } = readPreviewConfig(new URLSearchParams({ occasion: occasionId }));

  useEffect(() => {
    const search = previewParams(occasionId, themeId, selectedModules).toString();
    const saved = previewPersonalization(location.state?.personalization);
    if (location.search.slice(1) === search && JSON.stringify(saved) === JSON.stringify(personalization)) return;
    navigate({ pathname: location.pathname, search, hash: location.hash }, { replace: true, state: { ...location.state, personalization, preserveScroll: true } });
  }, [occasionId, themeId, selectedModules, personalization, location, navigate]);

  function chooseOccasion(item) {
    setOccasionId(item.id);
    setThemeId(item.themeIds[0]);
    setSelectedModules(readPreviewConfig(new URLSearchParams({ occasion: item.id })).selectedModules);
  }

  function toggleModule(id) {
    setSelectedModules((current) => current.includes(id) ? current.filter((item) => item !== id) : surpriseOptionalModuleIds.filter((item) => item === id || current.includes(item)));
  }

  return <div className="surprise-showcase">

    <section className="surprise-showcase-hero" aria-labelledby="surprise-title">
      <div className="surprise-showcase-copy"><span className="surprise-site-label">{t("surprises.label")}</span><h1 id="surprise-title">{t("surprises.hero.question")} <em>{t("surprises.hero.emphasis")}</em></h1><p>{t("surprises.showcase.description")}</p><div className="surprise-showcase-actions"><a className="primary-link" href="#create-surprise">{t("surprises.create")} <Icon name="arrow-up-right" size={18} /></a><Link className="surprise-text-link" to="/surprises/demo">{t("surprises.openExample")} <Icon name="arrow-right" size={18} /></Link></div><small>{t("surprises.launchNote")}</small></div>
      <div className="surprise-showcase-visual"><span className="surprise-visual-glow" aria-hidden="true"/><SurprisePhonePreview /></div>
    </section>
    <section className="surprise-flow" aria-labelledby="surprise-flow-title"><div><span className="surprise-site-label">{t("surprises.flow.label")}</span><h2 id="surprise-flow-title">{t("surprises.flow.title")}</h2></div><ol>{steps.map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, "0")}</span>{t(`surprises.flow.${step}`)}</li>)}</ol></section>
    <section className="surprise-config" id="create-surprise" aria-labelledby="create-title"><div className="surprise-config-heading"><span className="surprise-site-label">{t("surprises.config.label")}</span><h2 id="create-title">{t("surprises.config.title")}</h2><p>{t("surprises.config.description")}</p></div>
      <div className="surprise-config-grid"><div className="surprise-config-controls"><div className="surprise-config-step"><div className="surprise-config-step-heading"><span>01</span><div><h3>{t("surprises.occasion.title")}</h3><p>{t("surprises.occasion.description")}</p></div></div><div className="surprise-occasion-options" role="group" aria-label={t("surprises.occasion.aria")}>{surpriseOccasions.map((item) => <button key={item.id} type="button" aria-pressed={occasionId === item.id} className={occasionId === item.id ? "is-selected" : ""} onClick={() => chooseOccasion(item)}><Icon name={item.icon} size={18} />{t(`occasions.${item.id}.label`)}</button>)}</div></div>
        <div className="surprise-config-step"><div className="surprise-config-step-heading"><span>02</span><div><h3>{t("surprises.theme.title")}</h3><p>{t("surprises.theme.description")}</p></div></div><div className="surprise-theme-options" role="group" aria-label={t("surprises.theme.aria")}>{occasion.themeIds.map((id) => { const option = getThemeBySlug(id); return <button key={id} type="button" aria-pressed={themeId === id} className={themeId === id ? "is-selected" : ""} onClick={() => setThemeId(id)}><span className={`theme-canvas theme-${option.visual} surprise-theme-swatch`} aria-hidden="true"><span>{option.decor}</span></span><strong>{t(`themes.${option.id}.name`)}</strong></button>; })}</div></div>
        <div className="surprise-config-step"><div className="surprise-config-step-heading"><span>03</span><div><h3>{t("product.personalize.title")}</h3><p>{t("product.personalize.description")}</p></div></div><div className="surprise-personal-fields">{["recipientName", "creatorName", "message"].map((key) => <label key={key}>{t(`product.personalize.${key}`)}{key === "message" ? <textarea rows={4} maxLength={600} value={personalization[key]} onChange={(event) => setPersonalization((current) => ({ ...current, [key]: event.target.value }))} /> : <input maxLength={60} value={personalization[key]} onChange={(event) => setPersonalization((current) => ({ ...current, [key]: event.target.value }))} />}</label>)}</div><small>{t("product.personalize.note")}</small></div>
        <div className="surprise-config-step"><div className="surprise-config-step-heading"><span>04</span><div><h3>{t("surprises.modules.title")}</h3><p>{t("surprises.modules.description")}</p></div></div><div className="surprise-module-options" role="group" aria-label={t("surprises.modules.aria")}>{availableModules.map((id) => <button key={id} type="button" aria-pressed={selectedModules.includes(id)} className={selectedModules.includes(id) ? "is-selected" : ""} onClick={() => toggleModule(id)}><Icon name={selectedModules.includes(id) ? "check" : "plus"} size={18} />{t(`modules.${id}.title`)}</button>)}</div></div></div>
        <div className="surprise-config-preview"><span className="surprise-site-label">{t("surprises.preview.label")}</span><h3>{t(`occasions.${occasion.id}.headline`)}</h3><p>{t(`occasions.${occasion.id}.note`)}</p><SurprisePhonePreview themeId={theme.id} title={personalization.recipientName.trim() || t(`occasions.${occasion.id}.headline`)} message={personalization.message.trim() || t(`occasions.${occasion.id}.note`)} showCake={selectedModules.includes("cake")} to={demoLink} state={{ personalization }} /><div className="surprise-preview-summary"><strong>{t("surprises.preview.count", { count: selectedModules.length })}</strong><span>{t("common.theme")}: {t(`themes.${theme.id}.name`)}</span></div><Link className="primary-link" to={demoLink} state={{ personalization }}>{t("surprises.preview.action")} <Icon name="arrow-up-right" size={18} /></Link><small>{t("surprises.preview.note")}</small></div></div>
    </section>
    <section className="surprise-share-concept"><span className="surprise-site-label">{t("surprises.share.label")}</span><h2>{t("surprises.share.title")}</h2><p>{t("surprises.share.description")}</p><code>your11-11.com/s/nini-birthday</code><small>{t("surprises.share.note")}</small></section>
  </div>;
}
