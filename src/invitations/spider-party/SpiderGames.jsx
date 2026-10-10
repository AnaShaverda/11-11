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
      setMessage(t('Perfect landing. Keep going!', 'ზუსტი დაშვება. გააგრძელე!'));
      elapsed.current += 950;
    } else setMessage(t('Almost! Aim for the cream zone and try again.', 'თითქმის! დაუმიზნე ღია ზონას და სცადე ისევ.'));
  }
  function collect(id) {
    if (!active) return;
    setCollected(items => addCollected(items, id));
    setMessage(t('One more good thing, collected.', 'კიდევ ერთი კარგი მომენტი.'));
  }

  return <div className={`sp-game ${comic ? 'sp-game-rescue' : 'sp-game-swing'}`}>
    <div className="sp-game-hud"><span>{comic ? t('PARTY RESCUE', 'წვეულების გადარჩენა') : t('ROOFTOP SWING', 'სახურავებზე თამაში')}</span><output aria-label={t('Collected', 'შეგროვებულია')} aria-live="polite">{String(collected.length).padStart(2, '0')} / 06</output></div>
    <div className="sp-game-scene" ref={stage} style={{ '--landings': collected.length }}>
      {comic ? <>
        <svg className="sp-game-webs" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">{collected.map(id => <path key={id} d={`M50 5 L${places[id][0]} ${places[id][1]}`} />)}</svg>
        <img className="sp-rescue-spider" src="/images/components/separated/birthday-comic-cutout-spider.webp" alt="" aria-hidden="true" />
        {treasures.map((name, id) => <button key={name} className={`sp-treasure ${collected.includes(id) ? 'is-collected' : ''}`} style={{ left: `${places[id][0]}%`, top: `${places[id][1]}%` }} disabled={!active || collected.includes(id)} onClick={() => collect(id)} aria-label={`${t('Collect party piece', 'შეაგროვე წვეულების ნაწილი')} ${id + 1}`}><InvitationArtwork name={collected.includes(id) ? 'check' : name} size={30} /></button>)}
      </> : <>
        <div className="sp-swing-rig"><img src="/images/components/separated/birthday-city-after-dark-spider.webp" alt="" aria-hidden="true" /></div>
        <div className="sp-rooftop-progress" aria-hidden="true">{treasures.map((name, id) => <span key={id} className={id < collected.length ? 'is-lit' : ''}><InvitationArtwork name="star" size={22} /></span>)}</div>
      </>}
      {(!active || won) && <div className="sp-game-overlay"><h3>{won ? t('A super way to celebrate.', 'ზეიმის სუპერ დასაწყისი.') : status === 'paused' ? t('Take your time.', 'არ იჩქარო.') : comic ? t('A little party rescue?', 'გადავარჩინოთ წვეულება?') : t('The rooftops are yours.', 'სახურავები გელოდება.')}</h3><p>{won ? t('Six little wins. One brilliant birthday.', 'ექვსი გამარჯვება. ერთი დაუვიწყარი დაბადების დღე.') : comic ? t('Collect all six pieces with a tap. No timer, just a little fun.', 'შეაგროვე ექვსივე ნაწილი შეხებით. დრო შეზღუდული არ არის.') : t('Release your web when the marker reaches the cream zone.', 'გაუშვი ქსელი, როცა მაჩვენებელი ღია ზონაში მოხვდება.')}</p><button className="sp-button" onClick={status === 'paused' && !won ? () => setStatus('playing') : restart}>{won ? t('Play again', 'კიდევ ვითამაშოთ') : status === 'paused' ? t('Resume', 'გაგრძელება') : t('Play', 'თამაში')}<InvitationArtwork name={status === 'paused' ? 'play' : 'arrow-right'} size={18} /></button>{won && <a href="#sp-rsvp" className="sp-text-link">{t('Now, make it official', 'ახლა კი, დაგვიდასტურე')}<InvitationArtwork name="arrow-right" size={18} /></a>}</div>}
    </div>
    {!comic && <div className="sp-swing-controls"><div className="sp-timing-track" aria-hidden="true"><span className="sp-timing-zone" /><span className="sp-timing-marker" ref={marker} /></div><button className="sp-button" disabled={!active} onClick={swing}>{reduced ? t('Swing to next rooftop', 'შემდეგ სახურავზე') : t('Release web', 'ქსელის გაშვება')}<InvitationArtwork name="arrow-up-right" size={18} /></button></div>}
    <div className="sp-game-bottom"><p role="status">{won ? t('All six collected!', 'ექვსივე შეგროვებულია!') : message || (comic ? t('Tap a piece, or use Tab and Enter.', 'შეეხე ნაწილს ან გამოიყენე Tab და Enter.') : reduced ? t('Reduced motion: each press moves you to the next rooftop.', 'შემცირებული მოძრაობა: ყოველი დაჭერა შემდეგ სახურავზე გადაგიყვანს.') : t('Tap the button, or focus it and press Space.', 'შეეხე ღილაკს ან მონიშნე და დააჭირე Space-ს.'))}</p>{active && <button className="sp-text-link" onClick={() => setStatus('paused')}>{t('Pause', 'პაუზა')}<InvitationArtwork name="pause" size={16} /></button>}</div>
  </div>;
}
