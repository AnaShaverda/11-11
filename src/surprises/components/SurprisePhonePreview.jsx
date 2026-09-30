import { Link } from "react-router-dom";
import { getThemeBySlug } from "../../themes/data/themes.js";
import { birthdaySurprise } from "../data/surprises.js";
import { CakeVisual } from "./InteractiveCake.jsx";
import { PhotoTile } from "./SurpriseBlocks.jsx";

export default function SurprisePhonePreview({ themeId = birthdaySurprise.themeId, title = birthdaySurprise.title, message = birthdaySurprise.mainMessage, to = "/surprises/demo" }) {
  const theme = getThemeBySlug(themeId) ?? getThemeBySlug(birthdaySurprise.themeId);
  return <div className="surprise-phone-shell"><div className={`theme-canvas theme-${theme.visual} surprise-phone-screen`}><div className="surprise-phone-top"><span>11:11 ✦</span><span>MADE FOR ONE PERSON</span></div><div className="surprise-phone-decor" aria-hidden="true">{theme.decor}</div><h3>{title}</h3><p>{message}</p><div className="surprise-phone-story"><PhotoTile photo={0} label="Two friends on a coastal terrace" /><CakeVisual /></div><Link to={to} className="surprise-phone-link">Open this little world <span aria-hidden="true">↗</span></Link></div></div>;
}
