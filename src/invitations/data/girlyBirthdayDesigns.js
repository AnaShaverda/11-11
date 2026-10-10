import { captionValue, createCaptionCopy } from "../../localization/captionValues.js";

// Invitation studies: generated artwork stays text-free; all copy is editable and localized.
const studies = [
  {
    slug: "ribbon-sketch", name: createCaptionCopy("data.data.girlyBirthdayDesigns.record1.name").en, kaName: createCaptionCopy("data.data.girlyBirthdayDesigns.record1.name").ka,
    paper: "#fbd5de", ink: "#ad1626", tags: ["line-art", "pastel"],
    description: createCaptionCopy("data.data.girlyBirthdayDesigns.record2.description").en,
    kaDescription: createCaptionCopy("data.data.girlyBirthdayDesigns.record2.description").ka,
    mood: createCaptionCopy("data.data.girlyBirthdayDesigns.record3.mood").en, kaMood: createCaptionCopy("data.data.girlyBirthdayDesigns.record3.mood").ka,
    headline: createCaptionCopy("data.data.girlyBirthdayDesigns.record4.headline").en, kaHeadline: createCaptionCopy("data.data.girlyBirthdayDesigns.record4.headline").ka,
    phrase: createCaptionCopy("data.data.girlyBirthdayDesigns.record5.phrase").en, kaPhrase: createCaptionCopy("data.data.girlyBirthdayDesigns.record5.phrase").ka,
    finish: createCaptionCopy("data.data.girlyBirthdayDesigns.record6.finish").en, kaFinish: createCaptionCopy("data.data.girlyBirthdayDesigns.record6.finish").ka,
  },
  {
    slug: "playground", name: createCaptionCopy("data.data.girlyBirthdayDesigns.record7.name").en, kaName: createCaptionCopy("data.data.girlyBirthdayDesigns.record7.name").ka,
    paper: "#fff5df", ink: "#d71936", tags: ["playful", "pastel"],
    description: createCaptionCopy("data.data.girlyBirthdayDesigns.record8.description").en,
    kaDescription: createCaptionCopy("data.data.girlyBirthdayDesigns.record8.description").ka,
    mood: createCaptionCopy("data.data.girlyBirthdayDesigns.record9.mood").en, kaMood: createCaptionCopy("data.data.girlyBirthdayDesigns.record9.mood").ka,
    headline: createCaptionCopy("data.data.girlyBirthdayDesigns.record10.headline").en, kaHeadline: createCaptionCopy("data.data.girlyBirthdayDesigns.record10.headline").ka,
    phrase: createCaptionCopy("data.data.girlyBirthdayDesigns.record11.phrase").en, kaPhrase: createCaptionCopy("data.data.girlyBirthdayDesigns.record11.phrase").ka,
    finish: createCaptionCopy("data.data.girlyBirthdayDesigns.record12.finish").en, kaFinish: createCaptionCopy("data.data.girlyBirthdayDesigns.record12.finish").ka,
  },
  {
    slug: "white-and-blue", name: createCaptionCopy("data.data.girlyBirthdayDesigns.record13.name").en, kaName: createCaptionCopy("data.data.girlyBirthdayDesigns.record13.name").ka,
    paper: "#ffffff", ink: "#1749c8", tags: ["line-art", "light-neutral"],
    description: createCaptionCopy("data.data.girlyBirthdayDesigns.record14.description").en,
    kaDescription: createCaptionCopy("data.data.girlyBirthdayDesigns.record14.description").ka,
    mood: createCaptionCopy("data.data.girlyBirthdayDesigns.record15.mood").en, kaMood: createCaptionCopy("data.data.girlyBirthdayDesigns.record15.mood").ka,
    headline: createCaptionCopy("data.data.girlyBirthdayDesigns.record16.headline").en, kaHeadline: createCaptionCopy("data.data.girlyBirthdayDesigns.record16.headline").ka,
    phrase: createCaptionCopy("data.data.girlyBirthdayDesigns.record17.phrase").en, kaPhrase: createCaptionCopy("data.data.girlyBirthdayDesigns.record17.phrase").ka,
    finish: createCaptionCopy("data.data.girlyBirthdayDesigns.record18.finish").en, kaFinish: createCaptionCopy("data.data.girlyBirthdayDesigns.record18.finish").ka,
  },

];

