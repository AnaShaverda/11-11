import { useLanguage } from "../../localization/LanguageContext.jsx";

export default function EditorialTemplate({ event }) {
  const { t } = useLanguage();
  return (
    <article className="invite-design invite-editorial" aria-label={`${event.brideName} & ${event.groomName} · ${t("themeCanvas.weddingInvite")}`}>
      <div className="editorial-arch" aria-hidden="true" />

      <p className="editorial-opening">{event.invitationMessage}</p>
      <h2 className="editorial-names"><span>{event.brideName}</span><em>&amp;</em><span>{event.groomName}</span></h2>
      <div className="editorial-rule" aria-hidden="true" />
      <p className="editorial-date">{event.date}</p>
      <p className="editorial-time">{t("template.at", { time: event.time })}</p>
      <p className="editorial-location">{event.location}</p>
      <div className="editorial-rule editorial-rule-small" aria-hidden="true" />
      <p className="editorial-footer">{t("template.together")}  11:11</p>
    </article>
  );
}
