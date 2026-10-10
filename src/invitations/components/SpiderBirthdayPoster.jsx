import './SpiderBirthdayPoster.css';

export default function SpiderBirthdayPoster({ sample, language, theme, className = '', ariaLabel }) {
  const comic = theme === 'comic-cutout';
  const ka = language === 'ka';
  const age = sample.posterAge ?? sample.age;
  return <div className={`sp-poster ${comic ? 'sp-poster-comic' : 'sp-poster-midnight'} ${className}`} lang={language} role="img" aria-label={ariaLabel || sample.title}>
    <img className="sp-poster-scene" src={`/images/birthday/spider-party/${comic ? 'comic-city' : 'midnight-city'}.webp`} alt="" loading="lazy" />
    <div className="sp-poster-copy"><strong>{sample.headline ?? (comic ? (ka ? 'წვეულება!' : 'PARTY!') : (ka ? 'სუპერ\nდაბადების დღე' : 'A SUPER\nBIRTHDAY'))}</strong><p>{sample.posterName ?? sample.name}<br />{age ? (ka ? `ხდება ${age}` : `TURNS ${age}`) : (ka ? 'დაბადების დღე' : 'BIRTHDAY EDITION')}</p><small>{sample.date}<br />{sample.time} / {sample.location}</small></div>
    {age && <span className="sp-poster-age" aria-hidden="true">{age}</span>}
    <img className="sp-poster-spider" src={`/images/components/separated/birthday-${comic ? 'retro-sport' : 'city-after-dark'}-spider.webp`} alt="" loading="lazy" />
  </div>;
}
