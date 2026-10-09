import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../../components/ui/Icon.jsx";
import { useLanguage } from "../../localization/LanguageContext.jsx";
import "../../styles/pizza-chef-experience.css";

const assets = "/images/birthday/little-pizza-chef/";
const copy = {
  en: { name: "Mia’s", title: "Pizza Party", line: "A little dough. A lot of birthday fun.", date: "18 JULY 2027", city: "TBILISI", start: "Let’s make pizza", motion: "Motion", mix: "MIX", make: "MAKE", celebrate: "CELEBRATE", details: "A birthday fresh from the oven.", intro: "Mia is turning 7. Join us for pizza-making, birthday cake, and kitchen fun with friends.", when: "Sunday, 18 July 2027", location: "Tbilisi", venue: "The host will share the exact location.", calendar: "Add to calendar", roll: "Roll the dough", create: "Make your masterpiece", cake: "Cake & birthday wishes", play: "Make your pizza", playTitle: "Your pizza. Your rules.", playIntro: "Choose your favorite toppings.", toppings: ["Basil", "Tomatoes", "Olives", "Cheese"], bake: "Bake my pizza", ready: "Ready for the oven.", baked: "A masterpiece, chef!", reset: "Make another pizza", wishes: "Birthday wishes for the chef.", wishIntro: "A little note. A lot of birthday love.", yourName: "Your name", wishLabel: "Your birthday wish", saveWish: "Save demo wish", editWish: "Edit your wish", wishSaved: "Your wish is saved on this device.", demo: "Preview invitation. Wishes and replies stay on this device.", session: "Saved for this session only.", rsvp: "Will you make pizza with us?", yes: "Yes, count me in", no: "I can’t make it", saveReply: "Save demo reply", thanks: "See you in the kitchen!", miss: "We’ll save you a slice.", replySaved: "Your reply is saved on this device.", editReply: "Change reply", back: "Back to the party", notes: "RECIPE NOTES", recipe: "A little kindness. A pinch of laughter. Friends to share it with.", attendance: "Attendance", wishError: "Please write your birthday wish." },
  ka: { name: "მიას", title: "პიცის წვეულება", line: "ცოტაოდენი ცომი. ბევრი მხიარულება.", date: "18 ივლისი 2027", city: "თბილისი", start: "მოვამზადოთ პიცა", motion: "მოძრაობა", mix: "მოვზილოთ", make: "მოვამზადოთ", celebrate: "ვიზეიმოთ", details: "ღუმელიდან გამოსული დაბადების დღე.", intro: "მია 7 წლის ხდება. ერთად მოვამზადოთ პიცა, მივირთვათ ტორტი და გავერთოთ მეგობრებთან.", when: "კვირა, 18 ივლისი 2027", location: "თბილისი", venue: "ზუსტ მისამართს მასპინძელი გაგიზიარებთ.", calendar: "კალენდარში დამატება", roll: "მოვზილოთ ცომი", create: "შევქმნათ ჩვენი პიცა", cake: "ტორტი და სურვილები", play: "შექმენი შენი პიცა", playTitle: "შენი პიცა. შენი წესები.", playIntro: "აირჩიე საყვარელი ინგრედიენტები.", toppings: ["რეჰანი", "პომიდორი", "ზეთისხილი", "ყველი"], bake: "გამოვაცხოთ პიცა", ready: "პიცა ღუმელისთვის მზადაა.", baked: "შედევრია, შეფო!", reset: "კიდევ ერთი პიცა", wishes: "სურვილები პატარა შეფს.", wishIntro: "პატარა წერილი. ბევრი სიყვარული.", yourName: "შენი სახელი", wishLabel: "შენი სურვილი", saveWish: "დემო სურვილის შენახვა", editWish: "სურვილის შეცვლა", wishSaved: "შენი სურვილი ამ მოწყობილობაზე შეინახა.", demo: "დემო მოსაწვევი. სურვილები და პასუხები რჩება ამ მოწყობილობაზე.", session: "შენახულია მხოლოდ ამ სესიაში.", rsvp: "ჩვენთან ერთად მოამზადებ პიცას?", yes: "დიახ, მოვდივარ", no: "ვერ მოვდივარ", saveReply: "დემო პასუხის შენახვა", thanks: "სამზარეულოში გელოდებით!", miss: "პიცის ნაჭერს შეგინახავთ.", replySaved: "პასუხი ამ მოწყობილობაზე შეინახა.", editReply: "პასუხის შეცვლა", back: "წვეულების დასაწყისში", notes: "რეცეპტის ჩანაწერები", recipe: "ცოტა სიკეთე. ბევრი სიცილი. მეგობრები ერთად.", attendance: "დასწრება", wishError: "დაწერე შენი სურვილი." }
};
const sliceCopy = {
  en: { line: "Good friends. Great slices. Happy birthdays.", start: "Join the pizza party", mix: "GOOD FRIENDS", make: "GREAT SLICES", celebrate: "HAPPY BIRTHDAYS", details: "A birthday by the slice.", intro: "Join Mia for pizza, birthday cake, and a joyful afternoon with friends.", roll: "Meet the club", create: "Pizza & party games", play: "Design your dream pizza", playTitle: "Your slice of imagination.", playIntro: "Build a pizza just for fun.", wishes: "A slice of birthday love.", rsvp: "Will you join the club?", thanks: "You’re in the club!", notes: "RECIPE FOR A GREAT BIRTHDAY" },
  ka: { line: "კარგი მეგობრები. გემრიელი პიცა. ბედნიერი დაბადების დღე.", start: "შემოუერთდი წვეულებას", mix: "კარგი მეგობრები", make: "გემრიელი პიცა", celebrate: "ბედნიერი დაბადების დღე", details: "დაბადების დღე პიცის ნაჭრებით.", intro: "მიასთან ერთად მივირთვათ პიცა, ტორტი და გავატაროთ მხიარული დღე მეგობრებთან.", roll: "შევხვდეთ მეგობრებს", create: "პიცა და თამაშები", play: "შექმენი საოცნებო პიცა", playTitle: "შენი გემრიელი წარმოსახვა.", playIntro: "შექმენი პიცა გასართობად.", wishes: "სიყვარულით სავსე სურვილები.", rsvp: "შემოუერთდები კლუბს?", thanks: "უკვე კლუბში ხარ!", notes: "ბედნიერი დაბადების დღის რეცეპტი" }
};
function readSaved(kind, theme) {
  try { const value = JSON.parse(localStorage.getItem(`1111-${theme}-${kind}-v1`)); return typeof value?.name === "string" && (kind === "wish" ? typeof value.message === "string" : ["yes", "no"].includes(value.attending)) ? value : null; } catch { return null; }
}
async function partyConfetti() { const { default: confetti } = await import("canvas-confetti"); confetti({ particleCount: 65, spread: 95, colors: ["#c71f2b", "#66794b", "#f1c65b"], disableForReducedMotion: true }); }
function DemoForm({ kind, text, motion, theme }) {
  const [saved, setSaved] = useState(() => readSaved(kind, theme));
  const [name, setName] = useState(() => readSaved(kind, theme)?.name || "");
  const [message, setMessage] = useState(() => readSaved(kind, theme)?.message || "");
  const [attending, setAttending] = useState(() => readSaved(kind, theme)?.attending || "yes");
  const [stored, setStored] = useState(true);
  const wish = kind === "wish";
  function save(event) {
    event.preventDefault();
    if (wish && !message.trim()) { const field = event.currentTarget.elements.namedItem("message"); field.setCustomValidity(text.wishError); field.reportValidity(); return; }
    const next = wish ? { name: name.trim(), message: message.trim() } : { name: name.trim(), attending };
    try { localStorage.setItem(`1111-${theme}-${kind}-v1`, JSON.stringify(next)); setStored(true); } catch { setStored(false); }
    setSaved(next); if (motion && (wish || attending === "yes")) partyConfetti();
  }
  function edit() { setSaved(null); try { localStorage.removeItem(`1111-${theme}-${kind}-v1`); } catch { /* Local editing still works. */ } }
  return <div className="chef-form-wrap">
    <h2 id={`chef-${kind}-title`}>{saved && !wish ? (saved.attending === "yes" ? text.thanks : text.miss) : wish ? text.wishes : text.rsvp}</h2>
    {wish && <p>{text.wishIntro}</p>}
    {saved ? <div className="chef-saved" aria-live="polite">{wish && <p className="chef-saved-message">{saved.message}</p>}<p>{saved.name}</p><small>{stored ? (wish ? text.wishSaved : text.replySaved) : text.session}</small><button className="chef-text-link" onClick={edit}>{wish ? text.editWish : text.editReply}<Icon name="pen" size={18} /></button></div> : <form onSubmit={save}>
      <label htmlFor={`chef-${kind}-name`}>{text.yourName}</label><input id={`chef-${kind}-name`} autoComplete="name" value={name} onChange={e => setName(e.target.value)} required pattern={".*\\S.*"} maxLength={80} />
      {wish ? <><label htmlFor="chef-message">{text.wishLabel}</label><textarea id="chef-message" name="message" rows={4} required maxLength={400} value={message} onChange={e => { e.target.setCustomValidity(""); setMessage(e.target.value); }} /></> : <fieldset><legend>{text.attendance}</legend>{["yes", "no"].map(option => <label key={option}><input type="radio" name="attendance" value={option} checked={attending === option} onChange={() => setAttending(option)} />{text[option]}</label>)}</fieldset>}
      <button className="chef-primary" type="submit">{wish ? text.saveWish : text.saveReply}<Icon name="arrow-right" size={20} /></button>
    </form>}
    <p className="chef-demo">{text.demo}</p>
  </div>;
}
const toppingPositions = [
  [[30, 28], [69, 39], [41, 60], [65, 72], [22, 63]],
  [[48, 25], [75, 55], [46, 74], [24, 43], [51, 48]],
  [[34, 42], [62, 29], [67, 59], [32, 74], [45, 61]],
  [[51, 36], [28, 57], [71, 71], [41, 72], [63, 47]]
];
export default function PizzaChefExperience({ theme = "pizza-chef" }) {
  const slice = theme === "slice-club";
  const illustration = slice ? "/images/birthday/slice-club/pizza-slice.webp" : `${assets}pizza-peel.webp`;
  const { language, setLanguage } = useLanguage();
  const text = { ...(copy[language] || copy.en), ...(slice ? sliceCopy[language] || sliceCopy.en : {}) };
  const [motion, setMotion] = useState(() => !matchMedia("(prefers-reduced-motion: reduce)").matches);
  const [selected, setSelected] = useState([0, 1]);
  const [baked, setBaked] = useState(false);
  const page = useRef(null);
  useEffect(() => { const preference = matchMedia("(prefers-reduced-motion: reduce)"); const update = () => setMotion(!preference.matches); preference.addEventListener("change", update); return () => preference.removeEventListener("change", update); }, []);
  useEffect(() => {
    if (!motion) return;
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add("chef-revealed"); observer.unobserve(entry.target); } }), { threshold: .08 });
    page.current.querySelectorAll("[data-chef-reveal]").forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [motion]);
  function goTo(id) { const element = document.getElementById(id); element.scrollIntoView({ behavior: motion ? "smooth" : "instant", block: "start" }); element.focus({ preventScroll: true }); }
  function toggleTopping(index) { setBaked(false); setSelected(current => current.includes(index) ? current.filter(item => item !== index) : [...current, index]); }
  function bake() { setBaked(true); if (motion) partyConfetti(); }
  function calendar() {
    const content = `BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//11:11//Little Pizza Chef//EN\r\nBEGIN:VEVENT\r\nUID:${theme}-2027@1111.local\r\nDTSTAMP:20261009T000000Z\r\nDTSTART:20270718T100000Z\r\nDTEND:20270718T130000Z\r\nSUMMARY:Mia's Pizza Party (demo)\r\nLOCATION:Tbilisi - exact location from host\r\nEND:VEVENT\r\nEND:VCALENDAR\r\n`;
    const url = URL.createObjectURL(new Blob([content], { type: "text/calendar;charset=utf-8" })); const link = document.createElement("a"); link.href = url; link.download = "mias-pizza-party.ics"; link.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return <main ref={page} className={`chef-experience ${slice ? "slice-club-experience" : ""} ${motion ? "chef-motion" : ""}`} lang={language}>
    <section className="chef-cover" id="chef-cover" aria-labelledby="chef-title" tabIndex={-1}>
      <header className="chef-toolbar"><Link to="/invitations" aria-label={language === "ka" ? "მოსაწვევების კოლექცია" : "Back to invitations"}><Icon name="arrow-left" size={20} />11:11</Link><div><button onClick={() => setLanguage(language === "ka" ? "en" : "ka")} aria-label={language === "ka" ? "Switch to English" : "ქართულად"}>{language === "ka" ? "EN" : "KA"}</button><button aria-pressed={motion} onClick={() => setMotion(value => !value)}>{text.motion}<span className="chef-motion-switch" aria-hidden="true" /></button></div></header>
      <div className="chef-hero-layout"><div className="chef-hero-copy"><h1 id="chef-title"><span>{text.name}</span>{text.title}</h1><p>{text.line}</p><p className="chef-date">{text.date} / 14:00 / {text.city}</p><button className="chef-primary" onClick={() => goTo("chef-details")}>{text.start}<Icon name="arrow-right" size={20} /></button></div><img className="chef-hero-pizza" src={illustration} alt="" />{slice && <img className="slice-second-pizza" src={illustration} alt="" />}</div>
      <div className="chef-ticker" aria-hidden="true"><span>{text.mix}</span><span>{text.make}</span><span>{text.celebrate}</span></div>
    </section>
    <section className="chef-section chef-details" id="chef-details" tabIndex={-1} aria-labelledby="chef-details-title">
      <div className="chef-copy" data-chef-reveal><h2 id="chef-details-title">{text.details}</h2><p>{text.intro}</p><dl className="chef-facts"><div><dt>{text.when}</dt><dd>14:00 – 17:00</dd><button className="chef-text-link" onClick={calendar}>{text.calendar}<Icon name="arrow-up-right" size={17} /></button></div><div><dt>{text.location}</dt><dd>{text.venue}</dd></div></dl><ol className="chef-schedule">{[["14:00", text.roll], ["14:30", text.create], ["15:30", text.cake]].map(([time, title]) => <li key={time}><time>{time}</time><span>{title}</span></li>)}</ol><button className="chef-text-link" onClick={() => goTo("chef-play")}>{text.play}<Icon name="arrow-right" size={20} /></button></div>
      <div className="chef-details-art" aria-hidden="true"><span /><img src={illustration} alt="" loading="lazy" /></div>
    </section>
    <section className="chef-section chef-play" id="chef-play" tabIndex={-1} aria-labelledby="chef-play-title">
      <div className="chef-copy" data-chef-reveal><h2 id="chef-play-title">{text.playTitle}</h2><p>{text.playIntro}</p><div className="chef-toppings" role="group" aria-label={text.playIntro}>{text.toppings.map((label, index) => <button key={index} aria-pressed={selected.includes(index)} onClick={() => toggleTopping(index)}><span className={`chef-ingredient chef-ingredient-${index}`} aria-hidden="true" />{label}</button>)}</div><button className="chef-primary" onClick={baked ? () => { setBaked(false); setSelected([]); } : bake}>{baked ? text.reset : text.bake}<Icon name="arrow-right" size={20} /></button><p className="chef-bake-status" role="status">{baked ? text.baked : text.ready}</p><button className="chef-text-link" onClick={() => goTo("chef-wishes")}>{text.wishes}<Icon name="arrow-down" size={20} /></button></div>
      <div className={`chef-pizza-builder ${baked ? "chef-is-baked" : ""}`} role="img" aria-label={`${text.play}: ${selected.map(index => text.toppings[index]).join(", ") || (language === "ka" ? "ინგრედიენტების გარეშე" : "no toppings")}`}><img src={`${assets}pizza-base.png`} alt="" loading="lazy" />{selected.flatMap(index => toppingPositions[index].map(([x, y], n) => <span key={`${index}-${n}`} className={`chef-ingredient chef-ingredient-${index} chef-pizza-topping`} style={{ left: `${x}%`, top: `${y}%`, rotate: `${n * 49 + index * 30}deg` }} />))}</div>
    </section>
    <section className="chef-section chef-wishes" id="chef-wishes" tabIndex={-1} aria-labelledby="chef-wish-title"><div data-chef-reveal><DemoForm kind="wish" text={text} motion={motion} theme={theme} /><button className="chef-text-link" onClick={() => goTo("chef-rsvp")}>{text.rsvp}<Icon name="arrow-down" size={20} /></button></div><div className="chef-wish-art" aria-hidden="true"><img src={illustration} alt="" loading="lazy" /><div className="chef-recipe"><span>{text.notes}</span>{!slice && <p>{text.recipe}</p>}<i /><i /><i /></div></div></section>
    <section className="chef-section chef-rsvp" id="chef-rsvp" tabIndex={-1} aria-labelledby="chef-reply-title"><div data-chef-reveal><DemoForm kind="reply" text={text} motion={motion} theme={theme} /><button className="chef-text-link" onClick={() => goTo("chef-cover")}>{text.back}<Icon name="arrow-left" size={20} /></button></div><div className="chef-rsvp-art" aria-hidden="true"><img src={illustration} alt="" loading="lazy" /><p>{text.mix}<br />{text.make}<br />{text.celebrate}</p></div></section>
  </main>;
}
