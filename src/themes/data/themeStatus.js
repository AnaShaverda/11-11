// Visibility settings are kept separate from artwork and design metadata.
export const themeStatusOverrides = {
  "wedding-little-yes": "inactive",
  "wedding-garden-table": "inactive",
  "wedding-ribbon-revel": "inactive",
  "wedding-side-by-side": "inactive",
  "wedding-first-dance": "inactive",
  "wedding-day-notes": "inactive",
  "birthday-pastel-disco": "inactive",
  "birthday-coquette": "inactive",
  "birthday-garden-party": "inactive",
  "bridal-dream-doll-bride": "inactive",
  "wedding-blush-lift": "inactive",
  "bridal-pink-tea-club": "inactive",
  "birthday-race-day": "inactive",
  "birthday-dino-adventure": "inactive",
  "birthday-space-explorer": "inactive",
  "birthday-football-club": "inactive",
  "birthday-classic-celebration": "inactive",
  "birthday-pastel-dream": "inactive",
  "birthday-ballerina": "inactive",
  "birthday-beer-party": "inactive",
  "birthday-tropical-summer": "inactive",
  "birthday-painted-summer": "inactive",
  "birthday-floral-affair": "inactive",
};

export function applyThemeStatus(theme) {
  return { ...theme, status: themeStatusOverrides[theme.id] ?? theme.status ?? "active" };
}
