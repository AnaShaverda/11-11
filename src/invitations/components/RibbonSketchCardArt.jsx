
import { useRibbonCopy } from "../ribbon-sketch/copy.js";
import "../ribbon-sketch/card.css";
export default function RibbonSketchCardArt(){
 const tr=useRibbonCopy();
 return <div className="rs-catalog-art rs-card-new" aria-hidden="true">
  <img className="rs-card-new-frame" src="/images/components/separated/ribbon-frame.webp" alt=""/>
  <span className="rs-card-new-eyebrow">{tr("You’re invited!")}</span>
  <strong className="rs-card-new-name">{tr("MIA’S")}</strong>
  <span className="rs-card-new-era">{tr("birthday girl era")} ♡</span>
  <img className="rs-card-new-coupe" src="/images/birthday/ribbon-sketch/sketched-coupe.png" alt=""/>
  <span className="rs-card-new-date">{tr("23 MAY 2027")}<br/>{tr("17:00 · TBILISI")}</span>
  <span className="rs-card-new-love">{tr("A little party, a lot of love.")}</span>
 </div>;
}
