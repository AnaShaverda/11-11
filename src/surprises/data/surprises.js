import { eventModules } from "../../modules/data/eventModules.js";

import { activeThemes, getThemeBySlug, isThemeActive } from "../../themes/data/themeRegistry.js";

export const surpriseOccasions = [
  { id: "birthday", label: "Birthday", icon: "asterisk", headline: "Another year of you.", note: "For the person whose day deserves more than a text.", themeIds: ["birthday-retro-disco", "birthday-coquette", "birthday-y2k-digital"] },
  { id: "friendship", label: "Friendship", icon: "heart", headline: "For my favorite person.", note: "All your inside jokes and shared stories in one place.", themeIds: ["birthday-coquette", "birthday-pastel-dream", "birthday-retro-disco"] },
  { id: "romantic", label: "Romantic", icon: "heart-filled", headline: "A little world for us.", note: "Something tender to open whenever you miss each other.", themeIds: ["wedding-rose-letter", "wedding-heart-hideaway", "birthday-coquette"] },
  { id: "anniversary", label: "Anniversary", icon: "sparkle", headline: "Another chapter together.", note: "A way to revisit everything you have become together.", themeIds: ["wedding-first-dance", "wedding-ink-and-ivy", "wedding-rose-letter"] },
  { id: "graduation", label: "Graduation", icon: "star", headline: "Look how far you came.", note: "A celebration of the work, courage, and people behind it.", themeIds: ["birthday-y2k-digital", "birthday-pastel-dream"] },
  { id: "just-because", label: "Just Because", icon: "flower", headline: "You deserve this today.", note: "No occasion needed to make someone feel seen.", themeIds: ["birthday-garden-party", "birthday-pastel-dream", "birthday-coquette"] },
].map((occasion) => {
  const themeIds = occasion.themeIds.filter((id) => isThemeActive(getThemeBySlug(id)));
  return {
    ...occasion,
    themeIds: themeIds.length ? themeIds : activeThemes.filter((theme) => theme.category === "birthday").map((theme) => theme.id).slice(0, 3),
  };
});

export const surpriseOptionalModuleIds = ["cake", "love-notes", "memories", "gallery", "timeline", "quiz", "wishes", "gift", "letter", "music"];

export const surpriseModuleLabels = Object.fromEntries(
  surpriseOptionalModuleIds.map((id) => [id, eventModules[id].title]),
);

export const birthdaySurprise = {
  id: "nini-birthday",
  occasion: "birthday",
  recipientName: "Nini",
  creatorName: "Mariam",
  title: "For Nini",
  themeId: "birthday-retro-disco",
  mainMessage: "I wish I could be there with you today, so I made this for you instead.",
  enabledModules: ["main-message", "cake", "love-notes", "memories", "gallery", "timeline", "quiz", "wishes", "gift", "letter"],
  content: {
    personalMessage: "Happy birthday, Nini. You make life brighter with your laugh, your kindness, and the way you show up for the people you love. I may be far away today, but I am cheering you on from here.",
    loveNotes: ["You can turn an ordinary day into an adventure.", "You always make people feel seen and welcome.", "You are the first person I want to tell good news to.", "Your laugh makes every room a little lighter."],
    memories: [
      { title: "The day we got lost", date: "Summer 2024", story: "We took the wrong road, found the best view, and somehow had the perfect day.", photo: 0 },
      { title: "The long lunch", date: "Spring 2025", story: "We promised we would stay for one coffee. We left when the lights came on.", photo: 1 },
    ],
    gallery: [
      { photo: 0, label: "A view worth getting lost for" },
      { photo: 1, label: "One more coffee turned into hours" },
      { photo: 2, label: "The long way home" },
      { photo: 3, label: "Our favorite kind of sunset" },
    ],
    timeline: [
      { year: "2021", title: "We met", detail: "One conversation that never really ended." },
      { year: "2022", title: "The first trip", detail: "A train, two backpacks, and no real plan." },
      { year: "2024", title: "That unforgettable summer", detail: "Still our favorite story to tell." },
      { year: "Today", title: "More ahead", detail: "The best parts are still waiting for us." },
    ],
    quiz: { question: "Where did our best unplanned day begin?", options: ["At the coast", "At the airport", "At a concert"], answerIndex: 0 },
    wishes: ["More joy in the everyday moments.", "More adventures that light you up.", "More people who love you as much as you deserve.", "More dreams coming true this year."],
    giftMessage: "You are a gift to everyone lucky enough to know you. Our next adventure is on me.",
    finalLetter: "Dear Nini,\n\nThere are people who make a place feel like home, even from far away. You are one of those people for me. Thank you for every long call, every brave idea, and every ordinary afternoon you made unforgettable.\n\nI hope this year brings you the freedom to chase what you love and the comfort of knowing you never have to do it alone. Until I can hug you in person, let this little world remind you how loved you are.\n\nHappy birthday.",
  },
};
