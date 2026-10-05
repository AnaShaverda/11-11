import WeddingThemeDecoration, { weddingThemeStyle } from "./WeddingThemeDecoration.jsx";
import { classicalThemes, getClassicalTheme, footerScenes } from "../data/customClassicalThemes.js";

export const coverFrames = ["arch", "engraved", "botanical", "oval", "classic", "minimal", "film", "laurelCorners", "scrollwork", "regal"];
export const lightCoverColors = new Set([...classicalThemes.map(theme => theme.color), "#f6f1e7", "#eee6d8", "#e4e9df", "#e8e4ef", "#e2eaf0", "#e9dddd"]);
export const coverPatterns = ["plain", "stripes", "contours", "grid", "deco"];

const legacyPatterns = { floral: "contours", confetti: "deco", stars: "grid" };
export function normalizeCustomDesign(value, defaults = {}) {
  const theme = getClassicalTheme(value?.theme ?? defaults.theme);
  const footerScene = value?.footerScene === "none" || Object.hasOwn(footerScenes, value?.footerScene) ? value.footerScene : theme.footerScene ?? "none";
  const requestedPattern = theme.pattern;
  const pattern = legacyPatterns[requestedPattern] ?? requestedPattern;
  return {
    coverImage: typeof value?.coverImage === "string" ? value.coverImage : "",
    theme: theme.id,
    coverTextTone: theme.coverTextTone === "dark" ? "dark" : "light",
    photoLayout: value?.photoLayout === "framed" ? "framed" : "full",
    scene: "",
    paper: theme.paper,
    footerScene,
    showFooter: typeof value?.showFooter === "boolean" ? value.showFooter : footerScene !== "none",
    ornament: theme.ornament ?? "",
    ornamentTone: theme.ornamentTone ?? "ivory",
    frame: theme.frame,
    color: theme.color,
    pattern: coverPatterns.includes(pattern) ? pattern : "plain",
    font: theme.font,
    layout: theme.layout,
    position: 50,
    zoom: 100,
    rotation: 0,
  };
}

export default function CustomInvitationCover({ design, sample, invitationLabel, invitationGreeting }) {
  const theme = getClassicalTheme(design.theme);
  const image = design.coverImage;
  const framedPhoto = image && design.photoLayout === "framed";
  const coverHeading = sample.opening || invitationGreeting || invitationLabel;
  if (theme.photoTheme) return <div className={`custom-invitation-cover wedding-cover wedding-portrait-cover tone-${design.coverTextTone}`} style={weddingThemeStyle(theme)}>
    {image ? <img className="wedding-portrait-photo" src={image} alt={sample.title} /> : <div className="wedding-portrait-sample" style={{ backgroundImage: `url("${theme.coverSample}")` }} aria-hidden="true" />}
    <div className="wedding-portrait-frame" aria-hidden="true" />
    <div className="custom-cover-copy"><small>{coverHeading}</small><strong>{sample.title}</strong><span className="wedding-cover-date">{sample.displayDate || sample.date}</span></div>
  </div>;

  return <div className={`custom-invitation-cover wedding-cover theme-${theme.id}${image ? ' has-photo' : ''}${framedPhoto ? ' is-framed-photo' : ''}`} style={weddingThemeStyle(theme)}>
    {image && !framedPhoto && <img className="wedding-full-cover-photo" src={image} alt={sample.title} style={{ objectPosition: `50% ${design.position}%`, transform: `scale(${design.zoom / 100}) rotate(${design.rotation}deg)` }} />}
    {(!image || framedPhoto) && <WeddingThemeDecoration theme={theme} />}
    <div className="custom-cover-copy">
      {framedPhoto && <div className="wedding-cover-photo"><img src={image} alt={sample.title} style={{ transform: `scale(${design.zoom / 100}) rotate(${design.rotation}deg)` }} /></div>}
      <small>{coverHeading}</small>
      <strong>{sample.title}</strong>
      <span className="wedding-cover-date">{sample.displayDate || sample.date}</span>
    </div>
  </div>;
}
