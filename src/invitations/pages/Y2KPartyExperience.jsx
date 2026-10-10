import RibbonSketchToolbar from '../ribbon-sketch/RibbonSketchToolbar.jsx';
import SnakeGame from '../y2k/SnakeGame.jsx';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../localization/LanguageContext.jsx';
import InvitationArtwork from '../components/InvitationArtwork.jsx';
import { CDCatch } from '../y2k/Y2KGames.jsx';
import { RSVPForm, Soundtrack } from '../y2k/Y2KForms.jsx';
import useY2KMotion from '../y2k/useY2KMotion.js';
import '../ribbon-sketch/fonts.css';
import '../../styles/y2k-experience.css';

const assets = '/images/birthday/y2k-experience/';
const memories = ['/images/bridal/party-polaroids/sky-toast.webp', '/images/bridal/party-polaroids/champagne-spray.webp', '/images/bridal/party-polaroids/shadow-toast.webp'];

function Window({ title, icon = 'image', className = '', children }) {
  return <div className={`y2k-window ${className}`}><div className="y2k-window-bar"><span><InvitationArtwork name={icon} size={16} />{title}</span><span className="y2k-window-decoration" aria-hidden="true"><InvitationArtwork name="minus" size={12} /><InvitationArtwork name="image" size={12} /><InvitationArtwork name="close" size={12} /></span></div>{children}</div>;
}

function PartyDetails({ t, sleepover }) {
  const details = [
    ['calendar', t('Date', 'თარიღი'), t('24 October 2027', '24 ოქტომბერი 2027'), t('Save the date', 'ჩაინიშნე თარიღი')],
    ['clock', t('Time', 'დრო'), '19:00', t('Until the last song', 'ბოლო სიმღერამდე')],
    ['map-pin', t('Location', 'ადგილი'), t('Tbilisi', 'თბილისი'), t('Venue to be announced', 'მისამართი მოგვიანებით')],
    ['sparkle', t('Dress code', 'დრესკოდი'), sleepover ? t('Comfy & cute', 'მყუდრო და ლამაზი') : t('Y2K casual', '2000-იანების სტილი'), sleepover ? t('PJs very welcome', 'პიჟამაც მშვენიერია') : t('A little retro. A lot of you.', 'ცოტა რეტრო. ბევრი შენ.')],
  ];
  return <dl className="y2k-details-list">{details.map(([icon, label, value, note]) => <div key={icon} data-y2k-reveal><InvitationArtwork name={icon} size={29} /><dt className="y2k-mono">{label}</dt><dd>{value}<small>{note}</small></dd></div>)}</dl>;
}

