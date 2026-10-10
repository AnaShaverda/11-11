import { createCaptionCopy, captionValue } from "../../localization/captionValues.js";
import InvitationMakerFooter from "../components/InvitationMakerFooter.jsx";
import useInvitationGuestName from "../hooks/useInvitationGuestName.js";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import SelectedBridalPoster from "../components/SelectedBridalPoster.jsx";
import PartyGames from "../components/PartyGames.jsx";
import BridalPhotoCollage from "../components/BridalPhotoCollage.jsx";
import { selectedBridalAssets, selectedBridalSamples } from "../data/selectedBridalDesigns.js";
import { getDesignFont } from "../data/cardTypography.js";
import "../../styles/selected-bridal.css";
import ToastActivities from "../components/ToastActivities.jsx";
import InvitationArtwork from "../components/InvitationArtwork.jsx";
import InvitationMotif from "../components/InvitationMotif.jsx";
import { useLanguage } from "../../localization/LanguageContext.jsx";
import "../../styles/cherry-tower-experience.css";

const art = "/images/components/separated/birthday-cherry-tower-";
const words = createCaptionCopy({
  "motion": "invitations.pages.CherryTowerExperience.copy1.motion",
  "invited": "invitations.pages.CherryTowerExperience.copy1.invited",
  "rsvp": "invitations.pages.CherryTowerExperience.copy1.rsvp",
  "details": "invitations.pages.CherryTowerExperience.copy1.details",
  "intro": "invitations.pages.CherryTowerExperience.copy1.intro",
  "date": "invitations.pages.CherryTowerExperience.copy1.date",
  "city": "invitations.pages.CherryTowerExperience.copy1.city",
  "venue": "invitations.pages.CherryTowerExperience.copy1.venue",
  "calendar": "invitations.pages.CherryTowerExperience.copy1.calendar",
  "dress": "invitations.pages.CherryTowerExperience.copy1.dress",
  "dressLine": "invitations.pages.CherryTowerExperience.copy1.dressLine",
  "schedule": [
    "invitations.pages.CherryTowerExperience.copy1.schedule.0",
    "invitations.pages.CherryTowerExperience.copy1.schedule.1",
    "invitations.pages.CherryTowerExperience.copy1.schedule.2",
    "invitations.pages.CherryTowerExperience.copy1.schedule.3"
  ],
  "toast": "invitations.pages.CherryTowerExperience.copy1.toast",
  "toastItalic": "invitations.pages.CherryTowerExperience.copy1.toastItalic",
  "toastLine": "invitations.pages.CherryTowerExperience.copy1.toastLine",
  "pop": "invitations.pages.CherryTowerExperience.copy1.pop",
  "popped": "invitations.pages.CherryTowerExperience.copy1.popped",
  "again": "invitations.pages.CherryTowerExperience.copy1.again",
  "wishes": "invitations.pages.CherryTowerExperience.copy1.wishes",
  "wishesItalic": "invitations.pages.CherryTowerExperience.copy1.wishesItalic",
  "wishLine": "invitations.pages.CherryTowerExperience.copy1.wishLine",
  "name": "invitations.pages.CherryTowerExperience.copy1.name",
  "message": "invitations.pages.CherryTowerExperience.copy1.message",
  "wishSave": "invitations.pages.CherryTowerExperience.copy1.wishSave",
  "replySave": "invitations.pages.CherryTowerExperience.copy1.replySave",
  "yes": "invitations.pages.CherryTowerExperience.copy1.yes",
  "no": "invitations.pages.CherryTowerExperience.copy1.no",
  "attendance": "invitations.pages.CherryTowerExperience.copy1.attendance",
  "saved": "invitations.pages.CherryTowerExperience.copy1.saved",
  "session": "invitations.pages.CherryTowerExperience.copy1.session",
  "edit": "invitations.pages.CherryTowerExperience.copy1.edit",
  "thanks": "invitations.pages.CherryTowerExperience.copy1.thanks",
  "miss": "invitations.pages.CherryTowerExperience.copy1.miss",
  "demo": "invitations.pages.CherryTowerExperience.copy1.demo",
  "back": "invitations.pages.CherryTowerExperience.copy1.back",
  "footer": "invitations.pages.CherryTowerExperience.copy1.footer",
  "bridal": "invitations.pages.CherryTowerExperience.copy1.bridal",
  "birthday": "invitations.pages.CherryTowerExperience.copy1.birthday",
  "nino": "invitations.pages.CherryTowerExperience.copy1.nino",
  "ana": "invitations.pages.CherryTowerExperience.copy1.ana"
});
function readSaved(key, kind) {
  try { const value = JSON.parse(localStorage.getItem(key)); return typeof value?.name === "string" && (kind === "wish" ? typeof value.message === "string" : ["yes", "no"].includes(value.attending)) ? value : null; } catch { return null; }
}
async function celebrate() {
  const { default: confetti } = await import("canvas-confetti");
  confetti({ particleCount: 90, spread: 100, origin: { y: .65 }, colors: ["#a51e37", "#f5c5c7", "#e3b54a", "#fff3e9"], disableForReducedMotion: true });
}
function PartyForm({ kind, theme, text, motion }) {
  const key = `1111-${theme}-${kind}-v1`;
  const [initial] = useState(() => readSaved(key, kind));
  const [saved, setSaved] = useState(initial);
  const [name, setName] = useInvitationGuestName(theme, readSaved(`1111-${theme}-wish-v1`, "wish")?.name || readSaved(`1111-${theme}-rsvp-v1`, "rsvp")?.name || "");
  const [message, setMessage] = useState(initial?.message || "");
  const [attending, setAttending] = useState(initial?.attending || "yes");
  const [stored, setStored] = useState(true);
  const wish = kind === "wish";
  function submit(event) {
    event.preventDefault();
    if (wish && !message.trim()) { const field = event.currentTarget.querySelector("textarea"); field.setCustomValidity(text.message); field.reportValidity(); return; }
    const next = wish ? { name: name.trim(), message: message.trim() } : { name: name.trim(), attending };
    try { localStorage.setItem(key, JSON.stringify(next)); setStored(true); } catch { setStored(false); }
    setSaved(next); if (motion && (wish || attending === "yes")) celebrate();
  }
  return <div className="cherry-form"><h2>{saved && !wish ? (saved.attending === "yes" ? text.thanks : text.miss) : wish ? <>{text.wishes}<br /><em>{text.wishesItalic}</em></> : text.rsvp}</h2>{wish && <p>{text.wishLine}</p>}
    {saved ? <div aria-live="polite" className="cherry-confirmation">{wish && <blockquote>{saved.message}</blockquote>}<p>{saved.name}</p><small>{stored ? text.saved : text.session}</small><button className="cherry-link" onClick={() => { setSaved(null); try { localStorage.removeItem(key); } catch { /* Editing remains available. */ } }}>{text.edit}<InvitationArtwork name="pen" size={18} /></button></div> : <form onSubmit={submit}>
      <label htmlFor={`${kind}-name`}>{text.name}</label><input id={`${kind}-name`} value={name} onChange={e => setName(e.target.value)} autoComplete="name" required pattern=".*\S.*" maxLength={80} />
      {wish ? <><label htmlFor="cherry-wish">{text.message}</label><textarea id="cherry-wish" value={message} onChange={e => { e.target.setCustomValidity(""); setMessage(e.target.value); }} onInvalid={e => { if (!message.trim()) e.target.setCustomValidity(text.message); }} required rows={3} maxLength={400} pattern=".*\S.*" /></> : <fieldset><legend>{text.attendance}</legend>{["yes", "no"].map(option => <label key={option}><input type="radio" name="attendance" checked={attending === option} onChange={() => setAttending(option)} />{text[option]}</label>)}</fieldset>}
      <button className="cherry-button" type="submit" onClick={e => { if (wish && !message.trim()) { const field = e.currentTarget.form.querySelector("textarea"); field.setCustomValidity(text.message); } }}>{wish ? text.wishSave : text.replySave}<InvitationArtwork name="arrow-right" size={18} /></button>
    </form>}<small className="cherry-demo">{text.demo}</small></div>;
}
export default function CherryTowerExperience({ bridal = false, variant = "cherry-tower", originalArtwork = false }) {
  const { language, setLanguage } = useLanguage();
  const base = words[language] || words.en;
  const special = variant !== "cherry-tower";
  const mint = variant === "mint-bash";
  const specialText = special ? { ...base,
    schedule: [captionValue("ui.invitations.pages.CherryTowerExperience.welcomeDrinksHellos", language), captionValue("ui.invitations.pages.CherryTowerExperience.dinnerWithTheGirls", language), captionValue("ui.invitations.pages.CherryTowerExperience.aToastToTheBride", language), captionValue("ui.invitations.pages.CherryTowerExperience.dancingIntoTheNight", language)],
    details: (mint ? captionValue("ui.invitations.pages.CherryTowerExperience.aNightToRemember", language) : captionValue("ui.invitations.pages.CherryTowerExperience.aLittleSunshineBeforeForever", language)),
    intro: (mint ? captionValue("ui.invitations.pages.CherryTowerExperience.aLittleBubblyForABiggerHappily", language) : captionValue("ui.invitations.pages.CherryTowerExperience.goodPeopleGoldenDrinksAndABrighter", language)),
    dressLine: (mint ? captionValue("ui.invitations.pages.CherryTowerExperience.mintPinkALittleSparkle", language) : captionValue("ui.invitations.pages.CherryTowerExperience.butterYellowLavenderYourSunnySelf", language)),
    footer: (mint ? captionValue("ui.invitations.pages.CherryTowerExperience.goodFriendsBrighterBrides", language) : captionValue("ui.invitations.pages.CherryTowerExperience.goodFriendsBrighterTomorrows", language)),
    toast: (mint ? captionValue("ui.invitations.pages.CherryTowerExperience.makeIt", language) : captionValue("ui.invitations.pages.CherryTowerExperience.popThe", language)),
    toastItalic: (mint ? captionValue("ui.invitations.pages.CherryTowerExperience.official", language) : captionValue("ui.invitations.pages.CherryTowerExperience.cork", language)),
    toastLine: captionValue("invitations.pages.CherryTowerExperience.caption2", language),
  } : base;
  const text = specialText;
  if (originalArtwork) { text.intro = text.intro.replaceAll("Ana", "Mariam"); text.ana = captionValue("invitations.pages.CherryTowerExperience.caption3", language); text.dressLine = (mint ? captionValue("ui.invitations.pages.CherryTowerExperience.mintPinkPeach", language) : captionValue("ui.invitations.pages.CherryTowerExperience.butterYellowPinkMint", language)); }
  const coverAssets = originalArtwork ? selectedBridalAssets[`bridal-${variant}`] : null;
  const originalFont = originalArtwork ? getDesignFont(coverAssets.selectedBridal.font, language).style : {};
  const illustration = originalArtwork ? coverAssets.selectedBridal.artwork : special ? `/images/bridal/experience/${mint ? "mint" : "sunny"}-hero.png` : "/images/party/cherry-tower/champagne-artwork.webp";
  const partyArt = special ? `/images/components/separated/bridal-${variant}-` : art;
  const [flavor, setFlavor] = useState(0);
  const popTimer = useRef(null);
  const [popping, setPopping] = useState(false);
  const [motion, setMotion] = useState(() => !matchMedia("(prefers-reduced-motion: reduce)").matches);
  const [pops, setPops] = useState(0);
  const theme = special && !originalArtwork ? `bridal-${mint ? "mint-ribbon" : "sunny-ribbon"}` : special ? `${bridal ? "bridal" : "birthday"}-${variant}` : bridal ? "bridal-cherry-tower" : "birthday-cherry-tower";
  useEffect(() => { const media = matchMedia("(prefers-reduced-motion: reduce)"); const update = () => setMotion(!media.matches); media.addEventListener("change", update); return () => media.removeEventListener("change", update); }, []);
  useEffect(() => () => clearTimeout(popTimer.current), []);
  function pop() {
    setPops(value => value + 1); setPopping(true);
    clearTimeout(popTimer.current); popTimer.current = setTimeout(() => setPopping(false), 1400);
    if (motion) celebrate();
  }
  function go(id) { const target = document.getElementById(id); target.scrollIntoView({ behavior: motion ? "smooth" : "instant" }); target.focus({ preventScroll: true }); }
  function calendar() {
    const title = originalArtwork ? `Mariam's ${mint ? "Mint Bash" : "Sunny Pop"}` : special ? `Ana's ${mint ? "Mint Bash" : "Sunny Pop"}` : bridal ? "Ana's Bridal Toast" : "Dea's Birthday Toast";
    const data = `BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//11:11//Cherry Tower//EN\r\nBEGIN:VEVENT\r\nUID:${theme}-2027@1111.local\r\nDTSTAMP:20261009T000000Z\r\nDTSTART:20270912T${originalArtwork ? "16" : "15"}0000Z\r\nDTEND:20270912T195900Z\r\nSUMMARY:${title} (demo)\r\nLOCATION:Tbilisi - exact address from host\r\nEND:VEVENT\r\nEND:VCALENDAR\r\n`;
    const url = URL.createObjectURL(new Blob([data], { type: "text/calendar;charset=utf-8" })); const link = document.createElement("a"); link.href = url; link.download = `${theme}.ics`; link.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return <main style={originalFont} className={`cherry-experience ${originalArtwork ? "party-original-art" : ""} ${special ? `cherry-${variant}` : ""} ${motion ? "cherry-motion" : ""}`} lang={language}>
    <section className="cherry-cover" id="cherry-cover" tabIndex={-1} aria-labelledby="cherry-title">
      <header className="cherry-toolbar"><Link to="/invitations" aria-label={captionValue("invitations.pages.CherryTowerExperience.caption4", language)}><InvitationArtwork name="arrow-left" size={17} />11:11</Link><div><button onClick={() => setLanguage((language === "ka" ? "en" : "ka"))}>{captionValue("invitations.pages.CherryTowerExperience.caption6", language)}</button><button aria-pressed={motion} onClick={() => setMotion(current => !current)}>{text.motion}<span className="cherry-switch" /></button></div></header>
      <div className="cherry-hero">{originalArtwork ? <><h1 className="party-visually-hidden" id="cherry-title">{captionValue("invitations.pages.CherryTowerExperience.caption7", language)}</h1><div className="party-cover-poster invitation-art" style={{"--cover-image": `url(${coverAssets.coverImage})`, "--showcase-ink": coverAssets.selectedBridal.ink}}><SelectedBridalPoster slug={`bridal-${variant}`} sample={{...selectedBridalSamples[`bridal-${variant}`], ...(language === "ka" ? {headline:coverAssets.selectedBridal.kaHeadline, opening:captionValue("data.data.selectedBridalDesigns.record2.headline", "ka"), posterName:captionValue("ui.invitations.pages.CocktailSummerExperience.mariam", "ka"), date:captionValue("invitations.midnight-martini.copy.extraCopy1.date", "ka"), location:captionValue("ribbonSketch.tbilisi.120", "ka")} : {})}} assets={coverAssets.selectedBridal} large /></div></> : <><div className="cherry-title-wrap"><h1 id="cherry-title"><span>{bridal ? text.ana : text.nino}</span><span>{special ? ((mint ? captionValue("ui.invitations.pages.CherryTowerExperience.mint", language) : captionValue("ui.invitations.pages.CherryTowerExperience.sunny", language))) : bridal ? text.bridal : text.birthday}</span><em>{(special ? captionValue("ui.invitations.pages.CherryTowerExperience.bash", language) : captionValue("ui.invitations.pages.CherryTowerExperience.toast", language))}</em></h1></div><div className="cherry-tower"><img src={illustration} alt="" /><span className="cherry-spark cherry-spark-one" aria-hidden="true"><InvitationMotif name="sparkle" /></span><span className="cherry-spark cherry-spark-two" aria-hidden="true"><InvitationMotif name="sparkle" /></span></div></>}<div className="cherry-hero-actions"><p className="cherry-date">{text.date} / {originalArtwork ? "20:00" : "19:00"} / {text.city}</p><div><button className="cherry-button" onClick={() => go("cherry-details")}>{text.invited}<InvitationArtwork name="arrow-down" size={18} /></button><button className="cherry-button cherry-outline" onClick={() => go("cherry-rsvp")}>{text.rsvp}</button></div></div></div>
    </section>
    <section className="cherry-section cherry-details" id="cherry-details" tabIndex={-1} aria-labelledby="cherry-details-title"><div><h2 id="cherry-details-title">{text.details}</h2><p className="cherry-intro">{text.intro}</p><div className="cherry-dress"><span>{text.dress}</span><p>{text.dressLine}</p><i /><i /><i /></div></div><div className="cherry-details-info"><p className="cherry-date">{text.date}<br />{text.city}</p><ol className="cherry-timeline">{(originalArtwork ? ["20:00", "20:30", "21:30", "23:00"] : ["19:00", "20:00", "21:30", "23:00"]).map((time, i) => <li key={time}><time>{time}</time><span>{bridal && i === 2 ? (captionValue("invitations.pages.CherryTowerExperience.caption8", language)) : text.schedule[i]}</span></li>)}</ol><p>{text.venue}</p><button className="cherry-link" onClick={calendar}>{text.calendar}<InvitationArtwork name="arrow-up-right" size={18} /></button></div></section>
    {bridal && <BridalPhotoCollage language={language} style="cherry" accentArt={originalArtwork ? `${partyArt}coupe.webp` : `${partyArt}bottle.webp`} />}
    <section className="cherry-section cherry-toast" aria-labelledby="cherry-toast-title"><div><h2 id="cherry-toast-title">{text.toast}<br /><em>{text.toastItalic}</em></h2><p>{text.toastLine}</p><button className="cherry-button cherry-outline" onClick={pop}>{pops ? text.again : text.pop}<InvitationArtwork name="sparkle" size={20} /></button>{special && <div className="cherry-flavors" role="group" aria-label={captionValue("invitations.pages.CherryTowerExperience.caption9", language)}>{([captionValue("ui.invitations.pages.CherryTowerExperience.toTheGirls", language), (bridal ? captionValue("ui.invitations.pages.CherryTowerExperience.toTheBride", language) : captionValue("ui.invitations.pages.CherryTowerExperience.toTheBirthdayGirl", language)), captionValue("ui.invitations.pages.CherryTowerExperience.toTheGoodLife", language)]).map((label, i) => <button key={label} aria-pressed={flavor === i} onClick={() => setFlavor(i)}>{label}</button>)}</div>}<p className="cherry-pop-status" role="status">{pops > 0 ? special ? (([captionValue("ui.invitations.pages.CherryTowerExperience.sameGirlsHigherStandards", language), (bridal ? captionValue("ui.invitations.pages.CherryTowerExperience.toHerHappilyEverAfter", language) : captionValue("ui.invitations.pages.CherryTowerExperience.toHerBrightestYearYet", language)), captionValue("ui.invitations.pages.CherryTowerExperience.moreBubblesPlease", language)])[flavor]) : text.popped : ""}</p></div><div className={`cherry-toast-art ${popping ? "cherry-popped" : ""} cherry-flavor-${flavor}`} aria-hidden="true"><img className="cherry-toast-glass" src={originalArtwork ? `${partyArt}coupe.webp` : special ? illustration : `${partyArt}red-coupe.webp`} alt="" /><span key={pops} className="cherry-flying-cork" />{Array.from({length:10}, (_,i) => <i key={i} className="cherry-bubble" style={{"--bubble-x": `${20 + i * 6}%`, "--bubble-delay": `${i * .07}s`}} />)}<img className="cherry-toast-bottle" src={`${partyArt}bottle.webp`} alt="" /></div></section>
    <ToastActivities bridal={bridal} language={language} motion={motion} glass={originalArtwork ? `${partyArt}coupe.webp` : special ? "/images/bridal/experience/clink-glass.png" : `${partyArt}red-coupe.webp`} onCelebrate={celebrate} />
    <PartyGames language={language} />
    <section className="cherry-section cherry-wishes" aria-label={text.wishes}><PartyForm kind="wish" theme={theme} text={text} motion={motion} /><div className="cherry-note-art" aria-hidden="true"><img src={special ? illustration : "/images/components/separated/bridal-peach-cherry-cherries.webp"} alt="" loading="lazy" /><p>{text.footer}</p></div></section>
    <section className="cherry-section cherry-rsvp" id="cherry-rsvp" tabIndex={-1} aria-label={text.rsvp}><PartyForm kind="reply" theme={theme} text={text} motion={motion} /><div className="cherry-rsvp-art" aria-hidden="true"><img src={originalArtwork ? `${partyArt}coupe.webp` : "/images/components/separated/bridal-peach-cherry-bow.webp"} alt="" loading="lazy" /><p>{text.footer}</p></div></section>
    <InvitationMakerFooter palette={special ? (mint ? "mint" : "sunny") : "cherry"} />
  </main>;
}
