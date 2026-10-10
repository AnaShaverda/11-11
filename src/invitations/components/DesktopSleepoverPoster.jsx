import { captionValue } from "../../localization/captionValues.js";
import Mark from './InvitationArtwork.jsx';
import './DesktopSleepoverPoster.css';

export default function DesktopSleepoverPoster({ sample, language, className = '', ariaLabel }) {
  return <div className={`ds-poster ${className}`} role="img" aria-label={ariaLabel || sample.title}>
    <div className="ds-poster-heading">{captionValue("invitations.components.DesktopSleepoverPoster.caption1", language)}</div>
    <div className="ds-poster-photo"><div className="ds-poster-bar"><span>memories.jpg</span><Mark name="close" size={12} /></div><img src="/images/birthday/y2k-experience/sleepover-satin.png" alt="" loading="lazy" /></div>
    <div className="ds-poster-message"><div className="ds-poster-bar"><span>{captionValue("invitations.components.DesktopSleepoverPoster.caption2", language)}</span><Mark name="heart" size={12} /></div><strong>{sample.posterName}</strong><p>{sample.line}</p><div className="ds-poster-date">{sample.date} · {sample.location}</div></div>
  </div>;
}
