import { useLanguage } from "../../localization/LanguageContext.jsx";
import { getInvitationSample } from "../../localization/cardCopy.js";
import { getDesignFont } from "../data/cardTypography.js";

export default function PizzaBirthdayPoster({ sample, large, separated = false, variant = "little-pizza-chef" }) {
  const { t, language } = useLanguage();
  const defaults = getInvitationSample(`birthday-${variant}`, t);
  const headline = (sample.headline ?? defaults.headline).split("\n");
  const name = sample.posterName ?? sample.name ?? defaults.posterName;
  const age = sample.posterAge ?? sample.age ?? defaults.posterAge;
  if (variant === "slice-club") return <div className="pizza-birthday-poster slice-club-poster" style={getDesignFont("pool", language).style}>
    <div className="pizza-birthday-copy slice-club-copy">
      {headline.length === 3 && <strong className="slice-the">{headline[0]}</strong>}
      <strong className="slice-pizza">{headline.at(-2)}</strong>
      <strong className="slice-club">{headline.at(-1)}</strong>
      <span className="slice-host">{sample.opening ?? defaults.opening}<br />{name} {t("modernToast.turns", { age })}</span>
      <span className="slice-details">{sample.date}<br />{sample.time ?? defaults.time} · {sample.location}</span>
    </div>
    {!separated && ["top", "bottom"].map((position) => <img key={position} className={`pizza-slice-illustration slice-illustration-${position}`} src="/images/birthday/slice-club/pizza-slice.webp" alt="" aria-hidden="true" loading={large ? "eager" : "lazy"} decoding="async" draggable="false" />)}
  </div>;
  return <div className="pizza-birthday-poster" style={getDesignFont("pool", language).style}>
    <div className="pizza-birthday-copy">
      <strong className="pizza-make">{headline[0]}</strong>
      <strong className="pizza-headline">{headline.slice(1).join(" ")}</strong>
      <span className="pizza-host">{name} {t("modernToast.turns", { age })}</span>
      <span className="pizza-details">{sample.date} · {sample.time ?? defaults.time}<br />{sample.location}</span>
    </div>
    {!separated && <img className="pizza-chef-illustration" src="/images/birthday/little-pizza-chef/pizza-peel.webp" alt="" aria-hidden="true" loading={large ? "eager" : "lazy"} decoding="async" draggable="false" />}
  </div>;
}
