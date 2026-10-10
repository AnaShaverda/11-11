import { useLanguage } from "../../localization/LanguageContext.jsx";
import { captionValue } from "../../localization/captionValues.js";
import { useEffect, useRef, useState } from 'react';
import InvitationArtwork from '../components/InvitationArtwork.jsx';
import { addCollected, isOnTarget, swingPosition, WEB_GOAL } from './gameModel.js';

const treasures = ['star', 'heart', 'sun', 'moon', 'flower', 'sparkle'];
const places = [[19, 35], [44, 23], [76, 31], [29, 67], [61, 56], [83, 72]];

function useReducedMotion() {
  const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(media.matches);
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);
  return reduced;
}

export default function SpiderGames({ comic, t, motion = true }) {
 const { language } = useLanguage();

  const [status, setStatus] = useState('ready');
  const [collected, setCollected] = useState([]);
  const [message, setMessage] = useState('');
  const stage = useRef(null);
  const marker = useRef(null);
  const position = useRef(50);
  const elapsed = useRef(0);
  const systemReduced = useReducedMotion();
  const reduced = systemReduced || !motion;
  const won = collected.length === WEB_GOAL;
  const active = status === 'playing' && !won;

  useEffect(() => {
    if (!active || comic || reduced) return;
    let frame;
    let previous;
    const tick = now => {
      if (previous !== undefined) elapsed.current += Math.min(now - previous, 50);
      previous = now;
      position.current = swingPosition(elapsed.current);
      marker.current?.style.setProperty('left', `${position.current}%`);
      stage.current?.style.setProperty('--swing-angle', `${(position.current - 50) * .75}deg`);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, comic, reduced]);

  // Pause when a guest leaves the game or switches tabs.
  useEffect(() => {
    if (!active) return;
    const pause = () => setStatus(s => s === 'playing' ? 'paused' : s);
    const visibility = () => { if (document.hidden) pause(); };
    const observer = new IntersectionObserver(([entry]) => { if (!entry.isIntersecting) pause(); });
    if (stage.current) observer.observe(stage.current);
    document.addEventListener('visibilitychange', visibility);
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', visibility); };
  }, [active]);

  function restart() {
    setCollected([]); setMessage(''); elapsed.current = 0; position.current = 50; setStatus('playing');
  }
  function swing() {
    if (!active) return;
    if (reduced || isOnTarget(position.current)) {
      setCollected(items => addCollected(items, items.length));
      setMessage(captionValue("invitations.spider-party.SpiderGames.caption1", language));
      elapsed.current += 950;
    } else setMessage(captionValue("invitations.spider-party.SpiderGames.caption2", language));
  }
  function collect(id) {
    if (!active) return;
    setCollected(items => addCollected(items, id));
    setMessage(captionValue("invitations.spider-party.SpiderGames.caption3", language));
  }

  return <div className={`sp-game ${comic ? 'sp-game-rescue' : 'sp-game-swing'}`}>
    <div className="sp-game-hud"><span>{comic ? captionValue("invitations.spider-party.SpiderGames.caption4", language) : captionValue("invitations.spider-party.SpiderGames.caption5", language)}</span><output aria-label={captionValue("invitations.spider-party.SpiderGames.caption6", language)} aria-live="polite">{String(collected.length).padStart(2, '0')} / 06</output></div>
    <div className="sp-game-scene" ref={stage} style={{ '--landings': collected.length }}>
      {comic ? <>
        <svg className="sp-game-webs" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">{collected.map(id => <path key={id} d={`M50 5 L${places[id][0]} ${places[id][1]}`} />)}</svg>
        <img className="sp-rescue-spider" src="/images/components/separated/birthday-comic-cutout-spider.webp" alt="" aria-hidden="true" />
        {treasures.map((name, id) => <button key={name} className={`sp-treasure ${collected.includes(id) ? 'is-collected' : ''}`} style={{ left: `${places[id][0]}%`, top: `${places[id][1]}%` }} disabled={!active || collected.includes(id)} onClick={() => collect(id)} aria-label={`${captionValue("invitations.spider-party.SpiderGames.caption7", language)} ${id + 1}`}><InvitationArtwork name={collected.includes(id) ? 'check' : name} size={30} /></button>)}
      </> : <>
        <div className="sp-swing-rig"><img src="/images/components/separated/birthday-city-after-dark-spider.webp" alt="" aria-hidden="true" /></div>
        <div className="sp-rooftop-progress" aria-hidden="true">{treasures.map((name, id) => <span key={id} className={id < collected.length ? 'is-lit' : ''}><InvitationArtwork name="star" size={22} /></span>)}</div>
      </>}
      {(!active || won) && <div className="sp-game-overlay"><h3>{won ? captionValue("invitations.spider-party.SpiderGames.caption8", language) : status === 'paused' ? captionValue("invitations.spider-party.SpiderGames.caption9", language) : comic ? captionValue("invitations.spider-party.SpiderGames.caption10", language) : captionValue("invitations.spider-party.SpiderGames.caption11", language)}</h3><p>{won ? captionValue("invitations.spider-party.SpiderGames.caption12", language) : comic ? captionValue("invitations.spider-party.SpiderGames.caption13", language) : captionValue("invitations.spider-party.SpiderGames.caption14", language)}</p><button className="sp-button" onClick={status === 'paused' && !won ? () => setStatus('playing') : restart}>{won ? captionValue("invitations.spider-party.SpiderGames.caption15", language) : status === 'paused' ? captionValue("invitations.spider-party.SpiderGames.caption16", language) : captionValue("invitations.spider-party.SpiderGames.caption17", language)}<InvitationArtwork name={status === 'paused' ? 'play' : 'arrow-right'} size={18} /></button>{won && <a href="#sp-rsvp" className="sp-text-link">{captionValue("invitations.spider-party.SpiderGames.caption18", language)}<InvitationArtwork name="arrow-right" size={18} /></a>}</div>}
    </div>
    {!comic && <div className="sp-swing-controls"><div className="sp-timing-track" aria-hidden="true"><span className="sp-timing-zone" /><span className="sp-timing-marker" ref={marker} /></div><button className="sp-button" disabled={!active} onClick={swing}>{reduced ? captionValue("invitations.spider-party.SpiderGames.caption19", language) : captionValue("invitations.spider-party.SpiderGames.caption20", language)}<InvitationArtwork name="arrow-up-right" size={18} /></button></div>}
    <div className="sp-game-bottom"><p role="status">{won ? captionValue("invitations.spider-party.SpiderGames.caption21", language) : message || (comic ? captionValue("invitations.spider-party.SpiderGames.caption22", language) : reduced ? captionValue("invitations.spider-party.SpiderGames.caption23", language) : captionValue("invitations.spider-party.SpiderGames.caption24", language))}</p>{active && <button className="sp-text-link" onClick={() => setStatus('paused')}>{captionValue("invitations.spider-party.SpiderGames.caption25", language)}<InvitationArtwork name="pause" size={16} /></button>}</div>
  </div>;
}
