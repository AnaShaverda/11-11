import { getCelebrationSubcategory, normalizeOccasion, projects } from "../../data/projects.js";
import { invitationStyleOptions } from "./invitationStyles.js";

export const onlineOrderCategory = { id: "order-online", slug: "order-online", captionKey: "nav.orderOnline" };

const legacyStyleKeys = ["birthdayStyle", "weddingStyle", "corporateStyle", "otherStyle"];

export function readCatalogCategory(searchParams) {
  const requested = (searchParams.get("category") ?? searchParams.get("type"))?.toLowerCase();
  if (requested === onlineOrderCategory.id) return onlineOrderCategory;
  if (["other", "other-celebrations"].includes(requested)) {
    const id = ["gender-reveal", "christening"].includes(searchParams.get("occasion")) ? "baby-kids" : "pre-wedding";
    return projects.find((project) => project.id === id);
  }
  return projects.find((project) => project.id === requested || project.slug === requested) ?? null;
}

export function getInvitationCatalogLink(category = null, searchParams = new URLSearchParams()) {
  const currentCategory = readCatalogCategory(searchParams) ?? category;
  const { style } = readCatalogFilters(searchParams, currentCategory?.id);
  const next = updateCatalogFilters(searchParams, { category: category?.id ?? "all", style });
  next.delete("type");
  const occasion = normalizeOccasion(searchParams.get("occasion"));
  if (occasion && category?.subcategories?.some((item) => item.id === occasion)) next.set("occasion", occasion);
  else next.delete("occasion");
  return { pathname: "/invitations", search: next.toString() };
}

export function readCatalogFilters(searchParams, category) {
  const requestedStyle = searchParams.get("style") ?? (category
    ? (searchParams.get(`${category}Style`) ?? (["baby-kids", "pre-wedding"].includes(category) ? searchParams.get("otherStyle") : null))
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
  const normalized = normalizeOccasion(requested);
  const category = readCatalogCategory(searchParams);
  return getCelebrationSubcategory(normalized) && (!category || category.subcategories?.some((item) => item.id === normalized)) ? normalized : "all";
}
