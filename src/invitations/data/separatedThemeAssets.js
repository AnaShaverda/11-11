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
  "birthday-party-doodles": {
    background: { color: "#fffaf3" },
    components: [
      component("red-cake", at(3, 1, 29, 35), at(3, 3, 35, 27)),
      component("red-gift", at(3, 66, 29, 31), at(3, 72, 35, 24)),
      component("red-loose-bow", at(74, 1, 24, 26), at(71, 3, 27, 21)),
      component("red-heart", at(76, 20, 7, 10), at(72, 20, 10, 8)),
      component("red-starburst", at(90, 28, 9, 13), at(87, 29, 11, 9)),
      { ...component("red-heart", at(88, 74, 10, 13), at(86, 79, 12, 9)), id: "red-heart-lower" },
      { ...component("red-starburst", at(77, 80, 9, 13), at(74, 86, 11, 9)), id: "red-starburst-lower" },
    ],
  },
  "birthday-white-and-blue": {
    background: { color: "#ffffff" },
    components: [
      component("blue-frame", at(0, 0, 100, 100), { ...at(0, 0, 100, 100), objectFit: "fill" }),
      component("blue-cake", at(33, 5, 34, 40), at(24, 6, 52, 35)),
    ],
  },
  "birthday-pink-minimal": {
    background: { color: "#f9d0d9" },
    components: [
      {
        id: "bow-cherries-assembly",
        ...at(10, 42, 80, 45),
        portrait: at(10, 42, 80, 38),
        aspectRatio: 4 / 3,
        // The stem loop and bow knot share one anchor in this fixed-ratio canvas.
        components: [
          component("burgundy-bow", at(20, 0, 60, 59.2445)),
          component("burgundy-cherries", at(11.84, 10.094, 74, 83.7918)),
        ],
      },
      component("burgundy-heart", at(21, 54, 8, 10), at(10, 54, 12, 8)),
      { ...component("burgundy-heart", at(71, 62, 8, 10), at(79, 60, 12, 8)), id: "burgundy-heart-right", rotation: 10 },
      component("burgundy-waves", at(0, 90, 100, 8), at(0, 92, 100, 5)),
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
