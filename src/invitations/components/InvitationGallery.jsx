import InvitationCard from "./InvitationCard.jsx";

export default function InvitationGallery({ templates, className = "" }) {
  return <div className={`invitation-gallery ${className}`}>{templates.map((template) => <InvitationCard key={template.id} template={template} />)}</div>;
}
