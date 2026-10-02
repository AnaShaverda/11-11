import { invitationStyleOptions } from "./invitationStyles.js";

const legacyStyleKeys = ["birthdayStyle", "weddingStyle", "corporateStyle", "otherStyle"];

export function readCatalogFilters(searchParams, category) {
  const requestedStyle = searchParams.get("style") ?? (category
    ? searchParams.get(`${category}Style`)
    : legacyStyleKeys.map((key) => searchParams.get(key)).find(Boolean));
  return {
    style: invitationStyleOptions.some((option) => option.id === requestedStyle) ? requestedStyle : "all",
  };
}

export function updateCatalogFilters(searchParams, changes) {
  const next = new URLSearchParams(searchParams);
  next.delete("q");
  for (const key of legacyStyleKeys) next.delete(key);
  for (const [key, value] of Object.entries(changes)) {
    const normalized = value.trim();
    if (!normalized || (key === "style" && normalized === "all")) next.delete(key);
    else next.set(key, normalized);
  }
  return next;
}
