import { captionValue } from "../../localization/captionValues.js";
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../localization/LanguageContext.jsx';
import InvitationArtwork from '../components/InvitationArtwork.jsx';
import RibbonSketchToolbar from '../ribbon-sketch/RibbonSketchToolbar.jsx';
import { ribbonPhotos, ribbonPhotoCaptions } from '../ribbon-sketch/assets.js';
import '../ribbon-sketch/fonts.css';
import '../stationery-birthday.css';
const assets = '/images/components/separated/';
function Art({
  name,
  className = ''
}) {
  return <img className={className} src={name.startsWith('/') ? name : `${assets}${name}.webp`} alt="" draggable="false" />;
}
function Chapter({
  id,
  className = '',
  children
}) {
  const section = useRef(),
    scene = useRef();
  useLayoutEffect(() => {
    let frame;
    const measure = () => {
      if (!section.current || !scene.current) return;
      const styles = getComputedStyle(section.current);
      const available = section.current.clientHeight - parseFloat(styles.paddingTop) - parseFloat(styles.paddingBottom);
      scene.current.style.setProperty('--fit', Math.min(1, available / Math.max(scene.current.offsetHeight, 1)));
    };
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (!section.current) return;
        const rect = section.current.getBoundingClientRect();
        const p = Math.max(-1, Math.min(1, rect.top / innerHeight));
        section.current.style.setProperty('--travel', p);
        section.current.style.setProperty('--fade', Math.max(.15, 1 - Math.abs(p) * .75));
      });
    };
    const resize = new ResizeObserver(measure);
    resize.observe(section.current);
    resize.observe(scene.current);
    document.fonts.ready.then(measure);
    window.addEventListener('scroll', update, {
      passive: true
    });
    window.addEventListener('resize', update);
    update();
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);
  return <section id={id} ref={section} className={`sb-chapter ${className}`}><div ref={scene} className="sb-scene">{children}</div></section>;
}
function Envelope() {
  return <img className="sb-envelope-art" src="/images/birthday/white-and-blue/experience/wish-envelope.webp" alt="" />;
}
function calendar() {
  const data = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//11:11//Birthday//EN', 'BEGIN:VEVENT', 'UID:aniko-birthday-20270523@11-11', 'DTSTAMP:20261010T000000Z', 'DTSTART:20270523T130000Z', 'DTEND:20270523T170000Z', 'SUMMARY:Aniko’s Birthday', 'LOCATION:Tbilisi', 'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
  const url = URL.createObjectURL(new Blob([data], {
    type: 'text/calendar;charset=utf-8'
  }));
  const a = document.createElement('a');
  a.href = url;
  a.download = 'mias-birthday.ics';
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
function Memories({
  t
}) {
 const { language } = useLanguage();

  const [index, setIndex] = useState(0),
    [uploads, setUploads] = useState([]),
    [viewing, setViewing] = useState(null);
  const input = useRef(),
    urls = useRef([]),
    start = useRef(null),
    viewer = useRef();
  const photos = [...uploads, ...ribbonPhotos];
  useEffect(() => () => urls.current.forEach(URL.revokeObjectURL), []);
  function add(e) {
    const file = e.target.files?.[0];
    if (!file?.type.startsWith('image/')) return;
    const url = URL.createObjectURL(file);
    urls.current.push(url);
    setUploads(p => [url, ...p]);
    setIndex(0);
    e.target.value = '';
  }
  function move(delta) {
    setIndex(i => (i + delta + photos.length) % photos.length);
  }
  useEffect(() => {
    if (viewing !== null && !viewer.current.open) viewer.current.showModal();
  }, [viewing]);
  function closeViewer() {
    viewer.current.close();
    setViewing(null);
  }
  return <Chapter id="memories" className="sb-memories"><div className="sb-section-heading"><h2>{captionValue("invitations.pages.StationeryBirthdayExperience.caption1", language)}</h2><p>{captionValue("invitations.pages.StationeryBirthdayExperience.caption2", language)}</p></div><div className="sb-photo-stage" onTouchStart={e => {
      start.current = e.touches[0].clientX;
    }} onTouchEnd={e => {
      if (start.current !== null) {
        const d = e.changedTouches[0].clientX - start.current;
        if (Math.abs(d) > 45) move(d < 0 ? 1 : -1);
        start.current = null;
      }
    }}>{<button className="sb-camera" onClick={() => input.current.click()} aria-label={captionValue("invitations.pages.StationeryBirthdayExperience.caption3", language)}><img src={"/images/birthday/white-and-blue/experience/instant-camera.webp"} alt="" /><span>{captionValue("invitations.pages.StationeryBirthdayExperience.caption4", language)}</span></button>}<div className="sb-photo-prints">{[0, 1, 2].map(offset => <figure key={`${index}-${offset}`} className={`sb-print sb-print-${offset}`}><button type="button" className="sb-photo-open" aria-label={captionValue("invitations.pages.StationeryBirthdayExperience.caption5", language) + (ribbonPhotoCaptions[photos[(index + offset) % photos.length]] ?? captionValue("invitations.pages.StationeryBirthdayExperience.caption6", language))} onClick={() => setViewing((index + offset) % photos.length)}><img loading="lazy" src={photos[(index + offset) % photos.length]} alt={captionValue("invitations.pages.StationeryBirthdayExperience.caption7", language)} /></button><figcaption>{ribbonPhotoCaptions[photos[(index + offset) % photos.length]] ?? captionValue("invitations.pages.StationeryBirthdayExperience.caption8", language)}</figcaption></figure>)}</div></div><div className="sb-memory-ornaments" aria-hidden="true">{<img src="/images/birthday/white-and-blue/experience/wish-envelope.webp" alt="" />}</div><div className="sb-gallery-controls"><button onClick={() => move(-1)} aria-label={captionValue("invitations.pages.StationeryBirthdayExperience.caption9", language)}><InvitationArtwork name="arrow-left" size={24} /></button><span aria-live="polite">{index + 1} / {photos.length}</span><button onClick={() => move(1)} aria-label={captionValue("invitations.pages.StationeryBirthdayExperience.caption10", language)}><InvitationArtwork name="arrow-right" size={24} /></button></div>{<p className="sb-local">{captionValue("invitations.pages.StationeryBirthdayExperience.caption11", language)}</p>}<input ref={input} type="file" accept="image/*" hidden onChange={add} /><dialog ref={viewer} className="sb-photo-dialog" aria-label={captionValue("invitations.pages.StationeryBirthdayExperience.caption12", language)} onCancel={() => setViewing(null)} onClick={e => {
      if (e.target === viewer.current) closeViewer();
    }} onKeyDown={e => {
      if (e.key === 'ArrowRight') setViewing(i => (i + 1) % photos.length);
      if (e.key === 'ArrowLeft') setViewing(i => (i - 1 + photos.length) % photos.length);
    }}>{viewing !== null && <><button className="sb-viewer-close" onClick={closeViewer} aria-label={captionValue("invitations.pages.StationeryBirthdayExperience.caption13", language)}><InvitationArtwork name="close" size={24} /></button><figure><img src={photos[viewing]} alt={captionValue("invitations.pages.StationeryBirthdayExperience.caption14", language)} /><figcaption>{ribbonPhotoCaptions[photos[viewing]] ?? captionValue("invitations.pages.StationeryBirthdayExperience.caption15", language)}</figcaption></figure><div className="sb-gallery-controls"><button onClick={() => setViewing(i => (i - 1 + photos.length) % photos.length)} aria-label={captionValue("invitations.pages.StationeryBirthdayExperience.caption16", language)}><InvitationArtwork name="arrow-left" size={22} /></button><span>{viewing + 1} / {photos.length}</span><button onClick={() => setViewing(i => (i + 1) % photos.length)} aria-label={captionValue("invitations.pages.StationeryBirthdayExperience.caption17", language)}><InvitationArtwork name="arrow-right" size={22} /></button></div></>}</dialog></Chapter>;
}
function ReplyForm({
  kind,
  t,
  storageKey
}) {
 const { language } = useLanguage();

  const [saved, setSaved] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(storageKey))?.[kind] ?? null;
    } catch {
      return null;
    }
  });
  const [name, setName] = useState(saved?.name ?? ''),
    [message, setMessage] = useState(saved?.message ?? ''),
    [attending, setAttending] = useState(saved?.attending ?? 'yes'),
    [persisted, setPersisted] = useState(true);
  const wish = kind === 'wish';
  function save(e) {
    e.preventDefault();
    if (!name.trim() || wish && !message.trim()) return;
    const value = {
      name: name.trim(),
      ...(wish ? {
        message: message.trim()
      } : {
        attending
      })
    };
    try {
      const all = JSON.parse(localStorage.getItem(storageKey)) ?? {};
      localStorage.setItem(storageKey, JSON.stringify({
        ...all,
        [kind]: value
      }));
      setPersisted(true);
    } catch {
      setPersisted(false);
    }
    setSaved(value);
  }
  return <Chapter id={kind} className={`sb-reply ${wish ? 'sb-wishes' : 'sb-rsvp'}`}><div className="sb-reply-intro"><h2>{wish ? captionValue("invitations.pages.StationeryBirthdayExperience.caption18", language) : captionValue("invitations.pages.StationeryBirthdayExperience.caption19", language)}</h2>{wish ? <Envelope /> : <img className="sb-slice-art" src="/images/birthday/white-and-blue/experience/cake-slice.webp" alt="" />}<p>{wish ? captionValue("invitations.pages.StationeryBirthdayExperience.caption20", language) : captionValue("invitations.pages.StationeryBirthdayExperience.caption21", language)}</p></div><div className={`sb-form-paper ${saved ? 'is-saved' : ''}`}>{saved ? <div className="sb-confirmation" role="status"><h3>{wish ? captionValue("invitations.pages.StationeryBirthdayExperience.caption22", language) : saved.attending === 'yes' ? captionValue("invitations.pages.StationeryBirthdayExperience.caption23", language) : captionValue("invitations.pages.StationeryBirthdayExperience.caption24", language)}</h3><p>{saved.name}</p>{wish && <blockquote>{saved.message}</blockquote>}<button className="sb-button" onClick={() => setSaved(null)}>{(wish ? captionValue("ui.invitations.pages.StationeryBirthdayExperience.editYourWish", language) : captionValue("ui.invitations.pages.StationeryBirthdayExperience.changeMyResponse", language))}</button></div> : <form onSubmit={save}><h3>{wish ? captionValue("invitations.pages.StationeryBirthdayExperience.caption25", language) : captionValue("invitations.pages.StationeryBirthdayExperience.caption26", language)}</h3><label htmlFor={`${kind}-name`}>{captionValue("invitations.pages.StationeryBirthdayExperience.caption27", language)}</label><input id={`${kind}-name`} required maxLength={80} placeholder={captionValue("invitations.pages.StationeryBirthdayExperience.caption28", language)} autoComplete="given-name" value={name} onChange={e => setName(e.target.value)} pattern=".*\S.*" />{wish ? <><label htmlFor="birthday-wish">{captionValue("invitations.pages.StationeryBirthdayExperience.caption29", language)}</label><textarea id="birthday-wish" placeholder={captionValue("invitations.pages.StationeryBirthdayExperience.caption30", language)} required maxLength={600} value={message} onChange={e => setMessage(e.target.value)} onInput={e => e.target.setCustomValidity(e.target.value.trim() ? '' : captionValue("invitations.pages.StationeryBirthdayExperience.caption31", language))} /></> : <fieldset><legend>{captionValue("invitations.pages.StationeryBirthdayExperience.caption32", language)}</legend>{['yes', 'no'].map(v => <label key={v} className={attending === v ? 'is-selected' : ''}><input type="radio" name="attendance" value={v} checked={attending === v} onChange={() => setAttending(v)} />{v === 'yes' ? captionValue("invitations.pages.StationeryBirthdayExperience.caption33", language) : captionValue("invitations.pages.StationeryBirthdayExperience.caption34", language)}</label>)}</fieldset>}<button className="sb-button" type="submit">{wish ? captionValue("invitations.pages.StationeryBirthdayExperience.caption35", language) : captionValue("invitations.pages.StationeryBirthdayExperience.caption36", language)}</button></form>}<p className="sb-local">{persisted ? captionValue("invitations.pages.StationeryBirthdayExperience.caption37", language) : captionValue("invitations.pages.StationeryBirthdayExperience.caption38", language)}</p></div></Chapter>;
}
export default function StationeryBirthdayExperience() {
  const {
    language
  } = useLanguage();
  const t = (captionKey, values) => captionValue(captionKey, language, values);
  const [motion, setMotion] = useState(() => !matchMedia('(prefers-reduced-motion: reduce)').matches),
    [opened, setOpened] = useState(false),
    [candles, setCandles] = useState([]);
  const details = useRef();
  useEffect(() => {
    const previous = document.documentElement.style.scrollSnapType;
    document.documentElement.style.scrollSnapType = 'y proximity';
    window.scrollTo(0, 0);
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setMotion(!media.matches);
    media.addEventListener('change', update);
    return () => {
      media.removeEventListener('change', update);
      document.documentElement.style.scrollSnapType = previous;
    };
  }, []);
  function reveal() {
    setOpened(true);
    requestAnimationFrame(() => {
      details.current.scrollIntoView({
        behavior: motion ? 'smooth' : 'instant'
      });
      details.current.focus({
        preventScroll: true
      });
    });
  }
  return <main lang={language} className={`sb-experience sb-blue ${motion ? 'sb-motion' : ''}`}><div className="sb-hero-wrap"><RibbonSketchToolbar motion={motion} onMotion={() => setMotion(v => !v)} /><Chapter className="sb-hero">{<><div className="sb-hero-art"><Art name="blue-cake" /></div><div className="sb-hero-copy"><h1>{captionValue("invitations.pages.StationeryBirthdayExperience.caption39", language)}</h1><p>{captionValue("invitations.pages.StationeryBirthdayExperience.caption40", language)}</p><div className="sb-date">23 MAY 2027 <span /> 17:00 <span /> TBILISI</div><button className="sb-button" onClick={reveal}>{captionValue("invitations.pages.StationeryBirthdayExperience.caption41", language)}<InvitationArtwork name="arrow-right" size={20} /></button></div></>}</Chapter></div><div ref={details} tabIndex={-1} className={`sb-details-wrap ${opened ? 'is-open' : ''}`}><Chapter id="details" className="sb-details">{<div className="sb-open-paper"><div><h2>{captionValue("invitations.pages.StationeryBirthdayExperience.caption42", language)}</h2><p>{captionValue("invitations.pages.StationeryBirthdayExperience.caption43", language)}</p><dl><div><dt>{captionValue("invitations.pages.StationeryBirthdayExperience.caption44", language)}</dt><dd>23 {captionValue("invitations.pages.StationeryBirthdayExperience.caption45", language)} 2027</dd></div><div><dt>{captionValue("invitations.pages.StationeryBirthdayExperience.caption46", language)}</dt><dd>17:00</dd></div><div><dt>{captionValue("invitations.pages.StationeryBirthdayExperience.caption47", language)}</dt><dd>{captionValue("invitations.pages.StationeryBirthdayExperience.caption48", language)}</dd></div></dl></div><div><h2>{captionValue("invitations.pages.StationeryBirthdayExperience.caption49", language)}</h2><ol>{[captionValue("invitations.pages.StationeryBirthdayExperience.caption50", language), captionValue("invitations.pages.StationeryBirthdayExperience.caption51", language), captionValue("invitations.pages.StationeryBirthdayExperience.caption52", language)].map((text, i) => <li key={i}><time>{['17:00', '18:00', '19:00'][i]}</time>{text}</li>)}</ol><button className="sb-button" onClick={calendar}>{captionValue("invitations.pages.StationeryBirthdayExperience.caption53", language)}</button></div></div>}</Chapter></div><Chapter id="play" className="sb-play"><h2>{captionValue("invitations.pages.StationeryBirthdayExperience.caption54", language)}</h2>{<><p>{captionValue("invitations.pages.StationeryBirthdayExperience.caption55", language)}</p><div className="sb-candle-cake"><Art name="blue-cake" />{[0, 1, 2].map(i => <button key={i} aria-label={captionValue("ui.invitations.pages.StationeryBirthdayExperience.blowOutCandle", language, { value1: i + 1 })} aria-pressed={candles.includes(i)} className={`sb-candle sb-candle-${i} ${candles.includes(i) ? 'is-out' : ''}`} onClick={() => setCandles(v => v.includes(i) ? v : [...v, i])} />)}</div><p role="status">{candles.length === 3 ? captionValue("invitations.pages.StationeryBirthdayExperience.caption56", language) : captionValue("invitations.pages.StationeryBirthdayExperience.caption57", language)}</p>{candles.length === 3 && <button className="sb-text-button" onClick={() => setCandles([])}>{captionValue("invitations.pages.StationeryBirthdayExperience.caption58", language)}</button>}</>}</Chapter><Memories t={t} /><ReplyForm kind="reply" t={t} storageKey={`1111-${'white-and-blue'}:v1`} /><ReplyForm kind="wish" t={t} storageKey={`1111-${'white-and-blue'}:v1`} /><footer className="maker-credit"><span>{captionValue("invitations.pages.StationeryBirthdayExperience.caption59", language)}</span><Link to="/" aria-label={captionValue("invitations.pages.StationeryBirthdayExperience.caption60", language)}><img src="/logos/logo-pink-star.svg" alt="11:11" width="1330" height="1112" /></Link></footer></main>;
}
