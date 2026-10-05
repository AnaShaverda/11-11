import { classicalOrnaments, classicalPapers, classicalThemes, footerScenes, getClassicalOrnament, getClassicalPaper, ornamentTones } from "../data/customClassicalThemes.js";

export const coverFrames = ["arch", "engraved", "botanical", "oval", "classic", "minimal", "film"];
export const coverColors = ["#76554b", "#46594c", "#253c56", "#7b5874", "#8b6b36", "#986579", "#637e80", "#485361", "#707b84", "#ad8290", "#839d87", "#9283a8", "#829db6"];
export const coverPatterns = ["plain", "floral", "confetti", "stars", "stripes"];
export const coverFonts = ["serif", "modern", "playful"];
export const coverLayouts = ["bottom", "center"];

export function normalizeCustomDesign(value, defaults = {}) {
  return {
    coverImage: typeof value?.coverImage === "string" ? value.coverImage : "",
    theme: classicalThemes.some(theme => theme.id === value?.theme) ? value.theme : "",
    scene: "",
    paper: Object.hasOwn(classicalPapers, value?.paper) ? value.paper : "",
    footerScene: Object.hasOwn(footerScenes, value?.footerScene) ? value.footerScene : value?.footerScene === "none" ? "none" : classicalThemes.find(theme => theme.id === value?.theme)?.footerScene ?? "none",
    ornament: Object.hasOwn(classicalOrnaments, value?.ornament) ? value.ornament : "",
    ornamentTone: Object.hasOwn(ornamentTones, value?.ornamentTone) ? value.ornamentTone : "ivory",
    frame: coverFrames.includes(value?.frame) ? value.frame : "arch",
    color: coverColors.includes(value?.color) ? value.color : defaults.color ?? coverColors[0],
    pattern: coverPatterns.includes(value?.pattern) ? value.pattern : defaults.pattern ?? "floral",
    font: coverFonts.includes(value?.font) ? value.font : "serif",
    layout: coverLayouts.includes(value?.layout) ? value.layout : "bottom",
    position: Number.isFinite(Number(value?.position)) ? Math.min(100, Math.max(0, Number(value.position))) : 50,
    zoom: Number.isFinite(Number(value?.zoom)) ? Math.min(180, Math.max(100, Number(value.zoom))) : 100,
    rotation: Number.isFinite(Number(value?.rotation)) ? Math.min(20, Math.max(-20, Number(value.rotation))) : 0,
  };
}

export default function CustomInvitationCover({ design, sample, invitationLabel }) {
  const image = design.coverImage;
  const paper = getClassicalPaper(design.paper);
  const ornament = getClassicalOrnament(design.ornament);
  return <div className={`custom-invitation-cover frame-${design.frame} pattern-${design.pattern} font-${design.font} layout-${design.layout} ornament-${design.ornament || "none"}${image ? " has-photo" : ""}${ornament ? " has-ornament" : ""}`} style={{ "--custom-cover-color": design.color, "--custom-cover-paper": paper ? `url("${paper}")` : "none", "--custom-ornament-color": ornamentTones[design.ornamentTone] ?? ornamentTones.ivory }}>
    {image && <img className="custom-cover-image" src={image} alt="" style={design.coverImage ? { objectPosition: `50% ${design.position}%`, transform: `scale(${design.zoom / 100}) rotate(${design.rotation}deg)` } : undefined} />}
    <div className="custom-cover-pattern" aria-hidden="true"><i /><i /><i /><i /><i /><i /></div>
    <div className="custom-cover-vignette" />
    {ornament && <div className="custom-cover-ornament" style={{ "--custom-ornament-image": `url("${ornament}")` }} aria-hidden="true" />}
    <div className="custom-cover-frame" aria-hidden="true"><span /><span /><span /><span /></div>
    <div className="custom-cover-copy">
      <small>{sample.opening || invitationLabel}</small>
      <strong>{sample.title}</strong>
      {sample.line && <em>{sample.line}</em>}
      <span>{sample.displayDate || sample.date}</span>
    </div>
  </div>;
}
