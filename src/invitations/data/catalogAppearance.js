// Theme choices describe the existing previews; colors come from their authored palettes.
export const catalogThemeOptions = [
  { id: "simple", tags: ["minimal"] },
  { id: "floral", tags: ["floral"] },
  { id: "photo", tags: ["photographic"] },
  { id: "illustrated", tags: ["cartoon"] },
  { id: "line-art", tags: ["line-art"] },
  { id: "retro", tags: ["retro"] },
  { id: "modern", tags: ["modern"] },
  { id: "rustic", tags: ["earthy"] },
  { id: "coastal", tags: ["coastal"] },
  { id: "pastel", tags: ["pastel"] },
  { id: "metallic", tags: ["metallic"] },
  { id: "neon", tags: ["neon"] },
  { id: "dark", tags: ["dark"] },
  { id: "neutral", tags: ["light-neutral"] },
  { id: "animated", tags: ["animated"] },
];

export const catalogColorOptions = [
  { id: "black", hex: "#171717" }, { id: "gray", hex: "#bdbdbd" },
  { id: "white", hex: "#ffffff" }, { id: "red", hex: "#c92332" },
  { id: "purple", hex: "#763080" }, { id: "pink", hex: "#f1769b" },
  { id: "green", hex: "#347840" }, { id: "light-green", hex: "#99cb88" },
  { id: "blue", hex: "#497fc3" }, { id: "navy", hex: "#28265e" },
  { id: "aqua", hex: "#8fd9e6" }, { id: "gold", hex: "#d4b961" },
  { id: "cream", hex: "#eee8cf" }, { id: "yellow", hex: "#f5e650" },
  { id: "brown", hex: "#764321" }, { id: "peach", hex: "#f8b77e" },
];

function paletteColorId(hex) {
  if (!/^#[\da-f]{6}$/i.test(hex)) return null;
  const [r, g, b] = [1, 3, 5].map((offset) => parseInt(hex.slice(offset, offset + 2), 16) / 255);
  const max = Math.max(r, g, b), min = Math.min(r, g, b), delta = max - min;
  const lightness = (max + min) / 2;
  if (delta < .09) {
    if (max < .25) return "black";
    if (lightness < .8) return "gray";
    return delta < .035 ? "white" : "cream";
  }
  let hue = max === r ? ((g - b) / delta) % 6 : max === g ? (b - r) / delta + 2 : (r - g) / delta + 4;
  hue = (hue * 60 + 360) % 360;
  if (hue < 15 || hue >= 345) return hue >= 10 && hue < 15 && lightness > .64 ? "peach" : lightness > .67 ? "pink" : "red";
  if (hue >= 320) return "pink";
  if (hue < 35) return lightness > .88 ? "cream" : lightness > .64 ? "peach" : "brown";
  if (hue < 70) return lightness > .86 ? "cream" : hue >= 50 && delta > .6 ? "yellow" : "gold";
  if (hue < 165) return lightness > .6 ? "light-green" : "green";
  if (hue < 200) return "aqua";
  if (hue < 260) return lightness < .3 ? "navy" : "blue";
  return "purple";
}

export function getCatalogAppearance(item) {
  return {
    themes: catalogThemeOptions.filter((option) => option.tags.some((tag) => item.styleTags?.includes(tag))).map((option) => option.id),
    colors: [...new Set((item.design?.palette ?? []).map(paletteColorId).filter(Boolean))],
  };
}

export function matchesCatalogAppearance(item, { themes = [], colors = [] }) {
  const appearance = getCatalogAppearance(item);
  return (!themes.length || themes.some((id) => appearance.themes.includes(id)))
    && (!colors.length || colors.some((id) => appearance.colors.includes(id)));
}

export function readCatalogAppearance(searchParams, legacyStyle = "all") {
  function readChoices(key, options) {
    const requested = new Set((searchParams.get(key) ?? "").split(","));
    return options.filter((option) => requested.has(option.id)).map((option) => option.id);
  }
  if (searchParams.has("themes") || searchParams.has("colors")) {
    return { themes: readChoices("themes", catalogThemeOptions), colors: readChoices("colors", catalogColorOptions) };
  }
  const theme = catalogThemeOptions.find((option) => option.tags.includes(legacyStyle));
  const color = catalogColorOptions.find((option) => option.id === legacyStyle);
  return { themes: theme ? [theme.id] : [], colors: color ? [color.id] : [] };
}
