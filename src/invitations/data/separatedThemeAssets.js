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
    background: { color: "#fff5df" },
    components: [
      { id: "playground-cake", image: "/images/birthday/party-doodles/playground/cake.webp", ...at(27, 56, 37, 40), portrait: at(25, 59, 40, 35) },
      { id: "playground-present", image: "/images/birthday/party-doodles/playground/gift.webp", ...at(52, 33, 49, 63), portrait: at(52, 40, 49, 55) },
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
