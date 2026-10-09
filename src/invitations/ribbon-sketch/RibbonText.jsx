import InvitationArtwork from "../components/InvitationArtwork.jsx";

// Legacy translated copy includes decorative glyphs; render the actual SVGs.
const names = { "\u2661": "heart-filled", "\u2665": "heart-filled", "\u2192": "arrow-right", "\u2190": "arrow-left", "\u2197": "arrow-right", "\u203a": "chevron-right", "\u00d7": "close" };
export default function RibbonText({ children }) {
  return String(children).split(/([\u2661\u2665\u2192\u2190\u2197\u203a\u00d7])/).map((part, index) => names[part] ? <InvitationArtwork key={index} name={names[part]} size="1em" /> : part);
}
