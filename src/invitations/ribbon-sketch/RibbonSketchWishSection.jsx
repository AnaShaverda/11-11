import RibbonSectionBubbles from "./RibbonSectionBubbles.jsx";
import { useRibbonCopy } from "./copy.js";
import InvitationArtwork from "../components/InvitationArtwork.jsx";

export default function RibbonSketchWishSection({ actions, state }) {
  const tr = useRibbonCopy();
  return <section className="rsb-wishes rsb-reveal" id="birthday-wish" aria-labelledby="rsb-wish-title"><RibbonSectionBubbles />
    <div className="rsb-wish-intro">
      <h2 id="rsb-wish-title">{tr("A birthday wish")}</h2>
      <p className="rsb-hand">{tr("A little love for Mia…")}</p>
    </div>
    <form className="rsb-wish-form rsb-stationery" data-name="Leave a little love wishes" onSubmit={actions.wish}>
      <label>{tr("Your name")}<input name="name" autoComplete="name" required maxLength={80} value={state.guestName} onChange={event => actions.guestName(event.target.value)} placeholder={tr("Your name")} /></label>
      <label>{tr("Your birthday wish")}<textarea name="message" required maxLength={500} rows={6} defaultValue={state.wish?.message ?? ""} placeholder={tr("A little love for Mia…")} /></label>
      <button className="rsb-button" type="submit">{tr("Send your wish")}<InvitationArtwork name="arrow-right" size={20} /></button>
      <p className="rsb-local">{tr("Preview invitation · Wishes stay on this device.")}</p>
    </form>
  </section>;
}
