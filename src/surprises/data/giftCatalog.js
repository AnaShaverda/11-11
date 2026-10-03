import { surpriseOccasions } from "./surprises.js";

export const giftCatalogItems = surpriseOccasions.map((occasion) => {
  const memberships = { gifts: [occasion.id === "birthday" ? "birthday-gift" : occasion.id] };
  if (occasion.id === "birthday") memberships.birthday = ["adult-birthday", "kids-birthday", "birthday-gift"];
  if (["birthday", "romantic"].includes(occasion.id)) memberships.trending = [];
  return {
    id: `gift-${occasion.id}`,
    kind: "gift",
    occasionId: occasion.id,
    categoryIds: Object.keys(memberships),
    categoryOccasions: memberships,
    captionKey: `gift.${occasion.id}.title`,
    descriptionKey: `gift.${occasion.id}.description`,
    href: `/surprises?occasion=${occasion.id}#create-surprise`,
  };
});
