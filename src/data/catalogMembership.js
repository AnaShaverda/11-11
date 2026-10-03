// A design keeps one identity and preview URL, with any number of browsing memberships.
// Add an override here to place a design in additional categories or occasions.
export const designMembershipOverrides = {
  "birthday-paper-garland": { birthday: ["adult-birthday", "kids-birthday"], "baby-kids": ["kids-birthday"] },
  "birthday-strawberry-social": { birthday: ["adult-birthday", "kids-birthday"], "baby-kids": ["kids-birthday"], parties: ["themed"] },
  "birthday-white-and-blue": { birthday: ["adult-birthday", "kids-birthday"], "baby-kids": ["kids-birthday"] },
  "birthday-party-doodles": { birthday: ["adult-birthday", "kids-birthday"], "baby-kids": ["kids-birthday"], parties: ["themed"] },
  "birthday-pink-post": { birthday: ["adult-birthday", "kids-birthday"], "baby-kids": ["kids-birthday"] },
  "birthday-pink-minimal": { birthday: ["adult-birthday", "kids-birthday"], "baby-kids": ["kids-birthday"] },
  "birthday-little-pizza-chef": { birthday: ["kids-birthday"], "baby-kids": ["kids-birthday"], parties: ["themed"] },
  "birthday-comic-cutout": { birthday: ["adult-birthday", "kids-birthday"], "baby-kids": ["kids-birthday"], parties: ["themed"] },
  "birthday-retro-sport": { birthday: ["adult-birthday", "kids-birthday"], "baby-kids": ["kids-birthday"], parties: ["themed"] },
  "birthday-blue-splash": { birthday: ["adult-birthday", "kids-birthday"], "baby-kids": ["kids-birthday"], parties: ["pool"] },
  "birthday-pink-lido": { birthday: ["adult-birthday", "kids-birthday"], "baby-kids": ["kids-birthday"], parties: ["pool"] },
  "birthday-slice-club": { parties: ["dinner", "themed"] },
  "birthday-supper-club": { parties: ["dinner", "housewarming"] },
  "birthday-khinkali-beer": { parties: ["dinner", "themed"] },
  "birthday-midnight-martini": { parties: ["themed"] },
  "birthday-peach-fizz": { parties: ["themed"] },
  "birthday-disco-scrapbook": { parties: ["themed"] },
  "birthday-retro-disco": { parties: ["themed"] },
};

// Curated features, rather than claiming popularity without usage data.
export const featuredDesignIds = new Set([
  "wedding-ink-and-ivy", "wedding-garden-dance", "wedding-ivory-vows",
  "birthday-paper-garland", "birthday-blue-splash", "birthday-little-pizza-chef",
  "bridal-pink-disco-dream", "bridal-cherry-tower", "gender-reveal-bear-hug",
]);

export function getDesignMembership(theme) {
  let memberships = {};
  if (theme.category === "wedding") memberships.wedding = [];
  if (theme.category === "birthday") memberships.birthday = ["adult-birthday"];
  if (["bridal-party", "bachelorette"].includes(theme.subcategory)) memberships["pre-wedding"] = ["bachelorette"];
  if (theme.subcategory === "bachelor") memberships["pre-wedding"] = ["bachelor"];
  if (["gender-reveal", "christening"].includes(theme.subcategory)) memberships["baby-kids"] = [theme.subcategory];
  if (theme.category === "corporate") memberships.corporate = [];
  memberships = { ...memberships, ...designMembershipOverrides[theme.id], ...theme.categoryOccasions };
  if (featuredDesignIds.has(theme.id)) memberships.trending = [];
  return { categoryIds: Object.keys(memberships), categoryOccasions: memberships };
}

export function itemMatchesCategory(item, categoryId, occasion = "all") {
  if (categoryId && !item.categoryIds.includes(categoryId)) return false;
  if (occasion === "all") return true;
  return categoryId ? item.categoryOccasions[categoryId]?.includes(occasion) === true
    : Object.values(item.categoryOccasions).some((occasions) => occasions.includes(occasion));
}
