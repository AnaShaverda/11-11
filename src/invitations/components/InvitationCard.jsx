import { Link } from "react-router-dom";

function InvitationArtwork({ template }) {
  return (
    <span className={`invitation-art art-${template.design}`} aria-hidden="true">
      <span className="art-ornament">✦</span>
      <span className="art-title">{template.design === "retro-pop" ? "LET’S CELEBRATE" : template.design === "editorial" ? "M & L" : template.design === "disco" ? "ALL NIGHT" : template.design === "golden" ? "together" : "AFTER DARK"}</span>
      <span className="art-line" />
      <span className="art-small">11:11 INVITES</span>
    </span>
  );
}

export default function InvitationCard({ template }) {
  const content = (
    <>
      <InvitationArtwork template={template} />
      <span className="invitation-card-bottom">
        <span><strong>{template.title}</strong><small>{template.eventTypes.join(" · ")} / {template.style}</small></span>
        <span className="invitation-card-action">{template.status === "ready" ? "Preview ↗" : "Coming soon"}</span>
      </span>
    </>
  );

  return template.status === "ready" ? (
    <Link className="invitation-card" to={`/invitations/${template.slug}`} aria-label={`Preview ${template.title} invitation`}>{content}</Link>
  ) : (
    <article className="invitation-card invitation-card-soon">{content}</article>
  );
}
