import RibbonSectionBubbles from "./RibbonSectionBubbles.jsx";
import InvitationArtwork from "../components/InvitationArtwork.jsx";
import RibbonText from "./RibbonText.jsx";
import { useRibbonCopy } from "./copy.js";
import { useEffect, useRef, useState } from "react";
import RibbonSketchGames from "./RibbonSketchGames.jsx";
import RibbonSketchCamera from "./RibbonSketchCamera.jsx";
import RibbonSketchCardArt from "../components/RibbonSketchCardArt.jsx";
import "./design.css";
import RibbonSketchWishSection from "./RibbonSketchWishSection.jsx";
export default function RibbonSketchDesign({
  actions,
  state
}) {
  const tr = useRibbonCopy();
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
  function celebrate() {
    setCheers(value => value + 1);
  }
  return <div className="rsb-design" ref={scene}>

    <section className="rsb-postcard-hero" id="party-home" data-name="Birthday girl era">
      <div className="rsb-postcard-wrap" data-cheers={cheers}><RibbonSketchCardArt key="pink-ink-clean-glass" hero onCheers={celebrate} /></div>
      <button type="button" className="rsb-scroll-cue" onClick={() => go("party-details")} aria-label={tr("Scroll to party details")}><InvitationArtwork name="arrow-down" size={22} /></button>
    </section>
    <section className="rsb-details rsb-reveal" id="party-details" aria-label={tr("Party details")}><RibbonSectionBubbles />
      <div className="rsb-date-art"><span>{tr("23")}</span><p>{tr("MAY 2027")}</p><small>{tr("A very special day")}<br /><span className="rsb-hand"><InvitationArtwork name="heart-filled" size="1em" /></span></small></div>
      <div className="rsb-detail-copy"><dl><div><dt>{tr("Time")}</dt><dd>{tr("17:00 \u2014 late")}</dd></div><div><dt>{tr("Location")}</dt><dd><strong>{tr("Tbilisi, Georgia")}</strong><br />{tr("Exact address shared by the host")}</dd></div><div><dt>{tr("Dress code")}</dt><dd>{tr("Pretty in pink")}<br /><em>{tr("A bow, a little sparkle, and you.")}</em></dd></div><div><dt>{tr("Note")}</dt><dd>{tr("Good food, great company")}<br />{tr("and a whole lot of love.")}</dd></div></dl><div className="rsb-detail-actions"><button type="button" className="rsb-button rsb-outline" onClick={actions.calendar}>{tr("Add to calendar")}<span><InvitationArtwork name="chevron-right" size="1em" /></span></button><button type="button" className="rsb-button rsb-outline" onClick={actions.location}>{tr("Get directions")}<span><InvitationArtwork name="chevron-right" size="1em" /></span></button><p className="rsb-hand"><RibbonText>{tr("See you there! \u2661")}</RibbonText></p></div></div>
    </section>
    <RibbonSketchCamera motion={state.motion} />
    <RibbonSketchGames />
    <RibbonSketchWishSection actions={actions} state={state} />
    <section className="rsb-reply rsb-reveal" id="party-reply" aria-labelledby="rsb-reply-title"><RibbonSectionBubbles />
      <div className="rsb-reply-heading"><h2 id="rsb-reply-title">{tr("Will you")}<br />{tr("be there?")}</h2><img className="rsb-reply-cake" src="/images/birthday/ribbon-sketch/blush-ribbon-cake.webp" alt="" /><p className="rsb-reply-note">{tr("It wouldn\u2019t be the same")}<br />{tr("without you")}<br /><span className="rsb-hand"><InvitationArtwork name="heart-filled" size="1em" /></span></p></div>
      <div className="rsb-stationery">
      <form className="rsb-response-form" data-name="Will you be there RSVP" onSubmit={event => {
            actions.rsvp(event);
            if (state.attending) celebrate();
          }}><label>{tr("Your name")}<input name="name" autoComplete="name" required maxLength={80} value={state.guestName} onChange={event => actions.guestName(event.target.value)} placeholder={tr("Your name")} /></label><fieldset><legend>{tr("Will you be there?")}</legend><div className="rsb-attendance"><button type="button" aria-pressed={state.attending} onClick={() => actions.attendance(true)}>{tr("I\u2019ll be there")}</button><button type="button" aria-pressed={!state.attending} onClick={() => actions.attendance(false)}>{tr("Can\u2019t make it")}</button></div></fieldset><button className="rsb-button" type="submit">{state.rsvp ? tr("Update my response") : tr("Send my response")} <span aria-hidden="true"><InvitationArtwork name="arrow-right" size="1em" /></span></button><p className="rsb-local">{tr("Preview invitation \xB7 Replies stay on this device.")}</p></form>
      </div>
    </section>


    <footer className="maker-credit"><span>{tr("Made by")}</span><a href="/" aria-label={tr("11:11 — visit the company that made this card")}><img src="/logos/logo-pink-star.svg" alt={tr("11:11")} width="1330" height="1112" /></a></footer>
  </div>;
}
