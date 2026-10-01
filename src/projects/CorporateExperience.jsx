import Icon from "../components/ui/Icon.jsx";
import { Link } from "react-router-dom";
import ExperienceSection from "./components/ExperienceSection.jsx";
import ExperienceCTA from "./components/ExperienceCTA.jsx";
import { useLanguage } from "../localization/LanguageContext.jsx";

const occasions = [0, 1, 2, 3, 4, 5];

export default function CorporateExperience() {
  const { t } = useLanguage();
  return (
    <div className="experience-page corporate-experience">
      <Link className="experience-back" to="/#projects"><Icon name="arrow-left" size={18} /> {t("common.allEvents")}</Link>
      <section className="corporate-hero"><div><span className="section-label">{t("corporate.hero.label")}</span><h1>{t("corporate.hero.title")}</h1><p>{t("corporate.hero.description")}</p><Link className="primary-link" to="/invitations">{t("corporate.explore")} <Icon name="arrow-up-right" size={18} /></Link></div><div className="corporate-visual" aria-hidden="true"><span>11:11</span><strong>{t("corporate.art.title")}</strong><small>{t("corporate.art.caption")}</small><i>✳</i></div></section>
      <ExperienceSection label={t("corporate.section.label")} title={t("corporate.section.title")} description={t("corporate.section.description")}><div className="corporate-occasions">{occasions.map((occasion, index) => <div key={occasion}><span>{String(index + 1).padStart(2, "0")}</span><strong>{t(`corporate.occasion.${occasion}`)}</strong><Icon name="arrow-up-right" size={18} /></div>)}</div></ExperienceSection>
      <div className="corporate-preview-note"><span aria-hidden="true">✦</span><div><h2>{t("corporate.note.title")}</h2><p>{t("corporate.note.description")}</p></div></div>
      <ExperienceCTA title={t("corporate.cta.title")} text={t("corporate.cta.description")} to="/invitations" action={t("corporate.cta.action")} />
    </div>
  );
}
