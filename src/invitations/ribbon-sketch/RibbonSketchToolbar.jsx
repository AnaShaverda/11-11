import { captionValue } from "../../localization/captionValues.js";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "../../localization/LanguageContext.jsx";
import InvitationArtwork from "../components/InvitationArtwork.jsx";

export default function RibbonSketchToolbar({ motion, onMotion, showMotion = true, backTo = "/invitations", backHistory = false, playHref, actionHref, actionLabel }) {
  const navigate = useNavigate();
  const { language, setLanguage } = useLanguage();
  const ka = language === "ka";
  const backLabel = backTo === "/" ? (captionValue("ui.invitations.ribbon-sketch.RibbonSketchToolbar.backTo1111", language)) : (captionValue("ui.invitations.ribbon-sketch.RibbonSketchToolbar.backToInvitations", language));
  return <header className="rsb-toolbar">
    <Link to={backTo} aria-label={backHistory ? (captionValue("ui.invitations.ribbon-sketch.RibbonSketchToolbar.goBack", language)) : backLabel} onClick={backHistory ? event => { event.preventDefault(); navigate(-1); } : undefined}><InvitationArtwork name="arrow-left" size={20} /><span>11:11</span></Link>
    <div>
      <button type="button" onClick={() => setLanguage(ka ? "en" : "ka")} aria-label={captionValue("ui.invitations.ribbon-sketch.RibbonSketchToolbar.text", language)}>{captionValue("ui.invitations.ribbon-sketch.RibbonSketchToolbar.ka", language)}</button>
      {actionHref && <a className="rsb-action-control" href={actionHref}>{actionLabel}</a>}
      {playHref && <a className="rsb-play-control" href={playHref}>{captionValue("ui.invitations.ribbon-sketch.RibbonSketchToolbar.play", language)}<InvitationArtwork name="play" size={16} /></a>}
      {showMotion && <button type="button" className="rsb-motion-control" aria-pressed={motion} onClick={onMotion}>{captionValue("ui.invitations.ribbon-sketch.RibbonSketchToolbar.motion", language)}<span aria-hidden="true" className="rsb-motion-switch" /></button>}
    </div>
  </header>;
}
