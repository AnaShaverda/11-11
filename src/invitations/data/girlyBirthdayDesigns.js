// Invitation studies: generated artwork stays text-free; all copy is editable and localized.
const studies = [
  {
    slug: "ribbon-sketch", name: "Ribbon Sketch", kaName: "ბაფთის ესკიზი",
    paper: "#fbd5de", ink: "#ad1626", tags: ["line-art", "pastel"],
    description: "A loose red ribbon frames blush paper and airy editorial lettering.",
    kaDescription: "წითელი ბაფთის თავისუფალი ხაზები, ვარდისფერი ქაღალდი და დახვეწილი ასოები.",
    mood: "Blush · red ink · ribbons", kaMood: "ვარდისფერი · წითელი ხაზები · ბაფთები",
    headline: "birthday girl", kaHeadline: "დღის იუბილარი",
    phrase: "A little party, a lot of love.", kaPhrase: "პატარა წვეულება, ბევრი სიყვარული.",
    finish: "Tied together with birthday wishes.", kaFinish: "ბაფთით შეკრული დაბადების დღის სურვილები.",
  },
  {
    slug: "playground", name: "Birthday Playground", kaName: "დაბადების დღის თამაში",
    paper: "#fff5df", ink: "#d71936", tags: ["playful", "pastel"],
    description: "Soft pink waves, ribbon-wrapped presents, and sweet birthday games.",
    kaDescription: "ვარდისფერი ტალღები, ბაფთიანი საჩუქრები და დაბადების დღის თამაშები.",
    mood: "Cherry red · strawberry pink · playful", kaMood: "ალუბლისფერი · ვარდისფერი · მხიარული",
    headline: "it’s my birthday!", kaHeadline: "ჩემი დაბადების დღეა!",
    phrase: "Cake, wishes & good company.", kaPhrase: "ტორტი, სურვილები და საყვარელი ადამიანები.",
    finish: "Come for cake. Stay for the memories.", kaFinish: "მოდი ტორტისთვის, დარჩი მოგონებებისთვის.",
  },
  {
    slug: "white-and-blue", name: "White & Blue", kaName: "თეთრი და ლურჯი",
    paper: "#ffffff", ink: "#1749c8", tags: ["line-art", "light-neutral"],
    description: "A cobalt cake drawing, a loose ink frame, and crisp white paper.",
    kaDescription: "ლურჯი ტორტის ჩანახატი, თავისუფალი ხაზის ჩარჩო და სუფთა თეთრი ქაღალდი.",
    mood: "White · cobalt · clean", kaMood: "თეთრი · ლურჯი · სადა",
    headline: "make a wish", kaHeadline: "ჩაიფიქრე სურვილი",
    phrase: "birthday party", kaPhrase: "დაბადების დღის წვეულება",
    finish: "Blue ink. Bright wishes.", kaFinish: "ლურჯი ხაზები. ნათელი სურვილები.",
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
  title: "Mia’s Birthday", name: "Mia", headline: study.headline,
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
    samples: { title: "მიას დაბადების დღე", name: "მია", headline: study.kaHeadline, opening: study.slug === "playground" ? "ერთად ვიზეიმოთ" : "გეპატიჟებით", date: "23 მაისი 2027 · 17:00", location: "თბილისი", line: study.kaPhrase },
    designs: { specimen: study.kaHeadline, phrase: study.kaPhrase, accentCard: "დაბადების დღის სურვილები", accentCopy: study.kaPhrase, finish: study.kaFinish },
  };
  for (const [namespace, fields] of Object.entries(localized)) {
    for (const [field, value] of Object.entries(fields)) girlyBirthdayCardCopy[`cards.${namespace}.${slug}.${field}`] = value;
  }
}
