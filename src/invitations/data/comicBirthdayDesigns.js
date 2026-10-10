import { captionValue, createCaptionCopy } from "../../localization/captionValues.js";

// One authored image per design is shared by discovery and fullscreen cards.
const studies = [
  { slug: "city-after-dark", name: createCaptionCopy("data.data.comicBirthdayDesigns.record1.name").en, kaName: createCaptionCopy("data.data.comicBirthdayDesigns.record1.name").ka, palette: ["#101e32", "#f6eedf", "#ef342b", "#075eb9"], headline: createCaptionCopy("data.data.comicBirthdayDesigns.record2.headline").en, kaHeadline: createCaptionCopy("data.data.comicBirthdayDesigns.record2.headline").ka, description: createCaptionCopy("data.data.comicBirthdayDesigns.record3.description").en, kaDescription: createCaptionCopy("data.data.comicBirthdayDesigns.record3.description").ka, phrase: createCaptionCopy("data.data.comicBirthdayDesigns.record4.phrase").en, kaPhrase: createCaptionCopy("data.data.comicBirthdayDesigns.record4.phrase").ka, tags: ["cartoon", "retro", "dark"] },
  { slug: "comic-cutout", name: createCaptionCopy("data.data.comicBirthdayDesigns.record5.name").en, kaName: createCaptionCopy("data.data.comicBirthdayDesigns.record5.name").ka, palette: ["#f6eedf", "#101e32", "#075eb9", "#ef342b"], headline: createCaptionCopy("data.data.comicBirthdayDesigns.record6.headline").en, kaHeadline: createCaptionCopy("data.data.comicBirthdayDesigns.record6.headline").ka, description: createCaptionCopy("data.data.comicBirthdayDesigns.record7.description").en, kaDescription: createCaptionCopy("data.data.comicBirthdayDesigns.record7.description").ka, phrase: createCaptionCopy("data.data.comicBirthdayDesigns.record8.phrase").en, kaPhrase: createCaptionCopy("data.data.comicBirthdayDesigns.record8.phrase").ka, tags: ["cartoon", "retro", "light-neutral"] },
  { slug: "retro-sport", name: createCaptionCopy("data.data.comicBirthdayDesigns.record9.name").en, kaName: createCaptionCopy("data.data.comicBirthdayDesigns.record9.name").ka, palette: ["#f6eedf", "#101e32", "#ef342b", "#075eb9"], headline: createCaptionCopy("data.data.comicBirthdayDesigns.record10.headline").en, kaHeadline: createCaptionCopy("data.data.comicBirthdayDesigns.record10.headline").ka, description: createCaptionCopy("data.data.comicBirthdayDesigns.record11.description").en, kaDescription: createCaptionCopy("data.data.comicBirthdayDesigns.record11.description").ka, phrase: createCaptionCopy("data.data.comicBirthdayDesigns.record12.phrase").en, kaPhrase: createCaptionCopy("data.data.comicBirthdayDesigns.record12.phrase").ka, tags: ["cartoon", "retro"] },
  { slug: "upside-down", name: createCaptionCopy("data.data.comicBirthdayDesigns.record13.name").en, kaName: createCaptionCopy("data.data.comicBirthdayDesigns.record13.name").ka, palette: ["#0b58ad", "#f6eedf", "#ef342b", "#101e32"], headline: createCaptionCopy("data.data.comicBirthdayDesigns.record14.headline").en, kaHeadline: createCaptionCopy("data.data.comicBirthdayDesigns.record14.headline").ka, description: createCaptionCopy("data.data.comicBirthdayDesigns.record15.description").en, kaDescription: createCaptionCopy("data.data.comicBirthdayDesigns.record15.description").ka, phrase: createCaptionCopy("data.data.comicBirthdayDesigns.record16.phrase").en, kaPhrase: createCaptionCopy("data.data.comicBirthdayDesigns.record16.phrase").ka, tags: ["cartoon", "retro"] },
];
const id = (s) => `birthday-${s.slug}`;
const records = (fn) => Object.fromEntries(studies.map((s) => [id(s), fn(s)]));
const art = (s) => `/images/birthday/${s.slug}/comic-artwork.webp`;
export const comicBirthdayThemes = studies.map((s) => ({ id: id(s), slug: id(s), category: "birthday", name: s.name, description: s.description, mood: "Red · blue · retro comic", visual: s.slug, layout: "editorial", decor: "" }));
export const comicBirthdayStorefront = records((s) => ({ slug: id(s), title: s.name, style: s.description }));
export const comicBirthdayStyles = records((s) => s.tags);
export const comicBirthdayShowcases = records((s) => ({ palette: s.palette, pattern: "comic-birthday", type: s.slug, motif: "", specimen: s.headline.replaceAll("\n", " "), phrase: s.phrase, accentCard: "HEROES WELCOME", accentCopy: s.phrase, finish: "A birthday worth assembling for." }));
export const comicBirthdayAssets = records((s) => ({ comicBirthday: true, coverImage: art(s), invitation: [], typography: null, pattern: { image: art(s), right: "0", bottom: "0", width: "100%", height: "100%", objectFit: "cover", opacity: .16 }, supportCards: [] }));
export const comicBirthdayPortraits = records(art);
export const comicBirthdaySamples = records((s) => ({ title: "Dea’s Birthday", name: "Dea", posterName: "Dea", posterAge: ["city-after-dark", "comic-cutout"].includes(s.slug) ? 26 : 6, headline: s.headline, opening: "YOU’RE INVITED", date: "18 JUL 2027", time: ["city-after-dark", "comic-cutout"].includes(s.slug) ? "19:00" : "14:00", location: "TBILISI", line: s.phrase }));
export const comicBirthdayEvents = records((s) => ({ title: "Dea’s Birthday", hostName: "Dea", celebrationName: "Birthday", age: ["city-after-dark", "comic-cutout"].includes(s.slug) ? 26 : 6, date: "18 July 2027", dateISO: ["city-after-dark", "comic-cutout"].includes(s.slug) ? "2027-07-18T19:00:00+04:00" : "2027-07-18T14:00:00+04:00", time: ["city-after-dark", "comic-cutout"].includes(s.slug) ? "19:00" : "14:00", location: "Tbilisi", description: s.phrase, enabledModules: ["invitation", "countdown", "gallery", "rsvp"] }));
const story = createCaptionCopy({
  "eyebrow": "data.data.comicBirthdayDesigns.story.eyebrow",
  "heroLine": "data.data.comicBirthdayDesigns.story.heroLine",
  "ticker": "data.data.comicBirthdayDesigns.story.ticker",
  "storyTitle": "data.data.comicBirthdayDesigns.story.storyTitle",
  "storyText": "data.data.comicBirthdayDesigns.story.storyText",
  "inviteMessage": "data.data.comicBirthdayDesigns.story.inviteMessage",
  "galleryTitle": "data.data.comicBirthdayDesigns.story.galleryTitle",
  "galleryText": "data.data.comicBirthdayDesigns.story.galleryText",
  "storySignoff": "data.data.comicBirthdayDesigns.story.storySignoff",
  "photoTag": "data.data.comicBirthdayDesigns.story.photoTag",
  "inviteOpening": "data.data.comicBirthdayDesigns.story.inviteOpening",
  "inviteFooter": "data.data.comicBirthdayDesigns.story.inviteFooter",
  "communityTitle": "data.data.comicBirthdayDesigns.story.communityTitle",
  "communityText": "data.data.comicBirthdayDesigns.story.communityText",
  "rsvpTitle": "data.data.comicBirthdayDesigns.story.rsvpTitle",
  "rsvpText": "data.data.comicBirthdayDesigns.story.rsvpText",
  "footer": "data.data.comicBirthdayDesigns.story.footer"
}).en;
export const comicBirthdayStories = Object.fromEntries(studies.map((s) => [s.slug, { ...story, heroLine: s.phrase }]));
const kaStory = createCaptionCopy({
  "eyebrow": "data.data.comicBirthdayDesigns.story.eyebrow",
  "heroLine": "data.data.comicBirthdayDesigns.story.heroLine",
  "ticker": "data.data.comicBirthdayDesigns.story.ticker",
  "storyTitle": "data.data.comicBirthdayDesigns.story.storyTitle",
  "storyText": "data.data.comicBirthdayDesigns.story.storyText",
  "inviteMessage": "data.data.comicBirthdayDesigns.story.inviteMessage",
  "galleryTitle": "data.data.comicBirthdayDesigns.story.galleryTitle",
  "galleryText": "data.data.comicBirthdayDesigns.story.galleryText",
  "storySignoff": "data.data.comicBirthdayDesigns.story.storySignoff",
  "photoTag": "data.data.comicBirthdayDesigns.story.photoTag",
  "inviteOpening": "data.data.comicBirthdayDesigns.story.inviteOpening",
  "inviteFooter": "data.data.comicBirthdayDesigns.story.inviteFooter",
  "communityTitle": "data.data.comicBirthdayDesigns.story.communityTitle",
  "communityText": "data.data.comicBirthdayDesigns.story.communityText",
  "rsvpTitle": "data.data.comicBirthdayDesigns.story.rsvpTitle",
  "rsvpText": "data.data.comicBirthdayDesigns.story.rsvpText",
  "footer": "data.data.comicBirthdayDesigns.story.footer"
}).ka;
export const comicBirthdayCaptions = createCaptionCopy({
  "comicBirthday.turns": "invitations.data.comicBirthdayDesigns.copy1.comicBirthday.turns"
});
export const comicBirthdayCardCopy = {};
for (const s of studies) {
  for (const [lang, name, description, mood] of [["en", s.name, s.description, "Red · blue · retro comic"], ["ka", s.kaName, s.kaDescription, captionValue("themes.birthday-upside-down.mood", "ka")]]) {
    for (const [key, value] of Object.entries({ name, description, style: description, mood })) comicBirthdayCaptions[lang][`themes.${id(s)}.${key}`] = value;
  }
  const localized = {
    samples: { title: captionValue("invitations.midnight-martini.copy.extraCopy1.birthday", "ka"), name: captionValue("invitations.pages.SpiderBirthdayExperience.caption3", "ka"), posterName: captionValue("invitations.pages.SpiderBirthdayExperience.caption3", "ka"), headline: s.kaHeadline, opening: captionValue("data.data.poolBirthdayDesigns.story.inviteOpening", "ka"), date: captionValue("invitations.pages.PizzaChefExperience.copy1.date", "ka"), location: captionValue("ribbonSketch.tbilisi.120", "ka"), line: s.kaPhrase },
    designs: { specimen: s.kaHeadline.replaceAll("\n", " "), phrase: s.kaPhrase, accentCard: captionValue("data.data.comicBirthdayDesigns.story.eyebrow", "ka"), accentCopy: s.kaPhrase, finish: captionValue("cards.designs.birthday-upside-down.finish", "ka") },
    events: { title: captionValue("invitations.midnight-martini.copy.extraCopy1.birthday", "ka"), hostName: captionValue("invitations.pages.SpiderBirthdayExperience.caption3", "ka"), celebrationName: captionValue("ribbonSketch.birthdayGirlEra.96", "ka"), date: captionValue("invitations.pages.PizzaChefExperience.copy1.date", "ka"), location: captionValue("ribbonSketch.tbilisi.120", "ka"), description: s.kaPhrase },
  };
  for (const [namespace, fields] of Object.entries(localized)) for (const [field, value] of Object.entries(fields)) comicBirthdayCardCopy[`cards.${namespace}.${id(s)}.${field}`] = value;
  for (const [field, value] of Object.entries({ ...kaStory, heroLine: s.kaPhrase })) comicBirthdayCardCopy[`cards.stories.${s.slug}.${field}`] = value;
}
