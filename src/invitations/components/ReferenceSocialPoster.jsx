import { formatCardOpening } from "../data/cardTypography.js";
import { useLanguage } from "../../localization/LanguageContext.jsx";

export default function ReferenceSocialPoster({ variant, name, namePossessive, age, date, time, location, line, openingFont }) {
  const { t, language } = useLanguage();
  const host = namePossessive ?? t("cards.possessive", { name });
  return variant === "cobalt-cheers" ? <div className="cobalt-poster-copy">
    <div className="cobalt-poster-heading"><span>{host}</span><strong>{t("cards.social.title.0")}<br />{t("cards.social.title.1")}</strong></div>
    <div className="cobalt-poster-bottom"><span className="social-date">{date}</span><span className="social-menu">{t("cards.social.menu")}</span><div className="social-info-grid"><span><b>{t("cards.social.wear")}</b> <span>{line}</span></span><span><b>{t("cards.social.time")}</b> <span>{time}</span></span><span><b>{t("cards.social.where")}</b> <span>{location}</span></span></div></div>
  </div> : <div className="ribbon-poster-copy"><span className="ribbon-poster-opening">{formatCardOpening(t("invitations.invited"), language, openingFont)}</span><strong className="ribbon-poster-name">{host}<br />{t("cards.birthday")}</strong><strong className="ribbon-poster-age">{age}</strong><span className="ribbon-poster-date">{date} · {time}</span><span className="ribbon-poster-location">{location}</span><em>{line}</em></div>;
}
