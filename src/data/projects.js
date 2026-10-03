const subcategory = (id, title) => ({ id, title, captionKey: `category.occasion.${id}` });

export const projects = [
  { id: "wedding", slug: "wedding", title: "Weddings", accent: "orange", icon: "rings", status: "ready" },
  { id: "birthday", slug: "birthday", title: "Birthdays", accent: "blue", icon: "cake", status: "ready", subcategories: [subcategory("adult-birthday", "Adult Birthdays"), subcategory("kids-birthday", "Kids’ Birthdays"), subcategory("birthday-gift", "Birthday Gifts")] },
  { id: "baby-kids", slug: "baby-kids", title: "Baby & Kids", accent: "pink", icon: "spark", status: "ready", subcategories: [subcategory("gender-reveal", "Gender Reveal"), subcategory("kids-birthday", "Kids’ Birthdays"), subcategory("christening", "Christenings")] },
  { id: "pre-wedding", slug: "pre-wedding", title: "Pre-Wedding", accent: "rose", icon: "rings", status: "ready", subcategories: [subcategory("bachelorette", "Bachelorette & Bridal"), subcategory("bachelor", "Bachelor")] },
  { id: "parties", slug: "parties", title: "Parties", accent: "cyan", icon: "spark", status: "ready", subcategories: [subcategory("dinner", "Dinner"), subcategory("housewarming", "Housewarming"), subcategory("pool", "Pool"), subcategory("themed", "Themed")] },
  { id: "gifts", slug: "gifts-surprises", title: "Gifts & Surprises", accent: "lilac", icon: "spark", status: "ready", subcategories: [subcategory("birthday-gift", "Birthday"), subcategory("friendship", "Friendship"), subcategory("romantic", "Love"), subcategory("anniversary", "Anniversary"), subcategory("graduation", "Graduation"), subcategory("just-because", "Just Because")] },
  { id: "trending", slug: "trending", title: "Trending", accent: "mint", icon: "spark", status: "ready" },
  { id: "corporate", slug: "corporate", title: "Corporate", accent: "violet", icon: "briefcase", status: "preview" },
].map((project) => ({ ...project, category: "Event category", folderAsset: `/images/categories/${project.id}.svg` }));

const legacySlugs = {
  "birthday-wishes": "birthday",
  "friendship-diary": "birthday",
  "corporate-party": "corporate",
  memories: "birthday",
  "memories-in-notes": "birthday",
  "photo-memories": "birthday",
  "photo-album-of-memories": "birthday",
  party: "parties",
  "love-at-first-sight": "parties",
  "custom-event": "parties",
  custom: "parties",
};

export function getProjectBySlug(slug) {
  const currentSlug = legacySlugs[slug] ?? slug;
  if (["other", "other-celebrations"].includes(currentSlug)) return projects.find((project) => project.id === "pre-wedding");
  return projects.find((project) => project.slug === currentSlug || project.id === currentSlug);
}

export function getCanonicalProjectSlug(slug) {
  return getProjectBySlug(slug)?.slug ?? slug;
}

export function normalizeOccasion(id) {
  return id === "bridal-party" ? "bachelorette" : id;
}

export function getCelebrationSubcategory(id) {
  return projects.flatMap((project) => project.subcategories ?? []).find((subcategory) => subcategory.id === normalizeOccasion(id));
}

// Design rendering retains its original event type; browsing uses many-to-many category tags.
export function getCategoryCaptionKey(category, subcategory) {
  if (category.toLowerCase() === "other") return getCelebrationSubcategory(subcategory)?.captionKey ?? "common.parties";
  return `common.${category.toLowerCase()}`;
}
