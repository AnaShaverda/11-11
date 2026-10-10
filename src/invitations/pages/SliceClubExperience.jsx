import { createCaptionCopy, captionValue } from "../../localization/captionValues.js";
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../localization/LanguageContext.jsx';
import InvitationMakerFooter from '../components/InvitationMakerFooter.jsx';
import PartyForm from '../components/PizzaPartyForm.jsx';
import { pizzaPartyCopy } from '../data/pizzaPartyCopy.js';
import '../../styles/pizza-party-experience.css';
import '../../styles/slice-club-experience.css';

const art = '/images/birthday/slice-club/';
const food = '/images/birthday/pizza-party/';
const copy = createCaptionCopy({
  "title": "invitations.pages.SliceClubExperience.copy1.title",
  "birthday": "invitations.pages.SliceClubExperience.copy1.birthday",
  "surprise": "invitations.pages.SliceClubExperience.copy1.surprise",
  "open": "invitations.pages.SliceClubExperience.copy1.open",
  "invited": "invitations.pages.SliceClubExperience.copy1.invited",
  "details": "invitations.pages.SliceClubExperience.copy1.details",
  "close": "invitations.pages.SliceClubExperience.copy1.close",
  "story": "invitations.pages.SliceClubExperience.copy1.story",
  "intro": "invitations.pages.SliceClubExperience.copy1.intro",
  "menu": "invitations.pages.SliceClubExperience.copy1.menu",
  "schedule": [
    "invitations.pages.SliceClubExperience.copy1.schedule.0",
    "invitations.pages.SliceClubExperience.copy1.schedule.1",
    "invitations.pages.SliceClubExperience.copy1.schedule.2"
  ],
  "roll": "invitations.pages.SliceClubExperience.copy1.roll",
  "top": "invitations.pages.SliceClubExperience.copy1.top",
  "bake": "invitations.pages.SliceClubExperience.copy1.bake",
  "rollTitle": "invitations.pages.SliceClubExperience.copy1.rollTitle",
  "topTitle": "invitations.pages.SliceClubExperience.copy1.topTitle",
  "bakeTitle": "invitations.pages.SliceClubExperience.copy1.bakeTitle",
  "readyTitle": "invitations.pages.SliceClubExperience.copy1.readyTitle",
  "rollAction": "invitations.pages.SliceClubExperience.copy1.rollAction",
  "rollHint": "invitations.pages.SliceClubExperience.copy1.rollHint",
  "rolled": "invitations.pages.SliceClubExperience.copy1.rolled",
  "rolls": "invitations.pages.SliceClubExperience.copy1.rolls",
  "topHint": "invitations.pages.SliceClubExperience.copy1.topHint",
  "toppings": [
    "invitations.pages.SliceClubExperience.copy1.toppings.0",
    "invitations.pages.SliceClubExperience.copy1.toppings.1",
    "invitations.pages.SliceClubExperience.copy1.toppings.2",
    "invitations.pages.SliceClubExperience.copy1.toppings.3"
  ],
  "next": "invitations.pages.SliceClubExperience.copy1.next",
  "oven": "invitations.pages.SliceClubExperience.copy1.oven",
  "bakeAction": "invitations.pages.SliceClubExperience.copy1.bakeAction",
  "baking": "invitations.pages.SliceClubExperience.copy1.baking",
  "ready": "invitations.pages.SliceClubExperience.copy1.ready",
  "undo": "invitations.pages.SliceClubExperience.copy1.undo",
  "previous": "invitations.pages.SliceClubExperience.copy1.previous",
  "reset": "invitations.pages.SliceClubExperience.copy1.reset",
  "skip": "invitations.pages.SliceClubExperience.copy1.skip",
  "finish": "invitations.pages.SliceClubExperience.copy1.finish",
  "name": "invitations.pages.SliceClubExperience.copy1.name",
  "nameDefault": "invitations.pages.SliceClubExperience.copy1.nameDefault",
  "cheese": "invitations.pages.SliceClubExperience.copy1.cheese",
  "rsvp": "invitations.pages.SliceClubExperience.copy1.rsvp",
  "wish": "invitations.pages.SliceClubExperience.copy1.wish",
  "farewell": "invitations.pages.SliceClubExperience.copy1.farewell",
  "pen": "invitations.pages.SliceClubExperience.copy1.pen",
  "optional": "invitations.pages.SliceClubExperience.copy1.optional",
  "progress": "invitations.pages.SliceClubExperience.copy1.progress",
  "menuItems": [
    "invitations.pages.SliceClubExperience.copy1.menuItems.0",
    "invitations.pages.SliceClubExperience.copy1.menuItems.1",
    "invitations.pages.SliceClubExperience.copy1.menuItems.2"
  ]
});
const positions = [ [[32,30],[65,39],[41,58],[61,68],[29,59]], [[48,29],[68,53],[46,68],[30,43],[51,48]], [[34,42],[60,32],[64,57],[35,66],[45,59]], [[51,36],[32,55],[65,65],[42,66],[61,47]] ];
function Pizza({ selected, className = '' }) {
  return <div className={`sc-pizza ${className}`} aria-hidden="true"><img src={`${food}game-pizza.webp`} alt="" width="790" height="790" />{selected.flatMap(index => positions[index].map(([left, top], n) => <span className={`pp-topping pp-topping-${index}`} key={`${index}-${n}`} style={{left:`${left}%`,top:`${top}%`,'--topping-angle':`${n*49+index*30}deg`}} />))}</div>;
}
export default function SliceClubExperience() {
  const { language, setLanguage } = useLanguage();
  const t = copy[language] || copy.en;
  const base = pizzaPartyCopy[language] || pizzaPartyCopy.en;
  const text = {...base,wishTitle:t.wish,rsvp:t.rsvp,thanks:t.farewell};
  const [motion,setMotion] = useState(()=>!matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [opened,setOpened] = useState(false);
  const [stage,setStage] = useState(0);
  const [rolls,setRolls] = useState(0);
  const [selected,setSelected] = useState([0,1]);
  const [history,setHistory] = useState([]);
  const [baking,setBaking] = useState(false);
  const [pizzaName,setPizzaName] = useState('');
  const page = useRef(null);
  const game = useRef(null);
  const stageHeading = useRef(null);
  const coverHeading = useRef(null);
  const bakeTimer = useRef(null);
  const drag = useRef(null);
  const rollRef = useRef(0);
  const pin = useRef(null);
  useEffect(()=>{const pref=matchMedia('(prefers-reduced-motion: reduce)');const update=()=>setMotion(!pref.matches);pref.addEventListener('change',update);return()=>pref.removeEventListener('change',update)},[]);
  useEffect(()=>()=>clearTimeout(bakeTimer.current),[]);
  useEffect(()=>{
    if(!motion || !('IntersectionObserver' in window))return;
    const items=[...page.current.querySelectorAll('.sc-reveal')];
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{entry.target.classList.toggle('sc-visible',entry.isIntersecting);entry.target.dataset.edge=entry.boundingClientRect.top<0?'above':'below'}),{rootMargin:'-3% 0px',threshold:0});
    items.forEach(item=>{item.dataset.reveal='true';observer.observe(item)});
    return()=>{observer.disconnect();items.forEach(item=>{delete item.dataset.reveal;item.classList.remove('sc-visible')})};
  },[motion]);
  function goTo(id){const target=document.getElementById(id);target?.scrollIntoView({behavior:motion?'smooth':'instant',block:'start'});target?.focus({preventScroll:true})}
  function changeStage(next){clearTimeout(bakeTimer.current);setBaking(false);setStage(next);requestAnimationFrame(()=>{game.current?.scrollIntoView({behavior:motion?'smooth':'instant',block:'start'});stageHeading.current?.focus({preventScroll:true})})}
  function roll(){const next=Math.min(3,rollRef.current+1);rollRef.current=next;setRolls(next);if(next===3)changeStage(1)}
  function pointerDown(event){if(rollRef.current>=3)return;drag.current={y:event.clientY,id:event.pointerId};event.currentTarget.setPointerCapture(event.pointerId)}
  function pointerMove(event){if(!drag.current)return;const delta=event.clientY-drag.current.y;pin.current?.style.setProperty('--pin-travel',`${Math.max(-55,Math.min(55,delta))}px`);if(Math.abs(delta)>45){drag.current.y=event.clientY;roll()}}
  function pointerUp(){drag.current=null;pin.current?.style.removeProperty('--pin-travel')}
  function toggle(index){setHistory(current=>[...current,selected]);setSelected(current=>current.includes(index)?current.filter(value=>value!==index):[...current,index])}
  function undo(){if(!history.length)return;setSelected(history[history.length-1]);setHistory(current=>current.slice(0,-1))}
  function bake(){if(baking)return;setBaking(true);bakeTimer.current=setTimeout(()=>changeStage(3),motion?1800:0)}
  function reset(){setRolls(0);rollRef.current=0;setSelected([0,1]);setHistory([]);setPizzaName('');changeStage(0)}
  function openBox(){setOpened(true);requestAnimationFrame(()=>coverHeading.current?.focus({preventScroll:true}))}
  function calendar(){const content="BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//11:11//Slice Club//EN\r\nBEGIN:VEVENT\r\nUID:slice-club-2027@1111.local\r\nDTSTAMP:20261010T000000Z\r\nDTSTART:20270718T100000Z\r\nDTEND:20270718T130000Z\r\nSUMMARY:Aniko's Pizza Party (demo)\r\nLOCATION:Tbilisi - exact location from host\r\nEND:VEVENT\r\nEND:VCALENDAR\r\n";const url=URL.createObjectURL(new Blob([content],{type:'text/calendar;charset=utf-8'}));const link=document.createElement('a');link.href=url;link.download='anikos-slice-club.ics';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000)}
  const headings=[t.rollTitle,t.topTitle,t.bakeTitle,t.readyTitle];
  return <main ref={page} className={`pizza-party slice-club-page ${motion?'sc-motion':''}`} lang={language}>
    <header className="pp-header sc-header"><Link to="/invitations?category=birthday" aria-label={base.back}><strong>11:11</strong></Link><nav aria-label={captionValue("invitations.pages.SliceClubExperience.caption2", language)}><button aria-label={base.language} onClick={()=>setLanguage((language === "ka" ? "en" : "ka"))}>EN / KA</button><button className="pp-motion-toggle" aria-pressed={motion} onClick={()=>setMotion(value=>!value)}>{base.motion}<span aria-hidden="true" /></button><a href="#sc-rsvp" className="pp-header-rsvp" onClick={event=>{event.preventDefault();goTo('sc-rsvp')}}>RSVP</a></nav></header>
    <section id="sc-cover" className={`sc-section sc-cover ${opened?'sc-opened':''}`} aria-labelledby="sc-title" tabIndex={-1}><div className="sc-frame"><div className="sc-layout sc-cover-layout"><div className="sc-cover-copy"><p className="sc-birthday">{t.birthday}</p><h1 id="sc-title" ref={coverHeading} tabIndex={-1}>{opened?t.invited:t.title}</h1>{opened?<><p className="sc-age">{base.age}</p><p>{base.date} / 14:00 / {base.city}</p><div className="sc-actions"><button className="pp-button" onClick={()=>goTo('sc-details')}>{t.details}</button><button className="pp-button pp-outline" onClick={()=>goTo('sc-rsvp')}>RSVP</button></div><button className="sc-text-button" onClick={()=>setOpened(false)}>{t.close}</button></>:<><p>{t.surprise}</p><button className="pp-button" onClick={openBox}>{t.open}</button></>}</div><div className="sc-cover-art">{opened?<img className="sc-open-box" src={`${art}box-open.webp`} alt="" width="768" height="512" />:<button className="sc-box-button" onClick={openBox} aria-label={t.open}><img src={`${art}box-closed.webp`} alt="" width="768" height="512" fetchPriority="high" /></button>}</div></div></div></section>
    <section id="sc-details" className="sc-section sc-details" aria-labelledby="sc-details-title" tabIndex={-1}><div className="sc-layout"><div className="sc-reveal"><h2 id="sc-details-title">{t.story}</h2><p className="sc-event-date">{base.date}<br />14:00 – 17:00<br />{base.city}</p><p className="sc-intro">{t.intro}</p><p className="pp-small sc-venue">{base.venue}</p><button className="pp-button pp-outline" onClick={calendar}>{base.calendar}</button></div><div className="sc-menu-art sc-reveal"><div className="sc-menu"><h3>{t.menu}</h3><ol>{t.schedule.map((item,i)=><li key={item}><time>{['14:00','14:30','15:30'][i]}</time><span>{item}</span></li>)}</ol></div><img src={`${art}pizza-slice.webp`} alt="" loading="lazy" width="1254" height="1254" /></div></div></section>
    <section ref={game} id="sc-game" className={`sc-section sc-game sc-stage-${stage} ${baking?'sc-is-baking':''}`} aria-labelledby="sc-stage-heading" tabIndex={-1}><div className="sc-frame"><div className="sc-layout sc-game-layout"><div className="sc-game-copy"><p className="sc-eyebrow">{t.optional}</p><h2 ref={stageHeading} id="sc-stage-heading" tabIndex={-1}>{headings[stage]}</h2><ol className="sc-steps" aria-label={t.progress}>{[t.roll,t.top,t.bake].map((label,i)=><li key={label} className={stage>=i?'sc-step-current':''} aria-current={stage===i?'step':undefined}><span aria-hidden="true">{i+1}</span>{label}</li>)}</ol>
      {stage===0?<><p className="sc-game-hint">{t.rollHint}</p><button className="pp-button" onClick={roll}>{t.rollAction}</button><p className="pp-small sc-roll-status" role="status">{t.rolls}: {rolls}/3</p></>:stage===1?<><p className="sc-game-hint">{t.topHint}</p><div className="sc-ingredients" role="group" aria-label={t.top}><div>{t.toppings.map((label,i)=><button key={label} aria-pressed={selected.includes(i)} onClick={()=>toggle(i)}><span className={`pp-topping-icon pp-topping-${i}`} aria-hidden="true" />{label}</button>)}</div></div><p className="pp-small sc-selection" role="status">{selected.length?selected.map(i=>t.toppings[i]).join(', '):t.cheese}</p><div className="sc-actions"><button className="pp-button pp-outline" disabled={!history.length} onClick={undo}>{t.undo}</button><button className="pp-button" onClick={()=>changeStage(2)}>{t.oven}</button></div></>:stage===2?<><p className="sc-game-hint">{t.ready}</p><button className="pp-button" disabled={baking} onClick={bake}>{baking?t.baking:t.bakeAction}</button><p className="sc-baking-status" role="status">{baking?t.baking:''}</p></>:<><p className="sc-game-hint">{t.ready}</p><label className="sc-pizza-name" htmlFor="sc-pizza-name">{t.name}<input id="sc-pizza-name" maxLength={50} value={pizzaName} placeholder={t.nameDefault} onChange={e=>setPizzaName(e.target.value)} /></label><p className="sc-selection">{selected.length?selected.map(i=>t.toppings[i]).join(' / '):t.cheese}</p><div className="sc-actions"><button className="pp-button" onClick={reset}>{t.reset}</button><button className="pp-button pp-outline" onClick={()=>goTo('sc-wishes')}>{t.finish}</button></div></>}
      {stage>0&&stage<3&&!baking&&<button className="sc-text-button" onClick={()=>changeStage(stage-1)}>{t.previous}</button>}<button className="sc-text-button" onClick={()=>goTo('sc-wishes')}>{t.skip}</button></div>
      <div className="sc-game-art" key={stage}>{stage===0?<div className="sc-dough-stage"><img src={`${art}dough-mat.webp`} alt="" width="768" height="512" /><button ref={pin} className="sc-rolling-pin" aria-label={t.rollAction} onPointerDown={pointerDown} onPointerMove={pointerMove} onPointerUp={pointerUp} onPointerCancel={pointerUp} onLostPointerCapture={pointerUp} onClick={event=>{if(event.detail===0)roll()}} style={{'--roll':rolls}}><img src={`${art}rolling-pin.webp`} alt="" draggable="false" /></button><div className="sc-dough-progress" aria-hidden="true" style={{'--roll-scale':.58+rolls*.14}} /></div>:stage===1?<div className="sc-topping-table"><Pizza selected={selected} /></div>:stage===2?<div className="sc-oven-stage"><img src={`${art}oven.webp`} alt="" width="768" height="512" /><Pizza className="sc-oven-pizza" selected={selected} /></div>:<div className="sc-ready-stage"><div className="sc-ready-box"><img src={`${art}box-empty.webp`} alt="" width="768" height="512" /><Pizza className="sc-ready-pizza" selected={selected} /></div><div className="sc-pizza-tag">{pizzaName.trim()||t.nameDefault}</div></div>}</div></div></div></section>
    <section id="sc-wishes" className="sc-section sc-wishes" aria-labelledby="pp-wish-heading" tabIndex={-1}><div className="sc-frame"><div className="sc-layout"><div className="sc-reveal"><PartyForm kind="wish" text={text} scope="slice-club" /></div><div className="sc-wish-art sc-reveal"><div className="sc-note-heading">Slice Club</div><p>{t.pen}</p><div className="sc-note-signature">{t.birthday}</div></div></div></div></section>
    <section id="sc-rsvp" className="sc-section sc-rsvp" aria-labelledby="pp-reply-heading" tabIndex={-1}><div className="sc-layout"><div className="sc-rsvp-paper sc-reveal"><PartyForm kind="reply" text={text} scope="slice-club" /></div><div className="sc-farewell sc-reveal"><h3>{t.farewell}</h3><img src={`${art}pizza-slice.webp`} alt="" loading="lazy" width="1254" height="1254" /></div></div></section><div className="sc-end"><div className="sc-end-copy"><span>Slice Club</span><p>{t.birthday}</p></div><InvitationMakerFooter palette="guest" /><button className="sc-text-button" onClick={()=>goTo('sc-cover')}>{base.top}</button></div>
  </main>;
}
