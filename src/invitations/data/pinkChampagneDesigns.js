import { captionValue, createCaptionCopy } from "../../localization/captionValues.js";

// The two approved gouache illustrations are shared by birthday and bridal cards.
const studies = [
  { art: "cherry-tower", name: createCaptionCopy("data.data.pinkChampagneDesigns.record1.name").en, kaName: createCaptionCopy("data.data.pinkChampagneDesigns.record1.name").ka, ink: "#a51e37", headline: createCaptionCopy("data.data.pinkChampagneDesigns.record2.headline").en, kaHeadline: createCaptionCopy("data.data.pinkChampagneDesigns.record2.headline").ka, description: createCaptionCopy("data.data.pinkChampagneDesigns.record3.description").en, kaDescription: createCaptionCopy("data.data.pinkChampagneDesigns.record3.description").ka },
];
const variants = studies.flatMap((s) => ["birthday", "bridal"].map((occasion) => ({
  ...s, occasion, slug: `${occasion}-${s.art}`, visual: occasion === "bridal" ? `bridal-${s.art}` : s.art,
})));
const records = (fn, predicate = () => true) => Object.fromEntries(variants.filter(predicate).map((s) => [s.slug, fn(s)]));
const bridal = (s) => s.occasion === "bridal";
const phrase = (s) => bridal(s) ? "A toast to the bride and all her favorite people." : "A birthday toast to good friends and another lovely year.";
const kaPhrase = (s) => bridal(s) ? captionValue("cards.stories.bridal-cherry-tower.heroLine", "ka") : captionValue("data.data.cocktailBirthdayDesigns.phrase", "ka");
const paper = "/images/party/champagne-shared/blush-paper.webp";
const illustration = (s) => `/images/party/${s.art}/champagne-artwork.webp`;
const theme = (s) => ({ id: s.slug, slug: s.slug, category: bridal(s) ? "other" : "birthday", ...(bridal(s) ? { subcategory: "bridal-party" } : {}), name: s.name, description: s.description, mood: "Pink · retro · gouache", visual: s.visual, layout: "editorial", decor: "" });
export const pinkChampagneBirthdayThemes = variants.filter((s) => !bridal(s)).map(theme);
export const pinkChampagneBridalThemes = variants.filter(bridal).map(theme);
export const pinkChampagneStorefront = records((s) => ({ slug: s.slug, title: s.name, style: s.description }));
export const pinkChampagneStyles = records(() => ["retro", "pastel"]);
export const pinkChampagneShowcases = records((s) => ({ palette: ["#f5c5c7", s.ink, "#d84465", "#e3b54a"], pattern: "painted-toast", type: s.visual, motif: "", specimen: s.headline.replace("\n", " "), phrase: phrase(s), accentCard: bridal(s) ? "FOR THE BRIDE" : "BIRTHDAY TOAST", accentCopy: bridal(s) ? "Her people. A little bubbly." : "Good friends. Happy birthdays.", finish: bridal(s) ? "Here’s to her next chapter." : "Here’s to another lovely year." }));
const assets = (s) => ({ paintedCocktail: true, coverImage: paper, cocktailIllustration: illustration(s), invitation: [], typography: { image: illustration(s), right: "4%", bottom: "4%", width: "30%", height: "38%" }, pattern: { image: paper, right: "0", bottom: "0", width: "100%", height: "100%", objectFit: "cover", opacity: .22 }, supportCards: [null, null, { image: illustration(s), right: "3%", bottom: "3%", width: "30%", height: "38%" }] });
export const pinkChampagneBirthdayAssets = records(assets, (s) => !bridal(s));
export const pinkChampagneBridalAssets = records(assets, bridal);
export const pinkChampagnePortraits = records(() => paper);
export const pinkChampagneSamples = records((s) => ({
  title: bridal(s) ? "Mariam’s Bridal Party" : "Dea’s Birthday Toast",
  name: bridal(s) ? "Mariam" : "Dea", posterName: bridal(s) ? "Mariam" : "Dea",
  ...(bridal(s) ? {} : { posterAge: 30 }), headline: s.headline,
  opening: bridal(s) ? "FOR THE BRIDE" : "BIRTHDAY TOAST",
  date: "12 SEP 2027", time: "20:00", location: "TBILISI", line: phrase(s),
}));
export const pinkChampagneEvents = records((s) => ({
  title: bridal(s) ? "Mariam’s Bridal Party" : "Dea’s Birthday Toast",
  hostName: bridal(s) ? "Mariam" : "Dea",
  ...(bridal(s) ? { brideName: "Mariam" } : { age: 30 }),
  celebrationName: bridal(s) ? "Bridal Party" : "Birthday Toast",
  date: "12 September 2027", dateISO: "2027-09-12T20:00:00+04:00", time: "20:00", location: "Tbilisi",
  description: phrase(s), enabledModules: ["invitation", "countdown", "gallery", "rsvp"],
}));
const story = (s) => ({
  eyebrow: bridal(s) ? "A TOAST TO THE BRIDE" : "A BIRTHDAY TOAST", heroLine: phrase(s),
  ticker: bridal(s) ? "THE BRIDE · HER PEOPLE · A LITTLE BUBBLY" : "GOOD FRIENDS · HAPPY BIRTHDAYS",
  storyTitle: bridal(s) ? "Here’s to her next chapter." : "Here’s to another lovely year.",
  storyText: bridal(s) ? "Join Mariam for a bridal celebration, a toast, and a joyful evening with her favorite people." : "Join Dea for birthday cake, a toast, and a happy evening with friends.",
  inviteMessage: bridal(s) ? "Bring your love for the bride. We’ll save you a place." : "Bring your birthday wishes. We’ll save you a place.",
  galleryTitle: "Our favorite moments.", galleryText: "An evening worth remembering.",
  storySignoff: bridal(s) ? "With love, Mariam" : "With love, Dea",
  photoTag: bridal(s) ? "BRIDAL PARTY" : "LET’S CELEBRATE", inviteOpening: "You’re invited",
  inviteFooter: "GOOD FRIENDS · A LOVELY EVENING",
  communityTitle: bridal(s) ? "A little love for the bride." : "A little birthday love.",
  communityText: "Share a wish or a favorite memory.", rsvpTitle: "Will you join the toast?",
  rsvpText: bridal(s) ? "Save your place at the bridal party." : "Save your place at the birthday celebration.",
  footer: bridal(s) ? "HERE’S TO THE BRIDE" : "HERE’S TO ANOTHER LOVELY YEAR",
});
const kaStory = (s) => ({
  eyebrow: bridal(s) ? captionValue("cards.stories.bridal-sunny-ribbon.eyebrow", "ka") : captionValue("data.data.cocktailBirthdayDesigns.story.eyebrow", "ka"), heroLine: kaPhrase(s),
  ticker: bridal(s) ? captionValue("cards.stories.bridal-sunny-ribbon.ticker", "ka") : captionValue("cards.stories.cherry-tower.ticker", "ka"),
  storyTitle: bridal(s) ? captionValue("cards.stories.bridal-sunny-ribbon.storyTitle", "ka") : captionValue("invitations.midnight-martini.copy.extraCopy1.farewell", "ka"),
  storyText: bridal(s) ? captionValue("cards.stories.bridal-sunny-ribbon.storyText", "ka") : captionValue("cards.stories.cherry-tower.storyText", "ka"),
  inviteMessage: bridal(s) ? captionValue("cards.stories.bridal-sunny-ribbon.inviteMessage", "ka") : captionValue("cards.stories.cherry-tower.inviteMessage", "ka"),
  galleryTitle: captionValue("cards.stories.bridal-sunny-ribbon.galleryTitle", "ka"), galleryText: captionValue("cards.stories.bridal-sunny-ribbon.galleryText", "ka"),
  storySignoff: bridal(s) ? captionValue("cards.stories.bridal-sunny-ribbon.storySignoff", "ka") : captionValue("cards.stories.cherry-tower.storySignoff", "ka"),
  photoTag: bridal(s) ? captionValue("category.occasion.bachelorette", "ka") : captionValue("cards.stories.cherry-tower.photoTag", "ka"), inviteOpening: captionValue("data.data.poolBirthdayDesigns.story.inviteOpening", "ka"),
  inviteFooter: captionValue("cards.stories.bridal-sunny-ribbon.inviteFooter", "ka"),
  communityTitle: bridal(s) ? captionValue("cards.stories.bridal-sunny-ribbon.communityTitle", "ka") : captionValue("data.data.poolBirthdayDesigns.story.communityTitle", "ka"),
  communityText: captionValue("data.data.poolBirthdayDesigns.story.communityText", "ka"), rsvpTitle: captionValue("ribbonSketch.willYouBeThere.56", "ka"),
  rsvpText: bridal(s) ? captionValue("cards.stories.bridal-sunny-ribbon.rsvpText", "ka") : captionValue("data.data.comicBirthdayDesigns.story.rsvpText", "ka"),
  footer: bridal(s) ? captionValue("cards.stories.bridal-sunny-ribbon.footer", "ka") : captionValue("cards.stories.cherry-tower.footer", "ka"),
});
export const pinkChampagneStories = Object.fromEntries(variants.map((s) => [s.visual, story(s)]));
export const pinkChampagneCaptions = { en: {}, ka: {} };
export const pinkChampagneCardCopy = {};
for (const s of variants) {
  for (const [lang, name, description, mood] of [["en", s.name, s.description, "Pink · retro · gouache"], ["ka", s.kaName, s.kaDescription, captionValue("themes.bridal-cherry-tower.mood", "ka")]]) {
    for (const [key, value] of Object.entries({ name, description, style: description, mood })) pinkChampagneCaptions[lang][`themes.${s.slug}.${key}`] = value;
  }
  const localized = {
    samples: { title: bridal(s) ? captionValue("invitations.pages.CherryTowerExperience.caption7", "ka") : captionValue("invitations.midnight-martini.copy.extraCopy1.birthday", "ka"), name: bridal(s) ? captionValue("ui.invitations.pages.CocktailSummerExperience.mariam", "ka") : captionValue("invitations.pages.SpiderBirthdayExperience.caption3", "ka"), posterName: bridal(s) ? captionValue("ui.invitations.pages.CocktailSummerExperience.mariam", "ka") : captionValue("invitations.pages.SpiderBirthdayExperience.caption3", "ka"), headline: s.kaHeadline, opening: bridal(s) ? captionValue("data.data.selectedBridalDesigns.record2.headline", "ka") : captionValue("ribbonSketch.birthdayGirlEra.96", "ka"), date: captionValue("invitations.midnight-martini.copy.extraCopy1.date", "ka"), location: captionValue("ribbonSketch.tbilisi.120", "ka"), line: kaPhrase(s) },
    designs: { specimen: s.kaHeadline.replace("\n", " "), phrase: kaPhrase(s), accentCard: bridal(s) ? captionValue("data.data.selectedBridalDesigns.record2.headline", "ka") : captionValue("ribbonSketch.birthdayGirlEra.96", "ka"), accentCopy: bridal(s) ? captionValue("cards.designs.bridal-cherry-tower.accentCopy", "ka") : captionValue("cards.designs.birthday-cherry-tower.accentCopy", "ka"), finish: bridal(s) ? captionValue("cards.stories.bridal-sunny-ribbon.storyTitle", "ka") : captionValue("invitations.midnight-martini.copy.extraCopy1.farewell", "ka") },
    events: { title: bridal(s) ? captionValue("invitations.pages.CherryTowerExperience.caption7", "ka") : captionValue("invitations.midnight-martini.copy.extraCopy1.birthday", "ka"), hostName: bridal(s) ? captionValue("ui.invitations.pages.CocktailSummerExperience.mariam", "ka") : captionValue("invitations.pages.SpiderBirthdayExperience.caption3", "ka"), ...(bridal(s) ? { brideName: captionValue("ui.invitations.pages.CocktailSummerExperience.mariam", "ka") } : {}), celebrationName: bridal(s) ? captionValue("category.occasion.bachelorette", "ka") : captionValue("ribbonSketch.birthdayGirlEra.96", "ka"), date: captionValue("invitations.midnight-martini.copy.extraCopy1.date", "ka"), location: captionValue("ribbonSketch.tbilisi.120", "ka"), description: kaPhrase(s) },
  };
  for (const [ns, fields] of Object.entries(localized)) for (const [key, value] of Object.entries(fields)) pinkChampagneCardCopy[`cards.${ns}.${s.slug}.${key}`] = value;
  for (const [key, value] of Object.entries(kaStory(s))) pinkChampagneCardCopy[`cards.stories.${s.visual}.${key}`] = value;
}
