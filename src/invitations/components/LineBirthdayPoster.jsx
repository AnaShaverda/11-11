import { useLanguage } from "../../localization/LanguageContext.jsx";
import { getDesignFont, getDesignTypography } from "../data/cardTypography.js";

export default function LineBirthdayPoster({ sample, variant }) {
  const { t, language } = useLanguage();
  const typography = getDesignTypography({ previewArt: variant });
  const headline = sample.headline ?? sample.title;
  const title = variant === "white-and-blue" && language === "en" && headline === "make a wish"
    ? <>make a<br />wish</>
    : headline;
  return (
    <div className="line-birthday-copy">
      <span className="line-birthday-opening">{sample.opening ?? t("invitations.invited")}</span>
      <strong className="line-birthday-title" style={getDesignFont(typography.display, language).style}>{title}</strong>
      <em className="line-birthday-phrase" style={getDesignFont(typography.accent ?? typography.details, language).style}>{sample.line}</em>
      {!sample.headline && <span className="line-birthday-details">{sample.date}<br />{sample.location}</span>}
    </div>
  );
}
