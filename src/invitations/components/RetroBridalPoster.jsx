import { useLanguage } from "../../localization/LanguageContext.jsx";

export default function RetroBridalPoster({ title, name, line, date, location, variant }) {
  const { language } = useLanguage();
  const host = name || title.split(/[’']/)[0];
  const script = true;
  return <div className="retro-bridal-copy" lang={language}>
    <span className="retro-bridal-opening">{language === "ka" ? "მოწვეული ხარ" : "YOU’RE INVITED TO"}</span>
    <span className="retro-bridal-host">{language === "ka" ? host : `${host}’s`}</span>
    <strong><span>{language === "ka" ? "პატარძლის" : script ? "Bridal" : "BRIDAL"}</span><span>{language === "ka" ? "წვეულება" : script ? "Party" : "PARTY"}</span></strong>
    <em>{line}</em>
    <span className="retro-bridal-details">{date}<br />{location}</span>
  </div>;
}
