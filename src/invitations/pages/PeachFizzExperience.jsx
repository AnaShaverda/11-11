import { captionValue } from "../../localization/captionValues.js";
import InvitationMakerFooter from "../components/InvitationMakerFooter.jsx";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../localization/LanguageContext.jsx";
import PeachFizzCheers from "../peach-fizz/PeachFizzCheers.jsx";
import PeachFizzGames from "../peach-fizz/PeachFizzGames.jsx";
import PeachFizzForm from "../peach-fizz/PeachFizzForm.jsx";
import { peachFizzCopy, peachAssets } from "../peach-fizz/copy.js";
import "../../styles/peach-fizz-experience.css";

export default function PeachFizzExperience() {
  const { language, setLanguage } = useLanguage();
  const text = peachFizzCopy[language] || peachFizzCopy.en;
  const [motion, setMotion] = useState(() => !matchMedia("(prefers-reduced-motion: reduce)").matches);
  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setMotion(!media.matches);
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  function calendar() {
    const data = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//11:11//Peach Fizz//EN", "BEGIN:VEVENT", "UID:birthday-peach-fizz-2027@1111.local", "DTSTAMP:20261010T000000Z", "DTSTART:20270912T160000Z", "DTEND:20270912T205900Z", "SUMMARY:Dea's birthday toast (demo)", "LOCATION:Tbilisi - exact address from host", "END:VEVENT", "END:VCALENDAR", ""].join("\r\n");
    const url = URL.createObjectURL(new Blob([data], { type: "text/calendar;charset=utf-8" }));
    const link = document.createElement("a"); link.href = url; link.download = "dea-peach-fizz.ics"; link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return <main className={`peach-fizz ${motion ? "pf-motion" : ""}`} lang={language}>
    <header className="pf-toolbar">
      <Link to="/invitations" className="pf-brand" aria-label={text.back}><span>11:11</span></Link>
      <div className="pf-tools">
        <button className="pf-language" onClick={() => setLanguage((language === "ka" ? "en" : "ka"))} aria-label={captionValue("invitations.pages.PeachFizzExperience.caption2", language)}>{captionValue("invitations.pages.PeachFizzExperience.caption3", language)}</button>
        <button className="pf-motion-control" aria-pressed={motion} onClick={() => setMotion(value => !value)}>{text.motion}<span className="pf-switch" aria-hidden="true" /></button>
        <a className="pf-button pf-toolbar-rsvp" href="#pf-rsvp">{text.rsvp}</a>
      </div>
    </header>
    <section tabIndex={-1} className="pf-section pf-hero" id="pf-top" aria-labelledby="pf-title">
      <div className="pf-wrap pf-hero-layout">
        <div className="pf-hero-copy"><h1 id="pf-title">{text.headline.map(line => <span key={line}>{line}</span>)}</h1>
          <p className="pf-birthday">{text.birthday}</p>
        </div>
        <div className="pf-hero-art"><img src={peachAssets.pair} alt="" width="1254" height="1254" fetchPriority="high" /></div>
        <div className="pf-hero-actions"><p className="pf-label pf-date">{text.date} / 20:00 / {text.city}</p><div><a className="pf-button" href="#pf-details">{text.invited}</a><a className="pf-button pf-outline" href="#pf-rsvp">{text.rsvp}</a></div></div>
      </div>
    </section>
    <section tabIndex={-1} className="pf-section pf-details" id="pf-details" aria-labelledby="pf-details-title">
      <div className="pf-wrap pf-details-layout">
        <div><h2 id="pf-details-title">{text.details.map(line => <span key={line}>{line}</span>)}</h2><p className="pf-birthday">{text.birthday}</p>
          <ul className="pf-event-facts"><li><time dateTime="2027-09-12">{text.date}</time></li><li><time dateTime="2027-09-12T20:00:00+04:00">20:00</time></li><li>{text.city}</li></ul>
          <button className="pf-button pf-outline pf-calendar" onClick={calendar}>{text.calendar}</button><p className="pf-venue">{text.venue}</p>
        </div>
        <div className="pf-evening"><h3 className="pf-label">{text.evening}</h3><ol className="pf-timeline">{["20:00", "21:00", "22:30", "00:00"].map((time, i) => <li key={time}><time>{time}</time><span>{text.schedule[i]}</span></li>)}</ol>
          <div className="pf-dress"><h3 className="pf-label">{text.dress}</h3><div className="pf-swatches" role="img" aria-label={captionValue("invitations.pages.PeachFizzExperience.caption4", language)}>{["#f7c0ae", "#aa91c2", "#e6ac24", "#153d58"].map(color => <span key={color} style={{ background: color }} />)}</div><p>{text.dressLine}</p></div>
        </div>
      </div>
    </section>
    <PeachFizzCheers text={text} motion={motion} />
    <PeachFizzGames text={text} />
    <section tabIndex={-1} className="pf-section pf-wishes" id="pf-wishes" aria-labelledby="pf-wishes-title"><div className="pf-wrap pf-form-layout">
      <PeachFizzForm kind="wish" text={text} motion={motion} />
      <div className="pf-wish-art" aria-hidden="true"><img src={peachAssets.left} alt="" width="738" height="1194" loading="lazy" /><p className="pf-hand">{text.wishSignature.map(line => <span key={line}>{line}</span>)}</p></div>
    </div></section>
    <section tabIndex={-1} className="pf-section pf-rsvp" id="pf-rsvp" aria-labelledby="pf-rsvp-title"><div className="pf-wrap pf-form-layout">
      <PeachFizzForm kind="reply" text={text} motion={motion} />
      <div className="pf-farewell"><img src={peachAssets.pair} alt="" width="1254" height="1254" loading="lazy" /><h2>{text.farewell}</h2></div>
    </div>
      <InvitationMakerFooter palette="peach" />
    </section>
  </main>;
}
