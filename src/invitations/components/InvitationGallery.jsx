import InvitationCard from "./InvitationCard.jsx";

export default function InvitationGallery({ templates, className = "" }) {
  return <div className={`invitation-gallery ${className}`}>{templates.map((template, index) => <InvitationCard key={template.id} template={template} animationIndex={index} />)}</div>;
}
