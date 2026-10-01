import Icon from "../components/ui/Icon.jsx";
import { Link } from "react-router-dom";
import { useLanguage } from "../localization/LanguageContext.jsx";

export default function AboutPage() {
  const { t } = useLanguage();
  return (
    <section className="inner-page copy-page">
      <h1>{t("about.title")}</h1>
      <p>{t("about.description")}</p>
      <Link className="text-link" to="/#projects">
        {t("common.exploreEvents")} <Icon name="arrow-up-right" size={18} />
      </Link>
    </section>
  );
}
