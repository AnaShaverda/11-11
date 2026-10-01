import Icon from "../../components/ui/Icon.jsx";
import { Link } from "react-router-dom";
import InvitationGallery from "../../invitations/components/InvitationGallery.jsx";
import { invitationTemplates } from "../../invitations/data/templates.js";
import ExperienceSection from "./ExperienceSection.jsx";
import { useLanguage } from "../../localization/LanguageContext.jsx";

export default function ExperienceInvitations({ type, description, limit = 4 }) {
  const { t } = useLanguage();
  const templates = invitationTemplates.filter((template) => template.category === type).slice(0, limit);
  return (
    <ExperienceSection label={t("experience.firstHello")} title={t(`invitations.${type.toLowerCase()}.title`)} description={description} className="experience-invitations">
      <InvitationGallery templates={templates} />
      <Link className="section-text-link" to={`/invitations?type=${type}`}>{t(`experience.exploreAll.${type.toLowerCase()}`)} <Icon name="arrow-up-right" size={18} /></Link>
    </ExperienceSection>
  );
}
