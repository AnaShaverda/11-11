import { Link } from "react-router-dom";
import Icon from "../../components/ui/Icon.jsx";
import { useLanguage } from "../../localization/LanguageContext.jsx";

export default function GiftCatalog({ items }) {
  const { t } = useLanguage();
  return <div className="gift-catalog-grid">
    {items.map((item, index) => <Link className="gift-catalog-card" key={item.id} to={item.href} style={{ "--catalog-card-delay": `${Math.min(index, 6) * 40}ms` }}>
      <img src="/images/categories/gifts.svg" alt="" width="160" height="172" />
      <div><span className="section-label">{t("catalog.digitalGift")}</span><h3>{t(item.captionKey)}</h3><p>{t(item.descriptionKey)}</p><span className="gift-catalog-action">{t("surprises.create")} <Icon name="arrow-up-right" size={16} /></span></div>
    </Link>)}
  </div>;
}
