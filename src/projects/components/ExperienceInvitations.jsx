import { Link } from "react-router-dom";
import InvitationGallery from "../../invitations/components/InvitationGallery.jsx";
import { invitationTemplates } from "../../invitations/data/templates.js";
import ExperienceSection from "./ExperienceSection.jsx";

export default function ExperienceInvitations({ type, description, limit = 4 }) {
  const templates = invitationTemplates.filter((template) => template.category === type).slice(0, limit);
  return (
    <ExperienceSection label="THE FIRST HELLO" title={`${type} invitations`} description={description} className="experience-invitations">
      <InvitationGallery templates={templates} />
      <Link className="section-text-link" to={`/invitations?type=${type}`}>Explore all {type.toLowerCase()} invitations <span aria-hidden="true">↗</span></Link>
    </ExperienceSection>
  );
}
