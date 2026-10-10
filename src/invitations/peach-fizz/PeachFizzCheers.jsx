import { useRef, useState } from "react";
import { peachAssets, celebratePeach } from "./copy.js";

export default function PeachFizzCheers({ text, motion }) {
  const [progress, setProgress] = useState(0);
  const [cheers, setCheers] = useState(false);
  const [toast, setToast] = useState(0);
  const [dragging, setDragging] = useState(false);
  const drag = useRef(null);
  const stage = useRef(null);
  const cheersButton = useRef(null);
  const didDrag = useRef(false);
  function clink() {
    setProgress(1); setCheers(true); setDragging(false);
    if (stage.current?.contains(document.activeElement)) cheersButton.current?.focus({ preventScroll: true });
    if (motion) celebratePeach();
  }
  function start(event, side) {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    didDrag.current = false;
    drag.current = { x: event.clientX, direction: side === "left" ? 1 : -1, start: progress };
    setDragging(true);
  }
  function move(event) {
    if (!drag.current) return;
    const delta = event.clientX - drag.current.x;
    if (Math.abs(delta) > 5) didDrag.current = true;
    const next = Math.max(0, Math.min(1, drag.current.start + delta * drag.current.direction / (stage.current.clientWidth * .2)));
    setProgress(next);
    if (next > .92) { drag.current = null; clink(); }
  }
  function stop() {
    drag.current = null; setDragging(false);
    if (!cheers) setProgress(0);
  }
  return <section className="pf-section pf-cheers" id="pf-cheers" aria-labelledby="pf-cheers-title">
    <div className="pf-wrap pf-cheers-layout">
      <div className="pf-cheers-copy">
        <h2 id="pf-cheers-title">{text.clink.map(line => <span key={line}>{line}</span>)}</h2>
        <p>{text.drag}<br />{text.orTap}</p>
        <button ref={cheersButton} className="pf-button" onClick={() => { if (cheers) { setCheers(false); setProgress(0); didDrag.current = false; } else clink(); }}>
          {cheers ? text.again : text.tap}
        </button>
        <a className="pf-text-link" href="#pf-games">{text.skip}</a>
      </div>
      <div className="pf-cheers-play">
        <div className={`pf-glass-stage ${dragging ? "pf-dragging" : ""} ${cheers ? "pf-clinked" : ""}`} ref={stage} style={{ "--clink": progress }}>
          {["left", "right"].map(side => <button key={side} className={`pf-drag-glass pf-drag-${side}`} tabIndex={cheers ? -1 : 0} aria-hidden={cheers}
            aria-label={side === "left" ? text.leftGlass : text.rightGlass}
            onPointerDown={e => start(e, side)} onPointerMove={move} onPointerUp={stop} onPointerCancel={stop} onLostPointerCapture={stop}
            onKeyDown={e => { if (e.key === "Enter" || e.key === " ") didDrag.current = false; }}
            onClick={() => { if (!didDrag.current && !cheers) clink(); }}>
            <img src={peachAssets[side]} alt="" draggable={false} width={side === "left" ? 738 : 936} height={side === "left" ? 1194 : 1224} />
          </button>)}
          {cheers ? <img className="pf-clink-result" src={peachAssets.pair} alt="" width="1254" height="1254" /> : null}
        </div>
        <div className="pf-toast-choices" role="group" aria-label={text.choose}>
          {text.toasts.map((label, i) => <button key={i} aria-pressed={toast === i} onClick={() => setToast(i)}>{label}</button>)}
        </div>
        <p className="pf-cheers-status" role="status">{cheers ? <>{text.cheers}<br />{text.toastMessages[toast]}</> : null}</p>
      </div>
      
    </div>
  </section>;
}
