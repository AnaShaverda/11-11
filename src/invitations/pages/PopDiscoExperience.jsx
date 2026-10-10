import { createCaptionCopy,  captionValue } from "../../localization/captionValues.js";
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../localization/LanguageContext.jsx';
import RibbonSketchToolbar from '../ribbon-sketch/RibbonSketchToolbar.jsx';
import InvitationArtwork from '../components/InvitationArtwork.jsx';
import { ribbonPhotos } from '../ribbon-sketch/assets.js';
import '../ribbon-sketch/fonts.css';
import '../../styles/pop-disco.css';

const POP_DISCO_BALL='/images/birthday/disco-scrapbook/pop-disco/mirrorball.webp';
const prompts=[
  [
    "data.pages.PopDiscoExperience.prompts.0.title",
    "data.pages.PopDiscoExperience.prompts.0.body"
  ],
  [
    "data.pages.PopDiscoExperience.prompts.1.title",
    "data.pages.PopDiscoExperience.prompts.1.body"
  ],
  [
    "data.pages.PopDiscoExperience.prompts.2.title",
    "data.pages.PopDiscoExperience.prompts.2.body"
  ],
  [
    "data.pages.PopDiscoExperience.prompts.3.title",
    "data.pages.PopDiscoExperience.prompts.3.body"
  ],
  [
    "data.pages.PopDiscoExperience.prompts.4.title",
    "data.pages.PopDiscoExperience.prompts.4.body"
  ]
];
function DiscoBall({className=''}){return <img className={`pd-ball ${className}`} src={POP_DISCO_BALL} alt="" aria-hidden="true" draggable="false"/>;}
function Chapter({id,className='',children}){
 const root=useRef(),scene=useRef();
 useLayoutEffect(()=>{let raf,alive=true;const el=root.current;const measure=()=>{if(!alive)return;const css=getComputedStyle(el),available=el.clientHeight-parseFloat(css.paddingTop)-parseFloat(css.paddingBottom);scene.current.style.setProperty('--fit',Math.min(1,available/Math.max(1,scene.current.offsetHeight)));};const update=()=>{cancelAnimationFrame(raf);raf=requestAnimationFrame(()=>el.style.setProperty('--scroll',Math.max(-1,Math.min(1,el.getBoundingClientRect().top/innerHeight))));};const ro=new ResizeObserver(measure);ro.observe(el);ro.observe(scene.current);document.fonts.ready.then(measure);window.addEventListener('scroll',update,{passive:true});window.addEventListener('resize',update);update();return()=>{alive=false;ro.disconnect();cancelAnimationFrame(raf);window.removeEventListener('scroll',update);window.removeEventListener('resize',update);};},[]);
 return <section ref={root} id={id} className={`pd-chapter ${className}`}><div ref={scene} className="pd-scene">{children}</div></section>;
}
function Polaroids({t}){
 const { language } = useLanguage();

 const dialog=useRef();const [photo,setPhoto]=useState(null);
 useEffect(()=>{if(photo!==null&&!dialog.current.open)dialog.current.showModal();},[photo]);
 const captions=[captionValue("invitations.pages.PopDiscoExperience.caption1", language),captionValue("invitations.pages.PopDiscoExperience.caption2", language),captionValue("invitations.pages.PopDiscoExperience.caption3", language)];
 return <Chapter id="pd-memories" className="pd-memories"><div className="pd-section-head"><h2>{captionValue("invitations.pages.PopDiscoExperience.caption4", language)}</h2><p className="pd-kicker">{captionValue("invitations.pages.PopDiscoExperience.caption5", language)}</p></div><div className="pd-polaroids">{ribbonPhotos.map((src,i)=><button key={src} className={`pd-polaroid pd-photo-${i}`} onClick={()=>setPhoto(i)} aria-label={captionValue("invitations.pages.PopDiscoExperience.caption6", language)+(i+1)}><span className="pd-tape" aria-hidden="true"/><img src={src} alt={captions[i]} loading="lazy"/><span className="pd-hand">{captions[i]}</span></button>)}</div><p className="pd-more pd-hand">{captionValue("invitations.pages.PopDiscoExperience.caption7", language)}</p><dialog ref={dialog} className="pd-photo-dialog" aria-label={captionValue("invitations.pages.PopDiscoExperience.caption8", language)} onCancel={()=>setPhoto(null)} onClick={e=>{if(e.target===dialog.current){dialog.current.close();setPhoto(null);}}}><button className="pd-close" aria-label={captionValue("invitations.pages.PopDiscoExperience.caption9", language)} onClick={()=>{dialog.current.close();setPhoto(null);}}><InvitationArtwork name="close" size={22}/></button>{photo!==null&&<img src={ribbonPhotos[photo]} alt={captions[photo]}/>}</dialog></Chapter>;
}
function Spotlight({t}){
 const { language } = useLanguage();

 const [index,setIndex]=useState(0);const p=prompts[index];
 return <Chapter id="pd-spotlight" className="pd-spotlight"><div className="pd-spotlight-stage"><svg className="pd-light-beam" viewBox="0 0 1000 600" preserveAspectRatio="none" aria-hidden="true"><defs><filter id="pd-soft-light" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="14"/></filter><linearGradient id="pd-beam-color" x1="80%" y1="0%" x2="30%" y2="100%"><stop stopColor="#fff2dd" stopOpacity=".78"/><stop offset=".3" stopColor="#f2a8cb" stopOpacity=".88"/><stop offset="1" stopColor="#eda5cc" stopOpacity=".78"/></linearGradient></defs><g filter="url(#pd-soft-light)"><path d="M785 45 C795 180 825 375 844 510 Q840 575 645 554 Q280 530 100 455 Q32 420 104 382 Z" fill="url(#pd-beam-color)"/><ellipse cx="470" cy="465" rx="380" ry="72" transform="rotate(10 470 465)" fill="#f4b3d0" opacity=".44"/></g></svg><h2>{captionValue("invitations.pages.PopDiscoExperience.caption10", language)}</h2><p className="pd-kicker">{captionValue("invitations.pages.PopDiscoExperience.caption11", language)}</p><button className="pd-ball-button" onClick={()=>setIndex(i=>(i+1)%prompts.length)} aria-label={captionValue("invitations.pages.PopDiscoExperience.caption12", language)}><DiscoBall/></button><div className="pd-prompt" key={index} aria-live="polite"><p className="pd-kicker">{captionValue(p[0], language)}</p><p className="pd-hand">{captionValue(p[1], language)}</p><InvitationArtwork name="heart" size={28}/></div><p className="pd-explore pd-hand">{captionValue("invitations.pages.PopDiscoExperience.caption13", language)}</p><p className="pd-same pd-kicker">{captionValue("invitations.pages.PopDiscoExperience.caption14", language)}</p></div></Chapter>;
}
function useSavedNote(kind){
 const key=`1111-pop-disco-${kind}:v1`;
 const [saved,setSaved]=useState(()=>{try{const v=JSON.parse(localStorage.getItem(key));return typeof v?.name==='string'&&(kind==='wish'?typeof v.message==='string':['yes','no'].includes(v.attendance))?v:null;}catch{return null;}});
 const [persistent,setPersistent]=useState(true);
 const save=value=>{try{localStorage.setItem(key,JSON.stringify(value));setPersistent(true);}catch{setPersistent(false);}setSaved(value);};
 return {saved,save,edit:()=>setSaved(null),persistent};
}
function PreviewNote({persistent,t}){
 const { language } = useLanguage();
return <p className="pd-preview">{persistent?captionValue("invitations.pages.PopDiscoExperience.caption15", language):captionValue("invitations.pages.PopDiscoExperience.caption16", language)}</p>;}
function RSVP({t}){
 const { language } = useLanguage();

 const {saved,save,edit,persistent}=useSavedNote('reply');const [name,setName]=useState(saved?.name||''),[attendance,setAttendance]=useState(saved?.attendance||'yes'),[note,setNote]=useState(saved?.note||'');
 function submit(e){e.preventDefault();if(!name.trim())return;save({name:name.trim(),attendance,note:note.trim()});}
 return <Chapter id="pd-rsvp" className="pd-rsvp"><DiscoBall className="pd-rsvp-ball"/><div className="pd-section-head"><h2>RSVP</h2><p className="pd-kicker">{captionValue("invitations.pages.PopDiscoExperience.caption17", language)}</p></div><div className="pd-rsvp-layout"><div className="pd-rsvp-paper">{saved?<div className="pd-saved" role="status"><h3>{saved.attendance==='yes'?captionValue("invitations.pages.PopDiscoExperience.caption18", language):captionValue("invitations.pages.PopDiscoExperience.caption19", language)}</h3><p>{saved.name}</p><button className="pd-button" onClick={edit}>{captionValue("invitations.pages.PopDiscoExperience.caption20", language)}</button></div>:<form onSubmit={submit}><label htmlFor="pd-name">{captionValue("invitations.pages.PopDiscoExperience.caption21", language)}</label><input id="pd-name" autoComplete="given-name" required pattern=".*\S.*" maxLength={80} placeholder={captionValue("invitations.pages.PopDiscoExperience.caption22", language)} value={name} onChange={e=>setName(e.target.value)}/><fieldset><legend>{captionValue("invitations.pages.PopDiscoExperience.caption23", language)}</legend>{['yes','no'].map(v=><label key={v}><input type="radio" name="pd-attendance" checked={attendance===v} onChange={()=>setAttendance(v)}/>{v==='yes'?captionValue("invitations.pages.PopDiscoExperience.caption24", language):captionValue("invitations.pages.PopDiscoExperience.caption25", language)}</label>)}</fieldset><label htmlFor="pd-note">{captionValue("invitations.pages.PopDiscoExperience.caption26", language)}</label><textarea id="pd-note" rows={2} maxLength={400} placeholder={captionValue("invitations.pages.PopDiscoExperience.caption27", language)} value={note} onChange={e=>setNote(e.target.value)}/><button className="pd-button" type="submit">{captionValue("invitations.pages.PopDiscoExperience.caption28", language)}<InvitationArtwork name="arrow-right" size={18}/></button></form>}<PreviewNote persistent={persistent} t={t}/></div><p className="pd-hand pd-rsvp-hand">{captionValue("invitations.pages.PopDiscoExperience.caption29", language)}<InvitationArtwork name="heart" size={28}/></p></div><p className="pd-rsvp-footer pd-kicker">{captionValue("invitations.pages.PopDiscoExperience.caption30", language)}</p></Chapter>;
}
function Guestbook({t}){
 const { language } = useLanguage();

 const {saved,save,edit,persistent}=useSavedNote('wish');const [name,setName]=useState(saved?.name||''),[message,setMessage]=useState(saved?.message||'');
 function submit(e){e.preventDefault();if(!name.trim()||!message.trim())return;save({name:name.trim(),message:message.trim()});}
 return <Chapter id="pd-wishes" className="pd-wishes"><div className="pd-section-head"><h2>{captionValue("invitations.pages.PopDiscoExperience.caption31", language)}</h2><p className="pd-kicker">{captionValue("invitations.pages.PopDiscoExperience.caption32", language)}</p></div><div className="pd-book"><span className="pd-book-ribbon" aria-hidden="true"/><span className="pd-book-charm" aria-hidden="true"><DiscoBall/></span><span className="pd-book-stars" aria-hidden="true"><InvitationArtwork name="star" size={38}/><InvitationArtwork name="star" size={28}/></span><div className="pd-book-left">{saved?<div className="pd-book-saved" role="status"><p className="pd-hand">{captionValue("invitations.pages.PopDiscoExperience.caption33", language)}</p><blockquote>{saved.message}</blockquote><p className="pd-hand">{saved.name}</p><button className="pd-text-button" onClick={edit}>{captionValue("invitations.pages.PopDiscoExperience.caption34", language)}</button></div>:<form onSubmit={submit}><p className="pd-hand">{captionValue("invitations.pages.PopDiscoExperience.caption35", language)}</p><label className="pd-sr-only" htmlFor="pd-wish-name">{captionValue("invitations.pages.PopDiscoExperience.caption36", language)}</label><input id="pd-wish-name" required pattern=".*\S.*" maxLength={80} placeholder={captionValue("invitations.pages.PopDiscoExperience.caption37", language)} value={name} onChange={e=>setName(e.target.value)}/><label className="pd-sr-only" htmlFor="pd-wish-message">{captionValue("invitations.pages.PopDiscoExperience.caption38", language)}</label><textarea id="pd-wish-message" rows={3} required maxLength={400} placeholder={captionValue("invitations.pages.PopDiscoExperience.caption39", language)} value={message} onChange={e=>{e.target.setCustomValidity('');setMessage(e.target.value);}}/><button className="pd-text-button" type="submit" onClick={e=>{if(!message.trim())e.currentTarget.form.querySelector('textarea').setCustomValidity(captionValue("invitations.pages.PopDiscoExperience.caption40", language));}}>{captionValue("invitations.pages.PopDiscoExperience.caption41", language)}<InvitationArtwork name="arrow-right" size={18}/></button></form>}</div><div className="pd-book-right"><p className="pd-hand">{captionValue("invitations.pages.PopDiscoExperience.caption42", language)}<InvitationArtwork name="heart" size={32}/></p></div></div><PreviewNote persistent={persistent} t={t}/><p className="pd-book-tag pd-kicker">{captionValue("invitations.pages.PopDiscoExperience.caption43", language)}</p></Chapter>;
}
export default function PopDiscoExperience(){
 const {language}=useLanguage();const t = (captionKey, values) => captionValue(captionKey, language, values);const [motion,setMotion]=useState(()=>!matchMedia('(prefers-reduced-motion: reduce)').matches);
 useEffect(()=>{window.scrollTo(0,0);const media=matchMedia('(prefers-reduced-motion: reduce)'),update=()=>setMotion(!media.matches);media.addEventListener('change',update);return()=>media.removeEventListener('change',update);},[]);
 return <main lang={language} className={`pd-experience ${motion?'pd-motion':''}`}><div className="pd-opening"><RibbonSketchToolbar motion={motion} onMotion={()=>setMotion(v=>!v)}/><Chapter id="pd-opening" className="pd-hero"><DiscoBall className="pd-hero-ball"/><div className="pd-hero-copy"><p className="pd-invited">{captionValue("invitations.pages.PopDiscoExperience.caption44", language)}</p><h1><span>{captionValue("invitations.pages.PopDiscoExperience.caption45", language)}</span><span>{captionValue("invitations.pages.PopDiscoExperience.caption46", language)}</span></h1><p className="pd-date">{captionValue("invitations.pages.PopDiscoExperience.caption47", language)}<br/>19:00<br/>{captionValue("invitations.pages.PopDiscoExperience.caption48", language)}</p><p className="pd-hero-hand pd-hand">{captionValue("invitations.pages.PopDiscoExperience.caption49", language)}</p></div><a className="pd-hero-note pd-kicker" href="#pd-lineup">{captionValue("invitations.pages.PopDiscoExperience.caption50", language)}<InvitationArtwork name="arrow-down" size={22}/></a></Chapter></div><Chapter id="pd-lineup" className="pd-lineup"><div className="pd-section-head"><h2>{captionValue("invitations.pages.PopDiscoExperience.caption51", language)}</h2><p className="pd-kicker">{captionValue("invitations.pages.PopDiscoExperience.caption52", language)}</p></div><div className="pd-ticket"><p className="pd-ticket-stub pd-kicker">{captionValue("invitations.pages.PopDiscoExperience.caption53", language)}</p><ol>{[["19:00",captionValue("invitations.pages.PopDiscoExperience.caption54", language),'circle-dot',captionValue("invitations.pages.PopDiscoExperience.caption55", language)],["20:00",captionValue("invitations.pages.PopDiscoExperience.caption56", language),'heart',captionValue("invitations.pages.PopDiscoExperience.caption57", language)],["21:30",captionValue("invitations.pages.PopDiscoExperience.caption58", language),'play',captionValue("invitations.pages.PopDiscoExperience.caption59", language)],[captionValue("invitations.pages.PopDiscoExperience.caption60", language),captionValue("invitations.pages.PopDiscoExperience.caption61", language),'sparkle',captionValue("invitations.pages.PopDiscoExperience.caption62", language)]].map(([time,copy,icon,label])=><li key={time}><time>{time}</time><p>{copy}</p><InvitationArtwork name={icon} size={38}/><small>{label}</small></li>)}</ol><p className="pd-ticket-stub pd-ticket-end pd-kicker">{captionValue("invitations.pages.PopDiscoExperience.caption63", language)}</p></div><p className="pd-lineup-hand pd-hand">{captionValue("invitations.pages.PopDiscoExperience.caption64", language)}<InvitationArtwork name="heart" size={28}/></p></Chapter><Polaroids t={t}/><Spotlight t={t}/><RSVP t={t}/><Guestbook t={t}/><footer className="pd-footer"><p className="pd-kicker">{captionValue("invitations.pages.PopDiscoExperience.caption65", language)}</p><div><span>{captionValue("invitations.pages.PopDiscoExperience.caption66", language)}</span><Link to="/" aria-label="11:11"><img src="/logos/logo-pink-star.svg" alt="11:11" width="90" height="75"/></Link></div><p className="pd-kicker">{captionValue("invitations.pages.PopDiscoExperience.caption67", language)}<InvitationArtwork name="heart" size={26}/></p></footer></main>;
}
