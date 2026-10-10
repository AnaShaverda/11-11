import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "../../localization/LanguageContext.jsx";
import InvitationArtwork from "../components/InvitationArtwork.jsx";

export default function RibbonSketchToolbar({ motion, onMotion, showMotion = true, backTo = "/invitations", backHistory = false, playHref, actionHref, actionLabel }) {
  const navigate = useNavigate();
  const { language, setLanguage } = useLanguage();
  const ka = language === "ka";
  const backLabel = backTo === "/" ? (ka ? "11:11-ზე დაბრუნება" : "Back to 11:11") : (ka ? "მოსაწვევების კოლექცია" : "Back to invitations");
  return <header className="rsb-toolbar">
    <Link to={backTo} aria-label={backHistory ? (ka ? "უკან დაბრუნება" : "Go back") : backLabel} onClick={backHistory ? event => { event.preventDefault(); navigate(-1); } : undefined}><InvitationArtwork name="arrow-left" size={20} /><span>11:11</span></Link>
    <div>
      <button type="button" onClick={() => setLanguage(ka ? "en" : "ka")} aria-label={ka ? "Switch to English" : "ქართულად"}>{ka ? "EN" : "KA"}</button>
      {actionHref && <a className="rsb-action-control" href={actionHref}>{actionLabel}</a>}
      {playHref && <a className="rsb-play-control" href={playHref}>{ka ? "თამაში" : "Play"}<InvitationArtwork name="play" size={16} /></a>}
      {showMotion && <button type="button" className="rsb-motion-control" aria-pressed={motion} onClick={onMotion}>{ka ? "მოძრაობა" : "Motion"}<span aria-hidden="true" className="rsb-motion-switch" /></button>}
    </div>
  </header>;
}
