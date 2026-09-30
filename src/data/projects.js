export const projects = [
  { id: "birthday", slug: "birthday", title: "Birthday", category: "Event category", shortDescription: "Celebrate their story, their people, and another trip around the sun.", accent: "pink", icon: "cake", status: "ready" },
  { id: "wedding", slug: "wedding", title: "Wedding", category: "Event category", shortDescription: "A beautiful digital home for one day and a lifetime of stories.", accent: "orange", icon: "rings", status: "ready" },
  { id: "corporate", slug: "corporate", title: "Corporate", category: "Event category", shortDescription: "Make team gatherings, launches, and private dinners memorable.", accent: "violet", icon: "briefcase", status: "preview" },
  { id: "other", slug: "other-celebrations", title: "Other Celebrations", category: "Event category", shortDescription: "Make room for every meaningful milestone and all your own ideas.", accent: "lilac", icon: "spark", status: "preview", subcategories: [
    { id: "gender-reveal", title: "Gender Reveal", description: "A joyful surprise with a modern, playful feel.", visual: "reveal" },
    { id: "bachelorette", title: "Bachelorette Party", description: "A stylish night for your favorite people.", visual: "bachelorette" },
    { id: "christening", title: "Christening / ნათლობა", description: "A peaceful celebration for a cherished day.", visual: "christening" },
  ] },
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
