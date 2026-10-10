import { captionValue } from "../../localization/captionValues.js";
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
  const t = (captionKey, values) => captionValue(captionKey, language, values);
  const [details, setDetails] = useState(initialDetails);
  const [motion, setMotion] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const date = new Date(`${details.date}T12:00:00+04:00`);
  const dateShort = new Intl.DateTimeFormat(captionValue("invitations.pages.SpiderBirthdayExperience.caption1", language), { day: '2-digit', month: 'short', timeZone: 'Asia/Tbilisi' }).format(date);
  const dateLong = new Intl.DateTimeFormat(captionValue("invitations.pages.SpiderBirthdayExperience.caption2", language), { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Tbilisi' }).format(date);
  const name = details.name === 'Dea' ? captionValue("invitations.pages.SpiderBirthdayExperience.caption3", language) : details.name;
  const venue = details.venue === 'Tbilisi' ? captionValue("invitations.pages.SpiderBirthdayExperience.caption4", language) : details.venue;
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
    const file = createCalendarFile(event, { title: `${name} — ${captionValue("invitations.pages.SpiderBirthdayExperience.caption5", language)}`, location: details.venue, url: window.location.href, uid: `spider-${theme}-${details.date}@11-11` });
    const url = URL.createObjectURL(new Blob([file], { type: 'text/calendar;charset=utf-8' }));
    const anchor = document.createElement('a'); anchor.href = url; anchor.download = `${theme}-birthday.ics`; anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  return <main className={`sp-experience ${comic ? 'sp-comic' : 'sp-midnight'}`} lang={language} data-motion={motion ? 'on' : 'off'}>
    <a className="sp-skip" href="#sp-rsvp">{captionValue("invitations.pages.SpiderBirthdayExperience.caption6", language)}</a>
    <RibbonSketchToolbar motion={motion} onMotion={() => setMotion(value => !value)} playHref="#sp-play" actionHref="#sp-rsvp" actionLabel="RSVP" />
    <section className="sp-chapter sp-hero" aria-labelledby="sp-title">
      <Scene comic={comic} priority /><Web />
      <div className="sp-hero-copy"><h1 id="sp-title">{comic ? captionValue("invitations.pages.SpiderBirthdayExperience.caption7", language) : captionValue("invitations.pages.SpiderBirthdayExperience.caption8", language)}</h1><div className="sp-host"><span>{name}</span><span>{details.age ? captionValue("ui.invitations.pages.SpiderBirthdayExperience.turns", language, { value1: details.age }) : captionValue("invitations.pages.SpiderBirthdayExperience.caption9", language)}</span></div><p className="sp-hero-date">{dateShort} {date.getFullYear()}<br />{details.time} / {venue}</p></div>
      {details.age && <span className="sp-hero-age" aria-hidden="true">{details.age}</span>}
      <div className="sp-hanging-spider"><img src={`/images/components/separated/birthday-${comic ? 'retro-sport' : 'city-after-dark'}-spider.webp`} alt="" aria-hidden="true" /></div>
      <p className="sp-hand sp-hero-note">{captionValue("invitations.pages.SpiderBirthdayExperience.caption10", language)}</p>
      <a className="sp-scroll" href="#sp-details">{captionValue("invitations.pages.SpiderBirthdayExperience.caption11", language)}<InvitationArtwork name="arrow-down" size={22} /></a>
    </section>

    <section id="sp-details" className="sp-chapter sp-details" aria-labelledby="sp-details-title">
      <Scene comic={comic} /><div className="sp-details-main"><h2 id="sp-details-title">{comic ? captionValue("invitations.pages.SpiderBirthdayExperience.caption12", language) : captionValue("invitations.pages.SpiderBirthdayExperience.caption13", language)}</h2><dl><div><dt>{captionValue("invitations.pages.SpiderBirthdayExperience.caption14", language)}</dt><dd>{dateLong}</dd></div><div><dt>{captionValue("invitations.pages.SpiderBirthdayExperience.caption15", language)}</dt><dd>{details.time}<small>{captionValue("invitations.pages.SpiderBirthdayExperience.caption16", language)}</small></dd></div><div><dt>{captionValue("invitations.pages.SpiderBirthdayExperience.caption17", language)}</dt><dd>{venue}</dd></div></dl><div className="sp-details-actions"><a className="sp-button" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(details.venue)}`} target="_blank" rel="noreferrer">{captionValue("invitations.pages.SpiderBirthdayExperience.caption18", language)}<InvitationArtwork name="arrow-up-right" size={18} /></a><button className="sp-text-link" onClick={downloadCalendar}>{captionValue("invitations.pages.SpiderBirthdayExperience.caption19", language)}<InvitationArtwork name="calendar" size={18} /></button></div><SpiderPersonalize details={details} onSave={setDetails} t={t} /></div><p className="sp-hand sp-details-note">{captionValue("invitations.pages.SpiderBirthdayExperience.caption20", language)}</p>
    </section>

    <section id="sp-play" className="sp-chapter sp-play" aria-labelledby="sp-play-title"><div className="sp-play-copy"><h2 id="sp-play-title">{comic ? captionValue("invitations.pages.SpiderBirthdayExperience.caption21", language) : captionValue("invitations.pages.SpiderBirthdayExperience.caption22", language)}</h2><p>{comic ? captionValue("invitations.pages.SpiderBirthdayExperience.caption23", language) : captionValue("invitations.pages.SpiderBirthdayExperience.caption24", language)}</p><a className="sp-text-link" href="#sp-lineup">{captionValue("invitations.pages.SpiderBirthdayExperience.caption25", language)}<InvitationArtwork name="arrow-right" size={18} /></a></div><SpiderGames comic={comic} t={t} motion={motion} /></section>

    <section id="sp-lineup" className="sp-chapter sp-lineup" aria-labelledby="sp-lineup-title"><Scene comic={comic} /><h2 id="sp-lineup-title">{comic ? captionValue("invitations.pages.SpiderBirthdayExperience.caption26", language) : captionValue("invitations.pages.SpiderBirthdayExperience.caption27", language)}</h2><ol>{[[details.time, captionValue("invitations.pages.SpiderBirthdayExperience.caption28", language), captionValue("invitations.pages.SpiderBirthdayExperience.caption29", language)], [later(1), captionValue("invitations.pages.SpiderBirthdayExperience.caption30", language), captionValue("invitations.pages.SpiderBirthdayExperience.caption31", language)], [later(2), captionValue("invitations.pages.SpiderBirthdayExperience.caption32", language), captionValue("invitations.pages.SpiderBirthdayExperience.caption33", language)]].map(([time, title, copy], i) => <li key={i}><time>{time}</time><h3>{title}</h3><p>{copy}</p></li>)}</ol><p className="sp-hand">{captionValue("invitations.pages.SpiderBirthdayExperience.caption34", language)}</p></section>

    <section id="sp-rsvp" className="sp-chapter sp-rsvp" aria-labelledby="sp-rsvp-title"><Web /><div className="sp-rsvp-copy"><h2 id="sp-rsvp-title">{comic ? captionValue("invitations.pages.SpiderBirthdayExperience.caption35", language) : captionValue("invitations.pages.SpiderBirthdayExperience.caption36", language)}</h2><p className="sp-hand">{captionValue("invitations.pages.SpiderBirthdayExperience.caption37", language)}</p><img src={`/images/components/separated/birthday-${comic ? 'comic-cutout' : 'city-after-dark'}-spider.webp`} alt="" aria-hidden="true" loading="lazy" /></div><SpiderReply theme={theme} t={t} /></section>

    <section className="sp-chapter sp-finale" aria-labelledby="sp-finale-title"><Scene comic={comic} /><h2 id="sp-finale-title">{comic ? captionValue("invitations.pages.SpiderBirthdayExperience.caption38", language) : captionValue("invitations.pages.SpiderBirthdayExperience.caption39", language)}</h2><p>{name}{details.age ? ` / ${details.age}` : ''}<br />{dateShort} / {details.time}</p><a className="sp-text-link" href="#sp-rsvp">{captionValue("invitations.pages.SpiderBirthdayExperience.caption40", language)}<InvitationArtwork name="arrow-up-right" size={20} /></a></section>
    <footer className="sp-maker"><span>{captionValue("invitations.pages.SpiderBirthdayExperience.caption41", language)}</span><Link to="/" aria-label={captionValue("invitations.pages.SpiderBirthdayExperience.caption42", language)}><img src="/logos/logo-pink-star.svg" alt="11:11" width="1330" height="1112" /></Link></footer>
  </main>;
}
