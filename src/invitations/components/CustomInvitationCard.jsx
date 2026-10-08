import { Link } from "react-router-dom";
import Icon from "../../components/ui/Icon.jsx";
import { useLanguage } from "../../localization/LanguageContext.jsx";

export default function CustomInvitationCard({ category, animationIndex = 0 }) {
  const { t, language } = useLanguage();
  const copy = language === "ka" ? { badge: "შენი დიზაინი", title: "შენი სახელები", edit: "შეცვალე შენებურად", images: "დაამატე შენი ფოტო" } : { badge: "Make it yours", title: "Your names here", edit: "Customize every detail", images: "Add your own image" };
  const hint = language === "ka" ? "ფოტო · ტექსტი · სტილი" : "Photos · Text · Style";
  const categoryName = category === "christening" ? language === "ka" ? "ნათლობა" : "Christening" : category === "all" ? t("invitations.all") : t(`common.${category}`);

  return <Link
    id={`design-custom-${category}`}
    className="invitation-card invitation-showcase-card invitation-card--glass invitation-card--custom"
    style={{ "--catalog-card-delay": `${Math.min(animationIndex, 6) * 40}ms` }}
    to={`/invitations/create/${category}/designs`}
    aria-label={`${t("customCollection.heading")}: ${categoryName}`}>
    <div className="invitation-card-media custom-design-preview">
      <img className="custom-design-artwork" src="/images/custom-classical/custom-design-envelope.jpg" alt="" />
      <span className="custom-design-copy"><strong>{copy.title}</strong><span>{copy.edit}</span><span className="custom-design-image-hint"><span>{copy.images}</span><Icon name="image" size={32} /></span></span>
    </div>
    <span className="invitation-card-bottom"><span><strong>{t("customCollection.heading")}</strong><small>{hint}</small></span></span>
  </Link>;
}
