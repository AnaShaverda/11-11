import Icon from "../../components/ui/Icon.jsx";
import { Link } from "react-router-dom";
import { getThemeBySlug } from "../../themes/data/themes.js";
import { birthdaySurprise } from "../data/surprises.js";
import { CakeVisual } from "./InteractiveCake.jsx";
import { PhotoTile } from "./SurpriseBlocks.jsx";
import { useLanguage } from "../../localization/LanguageContext.jsx";

export default function SurprisePhonePreview({ themeId = birthdaySurprise.themeId, title = birthdaySurprise.title, message = birthdaySurprise.mainMessage, state, showCake = true, to = "/surprises/demo" }) {
  const { t } = useLanguage();
  const theme = getThemeBySlug(themeId) ?? getThemeBySlug(birthdaySurprise.themeId);
  return <div className="surprise-phone-shell"><div className={`theme-canvas theme-${theme.visual} surprise-phone-screen`}><div className="surprise-phone-top"><span>11:11 {theme.decor && "✦"}</span><span>{t("surprise.phone.made")}</span></div>{theme.decor && <div className="surprise-phone-decor" aria-hidden="true">{theme.decor}</div>}<h3>{title}</h3><p>{message}</p><div className="surprise-phone-story"><PhotoTile photo={0} label={t("surprise.phone.photo")} />{showCake ? <CakeVisual /> : <span aria-hidden="true">♡</span>}</div><Link to={to} state={state} className="surprise-phone-link">{t("surprise.phone.open")} <Icon name="arrow-up-right" size={18} /></Link></div></div>;
}
