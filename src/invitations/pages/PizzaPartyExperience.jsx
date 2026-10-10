import { createCaptionCopy, captionValue } from "../../localization/captionValues.js";
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../localization/LanguageContext.jsx';
import InvitationMakerFooter from '../components/InvitationMakerFooter.jsx';
import PartyForm from '../components/PizzaPartyForm.jsx';
import { pizzaPartyCopy as words } from '../data/pizzaPartyCopy.js';
import '../../styles/pizza-party-experience.css';

const art = '/images/birthday/pizza-party/';
const menuCopy = createCaptionCopy({
  "title": "invitations.pages.PizzaPartyExperience.copy1.title",
  "items": [
    "invitations.pages.PizzaPartyExperience.copy1.items.0",
    "invitations.pages.PizzaPartyExperience.copy1.items.1",
    "invitations.pages.PizzaPartyExperience.copy1.items.2"
  ]
});
const toppingPositions = [
  [[32,30],[65,39],[41,58],[61,68],[29,59]],
  [[48,29],[68,53],[46,68],[30,43],[51,48]],
  [[34,42],[60,32],[64,57],[35,66],[45,59]],
  [[51,36],[32,55],[65,65],[42,66],[61,47]],
];
const gameCopy = createCaptionCopy({
  "title": "invitations.pages.PizzaPartyExperience.copy2.title",
  "intro": "invitations.pages.PizzaPartyExperience.copy2.intro",
  "toppings": [
    "invitations.pages.PizzaPartyExperience.copy2.toppings.0",
    "invitations.pages.PizzaPartyExperience.copy2.toppings.1",
    "invitations.pages.PizzaPartyExperience.copy2.toppings.2",
    "invitations.pages.PizzaPartyExperience.copy2.toppings.3"
  ],
  "finish": "invitations.pages.PizzaPartyExperience.copy2.finish",
  "result": "invitations.pages.PizzaPartyExperience.copy2.result",
  "another": "invitations.pages.PizzaPartyExperience.copy2.another",
  "ready": "invitations.pages.PizzaPartyExperience.copy2.ready",
  "empty": "invitations.pages.PizzaPartyExperience.copy2.empty",
  "selection": "invitations.pages.PizzaPartyExperience.copy2.selection",
  "reset": "invitations.pages.PizzaPartyExperience.copy2.reset"
});
function ToppedPizza({ selected }) {
  return <div className="pp-topped-pizza" aria-hidden="true"><img src={`${art}game-pizza.webp`} alt="" loading="lazy" width="1024" height="1024" />{selected.flatMap(index => toppingPositions[index].map(([left, top], item) => <span key={`${index}-${item}`} className={`pp-topping pp-topping-${index}`} style={{ left: `${left}%`, top: `${top}%`, '--topping-angle': `${item * 49 + index * 30}deg` }} />))}</div>;
}
export default function PizzaPartyExperience() {
  const { language, setLanguage } = useLanguage();
  const text = words[language] || words.en;
  const game = gameCopy[language] || gameCopy.en;
  const menu = menuCopy[language] || menuCopy.en;
  const [motion, setMotion] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [selected, setSelected] = useState([0, 1]);
  const [finished, setFinished] = useState(false);
  const pageRef = useRef(null);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setMotion(!media.matches);
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);
  useEffect(() => {
    if (!motion || !('IntersectionObserver' in window)) return;
    const items = [...pageRef.current.querySelectorAll('.pp-layout > *')];
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) entry.target.dataset.revealEdge = entry.boundingClientRect.top < 0 ? 'above' : 'below';
        entry.target.classList.toggle('pp-in-view', entry.isIntersecting);
      });
    }, { rootMargin: '-4% 0px -4% 0px', threshold: 0 });
    items.forEach(item => {
      const rect = item.getBoundingClientRect();
      item.dataset.scrollReveal = 'true';
      item.dataset.revealEdge = rect.bottom < 0 ? 'above' : 'below';
      item.classList.toggle('pp-in-view', rect.bottom > 0 && rect.top < window.innerHeight);
      observer.observe(item);
    });
    return () => {
      observer.disconnect();
      items.forEach(item => { delete item.dataset.scrollReveal; delete item.dataset.revealEdge; item.classList.remove('pp-in-view'); });
    };
  }, [motion]);
  function goTo(id) {
    const target = document.getElementById(id);
    if (id === 'pp-cover') window.scrollTo({ top: 0, behavior: motion ? 'smooth' : 'instant' });
    else target?.scrollIntoView({ behavior: motion ? 'smooth' : 'instant', block: 'start' });
    target?.focus({ preventScroll: true });
  }
  function toggleTopping(index) {
    setFinished(false);
    setSelected(current => current.includes(index) ? current.filter(value => value !== index) : [...current, index]);
  }
  function finishPizza() {
    setFinished(true);
  }
  function calendar() {
    const content = "BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//11:11//Pizza Party//EN\r\nBEGIN:VEVENT\r\nUID:pizza-chef-2027@1111.local\r\nDTSTAMP:20261010T000000Z\r\nDTSTART:20270718T100000Z\r\nDTEND:20270718T130000Z\r\nSUMMARY:Aniko's Pizza Party (demo)\r\nLOCATION:Tbilisi - exact location from host\r\nEND:VEVENT\r\nEND:VCALENDAR\r\n";
    const url = URL.createObjectURL(new Blob([content], { type: 'text/calendar;charset=utf-8' }));
    const link = document.createElement('a'); link.href = url; link.download = 'anikos-pizza-party.ics'; link.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return <main ref={pageRef} className={`pizza-party ${motion ? 'pp-motion' : ''}`} lang={language}>
    <header className="pp-header"><Link to="/invitations?category=birthday" aria-label={text.back}><strong>11:11</strong></Link><nav aria-label={captionValue("invitations.pages.PizzaPartyExperience.caption3", language)}><button onClick={() => setLanguage((language === "ka" ? "en" : "ka"))} aria-label={text.language}>EN / KA</button><button className="pp-motion-toggle" aria-pressed={motion} onClick={() => setMotion(value => !value)}>{text.motion}<span aria-hidden="true" /></button><a className="pp-header-rsvp" href="#pp-rsvp" onClick={event => { event.preventDefault(); goTo('pp-rsvp'); }}>RSVP</a></nav></header>
    <section className="pp-section pp-hero" id="pp-cover" aria-labelledby="pp-title" tabIndex={-1}>
      <div className="pp-awning" aria-hidden="true">{Array.from({ length: 16 }, (_, index) => <span key={index} />)}</div>
      <div className="pp-layout pp-hero-layout"><div className="pp-hero-copy"><p className="pp-eyebrow">{text.party}<br />{text.trattoria}</p><h1 id="pp-title">{text.headline.map(line => <span key={line}>{line}</span>)}</h1><p className="pp-party-title">{text.title}</p><p className="pp-age">{text.age}</p><p className="pp-date">{text.date} / 14:00 / {text.city}</p><div className="pp-actions"><button className="pp-button" onClick={() => goTo('pp-details')}>{text.invited}</button><button className="pp-button pp-outline" onClick={() => goTo('pp-rsvp')}>RSVP</button></div></div><div className="pp-hero-art"><img src={`${art}pizza-plate.webp`} alt="" fetchPriority="high" width="695" height="510" /></div></div>
    </section>
    <section className="pp-section pp-details" id="pp-details" aria-labelledby="pp-details-heading" tabIndex={-1}><div className="pp-layout pp-details-layout"><div><h2 id="pp-details-heading">{text.menu}</h2><p className="pp-age">{text.age}</p><ul className="pp-facts">{[text.date, '14:00 – 17:00', text.city].map(value => <li key={value}>{value}</li>)}</ul><button className="pp-button pp-outline" onClick={calendar}>{text.calendar}</button><p className="pp-small pp-venue">{text.venue}</p></div><div className="pp-menu-art"><img className="pp-tomato" src={`${art}tomato.webp`} alt="" loading="lazy" /><div className="pp-receipt"><p className="pp-eyebrow">{text.party}<br />{text.trattoria}</p><ol>{text.schedule.map((item, index) => <li key={item}><time>{['14:00', '14:30', '15:30'][index]}</time><span>{item}</span></li>)}</ol><p className="pp-receipt-signoff">{text.receipt}</p></div></div></div></section>
    <section className={`pp-section pp-play ${finished ? 'pp-pizza-finished' : ''}`} id="pp-play" aria-labelledby="pp-play-heading" tabIndex={-1}><div className="pp-layout pp-play-layout"><div className="pp-play-copy"><p className="pp-eyebrow">{text.optional}</p><h2 id="pp-play-heading">{game.title}</h2><p className="pp-intro">{game.intro}</p><div className="pp-topping-controls" role="group" aria-label={game.selection}>{game.toppings.map((label, index) => <button key={label} aria-pressed={selected.includes(index)} onClick={() => toggleTopping(index)}><span className="pp-ingredient-plate" aria-hidden="true"><span className={`pp-topping-icon pp-topping-${index}`} /></span>{label}</button>)}</div><p className="pp-small pp-topping-status" role="status">{finished ? game.ready : selected.length ? selected.map(index => game.toppings[index]).join(', ') : game.empty}</p><div className="pp-actions"><button className="pp-button" onClick={finished ? () => { setFinished(false); setSelected([]); } : finishPizza}>{finished ? game.another : game.finish}</button><button className="pp-button pp-outline" onClick={() => { setSelected([]); setFinished(false); }}>{game.reset}</button></div><button className="pp-skip" onClick={() => goTo('pp-wishes')}>{text.skip}</button></div><div className="pp-pizza-table"><div className="pp-check-cloth" aria-hidden="true" /><ToppedPizza selected={selected} /></div></div></section>
    <section className="pp-section pp-wishes" id="pp-wishes" aria-labelledby="pp-wish-heading" tabIndex={-1}><div className="pp-layout pp-form-layout"><PartyForm kind="wish" text={text} /><div className="pp-wish-art pp-menu-paper-art"><img src={`${art}blank-menu-paper.webp`} alt="" loading="lazy" width="1024" height="1536" /><div className="pp-handwritten-menu"><h3>{menu.title}</h3><ul>{menu.items.map(item => <li key={item}>{item}</li>)}</ul></div></div></div></section>
    <section className="pp-section pp-rsvp" id="pp-rsvp" aria-labelledby="pp-reply-heading" tabIndex={-1}><div className="pp-layout pp-form-layout"><PartyForm kind="reply" text={text} /><div className="pp-farewell"><h3>{text.farewell}</h3><img src={`${art}pizza-box.webp`} alt="" loading="lazy" width="665" height="514" /></div></div><InvitationMakerFooter palette="pizza" /><button className="pp-top" onClick={() => goTo('pp-cover')}>{text.top}</button></section>
  </main>;
}
