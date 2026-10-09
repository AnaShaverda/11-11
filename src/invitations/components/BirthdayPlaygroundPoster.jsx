import "../../styles/birthday-playground-poster.css";
const art = "/images/birthday/party-doodles/playground/";
export default function BirthdayPlaygroundPoster({ sample, language, ariaLabel, className = "" }) {
 return <div className={`playground-poster ${className}`} lang={language} aria-label={ariaLabel} aria-hidden={ariaLabel ? undefined : true}>
  <strong className="playground-poster-title">{sample.headline || (language === "ka" ? "ჩემი დაბადების დღეა!" : "it’s my birthday!")}</strong>
  <p className="playground-poster-intro">{language === "ka" ? "ტორტი, თამაშები და ერთად გატარებული დრო" : "Let’s eat cake, play a little and celebrate together"}</p>
  <p className="playground-poster-date">{sample.date}<br/>{sample.location}</p>
  <img className="playground-poster-gift" src={`${art}gift.webp`} alt="" loading="lazy"/>
  
 </div>;
}
