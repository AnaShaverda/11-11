import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../localization/LanguageContext.jsx';
import RibbonSketchToolbar from '../ribbon-sketch/RibbonSketchToolbar.jsx';
import InvitationArtwork from '../components/InvitationArtwork.jsx';
import SpiderGames from '../spider-party/SpiderGames.jsx';
import { SpiderPersonalize, SpiderReply } from '../spider-party/SpiderForms.jsx';
import { createCalendarFile, getCalendarEvent } from '../data/guestCalendar.js';
import '../ribbon-sketch/fonts.css';
import '../spider-party/spider-party.css';

const initialDetails = { name: 'Dea', age: '26', date: '2027-07-18', time: '19:00', venue: 'Tbilisi' };
const sceneRoot = '/images/birthday/spider-party/';

function Scene({ comic, className = '', priority = false }) {
  return <img className={`sp-scene ${className}`} src={`${sceneRoot}${comic ? 'comic-city' : 'midnight-city'}.webp`} alt="" aria-hidden="true" loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'} />;
}

function Web({ className = '' }) {
  return <svg className={`sp-web ${className}`} viewBox="0 0 300 300" fill="none" aria-hidden="true"><path d="M300 0 0 300M300 0 0 155M300 0 145 300M300 0 0 0M300 0 300 300M300 0 0 75M300 0 225 300M300 0 65 300" />{[60, 120, 190, 270, 360].map(r => <path key={r} d={`M${300-r} 0 Q${300-r*.9} ${r*.24} ${300-r*.9} ${r*.45} Q${300-r*.58} ${r*.52} ${300-r*.45} ${r*.9} Q${300-r*.2} ${r*.9} 300 ${r}`} />)}</svg>;
}

