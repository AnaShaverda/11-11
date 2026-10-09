
import { useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import BirthdayCake from "../../custom-orders/ani/BirthdayCake.jsx";
import cakeStyles from "../../custom-orders/ani/cake.css?inline";
const styles = cakeStyles + `
:host{display:block;color:#710b1a;font-family:"RS Inter",sans-serif}
*{box-sizing:border-box}
.page{--ink:#710b1a;--red:#ad1626;--cream:#fff8f5;--blush:#f4cbd5;--berry:#710b1a;position:relative;padding:140px 12% 50px}
.cake-chapter{margin:auto}.cake-chapter h2{font-family:"RS Cormorant Garamond",serif;font-size:52px}
.eyebrow{font-size:10px;letter-spacing:.2em;text-transform:uppercase}
.subtitle,.cake-help,.cake-message{font-size:13px;line-height:1.6}
.cake-stage{width:min(370px,100%);margin:20px auto}
.cake-action{padding:12px 18px;border-radius:28px;border:1px solid #710b1a;background:transparent;color:#710b1a;cursor:pointer}
.cake-action--primary{background:#710b1a;color:#fff8f5}
.cake-actions{display:flex;justify-content:center;gap:12px;flex-wrap:wrap}
@media(max-width:600px){.page{padding:100px 14% 45px}.cake-chapter h2{font-size:38px}}
:host([data-motion="false"]) *{animation:none!important;transition:none!important}
`;
export default function RibbonSketchCake({motion}){
 const host=useRef(null);const [root,setRoot]=useState(null);
 useLayoutEffect(()=>{setRoot(host.current.shadowRoot ?? host.current.attachShadow({mode:"open"}));},[]);
 return <section className="rsb-cake-section rsb-reveal" aria-label="Make a birthday wish"><div ref={host} data-motion={motion}>{root && createPortal(<><style>{styles}</style><BirthdayCake name="Mia" showPortraits={false}/></>,root)}</div></section>;
}
