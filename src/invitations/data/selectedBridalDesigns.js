import { pinkChampagneStories, pinkChampagneCardCopy } from "./pinkChampagneDesigns.js";

// Separate paper backgrounds, stripe layers and transparent foreground artwork.
export const selectedBridalStudies = [
  {
    "key": "blush-label",
    "code": "01",
    "name": "Blush Label",
    "kaName": "ვარდისფერი ეტიკეტი",
    "headline": "TO THE\nBRIDE",
    "kaHeadline": "პატარძლისთვის",
    "paper": "ivory",
    "ink": "#174a35",
    "accent": "#e4a4b5",
    "mode": "label",
    "font": "zalino",
    "labelInk": "#174a35",
    "labelBox": [37, 58, 24, 26]
  },
  {
    "key": "lilac-pop",
    "code": "03",
    "name": "Lilac Pop",
    "kaName": "იასამნისფერი შამპანური",
    "headline": "HER BIG\nTOAST",
    "kaHeadline": "პატარძლის\nსადღეგრძელო",
    "paper": "lilac",
    "ink": "#4c253f",
    "accent": "#d6aa4d",
    "mode": "label",
    "font": "zalino",
    "labelInk": "#4c253f",
    "labelBox": [36, 64, 27, 26]
  },
  {
    "key": "cherry-clink",
    "code": "06",
    "name": "Cherry Clink",
    "kaName": "ალუბლისფერი სადღეგრძელო",
    "headline": "READY\nTO POP",
    "kaHeadline": "მოდი\nვიზეიმოთ!",
    "paper": "burgundy",
    "ink": "#fff1df",
    "accent": "#e7b557",
    "mode": "standard",
    "font": "zalino"
  },
  {
    "key": "blue-spritz",
    "code": "S1",
    "name": "Blue Spritz",
    "kaName": "ლურჯი შპრიცი",
    "headline": "FEELIN’\nSPRITZY",
    "kaHeadline": "მოდი\nვიზეიმოთ!",
    "paper": "ivory",
    "ink": "#1477b4",
    "accent": "#e7c34b",
    "mode": "stripe",
    "font": "painted-party"
  },
  {
    "key": "pink-stripe-social",
    "code": "S2",
    "name": "Pink Stripe Social",
    "kaName": "ვარდისფერი ზოლების წვეულება",
    "headline": "SIP SIP\nHOORAY",
    "kaHeadline": "მოდი\nვიზეიმოთ!",
    "paper": "ivory",
    "ink": "#153e5b",
    "accent": "#de517b",
    "mode": "stripe",
    "font": "painted-party"
  },
  {
    "key": "mint-cheers",
    "code": "S3",
    "name": "Mint Cheers",
    "kaName": "პიტნისფერი სადღეგრძელო",
    "headline": "CHEERS\nTO US!",
    "kaHeadline": "ჩვენ\nგაგვიმარჯოს!",
    "paper": "ivory",
    "ink": "#174e35",
    "accent": "#a7d6c1",
    "mode": "stripe",
    "font": "painted-party"
  },
  {
    "key": "lilac-happy-hour",
    "code": "S4",
    "name": "Lilac Happy Hour",
    "kaName": "იასამნისფერი ბედნიერი საათი",
    "headline": "HAPPY\nHOUR",
    "kaHeadline": "ბედნიერი\nსაღამო",
    "paper": "ivory",
    "ink": "#693150",
    "accent": "#d3bce1",
    "mode": "stripe",
    "font": "painted-party"
  },
  {
    "key": "pink-country-club",
    "code": "D1",
    "name": "Pink Country Club",
    "kaName": "ვარდისფერი საზაფხულო კლუბი",
    "headline": "STAY\nCOOL",
    "kaHeadline": "ზაფხულის\nსიგრილე",
    "paper": "ivory",
    "ink": "#bd4a70",
    "accent": "#d1a545",
    "mode": "standard",
    "font": "pool"
  },
  {
    "key": "citrus-cool",
    "code": "D2",
    "name": "Citrus Cool",
    "kaName": "ციტრუსის სიგრილე",
    "headline": "SIP INTO\nSUMMER",
    "kaHeadline": "ზაფხულის\nწვეულება",
    "paper": "butter",
    "ink": "#c63c67",
    "accent": "#99bd7b",
    "mode": "standard",
    "font": "pool"
  },
  {
    "key": "cherry-soda",
    "code": "D3",
    "name": "Cherry Soda",
    "kaName": "ალუბლის ლიმონათი",
    "headline": "SWEET\nSUMMER",
    "kaHeadline": "ტკბილი\nზაფხული",
    "paper": "blush",
    "ink": "#143a58",
    "accent": "#c83548",
    "mode": "standard",
    "font": "painted-party"
  },
  {
    "key": "lilac-lemonade",
    "code": "D4",
    "name": "Lilac Lemonade",
    "kaName": "იასამნისფერი ლიმონათი",
    "headline": "A little\nsunshine",
    "kaHeadline": "ცოტაოდენი\nმზე",
    "paper": "lilac",
    "ink": "#642b54",
    "accent": "#ddba48",
    "mode": "standard",
    "font": "pool"
  },
  {
    "key": "mint-bash",
    "code": "F2",
    "name": "Mint Bash",
    "kaName": "პიტნისფერი წვეულება",
    "headline": "POP!\nTO THE BRIDE",
    "kaHeadline": "პატარძალს\nგაუმარჯოს!",
    "paper": "mint",
    "ink": "#164f57",
    "accent": "#ef8c6c",
    "mode": "label",
    "font": "painted-party",
    "labelInk": "#fff4dc",
    "labelBox": [31, 52, 25, 34]
  },
  {
    "key": "sunny-pop",
    "code": "F4",
    "name": "Sunny Pop",
    "kaName": "მზიანი შამპანური",
    "headline": "CHEERS\nTO HER!",
    "kaHeadline": "პატარძალს\nგაუმარჯოს!",
    "paper": "butter",
    "ink": "#173c54",
    "accent": "#e895a3",
    "mode": "label",
    "font": "cocktail",
    "labelInk": "#fff4df",
    "labelBox": [30, 50, 26, 34]
  },
  {
    "key": "blush-boot-club",
    "code": "B1",
    "name": "Blush Boot Club",
    "kaName": "ვარდისფერი ჩექმების კლუბი",
    "headline": "PINK\nBOOT CLUB",
    "kaHeadline": "ვარდისფერი\nჩექმები",
    "paper": "ivory",
    "ink": "#c33865",
    "accent": "#cf963b",
    "mode": "boot",
    "font": "painted-party"
  }
];
selectedBridalStudies.push(
  { key: "mint-ribbon", code: "R1", name: "Mint Ribbon", kaName: "პიტნისფერი ბაფთა", headline: "MINT\nBASH", kaHeadline: "პიტნისფერი\nწვეულება", paper: "mint", ink: "#103e30", accent: "#d95384", mode: "standard", font: "casmera", artwork: "/images/bridal/experience/mint-hero.png" },
  { key: "sunny-ribbon", code: "R2", name: "Sunny Ribbon", kaName: "მზიანი ბაფთა", headline: "SUNNY\nBASH", kaHeadline: "მზიანი\nწვეულება", paper: "butter", ink: "#35182f", accent: "#aa81c6", mode: "standard", font: "casmera", artwork: "/images/bridal/experience/sunny-hero.png" },
);
const studies = selectedBridalStudies;
const slug = (s) => `bridal-${s.key}`;
const records = (fn) => Object.fromEntries(studies.map((s) => [slug(s), fn(s)]));
const paperColors = { ivory: "#faf4e8", blush: "#f5c4cd", butter: "#fff0b7", lilac: "#e7d4ed", mint: "#b7e0d2", burgundy: "#501d2b" };
const paper = (s) => `/images/bridal/selected/backgrounds/${s.paper}-paper.webp`;
const art = (s) => s.artwork || `/images/bridal/selected/${s.key}/foreground.webp`;
const phrase = "Her people. A joyful toast. A beautiful new chapter.";
const kaPhrase = "მისი მეგობრები. მხიარული სადღეგრძელო. მშვენიერი ახალი თავი.";
export const selectedBridalThemes = studies.map((s) => ({ id: slug(s), slug: slug(s), category: "other", subcategory: "bridal-party", name: s.name, description: s.mode === "boot" ? "A pink painted Western boot, ivory paper, and a bridal night made for dancing." : "Hand-painted celebration artwork, textured paper, and a cheerful bridal party.", mood: "Retro · painted · bridal", visual: slug(s), layout: "editorial", decor: "" }));
export const selectedBridalStorefront = records((s) => ({ slug: slug(s), title: s.name, style: selectedBridalThemes.find((t) => t.slug === slug(s)).description }));
export const selectedBridalStyles = records((s) => s.paper === "burgundy" ? ["retro", "dark"] : ["retro", "pastel"]);
export const selectedBridalShowcases = records((s) => ({ palette: [paperColors[s.paper], s.ink, s.accent, "#faf1df"], pattern: "painted-party", type: slug(s), motif: "", specimen: s.headline.replace("\n", " "), phrase, accentCard: "FOR THE BRIDE", accentCopy: "Her people. Her celebration.", finish: "Here’s to her next chapter." }));
export const selectedBridalAssets = records((s) => ({
  selectedBridal: { ...s, artwork: art(s), ...(s.mode === "stripe" ? { stripeImage: `/images/bridal/selected/backgrounds/${s.key}-stripes.webp` } : {}) },
  coverImage: paper(s), invitation: [],
  typography: { image: art(s), right: "4%", bottom: "4%", width: "30%", height: "38%" },
  pattern: { image: paper(s), right: "0", bottom: "0", width: "100%", height: "100%", objectFit: "cover", opacity: .22 },
  supportCards: [null, null, { image: art(s), right: "3%", bottom: "3%", width: "30%", height: "38%" }],
}));
export const selectedBridalPortraits = records(paper);
export const selectedBridalSamples = records((s) => ({ title: "Mariam’s Bridal Party", name: "Mariam", posterName: "Mariam", headline: s.headline, opening: "FOR THE BRIDE", date: "12 SEP 2027", time: "20:00", location: "TBILISI", line: phrase }));
export const selectedBridalEvents = records(() => ({ title: "Mariam’s Bridal Party", brideName: "Mariam", hostName: "Mariam", celebrationName: "Bridal Party", date: "12 September 2027", dateISO: "2027-09-12T20:00:00+04:00", time: "20:00", location: "Tbilisi", description: phrase, enabledModules: ["invitation", "countdown", "gallery", "rsvp"] }));
const sourceStory = pinkChampagneStories["bridal-pink-pop"];
export const selectedBridalStories = Object.fromEntries(studies.map((s) => [slug(s), { ...sourceStory, heroLine: phrase, ...(s.mode === "boot" ? { storyTitle: "A night made for dancing.", inviteMessage: "Bring your dancing boots and your love for the bride." } : {}) }]));
export const selectedBridalCaptions = { en: {}, ka: {} };
export const selectedBridalCardCopy = {};
for (const s of studies) {
  const theme = selectedBridalThemes.find((t) => t.slug === slug(s));
  for (const [lang, name, description, mood] of [
    ["en", s.name, theme.description, theme.mood],
    ["ka", s.kaName, s.mode === "boot" ? "ვარდისფერი ჩექმა, ქაღალდის ტექსტურა და ცეკვისთვის შექმნილი პატარძლის წვეულება." : "დახატული სადღესასწაულო ილუსტრაცია, ქაღალდის ტექსტურა და მხიარული პატარძლის წვეულება.", "რეტრო · დახატული · პატარძლის წვეულება"],
  ]) for (const [key, value] of Object.entries({ name, description, style: description, mood })) selectedBridalCaptions[lang][`themes.${slug(s)}.${key}`] = value;
  const localized = {
    samples: { title: "მარიამის პატარძლის წვეულება", name: "მარიამი", posterName: "მარიამი", headline: s.kaHeadline, opening: "პატარძლისთვის", date: "12 სექტემბერი 2027", location: "თბილისი", line: kaPhrase },
    designs: { specimen: s.kaHeadline.replace("\n", " "), phrase: kaPhrase, accentCard: "პატარძლისთვის", accentCopy: "მისი მეგობრები. მისი დღესასწაული.", finish: "მის ახალ თავს გაუმარჯოს." },
    events: { title: "მარიამის პატარძლის წვეულება", brideName: "მარიამი", hostName: "მარიამი", celebrationName: "პატარძლის წვეულება", date: "12 სექტემბერი 2027", location: "თბილისი", description: kaPhrase },
  };
  for (const [ns, fields] of Object.entries(localized)) for (const [key, value] of Object.entries(fields)) selectedBridalCardCopy[`cards.${ns}.${slug(s)}.${key}`] = value;
  for (const [key, value] of Object.entries(pinkChampagneCardCopy)) {
    const prefix = "cards.stories.bridal-pink-pop.";
    if (key.startsWith(prefix)) selectedBridalCardCopy[`cards.stories.${slug(s)}.${key.slice(prefix.length)}`] = value;
  }
  selectedBridalCardCopy[`cards.stories.${slug(s)}.heroLine`] = kaPhrase;
  if (s.mode === "boot") {
    selectedBridalCardCopy[`cards.stories.${slug(s)}.storyTitle`] = "ცეკვისთვის შექმნილი საღამო.";
    selectedBridalCardCopy[`cards.stories.${slug(s)}.inviteMessage`] = "წამოიღე საცეკვაო ჩექმები და პატარძლისთვის სიყვარული.";
  }
}
