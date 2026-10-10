import { captionValue, createCaptionCopy } from "../../localization/captionValues.js";

// Approved gouache pool studies; shared imagery across every card presentation.
const studies = [
  { slug: "pink-lido", name: createCaptionCopy("data.data.poolBirthdayDesigns.record1.name").en, kaName: createCaptionCopy("data.data.poolBirthdayDesigns.record1.name").ka, palette: ["#fbe1dc", "#be4169", "#9cd5d0", "#f9d46b"], description: createCaptionCopy("data.data.poolBirthdayDesigns.record2.description").en, kaDescription: createCaptionCopy("data.data.poolBirthdayDesigns.record2.description").ka },
  { slug: "blue-splash", name: createCaptionCopy("data.data.poolBirthdayDesigns.record3.name").en, kaName: createCaptionCopy("data.data.poolBirthdayDesigns.record3.name").ka, palette: ["#f8f2e6", "#075a9f", "#9cd5e0", "#f9d46b"], description: createCaptionCopy("data.data.poolBirthdayDesigns.record4.description").en, kaDescription: createCaptionCopy("data.data.poolBirthdayDesigns.record4.description").ka },
];
const id = (s) => `birthday-${s.slug}`;
const records = (fn) => Object.fromEntries(studies.map((s) => [id(s), fn(s)]));
const art = (s) => `/images/birthday/${s.slug}/pool-artwork.webp`;
export const poolBirthdayThemes = studies.map((s) => ({ id: id(s), slug: id(s), category: "birthday", name: s.name, description: s.description, mood: "Pastel · poolside · painted", visual: s.slug, layout: "editorial", decor: "" }));
export const poolBirthdayStorefront = records((s) => ({ slug: id(s), title: s.name, style: s.description }));
export const poolBirthdayStyles = records(() => ["pastel", "retro", "coastal"]);
export const poolBirthdayShowcases = records((s) => ({ palette: s.palette, pattern: "painted-pool", type: s.slug, motif: "", specimen: "SPLASH!", phrase: "Dive in for a day of sunny fun.", accentCard: "POOL PARTY", accentCopy: "Sunshine, splashes & birthday wishes.", finish: "A little sunshine. A lot of birthday joy." }));
export const poolBirthdayAssets = records((s) => ({ paintedPool: true, coverImage: art(s), invitation: [], typography: null, pattern: { image: art(s), right: "0", bottom: "0", width: "100%", height: "100%", objectFit: "cover", opacity: .2 }, supportCards: [] }));
export const poolBirthdayPortraits = records(art);
export const poolBirthdaySamples = records(() => ({ title: "Aniko’s Pool Party", name: "Aniko", posterName: "Aniko", posterAge: 7, headline: "SPLASH!", opening: "POOL PARTY", date: "18 JULY 2027", time: "14:00", location: "TBILISI", line: "Dive in for a day of sunny fun." }));
export const poolBirthdayEvents = records(() => ({ title: "Aniko’s Pool Party", hostName: "Aniko", celebrationName: "Pool Party", age: 7, date: "18 July 2027", dateISO: "2027-07-18T14:00:00+04:00", time: "14:00", location: "Tbilisi", description: "Dive in for a day of sunny fun.", enabledModules: ["invitation", "countdown", "gallery", "rsvp"] }));
const story = createCaptionCopy({
  "eyebrow": "data.data.poolBirthdayDesigns.story.eyebrow",
  "heroLine": "data.data.poolBirthdayDesigns.story.heroLine",
  "ticker": "data.data.poolBirthdayDesigns.story.ticker",
  "storyTitle": "data.data.poolBirthdayDesigns.story.storyTitle",
  "storyText": "data.data.poolBirthdayDesigns.story.storyText",
  "inviteMessage": "data.data.poolBirthdayDesigns.story.inviteMessage",
  "galleryTitle": "data.data.poolBirthdayDesigns.story.galleryTitle",
  "galleryText": "data.data.poolBirthdayDesigns.story.galleryText",
  "storySignoff": "data.data.poolBirthdayDesigns.story.storySignoff",
  "photoTag": "data.data.poolBirthdayDesigns.story.photoTag",
  "inviteOpening": "data.data.poolBirthdayDesigns.story.inviteOpening",
  "inviteFooter": "data.data.poolBirthdayDesigns.story.inviteFooter",
  "communityTitle": "data.data.poolBirthdayDesigns.story.communityTitle",
  "communityText": "data.data.poolBirthdayDesigns.story.communityText",
  "rsvpTitle": "data.data.poolBirthdayDesigns.story.rsvpTitle",
  "rsvpText": "data.data.poolBirthdayDesigns.story.rsvpText",
  "footer": "data.data.poolBirthdayDesigns.story.footer"
}).en;
export const poolBirthdayStories = Object.fromEntries(studies.map((s) => [s.slug, { ...story }]));
export const poolBirthdayCaptions = { en: {}, ka: {} };
export const poolBirthdayCardCopy = {};
const kaStory = createCaptionCopy({
  "eyebrow": "data.data.poolBirthdayDesigns.story.eyebrow",
  "heroLine": "data.data.poolBirthdayDesigns.story.heroLine",
  "ticker": "data.data.poolBirthdayDesigns.story.ticker",
  "storyTitle": "data.data.poolBirthdayDesigns.story.storyTitle",
  "storyText": "data.data.poolBirthdayDesigns.story.storyText",
  "inviteMessage": "data.data.poolBirthdayDesigns.story.inviteMessage",
  "galleryTitle": "data.data.poolBirthdayDesigns.story.galleryTitle",
  "galleryText": "data.data.poolBirthdayDesigns.story.galleryText",
  "storySignoff": "data.data.poolBirthdayDesigns.story.storySignoff",
  "photoTag": "data.data.poolBirthdayDesigns.story.photoTag",
  "inviteOpening": "data.data.poolBirthdayDesigns.story.inviteOpening",
  "inviteFooter": "data.data.poolBirthdayDesigns.story.inviteFooter",
  "communityTitle": "data.data.poolBirthdayDesigns.story.communityTitle",
  "communityText": "data.data.poolBirthdayDesigns.story.communityText",
  "rsvpTitle": "data.data.poolBirthdayDesigns.story.rsvpTitle",
  "rsvpText": "data.data.poolBirthdayDesigns.story.rsvpText",
  "footer": "data.data.poolBirthdayDesigns.story.footer"
}).ka;
for (const s of studies) {
  for (const [lang, name, description, mood] of [["en", s.name, s.description, "Pastel · poolside · painted"], ["ka", s.kaName, s.kaDescription, captionValue("themes.birthday-blue-splash.mood", "ka")]]) for (const [key, value] of Object.entries({ name, description, style: description, mood })) poolBirthdayCaptions[lang][`themes.${id(s)}.${key}`] = value;
  const localized = {
    samples: { title: captionValue("cards.events.birthday-blue-splash.title", "ka"), name: captionValue("cards.events.birthday-slice-club.hostName", "ka"), posterName: captionValue("cards.events.birthday-slice-club.hostName", "ka"), headline: captionValue("cards.designs.birthday-blue-splash.specimen", "ka"), opening: captionValue("data.data.poolBirthdayDesigns.story.photoTag", "ka"), date: captionValue("invitations.pages.PizzaChefExperience.copy1.date", "ka"), location: captionValue("ribbonSketch.tbilisi.120", "ka"), line: captionValue("data.data.poolBirthdayDesigns.story.heroLine", "ka") },
    designs: { specimen: captionValue("cards.designs.birthday-blue-splash.specimen", "ka"), phrase: captionValue("data.data.poolBirthdayDesigns.story.heroLine", "ka"), accentCard: captionValue("data.data.poolBirthdayDesigns.story.photoTag", "ka"), accentCopy: captionValue("cards.designs.birthday-blue-splash.accentCopy", "ka"), finish: captionValue("cards.designs.birthday-blue-splash.finish", "ka") },
    events: { title: captionValue("cards.events.birthday-blue-splash.title", "ka"), hostName: captionValue("cards.events.birthday-slice-club.hostName", "ka"), celebrationName: captionValue("data.data.poolBirthdayDesigns.story.photoTag", "ka"), date: captionValue("invitations.pages.PizzaChefExperience.copy1.date", "ka"), location: captionValue("ribbonSketch.tbilisi.120", "ka"), description: captionValue("data.data.poolBirthdayDesigns.story.heroLine", "ka") },
  };
  for (const [namespace, fields] of Object.entries(localized)) for (const [field, value] of Object.entries(fields)) poolBirthdayCardCopy[`cards.${namespace}.${id(s)}.${field}`] = value;
  for (const [field, value] of Object.entries(kaStory)) poolBirthdayCardCopy[`cards.stories.${s.slug}.${field}`] = value;
}
