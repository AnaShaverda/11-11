import { sliceClub } from "./sliceClubDesign.js";
const slug = "birthday-little-pizza-chef";
const visual = "little-pizza-chef";
const paper = "/images/birthday/little-pizza-chef/sage-paper.webp";
const pizza = "/images/birthday/little-pizza-chef/pizza-peel.webp";
const description = "Sage painted stripes, red pizza sketches, and a birthday made for little chefs.";
const kaDescription = "დახატული სალბისფერი ზოლები, პიცის წითელი ჩანახატი და პატარა შეფების დაბადების დღე.";
const phrase = "A little dough. A lot of birthday fun.";
const kaPhrase = "ცოტაოდენი ცომი. ბევრი მხიარულება.";
export const pizzaBirthdayThemes = [{ id: slug, slug, category: "birthday", name: "Little Pizza Chef", description, mood: "Sage · red · pizzeria", visual, layout: "editorial", decor: "" }, ...sliceClub.themes];
export const pizzaBirthdayStorefront = { [slug]: { slug, title: "Little Pizza Chef", style: description }, ...sliceClub.storefront };
export const pizzaBirthdayStyles = { [slug]: ["retro", "green", "line-art"], ...sliceClub.styles };
export const pizzaBirthdayShowcases = { [slug]: { palette: ["#faf2dc", "#c71f2b", "#d3d8ae", "#66794b"], pattern: "pizza-chef", type: visual, motif: "", specimen: "LET’S MAKE PIZZA!", phrase, accentCard: "PIZZA PARTY", accentCopy: "Mix, make & celebrate.", finish: "Made with love. Shared with friends." }, ...sliceClub.showcases };
export const pizzaBirthdayAssets = { [slug]: { pizzaChef: true, coverImage: paper, pizzaIllustration: pizza, invitation: [], typography: { image: pizza, right: "4%", bottom: "4%", width: "32%", height: "32%" }, pattern: { image: paper, right: "0", bottom: "0", width: "100%", height: "100%", objectFit: "cover", opacity: .22 }, supportCards: [null, null, { image: pizza, right: "3%", bottom: "3%", width: "26%", height: "26%" }] }, ...sliceClub.assets };
export const pizzaBirthdayPortraits = { [slug]: paper, ...sliceClub.portraits };
export const pizzaBirthdaySamples = { [slug]: { title: "Aniko’s Pizza Party", name: "Aniko", posterName: "Aniko", posterAge: 7, headline: "LET’S MAKE\nPIZZA!", opening: "PIZZA PARTY", date: "18 JULY 2027", time: "14:00", location: "TBILISI", line: phrase }, ...sliceClub.samples };
export const pizzaBirthdayEvents = { [slug]: { title: "Aniko’s Pizza Party", hostName: "Aniko", celebrationName: "Pizza Party", age: 7, date: "18 July 2027", dateISO: "2027-07-18T14:00:00+04:00", time: "14:00", location: "Tbilisi", description: phrase, enabledModules: ["invitation", "countdown", "gallery", "rsvp"] }, ...sliceClub.events };
const story = { eyebrow: "CALLING LITTLE CHEFS", heroLine: phrase, ticker: "MIX · MAKE · CELEBRATE", storyTitle: "A birthday fresh from the oven.", storyText: "Join Aniko for pizza-making, birthday cake, and a little kitchen fun with friends.", inviteMessage: "Bring your favorite toppings and your birthday wishes.", galleryTitle: "Our little chefs.", galleryText: "The happy moments we made together.", storySignoff: "Aniko & family", photoTag: "PIZZA PARTY", inviteOpening: "You’re invited", inviteFooter: "MADE WITH LOVE · SHARED WITH FRIENDS", communityTitle: "Birthday wishes for the chef.", communityText: "Share a wish or a favorite memory.", rsvpTitle: "Will you make pizza with us?", rsvpText: "Save your place at the pizza party.", footer: "ANOTHER DELICIOUS YEAR" };
const kaStory = { eyebrow: "პატარა შეფებო, გელოდებით", heroLine: kaPhrase, ticker: "მოვზილოთ · მოვამზადოთ · ვიზეიმოთ", storyTitle: "ღუმელიდან გამოსული დაბადების დღე.", storyText: "ანიკოსთან ერთად მოვამზადოთ პიცა, მივირთვათ ტორტი და გავერთოთ მეგობრებთან.", inviteMessage: "წამოიღე საყვარელი ინგრედიენტები და დაბადების დღის სურვილები.", galleryTitle: "ჩვენი პატარა შეფები.", galleryText: "ბედნიერი მომენტები, რომლებიც ერთად შევქმენით.", storySignoff: "ანიკო და ოჯახი", photoTag: "პიცის წვეულება", inviteOpening: "გეპატიჟებით", inviteFooter: "სიყვარულით მომზადებული · მეგობრებთან გაზიარებული", communityTitle: "სურვილები პატარა შეფს.", communityText: "გაგვიზიარე სურვილი ან საყვარელი მოგონება.", rsvpTitle: "ჩვენთან ერთად მოამზადებ პიცას?", rsvpText: "დაიკავე ადგილი პიცის წვეულებაზე.", footer: "კიდევ ერთი გემრიელი წელი" };
export const pizzaBirthdayStories = { [visual]: story, ...sliceClub.stories };
export const pizzaBirthdayCaptions = { en: {}, ka: {} };
for (const [lang, values] of Object.entries({ en: { name: "Little Pizza Chef", description, style: description, mood: "Sage · red · pizzeria" }, ka: { name: "პატარა პიცის შეფი", description: kaDescription, style: kaDescription, mood: "სალბისფერი · წითელი · პიცერია" } })) for (const [key, value] of Object.entries(values)) pizzaBirthdayCaptions[lang][`themes.${slug}.${key}`] = value;
export const pizzaBirthdayCardCopy = {};
const localized = {
  samples: { title: "ანიკოს პიცის წვეულება", name: "ანიკო", posterName: "ანიკო", headline: "მოვამზადოთ\nპიცა!", opening: "პიცის წვეულება", date: "18 ივლისი 2027", location: "თბილისი", line: kaPhrase },
  designs: { specimen: "მოვამზადოთ პიცა!", phrase: kaPhrase, accentCard: "პიცის წვეულება", accentCopy: "მოვზილოთ, მოვამზადოთ და ვიზეიმოთ.", finish: "სიყვარულით მომზადებული. მეგობრებთან გაზიარებული." },
  events: { title: "ანიკოს პიცის წვეულება", hostName: "ანიკო", celebrationName: "პიცის წვეულება", date: "18 ივლისი 2027", location: "თბილისი", description: kaPhrase },
};
for (const [namespace, fields] of Object.entries(localized)) for (const [field, value] of Object.entries(fields)) pizzaBirthdayCardCopy[`cards.${namespace}.${slug}.${field}`] = value;
for (const [field, value] of Object.entries(kaStory)) pizzaBirthdayCardCopy[`cards.stories.${visual}.${field}`] = value;
Object.assign(pizzaBirthdayCaptions.en, sliceClub.captions.en);
Object.assign(pizzaBirthdayCaptions.ka, sliceClub.captions.ka);
Object.assign(pizzaBirthdayCardCopy, sliceClub.cardCopy);
