import { createCaptionCopy, captionValue } from "../../localization/captionValues.js";
import InvitationMakerFooter from "../components/InvitationMakerFooter.jsx";
import useInvitationGuestName from "../hooks/useInvitationGuestName.js";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import InvitationArtwork from "../components/InvitationArtwork.jsx";
import { useLanguage } from "../../localization/LanguageContext.jsx";
import "../../styles/pink-lido-experience.css";

async function celebrate(options) { const { default: confetti } = await import("canvas-confetti"); confetti({ ...options, disableForReducedMotion: true }); }

const accessories = "/images/birthday/pink-lido/party-accessories/";
const words = createCaptionCopy({
  "name": "invitations.pages.PinkLidoExperience.copy1.name",
  "title": "invitations.pages.PinkLidoExperience.copy1.title",
  "line": "invitations.pages.PinkLidoExperience.copy1.line",
  "date": "invitations.pages.PinkLidoExperience.copy1.date",
  "city": "invitations.pages.PinkLidoExperience.copy1.city",
  "dive": "invitations.pages.PinkLidoExperience.copy1.dive",
  "splash": "invitations.pages.PinkLidoExperience.copy1.splash",
  "motion": "invitations.pages.PinkLidoExperience.copy1.motion",
  "back": "invitations.pages.PinkLidoExperience.copy1.back",
  "details": "invitations.pages.PinkLidoExperience.copy1.details",
  "intro": "invitations.pages.PinkLidoExperience.copy1.intro",
  "when": "invitations.pages.PinkLidoExperience.copy1.when",
  "where": "invitations.pages.PinkLidoExperience.copy1.where",
  "venue": "invitations.pages.PinkLidoExperience.copy1.venue",
  "bring": "invitations.pages.PinkLidoExperience.copy1.bring",
  "plan": "invitations.pages.PinkLidoExperience.copy1.plan",
  "swim": "invitations.pages.PinkLidoExperience.copy1.swim",
  "cake": "invitations.pages.PinkLidoExperience.copy1.cake",
  "chill": "invitations.pages.PinkLidoExperience.copy1.chill",
  "rsvp": "invitations.pages.PinkLidoExperience.copy1.rsvp",
  "label": "invitations.pages.PinkLidoExperience.copy1.label",
  "yes": "invitations.pages.PinkLidoExperience.copy1.yes",
  "no": "invitations.pages.PinkLidoExperience.copy1.no",
  "send": "invitations.pages.PinkLidoExperience.copy1.send",
  "saved": "invitations.pages.PinkLidoExperience.copy1.saved",
  "thanks": "invitations.pages.PinkLidoExperience.copy1.thanks",
  "miss": "invitations.pages.PinkLidoExperience.copy1.miss",
  "demo": "invitations.pages.PinkLidoExperience.copy1.demo",
  "calendar": "invitations.pages.PinkLidoExperience.copy1.calendar",
  "change": "invitations.pages.PinkLidoExperience.copy1.change",
  "wishes": "invitations.pages.PinkLidoExperience.copy1.wishes",
  "wishTitle": "invitations.pages.PinkLidoExperience.copy1.wishTitle",
  "wishIntro": "invitations.pages.PinkLidoExperience.copy1.wishIntro",
  "wishLabel": "invitations.pages.PinkLidoExperience.copy1.wishLabel",
  "wishSave": "invitations.pages.PinkLidoExperience.copy1.wishSave",
  "wishSaved": "invitations.pages.PinkLidoExperience.copy1.wishSaved",
  "wishDemo": "invitations.pages.PinkLidoExperience.copy1.wishDemo",
  "wishEdit": "invitations.pages.PinkLidoExperience.copy1.wishEdit"
});
function readReply(theme) { try { return JSON.parse(localStorage.getItem(`1111-${theme}-rsvp-v1`)) || null; } catch { return null; } }

function readWish(theme) { try { const saved = JSON.parse(localStorage.getItem(`1111-${theme}-wish-v1`)); return typeof saved?.name === "string" && typeof saved?.message === "string" ? saved : null; } catch { return null; } }

