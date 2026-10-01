import Icon from "../../components/ui/Icon.jsx";
import { Link } from "react-router-dom";
import SurprisePhonePreview from "./SurprisePhonePreview.jsx";
import { useLanguage } from "../../localization/LanguageContext.jsx";

export default function HomeSurpriseSection() {
  const { t } = useLanguage();
  return <section className="home-surprise" aria-labelledby="home-surprise-title"><div className="home-surprise-copy"><span className="home-section-index">{t("surprises.home.index")}</span><h2 id="home-surprise-title">{t("surprises.hero.question")} <em>{t("surprises.hero.emphasis")}</em></h2><p>{t("surprises.home.description")}</p><Link className="primary-link" to="/surprises">{t("surprises.home.action")} <Icon name="arrow-up-right" size={18} /></Link><small>{t("surprises.home.note")}</small></div><div className="home-surprise-preview"><SurprisePhonePreview /></div></section>;
}
