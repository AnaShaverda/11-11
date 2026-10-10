import './PocketArcadePoster.css';

export default function PocketArcadePoster({ sample, language, className = '', ariaLabel }) {
  return <div className={`pa-poster ${className}`} role="img" aria-label={ariaLabel || sample.title}>
    <p className="pa-poster-kicker">{language === 'ka' ? 'მოწვეული ხარ' : 'YOU’RE INVITED'}</p>
    <strong className="pa-poster-title">Y2K PARTY</strong>
    <div className="pa-poster-case"><img src="/images/birthday/y2k-experience/invitation-case.png" alt="" loading="lazy" width="1632" height="976" /><div className="pa-poster-insert"><span>{sample.posterName}</span><small>{language === 'ka' ? 'დაბადების დღე' : 'BIRTHDAY MIX'}</small><b>{sample.date}</b><small>{sample.location}</small></div></div>
    <p className="pa-poster-line">{language === 'ka' ? 'იგივე მეგობრები. ახალი რეკორდები.' : 'SAME FRIENDS. NEW HIGH SCORES.'}</p>
  </div>;
}
