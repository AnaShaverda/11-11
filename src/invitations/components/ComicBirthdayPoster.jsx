import { useLanguage } from "../../localization/LanguageContext.jsx";
import { comicBirthdaySamples } from "../data/comicBirthdayDesigns.js";
import { getInvitationSample } from "../../localization/cardCopy.js";

export default function ComicBirthdayPoster({ sample, variant }) {
  const { t } = useLanguage();
  const defaults = getInvitationSample(`birthday-${variant}`, t) ?? comicBirthdaySamples[`birthday-${variant}`];
  const age = sample.posterAge ?? sample.age ?? defaults.posterAge;
  const name = sample.posterName ?? sample.name ?? defaults.posterName;
  const headline = sample.headline ?? defaults.headline;
  const ageInHost = variant === "comic-cutout" || variant === "upside-down";
  return (
    <div className={`comic-birthday-copy comic-copy-${variant}`}>
      <span className="comic-opening">{sample.opening ?? defaults.opening}</span>
      <strong className="comic-title">{headline.split("\n").map((line, index) => <span key={index}>{line}</span>)}</strong>
      <span className="comic-host">{name}<span>{ageInHost ? t("modernToast.turns", { age }) : t("comicBirthday.turns")}</span></span>
      {!ageInHost && <strong className="comic-age">{age}</strong>}
      <span className="comic-details"><span>{sample.date}</span><span>{sample.time ?? defaults.time}</span><span>{sample.location}</span></span>
      {variant === "retro-sport" && <span className="comic-footer">{defaults.line}</span>}
    </div>
  );
}
