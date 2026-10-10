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
      <button type="button" className="rsb-scroll-cue" onClick={() => go("party-details")} aria-label={tr("ribbonSketch.scrollToPartyDetails.1")}><InvitationArtwork name="arrow-down" size={22} /></button>
    </section>
    <section className="rsb-details rsb-reveal" id="party-details" aria-label={tr("ribbonSketch.partyDetails.111")}><RibbonSectionBubbles />
      <div className="rsb-date-art"><span>{tr("ribbonSketch.23.112")}</span><p>{tr("ribbonSketch.may2027.33")}</p><small>{tr("ribbonSketch.aVerySpecialDay.34")}<br /><span className="rsb-hand"><InvitationArtwork name="heart-filled" size="1em" /></span></small></div>
      <div className="rsb-detail-copy"><dl><div><dt>{tr("ribbonSketch.time.35")}</dt><dd>{tr("ribbonSketch.1700Late.36")}</dd></div><div><dt>{tr("ribbonSketch.location.37")}</dt><dd><strong>{tr("ribbonSketch.tbilisiGeorgia.38")}</strong><br />{tr("ribbonSketch.exactAddressSharedByTheHost.39")}</dd></div><div><dt>{tr("ribbonSketch.dressCode.40")}</dt><dd>{tr("ribbonSketch.prettyInPink.41")}<br /><em>{tr("ribbonSketch.aBowALittleSparkleAndYou.42")}</em></dd></div><div><dt>{tr("ribbonSketch.note.43")}</dt><dd>{tr("ribbonSketch.goodFoodGreatCompany.44")}<br />{tr("ribbonSketch.andAWholeLotOfLove.45")}</dd></div></dl><div className="rsb-detail-actions"><button type="button" className="rsb-button rsb-outline" onClick={actions.calendar}>{tr("ribbonSketch.addToCalendar.46")}<span><InvitationArtwork name="chevron-right" size="1em" /></span></button><button type="button" className="rsb-button rsb-outline" onClick={actions.location}>{tr("ribbonSketch.getDirections.47")}<span><InvitationArtwork name="chevron-right" size="1em" /></span></button><p className="rsb-hand"><RibbonText>{tr("ribbonSketch.seeYouThere.48")}</RibbonText></p></div></div>
    </section>
    <RibbonSketchCamera motion={state.motion} />
    <RibbonSketchGames />
    <RibbonSketchWishSection actions={actions} state={state} />
    <section className="rsb-reply rsb-reveal" id="party-reply" aria-labelledby="rsb-reply-title"><RibbonSectionBubbles />
      <div className="rsb-reply-heading"><h2 id="rsb-reply-title">{tr("ribbonSketch.willYou.49")}<br />{tr("ribbonSketch.beThere.50")}</h2><img className="rsb-reply-cake" src="/images/birthday/ribbon-sketch/blush-ribbon-cake.webp" alt="" /><p className="rsb-reply-note">{tr("ribbonSketch.itWouldnTBeTheSame.51")}<br />{tr("ribbonSketch.withoutYou.52")}<br /><span className="rsb-hand"><InvitationArtwork name="heart-filled" size="1em" /></span></p></div>
      <div className="rsb-stationery">
      <form className="rsb-response-form" data-name="Will you be there RSVP" onSubmit={event => {
            actions.rsvp(event);
            if (state.attending) celebrate();
          }}><label>{tr("ribbonSketch.yourName.55")}<input name="name" autoComplete="name" required maxLength={80} value={state.guestName} onChange={event => actions.guestName(event.target.value)} placeholder={tr("ribbonSketch.yourName.55")} /></label><fieldset><legend>{tr("ribbonSketch.willYouBeThere.56")}</legend><div className="rsb-attendance"><button type="button" aria-pressed={state.attending} onClick={() => actions.attendance(true)}>{tr("ribbonSketch.iLlBeThere.29")}</button><button type="button" aria-pressed={!state.attending} onClick={() => actions.attendance(false)}>{tr("ribbonSketch.canTMakeIt.57")}</button></div></fieldset><button className="rsb-button" type="submit">{state.rsvp ? tr("ribbonSketch.updateMyResponse.59") : tr("ribbonSketch.sendMyResponse.58")} <span aria-hidden="true"><InvitationArtwork name="arrow-right" size="1em" /></span></button><p className="rsb-local">{tr("ribbonSketch.previewInvitationRepliesStayOnThisDevice.60")}</p></form>
      </div>
    </section>


    <footer className="maker-credit"><span>{tr("ribbonSketch.madeBy.88")}</span><a href="/" aria-label={tr("ribbonSketch.1111VisitTheCompanyThatMadeThis.113")}><img src="/logos/logo-pink-star.svg" alt={tr("ribbonSketch.1111.114")} width="1330" height="1112" /></a></footer>
  </div>;
}
