import { useLanguage } from "../../localization/LanguageContext.jsx";

export default function ChristeningCardPoster({ name, namePossessive, title, line, date, location }) {
  const { language, t } = useLanguage();
  const host = name || title.split(/[’']/)[0];
  return <div className="christening-card-copy" lang={language}>
    <span className="christening-card-opening">{t("cards.christening.opening")}</span>
    <strong><span>{namePossessive ?? t("cards.possessive", { name: host })}</span><span>{t("cards.christening.title")}</span></strong>
    <em>{line}</em>
    <span className="christening-card-details"><span className="card-text-value">{date}</span><br /><span className="card-text-value">{location}</span></span>
    <span className="christening-card-closing">{t("cards.christening.closing")}</span>
  </div>;
}
