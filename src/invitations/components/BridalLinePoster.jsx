import { useLanguage } from "../../localization/LanguageContext.jsx";

export default function BridalLinePoster({ variant, title, date, location, line }) {
  const { language } = useLanguage();
  const engagement = variant === "little-yes";
  const opening = language === "ka"
    ? engagement ? "ჩვენი ნიშნობა" : "პატარძლის წვეულება"
    : engagement ? "Celebrating our engagement" : "A toast to the bride-to-be";

  return <div className="bridal-line-copy" lang={language}>
    <span className="bridal-line-opening">{opening}</span>
    <strong>{title}</strong>
    <em>{line}</em>
    <span className="bridal-line-details">{date}<br />{location}</span>
  </div>;
}
