import { captionValue, createCaptionCopy } from "../../localization/captionValues.js";

const slug = "birthday-slice-club";
const visual = "slice-club";
const paper = "/images/birthday/slice-club/scalloped-paper.webp";
const slice = "/images/birthday/slice-club/pizza-slice.webp";
const description = createCaptionCopy("data.data.sliceClubDesign.description").en;
const kaDescription = createCaptionCopy("data.data.sliceClubDesign.description").ka;
const phrase = createCaptionCopy("data.data.sliceClubDesign.phrase").en;
const kaPhrase = createCaptionCopy("data.data.sliceClubDesign.phrase").ka;
const story = { eyebrow: "WELCOME TO THE PIZZA CLUB", heroLine: phrase, ticker: "GOOD FRIENDS · GREAT SLICES", storyTitle: "A birthday by the slice.", storyText: "Join Aniko for pizza, birthday cake, and a joyful afternoon with friends.", inviteMessage: "Your place at the pizza party is waiting.", galleryTitle: "Our slice of happiness.", galleryText: "The little moments we shared together.", storySignoff: "Aniko & family", photoTag: "THE PIZZA CLUB", inviteOpening: "You’re invited", inviteFooter: "GOOD FRIENDS · GREAT SLICES", communityTitle: "A slice of birthday love.", communityText: "Share a wish or a favorite memory.", rsvpTitle: "Will you join the club?", rsvpText: "Save your place at the pizza party.", footer: "ANOTHER DELICIOUS YEAR" };
const kaStory = { eyebrow: captionValue("data.data.sliceClubDesign.story.eyebrow", "ka"), heroLine: kaPhrase, ticker: captionValue("cards.stories.slice-club.inviteFooter", "ka"), storyTitle: captionValue("invitations.pages.PizzaChefExperience.copy2.details", "ka"), storyText: captionValue("invitations.pages.PizzaChefExperience.copy2.intro", "ka"), inviteMessage: captionValue("cards.stories.slice-club.inviteMessage", "ka"), galleryTitle: captionValue("cards.stories.slice-club.galleryTitle", "ka"), galleryText: captionValue("cards.stories.slice-club.galleryText", "ka"), storySignoff: captionValue("data.data.poolBirthdayDesigns.story.storySignoff", "ka"), photoTag: captionValue("invitations.pages.SliceClubExperience.copy1.title", "ka"), inviteOpening: captionValue("data.data.poolBirthdayDesigns.story.inviteOpening", "ka"), inviteFooter: captionValue("cards.stories.slice-club.inviteFooter", "ka"), communityTitle: captionValue("data.data.poolBirthdayDesigns.story.communityTitle", "ka"), communityText: captionValue("data.data.poolBirthdayDesigns.story.communityText", "ka"), rsvpTitle: captionValue("invitations.pages.SliceClubExperience.copy1.rsvp", "ka"), rsvpText: captionValue("cards.stories.slice-club.rsvpText", "ka"), footer: captionValue("cards.stories.slice-club.footer", "ka") };
const captions = { en: {}, ka: {} };
for (const [lang, values] of Object.entries({ en: { name: "Slice Club", description, style: description, mood: "Cornflower · cream · red" }, ka: { name: captionValue("invitations.pages.SliceClubExperience.copy1.title", "ka"), description: kaDescription, style: kaDescription, mood: captionValue("themes.birthday-slice-club.mood", "ka") } })) for (const [key, value] of Object.entries(values)) captions[lang][`themes.${slug}.${key}`] = value;
const cardCopy = {};
const localized = {
  samples: { title: captionValue("invitations.data.pizzaPartyCopy.copy1.title", "ka"), name: captionValue("cards.events.birthday-slice-club.hostName", "ka"), posterName: captionValue("cards.events.birthday-slice-club.hostName", "ka"), headline: captionValue("cards.samples.birthday-slice-club.headline", "ka"), opening: captionValue("ribbonSketch.birthdayGirlEra.96", "ka"), date: captionValue("invitations.pages.PizzaChefExperience.copy1.date", "ka"), location: captionValue("ribbonSketch.tbilisi.120", "ka"), line: kaPhrase },
  designs: { specimen: captionValue("invitations.pages.SliceClubExperience.copy1.title", "ka"), phrase: kaPhrase, accentCard: captionValue("ribbonSketch.birthdayGirlEra.96", "ka"), accentCopy: captionValue("cards.designs.birthday-slice-club.accentCopy", "ka"), finish: captionValue("cards.designs.birthday-slice-club.finish", "ka") },
  events: { title: captionValue("invitations.data.pizzaPartyCopy.copy1.title", "ka"), hostName: captionValue("cards.events.birthday-slice-club.hostName", "ka"), celebrationName: captionValue("invitations.pages.PizzaChefExperience.copy1.title", "ka"), date: captionValue("invitations.pages.PizzaChefExperience.copy1.date", "ka"), location: captionValue("ribbonSketch.tbilisi.120", "ka"), description: kaPhrase },
};
for (const [ns, fields] of Object.entries(localized)) for (const [key, value] of Object.entries(fields)) cardCopy[`cards.${ns}.${slug}.${key}`] = value;
for (const [key, value] of Object.entries(kaStory)) cardCopy[`cards.stories.${visual}.${key}`] = value;
export const sliceClub = {
  themes: [{ id: slug, slug, category: "birthday", name: "Slice Club", description, mood: "Cornflower · cream · red", visual, layout: "editorial", decor: "" }],
  storefront: { [slug]: { slug, title: "Slice Club", style: description } },
  styles: { [slug]: ["retro", "line-art", "pastel"] },
  showcases: { [slug]: { palette: ["#faf2dc", "#c71f2b", "#8caed0"], pattern: "pizza-club", type: visual, motif: "", specimen: "THE PIZZA CLUB", phrase, accentCard: "BIRTHDAY EDITION", accentCopy: "A slice for every friend.", finish: "A celebration for our favorite people." } },
  assets: { [slug]: { pizzaChef: true, coverImage: paper, pizzaIllustration: slice, invitation: [], typography: { image: slice, right: "4%", bottom: "4%", width: "26%", height: "30%" }, pattern: { image: paper, right: "0", bottom: "0", width: "100%", height: "100%", objectFit: "cover", opacity: .22 }, supportCards: [null, null, { image: slice, right: "3%", bottom: "3%", width: "23%", height: "26%" }] } },
  portraits: { [slug]: paper },
  samples: { [slug]: { title: "Aniko’s Pizza Party", name: "Aniko", posterName: "Aniko", posterAge: 7, headline: "THE\nPIZZA\nCLUB", opening: "BIRTHDAY EDITION", date: "18 JULY 2027", time: "14:00", location: "TBILISI", line: phrase } },
  events: { [slug]: { title: "Aniko’s Pizza Party", hostName: "Aniko", celebrationName: "Pizza Party", age: 7, date: "18 July 2027", dateISO: "2027-07-18T14:00:00+04:00", time: "14:00", location: "Tbilisi", description: phrase, enabledModules: ["invitation", "countdown", "gallery", "rsvp"] } },
  stories: { [visual]: story }, captions, cardCopy,
};