const id = (study) => `birthday-${study.slug}`;
const records = (mapper) => Object.fromEntries(studies.map((study) => [id(study), mapper(study)]));
const ornament = (study) => `/images/birthday/${study.slug}/line-ornament.webp`;

export const girlyBirthdayThemes = studies.map((study) => ({
  id: id(study), slug: id(study), category: "birthday", name: study.name,
  description: study.description, mood: study.mood, visual: study.slug, layout: "editorial", decor: "",
}));
export const girlyBirthdayStorefront = records((study) => ({ slug: id(study), title: study.name, style: study.description }));
export const girlyBirthdayStyles = records((study) => study.tags);
export const girlyBirthdayShowcases = records((study) => ({
  // Exactly two authored colors. Repeated CSS tokens don't add palette colors.
  palette: [study.paper, study.ink], pattern: "modern-birthday-lines", type: study.slug, motif: "",
  specimen: study.headline, phrase: study.phrase, accentCard: "BIRTHDAY WISHES",
  accentCopy: study.phrase, finish: study.finish,
}));
export const girlyBirthdayAssets = records((study) => study.slug === "playground" ? {
  standaloneCard: true, coverImage: "/images/birthday/playground/gift.webp", invitation: [],
  typography: { image: "/images/birthday/playground/match-bow.webp", left: "4%", top: "24%", width: "27%", height: "49%" },
  pattern: { image: "/images/birthday/playground/soft-waves.svg", right: "0%", top: "0%", width: "100%", height: "100%" },
  supportCards: [null, null, { image: "/images/birthday/playground/cake.webp", right: "4%", bottom: "4%", width: "30%", height: "27%" }, null],
} : ({
  lineArt: true, standaloneCard: true,
  coverImage: `/images/birthday/${study.slug}/invitation-square.webp`,
  invitation: [],
  typography: { image: ornament(study), left: "4%", top: "24%", width: "27%", height: "49%" },
  pattern: { image: ornament(study), right: "6%", top: "10%", width: "56%", height: "56%" },
  supportCards: [null, null, { image: ornament(study), right: "4%", bottom: "4%", width: "30%", height: "27%" }, null],
}));
export const girlyBirthdayPortraits = records((study) => study.slug === "playground" ? null : `/images/recipient/${id(study)}/invitation-portrait.webp`);
export const girlyBirthdaySamples = records((study) => ({
  title: "Aniko’s Birthday", name: "Aniko", headline: study.headline,
  opening: study.slug === "playground" ? "come celebrate" : "you’re invited",
  date: "23 MAY 2027 · 17:00", location: "TBILISI", line: study.phrase,
}));

export const girlyBirthdayCaptions = { en: {}, ka: {} };
export const girlyBirthdayCardCopy = {};
for (const study of studies) {
  const slug = id(study);
  for (const [language, values] of Object.entries({
    en: { name: study.name, description: study.description, style: study.description, mood: study.mood },
    ka: { name: study.kaName, description: study.kaDescription, style: study.kaDescription, mood: study.kaMood },
  })) {
    for (const [field, value] of Object.entries(values)) girlyBirthdayCaptions[language][`themes.${slug}.${field}`] = value;
  }
  const localized = {
    samples: { title: captionValue("ribbonSketch.anikoSBirthday.99", "ka"), name: captionValue("cards.events.birthday-slice-club.hostName", "ka"), headline: study.kaHeadline, opening: study.slug === "playground" ? captionValue("ui.invitations.data.customOccasions.letSCelebrateTogether", "ka") : captionValue("data.data.poolBirthdayDesigns.story.inviteOpening", "ka"), date: captionValue("cards.samples.birthday-white-and-blue.date", "ka"), location: captionValue("ribbonSketch.tbilisi.120", "ka"), line: study.kaPhrase },
    designs: { specimen: study.kaHeadline, phrase: study.kaPhrase, accentCard: captionValue("invitations.pages.PinkLidoExperience.copy1.wishes", "ka"), accentCopy: study.kaPhrase, finish: study.kaFinish },
  };
  for (const [namespace, fields] of Object.entries(localized)) {
    for (const [field, value] of Object.entries(fields)) girlyBirthdayCardCopy[`cards.${namespace}.${slug}.${field}`] = value;
  }
}
