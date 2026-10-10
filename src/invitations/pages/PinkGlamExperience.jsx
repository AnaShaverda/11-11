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
  const t = (en, ka) => language === 'ka' ? ka : en;
  const root = useRef(null);
  useAfterpartyReveal(root);
  return <main ref={root} className="ap-experience" lang={language}>
    <a className="ap-skip" href="#ap-rsvp">{t('Skip to RSVP', 'პასუხზე გადასვლა')}</a>
    <RibbonSketchToolbar showMotion={false} actionHref="#ap-rsvp" actionLabel="RSVP" />
    <section className="ap-hero" aria-labelledby="ap-title">
      <img className="ap-hero-image" src={`${assets}hero.webp`} alt="" aria-hidden="true" fetchPriority="high" />
      <div className="ap-hero-copy"><h1 id="ap-title">{t('Pink\nlooks\ngood\non us.', 'ვარდისფერი\nძალიან\nგვიხდება.')}</h1><p className="ap-event">{t('Dea’s Pink Night', 'დეას ვარდისფერი საღამო')}<span>{t('Birthday party', 'დაბადების დღე')}</span></p></div>
      <div className="ap-hero-date"><p>{t('02 NOV', '02 ნოემბერი')}<br />19:00<br />{t('BATUMI', 'ბათუმი')}</p><span className="ap-micro">{t('Same girls.\nBrighter nights.', 'იგივე მეგობრები.\nნათელი ღამეები.')}</span><a href="#ap-toast" className="ap-scroll">{t('Scroll\nfor more', 'ჩამოყევი\nსაღამოს')}<InvitationArtwork name="arrow-down" size={22} /></a></div>
    </section>
    <section id="ap-toast" className="ap-toast" aria-labelledby="ap-toast-title">
      <img src={`${assets}toast.webp`} alt="" aria-hidden="true" loading="lazy" />
      <div className="ap-toast-copy" data-afterparty-reveal><h2 id="ap-toast-title">{t('Good\nfriends.', 'კარგი\nმეგობრები.')}<em>{t('Bigger', 'დიდი')}</em>{t('pours.', 'სურვილები.')}</h2><p className="ap-micro">{t('Same energy.\nA brighter year.', 'იგივე ხალისი.\nუფრო ნათელი წელი.')}</p></div>
      <p className="ap-hand ap-toast-hand" data-afterparty-reveal>{t('Dea’s\nPink Night', 'დეას\nვარდისფერი საღამო')}<InvitationArtwork name="heart" size={32} /></p>
    </section>
    <section className="ap-lineup" aria-labelledby="ap-lineup-title"><div className="ap-lineup-copy" data-afterparty-reveal><p className="ap-micro">{t('The evening', 'საღამოს გეგმა')}</p><h2 id="ap-lineup-title">{t('Lineup', 'საღამო')}</h2></div><ol data-afterparty-reveal>{[['19:00',t('Arrivals & bubbles', 'შეხვედრა და კოქტეილები')],['20:00',t('Dinner together', 'ვახშამი ერთად')],['21:30',t('Dance floor opens', 'ცეკვა იწყება')],['23:00',t('Surprise moment', 'სიურპრიზის დრო')],[t('LATE','გვიან'),t('Pink afterparty', 'ვარდისფერი წვეულება')]].map(([time,label], i)=><li key={time} style={{ '--ap-stagger': i }}><time>{time}</time><span>{label}</span></li>)}</ol><img src={`${assets}lineup.webp`} alt={t('Pink party editorial with a cherry', 'ვარდისფერი წვეულების კადრი ალუბლით')} loading="lazy" /></section>
    <section id="ap-songs" className="ap-songs" aria-labelledby="ap-songs-title"><div className="ap-songs-copy" data-afterparty-reveal><h2 id="ap-songs-title">{t('Pick\nthe next\nsong', 'აირჩიე\nშემდეგი\nსიმღერა')}</h2><p className="ap-micro">{t('Help shape\nthe playlist', 'შევადგინოთ\nსიმღერების სია')}</p></div><img className="ap-record" src={`${assets}record.webp`} alt={t('Pink vinyl record player', 'ვარდისფერი ფირფიტების საკრავი')} loading="lazy" /><div className="ap-song-form" data-afterparty-reveal><AfterpartySongs t={t} /><p className="ap-micro">{t('Good music.\nBetter company.', 'კარგი მუსიკა.\nსაუკეთესო მეგობრები.')}</p></div></section>
    <section className="ap-booth" aria-labelledby="ap-booth-title"><img src={`${assets}booth.webp`} alt={t('Friends smiling together in party photo-booth pictures', 'მეგობრები იღიმიან წვეულების ფოტოკაბინის კადრებში')} loading="lazy" /><div className="ap-booth-copy" data-afterparty-reveal><h2 id="ap-booth-title">{t('Photo\nbooth', 'ჩვენი\nფოტოები')}</h2><p className="ap-micro">{t('Same faces.\nDifferent stories.', 'იგივე სახეები.\nახალი ამბები.')}</p><p className="ap-hand">{t('Girls\nForever', 'მეგობრები\nსამუდამოდ')}<InvitationArtwork name="heart" size={32} /></p></div></section>
    <section id="ap-rsvp" className="ap-rsvp" aria-labelledby="ap-rsvp-title"><img className="ap-rsvp-background" src={`${assets}hero.webp`} alt="" aria-hidden="true" loading="lazy" /><div className="ap-postcard" aria-hidden="true"><InvitationArtwork name="heart-filled" size={35} /><p className="ap-hand">{t('See you\nin Batumi', 'შევხვდებით\nბათუმში')}</p></div><h2 id="ap-rsvp-title" data-afterparty-reveal>RSVP</h2><div className="ap-rsvp-form" data-afterparty-reveal><AfterpartyRSVP t={t} /><p className="ap-micro">{t('Pink people only', 'ვარდისფერი განწყობით')}</p></div></section>
    <footer className="ap-footer"><div className="ap-maker"><span>{t('Made by', 'შექმნილია')}</span><Link to="/" aria-label={t('11:11 — visit the invitation maker', '11:11 — მოსაწვევის შემქმნელი')}><img src="/logos/logo-pink-star.svg" alt="11:11" width="1330" height="1112" /></Link></div><p className="ap-micro">{t('Good friends.\nBrighter tomorrows.', 'კარგი მეგობრები.\nნათელი ხვალინდელი დღე.')}</p></footer>
  </main>;
}
