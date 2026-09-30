export const projects = [
  { id: "birthday", slug: "birthday", title: "Birthday", category: "Celebration", shortDescription: "Make another year feel unforgettable, together.", accent: "pink", icon: "cake", status: "ready" },
  { id: "wedding", slug: "wedding", title: "Wedding", category: "Milestone", shortDescription: "A beautiful space for your day and your story.", accent: "orange", icon: "rings", status: "ready" },
  { id: "friendship", slug: "friendship-diary", title: "Friendship Diary", category: "Interactive", shortDescription: "Collect the stories only your friends could tell.", accent: "blue", icon: "smile", status: "ready" },
  { id: "corporate", slug: "corporate-party", title: "Corporate Party", category: "Gathering", shortDescription: "Bring your team together beyond the ordinary.", accent: "violet", icon: "briefcase", status: "soon" },
  { id: "memories", slug: "memories", title: "Memories", category: "Keepsake", shortDescription: "A place for the little moments that stay with us.", accent: "green", icon: "notes", status: "soon" },
  { id: "photo-memories", slug: "photo-memories", title: "Photo Memories", category: "Keepsake", shortDescription: "See your favorite moments through every lens.", accent: "cyan", icon: "photo", status: "soon" },
  { id: "party", slug: "party", title: "Party", category: "Celebration", shortDescription: "Turn any reason into a reason to celebrate.", accent: "coral", icon: "heart", status: "soon" },
  { id: "custom", slug: "custom-event", title: "Custom Event", category: "Your idea", shortDescription: "Make room for a celebration that is all yours.", accent: "lilac", icon: "spark", status: "soon" },
];

const legacySlugs = {
  "birthday-wishes": "birthday",
  "memories-in-notes": "memories",
  "photo-album-of-memories": "photo-memories",
  custom: "custom-event",
  "love-at-first-sight": "party",
};

export function getProjectBySlug(slug) {
  const currentSlug = legacySlugs[slug] ?? slug;
  return projects.find((project) => project.slug === currentSlug);
}
