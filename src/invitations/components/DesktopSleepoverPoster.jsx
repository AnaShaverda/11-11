import Mark from './InvitationArtwork.jsx';
import './DesktopSleepoverPoster.css';

export default function DesktopSleepoverPoster({ sample, language, className = '', ariaLabel }) {
  return <div className={`ds-poster ${className}`} role="img" aria-label={ariaLabel || sample.title}>
    <div className="ds-poster-heading">{language === 'ka' ? 'რეტრო პიჟამა წვეულება' : 'Desktop Sleepover'}</div>
    <div className="ds-poster-photo"><div className="ds-poster-bar"><span>memories.jpg</span><Mark name="close" size={12} /></div><img src="/images/birthday/y2k-experience/sleepover-satin.png" alt="" loading="lazy" /></div>
    <div className="ds-poster-message"><div className="ds-poster-bar"><span>{language === 'ka' ? 'მოწვეული ხარ' : 'you’re invited'}</span><Mark name="heart" size={12} /></div><strong>{sample.posterName}</strong><p>{sample.line}</p><div className="ds-poster-date">{sample.date} · {sample.location}</div></div>
  </div>;
}
