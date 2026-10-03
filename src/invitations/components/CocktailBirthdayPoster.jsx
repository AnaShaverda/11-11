import { useLanguage } from "../../localization/LanguageContext.jsx";
import { getInvitationSample } from "../../localization/cardCopy.js";
import { getDesignFont } from "../data/cardTypography.js";

export default function CocktailBirthdayPoster({ sample, large, variant, artwork, slug = `birthday-${variant}`, isBridal = false }) {
  const { t, language } = useLanguage();
  const defaults = getInvitationSample(slug, t);
  const name = sample.posterName ?? sample.name ?? defaults.posterName;
  const age = sample.posterAge ?? sample.age ?? defaults.posterAge;
  return <div className={`cocktail-birthday-poster cocktail-${variant}${isBridal ? " cocktail-bridal" : ""}`} style={getDesignFont("cocktail", language).style}>
    <div className="cocktail-birthday-copy">
      <strong className="cocktail-title">{sample.headline ?? defaults.headline}</strong>
      <span className="cocktail-host">{isBridal ? <>{sample.opening ?? defaults.opening}<br />{name}</> : <>{name} {t("modernToast.turns", { age })}</>}</span>
      <span className="cocktail-details">{sample.date}<br />{sample.time ?? defaults.time} · {sample.location}</span>
    </div>
    <img className="cocktail-birthday-illustration" src={artwork} alt="" aria-hidden="true" loading={large ? "eager" : "lazy"} decoding="async" draggable="false" />
  </div>;
}
