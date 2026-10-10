import { useState } from "react";
import { useRibbonCopy } from "../ribbon-sketch/copy.js";
import "../ribbon-sketch/card.css";

export const pinkInkGlass = "/images/birthday/ribbon-sketch/rounded-ribbon-wine-clear.webp";

export default function RibbonSketchCardArt({ hero = false, onCheers }) {
  const tr = useRibbonCopy();
  const [burst, setBurst] = useState(0);
  const Title = hero ? "h1" : "strong";
  const art = <span key={`glass-${burst}`} className={`rs-ink-glass-art${burst ? " is-shaking" : ""}`}><img src={pinkInkGlass} alt="" /></span>;
  return <div className={`rs-catalog-art rs-pink-ink${hero ? " rs-pink-ink-hero" : ""}`} aria-hidden={hero ? undefined : true}>
    <div className="rs-pink-ink-sheet">
      <span className="rs-ink-stripes rs-ink-stripes-top" aria-hidden="true" />
      <span className="rs-ink-stripes rs-ink-stripes-bottom" aria-hidden="true" />
      <Title className="rs-ink-title"><span>{tr("ANIKO’S")}</span><span>{tr("BIRTHDAY")}</span></Title>
      {onCheers ? <button type="button" className="rs-ink-glass" onClick={() => { setBurst(value => value + 1); onCheers(); }} aria-label={tr("Make a little cheers")}>{art}{burst > 0 && <span key={`bubbles-${burst}`} className="rs-ink-bubbles" aria-hidden="true">{Array.from({length:12}, (_, index) => <span key={index} className="rs-filled-bubble" style={{"--bubble-color":["#efb5c1","#a75068","#7c102b","#d889a0"][index % 4],"--bubble-x":`${(index % 5 - 2) * 17}px`,"--bubble-delay":`${index * .18}s`,left:`${42 + (index * 7 % 23)}%`,width:`${8 + index % 4 * 4}px`}} />)}</span>}<span className="rs-ink-guide">{tr("Tap the glass to see the bubbles")}</span></button> : <span className="rs-ink-glass">{art}</span>}
      <span className="rs-ink-day">23</span>
      <span className="rs-ink-month">{tr("May")}</span>
      <span className="rs-ink-date">2027 · 17:00<br />{tr("TBILISI")}</span>
    </div>
  </div>;
}
