import Icon from "../components/ui/Icon.jsx";
import ExperienceSection from "./components/ExperienceSection.jsx";
import ExperienceCTA from "./components/ExperienceCTA.jsx";
import ResponseCard from "./components/ResponseCard.jsx";
import { weddingFeatures, weddingMessages } from "./data/showcases.js";
import { useLanguage } from "../localization/LanguageContext.jsx";

export default function WeddingExperience() {
  const { t } = useLanguage();
  return (
    <div className="experience-page wedding-experience">
      <ExperienceSection label={t("wedding.features.label")} title={t("wedding.features.title")} description={t("wedding.features.description")} className="wedding-feature-section">
        <div className="wedding-feature-grid">{weddingFeatures.map((feature, index) => <article key={feature.title} className="wedding-feature"><span aria-hidden="true"><Icon name={feature.icon} size={28} /></span><h3>{t(`showcase.weddingFeatures.${index}.title`)}</h3><p>{t(`showcase.weddingFeatures.${index}.detail`)}</p></article>)}</div>
      </ExperienceSection>
      <ExperienceSection label={t("wedding.messages.label")} title={t("wedding.messages.title")} description={t("wedding.messages.description")}>
        <div className="response-grid wedding-responses">{weddingMessages.map((message) => <ResponseCard key={message.name} response={message} />)}</div>
      </ExperienceSection>
      <ExperienceCTA className="wedding-final" title={t("wedding.cta.title")} text={t("wedding.cta.text")} to="/invitations?category=wedding#collection-wedding" action={t("wedding.exploreInvitations")} />
    </div>
  );
}
