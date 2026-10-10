import { captionValue } from "../../localization/captionValues.js";
import "../../styles/birthday-playground-poster.css";
const art = "/images/birthday/playground/";
export default function BirthdayPlaygroundPoster({ sample, language, ariaLabel, className = "" }) {
 return <div className={`playground-poster ${className}`} lang={language} aria-label={ariaLabel} aria-hidden={ariaLabel ? undefined : true}>
  <strong className="playground-poster-title">{sample.headline || (captionValue("invitations.components.BirthdayPlaygroundPoster.caption1", language))}</strong>
  <p className="playground-poster-intro">{captionValue("invitations.components.BirthdayPlaygroundPoster.caption2", language)}</p>
  <p className="playground-poster-date">{sample.date}<br/>{sample.location}</p>
  <img className="playground-poster-gift" src={`${art}gift.webp`} alt="" loading="lazy"/>

 </div>;
}