export default function PinkLidoExperience({ theme = "pink-lido" }) {
  const blue = theme === "blue-splash";
  const art = `/images/components/separated/birthday-${theme}-`;
  const palette = blue ? ["#075a9f", "#9cd5e0", "#f9d46b"] : ["#be4169", "#9cd5d0", "#f9d46b"];
  const { language, setLanguage } = useLanguage();
  const copy = words[language] || words.en;
  const [motion, setMotion] = useState(() => !window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const [ripples, setRipples] = useState([]);
  const [reply, setReply] = useState(() => readReply(theme));
  const [name, setName] = useInvitationGuestName(theme, readWish(theme)?.name || readReply(theme)?.name || "");
  const [attending, setAttending] = useState(() => readReply(theme)?.attending || "yes");
  const [storageSaved, setStorageSaved] = useState(true);
  const [wish, setWish] = useState(() => readWish(theme));
  const wishName = name;
  const setWishName = setName;
  const [wishMessage, setWishMessage] = useState(() => readWish(theme)?.message || "");
  const [wishStored, setWishStored] = useState(true);
  const details = useRef(null);
  const scene = useRef(null);
  const timers = useRef(new Set());
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setMotion(!preference.matches);
    preference.addEventListener("change", update);
    return () => { preference.removeEventListener("change", update); timers.current.forEach(clearTimeout); };
  }, []);
  function splash(event) {
    if (!motion) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const id = Date.now() + Math.random();
    const x = event.clientX ? event.clientX - bounds.left : bounds.width / 2;
    const y = event.clientY ? event.clientY - bounds.top : bounds.height / 2;
    setRipples(current => [...current.slice(-5), { id, x, y }]);
    const timer = setTimeout(() => { setRipples(current => current.filter(item => item.id !== id)); timers.current.delete(timer); }, 1200);
    timers.current.add(timer);
  }
  function openParty() { details.current.scrollIntoView({ behavior: motion ? "smooth" : "instant", block: "start" }); details.current.focus({ preventScroll: true }); if (motion) celebrate({ particleCount: 55, spread: 80, origin: { y: .7 }, colors: palette, disableForReducedMotion: true }); }
  function saveReply(event) {
    event.preventDefault();
    const next = { name: name.trim(), attending };
    try { localStorage.setItem(`1111-${theme}-rsvp-v1`, JSON.stringify(next)); setStorageSaved(true); } catch { setStorageSaved(false); }
    setReply(next);
    if (motion && attending === "yes") celebrate({ particleCount: 80, spread: 100, colors: palette, disableForReducedMotion: true });
  }
  function editReply() {
    setReply(null);
    try { localStorage.removeItem(`1111-${theme}-rsvp-v1`); } catch { /* Editing remains available in this session. */ }
  }
  function saveWish(event) {
    event.preventDefault();
    if (!wishMessage.trim()) {
      const field = event.currentTarget.elements.namedItem("birthday-wish");
      field.setCustomValidity(captionValue("invitations.pages.PinkLidoExperience.caption2", language));
      field.reportValidity();
      return;
    }
    const next = { name: wishName.trim(), message: wishMessage.trim() };
    try { localStorage.setItem(`1111-${theme}-wish-v1`, JSON.stringify(next)); setWishStored(true); } catch { setWishStored(false); }
    setWish(next);
    if (motion) celebrate({ particleCount: 45, spread: 75, colors: palette });
  }
  function editWish() {
    setWish(null);
    try { localStorage.removeItem(`1111-${theme}-wish-v1`); } catch { /* Editing remains available in this session. */ }
  }
  function calendar() {
    const content = `BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//11:11//${blue ? "Blue Splash" : "Pink Lido"}//EN\r\nBEGIN:VEVENT\r\nUID:${theme}-demo-2027@1111.local\r\nDTSTAMP:20261008T000000Z\r\nDTSTART:20270718T100000Z\r\nDTEND:20270718T130000Z\r\nSUMMARY:Aniko's Pool Party (demo)\r\nLOCATION:Tbilisi - exact location from host\r\nDESCRIPTION:Bring your swimsuit and towel. Demo invitation.\r\nEND:VEVENT\r\nEND:VCALENDAR\r\n`;
    const url = URL.createObjectURL(new Blob([content], { type: "text/calendar;charset=utf-8" }));
    const link = document.createElement("a"); link.href = url; link.download = "mias-pool-party.ics"; link.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return <main className={`lido-experience ${blue ? "blue-splash-experience" : ""} ${motion ? "lido-motion" : ""}`} lang={language} ref={scene}>
    <section className="lido-cover" id="lido-cover" aria-label={copy.title}>
    <header className="lido-toolbar"><Link to="/invitations" aria-label={copy.back}><InvitationArtwork name="arrow-left" size={20} /><span>11:11</span></Link><div><button onClick={() => setLanguage((language === "ka" ? "en" : "ka"))} aria-label={captionValue("invitations.pages.PinkLidoExperience.caption4", language)}>{captionValue("invitations.pages.PinkLidoExperience.caption5", language)}</button><button className="lido-motion-control" aria-pressed={motion} onClick={() => setMotion(value => !value)}>{copy.motion}<span aria-hidden="true" className="lido-switch" /></button></div></header>
    {!blue && <><div className="lido-palm lido-palm-left" aria-hidden="true"><img src={`${art}palm.webp`} alt="" /></div><div className="lido-palm lido-palm-right" aria-hidden="true"><img src={`${art}palm.webp`} alt="" /></div></>}
    <section className="lido-invitation" aria-labelledby="lido-title"><h1 id="lido-title"><span>{copy.name}</span><em>{copy.title}</em></h1><p className="lido-line">{copy.line}</p><p className="lido-date">{copy.date} <span className="lido-date-dot" aria-hidden="true" /> 14:00 <span className="lido-date-dot" aria-hidden="true" /> {copy.city}</p><button className="lido-primary" onClick={openParty}>{copy.dive}<InvitationArtwork name="arrow-right" size={20} /></button></section>
    <div className="lido-pool-scene"><img className="lido-pool" src={`${art}pool.png`} alt="" /><button className="lido-water" aria-label={copy.splash} onClick={splash}>{ripples.map(item => <span key={item.id} className="lido-ripple" style={{ left: item.x, top: item.y }} />)}</button><img className="lido-ring" src={`${art}ring.webp`} alt="" /><div className="lido-water-hint" aria-hidden="true"><svg width="42" height="24" viewBox="0 0 42 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M2 8c6-8 12 8 18 0s12 8 20 0M2 16c6-8 12 8 18 0s12 8 20 0" /></svg>{copy.splash}</div></div>
    <img className={blue ? "splash-ladder" : "lido-umbrella"} src={`${art}${blue ? "ladder" : "umbrella"}.webp`} alt="" />
    <a className="lido-scroll-cue" href="#lido-details" aria-label={captionValue("invitations.pages.PinkLidoExperience.caption6", language)}><InvitationArtwork name="arrow-down" size={22} /></a>
    </section>
    <section ref={details} id="lido-details" tabIndex={-1} className="lido-chapter lido-details-chapter" aria-labelledby="lido-details-title">
      <div className="lido-chapter-copy">
        <p className="lido-detail-intro">{copy.intro}</p>
        <h2 id="lido-details-title">{copy.details}</h2>
        <div className="lido-facts">
          <div><span>01 / {captionValue("invitations.pages.PinkLidoExperience.caption7", language)}</span><p>{copy.when}<br />14:00 – 17:00</p><button onClick={calendar}>{copy.calendar}<InvitationArtwork name="arrow-up-right" size={16} /></button></div>
          <div><span>02 / {captionValue("invitations.pages.PinkLidoExperience.caption8", language)}</span><p>{copy.where}</p><small>{copy.venue}</small></div>
        </div>
        <p className="lido-bring">{copy.bring}</p>
        <a className="lido-chapter-link" href="#lido-plan">{copy.plan} <InvitationArtwork name="arrow-down" size={20} /></a>
      </div>
      <div className="lido-chapter-art lido-detail-art" aria-hidden="true"><span className="lido-orbit" /><img src={`${art}ring.webp`} alt="" /><span className="lido-art-word">SPLASH!</span></div>
    </section>
    <section id="lido-plan" className="lido-chapter lido-plan-chapter" aria-labelledby="lido-plan-title">
      <div className="lido-chapter-art lido-plan-art" aria-hidden="true"><img src={`${art}${blue ? "ladder" : "umbrella"}.webp`} alt="" /></div>
      <div className="lido-chapter-copy">
        <h2 id="lido-plan-title">{copy.plan}</h2>
        <ol className="lido-plan">{[["14:00", copy.swim], ["15:30", copy.cake], ["16:00", copy.chill]].map(([time, title], index) => <li key={time}><span className="lido-plan-number">0{index + 1}</span><div><time>{time}</time><h3>{title}</h3></div></li>)}</ol>
        <a className="lido-chapter-link" href="#lido-wishes">{copy.wishes} <InvitationArtwork name="arrow-down" size={20} /></a>
      </div>
    </section>
    <section id="lido-wishes" className="lido-chapter lido-wishes-chapter" aria-labelledby="lido-wishes-title">
      <div className="lido-chapter-copy">
        <h2 id="lido-wishes-title">{copy.wishTitle}</h2>
        <p className="lido-wish-intro">{copy.wishIntro}</p>
        <div className="lido-wish-content" aria-live="polite">
          {wish ? <div className="lido-wish-note"><p className="lido-wish-message">{wish.message}</p><p className="lido-wish-author">{wish.name}</p><p className="lido-wish-status">{wishStored ? copy.wishSaved : (captionValue("invitations.pages.PinkLidoExperience.caption9", language))}</p><button onClick={editWish}>{copy.wishEdit}<InvitationArtwork name="pen" size={16} /></button></div> :
            <form className="lido-wish-form" onSubmit={saveWish}>
              <label htmlFor="lido-wish-name">{copy.label}</label>
              <input id="lido-wish-name" value={wishName} onChange={event => setWishName(event.target.value)} required maxLength={80} pattern={".*\\S.*"} autoComplete="name" />
              <label htmlFor="lido-wish-message">{copy.wishLabel}</label>
              <textarea id="lido-wish-message" name="birthday-wish" value={wishMessage} onChange={event => { event.target.setCustomValidity(""); setWishMessage(event.target.value); }} required maxLength={400} rows={4} />
              <button className="lido-primary" type="submit">{copy.wishSave}<InvitationArtwork name="arrow-right" size={20} /></button>
            </form>}
        </div>
        <p className="lido-demo lido-wish-demo">{copy.wishDemo}</p>
        <a className="lido-chapter-link" href="#lido-rsvp">{copy.rsvp}<InvitationArtwork name="arrow-down" size={20} /></a>
      </div>
      <div className="lido-chapter-art lido-wishes-art" aria-hidden="true"><span className="lido-wishes-towel" /><img className="lido-wishes-swimsuit" src={`${accessories}swimsuit.png`} alt="" loading="lazy" /><img className="lido-wishes-glasses" src={`${accessories}sunglasses.png`} alt="" loading="lazy" /></div>
    </section>
    <section id="lido-rsvp" className="lido-chapter lido-rsvp-chapter" aria-labelledby="lido-rsvp-title">
      <div className="lido-chapter-copy lido-rsvp" aria-live="polite">
        {reply ? <><h2 id="lido-rsvp-title">{reply.attending === "yes" ? copy.thanks : copy.miss}</h2><p className="lido-reply-name">{reply.name}</p><p>{storageSaved ? copy.saved : (captionValue("invitations.pages.PinkLidoExperience.caption10", language))}</p><button onClick={editReply}>{copy.change}<InvitationArtwork name="arrow-right" size={18} /></button></> : <form onSubmit={saveReply}>
          <h2 id="lido-rsvp-title">{copy.rsvp}</h2>
          <label htmlFor="lido-guest-name">{copy.label}</label>
          <input id="lido-guest-name" value={name} onChange={event => setName(event.target.value)} required maxLength={80} pattern={".*\\S.*"} autoComplete="name" />
          <fieldset><legend className="lido-sr-only">{copy.rsvp}</legend><label><input type="radio" name="attendance" value="yes" checked={attending === "yes"} onChange={() => setAttending("yes")} />{copy.yes}</label><label><input type="radio" name="attendance" value="no" checked={attending === "no"} onChange={() => setAttending("no")} />{copy.no}</label></fieldset>
          <button className="lido-primary" type="submit">{copy.send}<InvitationArtwork name="arrow-right" size={20} /></button>
        </form>}
        <p className="lido-demo">{copy.demo}</p>
        <a className="lido-chapter-link" href="#lido-cover">{captionValue("invitations.pages.PinkLidoExperience.caption11", language)}<InvitationArtwork name="arrow-down" size={20} className="lido-icon-up" /></a>
      </div>
      <div className="lido-chapter-art lido-rsvp-art" aria-hidden="true"><img className="lido-rsvp-pool" src={`${art}pool.png`} alt="" /><img className="lido-rsvp-ring" src={`${art}ring.webp`} alt="" /></div>
    </section>
    <InvitationMakerFooter palette={blue ? "pool" : "cherry"} />
  </main>;
}
