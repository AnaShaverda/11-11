import { captionValue } from "../../localization/captionValues.js";
import { Link } from "react-router-dom";
import InvitationArtwork from "./InvitationArtwork.jsx";
import { useLanguage } from "../../localization/LanguageContext.jsx";

export default function CustomInvitationCard({ category, animationIndex = 0 }) {
  const { t, language } = useLanguage();
  const copy = { badge: captionValue("ui.invitations.components.CustomInvitationCard.makeItYours", language), title: captionValue("ui.invitations.components.CustomInvitationCard.yourNamesHere", language), edit: captionValue("ui.invitations.components.CustomInvitationCard.customizeEveryDetail", language), images: captionValue("ui.invitations.components.CustomInvitationCard.addYourOwnImage", language) };
  const hint = captionValue("invitations.components.CustomInvitationCard.caption1", language);
  const categoryName = category === "christening" ? captionValue("invitations.components.CustomInvitationCard.caption2", language) : category === "all" ? t("invitations.all") : t(`common.${category}`);

  return <Link
    id={`design-custom-${category}`}
    className="invitation-card invitation-showcase-card invitation-card--glass invitation-card--custom"
    style={{ "--catalog-card-delay": `${Math.min(animationIndex, 6) * 40}ms` }}
    to={`/order-online${category === "christening" || category === "baby-kids" ? "?occasion=christening" : category === "wedding" ? "?occasion=wedding" : ""}`}
    aria-label={`${t("nav.orderOnline")}: ${categoryName}`}>
    <div className="invitation-card-media custom-design-preview">
      <img className="custom-design-artwork" src="/images/custom-classical/custom-design-envelope.jpg" alt="" />
      <span className="custom-design-copy"><strong>{copy.title}</strong><span>{copy.edit}</span><span className="custom-design-image-hint"><span>{copy.images}</span><InvitationArtwork name="image" size={32} /></span></span>
    </div>
    <span className="invitation-card-bottom"><span><strong>{t("nav.orderOnline")}</strong><small>{hint}</small></span></span>
  </Link>;
}
