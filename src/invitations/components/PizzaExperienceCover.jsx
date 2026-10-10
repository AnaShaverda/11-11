import { useLanguage } from "../../localization/LanguageContext.jsx";
import "../../styles/pizza-experience-cover.css";

export default function PizzaExperienceCover({ variant, className = "", ariaLabel }) {
  const { t, language } = useLanguage();
  const slice = variant === "slice-club";
  const party = (key) => t(`invitations.data.pizzaPartyCopy.copy1.${key}`);
  const club = (key) => t(`invitations.pages.SliceClubExperience.copy1.${key}`);

  return <div lang={language} className={`invitation-preview-art pizza-experience-cover ${slice ? "pizza-experience-cover--club" : "pizza-experience-cover--chef"} ${className}`} aria-hidden={ariaLabel ? undefined : true} aria-label={ariaLabel}>
    {!slice && <div className="pizza-cover-awning" />}
    <div className="pizza-cover-scene">
      <div className="pizza-cover-copy">
        <p className="pizza-cover-eyebrow">{slice ? club("birthday") : <>{party("party")}<br />{party("trattoria")}</>}</p>
        <strong className="pizza-cover-title">{slice ? club("title") : <>{party("headline.0")}<br />{party("headline.1")}</>}</strong>
        {slice ? <p className="pizza-cover-note">{club("surprise")}</p> : <><p className="pizza-cover-party">{party("title")}</p><p className="pizza-cover-age">{party("age")}</p><p className="pizza-cover-date">{party("date")} / 14:00 / {party("city")}</p></>}
        <span className="pizza-cover-action">{slice ? club("open") : party("invited")}</span>
      </div>
      <img className="pizza-cover-art" src={slice ? "/images/birthday/slice-club/box-closed.webp" : "/images/birthday/pizza-party/pizza-plate.webp"} alt="" loading="lazy" decoding="async" draggable="false" />
    </div>
  </div>;
}
