// Approved gouache pool studies; shared imagery across every card presentation.
const studies = [
  { slug: "pink-lido", name: "Pink Lido", kaName: "ვარდისფერი აუზი", palette: ["#fbe1dc", "#be4169", "#9cd5d0", "#f9d46b"], description: "Pink painted stripes, a mint pool, and a little yellow parasol.", kaDescription: "ვარდისფერი დახატული ზოლები, პიტნისფერი აუზი და პატარა ყვითელი ქოლგა." },
  { slug: "blue-splash", name: "Blue Splash", kaName: "ლურჯი შხეფები", palette: ["#f8f2e6", "#075a9f", "#9cd5e0", "#f9d46b"], description: "Loose blue gingham, aqua ripples, and a sunny yellow swim ring.", kaDescription: "ლურჯი დახატული უჯრები, ცისფერი ტალღები და მზიანი ყვითელი საცურაო რგოლი." },
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
export const poolBirthdaySamples = records(() => ({ title: "Mia’s Pool Party", name: "Mia", posterName: "Mia", posterAge: 7, headline: "SPLASH!", opening: "POOL PARTY", date: "18 JULY 2027", time: "14:00", location: "TBILISI", line: "Dive in for a day of sunny fun." }));
export const poolBirthdayEvents = records(() => ({ title: "Mia’s Pool Party", hostName: "Mia", celebrationName: "Pool Party", age: 7, date: "18 July 2027", dateISO: "2027-07-18T14:00:00+04:00", time: "14:00", location: "Tbilisi", description: "Dive in for a day of sunny fun.", enabledModules: ["invitation", "countdown", "gallery", "rsvp"] }));
const story = { eyebrow: "A LITTLE SUNSHINE", heroLine: "Dive in for a day of sunny fun.", ticker: "SUNSHINE · SPLASHES · BIRTHDAY WISHES", storyTitle: "A sunny day with our favorite people.", storyText: "Join Mia for birthday cake, poolside games, and a splash of summer fun.", inviteMessage: "Bring your swimsuit and your brightest birthday wishes.", galleryTitle: "Sunshine memories.", galleryText: "Little moments from a sunny celebration.", storySignoff: "Mia & family", photoTag: "POOL PARTY", inviteOpening: "You’re invited", inviteFooter: "SUNSHINE · GOOD FRIENDS", communityTitle: "A little birthday love.", communityText: "Share a wish or a favorite memory.", rsvpTitle: "Will you dive in?", rsvpText: "Save your place at the pool party.", footer: "SUNNY DAYS · HAPPY BIRTHDAYS" };
export const poolBirthdayStories = Object.fromEntries(studies.map((s) => [s.slug, { ...story }]));
export const poolBirthdayCaptions = { en: {}, ka: {} };
export const poolBirthdayCardCopy = {};
const kaStory = { eyebrow: "ცოტაოდენი მზე", heroLine: "შემოგვიერთდი მზიან და მხიარულ დღეს.", ticker: "მზე · შხეფები · დაბადების დღის სურვილები", storyTitle: "მზიანი დღე საყვარელ ადამიანებთან ერთად.", storyText: "მიასთან ერთად ვიზეიმოთ ტორტით, აუზის თამაშებითა და ზაფხულის მხიარულებით.", inviteMessage: "წამოიღე საცურაო კოსტიუმი და ყველაზე ნათელი სურვილები.", galleryTitle: "მზიანი მოგონებები.", galleryText: "მზიანი დღესასწაულის პატარა მომენტები.", storySignoff: "მია და ოჯახი", photoTag: "აუზის წვეულება", inviteOpening: "გეპატიჟებით", inviteFooter: "მზე · კარგი მეგობრები", communityTitle: "სიყვარულით სავსე სურვილები.", communityText: "გაგვიზიარე სურვილი ან საყვარელი მოგონება.", rsvpTitle: "შემოგვიერთდები?", rsvpText: "დაიკავე ადგილი აუზის წვეულებაზე.", footer: "მზიანი დღეები · ბედნიერი დაბადების დღე" };
for (const s of studies) {
  for (const [lang, name, description, mood] of [["en", s.name, s.description, "Pastel · poolside · painted"], ["ka", s.kaName, s.kaDescription, "პასტელი · აუზი · დახატული"]]) for (const [key, value] of Object.entries({ name, description, style: description, mood })) poolBirthdayCaptions[lang][`themes.${id(s)}.${key}`] = value;
  const localized = {
    samples: { title: "მიას აუზის წვეულება", name: "მია", posterName: "მია", headline: "შხეფები!", opening: "აუზის წვეულება", date: "18 ივლისი 2027", location: "თბილისი", line: "შემოგვიერთდი მზიან და მხიარულ დღეს." },
    designs: { specimen: "შხეფები!", phrase: "შემოგვიერთდი მზიან და მხიარულ დღეს.", accentCard: "აუზის წვეულება", accentCopy: "მზე, შხეფები და დაბადების დღის სურვილები.", finish: "ცოტაოდენი მზე. ბევრი სიხარული." },
    events: { title: "მიას აუზის წვეულება", hostName: "მია", celebrationName: "აუზის წვეულება", date: "18 ივლისი 2027", location: "თბილისი", description: "შემოგვიერთდი მზიან და მხიარულ დღეს." },
  };
  for (const [namespace, fields] of Object.entries(localized)) for (const [field, value] of Object.entries(fields)) poolBirthdayCardCopy[`cards.${namespace}.${id(s)}.${field}`] = value;
  for (const [field, value] of Object.entries(kaStory)) poolBirthdayCardCopy[`cards.stories.${s.slug}.${field}`] = value;
}
