import { selectedBridalThemes } from "../../invitations/data/selectedBridalDesigns.js";
import { pinkChampagneBirthdayThemes, pinkChampagneBridalThemes } from "../../invitations/data/pinkChampagneDesigns.js";
import { cocktailBirthdayThemes } from "../../invitations/data/cocktailBirthdayDesigns.js";
import { applyThemeStatus } from "./themeStatus.js";
import { birthdayThemes as existingBirthdayThemes, weddingThemes, celebrationThemes as existingCelebrationThemes, isThemeActive } from "./themes.js";
import { comicBirthdayThemes } from "../../invitations/data/comicBirthdayDesigns.js";
import { poolBirthdayThemes } from "../../invitations/data/poolBirthdayDesigns.js";
import { pizzaBirthdayThemes } from "../../invitations/data/pizzaBirthdayDesigns.js";

// Keep new collections separate from the established visibility configuration.
// Deduplication also supports moving a collection into the base registry later.
export const birthdayThemes = [...new Map(
  [...existingBirthdayThemes, ...comicBirthdayThemes, ...poolBirthdayThemes, ...pizzaBirthdayThemes, ...cocktailBirthdayThemes, ...pinkChampagneBirthdayThemes]
    .map((theme) => [theme.id, applyThemeStatus(theme)]),
).values()];
export const celebrationThemes = [...new Map(
  [...existingCelebrationThemes, ...pinkChampagneBridalThemes, ...selectedBridalThemes].map((theme) => [theme.id, applyThemeStatus(theme)]),
).values()];
export { weddingThemes, isThemeActive };
export const themes = [...birthdayThemes, ...weddingThemes, ...celebrationThemes];
export const activeThemes = themes.filter(isThemeActive);
export function getThemeBySlug(slug) {
  return themes.find((theme) => theme.slug === slug);
}
