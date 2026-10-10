// The two approved gouache illustrations are shared by birthday and bridal cards.
const studies = [
  { art: "pink-pop", name: "Pink Pop", kaName: "ვარდისფერი ბუშტუკები", ink: "#153d58", headline: "POP THE\nBUBBLY!", kaHeadline: "მოდი\nვიზეიმოთ!", description: "Blush paper, a navy champagne bottle, and raspberry flutes.", kaDescription: "ვარდისფერი ქაღალდი, მუქი ლურჯი შამპანურის ბოთლი და ჟოლოსფერი ბოკლები." },
  { art: "cherry-tower", name: "Cherry Tower", kaName: "ალუბლისფერი ბოკლების კოშკი", ink: "#a51e37", headline: "LET’S\nCELEBRATE!", kaHeadline: "მოდი\nვიზეიმოთ!", description: "Pink paper, a cherry-red champagne tower, and a playful popping cork.", kaDescription: "ვარდისფერი ქაღალდი, ალუბლისფერი ბოკლების კოშკი და მხიარული შამპანურის საცობი." },
];
const variants = studies.flatMap((s) => ["birthday", "bridal"].map((occasion) => ({
  ...s, occasion, slug: `${occasion}-${s.art}`, visual: occasion === "bridal" ? `bridal-${s.art}` : s.art,
})));
const records = (fn, predicate = () => true) => Object.fromEntries(variants.filter(predicate).map((s) => [s.slug, fn(s)]));
const bridal = (s) => s.occasion === "bridal";
const phrase = (s) => bridal(s) ? "A toast to the bride and all her favorite people." : "A birthday toast to good friends and another lovely year.";
const kaPhrase = (s) => bridal(s) ? "სადღეგრძელო პატარძალს და მის საყვარელ ადამიანებს." : "სადღეგრძელო კარგ მეგობრებს და კიდევ ერთ მშვენიერ წელს.";
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
  eyebrow: bridal(s) ? "პატარძლის სადღეგრძელო" : "დაბადების დღის სადღეგრძელო", heroLine: kaPhrase(s),
  ticker: bridal(s) ? "პატარძალი · მეგობრები · შამპანური" : "კარგი მეგობრები · ბედნიერი დაბადების დღე",
  storyTitle: bridal(s) ? "მის ახალ თავს გაუმარჯოს." : "კიდევ ერთ მშვენიერ წელს გაუმარჯოს.",
  storyText: bridal(s) ? "მარიამთან ერთად ვიზეიმოთ პატარძლის წვეულება და გავატაროთ მხიარული საღამო საყვარელ ადამიანებთან." : "დეასთან ერთად ვიზეიმოთ ტორტით, სადღეგრძელოთი და მეგობრებთან გატარებული საღამოთი.",
  inviteMessage: bridal(s) ? "წამოიღე პატარძლისთვის სიყვარული. შენთვის ადგილს შევინახავთ." : "წამოიღე დაბადების დღის სურვილები. შენთვის ადგილს შევინახავთ.",
  galleryTitle: "ჩვენი საყვარელი მომენტები.", galleryText: "დასამახსოვრებელი საღამო.",
  storySignoff: bridal(s) ? "სიყვარულით, მარიამი" : "სიყვარულით, დეა",
  photoTag: bridal(s) ? "პატარძლის წვეულება" : "მოდი ვიზეიმოთ", inviteOpening: "გეპატიჟებით",
  inviteFooter: "კარგი მეგობრები · მშვენიერი საღამო",
  communityTitle: bridal(s) ? "სიყვარულით სავსე სურვილები პატარძალს." : "სიყვარულით სავსე სურვილები.",
  communityText: "გაგვიზიარე სურვილი ან საყვარელი მოგონება.", rsvpTitle: "შემოგვიერთდები?",
  rsvpText: bridal(s) ? "დაიკავე ადგილი პატარძლის წვეულებაზე." : "დაიკავე ადგილი დაბადების დღის წვეულებაზე.",
  footer: bridal(s) ? "პატარძალს გაუმარჯოს" : "კიდევ ერთ მშვენიერ წელს გაუმარჯოს",
});
export const pinkChampagneStories = Object.fromEntries(variants.map((s) => [s.visual, story(s)]));
export const pinkChampagneCaptions = { en: {}, ka: {} };
export const pinkChampagneCardCopy = {};
for (const s of variants) {
  for (const [lang, name, description, mood] of [["en", s.name, s.description, "Pink · retro · gouache"], ["ka", s.kaName, s.kaDescription, "ვარდისფერი · რეტრო · გუაში"]]) {
    for (const [key, value] of Object.entries({ name, description, style: description, mood })) pinkChampagneCaptions[lang][`themes.${s.slug}.${key}`] = value;
  }
  const localized = {
    samples: { title: bridal(s) ? "მარიამის პატარძლის წვეულება" : "დეას დაბადების დღე", name: bridal(s) ? "მარიამი" : "დეა", posterName: bridal(s) ? "მარიამი" : "დეა", headline: s.kaHeadline, opening: bridal(s) ? "პატარძლისთვის" : "დაბადების დღე", date: "12 სექტემბერი 2027", location: "თბილისი", line: kaPhrase(s) },
    designs: { specimen: s.kaHeadline.replace("\n", " "), phrase: kaPhrase(s), accentCard: bridal(s) ? "პატარძლისთვის" : "დაბადების დღე", accentCopy: bridal(s) ? "მისი მეგობრები. ცოტაოდენი შამპანური." : "კარგი მეგობრები. ბედნიერი დაბადების დღე.", finish: bridal(s) ? "მის ახალ თავს გაუმარჯოს." : "კიდევ ერთ მშვენიერ წელს გაუმარჯოს." },
    events: { title: bridal(s) ? "მარიამის პატარძლის წვეულება" : "დეას დაბადების დღე", hostName: bridal(s) ? "მარიამი" : "დეა", ...(bridal(s) ? { brideName: "მარიამი" } : {}), celebrationName: bridal(s) ? "პატარძლის წვეულება" : "დაბადების დღე", date: "12 სექტემბერი 2027", location: "თბილისი", description: kaPhrase(s) },
  };
  for (const [ns, fields] of Object.entries(localized)) for (const [key, value] of Object.entries(fields)) pinkChampagneCardCopy[`cards.${ns}.${s.slug}.${key}`] = value;
  for (const [key, value] of Object.entries(kaStory(s))) pinkChampagneCardCopy[`cards.stories.${s.visual}.${key}`] = value;
}
