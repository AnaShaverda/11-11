import { createCaptionCopy, captionValue } from "../../localization/captionValues.js";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import FullscreenChapter from "../components/FullscreenChapter.jsx";
import BirthdayMatchGame from "../components/BirthdayMatchGame.jsx";
import InvitationArtwork from "../components/InvitationArtwork.jsx";
import { useLanguage } from "../../localization/LanguageContext.jsx";
import useInvitationGuestName from "../hooks/useInvitationGuestName.js";
import "../../styles/playground-experience.css";

const art = "/images/birthday/playground/";
const key = "1111-playground-v1";
const copy = createCaptionCopy({
  "title": "invitations.pages.BirthdayPlaygroundExperience.copy1.title",
  "intro": "invitations.pages.BirthdayPlaygroundExperience.copy1.intro",
  "date": "invitations.pages.BirthdayPlaygroundExperience.copy1.date",
  "city": "invitations.pages.BirthdayPlaygroundExperience.copy1.city",
  "open": "invitations.pages.BirthdayPlaygroundExperience.copy1.open",
  "close": "invitations.pages.BirthdayPlaygroundExperience.copy1.close",
  "motion": "invitations.pages.BirthdayPlaygroundExperience.copy1.motion",
  "invitation": "invitations.pages.BirthdayPlaygroundExperience.copy1.invitation",
  "note": "invitations.pages.BirthdayPlaygroundExperience.copy1.note",
  "details": "invitations.pages.BirthdayPlaygroundExperience.copy1.details",
  "heading": "invitations.pages.BirthdayPlaygroundExperience.copy1.heading",
  "hello": "invitations.pages.BirthdayPlaygroundExperience.copy1.hello",
  "cake": "invitations.pages.BirthdayPlaygroundExperience.copy1.cake",
  "dance": "invitations.pages.BirthdayPlaygroundExperience.copy1.dance",
  "rsvp": "invitations.pages.BirthdayPlaygroundExperience.copy1.rsvp",
  "wish": "invitations.pages.BirthdayPlaygroundExperience.copy1.wish",
  "name": "invitations.pages.BirthdayPlaygroundExperience.copy1.name",
  "message": "invitations.pages.BirthdayPlaygroundExperience.copy1.message",
  "yes": "invitations.pages.BirthdayPlaygroundExperience.copy1.yes",
  "no": "invitations.pages.BirthdayPlaygroundExperience.copy1.no",
  "save": "invitations.pages.BirthdayPlaygroundExperience.copy1.save",
  "saveWish": "invitations.pages.BirthdayPlaygroundExperience.copy1.saveWish",
  "saved": "invitations.pages.BirthdayPlaygroundExperience.copy1.saved",
  "wishSaved": "invitations.pages.BirthdayPlaygroundExperience.copy1.wishSaved",
  "session": "invitations.pages.BirthdayPlaygroundExperience.copy1.session",
  "edit": "invitations.pages.BirthdayPlaygroundExperience.copy1.edit",
  "demo": "invitations.pages.BirthdayPlaygroundExperience.copy1.demo",
  "candle": "invitations.pages.BirthdayPlaygroundExperience.copy1.candle",
  "relight": "invitations.pages.BirthdayPlaygroundExperience.copy1.relight",
  "back": "invitations.pages.BirthdayPlaygroundExperience.copy1.back",
  "venue": "invitations.pages.BirthdayPlaygroundExperience.copy1.venue",
  "thanks": "invitations.pages.BirthdayPlaygroundExperience.copy1.thanks",
  "miss": "invitations.pages.BirthdayPlaygroundExperience.copy1.miss",
  "plan": "invitations.pages.BirthdayPlaygroundExperience.copy1.plan"
});
function readSaved() { try { const value=JSON.parse(localStorage.getItem(key) || localStorage.getItem("1111-party-doodles-v1")); return value && typeof value === "object" ? value : {}; } catch { return {}; } }
export default function BirthdayPlaygroundExperience() {
 const { language, setLanguage }=useLanguage(); const c=copy[language] || copy.en;
 const [motion,setMotion]=useState(()=>!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
 const [opened,setOpened]=useState(false); const [peeking,setPeeking]=useState(false); const [blown,setBlown]=useState(true);
 const [saved,setSaved]=useState(readSaved); const [storage,setStorage]=useState(true);
 const [name,setName]=useInvitationGuestName("playground", readSaved().reply?.name || readSaved().wish?.name || "");
 const [attending,setAttending]=useState(()=>readSaved().reply?.attending || "yes");
 const [message,setMessage]=useState(()=>readSaved().wish?.message || "");
 const note=useRef(null); const details=useRef(null); const timer=useRef(null);
 useEffect(()=>{ const media=window.matchMedia("(prefers-reduced-motion: reduce)"); const update=()=>setMotion(!media.matches); media.addEventListener("change",update); return()=>{media.removeEventListener("change",update);clearTimeout(timer.current);}; },[]);

 function toggleGift(){clearTimeout(timer.current);setOpened(!opened);if(!opened){timer.current=setTimeout(()=>note.current?.focus({preventScroll:true}),motion?650:0);}}
 function save(event,type){event.preventDefault();if(!name.trim() || (type==="wish"&&!message.trim()))return;const next={...saved,[type]:type==="reply"?{name:name.trim(),attending}:{name:name.trim(),message:message.trim()}};try{localStorage.setItem(key,JSON.stringify(next));setStorage(true);}catch{setStorage(false);}setSaved(next);}
 function edit(type){const next={...saved};delete next[type];setSaved(next);try{localStorage.setItem(key,JSON.stringify(next));}catch{setStorage(false);}}
 return <main className={`playground-experience ${motion?"playground-motion":""}`} lang={language}>
  <FullscreenChapter className="playground-cover" chrome={<>
   <header className="playground-toolbar"><Link to="/invitations" aria-label={c.back}>11:11</Link><div><button onClick={()=>setLanguage((language === "ka" ? "en" : "ka"))} aria-label={captionValue("invitations.pages.BirthdayPlaygroundExperience.caption3", language)}>{captionValue("invitations.pages.BirthdayPlaygroundExperience.caption4", language)}</button><button aria-pressed={motion} onClick={()=>setMotion(!motion)}>{c.motion}<span className="playground-switch" aria-hidden="true"/></button></div></header>



   </>}><div className="playground-intro"><h1>{c.title}</h1><p>{c.intro}</p><div className="playground-date"><time dateTime="2027-05-23">{c.date}</time><span aria-hidden="true"/><time dateTime="17:00">17:00</time><span aria-hidden="true"/><span className="playground-city">{c.city}</span></div></div>
   <div className={`playground-gift ${opened?"is-open":""} ${peeking?"is-peeking":""}`}><button className="playground-gift-hit" onPointerDown={()=>setPeeking(true)} onPointerUp={()=>setPeeking(false)} onPointerCancel={()=>setPeeking(false)} onPointerLeave={()=>setPeeking(false)} aria-label={c.open} aria-expanded={opened} onClick={toggleGift} tabIndex={opened?-1:0}/>
    <div className="playground-note" ref={note} tabIndex={-1} inert={!opened} aria-hidden={!opened}><h2>{c.invitation}</h2><p>{c.note}</p><button onClick={()=>{details.current.scrollIntoView({behavior:motion?"smooth":"instant"});details.current.focus({preventScroll:true});}}>{c.details}</button></div>
    <img className="playground-gift-base" src={`${art}gift.webp`} alt=""/><img className="playground-gift-lid" src={`${art}gift.webp`} alt=""/><button className="playground-open" onClick={toggleGift} aria-expanded={opened}>{opened?c.close:c.open}</button>

   </div>

  </FullscreenChapter>
  <section className="playground-details" ref={details} tabIndex={-1}>
   <FullscreenChapter className="playground-plan-screen">
   <button className={`playground-candle ${blown?"is-blown":""}`} onClick={()=>setBlown(false)} aria-pressed={!blown}><span className="playground-candle-art"><img src={`${art}cake.webp`} alt=""/></span><span aria-live="polite">{blown?c.candle:c.relight}</span></button>
<h2>{c.heading}</h2><p className="playground-venue">{c.venue}</p>
   <ol className="playground-plan" aria-label={c.plan}>{[["17:00",c.hello],["18:00",c.cake],["19:00",c.dance]].map(([time,title])=><li key={time}><time>{time}</time><span>{title}</span></li>)}</ol>

   </FullscreenChapter><BirthdayMatchGame language={language} motion={motion}/><div className="playground-forms">
    <FullscreenChapter id="playground-rsvp" className="playground-rsvp-screen" chrome={<div className="playground-sweetie" aria-hidden="true"><span>{captionValue("invitations.pages.BirthdayPlaygroundExperience.caption5", language)}</span><InvitationArtwork name="heart-filled" size={28}/></div>}><div className="playground-form-paper"><header className="playground-form-heading"><h3>{c.rsvp}</h3><p>{captionValue("invitations.pages.BirthdayPlaygroundExperience.caption6", language)}</p></header>{saved.reply?<div className="playground-confirmation" role="status"><p>{saved.reply.name}</p><h4>{saved.reply.attending==="yes"?c.thanks:c.miss}</h4><p>{storage?c.saved:c.session}</p><button onClick={()=>edit("reply")}>{c.edit}</button></div>:<form onSubmit={e=>save(e,"reply")}><label htmlFor="playground-rsvp-name">{c.name}</label><input id="playground-rsvp-name" required maxLength={80} autoComplete="given-name" value={name} onChange={e=>setName(e.target.value)} pattern=".*\S.*"/><fieldset><legend>{captionValue("invitations.pages.BirthdayPlaygroundExperience.caption7", language)}</legend>{[["yes",c.yes],["no",c.no]].map(([value,label])=><label className={attending === value ? "is-selected" : ""} key={value}><input type="radio" name="attending" value={value} checked={attending===value} onChange={()=>setAttending(value)}/><img src={`${art}match-${value === "yes" ? "slice" : "cherries"}.webp`} alt=""/><strong>{label}</strong></label>)}</fieldset><button className="playground-submit">{c.save}</button><p className="playground-form-local">{c.demo}</p></form>}</div><p className="playground-book-footnote">{c.demo}</p></FullscreenChapter>
    <FullscreenChapter id="playground-wishes" className="playground-wish-screen"><div className="playground-form-paper"><header className="playground-form-heading"><h3>{c.wish}</h3><InvitationArtwork name="heart-filled" size={95}/><p>{captionValue("invitations.pages.BirthdayPlaygroundExperience.caption8", language)}</p></header>{saved.wish?<div className="playground-confirmation" role="status"><p>{saved.wish.name}</p><blockquote>{saved.wish.message}</blockquote><p>{storage?c.wishSaved:c.session}</p><button onClick={()=>edit("wish")}>{c.edit}</button></div>:<form onSubmit={e=>save(e,"wish")}><p className="playground-book-intro">{captionValue("invitations.pages.BirthdayPlaygroundExperience.caption9", language)}</p><label htmlFor="playground-wish-name">{c.name}</label><input id="playground-wish-name" placeholder={c.name} required maxLength={80} autoComplete="given-name" value={name} onChange={e=>setName(e.target.value)} pattern=".*\S.*"/><label htmlFor="playground-message">{c.message}</label><textarea id="playground-message" placeholder={c.message} required maxLength={600} value={message} onChange={e=>setMessage(e.target.value)} onInput={e=>e.target.setCustomValidity(e.target.value.trim()?"":c.message)}/><button className="playground-submit">{c.saveWish}</button><p className="playground-form-local">{c.demo}</p></form>}</div><p className="playground-book-footnote">{c.demo}</p></FullscreenChapter>
   </div><footer className="maker-credit"><span>{captionValue("invitations.pages.BirthdayPlaygroundExperience.caption10", language)}</span><Link to="/" aria-label={captionValue("invitations.pages.BirthdayPlaygroundExperience.caption11", language)}><img src="/logos/logo-pink-star.svg" alt="11:11" width="1330" height="1112"/></Link></footer>
  </section>
 </main>;
}
