import './PinkAfterpartyPoster.css';
export default function PinkAfterpartyPoster({ sample, language, className = '', ariaLabel }) {
  return <div className={`ap-poster ${className}`} lang={language} role="img" aria-label={ariaLabel || sample.title}><img src="/images/birthday/pink-glam/afterparty/hero.webp" alt="" loading="lazy" /><div className="ap-poster-copy"><strong>{language === 'ka' ? 'ვარდისფერი\nძალიან\nგვიხდება.' : 'PINK\nLOOKS\nGOOD\nON US.'}</strong><p>{sample.title}</p><small>{sample.date} · {sample.location}</small></div></div>;
}
