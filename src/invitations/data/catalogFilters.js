import { getCelebrationSubcategory, projects } from "../../data/projects.js";
import { invitationStyleOptions } from "./invitationStyles.js";

const legacyStyleKeys = ["birthdayStyle", "weddingStyle", "corporateStyle", "otherStyle"];

export function readCatalogCategory(searchParams) {
  const requested = (searchParams.get("category") ?? searchParams.get("type"))?.toLowerCase();
  return projects.find((project) => project.id === requested || project.slug === requested) ?? null;
}

export function getInvitationCatalogLink(category = null, searchParams = new URLSearchParams()) {
  const currentCategory = readCatalogCategory(searchParams) ?? category;
  const { style } = readCatalogFilters(searchParams, currentCategory?.id);
  const next = updateCatalogFilters(searchParams, { category: category?.id ?? "all", style });
  next.delete("type");
  // Occasion refines Other Celebrations only; All can retain that refinement.
  if (category && category.id !== "other") next.delete("occasion");
  return { pathname: "/invitations", search: next.toString() };
}

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
    if (!normalized || (["category", "style", "occasion"].includes(key) && normalized === "all")) next.delete(key);
    else next.set(key, normalized);
  }
  return next;
}

export function readCatalogOccasion(searchParams) {
  const requested = searchParams.get("occasion");
  return getCelebrationSubcategory(requested) ? requested : "all";
}
