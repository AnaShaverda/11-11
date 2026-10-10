import { captionValue } from "../../localization/captionValues.js";
import { cardFontRegistry } from '../data/cardTypography.js';
import { getClassicalPaper } from '../data/customClassicalThemes.js';
import ChristeningArtwork, { ChristeningClassicArtwork } from './ChristeningArtwork.jsx';
import EmbossedWaxSeal from './EmbossedWaxSeal.jsx';
import InvitationArtwork from "./InvitationArtwork.jsx";
import { useLanguage } from '../../localization/LanguageContext.jsx';

const themeFonts = { somethingBlue: 'magnola', pressedRose: 'elegance', pearlLetter: 'casmera', lilacWhisper: 'magnola', autumn: 'casmera', rtveli: 'zalino', embossedIvory: 'elegance', embossedSage: 'magnola' };

// Each mask isolates a complete botanical cluster in the transparent source.
// The preview positions these pieces independently without scaling either axis.
const ornamentPieces = {
  somethingBlue: [['top', 'inset(0 0 58% 0)'], ['bottom', 'inset(52% 0 0)']],
  pressedRose: [['top', 'inset(0 39% 0 0)'], ['bottom', 'inset(0 0 0 61%)']],

  pearlLetter: [['top', 'inset(0 0 57% 0)'], ['bottom', 'inset(63% 0 0)']],
  lilacWhisper: [['top', 'inset(0 0 27% 0)'], ['bottom', 'inset(73% 0 0)']],

  autumn: [['top', 'inset(0 0 57% 0)'], ['bottom', 'inset(49% 0 0)']],
  rtveli: [['top', 'inset(0 0 52% 0)'], ['bottom', 'inset(48% 0 0)']],
};

export function weddingThemeStyle(theme) {
  return {
    '--wedding-paper': theme.color,
    '--wedding-display-font': cardFontRegistry[`${themeFonts[theme.id] ?? 'elegance'}-3d`].family,
    '--wedding-reading-font': cardFontRegistry.zalino.family,
    '--wedding-ink': theme.ink,
    '--wedding-accent': theme.accent,
    '--wedding-paper-texture': `url("${getClassicalPaper(theme.embossedPaper ? theme.paper : 'ivory')}")`,
    '--wedding-frame-image': theme.frameAsset ? `url("${theme.frameAsset}")` : 'none',
    '--wedding-font-style': theme.italic ? 'italic' : 'normal',
  };
}

// The complete transparent botanical artwork stays intact at its natural proportions.
function WeddingOrnamentPiece({ theme }) {
  if (!theme.ornamentAsset) return null;
  return <img className="wedding-ornament-composition" src={theme.ornamentAsset} alt="" decoding="async" />;
}

// Full decorative frames belong on the cover; supporting cards use a quiet border.
export default function WeddingThemeDecoration({ theme, adaptive = false, separateOrnaments = false, title, initials }) {
  if (theme.christeningLayout) return <ChristeningClassicArtwork layout={theme.christeningLayout} adaptive={adaptive} />;
  if (theme.artworkTone) return <ChristeningArtwork tone={theme.artworkTone} adaptive={adaptive} />;
  if (theme.embossedPaper) return adaptive ? null : <div className="wedding-artwork wedding-embossed-details" aria-hidden="true">
    <span className="wedding-embossed-flap" />
    <svg className="wedding-embossed-crease" viewBox="0 0 100 150" preserveAspectRatio="none" focusable="false"><path d="M0 0 50 51 100 0" /></svg>
    <EmbossedWaxSeal className="wedding-embossed-seal" title={title} initials={initials} />
  </div>;
  return <div className={`wedding-artwork frame-shape-${theme.frameShape}${adaptive ? ' is-adaptive' : ''}`} aria-hidden="true">
    {adaptive ? <div className="wedding-adaptive-frame" /> : <img className="wedding-frame-full" src={theme.frameAsset} alt="" decoding="async" />}
    {adaptive ? theme.ornamentAsset && (separateOrnaments
      ? (ornamentPieces[theme.id] ?? [['top', 'inset(0)']]).map(([anchor, clipPath], index) =>
        <img key={`${anchor}-${index}`} className={`wedding-preview-ornament wedding-preview-ornament-${anchor}`} src={theme.ornamentAsset} alt="" decoding="async" style={{ clipPath }} />)
      : <>
        <img className="wedding-section-ornament wedding-section-ornament-top" src={theme.ornamentAsset} alt="" decoding="async" />
        <img className="wedding-section-ornament wedding-section-ornament-bottom" src={theme.ornamentAsset} alt="" decoding="async" />
      </>) : <WeddingOrnamentPiece theme={theme} />}
  </div>;
}

export function WeddingThemePreview({ theme, label }) {
  const { language } = useLanguage();
  return <span className={`custom-theme-mini wedding-theme-mini theme-${theme.id}${theme.photoTheme ? ` is-photo-theme tone-${theme.coverTextTone}` : ''}`} style={weddingThemeStyle(theme)} aria-hidden="true">
    {theme.squarePhoto ? <><WeddingThemeDecoration theme={theme} /><span className="baby-theme-preview-photo"><InvitationArtwork name="image" size={28} /></span></> : theme.photoTheme ? <><span className="wedding-portrait-sample"><span className="wedding-photo-prompt"><InvitationArtwork name="image" size={22} /><span>{captionValue("invitations.components.WeddingThemeDecoration.caption1", language)}</span></span></span><span className="wedding-portrait-frame" /></> : <WeddingThemeDecoration theme={theme} />}
    <span className="wedding-theme-mini-copy"><i>{label}</i><b /><small>18 · 06 · 2027</small></span>
  </span>;
}
