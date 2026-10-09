import { useRibbonCopy } from "./copy.js";
import { useEffect, useRef, useState } from "react";
import RibbonSketchCamera from "./RibbonSketchCamera.jsx";
import { ribbonAssets } from "./assets.js";
import "./design.css";
import RibbonSketchDiary from "./RibbonSketchDiary.jsx";
export default function RibbonSketchDesign({
  actions,
  state
}) {
  const tr = useRibbonCopy();
  const [tab, setTab] = useState("rsvp");
  const [cheers, setCheers] = useState(0);
  const scene = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      entry.target.classList.toggle("is-visible", entry.isIntersecting);
    }), {
      threshold: .12
    });
    scene.current.querySelectorAll(".rsb-reveal").forEach(node => observer.observe(node));
    let previousY = window.scrollY;
    const direction = () => {
      scene.current.dataset.scrollDirection = window.scrollY < previousY ? "up" : "down";
      previousY = window.scrollY;
    };
    window.addEventListener("scroll", direction, {
      passive: true
    });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", direction);
    };
  }, []);
  function go(id) {
    document.getElementById(id)?.scrollIntoView({
      behavior: state.motion ? "smooth" : "instant",
      block: "start"
    });
  }
  async function celebrate() {
    setCheers(value => value + 1);
    if (!state.motion) return;
    const {
      default: confetti
    } = await import("canvas-confetti");
    confetti({
      particleCount: 45,
      spread: 65,
      colors: ["#ad1626", "#f4cbd5", "#731d34"],
      origin: {
        y: .64
      },
      disableForReducedMotion: true
    });
  }
  return <div className="rsb-design" ref={scene}>

    <header className="rsb-header">
      <nav aria-label={tr("Invitation sections")}><button type="button" onClick={() => go("party-home")}>{tr("Home")}</button><button type="button" onClick={() => go("party-details")}>{tr("Details")}</button><button type="button" onClick={() => go("memories")}>{tr("Photos")}</button><button type="button" onClick={() => go("party-reply")}>{tr("RSVP")}</button></nav>
      <span className="rsb-header-note">{tr("A little party")}<br />{tr("goes a long way")}<img src="/images/birthday/ribbon-sketch/line-ornament.webp" alt="" /></span>
    </header>
    <section className="rsb-hero" id="party-home" data-name="Birthday girl era">
      <p className="rsb-hero-aside">{tr("Good friends")}<br />{tr("Better times")}<br />{tr("Birthday girl era")}<br /><span className="rsb-hand">♡</span></p>
      <div className="rsb-hero-copy"><h1>{tr("MIA\u2019S")}</h1><p className="rsb-hero-era">{tr("birthday girl era \u2661")}</p><p className="rsb-hero-line">{tr("Same girl. More cake.")}</p><button type="button" className="rsb-button" onClick={() => go("party-reply")}>{tr("I\u2019ll be there")}<span aria-hidden="true">›</span></button></div>
      <button type="button" className="rsb-cheers" onClick={celebrate} aria-label={tr("Make a little cheers")}><img key={cheers} className={cheers ? tr("is-cheering") : ""} src="/images/birthday/ribbon-sketch/sketched-coupe.png" alt={tr("Champagne coupe tied with a sketched ribbon")} /><span className="rsb-hand">{tr("More")}<br />{tr("champagne")}<br />{tr("please \u2661")}</span></button>
    </section>
    <section className="rsb-details rsb-reveal" id="party-details" aria-label={tr("Party details")}>
      <div className="rsb-date-art"><span>{tr("23")}</span><p>{tr("MAY 2027")}</p><small>{tr("A very special day")}<br /><span className="rsb-hand">♡</span></small></div>
      <div className="rsb-detail-copy"><dl><div><dt>{tr("Time")}</dt><dd>{tr("17:00 \u2014 late")}</dd></div><div><dt>{tr("Location")}</dt><dd><strong>{tr("Tbilisi, Georgia")}</strong><br />{tr("Exact address shared by the host")}</dd></div><div><dt>{tr("Dress code")}</dt><dd>{tr("Pretty in pink")}<br /><em>{tr("A bow, a little sparkle, and you.")}</em></dd></div><div><dt>{tr("Note")}</dt><dd>{tr("Good food, great company")}<br />{tr("and a whole lot of love.")}</dd></div></dl><div className="rsb-detail-actions"><button type="button" className="rsb-button rsb-outline" onClick={actions.calendar}>{tr("Add to calendar")}<span>›</span></button><button type="button" className="rsb-button rsb-outline" onClick={actions.location}>{tr("Get directions")}<span>›</span></button><p className="rsb-hand">{tr("See you there! \u2661")}</p></div></div>
    </section>
    <RibbonSketchCamera motion={state.motion} />
    <RibbonSketchDiary />
    <section className="rsb-reply rsb-reveal" id="party-reply" aria-labelledby="rsb-reply-title">
      <div className="rsb-reply-heading"><h2 id="rsb-reply-title">{tr("Will you")}<br />{tr("be there?")}</h2><img src="/images/birthday/ribbon-sketch/line-ornament.webp" alt="" /><p className="rsb-reply-note">{tr("It wouldn\u2019t be the same")}<br />{tr("without you")}<br /><span className="rsb-hand">♡</span></p></div>
      <div className="rsb-stationery"><div className="rsb-tabs" role="tablist" aria-label={tr("Leave a reply")}><button id="rsb-rsvp-tab" type="button" role="tab" aria-selected={tab === "rsvp"} aria-controls="rsb-reply-panel" onClick={() => setTab("rsvp")}>{tr("Your RSVP")}</button><button id="rsb-wish-tab" type="button" role="tab" aria-selected={tab === "wish"} aria-controls="rsb-reply-panel" onClick={() => setTab("wish")}>{tr("A birthday wish")}</button></div>
      <div id="rsb-reply-panel" role="tabpanel" aria-labelledby={tab === "rsvp" ? tr("rsb-rsvp-tab") : tr("rsb-wish-tab")}>
      {tab === "rsvp" ? <form className="rsb-response-form" data-name="Will you be there RSVP" onSubmit={event => {
            actions.rsvp(event);
            if (state.attending) celebrate();
          }}><label>{tr("Your name")}<input name="name" autoComplete="name" required maxLength={80} defaultValue={state.rsvp?.name ?? ""} placeholder={tr("Your name")} /></label><fieldset><legend>{tr("Will you be there?")}</legend><div className="rsb-attendance"><button type="button" aria-pressed={state.attending} onClick={() => actions.attendance(true)}>{tr("I\u2019ll be there")}</button><button type="button" aria-pressed={!state.attending} onClick={() => actions.attendance(false)}>{tr("Can\u2019t make it")}</button></div></fieldset><button className="rsb-button" type="submit">{state.rsvp ? tr("Update my response") : tr("Send my response")} <span aria-hidden="true">→</span></button><p className="rsb-local">{tr("Preview invitation \xB7 Replies stay on this device.")}</p></form> : <form className="rsb-wish-form" data-name="Leave a little love wishes" onSubmit={event => {
            actions.wish(event);
            celebrate();
          }}><label>{tr("Your name")}<input name="name" autoComplete="name" required maxLength={80} defaultValue={state.wish?.name ?? ""} placeholder={tr("Your name")} /></label><label>{tr("Your birthday wish")}<textarea name="message" required maxLength={500} rows={4} defaultValue={state.wish?.message ?? ""} placeholder={tr("A little love for Mia…")} /></label><button className="rsb-button" type="submit">{tr("Send your wish")}<span aria-hidden="true">→</span></button><p className="rsb-local">{tr("Preview invitation \xB7 Wishes stay on this device.")}</p></form>}
      </div></div>
    </section>


    <div className="rsb-bottom-controls"><button type="button" onClick={actions.motion} aria-pressed={state.motion}>{tr("Motion")}{state.motion ? tr("on") : tr("off")}</button><button type="button" onClick={actions.replay}>{tr("Open envelope again")}</button></div>
    <footer className="maker-credit"><span>{tr("Made by")}</span><a href="/" aria-label={tr("11:11 — visit the company that made this card")}><img src="/logos/logo-pink-star.svg" alt={tr("11:11")} width="1330" height="1112" /></a></footer>
  </div>;
}
