import Icon from "../components/ui/Icon.jsx";
import { Link } from "react-router-dom";
import { useLanguage } from "../localization/LanguageContext.jsx";

export default function NotFoundPage() {
  const { t } = useLanguage();
  return (
    <section className="inner-page copy-page">
      <h1>{t("notFound.title")}</h1>
      <p>{t("notFound.description")}</p>
      <Link className="text-link" to="/">
        {t("common.backHome")} <Icon name="arrow-up-right" size={18} />
      </Link>
    </section>
  );
}
