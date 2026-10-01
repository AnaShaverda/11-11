import { invitationTemplates } from "../invitations/data/templates.js";
import { themes } from "./data/themes.js";
import { normalizeBirthdayAsset } from "../invitations/data/assetPresentation.js";

// Resolve through the existing template mapping: a storefront slug is not a theme ID.
export function getThemePresentation(themeId) {
  const theme = themes.find((item) => item.id === themeId);
  const template = invitationTemplates.find((item) => item.themeId === themeId);
  if (!theme || !template) return null;
  const [paper, ink, accent, secondary] = template.design.palette;
  const assets = template.visualAssets;
  const decoration = [assets?.pattern, assets?.typography, assets?.invitation].flat().map(normalizeBirthdayAsset).find(Boolean)?.image;
  return { theme, template, decoration, className: `theme-canvas theme-${theme.visual} interaction-theme interaction-pattern-${template.design.pattern}`, style: { "--theme-bg": paper, "--theme-ink": ink, "--theme-accent": accent, "--theme-secondary": secondary, "--theme-panel": paper, "--theme-stroke": `color-mix(in srgb, ${ink} 24%, transparent)`, ...(assets?.coverImage ? { "--interaction-cover": `url("${assets.coverImage}")` } : {}) } };
}
