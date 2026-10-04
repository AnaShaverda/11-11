import { useLanguage } from "../../localization/LanguageContext.jsx";

export default function BridalLinePoster({ variant, title, date, location, line }) {
  const { language, t } = useLanguage();
  return <div className="bridal-line-copy" lang={language}>
    <span className="bridal-line-opening">{t(variant === "little-yes" ? "cards.engagement.opening" : "cards.bridal.toast")}</span>
    <strong>{title}</strong>
    <em>{line}</em>
    <span className="bridal-line-details"><span className="card-text-value">{date}</span><br /><span className="card-text-value">{location}</span></span>
  </div>;
}
