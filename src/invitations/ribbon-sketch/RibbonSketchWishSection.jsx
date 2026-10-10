import RibbonSectionBubbles from "./RibbonSectionBubbles.jsx";
import { useRibbonCopy } from "./copy.js";
import InvitationArtwork from "../components/InvitationArtwork.jsx";

export default function RibbonSketchWishSection({ actions, state }) {
  const tr = useRibbonCopy();
  return <section className="rsb-wishes rsb-reveal" id="birthday-wish" aria-labelledby="rsb-wish-title"><RibbonSectionBubbles />
    <div className="rsb-wish-intro">
      <h2 id="rsb-wish-title">{tr("ribbonSketch.aBirthdayWish.54")}</h2>
      <p className="rsb-hand">{tr("ribbonSketch.aLittleLoveForAniko.62")}</p>
    </div>
    <form className="rsb-wish-form rsb-stationery" data-name="Leave a little love wishes" onSubmit={actions.wish}>
      <label>{tr("ribbonSketch.yourName.55")}<input name="name" autoComplete="name" required maxLength={80} value={state.guestName} onChange={event => actions.guestName(event.target.value)} placeholder={tr("ribbonSketch.yourName.55")} /></label>
      <label>{tr("ribbonSketch.yourBirthdayWish.61")}<textarea name="message" required maxLength={500} rows={6} defaultValue={state.wish?.message ?? ""} placeholder={tr("ribbonSketch.aLittleLoveForAniko.62")} /></label>
      <button className="rsb-button" type="submit">{tr("ribbonSketch.sendYourWish.63")}<InvitationArtwork name="arrow-right" size={20} /></button>
      <p className="rsb-local">{tr("ribbonSketch.previewInvitationWishesStayOnThisDevice.64")}</p>
    </form>
  </section>;
}
