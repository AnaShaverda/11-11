import Icon from "../components/ui/Icon.jsx";
import { Link } from "react-router-dom";
import ExperienceSection from "./components/ExperienceSection.jsx";
import ExperienceInvitations from "./components/ExperienceInvitations.jsx";
import ExperienceCTA from "./components/ExperienceCTA.jsx";
import ResponseCard from "./components/ResponseCard.jsx";
import { weddingFeatures, weddingMessages } from "./data/showcases.js";
import { useLanguage } from "../localization/LanguageContext.jsx";

export default function WeddingExperience() {
  const { t } = useLanguage();
  return (
    <div className="experience-page wedding-experience">
      <Link className="experience-back" to="/#projects"><Icon name="arrow-left" size={18} /> {t("common.allEvents")}</Link>
      <section className="wedding-hero">
        <div className="wedding-hero-copy"><span className="section-label">{t("wedding.hero.label")}</span><h1>{t("wedding.hero.line1")}<br />{t("wedding.hero.line2")}<br /><em>{t("wedding.hero.emphasis")}</em></h1><p>{t("wedding.hero.description")}</p><Link className="primary-link wedding-link" to="/invitations?type=Wedding">{t("wedding.exploreInvitations")} <Icon name="arrow-up-right" size={18} /></Link></div>
        <div className="wedding-hero-art" aria-hidden="true"><div className="wedding-paper paper-back" /><div className="wedding-paper paper-front"><span>11:11 / {t("common.wedding")}</span><strong>M <em>&amp;</em> L</strong><span>{t("wedding.art")}</span><i>✧</i></div></div>
      </section>
      <ExperienceInvitations type="Wedding" description={t("wedding.invitations.description")} />
      <ExperienceSection label={t("wedding.features.label")} title={t("wedding.features.title")} description={t("wedding.features.description")} className="wedding-feature-section">
        <div className="wedding-feature-grid">{weddingFeatures.map((feature, index) => <article key={feature.title} className="wedding-feature"><span aria-hidden="true"><Icon name={feature.icon} size={28} /></span><h3>{t(`showcase.weddingFeatures.${index}.title`)}</h3><p>{t(`showcase.weddingFeatures.${index}.detail`)}</p></article>)}</div>
      </ExperienceSection>
      <ExperienceSection label={t("wedding.messages.label")} title={t("wedding.messages.title")} description={t("wedding.messages.description")}>
        <div className="response-grid wedding-responses">{weddingMessages.map((message) => <ResponseCard key={message.name} response={message} />)}</div>
      </ExperienceSection>
      <ExperienceCTA className="wedding-final" title={t("wedding.cta.title")} text={t("wedding.cta.text")} to="/invitations?type=Wedding" action={t("wedding.exploreInvitations")} />
    </div>
  );
}
