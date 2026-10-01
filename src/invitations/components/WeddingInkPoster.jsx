import { useLanguage } from "../../localization/LanguageContext.jsx";

export default function WeddingInkPoster({ title, date, location, line }) {
  const { language } = useLanguage();
  return <div className="wedding-ink-copy">
    <span className="wedding-ink-opening">{language === "ka" ? "შეინახეთ თარიღი" : "Save the date"}</span>
    <strong>{title}</strong>
    <em>{line}</em>
    <span className="wedding-ink-details">{date}<br />{location}</span>
  </div>;
}
