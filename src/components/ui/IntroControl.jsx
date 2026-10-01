import { Link } from "react-router-dom";
import { useLanguage } from "../../localization/LanguageContext.jsx";
import Icon from "./Icon.jsx";

export default function IntroControl() {
  const { t } = useLanguage();
  return (
    <Link
      className="intro-control"
      to="/#projects"
      aria-label={`${t("common.exploreEvents")} — ${t("home.hero.action")}`}
    >
      <span>{t("home.hero.action")}</span>
      <span className="intro-control-arrow" aria-hidden="true">
        <Icon name="chevron-right" size={28} />
      </span>
    </Link>
  );
}
