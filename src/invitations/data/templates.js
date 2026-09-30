export const invitationTemplates = [
  { id: "retro-pop", slug: "birthday-retro-pop", title: "Retro Pop", eventTypes: ["Birthday"], style: "Bold & playful", shortDescription: "A bright little world made for big birthday energy.", design: "retro-pop", status: "ready", featured: true },
  { id: "editorial", slug: "wedding-editorial", title: "Editorial", eventTypes: ["Wedding"], style: "Quiet & romantic", shortDescription: "An elegant invitation with room for every meaningful detail.", design: "editorial", status: "ready", featured: true },
  { id: "disco-note", slug: "birthday-disco-note", title: "Disco Note", eventTypes: ["Birthday"], style: "Night-out sparkle", shortDescription: "For the friends who always find the dance floor.", design: "disco", status: "soon", featured: false },
  { id: "golden-hour", slug: "wedding-golden-hour", title: "Golden Hour", eventTypes: ["Wedding"], style: "Soft & sunlit", shortDescription: "A warm first glimpse of a day to remember.", design: "golden", status: "soon", featured: false },
  { id: "after-dark", slug: "party-after-dark", title: "After Dark", eventTypes: ["Party"], style: "Electric & late", shortDescription: "A bold invitation for a night worth staying up for.", design: "after-dark", status: "soon", featured: false },
];

export function getInvitationTemplate(slug) {
  return invitationTemplates.find((template) => template.slug === slug);
}
