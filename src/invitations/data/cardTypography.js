// Display fonts belong to the invitation artwork, never to the surrounding UI.
// Each theme has a downloaded Latin display and a Georgian companion.
// The assignment and CSS weight stay the same when the language changes.
const cardFonts = {
  "pink-post": "magnola",
  "velvet-post": "elegance",
  "disco-scrapbook": "casmera",
  "paper-garland": "magnola",
  "pastel-disco": "elegance",
  "strawberry-social": "casmera",
  "pink-glam": "elegance",
  "tropical-summer": "casmera",
  "painted-summer": "magnola",
  "classic-celebration": "casmera",
  "floral-affair": "casmera",
  "garden-party": "magnola",
  coquette: "birthday",
  ballerina: "birthday",
  "pastel-dream": "magnola",
  "modern-toast": "zalino",
  "supper-club": "zalino",
  "ribbon-social": "elegance",
  "cherry-toast": "casmera",
  "little-yes": "magnola",
  "blush-lift": "elegance",
  "pink-disco-bride": "elegance",
  "bridal-dream-doll-bride": "elegance",
  "bridal-pink-tea-club": "magnola",
  "bridal-rose-supper-club": "elegance",
  "bridal-doll-pink-card": "elegance",
  "bridal-pink-cocktail-card": "elegance",
  "bridal-modern-pink-line-card": "casmera",
  "bridal-cool-girl-card": "zalino",
  "bridal-pink-disco-scrapbook": "elegance",
  "pink-disco-lines": "casmera",
  "sweet-snapshot": "birthday",
  "happy-table": "casmera",
  "garden-dance": "magnola",
  "ink-and-ivy": "casmera",
  "ribbon-revel": "elegance",
  "linked-steps": "magnola",
  "side-by-side": "magnola",
  "come-rain-or-shine": "casmera",
  "heartmarked": "elegance",
  "blue-clink": "magnola",
  "blue-pour": "casmera",
  "heart-hideaway": "elegance",
  "tipsy-together": "casmera",
  "colorful-company": "magnola",
  "tiny-footprints": "magnola",
  "little-wonder": "magnola",
  "bear-hug": "magnola",
  "special-delivery": "casmera",
  "up-in-the-air": "magnola",
  "little-surprise": "magnola",
  "ribbon-surprise": "elegance",
  "pink-or-blue": "magnola",
};

const formalWeddings = new Set([
  "editorial", "ivory-vows", "garden-table", "little-vows", "rose-letter",
  "sage-letter", "portrait-promise", "golden-promise", "ring-and-spark",
  "watercolor-banquet", "wedding-day-notes", "date-and-dinner", "first-dance",
]);

const handwrittenAccents = new Set([
  "pastel-dream",
  "pink-post", "garden-party", "painted-summer", "pink-disco-bride", "blush-lift",
  "bridal-dream-doll-bride", "bridal-pink-tea-club", "bridal-doll-pink-card",
  "bridal-pink-cocktail-card", "christening-blush-grace", "christening-blush-petals",
  "bridal-retro-pink-card", "bridal-pink-disco-dream-card", "bridal-pink-disco-dream",
  "bridal-malibu-bride", "bridal-peach-cherry",
]);

const retroOpenings = new Set([
  "retro-pop", "checkerboard-cheers", "paper-garland", "bridal-retro-pink-card",
  "bridal-pink-disco-dream-card", "bridal-pink-disco-dream", "bridal-malibu-bride",
  "bridal-peach-cherry", "disco-scrapbook", "pink-disco-lines",
]);
const modernOpenings = new Set([
  "y2k-digital", "football-club", "race-day", "space-explorer", "dino-adventure",
  "cobalt-cheers", "bridal-electric-pink", "bridal-cool-girl-card", "beer-party",
  "khinkali-beer",
]);
const scriptOpenings = new Set([
  "pink-post", "painted-summer", "garden-party", "velvet-post", "floral-affair",
  "pink-glam", "ribbon-social", "pink-disco-bride", "blush-lift",
  "bridal-dream-doll-bride", "bridal-pink-tea-club", "bridal-doll-pink-card",
  "bridal-pink-cocktail-card", "bridal-rose-supper-club",
  "christening-blush-grace", "christening-blush-petals",
]);

// Georgian 3D lettering belongs to classic stationery, Velvet Post and Y2K.
const threeDHeadings = new Set([
  "velvet-post", "classic-celebration", "ribbon-sketch", "paper-garland", "y2k-digital",
]);

export function formatCardOpening(text, language, font) {
  return font === "birthday" && language === "en"
    ? text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
    : text;
}