export default function Y2KPartyExperience({ theme = 'arcade' }) {
  const { language } = useLanguage();
  const t = (en, ka) => language === 'ka' ? ka : en;
  const sleepover = theme === 'sleepover';
  const root = useRef(null);
  const [motion, setMotion] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  useY2KMotion(root, theme, motion);
  useEffect(() => { const media = window.matchMedia('(prefers-reduced-motion: reduce)'); const change = () => setMotion(!media.matches); media.addEventListener('change', change); return () => media.removeEventListener('change', change); }, []);

  return <main ref={root} lang={language} className={`y2k-experience y2k-${theme} ${motion ? 'y2k-motion' : ''}`}>
    <a className="y2k-skip" href="#y2k-rsvp">{t('Skip to RSVP', 'პასუხზე გადასვლა')}</a>
    <RibbonSketchToolbar showMotion={false} playHref="#y2k-play" />

    {sleepover ? <section className="y2k-hero y2k-sleep-hero" aria-labelledby="y2k-title"><div className="y2k-wrap"><div className="y2k-sleep-heading"><p className="y2k-mono">{t('YOU’RE INVITED TO', 'მოწვეული ხარ')}</p><h1 id="y2k-title">DESKTOP<br className="y2k-mobile-break" /> SLEEPOVER</h1><p className="y2k-hand">{t('Same friends. Different dreams.', 'იგივე მეგობრები. ახალი ოცნებები.')}<InvitationArtwork name="heart" size={23} /></p></div><div className="y2k-sleep-desktop"><Window title="invitation.jpg" className="y2k-sleep-photo"><img src={`${assets}sleepover-satin.png`} alt={t('Pink flip phone, iridescent CD and pearl charm on satin', 'ვარდისფერი ტელეფონი, მბზინავი CD და მარგალიტები ატლასზე')} width="1536" height="1024" fetchPriority="high" /><div className="y2k-photo-caption"><p className="y2k-hand">{t('Good music. Better company.', 'კარგი მუსიკა. საუკეთესო ადამიანები.')}</p><p className="y2k-mono">24.10.2027 / 19:00 / {t('TBILISI', 'თბილისი')}</p></div></Window><Window title={t('New message', 'ახალი შეტყობინება')} icon="mail" className="y2k-message"><div className="y2k-message-envelope"><p><span>From:</span>{t('Aniko', 'მარი')}</p><p><span>To:</span>{t('My favorite people', 'ჩემი საყვარელი ადამიანები')}</p></div><div className="y2k-message-content"><p>{t('You’re invited to my birthday sleepover!', 'მოწვეული ხარ ჩემს დაბადების დღეზე!')}</p><p>{t('Movies. Music. Snacks. Games. Same friends, a whole new chapter.', 'ფილმები. მუსიკა. გემრიელობები. თამაშები. იგივე მეგობრები და ახალი ამბები.')}</p><p className="y2k-hand">{t('Can’t wait to see you.', 'ერთი სული მაქვს, გნახო.')}<InvitationArtwork name="heart" size={20} /></p><a className="y2k-button" href="#y2k-rsvp">{t('Count me in', 'მოვდივარ')}<InvitationArtwork name="arrow-right" size={18} /></a></div></Window></div><a className="y2k-scroll-note y2k-mono" href="#y2k-details">{t('SCROLL FOR THE GOOD STUFF', 'ქვემოთ კარგი ამბებია')}<InvitationArtwork name="arrow-down" size={18} /></a></div></section>
      : <section className="y2k-hero y2k-arcade-hero" aria-labelledby="y2k-title"><div className="y2k-wrap y2k-hero-grid"><div className="y2k-hero-copy"><p className="y2k-mono">{t('SAME FRIENDS. NEW HIGH SCORES.', 'იგივე მეგობრები. ახალი რეკორდები.')}</p><h1 id="y2k-title"><span>Y2K</span><span>PARTY</span></h1><p className="y2k-hero-invited">{t('You are invited', 'მოწვეული ხარ')}</p><div className="y2k-hero-actions"><a href="#y2k-play" className="y2k-button y2k-button-outline">{t('Insert fun', 'ვითამაშოთ')}<InvitationArtwork name="play" size={18} /></a><a href="#y2k-rsvp" className="y2k-button">{t('RSVP now', 'მოვდივარ')}<InvitationArtwork name="arrow-up-right" size={18} /></a></div></div><div className="y2k-hero-art"><div className="y2k-case"><img src={`${assets}invitation-case.png`} alt={t('Purple jewel case invitation with a pixel birthday cake', 'იისფერი მოსაწვევი პიქსელური დაბადების დღის ტორტით')} width="1632" height="976" fetchPriority="high" /><div className="y2k-case-copy"><p className="y2k-hand">{t('Aniko’s', 'მარის')}</p><span className="y2k-mono">BIRTHDAY<br />MIX / VOL. 01</span><strong>24 OCT</strong><span className="y2k-mono">19:00 / {t('TBILISI', 'თბილისი')}</span></div></div><div className="y2k-hero-art-footer"><span className="y2k-mono">{t('ANOTHER YEAR. MORE TO PLAY.', 'კიდევ ერთი წელი. მეტი თამაში.')}</span><p className="y2k-hand">{t('Good friends. Brighter days.', 'კარგი მეგობრები. ნათელი დღეები.')}</p></div></div></div><a className="y2k-scroll-note y2k-mono" href="#y2k-details">{t('SCROLL TO START', 'დასაწყებად ჩამოსქროლე')}<InvitationArtwork name="arrow-down" size={18} /></a></section>}

    <section id="y2k-details" className="y2k-section y2k-details"><div className="y2k-wrap"><div className="y2k-section-heading" data-y2k-reveal><h2>{t('The party plan', 'წვეულების გეგმა')}</h2><p className="y2k-mono">{t('ALL THE IMPORTANT DETAILS', 'ყველა საჭირო დეტალი')}</p></div>{sleepover ? <Window title="party-plans.txt" icon="calendar"><PartyDetails t={t} sleepover /></Window> : <PartyDetails t={t} />}<p className="y2k-details-foot y2k-hand" data-y2k-reveal>{sleepover ? t('PJs, snacks & our favorite people.', 'პიჟამები, გემრიელობები და საყვარელი ადამიანები.') : t('Think fun. Think bright. Think you.', 'მეტი ფერი. მეტი სილაღე. მეტი შენ.')}<InvitationArtwork name={sleepover ? 'heart' : 'star'} size={26} /></p></div></section>

    <section id="y2k-play" className="y2k-section y2k-play-section"><div className="y2k-wrap y2k-play-layout"><div className="y2k-play-copy" data-y2k-reveal><p className="y2k-mono">{sleepover ? 'A LITTLE NOSTALGIA' : 'MINI GAMES. MAX GOOD TIMES.'}</p><h2>{sleepover ? t('Just one more round.', 'კიდევ ერთი თამაში.') : t('Press\nplay.', 'დააჭირე\nდაწყებას.')}</h2><p>{sleepover ? t('A little Snake nostalgia. Collect the dots and keep growing.', 'ნოსტალგიური გველი. შეაგროვე წერტილები და გაიზარდე.') : t('Catch as many CDs as you can in 30 seconds. Your childhood called.', 'დაიჭირე რაც შეიძლება მეტი CD 30 წამში. ბავშვობა გეძახის.')}</p><a className="y2k-game-skip" href="#y2k-music">{t('Here for the music?', 'მუსიკისთვის მოხვედი?')}<InvitationArtwork name="arrow-right" size={18} /></a></div><div data-y2k-reveal className="y2k-play-stage" key={theme}>{sleepover ? <Window title="snake.exe" icon="play"><SnakeGame t={t} /></Window> : <CDCatch t={t} />}</div></div></section>

    <section id="y2k-music" className="y2k-section y2k-music-section"><div className="y2k-wrap"><div className="y2k-section-heading" data-y2k-reveal><h2>{t('Soundtrack\nof the night', 'საღამოს\nმუსიკა')}</h2><p className="y2k-hand">{t('Same songs. Different stories.', 'იგივე სიმღერები. ახალი ამბები.')}<InvitationArtwork name="heart" size={24} /></p></div><div data-y2k-reveal>{sleepover ? <Window title="now-playing.mp3" icon="play"><Soundtrack t={t} eventId={sleepover ? "desktop-sleepover" : "y2k"} /></Window> : <Soundtrack t={t} eventId={sleepover ? "desktop-sleepover" : "y2k"} />}</div></div></section>

    {sleepover && <section className="y2k-section y2k-memories"><div className="y2k-wrap"><div className="y2k-section-heading" data-y2k-reveal><h2>{t('Collect beautiful\nmoments.', 'შევაგროვოთ\nლამაზი მომენტები.')}</h2><p className="y2k-mono">{t('GOOD TIMES, SAVED FOREVER', 'კარგი დრო, სამუდამოდ')}</p></div><div className="y2k-polaroids">{memories.map((src, i) => <figure key={src} data-y2k-reveal style={{ '--photo-angle': `${[-5, 4, -3][i]}deg`, '--reveal-delay': `${i * 100}ms` }}><img src={src} alt={[t('Friends raising a toast', 'მეგობრები სადღეგრძელოს ამბობენ'), t('Celebrating together', 'ერთად აღვნიშნავთ'), t('A toast in the sunshine', 'სადღეგრძელო მზიან დღეს')][i]} loading="lazy" width="600" height="700" /><figcaption className="y2k-hand">{[t('Same girls', 'იგივე მეგობრები'), t('Bigger dreams', 'დიდი ოცნებები'), t('Good times', 'კარგი დრო')][i]}</figcaption></figure>)}</div></div></section>}

    <section id="y2k-rsvp" className="y2k-section y2k-rsvp-section"><div className="y2k-wrap y2k-rsvp-layout"><div className="y2k-rsvp-copy" data-y2k-reveal><h2>RSVP</h2><p className="y2k-mono">{t('LET’S MAKE IT OFFICIAL', 'მოდი, დავგეგმოთ')}</p><p className="y2k-hand">{t('Your place is waiting.', 'შენი ადგილი გელოდება.')}<InvitationArtwork name="heart" size={30} /></p></div><div data-y2k-reveal>{sleepover ? <Window title="rsvp.message" icon="mail"><RSVPForm t={t} eventId={sleepover ? "desktop-sleepover" : "y2k"} /></Window> : <RSVPForm t={t} eventId={sleepover ? "desktop-sleepover" : "y2k"} />}</div></div></section>

    <div className="y2k-footer"><div className="y2k-wrap"><div className="y2k-footer-top" data-y2k-reveal><h2>{sleepover ? t('Same friends.\nDifferent dreams.', 'იგივე მეგობრები.\nახალი ოცნებები.') : t('See you on\nthe dance floor.', 'საცეკვაო მოედანზე\nშევხვდებით.')}</h2><InvitationArtwork name={sleepover ? 'heart' : 'star'} size={72} /></div></div></div><footer className="y2k-maker-credit"><span>{t('Made by', 'შექმნილია')}</span><Link to="/" aria-label={t('11:11 — visit the invitation maker', '11:11 — მოსაწვევის შემქმნელი')}><img src="/logos/logo-pink-star.svg" alt="11:11" width="1330" height="1112" /></Link></footer>
  </main>;
}
