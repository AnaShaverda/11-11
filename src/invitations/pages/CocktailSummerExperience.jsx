import { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../localization/LanguageContext.jsx";
import { getDesignFont } from "../data/cardTypography.js";
import { selectedBridalAssets } from "../data/selectedBridalDesigns.js";
import IceCatchGame from "../components/IceCatchGame.jsx";
import BridalPhotoCollage from "../components/BridalPhotoCollage.jsx";
import InvitationArtwork from "../components/InvitationArtwork.jsx";
import InvitationMotif from "../components/InvitationMotif.jsx";
import "../../styles/cocktail-summer-experience.css";

const palettes = { ivory: "#faf4e8", butter: "#fff0b7", blush: "#f5c4cd", lilac: "#e7d4ed" };
export default function CocktailSummerExperience({ theme }) {
  const { language, setLanguage } = useLanguage();
  const ka = language === "ka";
  const assets = selectedBridalAssets[`bridal-${theme}`];
  const art = assets.selectedBridal;
  const [fizz, setFizz] = useState(0);
  const [mood, setMood] = useState(0);
  const [reply, setReply] = useState(null);
  const [saved, setSaved] = useState(false);
  const moods = ka ? ["მზიანი განწყობა", "საცეკვაო განწყობა", "სიგრილის განწყობა"] : ["Sunshine mode", "Dancing mode", "Chill mode"];
  const jump = id => document.getElementById(id)?.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  return <main className={`summer-party summer-${theme}`} lang={language} style={{...getDesignFont(art.font,language).style,"--summer-paper":palettes[art.paper],"--summer-ink":art.ink,"--summer-accent":art.accent,"--summer-texture":`url('${assets.coverImage}')`}}>
    <section className="summer-hero" aria-label={ka ? "წვეულების მოსაწვევი" : "Party invitation"}>
      <nav><Link to="/invitations" aria-label={ka ? "მოსაწვევებზე დაბრუნება" : "Back to invitations"}><InvitationArtwork name="arrow-left" size={18} /> 11:11</Link><button onClick={()=>setLanguage(ka ? "en" : "ka")}>{ka ? "EN" : "KA"}</button></nav>
      <h1>{ka ? art.kaHeadline : art.headline}</h1>
      <p className="summer-host">{ka ? "პატარძლისთვის" : "FOR THE BRIDE"}<br/>{ka ? "მარიამი" : "Mariam"}</p>
      <button className={`summer-hero-glass ${fizz ? "is-fizzy" : ""}`} key={fizz} onClick={()=>setFizz(v=>v+1)} aria-label={ka ? "შეეხე ჭიქას და ააშუშხუნე" : "Tap the glass to make it fizz"}>
        <img src={art.artwork} alt={ka ? art.kaName : art.name}/>{fizz > 0 && Array.from({length:12},(_,i)=><span className="summer-bubble" key={i} style={{"--bubble-x":`${20+(i*17)%60}%`,"--bubble-delay":`${i*.06}s`}}/>)}
      </button>
      <p className="summer-tap">{ka ? "შეეხე ჭიქას — ააშუშხუნე!" : "Tap your glass. Make it fizz!"}</p>
      <p className="summer-date">{ka ? "12 სექტემბერი 2027 · 20:00 · თბილისი" : "12 SEPTEMBER 2027 · 20:00 · TBILISI"}</p>
      <div className="summer-actions"><button onClick={()=>jump('summer-game')}>{ka ? "დაიჭირე ყინული" : "Catch some ice"} <InvitationArtwork name="arrow-down" size={18} /></button><button onClick={()=>jump('summer-rsvp')}>RSVP <InvitationArtwork name="arrow-up-right" size={18} /></button></div>
    </section>
    <section className="summer-details"><h2>{ka ? "შენი გოგოები.\nშენი ზაფხული." : "Your girls.\nYour summer."}</h2><div><p>{ka ? "ერთი საღამო, ბევრი სიცილი და ცოტაოდენი საზაფხულო მაგია. ერთად ვიზეიმოთ მარიამის ახალი თავგადასავალი." : "One evening, endless laughter, and a little summer magic. Let’s celebrate Mariam’s next adventure together."}</p><dl><div><dt>{ka ? "როდის" : "When"}</dt><dd>{ka ? "12 სექტემბერი · 20:00" : "12 September · 20:00"}</dd></div><div><dt>{ka ? "სად" : "Where"}</dt><dd>{ka ? "თბილისი · მისამართს მასპინძელი გაგიზიარებს" : "Tbilisi · address from your host"}</dd></div><div><dt>{ka ? "ჩაიცვი" : "Wear"}</dt><dd>{ka ? "შენი საყვარელი საზაფხულო ფერი" : "Your favorite summer color"}</dd></div></dl></div></section>
    <BridalPhotoCollage language={language} accentArt={art.artwork} />
    <section className="summer-play-section" id="summer-game"><header><h2>{ka ? "დაიჭირე\nსიგრილე." : "Catch\nthe cool."}</h2><p>{ka ? "ყინული ციდან ცვივა. ჭიქა შენს ხელშია." : "Ice falls from the sky. Your glass does the catching."}</p></header><IceCatchGame artwork={art.artwork} language={language} storageKey={`1111-ice-best-${theme}`}/></section>
    <section className={`summer-mood mood-${mood}`}><h2>{ka ? "როგორი იქნება\nშენი საღამო?" : "What’s your\nsummer mood?"}</h2><div className="summer-mood-options">{moods.map((label,i)=><button key={i} aria-pressed={mood===i} onClick={()=>setMood(i)}>{label}</button>)}</div><div className="summer-mood-scene" key={mood}><img src={art.artwork} alt=""/><span className="summer-mood-orbit"><InvitationMotif name={["sun", "sparkle", "burst"][mood]} /></span></div><p role="status">{ka ? ["დღეს ყველაფერი მზესავით ანათებს.","ეს საღამო შენს ცეკვას ელოდება.","ნელი ყლუპები. კარგი მეგობრები."][mood] : ["A little sunshine looks good on you.","The dance floor is waiting for you.","Slow sips. Good company."][mood]}</p></section>
    <section className="summer-rsvp" id="summer-rsvp"><h2>{ka ? "შენც\nშემოგვიერთდი." : "Save your\nsummer seat."}</h2><form onSubmit={e=>{e.preventDefault();const name=new FormData(e.currentTarget).get('name');try {localStorage.setItem(`1111-summer-rsvp-${theme}`,JSON.stringify({name,attending:reply}));} catch {/* Demo works without storage. */}setSaved(true);}}><label>{ka ? "შენი სახელი" : "Your name"}<input required name="name" maxLength={70} autoComplete="given-name" onChange={()=>setSaved(false)}/></label><fieldset><legend>{ka ? "შემოგვიერთდები?" : "Will you join us?"}</legend><label><input type="radio" name="attending" required checked={reply===true} onChange={()=>{setReply(true);setSaved(false);}}/>{ka ? "რა თქმა უნდა!" : "Wouldn’t miss it!"}</label><label><input type="radio" name="attending" checked={reply===false} onChange={()=>{setReply(false);setSaved(false);}}/>{ka ? "ამჯერად ვერ მოვახერხებ" : "Sending love from afar"}</label></fieldset><button type="submit">{ka ? "პასუხის შენახვა" : "Save demo reply"} <InvitationArtwork name="arrow-up-right" size={18} /></button><p role="status">{saved ? (ka ? "შენი პასუხი ამ მოწყობილობაზე შეინახა" : "Your reply is saved on this device") : (ka ? "დემო მოსაწვევი — პასუხი მხოლოდ ამ მოწყობილობაზე ინახება." : "Demo invitation — replies stay on this device.")}</p></form></section>
    <footer><Link to="/invitations">11:11</Link><button onClick={()=>jump('summer-game')}>{ka ? "კიდევ ერთი თამაში?" : "One more round?"} <InvitationArtwork name="arrow-up-right" size={18} /></button></footer>
  </main>;
}
