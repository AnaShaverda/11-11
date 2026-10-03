const slug = "birthday-slice-club";
const visual = "slice-club";
const paper = "/images/birthday/slice-club/scalloped-paper.webp";
const slice = "/images/birthday/slice-club/pizza-slice.webp";
const description = "Cornflower paper, a cream scalloped panel, and playful red pizza slices.";
const kaDescription = "ლურჯი ქაღალდი, ტალღოვანი კრემისფერი ჩარჩო და მხიარული წითელი პიცის ნაჭრები.";
const phrase = "Good friends. Great slices. Happy birthdays.";
const kaPhrase = "კარგი მეგობრები. გემრიელი პიცა. ბედნიერი დაბადების დღე.";
const story = { eyebrow: "WELCOME TO THE PIZZA CLUB", heroLine: phrase, ticker: "GOOD FRIENDS · GREAT SLICES", storyTitle: "A birthday by the slice.", storyText: "Join Mia for pizza, birthday cake, and a joyful afternoon with friends.", inviteMessage: "Your place at the pizza party is waiting.", galleryTitle: "Our slice of happiness.", galleryText: "The little moments we shared together.", storySignoff: "Mia & family", photoTag: "THE PIZZA CLUB", inviteOpening: "You’re invited", inviteFooter: "GOOD FRIENDS · GREAT SLICES", communityTitle: "A slice of birthday love.", communityText: "Share a wish or a favorite memory.", rsvpTitle: "Will you join the club?", rsvpText: "Save your place at the pizza party.", footer: "ANOTHER DELICIOUS YEAR" };
const kaStory = { eyebrow: "კეთილი იყოს შენი მობრძანება პიცის კლუბში", heroLine: kaPhrase, ticker: "კარგი მეგობრები · გემრიელი პიცა", storyTitle: "დაბადების დღე პიცის ნაჭრებით.", storyText: "მიასთან ერთად მივირთვათ პიცა, ტორტი და გავატაროთ მხიარული დღე მეგობრებთან.", inviteMessage: "შენი ადგილი პიცის წვეულებაზე გელოდება.", galleryTitle: "ჩვენი ბედნიერების ნაჭერი.", galleryText: "პატარა მომენტები, რომლებიც ერთად გავიზიარეთ.", storySignoff: "მია და ოჯახი", photoTag: "პიცის კლუბი", inviteOpening: "გეპატიჟებით", inviteFooter: "კარგი მეგობრები · გემრიელი პიცა", communityTitle: "სიყვარულით სავსე სურვილები.", communityText: "გაგვიზიარე სურვილი ან საყვარელი მოგონება.", rsvpTitle: "შემოუერთდები კლუბს?", rsvpText: "დაიკავე ადგილი პიცის წვეულებაზე.", footer: "კიდევ ერთი გემრიელი წელი" };
const captions = { en: {}, ka: {} };
for (const [lang, values] of Object.entries({ en: { name: "Slice Club", description, style: description, mood: "Cornflower · cream · red" }, ka: { name: "პიცის კლუბი", description: kaDescription, style: kaDescription, mood: "ლურჯი · კრემისფერი · წითელი" } })) for (const [key, value] of Object.entries(values)) captions[lang][`themes.${slug}.${key}`] = value;
const cardCopy = {};
const localized = {
  samples: { title: "მიას პიცის წვეულება", name: "მია", posterName: "მია", headline: "პიცის\nკლუბი", opening: "დაბადების დღე", date: "18 ივლისი 2027", location: "თბილისი", line: kaPhrase },
  designs: { specimen: "პიცის კლუბი", phrase: kaPhrase, accentCard: "დაბადების დღე", accentCopy: "ყველა მეგობარს ეკუთვნის თავისი ნაჭერი.", finish: "დღესასწაული ჩვენი საყვარელი ადამიანებისთვის." },
  events: { title: "მიას პიცის წვეულება", hostName: "მია", celebrationName: "პიცის წვეულება", date: "18 ივლისი 2027", location: "თბილისი", description: kaPhrase },
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
  samples: { [slug]: { title: "Mia’s Pizza Party", name: "Mia", posterName: "Mia", posterAge: 7, headline: "THE\nPIZZA\nCLUB", opening: "BIRTHDAY EDITION", date: "18 JULY 2027", time: "14:00", location: "TBILISI", line: phrase } },
  events: { [slug]: { title: "Mia’s Pizza Party", hostName: "Mia", celebrationName: "Pizza Party", age: 7, date: "18 July 2027", dateISO: "2027-07-18T14:00:00+04:00", time: "14:00", location: "Tbilisi", description: phrase, enabledModules: ["invitation", "countdown", "gallery", "rsvp"] } },
  stories: { [visual]: story }, captions, cardCopy,
};
