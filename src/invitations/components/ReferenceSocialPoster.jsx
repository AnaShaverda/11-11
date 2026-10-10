import { useLanguage } from "../../localization/LanguageContext.jsx";

export default function ReferenceSocialPoster({ name, namePossessive, date, time, location, line }) {
  const { t } = useLanguage();
  const host = namePossessive ?? t("cards.possessive", { name });
  return <div className="cobalt-poster-copy">
    <div className="cobalt-poster-heading"><span>{host}</span><strong>{t("cards.social.title.0")}<br />{t("cards.social.title.1")}</strong></div>
    <div className="cobalt-poster-bottom"><span className="social-date">{date}</span><span className="social-menu">{t("cards.social.menu")}</span><div className="social-info-grid"><span><b>{t("cards.social.wear")}</b> <span>{line}</span></span><span><b>{t("cards.social.time")}</b> <span>{time}</span></span><span><b>{t("cards.social.where")}</b> <span>{location}</span></span></div></div>
  </div>;
}
