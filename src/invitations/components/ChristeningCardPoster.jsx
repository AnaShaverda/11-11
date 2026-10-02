import { useLanguage } from "../../localization/LanguageContext.jsx";

export default function ChristeningCardPoster({ name, title, line, date, location }) {
  const { language } = useLanguage();
  const ka = language === "ka";
  const host = name || title.split(/[’']/)[0];
  const displayName = ka && host === "Sofia" ? "სოფიას" : ka ? host : `${host}’s`;
  return <div className="christening-card-copy" lang={language}>
    <span className="christening-card-opening">{ka ? "პატარა ბედნიერება" : "A little blessing"}</span>
    <strong><span>{displayName}</span><span>{ka ? "ნათლობა" : "Christening"}</span></strong>
    <em>{ka && line === "Join us for a day of love & light." ? "ერთად აღვნიშნოთ სიყვარულით სავსე დღე." : line}</em>
    <span className="christening-card-details">{ka ? date.replace("MAY", "მაისი") : date}<br />{ka && location === "TBILISI" ? "თბილისი" : location}</span>
    <span className="christening-card-closing">{ka ? "ოჯახთან და საყვარელ ადამიანებთან ერთად" : "Together with family & favorite people"}</span>
  </div>;
}
