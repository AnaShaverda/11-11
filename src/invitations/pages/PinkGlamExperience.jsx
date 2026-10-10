import { captionValue } from "../../localization/captionValues.js";
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../localization/LanguageContext.jsx';
import RibbonSketchToolbar from '../ribbon-sketch/RibbonSketchToolbar.jsx';
import InvitationArtwork from '../components/InvitationArtwork.jsx';
import { AfterpartySongs, AfterpartyRSVP } from '../pink-glam/AfterpartyForms.jsx';
import useAfterpartyReveal from '../pink-glam/useAfterpartyReveal.js';
import '../ribbon-sketch/fonts.css';
import '../pink-glam/pink-afterparty.css';

const assets = '/images/birthday/pink-glam/afterparty/';
export default function PinkGlamExperience() {
  const { language } = useLanguage();
  const t = (captionKey, values) => captionValue(captionKey, language, values);
  const root = useRef(null);
  useAfterpartyReveal(root);
  return <main ref={root} className="ap-experience" lang={language}>
    <a className="ap-skip" href="#ap-rsvp">{captionValue("invitations.pages.PinkGlamExperience.caption1", language)}</a>
    <RibbonSketchToolbar showMotion={false} actionHref="#ap-rsvp" actionLabel="RSVP" />
    <section className="ap-hero" aria-labelledby="ap-title">
      <img className="ap-hero-image" src={`${assets}hero.webp`} alt="" aria-hidden="true" fetchPriority="high" />
      <div className="ap-hero-copy"><h1 id="ap-title">{captionValue("invitations.pages.PinkGlamExperience.caption2", language)}</h1><p className="ap-event">{captionValue("invitations.pages.PinkGlamExperience.caption3", language)}<span>{captionValue("invitations.pages.PinkGlamExperience.caption4", language)}</span></p></div>
      <div className="ap-hero-date"><p>{captionValue("invitations.pages.PinkGlamExperience.caption5", language)}<br />19:00<br />{captionValue("invitations.pages.PinkGlamExperience.caption6", language)}</p><span className="ap-micro">{captionValue("invitations.pages.PinkGlamExperience.caption7", language)}</span><a href="#ap-toast" className="ap-scroll">{captionValue("invitations.pages.PinkGlamExperience.caption8", language)}<InvitationArtwork name="arrow-down" size={22} /></a></div>
    </section>
    <section id="ap-toast" className="ap-toast" aria-labelledby="ap-toast-title">
      <img src={`${assets}toast.webp`} alt="" aria-hidden="true" loading="lazy" />
      <div className="ap-toast-copy" data-afterparty-reveal><h2 id="ap-toast-title">{captionValue("invitations.pages.PinkGlamExperience.caption9", language)}<em>{captionValue("invitations.pages.PinkGlamExperience.caption10", language)}</em>{captionValue("invitations.pages.PinkGlamExperience.caption11", language)}</h2><p className="ap-micro">{captionValue("invitations.pages.PinkGlamExperience.caption12", language)}</p></div>
      <p className="ap-hand ap-toast-hand" data-afterparty-reveal>{captionValue("invitations.pages.PinkGlamExperience.caption13", language)}<InvitationArtwork name="heart" size={32} /></p>
    </section>
    <section className="ap-lineup" aria-labelledby="ap-lineup-title"><div className="ap-lineup-copy" data-afterparty-reveal><p className="ap-micro">{captionValue("invitations.pages.PinkGlamExperience.caption14", language)}</p><h2 id="ap-lineup-title">{captionValue("invitations.pages.PinkGlamExperience.caption15", language)}</h2></div><ol data-afterparty-reveal>{[['19:00',captionValue("invitations.pages.PinkGlamExperience.caption16", language)],['20:00',captionValue("invitations.pages.PinkGlamExperience.caption17", language)],['21:30',captionValue("invitations.pages.PinkGlamExperience.caption18", language)],['23:00',captionValue("invitations.pages.PinkGlamExperience.caption19", language)],[captionValue("invitations.pages.PinkGlamExperience.caption20", language),captionValue("invitations.pages.PinkGlamExperience.caption21", language)]].map(([time,label], i)=><li key={time} style={{ '--ap-stagger': i }}><time>{time}</time><span>{label}</span></li>)}</ol><img src={`${assets}lineup.webp`} alt={captionValue("invitations.pages.PinkGlamExperience.caption22", language)} loading="lazy" /></section>
    <section id="ap-songs" className="ap-songs" aria-labelledby="ap-songs-title"><div className="ap-songs-copy" data-afterparty-reveal><h2 id="ap-songs-title">{captionValue("invitations.pages.PinkGlamExperience.caption23", language)}</h2><p className="ap-micro">{captionValue("invitations.pages.PinkGlamExperience.caption24", language)}</p></div><img className="ap-record" src={`${assets}record.webp`} alt={captionValue("invitations.pages.PinkGlamExperience.caption25", language)} loading="lazy" /><div className="ap-song-form" data-afterparty-reveal><AfterpartySongs t={t} /><p className="ap-micro">{captionValue("invitations.pages.PinkGlamExperience.caption26", language)}</p></div></section>
    <section className="ap-booth" aria-labelledby="ap-booth-title"><img src={`${assets}booth.webp`} alt={captionValue("invitations.pages.PinkGlamExperience.caption27", language)} loading="lazy" /><div className="ap-booth-copy" data-afterparty-reveal><h2 id="ap-booth-title">{captionValue("invitations.pages.PinkGlamExperience.caption28", language)}</h2><p className="ap-micro">{captionValue("invitations.pages.PinkGlamExperience.caption29", language)}</p><p className="ap-hand">{captionValue("invitations.pages.PinkGlamExperience.caption30", language)}<InvitationArtwork name="heart" size={32} /></p></div></section>
    <section id="ap-rsvp" className="ap-rsvp" aria-labelledby="ap-rsvp-title"><img className="ap-rsvp-background" src={`${assets}hero.webp`} alt="" aria-hidden="true" loading="lazy" /><div className="ap-postcard" aria-hidden="true"><InvitationArtwork name="heart-filled" size={35} /><p className="ap-hand">{captionValue("invitations.pages.PinkGlamExperience.caption31", language)}</p></div><h2 id="ap-rsvp-title" data-afterparty-reveal>RSVP</h2><div className="ap-rsvp-form" data-afterparty-reveal><AfterpartyRSVP t={t} /><p className="ap-micro">{captionValue("invitations.pages.PinkGlamExperience.caption32", language)}</p></div></section>
    <footer className="ap-footer"><div className="ap-maker"><span>{captionValue("invitations.pages.PinkGlamExperience.caption33", language)}</span><Link to="/" aria-label={captionValue("invitations.pages.PinkGlamExperience.caption34", language)}><img src="/logos/logo-pink-star.svg" alt="11:11" width="1330" height="1112" /></Link></div><p className="ap-micro">{captionValue("invitations.pages.PinkGlamExperience.caption35", language)}</p></footer>
  </main>;
}
