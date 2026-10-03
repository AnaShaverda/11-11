import { useLanguage } from "../../localization/LanguageContext.jsx";
import { getInvitationSample } from "../../localization/cardCopy.js";
import { getDesignFont } from "../data/cardTypography.js";
import SeparatedForeground from "./SeparatedForeground.jsx";

export default function SelectedBridalPoster({ sample, slug, large, assets, components }) {
  const { t, language } = useLanguage();
  const defaults = getInvitationSample(slug, t);
  const { key, mode, font, artwork, stripeImage, labelBox, labelInk } = assets;
  const title = <strong className="selected-bride-title">{sample.headline ?? defaults.headline}</strong>;
  const host = <span className="selected-bride-host">{sample.opening ?? defaults.opening}<br />{sample.posterName ?? sample.name ?? defaults.posterName}</span>;
  const details = <span className="selected-bride-details">{sample.date}<br />{sample.time ?? defaults.time} · {sample.location}</span>;
  const foreground = components
    ? <SeparatedForeground className="selected-bride-foreground" assets={components} eager={large} />
    : <img className="selected-bride-foreground" src={artwork} alt="" aria-hidden="true" loading={large ? "eager" : "lazy"} decoding="async" draggable="false" />;
  return <div className={`selected-bridal-poster selected-mode-${mode} selected-${key}`} style={getDesignFont(font, language).style}>
    {mode === "label" ? <div className="selected-bride-stage">
      {foreground}
      <div className="selected-bridal-copy selected-bride-label" style={{ left: `${labelBox[0]}%`, top: `${labelBox[1]}%`, width: `${labelBox[2]}%`, height: `${labelBox[3]}%`, color: labelInk }}>
        {title}{host}{details}
      </div>
    </div> : <>
      {stripeImage && <img className="selected-bride-stripes" src={stripeImage} alt="" aria-hidden="true" loading={large ? "eager" : "lazy"} decoding="async" />}
      {foreground}
      <div className="selected-bridal-copy">{title}{host}{details}</div>
    </>}
  </div>;
}
