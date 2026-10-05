import { cardFontRegistry } from '../data/cardTypography.js';
import { getClassicalPaper } from '../data/customClassicalThemes.js';

const themeFonts = { silkIvory: 'elegance', somethingBlue: 'magnola', pressedRose: 'elegance', gardenVeil: 'zalino', pearlLetter: 'casmera', lilacWhisper: 'magnola', champagneVows: 'casmera', vellumPromise: 'elegance', quietParchment: 'zalino', meadowMorning: 'magnola', autumn: 'casmera', rtveli: 'zalino' };

export function weddingThemeStyle(theme) {
  return {
    '--wedding-paper': theme.color,
    '--wedding-display-font': cardFontRegistry[`${themeFonts[theme.id] ?? 'elegance'}-3d`].family,
    '--wedding-reading-font': cardFontRegistry.zalino.family,
    '--wedding-ink': theme.ink,
    '--wedding-accent': theme.accent,
    '--wedding-paper-texture': `url("${getClassicalPaper('ivory')}")`,
    '--wedding-frame-image': `url("${theme.frameAsset}")`,
    '--wedding-font-style': theme.italic ? 'italic' : 'normal',
  };
}

// The complete transparent botanical artwork stays intact at its natural proportions.
function WeddingOrnamentPiece({ theme }) {
  if (!theme.ornamentAsset) return null;
  return <img className="wedding-ornament-composition" src={theme.ornamentAsset} alt="" decoding="async" />;
}

// Full decorative frames belong on the cover; supporting cards use a quiet border.
export default function WeddingThemeDecoration({ theme, adaptive = false }) {
  return <div className={`wedding-artwork frame-shape-${theme.frameShape}${adaptive ? ' is-adaptive' : ''}`} aria-hidden="true">
    {adaptive ? <div className="wedding-adaptive-frame" /> : <img className="wedding-frame-full" src={theme.frameAsset} alt="" decoding="async" />}
    {adaptive ? theme.ornamentAsset && <>
      <img className="wedding-section-ornament wedding-section-ornament-top" src={theme.ornamentAsset} alt="" decoding="async" />
      <img className="wedding-section-ornament wedding-section-ornament-bottom" src={theme.ornamentAsset} alt="" decoding="async" />
    </> : <WeddingOrnamentPiece theme={theme} />}
  </div>;
}

export function WeddingThemePreview({ theme, label }) {
  return <span className={`custom-theme-mini wedding-theme-mini theme-${theme.id}${theme.photoTheme ? ` is-photo-theme tone-${theme.coverTextTone}` : ''}`} style={weddingThemeStyle(theme)} aria-hidden="true">
    {theme.photoTheme ? <><span className="wedding-portrait-sample" style={{ backgroundImage: `url("${theme.coverSample}")` }} /><span className="wedding-portrait-frame" /></> : <WeddingThemeDecoration theme={theme} />}
    <span className="wedding-theme-mini-copy"><i>{label}</i><b /><small>18 · 06 · 2027</small></span>
  </span>;
}
