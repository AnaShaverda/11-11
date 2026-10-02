export const projects = [
  { id: "birthday", slug: "birthday", title: "Birthday", category: "Event category", shortDescription: "Celebrate their story, their people, and another trip around the sun.", accent: "blue", icon: "cake", status: "ready" },
  { id: "wedding", slug: "wedding", title: "Wedding", category: "Event category", shortDescription: "A beautiful digital home for one day and a lifetime of stories.", accent: "orange", icon: "rings", status: "ready" },
  { id: "other", slug: "other-celebrations", title: "Other Celebrations", category: "Event category", shortDescription: "Make room for every meaningful milestone and all your own ideas.", accent: "pink", icon: "spark", status: "ready", subcategories: [
    { id: "gender-reveal", captionKey: "project.genderReveal", title: "Gender Reveal", description: "A joyful surprise with a modern, playful feel.", visual: "reveal" },
    { id: "bridal-party", captionKey: "project.bridal-party", title: "Bridal Parties", description: "A celebration for the bride and her favorite people.", visual: "bachelorette" },
    { id: "bachelorette", captionKey: "project.bachelorette", title: "Bachelorette Party", description: "A stylish night for your favorite people.", visual: "bachelorette" },
    { id: "christening", captionKey: "project.christening", title: "Christening / ნათლობა", description: "A peaceful celebration for a cherished day.", visual: "christening" },
  ] },
  { id: "corporate", slug: "corporate", title: "Corporate", category: "Event category", shortDescription: "Make team gatherings, launches, and private dinners memorable.", accent: "violet", icon: "briefcase", status: "preview" },
];

const legacySlugs = {
  "birthday-wishes": "birthday",
  "friendship-diary": "birthday",
  "corporate-party": "corporate",
  memories: "birthday",
  "memories-in-notes": "birthday",
  "photo-memories": "birthday",
  "photo-album-of-memories": "birthday",
  party: "other-celebrations",
  "love-at-first-sight": "other-celebrations",
  "custom-event": "other-celebrations",
  custom: "other-celebrations",
};

export function getProjectBySlug(slug) {
  const currentSlug = legacySlugs[slug] ?? slug;
  return projects.find((project) => project.slug === currentSlug);
}

export function getCanonicalProjectSlug(slug) {
  return legacySlugs[slug] ?? slug;
}

export function getCelebrationSubcategory(id) {
  return projects.find((project) => project.id === "other").subcategories.find((subcategory) => subcategory.id === id);
}

export function getCategoryCaptionKey(category, subcategory) {
  return (category.toLowerCase() === "other" && getCelebrationSubcategory(subcategory)?.captionKey) || `common.${category.toLowerCase()}`;
}
