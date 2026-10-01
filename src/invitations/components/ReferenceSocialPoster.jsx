import { useLanguage } from "../../localization/LanguageContext.jsx";

export default function ReferenceSocialPoster({ variant, name, age, date, time, location, line }) {
  const { language, t } = useLanguage();
  const ka = language === "ka";
  return variant === "cobalt-cheers" ? <div className="cobalt-poster-copy">
    <div className="cobalt-poster-heading"><span>{name}{ka ? "" : "’s"}</span><strong>{ka ? <>დაბადების<br />დღე</> : <>BIRTHDAY<br />PARTY</>}</strong></div>
    <div className="cobalt-poster-bottom"><span className="social-date">{date}</span><span className="social-menu">{ka ? "სასმელი · მუსიკა · მეგობრები" : "DRINKS · FOOD · MUSIC · VIBES"}</span><div className="social-info-grid"><span><b>{ka ? "სტილი" : "WEAR"}</b> {line}</span><span><b>{ka ? "დრო" : "TIME"}</b> {time}</span><span><b>{ka ? "ადგილი" : "WHERE"}</b> {location}</span></div></div>
  </div> : <div className="ribbon-poster-copy"><span className="ribbon-poster-opening">{t("invitations.invited")}</span><strong className="ribbon-poster-name">{name}{ka ? "" : "’s"}<br />{ka ? "დაბადების დღე" : "Birthday"}</strong><strong className="ribbon-poster-age">{age}</strong><span className="ribbon-poster-date">{date} · {time}</span><span className="ribbon-poster-location">{location}</span><em>{line}</em></div>;
}