export default function SpiderBirthdayExperience({ theme = 'city-after-dark' }) {
  const comic = theme === 'comic-cutout';
  const { language } = useLanguage();
  const t = (en, ka) => language === 'ka' ? ka : en;
  const [details, setDetails] = useState(initialDetails);
  const [motion, setMotion] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const date = new Date(`${details.date}T12:00:00+04:00`);
  const dateShort = new Intl.DateTimeFormat(language === 'ka' ? 'ka-GE' : 'en-GB', { day: '2-digit', month: 'short', timeZone: 'Asia/Tbilisi' }).format(date);
  const dateLong = new Intl.DateTimeFormat(language === 'ka' ? 'ka-GE' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Tbilisi' }).format(date);
  const name = details.name === 'Dea' ? t('Dea', 'დეა') : details.name;
  const venue = details.venue === 'Tbilisi' ? t('Tbilisi', 'თბილისი') : details.venue;
  const hour = Number(details.time.split(':')[0]);
  const minute = details.time.split(':')[1];
  const later = offset => `${String((hour + offset) % 24).padStart(2, '0')}:${minute}`;

  useEffect(() => {
    const previous = document.title;
    document.title = `${comic ? 'Comic Cutout' : 'City After Dark'} | 11:11`;
    return () => { document.title = previous; };
  }, [comic]);

  function downloadCalendar() {
    const event = getCalendarEvent(details);
    if (!event) return;
    const file = createCalendarFile(event, { title: `${name} — ${t('Birthday', 'დაბადების დღე')}`, location: details.venue, url: window.location.href, uid: `spider-${theme}-${details.date}@11-11` });
    const url = URL.createObjectURL(new Blob([file], { type: 'text/calendar;charset=utf-8' }));
    const anchor = document.createElement('a'); anchor.href = url; anchor.download = `${theme}-birthday.ics`; anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  return <main className={`sp-experience ${comic ? 'sp-comic' : 'sp-midnight'}`} lang={language} data-motion={motion ? 'on' : 'off'}>
    <a className="sp-skip" href="#sp-rsvp">{t('Skip to RSVP', 'პასუხზე გადასვლა')}</a>
    <RibbonSketchToolbar motion={motion} onMotion={() => setMotion(value => !value)} playHref="#sp-play" actionHref="#sp-rsvp" actionLabel="RSVP" />
    <section className="sp-chapter sp-hero" aria-labelledby="sp-title">
      <Scene comic={comic} priority /><Web />
      <div className="sp-hero-copy"><h1 id="sp-title">{comic ? t('PARTY!', 'წვეულება!') : t('A SUPER\nBIRTHDAY', 'სუპერ\nდაბადების\nდღე')}</h1><div className="sp-host"><span>{name}</span><span>{details.age ? t(`turns ${details.age}`, `ხდება ${details.age}`) : t('Birthday edition', 'დაბადების დღის ნომერი')}</span></div><p className="sp-hero-date">{dateShort} {date.getFullYear()}<br />{details.time} / {venue}</p></div>
      {details.age && <span className="sp-hero-age" aria-hidden="true">{details.age}</span>}
      <div className="sp-hanging-spider"><img src={`/images/components/separated/birthday-${comic ? 'retro-sport' : 'city-after-dark'}-spider.webp`} alt="" aria-hidden="true" /></div>
      <p className="sp-hand sp-hero-note">{t('Same friends.\nBigger adventures.', 'იგივე მეგობრები.\nდიდი თავგადასავლები.')}</p>
      <a className="sp-scroll" href="#sp-details">{t('Your next adventure', 'შენი შემდეგი თავგადასავალი')}<InvitationArtwork name="arrow-down" size={22} /></a>
    </section>

    <section id="sp-details" className="sp-chapter sp-details" aria-labelledby="sp-details-title">
      <Scene comic={comic} /><div className="sp-details-main"><h2 id="sp-details-title">{comic ? t('THE PARTY\nBRIEF', 'წვეულების\nგეგმა') : t('YOUR\nMISSION', 'შენი\nმისია')}</h2><dl><div><dt>{t('Date', 'თარიღი')}</dt><dd>{dateLong}</dd></div><div><dt>{t('Time', 'დრო')}</dt><dd>{details.time}<small>{t('Tbilisi time', 'თბილისის დრო')}</small></dd></div><div><dt>{t('Place', 'ადგილი')}</dt><dd>{venue}</dd></div></dl><div className="sp-details-actions"><a className="sp-button" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(details.venue)}`} target="_blank" rel="noreferrer">{t('Open map', 'რუკის გახსნა')}<InvitationArtwork name="arrow-up-right" size={18} /></a><button className="sp-text-link" onClick={downloadCalendar}>{t('Save the date', 'კალენდარში შენახვა')}<InvitationArtwork name="calendar" size={18} /></button></div><SpiderPersonalize details={details} onSave={setDetails} t={t} /></div><p className="sp-hand sp-details-note">{t('Your people.\nYour city.\nYour kind of party.', 'შენი ადამიანები.\nშენი ქალაქი.\nშენი წვეულება.')}</p>
    </section>

    <section id="sp-play" className="sp-chapter sp-play" aria-labelledby="sp-play-title"><div className="sp-play-copy"><h2 id="sp-play-title">{comic ? t('WEB THE\nPARTY\nTOGETHER', 'შევკრიბოთ\nწვეულება\nერთად') : t('SWING\nINTO THE\nPARTY', 'შემოუერთდი\nწვეულების\nთამაშს')}</h2><p>{comic ? t('Good things come together. Collect six little pieces of the party.', 'კარგი მომენტები გვაერთიანებს. შეაგროვე წვეულების ექვსი ნაწილი.') : t('A little rooftop adventure before the real one. Six landings. No rush.', 'პატარა თავგადასავალი მთავარ წვეულებამდე. ექვსი დაშვება. არ იჩქარო.')}</p><a className="sp-text-link" href="#sp-lineup">{t('Skip game', 'თამაშის გამოტოვება')}<InvitationArtwork name="arrow-right" size={18} /></a></div><SpiderGames comic={comic} t={t} motion={motion} /></section>

    <section id="sp-lineup" className="sp-chapter sp-lineup" aria-labelledby="sp-lineup-title"><Scene comic={comic} /><h2 id="sp-lineup-title">{comic ? t('A SUPER\nDAY', 'სუპერ\nდღე') : t('THE PARTY\nLINEUP', 'წვეულების\nპროგრამა')}</h2><ol>{[[details.time, t('Find your crew', 'შევიკრიბოთ'), t('Arrive, settle in, catch up.', 'შევხვდეთ და მოვიკითხოთ ერთმანეთი.')], [later(1), t('Let the good times roll', 'მხიარულება იწყება'), t('Music, games & your favorite people.', 'მუსიკა, თამაშები და საყვარელი ადამიანები.')], [later(2), t('Make a wish', 'ჩაიფიქრე სურვილი'), t('Cake. Candles. Another brilliant year.', 'ტორტი. სანთლები. კიდევ ერთი კარგი წელი.')]].map(([time, title, copy], i) => <li key={i}><time>{time}</time><h3>{title}</h3><p>{copy}</p></li>)}</ol><p className="sp-hand">{t('Good friends\nmake it bigger.', 'მეგობრები\nყველაფერს ალამაზებენ.')}</p></section>

    <section id="sp-rsvp" className="sp-chapter sp-rsvp" aria-labelledby="sp-rsvp-title"><Web /><div className="sp-rsvp-copy"><h2 id="sp-rsvp-title">{comic ? t('YOU\nIN?', 'მოდი\nჩვენთან!') : t('JOIN\nTHE CREW', 'შემოუერთდი\nმეგობრებს')}</h2><p className="sp-hand">{t('Your place is waiting.', 'შენი ადგილი გელოდება.')}</p><img src={`/images/components/separated/birthday-${comic ? 'comic-cutout' : 'city-after-dark'}-spider.webp`} alt="" aria-hidden="true" loading="lazy" /></div><SpiderReply theme={theme} t={t} /></section>

    <section className="sp-chapter sp-finale" aria-labelledby="sp-finale-title"><Scene comic={comic} /><h2 id="sp-finale-title">{comic ? t('SAME FRIENDS.\nBIGGER\nADVENTURES.', 'იგივე მეგობრები.\nდიდი\nთავგადასავლები.') : t('SEE YOU\nABOVE\nTHE CITY.', 'შევხვდებით\nქალაქის\nთავზე.')}</h2><p>{name}{details.age ? ` / ${details.age}` : ''}<br />{dateShort} / {details.time}</p><a className="sp-text-link" href="#sp-rsvp">{t('Save your place', 'დაიკავე შენი ადგილი')}<InvitationArtwork name="arrow-up-right" size={20} /></a></section>
    <footer className="sp-maker"><span>{t('Made by', 'შექმნილია')}</span><Link to="/" aria-label={t('11:11 — visit the invitation maker', '11:11 — მოსაწვევის შემქმნელი')}><img src="/logos/logo-pink-star.svg" alt="11:11" width="1330" height="1112" /></Link></footer>
  </main>;
}
