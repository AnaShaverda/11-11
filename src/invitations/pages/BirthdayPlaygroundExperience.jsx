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
const copy = {
 en: { title:"it’s my birthday!", intro:"Let’s eat cake, play a little and celebrate together.", date:"23 MAY 2027", city:"TBILISI", open:"Open your surprise", close:"Wrap it up again", motion:"Motion", invitation:"You’re invited!", note:"A little party, a lot of love. And a slice of cake with your name on it.", details:"See the party details", heading:"Cake, wishes & good company.", hello:"A little hello", cake:"Cake & wishes", dance:"Dance a little longer", rsvp:"Save you a slice?", wish:"Leave Aniko a birthday message.", name:"Your name", message:"Your birthday message", yes:"I’ll be there", no:"Can’t make it", save:"Save demo reply", saveWish:"Save demo wish", saved:"Your reply is saved on this device.", wishSaved:"Your wish is saved on this device.", session:"Saved for this visit only. Device storage is unavailable.", edit:"Edit", demo:"Preview invitation. Replies and wishes stay on this device.", candle:"A little birthday magic for Aniko. Tap to light her candles.", relight:"Ready for Aniko’s big wish!", back:"Back to invitations", venue:"Tbilisi. Exact address to be shared by the host.", thanks:"Can’t wait to celebrate with you.", miss:"We’ll save you a little birthday love.", plan:"The birthday plan" },
 ka: { title:"ჩემი დაბადების დღეა!", intro:"ანიკო სურვილს იფიქრებს. ერთად ვიზეიმოთ.", date:"23 მაისი 2027", city:"თბილისი", open:"გახსენი მოსაწვევი", close:"შეფუთე თავიდან", motion:"მოძრაობა", invitation:"გეპატიჟებით!", note:"პატარა წვეულება, ბევრი სიყვარული და ტორტის ნაჭერი შენთვის.", details:"წვეულების დეტალები", heading:"ტორტი, სურვილები და საყვარელი ადამიანები.", hello:"შეხვედრა", cake:"ტორტი და სურვილები", dance:"ცეკვა და გართობა", rsvp:"შეგინახოთ ტორტი?", wish:"დაუტოვე ანიკოს დაბადების დღის წერილი.", name:"შენი სახელი", message:"შენი დაბადების დღის წერილი", yes:"მოვდივარ", no:"ვერ მოვდივარ", save:"დემო პასუხის შენახვა", saveWish:"დემო სურვილის შენახვა", saved:"პასუხი ამ მოწყობილობაზე შეინახა.", wishSaved:"სურვილი ამ მოწყობილობაზე შეინახა.", session:"შენახულია მხოლოდ ამ ვიზიტისთვის. მოწყობილობაზე შენახვა მიუწვდომელია.", edit:"შეცვლა", demo:"დემო მოსაწვევი. პასუხები და სურვილები რჩება ამ მოწყობილობაზე.", candle:"პატარა ჯადოსნობა ანიკოსთვის. შეეხე სანთლების ასანთებად.", relight:"ყველაფერი მზადაა ანიკოს სურვილისთვის!", back:"მოსაწვევების კოლექცია", venue:"თბილისი. ზუსტ მისამართს მასპინძელი გაგიზიარებთ.", thanks:"მოუთმენლად გელოდებით.", miss:"დაგვაკლდები!", plan:"დღის გეგმა" }
};
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
   <header className="playground-toolbar"><Link to="/invitations" aria-label={c.back}>11:11</Link><div><button onClick={()=>setLanguage(language==="ka"?"en":"ka")} aria-label={language==="ka"?"Switch to English":"ქართულად"}>{language==="ka"?"EN":"KA"}</button><button aria-pressed={motion} onClick={()=>setMotion(!motion)}>{c.motion}<span className="playground-switch" aria-hidden="true"/></button></div></header>



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
    <FullscreenChapter id="playground-rsvp" className="playground-rsvp-screen" chrome={<div className="playground-sweetie" aria-hidden="true"><span>{language === "ka" ? "შენთან ერთად უფრო ტკბილია" : "Either way, you’re a sweetie"}</span><InvitationArtwork name="heart-filled" size={28}/></div>}><div className="playground-form-paper"><header className="playground-form-heading"><h3>{c.rsvp}</h3><p>{language === "ka" ? "შენი ადგილი სუფრასთან. ტორტის ნაჭერი შენთვის." : "A place at the table. A slice with your name on it."}</p></header>{saved.reply?<div className="playground-confirmation" role="status"><p>{saved.reply.name}</p><h4>{saved.reply.attending==="yes"?c.thanks:c.miss}</h4><p>{storage?c.saved:c.session}</p><button onClick={()=>edit("reply")}>{c.edit}</button></div>:<form onSubmit={e=>save(e,"reply")}><label htmlFor="playground-rsvp-name">{c.name}</label><input id="playground-rsvp-name" required maxLength={80} autoComplete="given-name" value={name} onChange={e=>setName(e.target.value)} pattern=".*\S.*"/><fieldset><legend>{language === "ka" ? "შემოგვიერთდები?" : "Will you join us?"}</legend>{[["yes",c.yes],["no",c.no]].map(([value,label])=><label className={attending === value ? "is-selected" : ""} key={value}><input type="radio" name="attending" value={value} checked={attending===value} onChange={()=>setAttending(value)}/><img src={`${art}match-${value === "yes" ? "slice" : "cherries"}.webp`} alt=""/><strong>{label}</strong></label>)}</fieldset><button className="playground-submit">{c.save}</button><p className="playground-form-local">{c.demo}</p></form>}</div><p className="playground-book-footnote">{c.demo}</p></FullscreenChapter>
    <FullscreenChapter id="playground-wishes" className="playground-wish-screen"><div className="playground-form-paper"><header className="playground-form-heading"><h3>{c.wish}</h3><InvitationArtwork name="heart-filled" size={95}/><p>{language === "ka" ? "სიტყვები, რომლებიც სანთლების ჩაქრობის შემდეგაც გვემახსოვრება." : "A few words to keep, long after the candles go out."}</p></header>{saved.wish?<div className="playground-confirmation" role="status"><p>{saved.wish.name}</p><blockquote>{saved.wish.message}</blockquote><p>{storage?c.wishSaved:c.session}</p><button onClick={()=>edit("wish")}>{c.edit}</button></div>:<form onSubmit={e=>save(e,"wish")}><p className="playground-book-intro">{language === "ka" ? "დატოვე პატარა წერილი. დიდი სურვილი. ან უბრალოდ მოგვესალმე." : "Leave a little message. A big wish. Or just a hello."}</p><label htmlFor="playground-wish-name">{c.name}</label><input id="playground-wish-name" placeholder={c.name} required maxLength={80} autoComplete="given-name" value={name} onChange={e=>setName(e.target.value)} pattern=".*\S.*"/><label htmlFor="playground-message">{c.message}</label><textarea id="playground-message" placeholder={c.message} required maxLength={600} value={message} onChange={e=>setMessage(e.target.value)} onInput={e=>e.target.setCustomValidity(e.target.value.trim()?"":c.message)}/><button className="playground-submit">{c.saveWish}</button><p className="playground-form-local">{c.demo}</p></form>}</div><p className="playground-book-footnote">{c.demo}</p></FullscreenChapter>
   </div><footer className="maker-credit"><span>{language === "ka" ? "შექმნილია" : "Made by"}</span><Link to="/" aria-label={language === "ka" ? "11:11 — ეწვიე მოსაწვევის შემქმნელს" : "11:11 — visit the company that made this card"}><img src="/logos/logo-pink-star.svg" alt="11:11" width="1330" height="1112"/></Link></footer>
  </section>
 </main>;
}
