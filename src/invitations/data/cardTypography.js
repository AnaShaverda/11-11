// Display fonts belong to the invitation artwork, never to the surrounding UI.
// Bold retro, sporting and digital designs retain their existing typography.
const cardFonts = {
  "classic-celebration": "casmera",
  "floral-affair": "casmera",
  "garden-party": "magnola",
  coquette: "magnola",
  ballerina: "magnola",
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
};

const formalWeddings = new Set([
  "editorial", "ivory-vows", "garden-table", "little-vows", "rose-letter",
  "sage-letter", "portrait-promise", "golden-promise", "ring-and-spark",
  "watercolor-banquet", "wedding-day-notes", "date-and-dinner", "first-dance",
]);

const handwrittenAccents = new Set([
  "pastel-dream",
  "bridal-dream-doll-bride", "bridal-pink-tea-club", "bridal-doll-pink-card",
  "bridal-pink-cocktail-card", "christening-blush-grace", "christening-blush-petals",
]);

export function getCardTypography(template) {
  const visual = template.previewArt;
  const display = visual.startsWith("christening-")
    ? "magnola"
    : cardFonts[visual] ?? (formalWeddings.has(visual) ? "zalino" : undefined);

  return {
    display,
    accent: handwrittenAccents.has(visual) ? "birthday" : undefined,
  };
}
