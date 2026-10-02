import { useLanguage } from "../../localization/LanguageContext.jsx";

export default function FullImageInvitationPoster({ title, line, date, location, variant, handwrittenOpening = false }) {
  const { t, language } = useLanguage();
  const invited = t("invitations.invited");
  const opening = handwrittenOpening && language === "en"
    ? invited.charAt(0).toUpperCase() + invited.slice(1).toLowerCase()
    : invited;
  return <div className="full-image-cover-copy">
    <span className="full-image-cover-opening">{opening}</span>
    <strong>{["disco-scrapbook", "pink-disco-lines"].includes(variant) ? title.split(" ").map((word, index) => <span className="scrapbook-word" key={`${word}-${index}`}>{word} </span>) : title}</strong>
    <em>{line}</em>
    <span className="full-image-cover-details">{date}<br />{location}</span>
  </div>;
}
