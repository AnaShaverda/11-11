// Approved retro gouache studies, with shared illustrations in every presentation.
const studies = [
  { visual: "midnight-martini", name: "Midnight Martini", kaName: "შუაღამის მარტინი", palette: ["#153d58", "#faf0d9", "#e9a8ae", "#dab044"], paper: "navy-paper", art: "martini-artwork", headline: "LET’S\nCELEBRATE", kaHeadline: "მოდი\nვიზეიმოთ!", description: "Inky navy paper, an ivory martini, and a little retro birthday sparkle.", kaDescription: "მუქი ლურჯი ქაღალდი, სპილოსძვლისფერი მარტინი და დაბადების დღის რეტრო ელვარება.", styles: ["retro", "bold", "minimal"] },
  { visual: "peach-fizz", name: "Peach Fizz", kaName: "ატმისფერი შუშხუნა", palette: ["#f7c0ae", "#153d58", "#aa91c2", "#e6ac24"], paper: "peach-paper", art: "coupe-artwork", headline: "SIP SIP\nHOORAY!", kaHeadline: "მოდი\nვიზეიმოთ!", description: "Peach painted stripes, lilac and golden coupes, and a cheerful birthday toast.", kaDescription: "ატმისფერი დახატული ზოლები, იასამნისფერი და ოქროსფერი ბოკლები და მხიარული სადღეგრძელო.", styles: ["retro", "pastel"] },
];
const id = (s) => `birthday-${s.visual}`;
const image = (s, name) => `/images/birthday/${s.visual}/${name}.webp`;
const records = (fn) => Object.fromEntries(studies.map((s) => [id(s), fn(s)]));
const phrase = "A birthday toast to good friends and another lovely year.";
const kaPhrase = "სადღეგრძელო კარგ მეგობრებს და კიდევ ერთ მშვენიერ წელს.";
export const cocktailBirthdayThemes = studies.map((s) => ({ id: id(s), slug: id(s), category: "birthday", name: s.name, description: s.description, mood: "Retro · gouache · birthday toast", visual: s.visual, layout: "editorial", decor: "" }));
export const cocktailBirthdayStorefront = records((s) => ({ slug: id(s), title: s.name, style: s.description }));
export const cocktailBirthdayStyles = records((s) => s.styles);
export const cocktailBirthdayShowcases = records((s) => ({ palette: s.palette, pattern: "painted-toast", type: s.visual, motif: "", specimen: s.headline.replace("\n", " "), phrase, accentCard: "BIRTHDAY TOAST", accentCopy: "Good friends. Happy birthdays.", finish: "Here’s to another lovely year." }));
export const cocktailBirthdayAssets = records((s) => ({ paintedCocktail: true, coverImage: image(s, s.paper), cocktailIllustration: image(s, s.art), invitation: [], typography: { image: image(s, s.art), right: "4%", bottom: "4%", width: "30%", height: "38%" }, pattern: { image: image(s, s.paper), right: "0", bottom: "0", width: "100%", height: "100%", objectFit: "cover", opacity: .22 }, supportCards: [null, null, { image: image(s, s.art), right: "3%", bottom: "3%", width: "30%", height: "38%" }] }));
export const cocktailBirthdayPortraits = records((s) => image(s, s.paper));
export const cocktailBirthdaySamples = records((s) => ({ title: "Nino’s Birthday Toast", name: "Nino", posterName: "Nino", posterAge: 30, headline: s.headline, opening: "BIRTHDAY TOAST", date: "12 SEP 2027", time: "20:00", location: "TBILISI", line: phrase }));
export const cocktailBirthdayEvents = records(() => ({ title: "Nino’s Birthday Toast", hostName: "Nino", celebrationName: "Birthday Toast", age: 30, date: "12 September 2027", dateISO: "2027-09-12T20:00:00+04:00", time: "20:00", location: "Tbilisi", description: phrase, enabledModules: ["invitation", "countdown", "gallery", "rsvp"] }));
const story = { eyebrow: "A BIRTHDAY TOAST", heroLine: phrase, ticker: "GOOD FRIENDS · HAPPY BIRTHDAYS", storyTitle: "Here’s to another lovely year.", storyText: "Join Nino for birthday cake, a toast, and a happy evening with friends.", inviteMessage: "Bring your birthday wishes. We’ll save you a place.", galleryTitle: "Our favorite moments.", galleryText: "An evening worth remembering.", storySignoff: "With love, Nino", photoTag: "LET’S CELEBRATE", inviteOpening: "You’re invited", inviteFooter: "GOOD FRIENDS · A LOVELY EVENING", communityTitle: "A little birthday love.", communityText: "Share a wish or a favorite memory.", rsvpTitle: "Will you join the toast?", rsvpText: "Save your place at the birthday celebration.", footer: "HERE’S TO ANOTHER LOVELY YEAR" };
const kaStory = { eyebrow: "დაბადების დღის სადღეგრძელო", heroLine: kaPhrase, ticker: "კარგი მეგობრები · ბედნიერი დაბადების დღე", storyTitle: "კიდევ ერთ მშვენიერ წელს გაუმარჯოს.", storyText: "ნინოსთან ერთად ვიზეიმოთ ტორტით, სადღეგრძელოთი და მეგობრებთან გატარებული საღამოთი.", inviteMessage: "წამოიღე დაბადების დღის სურვილები. შენთვის ადგილს შევინახავთ.", galleryTitle: "ჩვენი საყვარელი მომენტები.", galleryText: "დასამახსოვრებელი საღამო.", storySignoff: "სიყვარულით, ნინო", photoTag: "მოდი ვიზეიმოთ", inviteOpening: "გეპატიჟებით", inviteFooter: "კარგი მეგობრები · მშვენიერი საღამო", communityTitle: "სიყვარულით სავსე სურვილები.", communityText: "გაგვიზიარე სურვილი ან საყვარელი მოგონება.", rsvpTitle: "შემოგვიერთდები?", rsvpText: "დაიკავე ადგილი დაბადების დღის წვეულებაზე.", footer: "კიდევ ერთ მშვენიერ წელს გაუმარჯოს" };
export const cocktailBirthdayStories = Object.fromEntries(studies.map((s) => [s.visual, story]));
export const cocktailBirthdayCaptions = { en: {}, ka: {} };
export const cocktailBirthdayCardCopy = {};
for (const s of studies) {
  for (const [lang, name, description, mood] of [["en", s.name, s.description, "Retro · gouache · birthday toast"], ["ka", s.kaName, s.kaDescription, "რეტრო · გუაში · სადღეგრძელო"]]) {
    for (const [key, value] of Object.entries({ name, description, style: description, mood })) cocktailBirthdayCaptions[lang][`themes.${id(s)}.${key}`] = value;
  }
  const localized = {
    samples: { title: "ნინოს დაბადების დღე", name: "ნინო", posterName: "ნინო", headline: s.kaHeadline, opening: "დაბადების დღე", date: "12 სექტემბერი 2027", location: "თბილისი", line: kaPhrase },
    designs: { specimen: s.kaHeadline.replace("\n", " "), phrase: kaPhrase, accentCard: "დაბადების დღე", accentCopy: "კარგი მეგობრები. ბედნიერი დაბადების დღე.", finish: "კიდევ ერთ მშვენიერ წელს გაუმარჯოს." },
    events: { title: "ნინოს დაბადების დღე", hostName: "ნინო", celebrationName: "დაბადების დღე", date: "12 სექტემბერი 2027", location: "თბილისი", description: kaPhrase },
  };
  for (const [ns, fields] of Object.entries(localized)) for (const [key, value] of Object.entries(fields)) cocktailBirthdayCardCopy[`cards.${ns}.${id(s)}.${key}`] = value;
  for (const [key, value] of Object.entries(kaStory)) cocktailBirthdayCardCopy[`cards.stories.${s.visual}.${key}`] = value;
}
