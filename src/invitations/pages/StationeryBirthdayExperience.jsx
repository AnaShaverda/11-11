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
  return <Chapter id="memories" className="sb-memories"><div className="sb-section-heading"><h2>{t('A few favorite moments.', 'საყვარელი მოგონებები.')}</h2><p>{t('Good friends. Brighter days. More of this.', 'მეგობრები. ნათელი დღეები. მეტი ასეთი მომენტი.')}</p></div><div className="sb-photo-stage" onTouchStart={e => {
      start.current = e.touches[0].clientX;
    }} onTouchEnd={e => {
      if (start.current !== null) {
        const d = e.changedTouches[0].clientX - start.current;
        if (Math.abs(d) > 45) move(d < 0 ? 1 : -1);
        start.current = null;
      }
    }}>{<button className="sb-camera" onClick={() => input.current.click()} aria-label={t('Add a photo from your device', 'დაამატე ფოტო')}><img src={"/images/birthday/white-and-blue/experience/instant-camera.webp"} alt="" /><span>{t('Add a photo', 'დაამატე ფოტო')}</span></button>}<div className="sb-photo-prints">{[0, 1, 2].map(offset => <figure key={`${index}-${offset}`} className={`sb-print sb-print-${offset}`}><button type="button" className="sb-photo-open" aria-label={t('Open photo: ', 'ფოტოს ნახვა: ') + (ribbonPhotoCaptions[photos[(index + offset) % photos.length]] ?? t('Your memory', 'შენი მოგონება'))} onClick={() => setViewing((index + offset) % photos.length)}><img loading="lazy" src={photos[(index + offset) % photos.length]} alt={t('A celebration memory', 'დღესასწაულის მოგონება')} /></button><figcaption>{ribbonPhotoCaptions[photos[(index + offset) % photos.length]] ?? t('a new little memory', 'ახალი მოგონება')}</figcaption></figure>)}</div></div><div className="sb-memory-ornaments" aria-hidden="true">{<img src="/images/birthday/white-and-blue/experience/wish-envelope.webp" alt="" />}</div><div className="sb-gallery-controls"><button onClick={() => move(-1)} aria-label={t('Previous photo', 'წინა ფოტო')}><InvitationArtwork name="arrow-left" size={24} /></button><span aria-live="polite">{index + 1} / {photos.length}</span><button onClick={() => move(1)} aria-label={t('Next photo', 'შემდეგი ფოტო')}><InvitationArtwork name="arrow-right" size={24} /></button></div>{<p className="sb-local">{t('Your added photos stay in this preview until you leave.', 'დამატებული ფოტოები ამ გვერდზე დარჩება მის დახურვამდე.')}</p>}<input ref={input} type="file" accept="image/*" hidden onChange={add} /><dialog ref={viewer} className="sb-photo-dialog" aria-label={t('A closer look at the memory', 'მოგონების ახლოდან ნახვა')} onCancel={() => setViewing(null)} onClick={e => {
      if (e.target === viewer.current) closeViewer();
    }} onKeyDown={e => {
      if (e.key === 'ArrowRight') setViewing(i => (i + 1) % photos.length);
      if (e.key === 'ArrowLeft') setViewing(i => (i - 1 + photos.length) % photos.length);
    }}>{viewing !== null && <><button className="sb-viewer-close" onClick={closeViewer} aria-label={t('Close photo', 'ფოტოს დახურვა')}><InvitationArtwork name="close" size={24} /></button><figure><img src={photos[viewing]} alt={t('A celebration memory', 'დღესასწაულის მოგონება')} /><figcaption>{ribbonPhotoCaptions[photos[viewing]] ?? t('a new little memory', 'ახალი მოგონება')}</figcaption></figure><div className="sb-gallery-controls"><button onClick={() => setViewing(i => (i - 1 + photos.length) % photos.length)} aria-label={t('Previous memory', 'წინა მოგონება')}><InvitationArtwork name="arrow-left" size={22} /></button><span>{viewing + 1} / {photos.length}</span><button onClick={() => setViewing(i => (i + 1) % photos.length)} aria-label={t('Next memory', 'შემდეგი მოგონება')}><InvitationArtwork name="arrow-right" size={22} /></button></div></>}</dialog></Chapter>;
}
function ReplyForm({
  kind,
  t,
  storageKey
}) {
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
  return <Chapter id={kind} className={`sb-reply ${wish ? 'sb-wishes' : 'sb-rsvp'}`}><div className="sb-reply-intro"><h2>{wish ? t('Leave a birthday wish.', 'დატოვე დაბადების დღის სურვილი.') : t('See you there?', 'შემოგვიერთდები?')}</h2>{wish ? <Envelope /> : <img className="sb-slice-art" src="/images/birthday/white-and-blue/experience/cake-slice.webp" alt="" />}<p>{wish ? t('A few words to keep, long after the candles go out.', 'სიტყვები, რომლებიც სანთლების ჩაქრობის შემდეგაც გვემახსოვრება.') : t('Good company is the best part.', 'მთავარი კარგი კომპანიაა.')}</p></div><div className={`sb-form-paper ${saved ? 'is-saved' : ''}`}>{saved ? <div className="sb-confirmation" role="status"><h3>{wish ? t('A little love, delivered.', 'შენი სურვილი შენახულია.') : saved.attending === 'yes' ? t('See you at the party!', 'წვეულებაზე შევხვდებით!') : t('We’ll miss you!', 'მოგვენატრები!')}</h3><p>{saved.name}</p>{wish && <blockquote>{saved.message}</blockquote>}<button className="sb-button" onClick={() => setSaved(null)}>{t(wish ? 'Edit your wish' : 'Change my response', wish ? 'სურვილის შეცვლა' : 'პასუხის შეცვლა')}</button></div> : <form onSubmit={save}><h3>{wish ? t('Your birthday wish', 'შენი სურვილი') : t('RSVP', 'შენი პასუხი')}</h3><label htmlFor={`${kind}-name`}>{t('Your name', 'შენი სახელი')}</label><input id={`${kind}-name`} required maxLength={80} placeholder={t('Your first name', 'შენი სახელი')} autoComplete="given-name" value={name} onChange={e => setName(e.target.value)} pattern=".*\S.*" />{wish ? <><label htmlFor="birthday-wish">{t('Your birthday wish', 'დაბადების დღის სურვილი')}</label><textarea id="birthday-wish" placeholder={t('A little note. A big wish.', 'პატარა წერილი. დიდი სურვილი.')} required maxLength={600} value={message} onChange={e => setMessage(e.target.value)} onInput={e => e.target.setCustomValidity(e.target.value.trim() ? '' : t('Write a little wish.', 'დაწერე სურვილი.'))} /></> : <fieldset><legend>{t('Will you join us?', 'შემოგვიერთდები?')}</legend>{['yes', 'no'].map(v => <label key={v} className={attending === v ? 'is-selected' : ''}><input type="radio" name="attendance" value={v} checked={attending === v} onChange={() => setAttending(v)} />{v === 'yes' ? t('I’ll be there', 'მოვდივარ') : t('Can’t make it', 'ვერ მოვდივარ')}</label>)}</fieldset>}<button className="sb-button" type="submit">{wish ? t('Send wish', 'სურვილის შენახვა') : t('Save reply', 'პასუხის შენახვა')}</button></form>}<p className="sb-local">{persisted ? t('Preview invitation. Replies and wishes stay on this device.', 'მოსაწვევის დემო. პასუხები ამ მოწყობილობაზე ინახება.') : t('Saved for this visit only. Device storage is unavailable.', 'შენახულია მხოლოდ ამ ვიზიტისთვის.')}</p></div></Chapter>;
}
export default function StationeryBirthdayExperience() {
  const {
    language
  } = useLanguage();
  const t = (en, ka) => language === 'ka' ? ka : en;
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
  return <main lang={language} className={`sb-experience sb-blue ${motion ? 'sb-motion' : ''}`}><div className="sb-hero-wrap"><RibbonSketchToolbar motion={motion} onMotion={() => setMotion(v => !v)} /><Chapter className="sb-hero">{<><div className="sb-hero-art"><Art name="blue-cake" /></div><div className="sb-hero-copy"><h1>{t('Aniko’s\nBirthday', 'ანიკოს\nდაბადების დღე')}</h1><p>{t('A little party. A lot of love.', 'პატარა წვეულება. დიდი სიყვარული.')}</p><div className="sb-date">23 MAY 2027 <span /> 17:00 <span /> TBILISI</div><button className="sb-button" onClick={reveal}>{t('Open your invitation', 'გახსენი მოსაწვევი')}<InvitationArtwork name="arrow-right" size={20} /></button></div></>}</Chapter></div><div ref={details} tabIndex={-1} className={`sb-details-wrap ${opened ? 'is-open' : ''}`}><Chapter id="details" className="sb-details">{<div className="sb-open-paper"><div><h2>{t('You’re invited.', 'მოწვეული ხარ.')}</h2><p>{t('Aniko’s Birthday', 'ანიკოს დაბადების დღე')}</p><dl><div><dt>{t('Date', 'თარიღი')}</dt><dd>23 {t('May', 'მაისი')} 2027</dd></div><div><dt>{t('Time', 'დრო')}</dt><dd>17:00</dd></div><div><dt>{t('Place', 'ადგილი')}</dt><dd>{t('Tbilisi', 'თბილისი')}</dd></div></dl></div><div><h2>{t('The plan', 'გეგმა')}</h2><ol>{[t('Hello & hugs', 'შეხვედრა'), t('Cake & wishes', 'ტორტი და სურვილები'), t('A little dancing', 'ცეკვა')].map((text, i) => <li key={i}><time>{['17:00', '18:00', '19:00'][i]}</time>{text}</li>)}</ol><button className="sb-button" onClick={calendar}>{t('Add to calendar', 'კალენდარში დამატება')}</button></div></div>}</Chapter></div><Chapter id="play" className="sb-play"><h2>{t('Make a wish.', 'ჩაიფიქრე სურვილი.')}</h2>{<><p>{t('Tap the candles, one by one.', 'შეეხე სანთლებს სათითაოდ.')}</p><div className="sb-candle-cake"><Art name="blue-cake" />{[0, 1, 2].map(i => <button key={i} aria-label={t(`Blow out candle ${i + 1}`, `ჩააქრე სანთელი ${i + 1}`)} aria-pressed={candles.includes(i)} className={`sb-candle sb-candle-${i} ${candles.includes(i) ? 'is-out' : ''}`} onClick={() => setCandles(v => v.includes(i) ? v : [...v, i])} />)}</div><p role="status">{candles.length === 3 ? t('Good things are on their way.', 'კარგი ამბები წინ არის.') : t('A little birthday magic.', 'დაბადების დღის პატარა ჯადოსნობა.')}</p>{candles.length === 3 && <button className="sb-text-button" onClick={() => setCandles([])}>{t('Light them again', 'კვლავ აანთე')}</button>}</>}</Chapter><Memories t={t} /><ReplyForm kind="reply" t={t} storageKey={`1111-${'white-and-blue'}:v1`} /><ReplyForm kind="wish" t={t} storageKey={`1111-${'white-and-blue'}:v1`} /><footer className="maker-credit"><span>{t('Made by', 'შექმნილია')}</span><Link to="/" aria-label={t('11:11 — visit the invitation maker', '11:11 — მოსაწვევის შემქმნელი')}><img src="/logos/logo-pink-star.svg" alt="11:11" width="1330" height="1112" /></Link></footer></main>;
}
