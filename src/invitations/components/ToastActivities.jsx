import { captionValue } from "../../localization/captionValues.js";
import { useRef, useState } from "react";
import ToastCollection from "./ToastCollection.jsx";
import InvitationArtwork from "./InvitationArtwork.jsx";
import InvitationMotif from "./InvitationMotif.jsx";

export default function ToastActivities({ language, bridal, motion, glass, onCelebrate }) {
  const ka = language === "ka";
  const [offset, setOffset] = useState(0);
  const [cheers, setCheers] = useState(false);
  const [toast, setToast] = useState("");
  const [spoken, setSpoken] = useState("");
  const [active, setActive] = useState(false);
  const drag = useRef(null);
  const stage = useRef(null);
  function clink() { setOffset(1); setCheers(true); if (motion) onCelebrate(); }
  function start(event) {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    drag.current = { x: event.clientX, direction: event.currentTarget.dataset.side === "left" ? 1 : -1, start: offset, distance: stage.current.clientWidth * .25 };
    setActive(true); setCheers(false);
  }
  function move(event) {
    if (!drag.current) return;
    const progress = Math.max(0, Math.min(1, drag.current.start + (event.clientX - drag.current.x) * drag.current.direction / drag.current.distance));
    setOffset(progress);
    if (progress > .92) { drag.current = null; setActive(false); clink(); }
  }
  function stop() { drag.current = null; setActive(false); if (!cheers) setOffset(0); }
  function giveToast(event) { event.preventDefault(); if (!toast.trim()) { const field = event.currentTarget.elements.namedItem("toast"); field.setCustomValidity(captionValue("ui.invitations.components.ToastActivities.writeAFewWordsForYourToast", language)); field.reportValidity(); return; } setSpoken(toast.trim()); clink(); }
  function chooseToast(message) { setToast(message); setSpoken(message); clink(); stage.current.scrollIntoView({behavior:motion ? "smooth" : "instant", block:"center"}); stage.current.focus({preventScroll:true}); }
  return <><ToastCollection language={language} bridal={bridal} onChoose={chooseToast} /><section className="cherry-cheers-section" aria-labelledby="cherry-cheers-title">
    <div className="cherry-cheers-copy"><h2 id="cherry-cheers-title">{captionValue("ui.invitations.components.ToastActivities.aLittle", language)}<br /><em>{captionValue("ui.invitations.components.ToastActivities.clink", language)}</em></h2><p>{captionValue("ui.invitations.components.ToastActivities.bringTheGlassesTogetherGiveHerA", language)}</p>
      <form className="cherry-toast-form" onSubmit={giveToast}><label htmlFor="cherry-your-toast">{captionValue("ui.invitations.components.ToastActivities.whatAreWeToastingTo", language)}</label><textarea id="cherry-your-toast" name="toast" rows={2} maxLength={400} value={toast} onChange={e => {e.target.setCustomValidity(""); setToast(e.target.value);}} placeholder={captionValue("ui.invitations.components.ToastActivities.toLoveLaughterAndOurFavoriteGirl", language)} required /><button className="cherry-button" type="submit">{captionValue("ui.invitations.components.ToastActivities.giveAToast", language)}<InvitationArtwork name="heart" size={18} /></button></form>
    </div><div className="cherry-cheers-play"><div ref={stage} tabIndex={-1} className={`cherry-glass-stage ${cheers ? "cherry-glasses-clinked" : ""} ${active ? "cherry-glasses-dragging" : ""}`} style={{"--clink":offset}}>
      {["left","right"].map(side => <button key={side} className={`cherry-drag-glass cherry-drag-${side}`} data-side={side} aria-label={captionValue(side === "left" ? "toastActivities.leftGlass" : "toastActivities.rightGlass", language)} onClick={() => { if (!cheers) clink(); }} onPointerDown={start} onPointerMove={move} onPointerUp={stop} onPointerCancel={stop} onKeyDown={e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); clink(); } }}><img src={glass} alt="" draggable={false} /><span aria-hidden="true">{captionValue("ui.invitations.components.ToastActivities.dragMe", language)}</span></button>)}<span className="cherry-clink-spark" aria-hidden="true"><InvitationMotif name="sparkle" /></span>
    </div><div className="cherry-cheers-message" role="status">{cheers ? <><strong>{captionValue("ui.invitations.components.ToastActivities.clinkCheersDarling", language)}</strong>{spoken && <blockquote>“{spoken}”</blockquote>}</> : <p>{captionValue("ui.invitations.components.ToastActivities.dragEitherGlassTowardTheOther", language)}</p>}</div><button className="cherry-button cherry-outline" onClick={cheers ? () => {setCheers(false); setOffset(0);} : clink}>{cheers ? captionValue("ui.invitations.components.ToastActivities.oneMoreCheers", language) : captionValue("ui.invitations.components.ToastActivities.clinkGlasses", language)}<InvitationArtwork name="sparkle" size={18} /></button></div>
  </section></>;
}
