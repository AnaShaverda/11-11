import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../localization/LanguageContext.jsx';
import InvitationMakerFooter from '../components/InvitationMakerFooter.jsx';
import MidnightForm from '../midnight-martini/MidnightForm.jsx';
import MidnightMix from '../midnight-martini/MidnightMix.jsx';
import MidnightGames from '../midnight-martini/MidnightGames.jsx';
import { midnightAssets, midnightCopy } from '../midnight-martini/copy.js';
import '../../styles/midnight-martini-experience.css';

export default function MidnightMartiniExperience() {
  const { language, setLanguage } = useLanguage();
  const text = midnightCopy[language] || midnightCopy.en;
  const [motion, setMotion] = useState(() => !matchMedia('(prefers-reduced-motion: reduce)').matches);
  useEffect(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setMotion(!media.matches);
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);
  function calendar() {
    const data = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//11:11//Midnight Martini//EN', 'BEGIN:VEVENT', 'UID:birthday-midnight-martini-2027@1111.local', 'DTSTAMP:20261010T000000Z', 'DTSTART:20270912T160000Z', 'DTEND:20270912T205900Z', 'SUMMARY:Dea birthday - Midnight Martini (demo)', 'LOCATION:Tbilisi - exact address from host', 'END:VEVENT', 'END:VCALENDAR', ''].join('\r\n');
    const url = URL.createObjectURL(new Blob([data], { type: 'text/calendar;charset=utf-8' }));
    const anchor = document.createElement('a'); anchor.href = url; anchor.download = 'dea-midnight-martini.ics'; anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return <main lang={language} className={`midnight-martini ${motion ? 'mm-motion' : ''}`}>
    <section className="mm-section mm-night mm-hero" id="mm-top" aria-labelledby="mm-title">
      <header className="mm-toolbar"><Link to="/invitations" className="mm-brand" aria-label={text.back}>11:11</Link><div>
        <button onClick={() => setLanguage(language === 'ka' ? 'en' : 'ka')} aria-label={language === 'ka' ? 'Switch to English' : 'ქართულად'}>{language === 'ka' ? 'EN' : 'KA'}</button>
        <button aria-pressed={motion} onClick={() => setMotion(value => !value)} className="mm-motion-control">{text.motion}<span className="mm-switch" aria-hidden="true" /></button>
        <a href="#mm-rsvp">{text.rsvp}</a>
      </div></header>
      <div className="mm-wrap mm-hero-grid"><div className="mm-hero-copy"><h1 id="mm-title">{text.headline.map(line => <span key={line}>{line}</span>)}</h1><p className="mm-birthday">{text.birthday}</p><p className="mm-label mm-date">{text.date} / 20:00 / {text.city}</p><a className="mm-button mm-blush-button" href="#mm-details">{text.invited}</a></div><div className="mm-hero-art"><img src={midnightAssets.artwork} alt="" width="1254" height="1254" fetchPriority="high" /></div></div>
    </section>
    <section className="mm-section mm-details" id="mm-details" aria-labelledby="mm-details-title"><div className="mm-wrap mm-grid">
      <div><h2 id="mm-details-title">{text.details.map(line => <span key={line}>{line}</span>)}</h2><p className="mm-label mm-company">{text.company}</p><p className="mm-intro">{text.detailsLine}</p><p className="mm-event-date">{text.date} / {text.city}</p><button className="mm-button" onClick={calendar}>{text.calendar}</button><p className="mm-demo">{text.venue}</p></div>
      <ol className="mm-timeline" aria-label={text.evening}>{['20:00', '21:00', '22:30', '00:00'].map((time, i) => <li key={time}><time>{time}</time><div><h3>{text.schedule[i]}</h3><p className="mm-label">{text.scheduleNotes[i]}</p></div></li>)}</ol>
    </div></section>
    <MidnightMix text={text} motion={motion} />
    <MidnightGames text={text} />
    <section className="mm-section mm-wishes" id="mm-wishes" aria-labelledby="mm-wishes-title"><div className="mm-wrap mm-grid"><MidnightForm kind="wish" text={text} motion={motion} /><div className="mm-wish-art" aria-hidden="true"><img src={midnightAssets.artwork} alt="" width="1254" height="1254" loading="lazy" /></div></div></section>
    <section className="mm-section mm-night mm-rsvp" id="mm-rsvp" aria-labelledby="mm-rsvp-title"><div className="mm-wrap mm-grid"><MidnightForm kind="reply" text={text} motion={motion} /><div className="mm-rsvp-art"><img src={midnightAssets.artwork} alt="" width="1254" height="1254" loading="lazy" /><p>{text.wishSignature.map(line => <span key={line}>{line}</span>)}</p></div></div></section>
    <InvitationMakerFooter palette="midnight" />
  </main>;
}
