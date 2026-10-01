import { useLanguage } from "../../localization/LanguageContext.jsx";

export default function FullImageInvitationPoster({ title, line, date, location, variant }) {
  const { t } = useLanguage();
  return <div className="full-image-cover-copy">
    <span className="full-image-cover-opening">{t("invitations.invited")}</span>
    <strong>{variant === "disco-scrapbook" ? title.split(" ").map((word, index) => <span className="scrapbook-word" key={`${word}-${index}`}>{word} </span>) : title}</strong>
    <em>{line}</em>
    <span className="full-image-cover-details">{date}<br />{location}</span>
  </div>;
}