export function getCardTypography(template) {
  const visual = template.previewArt;
  const display = template.visualAssets?.selectedBridal?.font
    ?? (["midnight-martini", "peach-fizz", "pink-pop", "cherry-tower", "bridal-pink-pop", "bridal-cherry-tower"].includes(visual)
    ? "cocktail"
    : ["city-after-dark", "comic-cutout", "retro-sport", "upside-down"].includes(visual)
    ? "comic"
    : ["pink-lido", "blue-splash", "little-pizza-chef", "slice-club"].includes(visual)
    ? "pool"
    : visual.startsWith("christening-")
    ? "magnola"
    : cardFonts[visual]
      ?? ({ "ribbon-sketch": "zalino", "playground": "playground", "white-and-blue": "magnola", "pink-minimal": "casmera" }[visual])
      ?? (modernOpenings.has(visual) ? "zalino"
        : retroOpenings.has(visual) ? "casmera"
        : formalWeddings.has(visual) ? "zalino" : "casmera"));

  return {
    display: threeDHeadings.has(visual) ? `${display}-3d` : display,
    accent: handwrittenAccents.has(visual) ? "birthday" : undefined,
    opening: retroOpenings.has(visual) ? "casmera"
      : modernOpenings.has(visual) ? "zalino"
      : scriptOpenings.has(visual) ? "birthday"
      : display === "birthday" ? "magnola"
      : display === "zalino" ? "elegance"
      : display ?? "casmera",
  };
}

// These are the five supplied families, with downloaded Georgian companions.
export const cardFontRegistry = {
  "painted-party": { name: "Comic Lilita", georgian: "BPG Gorda", family: '"Comic Lilita", "BPG Gorda", sans-serif', weight: 400 },
  cocktail: { name: "Comic Anton", georgian: "BPG Gorda", family: '"Comic Anton", "BPG Gorda", sans-serif', weight: 400 },
  comic: { name: "Comic Anton", georgian: "BPG Gorda", family: '"Comic Anton", "BPG Gorda", sans-serif', weight: 400 },
  pool: { name: "Pool Kalam", georgian: "BPG Irubaqidze", family: '"Pool Kalam", "BPG Irubaqidze", "Noto Serif Georgian"', weight: 700 },
  casmera: { name: "Casmera Demo", georgian: "BPG Gorda", family: '"Casmera Demo", "BPG Gorda", "Noto Serif Georgian"', weight: 400 },
  magnola: { name: "Magnola Demo", georgian: "BPG Chveulebrivi", family: '"Magnola Demo", "BPG Chveulebrivi", "Noto Serif Georgian"', weight: 400 },
  zalino: { name: "Zalino", georgian: "BPG Serif Modern", family: '"Zalino", "BPG Serif Modern", "Noto Serif Georgian"', weight: 400 },
  elegance: { name: "Elegance Natural Valentine", georgian: "BPG Nateli", family: '"Elegance Natural Valentine", "BPG Nateli", "Noto Serif Georgian"', weight: 400 },
  birthday: { name: "Birthday", georgian: "BPG Irubaqidze", family: '"Birthday", "BPG Irubaqidze", "Noto Serif Georgian"', weight: 400 },
  "elegance-3d": { name: "Elegance Natural Valentine", georgian: "3D Unicode", family: '"Elegance Natural Valentine", "3D Unicode", "BPG Nateli", "Noto Serif Georgian"', weight: 400 },
  "zalino-3d": { name: "Zalino", georgian: "3D Unicode", family: '"Zalino", "3D Unicode", "BPG Serif Modern", "Noto Serif Georgian"', weight: 400 },
  "casmera-3d": { name: "Casmera Demo", georgian: "3D Unicode", family: '"Casmera Demo", "3D Unicode", "BPG Gorda", "Noto Serif Georgian"', weight: 400 },
  "magnola-3d": { name: "Magnola Demo", georgian: "3D Unicode", family: '"Magnola Demo", "3D Unicode", "BPG Chveulebrivi", "Noto Serif Georgian"', weight: 400 },
};

export function getDesignTypography(template) {
  const typography = getCardTypography(template);
  return {
    display: typography.display,
    details: "zalino",
    opening: typography.opening,
    accent: template.previewArt === "white-and-blue" ? "birthday" : typography.accent,
  };
}

export function getDesignFont(key, language, weight) {
  const font = cardFontRegistry[key];
  return {
    name: font.name,
    style: {
      "--design-font-family": font.family,
      ...(weight === undefined ? {} : { fontWeight: weight }),
      "--design-font-tracking": "0em",
      "--design-font-features": '"kern" 1',
    },
  };
}
