import { captionValue } from "../../localization/captionValues.js";
import InvitationMakerFooter from "../components/InvitationMakerFooter.jsx";
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
  const moods = [captionValue("ui.invitations.pages.CocktailSummerExperience.sunshineMode", language), captionValue("ui.invitations.pages.CocktailSummerExperience.dancingMode", language), captionValue("ui.invitations.pages.CocktailSummerExperience.chillMode", language)];
  const jump = id => document.getElementById(id)?.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  return <main className={`summer-party summer-${theme}`} lang={language} style={{...getDesignFont(art.font,language).style,"--summer-paper":palettes[art.paper],"--summer-ink":art.ink,"--summer-accent":art.accent,"--summer-texture":`url('${assets.coverImage}')`}}>
    <section className="summer-hero" aria-label={captionValue("ui.invitations.pages.CocktailSummerExperience.partyInvitation", language)}>
      <nav><Link to="/invitations" aria-label={captionValue("ui.invitations.pages.CocktailSummerExperience.backToInvitations", language)}><InvitationArtwork name="arrow-left" size={18} /> 11:11</Link><button onClick={()=>setLanguage(ka ? "en" : "ka")}>{captionValue("ui.invitations.pages.CocktailSummerExperience.ka", language)}</button></nav>
      <h1>{ka ? art.kaHeadline : art.headline}</h1>
      <p className="summer-host">{captionValue("ui.invitations.pages.CocktailSummerExperience.forTheBride", language)}<br/>{captionValue("ui.invitations.pages.CocktailSummerExperience.mariam", language)}</p>
      <button className={`summer-hero-glass ${fizz ? "is-fizzy" : ""}`} key={fizz} onClick={()=>setFizz(v=>v+1)} aria-label={captionValue("ui.invitations.pages.CocktailSummerExperience.tapTheGlassToMakeItFizz", language)}>
        <img src={art.artwork} alt={ka ? art.kaName : art.name}/>{fizz > 0 && Array.from({length:12},(_,i)=><span className="summer-bubble" key={i} style={{"--bubble-x":`${20+(i*17)%60}%`,"--bubble-delay":`${i*.06}s`}}/>)}
      </button>
      <p className="summer-tap">{captionValue("ui.invitations.pages.CocktailSummerExperience.tapYourGlassMakeItFizz", language)}</p>
      <p className="summer-date">{captionValue("ui.invitations.pages.CocktailSummerExperience.12September20272000Tbilisi", language)}</p>
      <div className="summer-actions"><button onClick={()=>jump('summer-game')}>{captionValue("ui.invitations.pages.CocktailSummerExperience.catchSomeIce", language)} <InvitationArtwork name="arrow-down" size={18} /></button><button onClick={()=>jump('summer-rsvp')}>RSVP <InvitationArtwork name="arrow-up-right" size={18} /></button></div>
    </section>
    <section className="summer-details"><h2>{captionValue("ui.invitations.pages.CocktailSummerExperience.yourGirlsYourSummer", language)}</h2><div><p>{captionValue("ui.invitations.pages.CocktailSummerExperience.oneEveningEndlessLaughterAndALittle", language)}</p><dl><div><dt>{captionValue("ui.invitations.pages.CocktailSummerExperience.when", language)}</dt><dd>{captionValue("ui.invitations.pages.CocktailSummerExperience.12September2000", language)}</dd></div><div><dt>{captionValue("ui.invitations.pages.CocktailSummerExperience.where", language)}</dt><dd>{captionValue("ui.invitations.pages.CocktailSummerExperience.tbilisiAddressFromYourHost", language)}</dd></div><div><dt>{captionValue("ui.invitations.pages.CocktailSummerExperience.wear", language)}</dt><dd>{captionValue("ui.invitations.pages.CocktailSummerExperience.yourFavoriteSummerColor", language)}</dd></div></dl></div></section>
    <BridalPhotoCollage language={language} accentArt={art.artwork} />
    <section className="summer-play-section" id="summer-game"><header><h2>{captionValue("ui.invitations.pages.CocktailSummerExperience.catchTheCool", language)}</h2><p>{captionValue("ui.invitations.pages.CocktailSummerExperience.iceFallsFromTheSkyYourGlass", language)}</p></header><IceCatchGame artwork={art.artwork} language={language} storageKey={`1111-ice-best-${theme}`}/></section>
    <section className={`summer-mood mood-${mood}`}><h2>{captionValue("ui.invitations.pages.CocktailSummerExperience.whatSYourSummerMood", language)}</h2><div className="summer-mood-options">{moods.map((label,i)=><button key={i} aria-pressed={mood===i} onClick={()=>setMood(i)}>{label}</button>)}</div><div className="summer-mood-scene" key={mood}><img src={art.artwork} alt=""/><span className="summer-mood-orbit"><InvitationMotif name={["sun", "sparkle", "burst"][mood]} /></span></div><p role="status">{([captionValue("ui.invitations.pages.CocktailSummerExperience.aLittleSunshineLooksGoodOnYou", language), captionValue("ui.invitations.pages.CocktailSummerExperience.theDanceFloorIsWaitingForYou", language), captionValue("ui.invitations.pages.CocktailSummerExperience.slowSipsGoodCompany", language)])[mood]}</p></section>
    <section className="summer-rsvp" id="summer-rsvp"><h2>{captionValue("ui.invitations.pages.CocktailSummerExperience.saveYourSummerSeat", language)}</h2><form onSubmit={e=>{e.preventDefault();const name=new FormData(e.currentTarget).get('name');try {localStorage.setItem(`1111-summer-rsvp-${theme}`,JSON.stringify({name,attending:reply}));} catch {/* Demo works without storage. */}setSaved(true);}}><label>{captionValue("ui.invitations.pages.CocktailSummerExperience.yourName", language)}<input required name="name" maxLength={70} autoComplete="given-name" onChange={()=>setSaved(false)}/></label><fieldset><legend>{captionValue("ui.invitations.pages.CocktailSummerExperience.willYouJoinUs", language)}</legend><label><input type="radio" name="attending" required checked={reply===true} onChange={()=>{setReply(true);setSaved(false);}}/>{captionValue("ui.invitations.pages.CocktailSummerExperience.wouldnTMissIt", language)}</label><label><input type="radio" name="attending" checked={reply===false} onChange={()=>{setReply(false);setSaved(false);}}/>{captionValue("ui.invitations.pages.CocktailSummerExperience.sendingLoveFromAfar", language)}</label></fieldset><button type="submit">{captionValue("ui.invitations.pages.CocktailSummerExperience.saveDemoReply", language)} <InvitationArtwork name="arrow-up-right" size={18} /></button><p role="status">{saved ? (captionValue("ui.invitations.pages.CocktailSummerExperience.yourReplyIsSavedOnThisDevice", language)) : (captionValue("ui.invitations.pages.CocktailSummerExperience.demoInvitationRepliesStayOnThisDevice", language))}</p></form></section>
    <InvitationMakerFooter palette={theme.includes("citrus") ? "sunny" : theme.includes("lilac") ? "lilac" : theme.includes("country") ? "mint" : "cherry"} />
  </main>;
}
