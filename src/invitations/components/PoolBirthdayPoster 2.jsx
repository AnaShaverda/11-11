import { useLanguage } from "../../localization/LanguageContext.jsx";
import { getInvitationSample } from "../../localization/cardCopy.js";
import { getDesignFont } from "../data/cardTypography.js";

export default function PoolBirthdayPoster({ sample, variant }) {
  const { t, language } = useLanguage();
  const defaults = getInvitationSample(`birthday-${variant}`, t);
  const age = sample.posterAge ?? sample.age ?? defaults.posterAge;
  const name = sample.posterName ?? sample.name ?? defaults.posterName;
  return (
    <div className="pool-birthday-copy" style={getDesignFont("pool", language).style}>
      <strong className="pool-title">{sample.headline ?? defaults.headline}</strong>
      <span className="pool-host"><span className="card-text-value">{name}</span> {t("modernToast.turns", { age })}</span>
      <span className="pool-opening">{sample.opening ?? defaults.opening}</span>
      <span className="pool-details"><span className="card-text-value">{sample.date}</span><br /><span className="card-text-value">{sample.time ?? defaults.time}</span> · <span className="card-text-value">{sample.location}</span></span>
    </div>
  );
}
