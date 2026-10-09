import generatedThemeLayers from "./generatedThemeLayers.json" with { type: "json" };
import { applyResponsiveThemeLayout } from "./responsiveThemeLayouts.js";

const component = (id, placement, portrait) => ({
  id,
  image: `/images/components/separated/${id}.webp`,
  ...placement,
  ...(portrait ? { portrait } : {}),
});
const at = (left, top, width, height) => ({ left: `${left}%`, top: `${top}%`, width: `${width}%`, height: `${height}%` });

// Background, each independently movable ornament, and localized text are separate layers.
const themeAssets = {
  ...generatedThemeLayers,
  "birthday-ribbon-sketch": {
    background: { color: "#fbd5de" },
    components: [
      component("ribbon-frame", at(0, 0, 100, 100), { ...at(0, 0, 100, 100), objectFit: "fill" }),
      component("red-heart", at(45, 84, 10, 10), at(43, 85, 14, 8)),
    ],
  },
  "birthday-playground": {
    background: { color: "#fff5df" },
    components: [
      { id: "playground-cake", image: "/images/birthday/playground/cake.webp", ...at(27, 56, 37, 40), portrait: at(25, 59, 40, 35) },
      { id: "playground-present", image: "/images/birthday/playground/gift.webp", ...at(52, 33, 49, 63), portrait: at(52, 40, 49, 55) },
    ],
  },
  "birthday-white-and-blue": {
    background: { color: "#ffffff" },
    components: [
      component("blue-frame", at(0, 0, 100, 100), { ...at(0, 0, 100, 100), objectFit: "fill" }),
      component("blue-cake", at(33, 5, 34, 40), at(24, 6, 52, 35)),
    ],
  },

};

export const separatedThemeAssets = Object.fromEntries(Object.entries(themeAssets).map(([slug, assets]) => [slug, applyResponsiveThemeLayout(slug, assets)]));

export function getSeparatedBackground(assets, presentation = "square") {
  const { portrait, ...background } = assets.background;
  return { ...background, ...(presentation === "portrait" ? portrait : {}) };
}

export function getSeparatedComponents(assets, presentation = "square") {
  const components = presentation === "portrait" && assets.portraitComponents ? assets.portraitComponents : assets.components;
  const resolve = ({ portrait, ...asset }) => {
    const resolved = { ...asset, ...(presentation === "portrait" ? portrait : {}) };
    return resolved.components ? { ...resolved, components: resolved.components.map(resolve) } : resolved;
  };
  return components.map(resolve);
}
