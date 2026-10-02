import { useLanguage } from "../../localization/LanguageContext.jsx";

export default function WeddingInkPoster({ title, date, location, line }) {
  const { t } = useLanguage();
  return <div className="wedding-ink-copy">
    <span className="wedding-ink-opening">{t("cards.wedding.saveDate")}</span>
    <strong>{title}</strong>
    <em>{line}</em>
    <span className="wedding-ink-details">{date}<br />{location}</span>
  </div>;
}
