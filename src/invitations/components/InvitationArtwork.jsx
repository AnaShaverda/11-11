import "../../styles/invitation-artwork.css";

const artworkNames = new Set(["menu", "chevron-down", "chevron-right", "eye", "eye-off", "arrow-left", "arrow-right", "arrow-up-right", "arrow-down-right", "arrow-down", "close", "plus", "minus", "check", "sun", "moon", "mail", "heart", "sparkle", "asterisk", "heart-filled", "star", "flower", "image", "help-circle", "swap", "circle-dot", "pen", "clock", "map-pin", "filter", "play", "pause", "calendar"]);

export default function InvitationArtwork({ name, size = 20, className = "" }) {
  const art = artworkNames.has(name) ? name : "sparkle";
  return <span className={`ui-icon invitation-svg-art${className ? ` ${className}` : ""}`} style={{ width: size, height: size, "--invitation-art-url": `url('/images/invitations/marks/${art}.svg')` }} aria-hidden="true" />;
}

