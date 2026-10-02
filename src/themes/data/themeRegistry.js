import { applyThemeStatus } from "./themeStatus.js";
import { birthdayThemes as existingBirthdayThemes, weddingThemes, celebrationThemes, isThemeActive } from "./themes.js";
import { comicBirthdayThemes } from "../../invitations/data/comicBirthdayDesigns.js";
import { poolBirthdayThemes } from "../../invitations/data/poolBirthdayDesigns.js";

// Keep new collections separate from the established visibility configuration.
// Deduplication also supports moving a collection into the base registry later.
export const birthdayThemes = [...new Map(
  [...existingBirthdayThemes, ...comicBirthdayThemes, ...poolBirthdayThemes]
    .map((theme) => [theme.id, applyThemeStatus(theme)]),
).values()];
export { weddingThemes, celebrationThemes, isThemeActive };
export const themes = [...birthdayThemes, ...weddingThemes, ...celebrationThemes];
export const activeThemes = themes.filter(isThemeActive);
export function getThemeBySlug(slug) {
  return themes.find((theme) => theme.slug === slug);
}
