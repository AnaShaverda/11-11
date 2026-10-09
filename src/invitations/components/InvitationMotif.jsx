import "../../styles/invitation-artwork.css";
export default function InvitationMotif({ name, className = "" }) {
  return <span className={`invitation-motif${className ? ` ${className}` : ""}`} style={{ "--invitation-motif-url": `url('/images/invitations/ornaments/${name}.svg')` }} aria-hidden="true" />;
}

