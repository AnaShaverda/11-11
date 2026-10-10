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
const words = {
  en: { motion: "Motion", invited: "You’re invited", rsvp: "RSVP", details: "Party details.", intro: "Cherry cocktails, a little sparkle, and all our favorite girls. A night made for memories.", date: "12 SEPTEMBER 2027", city: "TBILISI", venue: "Exact address to be shared by the host.", calendar: "Add to calendar", dress: "The dress code", dressLine: "A little pink. A little red. A lot of you.", schedule: ["Drinks, cherries & hellos", "Dinner with the girls", "Cake & a birthday toast", "One more song"], toast: "Make a", toastItalic: "toast.", toastLine: "To good friends and even better nights.", pop: "Pop the cork", popped: "Cheers to the girls!", again: "Pop it again", wishes: "A little love", wishesItalic: "note.", wishLine: "A few kind words go a long way.", name: "Your name", message: "Your wish", wishSave: "Save demo wish", replySave: "Save demo reply", yes: "Yes, I’ll be there", no: "Sadly, I can’t make it", attendance: "Will you be joining?", saved: "Saved on this device.", session: "Saved for this session only.", edit: "Edit", thanks: "It’s a date!", miss: "We’ll miss you!", demo: "Preview invitation. Wishes and replies stay on this device.", back: "Back to the party", footer: "Same girls. Brighter nights.", bridal: "Bridal", birthday: "Birthday", nino: "Dea’s", ana: "Ana’s" },
  ka: { motion: "მოძრაობა", invited: "გეპატიჟებით", rsvp: "პასუხი", details: "წვეულების დეტალები.", intro: "ალუბლის კოქტეილები, ცოტა ბრწყინვალება და საყვარელი მეგობრები. მოგონებებით სავსე საღამო.", date: "12 სექტემბერი 2027", city: "თბილისი", venue: "ზუსტ მისამართს მასპინძელი გაგიზიარებთ.", calendar: "კალენდარში დამატება", dress: "დრესკოდი", dressLine: "ცოტა ვარდისფერი. ცოტა წითელი. ბევრი სიხარული.", schedule: ["კოქტეილები და შეხვედრა", "ვახშამი მეგობრებთან", "ტორტი და სადღეგრძელო", "კიდევ ერთი სიმღერა"], toast: "ერთი", toastItalic: "სადღეგრძელო.", toastLine: "კარგ მეგობრებს და ბედნიერ საღამოებს!", pop: "გავხსნათ ბოთლი", popped: "გაგვიმარჯოს!", again: "კიდევ ერთხელ", wishes: "პატარა", wishesItalic: "სურვილი.", wishLine: "რამდენიმე თბილი სიტყვა.", name: "შენი სახელი", message: "შენი სურვილი", wishSave: "დემო სურვილის შენახვა", replySave: "დემო პასუხის შენახვა", yes: "დიახ, მოვდივარ", no: "სამწუხაროდ, ვერ მოვდივარ", attendance: "შემოგვიერთდები?", saved: "შენახულია ამ მოწყობილობაზე.", session: "შენახულია მხოლოდ ამ სესიაში.", edit: "შეცვლა", thanks: "გელოდებით!", miss: "დაგვაკლდები!", demo: "დემო მოსაწვევი. სურვილები და პასუხები რჩება ამ მოწყობილობაზე.", back: "წვეულების დასაწყისში", footer: "იგივე მეგობრები. უფრო ნათელი საღამოები.", bridal: "საქორწილო", birthday: "დაბადების დღის", nino: "დეას", ana: "ანას" }
};
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
  const peach = variant === "peach-fizz";
  const specialText = special ? { ...base,
    schedule: language === "ka" ? ["კოქტეილები და შეხვედრა", "ვახშამი მეგობრებთან", "სადღეგრძელო პატარძალს", "მუსიკა და ცეკვა"] : ["Welcome drinks & hellos", "Dinner with the girls", "A toast to the bride", "Dancing into the night"],
    details: language === "ka" ? "დაუვიწყარი საღამო." : mint ? "A night to remember." : "A little sunshine before forever.",
    intro: language === "ka" ? "საყვარელი მეგობრები, შამპანური და პატარძლის ახალი თავგადასავალი. ერთად ვიზეიმოთ!" : mint ? "A little bubbly for a bigger happily ever after. Join Ana and her favorite girls for an evening in full bloom." : "Good people, golden drinks, and a brighter tomorrow. Let’s celebrate Ana’s next chapter together.",
    dressLine: language === "ka" ? "აირჩიე შენი საყვარელი ფერები და განწყობა." : mint ? "Mint, pink & a little sparkle." : "Butter yellow, lavender & your sunny self.",
    footer: language === "ka" ? "კარგი მეგობრები. ბედნიერი პატარძალი." : mint ? "Good friends. Brighter brides." : "Good friends. Brighter tomorrows.",
    toast: language === "ka" ? "გავხსნათ" : mint ? "Make it" : "Pop the",
    toastItalic: language === "ka" ? "შამპანური." : mint ? "official." : "cork.",
    toastLine: language === "ka" ? "პატარძლის ახალ თავგადასავალს გაუმარჯოს!" : "A little pop for her next big chapter.",
  } : base;
  const text = peach ? { ...base,
    schedule: language === "ka" ? ["კოქტეილები და შეხვედრა", "ვახშამი მეგობრებთან", "ტორტი და სადღეგრძელო", "მუსიკა და ცეკვა"] : ["Peach fizz & hellos", "Dinner with the girls", "Cake & a birthday toast", "Dancing into the night"],
    details: language === "ka" ? "ბუშტუკებით სავსე დაბადების დღე." : "A brighter year. A little fizz.",
    intro: language === "ka" ? "დეას დაბადების დღე — მეგობრები, ატმის კოქტეილები და ბევრი მხიარულება." : "Fine bubbles, peach cocktails, and our favorite people. Let’s raise a glass to Dea and another wonderful year.",
    dressLine: language === "ka" ? "ატმისფერი, ოქროსფერი და ცოტა ბრწყინვალება." : "Peach, champagne gold & a little sparkle.",
    footer: language === "ka" ? "მეგობრები. ბუშტუკები. ბედნიერი დღეები." : "Peach people. Happier days.",
    toast: language === "ka" ? "გავხსნათ" : "Pop the", toastItalic: language === "ka" ? "შამპანური." : "cork.",
    toastLine: language === "ka" ? "კიდევ ერთ ბედნიერ წელს გაუმარჯოს!" : "A little pop for a brighter year ahead.",
  } : specialText;
  if (originalArtwork) { text.intro = text.intro.replaceAll("Ana", "Mariam"); text.ana = language === "ka" ? "მარიამის" : "Mariam’s"; text.dressLine = language === "ka" ? mint ? "პიტნისფერი, ვარდისფერი და ატმისფერი." : "ყვითელი, ვარდისფერი და პიტნისფერი." : mint ? "Mint, pink & peach." : "Butter yellow, pink & mint."; }
  const coverAssets = originalArtwork ? selectedBridalAssets[`bridal-${variant}`] : null;
  const originalFont = originalArtwork ? getDesignFont(coverAssets.selectedBridal.font, language).style : {};
  const illustration = originalArtwork ? coverAssets.selectedBridal.artwork : peach ? "/images/birthday/peach-fizz/experience-hero.png" : special ? `/images/bridal/experience/${mint ? "mint" : "sunny"}-hero.png` : "/images/party/cherry-tower/champagne-artwork.webp";
  const partyArt = peach ? "/images/components/separated/birthday-peach-fizz-" : special ? `/images/components/separated/bridal-${variant}-` : art;
  const [flavor, setFlavor] = useState(0);
  const popTimer = useRef(null);
  const [popping, setPopping] = useState(false);
  const [motion, setMotion] = useState(() => !matchMedia("(prefers-reduced-motion: reduce)").matches);
  const [pops, setPops] = useState(0);
  const theme = special && !originalArtwork && !peach ? `bridal-${mint ? "mint-ribbon" : "sunny-ribbon"}` : special ? `${bridal ? "bridal" : "birthday"}-${variant}` : bridal ? "bridal-cherry-tower" : "birthday-cherry-tower";
  useEffect(() => { const media = matchMedia("(prefers-reduced-motion: reduce)"); const update = () => setMotion(!media.matches); media.addEventListener("change", update); return () => media.removeEventListener("change", update); }, []);
  useEffect(() => () => clearTimeout(popTimer.current), []);
  function pop() {
    setPops(value => value + 1); setPopping(true);
    clearTimeout(popTimer.current); popTimer.current = setTimeout(() => setPopping(false), 1400);
    if (motion) celebrate();
  }
  function go(id) { const target = document.getElementById(id); target.scrollIntoView({ behavior: motion ? "smooth" : "instant" }); target.focus({ preventScroll: true }); }
  function calendar() {
    const title = originalArtwork ? `Mariam's ${mint ? "Mint Bash" : "Sunny Pop"}` : peach ? "Dea's Peach Fizz Birthday" : special ? `Ana's ${mint ? "Mint Bash" : "Sunny Pop"}` : bridal ? "Ana's Bridal Toast" : "Dea's Birthday Toast";
    const data = `BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//11:11//Cherry Tower//EN\r\nBEGIN:VEVENT\r\nUID:${theme}-2027@1111.local\r\nDTSTAMP:20261009T000000Z\r\nDTSTART:20270912T${originalArtwork ? "16" : "15"}0000Z\r\nDTEND:20270912T195900Z\r\nSUMMARY:${title} (demo)\r\nLOCATION:Tbilisi - exact address from host\r\nEND:VEVENT\r\nEND:VCALENDAR\r\n`;
    const url = URL.createObjectURL(new Blob([data], { type: "text/calendar;charset=utf-8" })); const link = document.createElement("a"); link.href = url; link.download = `${theme}.ics`; link.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return <main style={originalFont} className={`cherry-experience ${originalArtwork ? "party-original-art" : ""} ${special ? `cherry-${variant}` : ""} ${motion ? "cherry-motion" : ""}`} lang={language}>
    <section className="cherry-cover" id="cherry-cover" tabIndex={-1} aria-labelledby="cherry-title">
      <header className="cherry-toolbar"><Link to="/invitations" aria-label={language === "ka" ? "მოსაწვევების კოლექცია" : "Back to invitations"}><InvitationArtwork name="arrow-left" size={17} />11:11</Link><div><button onClick={() => setLanguage(language === "ka" ? "en" : "ka")}>{language === "ka" ? "EN" : "KA"}</button><button aria-pressed={motion} onClick={() => setMotion(current => !current)}>{text.motion}<span className="cherry-switch" /></button></div></header>
      <div className="cherry-hero">{originalArtwork ? <><h1 className="party-visually-hidden" id="cherry-title">{language === "ka" ? "მარიამის პატარძლის წვეულება" : "Mariam’s Bridal Party"}</h1><div className="party-cover-poster invitation-art" style={{"--cover-image": `url(${coverAssets.coverImage})`, "--showcase-ink": coverAssets.selectedBridal.ink}}><SelectedBridalPoster slug={`bridal-${variant}`} sample={{...selectedBridalSamples[`bridal-${variant}`], ...(language === "ka" ? {headline:coverAssets.selectedBridal.kaHeadline, opening:"პატარძლისთვის", posterName:"მარიამი", date:"12 სექტემბერი 2027", location:"თბილისი"} : {})}} assets={coverAssets.selectedBridal} large /></div></> : <><div className="cherry-title-wrap"><h1 id="cherry-title"><span>{bridal ? text.ana : text.nino}</span><span>{special ? (language === "ka" ? peach ? "ატმისფერი" : mint ? "პიტნისფერი" : "მზიანი" : peach ? "Peach" : mint ? "Mint" : "Sunny") : bridal ? text.bridal : text.birthday}</span><em>{language === "ka" ? "წვეულება." : peach ? "fizz." : special ? "bash." : "toast."}</em></h1></div><div className="cherry-tower"><img src={illustration} alt="" /><span className="cherry-spark cherry-spark-one" aria-hidden="true"><InvitationMotif name="sparkle" /></span><span className="cherry-spark cherry-spark-two" aria-hidden="true"><InvitationMotif name="sparkle" /></span></div></>}<div className="cherry-hero-actions"><p className="cherry-date">{text.date} / {originalArtwork ? "20:00" : "19:00"} / {text.city}</p><div><button className="cherry-button" onClick={() => go("cherry-details")}>{text.invited}<InvitationArtwork name="arrow-down" size={18} /></button><button className="cherry-button cherry-outline" onClick={() => go("cherry-rsvp")}>{text.rsvp}</button></div></div></div>
    </section>
    <section className="cherry-section cherry-details" id="cherry-details" tabIndex={-1} aria-labelledby="cherry-details-title"><div><h2 id="cherry-details-title">{text.details}</h2><p className="cherry-intro">{text.intro}</p><div className="cherry-dress"><span>{text.dress}</span><p>{text.dressLine}</p><i /><i /><i /></div></div><div className="cherry-details-info"><p className="cherry-date">{text.date}<br />{text.city}</p><ol className="cherry-timeline">{(originalArtwork ? ["20:00", "20:30", "21:30", "23:00"] : ["19:00", "20:00", "21:30", "23:00"]).map((time, i) => <li key={time}><time>{time}</time><span>{bridal && i === 2 ? (language === "ka" ? "სადღეგრძელო პატარძალს" : "A toast to the bride") : text.schedule[i]}</span></li>)}</ol><p>{text.venue}</p><button className="cherry-link" onClick={calendar}>{text.calendar}<InvitationArtwork name="arrow-up-right" size={18} /></button></div></section>
    {bridal && <BridalPhotoCollage language={language} style="cherry" accentArt={originalArtwork ? `${partyArt}coupe.webp` : `${partyArt}bottle.webp`} />}
    <section className="cherry-section cherry-toast" aria-labelledby="cherry-toast-title"><div><h2 id="cherry-toast-title">{text.toast}<br /><em>{text.toastItalic}</em></h2><p>{text.toastLine}</p><button className="cherry-button cherry-outline" onClick={pop}>{pops ? text.again : text.pop}<InvitationArtwork name="sparkle" size={20} /></button>{special && <div className="cherry-flavors" role="group" aria-label={language === "ka" ? "აირჩიე სადღეგრძელო" : "Choose your toast"}>{(language === "ka" ? ["მეგობრებს", bridal ? "პატარძალს" : "იუბილარს", "სიხარულს"] : ["To the girls", bridal ? "To the bride" : "To the birthday girl", "To the good life"]).map((label, i) => <button key={label} aria-pressed={flavor === i} onClick={() => setFlavor(i)}>{label}</button>)}</div>}<p className="cherry-pop-status" role="status">{pops > 0 ? special ? (language === "ka" ? ["მეგობრებს გაუმარჯოს!", bridal ? "პატარძალს გაუმარჯოს!" : "იუბილარს გაუმარჯოს!", "სიხარულს გაუმარჯოს!"][flavor] : ["Same girls. Higher standards!", bridal ? "To her happily ever after!" : "To her brightest year yet!", "More bubbles, please!"][flavor]) : text.popped : ""}</p></div><div className={`cherry-toast-art ${popping ? "cherry-popped" : ""} cherry-flavor-${flavor}`} aria-hidden="true"><img className="cherry-toast-glass" src={originalArtwork ? `${partyArt}coupe.webp` : special ? illustration : `${partyArt}red-coupe.webp`} alt="" /><span key={pops} className="cherry-flying-cork" />{Array.from({length:10}, (_,i) => <i key={i} className="cherry-bubble" style={{"--bubble-x": `${20 + i * 6}%`, "--bubble-delay": `${i * .07}s`}} />)}<img className="cherry-toast-bottle" src={peach ? "/images/components/separated/birthday-cherry-tower-bottle.webp" : `${partyArt}bottle.webp`} alt="" /></div></section>
    <ToastActivities bridal={bridal} language={language} motion={motion} glass={originalArtwork ? `${partyArt}coupe.webp` : special ? "/images/bridal/experience/clink-glass.png" : `${partyArt}red-coupe.webp`} onCelebrate={celebrate} />
    <PartyGames language={language} />
    <section className="cherry-section cherry-wishes" aria-label={text.wishes}><PartyForm kind="wish" theme={theme} text={text} motion={motion} /><div className="cherry-note-art" aria-hidden="true"><img src={special ? illustration : "/images/components/separated/bridal-peach-cherry-cherries.webp"} alt="" loading="lazy" /><p>{text.footer}</p></div></section>
    <section className="cherry-section cherry-rsvp" id="cherry-rsvp" tabIndex={-1} aria-label={text.rsvp}><PartyForm kind="reply" theme={theme} text={text} motion={motion} /><div className="cherry-rsvp-art" aria-hidden="true"><img src={originalArtwork ? `${partyArt}coupe.webp` : "/images/components/separated/bridal-peach-cherry-bow.webp"} alt="" loading="lazy" /><p>{text.footer}</p></div></section>
    <footer className="cherry-footer"><Link to="/invitations">11:11</Link><button className="cherry-link" onClick={() => go("cherry-cover")}>{text.back}<InvitationArtwork name="arrow-up-right" size={18} /></button></footer>
  </main>;
}
