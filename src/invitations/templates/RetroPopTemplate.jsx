import { useLanguage } from "../../localization/LanguageContext.jsx";

export default function RetroPopTemplate({ event }) {
  const { t, language } = useLanguage();
  const possessiveName = language === "ka" ? event.celebrantName : event.celebrantName.endsWith("s") ? `${event.celebrantName}’` : `${event.celebrantName}’s`;

  return (
    <article className="invite-design invite-retro" aria-label={`${event.celebrantName} · ${t("themeCanvas.birthdayInvite")}`}>
      <span className="retro-sun" aria-hidden="true">✷</span>


      <div className="retro-intro">{t("template.its")}</div>
      <h2 className="retro-name">{possessiveName}</h2>
      <div className="retro-birthday">{t("template.birthday")}</div>
      {event.age ? <div className="retro-age" aria-label={t("template.turning", { age: event.age })}><span>{event.age}</span></div> : null}
      <p className="retro-message">{event.message}</p>
      <div className="retro-details">
        <div><span className="retro-detail-label">{t("template.date")}</span><strong>{event.date}</strong></div>
        <div><span className="retro-detail-icon" aria-hidden="true">◷</span><span className="retro-detail-label">{t("template.time")}</span><strong>{event.time}</strong></div>
        <div><span className="retro-detail-icon" aria-hidden="true">⌖</span><span className="retro-detail-label">{t("template.place")}</span><strong>{event.location}</strong></div>
      </div>
      <span className="retro-bottom-mark" aria-hidden="true">11:11 </span>
    </article>
  );
}
