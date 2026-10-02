import { formatCardOpening } from "../data/cardTypography.js";
import { useLanguage } from "../../localization/LanguageContext.jsx";

export default function RetroBridalPoster({ title, name, namePossessive, line, date, location, openingFont }) {
  const { language, t } = useLanguage();
  const host = name || title.split(/[’']/)[0];
  return <div className="retro-bridal-copy" lang={language}>
    <span className="retro-bridal-opening">{formatCardOpening(t("cards.bridal.opening"), language, openingFont)}</span>
    <span className="retro-bridal-host">{namePossessive ?? t("cards.possessive", { name: host })}</span>
    <strong><span>{t("cards.bridal.title")}</span><span>{t("cards.party")}</span></strong>
    <em>{line}</em>
    <span className="retro-bridal-details">{date}<br />{location}</span>
  </div>;
}
