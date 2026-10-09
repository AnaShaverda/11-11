import { useRef, useState } from "react";
import ToastCollection from "./ToastCollection.jsx";
import Icon from "../../components/ui/Icon.jsx";

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
  function giveToast(event) { event.preventDefault(); if (!toast.trim()) { const field = event.currentTarget.elements.namedItem("toast"); field.setCustomValidity(ka ? "დაწერე სადღეგრძელო" : "Write a few words for your toast"); field.reportValidity(); return; } setSpoken(toast.trim()); clink(); }
  function chooseToast(message) { setToast(message); setSpoken(message); clink(); stage.current.scrollIntoView({behavior:motion ? "smooth" : "instant", block:"center"}); stage.current.focus({preventScroll:true}); }
  return <><ToastCollection language={language} bridal={bridal} onChoose={chooseToast} /><section className="cherry-cheers-section" aria-labelledby="cherry-cheers-title">
    <div className="cherry-cheers-copy"><h2 id="cherry-cheers-title">{ka ? "ჭიქები" : "A little"}<br /><em>{ka ? "შევახვედროთ." : "clink."}</em></h2><p>{ka ? "მიიტანე ბოკლები ერთმანეთთან და თქვი სადღეგრძელო." : "Bring the glasses together. Give her a little toast."}</p>
      <form className="cherry-toast-form" onSubmit={giveToast}><label htmlFor="cherry-your-toast">{ka ? "შენი სადღეგრძელო" : "What are we toasting to?"}</label><textarea id="cherry-your-toast" name="toast" rows={2} maxLength={400} value={toast} onChange={e => {e.target.setCustomValidity(""); setToast(e.target.value);}} placeholder={ka ? "სიყვარულს და მეგობრობას…" : "To love, laughter, and our favorite girl…"} required /><button className="cherry-button" type="submit">{ka ? "ვთქვათ სადღეგრძელო" : "Give a toast"}<Icon name="heart" size={18} /></button></form>
    </div><div className="cherry-cheers-play"><div ref={stage} tabIndex={-1} className={`cherry-glass-stage ${cheers ? "cherry-glasses-clinked" : ""} ${active ? "cherry-glasses-dragging" : ""}`} style={{"--clink":offset}}>
      {["left","right"].map(side => <button key={side} className={`cherry-drag-glass cherry-drag-${side}`} data-side={side} aria-label={ka ? side === "left" ? "მარცხენა ბოკალი — შეეხე შესახვედრად" : "მარჯვენა ბოკალი — შეეხე შესახვედრად" : `${side === "left" ? "Left" : "Right"} glass — drag or press to cheers`} onClick={() => { if (!cheers) clink(); }} onPointerDown={start} onPointerMove={move} onPointerUp={stop} onPointerCancel={stop} onKeyDown={e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); clink(); } }}><img src={glass} alt="" draggable={false} /><span aria-hidden="true">{ka ? "მომწიე" : "Drag me"}</span></button>)}<span className="cherry-clink-spark" aria-hidden="true">✦</span>
    </div><div className="cherry-cheers-message" role="status">{cheers ? <><strong>{ka ? "გაგვიმარჯოს!" : "Clink. Cheers, darling!"}</strong>{spoken && <blockquote>“{spoken}”</blockquote>}</> : <p>{ka ? "შეეხე ბოკლებს და მიიტანე ერთმანეთთან." : "Drag either glass toward the other."}</p>}</div><button className="cherry-button cherry-outline" onClick={cheers ? () => {setCheers(false); setOffset(0);} : clink}>{cheers ? ka ? "კიდევ ერთი სადღეგრძელო" : "One more cheers" : ka ? "ბოკლები შევახვედროთ" : "Clink glasses"}<Icon name="sparkle" size={18} /></button></div>
  </section></>;
}
