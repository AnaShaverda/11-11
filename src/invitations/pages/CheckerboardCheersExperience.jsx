import { createCaptionCopy,  captionValue } from "../../localization/captionValues.js";
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../localization/LanguageContext.jsx';
import RibbonSketchToolbar from '../ribbon-sketch/RibbonSketchToolbar.jsx';
import InvitationArtwork from '../components/InvitationArtwork.jsx';
import { ribbonPhotos, ribbonPhotoCaptions } from '../ribbon-sketch/assets.js';
import '../ribbon-sketch/fonts.css';
import '../../styles/checkerboard-cheers.css';

const martini='/images/birthday/checkerboard-cheers/painted-olive-martini.webp';
const spritz='/images/components/separated/checkerboard-spritz.webp';
const drinks=[martini,spritz];
const citrusCoupe='/images/birthday/checkerboard-cheers/experience/orange-coupe.webp';
const pinkCitrus='/images/birthday/checkerboard-cheers/experience/grapefruit-highball.webp';
const champagne='/images/birthday/checkerboard-cheers/experience/sparkling-flute.webp';
const gamePrompts=[
  [
    "data.pages.CheckerboardCheersExperience.prompts.0.title",
    "data.pages.CheckerboardCheersExperience.prompts.0.body"
  ],
  [
    "data.pages.CheckerboardCheersExperience.prompts.1.title",
    "data.pages.CheckerboardCheersExperience.prompts.1.body"
  ],
  [
    "data.pages.CheckerboardCheersExperience.prompts.2.title",
    "data.pages.CheckerboardCheersExperience.prompts.2.body"
  ],
  [
    "data.pages.CheckerboardCheersExperience.prompts.3.title",
    "data.pages.CheckerboardCheersExperience.prompts.3.body"
  ],
  [
    "data.pages.CheckerboardCheersExperience.prompts.4.title",
    "data.pages.CheckerboardCheersExperience.prompts.4.body"
  ],
  [
    "data.pages.CheckerboardCheersExperience.prompts.5.title",
    "data.pages.CheckerboardCheersExperience.prompts.5.body"
  ],
  [
    "data.pages.CheckerboardCheersExperience.prompts.6.title",
    "data.pages.CheckerboardCheersExperience.prompts.6.body"
  ],
  [
    "data.pages.CheckerboardCheersExperience.prompts.7.title",
    "data.pages.CheckerboardCheersExperience.prompts.7.body"
  ]
];
function Chapter({children,className='',id}){
 const section=useRef(null),scene=useRef(null);
 useLayoutEffect(()=>{let frame;const el=section.current;const measure=()=>{const css=getComputedStyle(el);scene.current.style.setProperty('--fit',Math.min(1,(el.clientHeight-parseFloat(css.paddingTop)-parseFloat(css.paddingBottom))/Math.max(1,scene.current.offsetHeight)));};const update=()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(()=>{const p=Math.max(-1,Math.min(1,el.getBoundingClientRect().top/innerHeight));el.style.setProperty('--progress',p);});};const ro=new ResizeObserver(measure);ro.observe(el);ro.observe(scene.current);document.fonts.ready.then(measure);window.addEventListener('scroll',update,{passive:true});window.addEventListener('resize',update);update();return()=>{ro.disconnect();cancelAnimationFrame(frame);window.removeEventListener('scroll',update);window.removeEventListener('resize',update);};},[]);
 return <section id={id} ref={section} className={`cc-chapter ${className}`}><div ref={scene} className="cc-scene">{children}</div></section>;
}
function calendar(){const data=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//11:11//Birthday//EN','BEGIN:VEVENT','UID:alex-20270608@11-11','DTSTAMP:20261010T000000Z','DTSTART:20270608T150000Z','DTEND:20270608T190000Z','SUMMARY:Dea’s Birthday Party','LOCATION:Tbilisi','END:VEVENT','END:VCALENDAR'].join('\r\n');const url=URL.createObjectURL(new Blob([data],{type:'text/calendar;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='alex-birthday.ics';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
function Filmstrip({t,motion}){
 const { language } = useLanguage();

 const rail=useRef(),drag=useRef(null),dialog=useRef();const [index,setIndex]=useState(0),[view,setView]=useState(null);
 useEffect(()=>{if(view!==null&&!dialog.current.open)dialog.current.showModal();},[view]);
 function move(delta){const next=(index+delta+ribbonPhotos.length)%ribbonPhotos.length;const r=rail.current;const frame=r.children[next];const left=Math.max(0,Math.min(r.scrollWidth-r.clientWidth,frame.offsetLeft-(r.clientWidth-frame.offsetWidth)/2));r.scrollTo({left,behavior:motion?'smooth':'instant'});setIndex(next);}
 return <Chapter id="memories" className="cc-memories"><h2>{captionValue("invitations.pages.CheckerboardCheersExperience.caption1", language)}</h2><p>{captionValue("invitations.pages.CheckerboardCheersExperience.caption2", language)}</p><div className="cc-film" ref={rail} onScroll={()=>{const r=rail.current;const max=r.scrollWidth-r.clientWidth;if(max>1)setIndex(Math.round(r.scrollLeft/max*2));}} onPointerDown={e=>{if(e.pointerType!=='mouse')return;drag.current={x:e.clientX,left:rail.current.scrollLeft,moved:false};}} onPointerMove={e=>{if(!drag.current)return;const d=e.clientX-drag.current.x;if(Math.abs(d)>5){drag.current.moved=true;rail.current.scrollLeft=drag.current.left-d;}}} onPointerUp={()=>{setTimeout(()=>{drag.current=null;},0);}} onPointerLeave={()=>{drag.current=null;}}>{ribbonPhotos.map((src,i)=><button key={src} className="cc-film-frame" onClick={()=>{if(!drag.current?.moved)setView(i);}} aria-label={captionValue("invitations.pages.CheckerboardCheersExperience.caption3", language)+ribbonPhotoCaptions[src]}><img src={src} alt={captionValue("invitations.pages.CheckerboardCheersExperience.caption4", language)} loading="lazy" draggable="false"/></button>)}</div><div className="cc-film-controls"><button onClick={()=>move(-1)} aria-label={captionValue("invitations.pages.CheckerboardCheersExperience.caption5", language)}><InvitationArtwork name="arrow-left" size={24}/></button><span aria-live="polite">0{index+1} / 03</span><button onClick={()=>move(1)} aria-label={captionValue("invitations.pages.CheckerboardCheersExperience.caption6", language)}><InvitationArtwork name="arrow-right" size={24}/></button></div><dialog ref={dialog} className="cc-photo-dialog" aria-label={captionValue("invitations.pages.CheckerboardCheersExperience.caption7", language)} onCancel={()=>setView(null)} onClick={e=>{if(e.target===dialog.current){dialog.current.close();setView(null);}}}><button className="cc-dialog-close" aria-label={captionValue("invitations.pages.CheckerboardCheersExperience.caption8", language)} onClick={()=>{dialog.current.close();setView(null);}}><InvitationArtwork name="close" size={24}/></button>{view!==null&&<img src={ribbonPhotos[view]} alt={captionValue("invitations.pages.CheckerboardCheersExperience.caption9", language)}/>}</dialog></Chapter>;
}
function DrinkingGame({t}){
 const { language } = useLanguage();

 const [index,setIndex]=useState(0),[revealed,setRevealed]=useState(false);const p=gamePrompts[index];
 const next=()=>{setRevealed(false);setIndex(i=>(i+1)%gamePrompts.length);};
 return <Chapter id="game" className="cc-game"><div><h2>{captionValue("invitations.pages.CheckerboardCheersExperience.caption10", language)}</h2><p>{captionValue("invitations.pages.CheckerboardCheersExperience.caption11", language)}</p></div><div className="cc-game-area"><button className={`cc-game-card ${revealed?'is-revealed':''}`} aria-label={(revealed ? captionValue("ui.invitations.pages.CheckerboardCheersExperience.hidePartyCard", language) : captionValue("ui.invitations.pages.CheckerboardCheersExperience.revealPartyCard", language))} aria-pressed={revealed} onClick={()=>setRevealed(v=>!v)}><span className="cc-card-face cc-card-back"><img className="cc-game-cocktail" src={citrusCoupe} alt="" aria-hidden="true"/><span>{captionValue("invitations.pages.CheckerboardCheersExperience.caption12", language)}</span><small>{captionValue("invitations.pages.CheckerboardCheersExperience.caption13", language)}</small></span><span className="cc-card-face cc-card-front"><img className="cc-game-cocktail" src={citrusCoupe} alt="" aria-hidden="true"/><small>{captionValue(p[0], language)}</small><strong>{captionValue(p[1], language)}</strong><span className="cc-check-mark" aria-hidden="true"/></span></button><div className="cc-game-controls"><button className="cc-button cc-light" onClick={()=>{setIndex(i=>(i+1)%gamePrompts.length);setRevealed(true);}}>{captionValue("invitations.pages.CheckerboardCheersExperience.caption14", language)}<InvitationArtwork name="arrow-right" size={20}/></button><button className="cc-button cc-outline" onClick={next}>{captionValue("invitations.pages.CheckerboardCheersExperience.caption15", language)}</button></div><p className="cc-small">{captionValue("invitations.pages.CheckerboardCheersExperience.caption16", language)}</p></div></Chapter>;
}
function PartyForm({wish=false,t}){
 const { language } = useLanguage();

 const key=`1111-checkerboard-cheers-${wish?'wish':'reply'}:v1`;
 const [saved,setSaved]=useState(()=>{try{const v=JSON.parse(localStorage.getItem(key));return typeof v?.name==='string'&&(wish?typeof v.message==='string':['yes','no'].includes(v.attending))?v:null;}catch{return null;}});
 const [name,setName]=useState(saved?.name||''),[message,setMessage]=useState(saved?.message||''),[attending,setAttending]=useState(saved?.attending||'yes'),[persistent,setPersistent]=useState(true);
 function submit(e){e.preventDefault();if(!name.trim()||(wish&&!message.trim()))return;const value={name:name.trim(),...(wish?{message:message.trim()}:{attending})};try{localStorage.setItem(key,JSON.stringify(value));setPersistent(true);}catch{setPersistent(false);}setSaved(value);}
 return <Chapter id={wish?'wishes':'rsvp'} className={`cc-reply ${wish?'cc-wishes':''}`}><h2>{wish?captionValue("invitations.pages.CheckerboardCheersExperience.caption17", language):captionValue("invitations.pages.CheckerboardCheersExperience.caption18", language)}</h2><div className="cc-reply-stage"><img className="cc-reply-drink" src={wish?champagne:pinkCitrus} alt="" loading="lazy"/><div className="cc-form-paper">{saved?<div className="cc-confirmation" role="status"><h3>{wish?captionValue("invitations.pages.CheckerboardCheersExperience.caption19", language):saved.attending==='yes'?captionValue("invitations.pages.CheckerboardCheersExperience.caption20", language):captionValue("invitations.pages.CheckerboardCheersExperience.caption21", language)}</h3><p>{saved.name}</p>{wish&&<blockquote>{saved.message}</blockquote>}<button className="cc-button" onClick={()=>setSaved(null)}>{captionValue("invitations.pages.CheckerboardCheersExperience.caption22", language)}</button></div>:<form onSubmit={submit}><label htmlFor={`cc-${wish?'wish':'reply'}-name`}>{captionValue("invitations.pages.CheckerboardCheersExperience.caption23", language)}</label><input id={`cc-${wish?'wish':'reply'}-name`} required pattern=".*\S.*" maxLength={80} autoComplete="given-name" value={name} placeholder={captionValue("invitations.pages.CheckerboardCheersExperience.caption24", language)} onChange={e=>setName(e.target.value)}/>{wish?<><label htmlFor="cc-wish-message">{captionValue("invitations.pages.CheckerboardCheersExperience.caption25", language)}</label><textarea id="cc-wish-message" required maxLength={600} rows={3} placeholder={captionValue("invitations.pages.CheckerboardCheersExperience.caption26", language)} value={message} onChange={e=>{e.target.setCustomValidity('');setMessage(e.target.value);}} onInvalid={e=>{if(!message.trim())e.target.setCustomValidity(captionValue("invitations.pages.CheckerboardCheersExperience.caption27", language));}}/></>:<fieldset><legend>{captionValue("invitations.pages.CheckerboardCheersExperience.caption28", language)}</legend>{['yes','no'].map(v=><label key={v}><input type="radio" name="cc-attendance" checked={attending===v} onChange={()=>setAttending(v)}/>{v==='yes'?captionValue("invitations.pages.CheckerboardCheersExperience.caption29", language):captionValue("invitations.pages.CheckerboardCheersExperience.caption30", language)}</label>)}</fieldset>}<button className="cc-button" type="submit" onClick={e=>{if(wish&&!message.trim())e.currentTarget.form.querySelector('textarea').setCustomValidity(captionValue("invitations.pages.CheckerboardCheersExperience.caption31", language));}}>{wish?captionValue("invitations.pages.CheckerboardCheersExperience.caption32", language):captionValue("invitations.pages.CheckerboardCheersExperience.caption33", language)}</button></form>}<p className="cc-small">{persistent?captionValue("invitations.pages.CheckerboardCheersExperience.caption34", language):captionValue("invitations.pages.CheckerboardCheersExperience.caption35", language)}</p></div></div></Chapter>;
}
export default function CheckerboardCheersExperience(){
 const {language}=useLanguage();const t = (captionKey, values) => captionValue(captionKey, language, values);
 const [motion,setMotion]=useState(()=>!matchMedia('(prefers-reduced-motion: reduce)').matches),[toasts,setToasts]=useState(0);const timer=useRef(),[clinking,setClinking]=useState(false);
 useEffect(()=>{window.scrollTo(0,0);const media=matchMedia('(prefers-reduced-motion: reduce)');const update=()=>setMotion(!media.matches);media.addEventListener('change',update);return()=>{clearTimeout(timer.current);media.removeEventListener('change',update);};},[]);
 function go(id){document.getElementById(id)?.scrollIntoView({behavior:motion?'smooth':'instant'});}
 function toast(){clearTimeout(timer.current);setClinking(true);setToasts(n=>n+1);timer.current=setTimeout(()=>setClinking(false),900);}
 return <main lang={language} className={`cc-experience ${motion?'cc-motion':''}`}><div className="cc-opening-wrap"><RibbonSketchToolbar motion={motion} onMotion={()=>setMotion(v=>!v)}/><Chapter className="cc-opening cc-opening-grand"><div className="cc-invitation-paper"><h1>{captionValue("invitations.pages.CheckerboardCheersExperience.caption36", language)}</h1><p className="cc-host">{captionValue("invitations.pages.CheckerboardCheersExperience.caption37", language)}</p><p className="cc-date">{captionValue("invitations.pages.CheckerboardCheersExperience.caption38", language)} · 19:00 · {captionValue("invitations.pages.CheckerboardCheersExperience.caption39", language)}</p><button className="cc-button" onClick={()=>go('plan')}>{captionValue("invitations.pages.CheckerboardCheersExperience.caption40", language)}</button></div><div className="cc-opening-glasses" aria-hidden="true"><img className="cc-opening-martini" src={martini} alt=""/><img className="cc-opening-spritz" src={spritz} alt=""/></div></Chapter></div><Chapter id="plan" className="cc-plan"><h2>{captionValue("invitations.pages.CheckerboardCheersExperience.caption41", language)}</h2><div className="cc-plan-stage"><div className="cc-menu"><ol>{[captionValue("invitations.pages.CheckerboardCheersExperience.caption42", language),captionValue("invitations.pages.CheckerboardCheersExperience.caption43", language),captionValue("invitations.pages.CheckerboardCheersExperience.caption44", language)].map((text,i)=><li key={i}><time>{['19:00','20:00','21:00'][i]}</time><span>{text}</span></li>)}</ol><button className="cc-button" onClick={calendar}>{captionValue("invitations.pages.CheckerboardCheersExperience.caption45", language)}</button></div><img src={citrusCoupe} alt="" className="cc-plan-drink" loading="lazy"/></div></Chapter><Chapter id="toast" className="cc-toast"><div className="cc-toast-copy"><h2>{captionValue("invitations.pages.CheckerboardCheersExperience.caption46", language)}</h2><p className="cc-host">{captionValue("invitations.pages.CheckerboardCheersExperience.caption47", language)}</p><p className="cc-date">{captionValue("invitations.pages.CheckerboardCheersExperience.caption48", language)} · 19:00 · {captionValue("invitations.pages.CheckerboardCheersExperience.caption49", language)}</p><button className="cc-button cc-outline" onClick={()=>go('game')}>{captionValue("invitations.pages.CheckerboardCheersExperience.caption50", language)}</button></div><div className="cc-toast-stage"><button className={`cc-clink ${clinking?'is-clinking':''}`} onClick={toast} aria-label={captionValue("invitations.pages.CheckerboardCheersExperience.caption51", language)}>{drinks.map((src,i)=><img className={`cc-toast-glass cc-glass-${i}`} key={src} src={src} alt="" loading="lazy"/>)}<span className="cc-clink-rays" aria-hidden="true"><i/><i/><i/></span></button><p aria-live="polite">{toasts?captionValue("invitations.pages.CheckerboardCheersExperience.caption52", language):captionValue("invitations.pages.CheckerboardCheersExperience.caption53", language)}</p></div></Chapter><Filmstrip t={t} motion={motion}/><DrinkingGame t={t}/><PartyForm t={t}/><PartyForm t={t} wish/><footer className="cc-footer"><span>{captionValue("invitations.pages.CheckerboardCheersExperience.caption54", language)}</span><Link to="/" aria-label="11:11"><img src="/logos/logo-pink-star.svg" alt="11:11" width="1330" height="1112"/></Link></footer></main>;
}
