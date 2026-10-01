import Icon from "../components/ui/Icon.jsx";
import { useState } from "react";
import { Link } from "react-router-dom";
import ExperienceCTA from "./components/ExperienceCTA.jsx";
import { useLanguage } from "../localization/LanguageContext.jsx";

export default function OtherCelebrationsExperience({ project }) {
  const { t } = useLanguage();
  const [selectedId, setSelectedId] = useState(project.subcategories[0].id);
  const selected = project.subcategories.find((item) => item.id === selectedId);

  return (
    <div className="experience-page other-experience">
      <Link className="experience-back" to="/#projects"><Icon name="arrow-left" size={18} /> {t("common.allEvents")}</Link>
      <section className="other-hero"><span className="section-label">{t("other.hero.label")}</span><h1>{t("other.hero.title")}</h1><p>{t("other.hero.description")}</p></section>
      <section className="other-chooser" aria-label={t("other.chooser.aria")}><div className="other-chooser-intro"><span className="section-label">{t("other.chooser.label")}</span><h2>{t("other.chooser.title")}</h2><p>{t("other.chooser.description")}</p></div><div className="other-options" role="group" aria-label={t("other.preview.aria")}>{project.subcategories.map((item) => <button key={item.id} type="button" className={selectedId === item.id ? "is-active" : ""} aria-pressed={selectedId === item.id} onClick={() => setSelectedId(item.id)}><span>{t(`project.${item.id === "gender-reveal" ? "genderReveal" : item.id}`)}</span><small>{t(`project.${item.id === "gender-reveal" ? "genderReveal" : item.id}.description`)}</small></button>)}</div></section>
      <div className={`other-stage stage-${selected.visual}`}><div className="other-stage-copy"><span className="other-stage-overline">{t("other.stage.label")}</span><h2>{t(`project.${selected.id === "gender-reveal" ? "genderReveal" : selected.id}`)}</h2><p>{t(`project.${selected.id === "gender-reveal" ? "genderReveal" : selected.id}.description`)}</p><span className="other-stage-tag">{t("other.stage.tag")}</span></div><div className="other-stage-art" aria-hidden="true"><span>{selected.visual === "reveal" ? "?" : selected.visual === "bachelorette" ? "✳" : "✧"}</span></div></div>
      <ExperienceCTA title={t("other.cta.title")} text={t("other.cta.description")} to="/#projects" action={t("common.exploreEvents")} />
    </div>
  );
}
