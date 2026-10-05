import { Link } from "react-router-dom";
import { useLanguage } from "../../localization/LanguageContext.jsx";
import { getCustomTemplate } from "../data/customTemplates.js";
import CustomInvitationCover from "./CustomInvitationCover.jsx";

export default function CustomInvitationCard({ category, animationIndex = 0 }) {
  const { t } = useLanguage();
  const template = getCustomTemplate(category);
  const categoryName = category === "all" ? t("invitations.all") : t(`common.${category}`);
  const design = { ...template.defaultDesign, coverImage: "", frame: "arch", font: "serif", layout: "center", position: 50 };

  return <Link
    id={`design-custom-${category}`}
    className="invitation-card invitation-showcase-card invitation-card--glass invitation-card--custom"
    style={{ "--catalog-card-delay": `${Math.min(animationIndex, 6) * 40}ms` }}
    to={`/invitations/create/${category}`}
    aria-label={`${t("customCollection.heading")}: ${categoryName}`}>
    <div className="invitation-card-media">
      <CustomInvitationCover design={design} sample={{ title: categoryName, date: "11:11", opening: t("customCollection.oneOfOne") }} invitationLabel={t("guestCards.invitation")} />
    </div>
    <span className="invitation-card-bottom"><span><strong>{t("customCollection.heading")}</strong></span></span>
  </Link>;
}
