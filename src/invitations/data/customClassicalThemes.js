import { createCaptionCopy } from "../../localization/captionValues.js";
const asset = (name) => `/images/custom-classical/${name}.webp`;

export const classicalScenes = {
  church: asset("heritage-church"),
  garden: asset("garden-reception"),
  manor: asset("midnight-manor"),
  blushGarden: asset("pastel-bloom"),
  sageGarden: asset("sage-meadow"),
  lavenderTerrace: asset("lavender-hour"),
  blueCourtyard: asset("blue-porcelain"),
};

export const classicalPapers = {
  ivory: asset("ivory-paper"),
  rose: asset("rose-paper"),
  navy: asset("navy-paper"),
  umber: asset("umber-paper"),
  sagePaper: asset("sage-paper"),
  lavenderPaper: asset("lavender-paper"),
  bluePaper: asset("blue-paper"),
  embossedIvory: asset("embossed-ivory"),
  embossedSage: asset("embossed-sage"),
};

const themeDetailsDrawings = {
  somethingBlue: "somethingBlue",
  pressedRose: "pressedRose",
  pearlLetter: "pearlLetter",
  lilacWhisper: "pearlLetter",
  autumn: "autumn",
  rtveli: "rtveli",
  couplePortrait: "pearlLetter",
  couplePortraitDark: "pearlLetter",
};

export function getDetailsArtwork(themeId) {
  if (themeId?.startsWith("christening")) return getClassicalTheme(themeId).illustration;
  return `/images/wedding-themes/${themeDetailsDrawings[legacyThemeIds[themeId] ?? themeId] ?? "ivoryDetails"}-illustration.webp`;
}

export const footerScenes = {
  church: asset("footer-church"),
  vineyard: asset("footer-vineyard"),
  wine: asset("footer-wine"),
  grapes: asset("footer-grapes"),
  landscape: asset("footer-landscape"),
};

export const classicalOrnaments = {
  laurel: asset("ivory-laurel"),
  roseBranch: asset("sepia-rose"),
  fern: asset("ivory-fern"),
  goldBotanical: asset("gold-botanical"),
  silverBotanical: asset("silver-botanical"),
};

export const ornamentTones = {
  ivory: "#f5ebdc",
  champagne: "#e7cdb0",
  paleGold: "#efe0ab",
  gold: "#d8bc83",
  antiqueGold: "#aa7d40",
  pearlSilver: "#edf0f0",
  silver: "#c2ccd2",
  antiqueSilver: "#8f9ba4",
  copper: "#c9947e",
  sage: "#d3ddc5",
  blush: "#edcbd3",
  lilac: "#d9cbe6",
  powderBlue: "#d0e0eb",
};

export const classicalThemes = [
  {
    id: "somethingBlue",
    number: "02",
    name: createCaptionCopy("invitations.data.customClassicalThemes.copy1"),
    color: "#f1f3f2",
    ink: "#354553",
    accent: "#8499a8",
    paper: "ivory",
    frame: "stationery",
    frameShape: "rectangle",
    pattern: "plain",
    font: "serif",
    layout: "center",
    scene: "",
    footerScene: "none",
    ornament: "",
    italic: false,
    frameAsset: "/images/wedding-themes/somethingBlue-square-frame.svg",
    ornamentAsset: "/images/wedding-themes/somethingBlue-ornaments.webp",
    illustration: "/images/wedding-themes/somethingBlue-illustration.webp",
  },
  {
    id: "pressedRose",
    number: "03",
    name: createCaptionCopy("invitations.data.customClassicalThemes.copy2"),
    color: "#f5eae3",
    ink: "#614c3c",
    accent: "#b48a76",
    paper: "rose",
    frame: "stationery",
    frameShape: "rectangle",
    pattern: "plain",
    font: "serif",
    layout: "center",
    scene: "",
    footerScene: "none",
    ornament: "",
    italic: true,
    frameAsset: "/images/wedding-themes/pressedRose-frame.webp",
    ornamentAsset: "/images/wedding-themes/pressedRose-ornaments.webp",
    illustration: "/images/wedding-themes/pressedRose-illustration.webp",
  },

  {
    id: "pearlLetter",
    number: "05",
    name: createCaptionCopy("invitations.data.customClassicalThemes.copy3"),
    color: "#f1efea",
    ink: "#4e4c47",
    accent: "#aaa69c",
    paper: "ivory",
    frame: "stationery",
    frameShape: "rectangle",
    pattern: "plain",
    font: "serif",
    layout: "center",
    scene: "",
    footerScene: "none",
    ornament: "",
    italic: false,
    frameAsset: "/images/wedding-themes/pearlLetter-frame.webp",
    ornamentAsset: "/images/wedding-themes/pearlLetter-ornaments-v2.webp",
    illustration: "/images/wedding-themes/pearlLetter-illustration.webp",
  },
  {
    id: "lilacWhisper",
    number: "06",
    name: createCaptionCopy("invitations.data.customClassicalThemes.copy4"),
    color: "#f3eff3",
    ink: "#554e59",
    accent: "#b0a0ba",
    paper: "ivory",
    frame: "stationery",
    frameShape: "rectangle",
    pattern: "plain",
    font: "serif",
    layout: "center",
    scene: "",
    footerScene: "none",
    ornament: "",
    italic: true,
    frameAsset: "/images/wedding-themes/lilacWhisper-frame.webp",
    ornamentAsset: "/images/wedding-themes/lilacWhisper-ornaments.webp",
    illustration: "/images/wedding-themes/lilacWhisper-illustration.webp",
  },

  {
    id: "autumn",
    number: "11",
    name: createCaptionCopy("invitations.data.customClassicalThemes.copy5"),
    color: "#f4ecdf",
    ink: "#66462f",
    accent: "#ad7950",
    frameAsset: "/images/wedding-themes/quietParchment-frame.webp",
    ornamentAsset: "/images/wedding-themes/autumn-ornaments.webp",
    illustration: "/images/wedding-themes/autumn-illustration.webp",
    paper: "ivory",
    frame: "stationery",
    frameShape: "rectangle",
    pattern: "plain",
    font: "serif",
    layout: "center",
    scene: "",
    footerScene: "none",
    ornament: "",
    italic: false,
  },
  {
    id: "rtveli",
    number: "12",
    name: createCaptionCopy("invitations.data.customClassicalThemes.copy6"),
    color: "#f1ecdf",
    ink: "#573a43",
    accent: "#8f6772",
    frameAsset: "/images/wedding-themes/champagneVows-frame.webp",
    ornamentAsset: "/images/wedding-themes/rtveli-ornaments.webp",
    illustration: "/images/wedding-themes/rtveli-illustration.webp",
    paper: "ivory",
    frame: "stationery",
    frameShape: "rectangle",
    pattern: "plain",
    font: "serif",
    layout: "center",
    scene: "",
    footerScene: "none",
    ornament: "",
    italic: false,
  },
];

// Photo cover stays confined to the first invitation card.
export const portraitSamplePhoto = "/images/wedding/portrait-sample.png";
classicalThemes.push({
  color: "#efe9db",
  ink: "#514b36",
  accent: "#a29471",
  paper: "ivory",
  frame: "stationery",
  frameShape: "arch",
  pattern: "plain",
  font: "serif",
  layout: "center",
  scene: "",
  footerScene: "none",
  ornament: "",
  italic: true,
  frameAsset: "/images/wedding-themes/quietParchment-frame.webp",
  id: "couplePortrait",
  number: "13",
  name: createCaptionCopy("invitations.data.customClassicalThemes.copy7"),
  coverTextTone: "light",
  photoTheme: true,
  ornamentAsset: "/images/wedding-themes/pressedRose-ornaments.webp",
  illustration:
    "/images/components/separated/wedding-golden-promise-rings.webp",
});

classicalThemes.push({
  ...classicalThemes.find((theme) => theme.id === "couplePortrait"),
  id: "couplePortraitDark",
  number: "14",
  coverTextTone: "dark",
  name: createCaptionCopy("invitations.data.customClassicalThemes.copy8"),
});

// Existing local drafts keep their content and footer while moving to the new collection.
export const weddingCustomThemes = [
  ...classicalThemes.filter(theme => theme.photoTheme),
  ...classicalThemes.filter(theme => !theme.photoTheme),
].map(theme => ({ ...theme, occasion: "wedding" }));
export const christeningCustomThemes = [
  { id: "christeningBlueDove", name: createCaptionCopy("invitations.data.customClassicalThemes.copy9"), color: "#fffaf2", ink: "#49677c", accent: "#9bb7c9", frameAsset: null, ornamentAsset: "/images/christening/blue-dove.png", christeningLayout: "sky" },
  { id: "christeningOliveBlessing", name: createCaptionCopy("invitations.data.customClassicalThemes.copy10"), color: "#faf8ef", ink: "#54674f", accent: "#a3b392", frameAsset: null, ornamentAsset: "/images/christening/olive-wreath.png", christeningLayout: "wreath" },
  { id: "christeningBlushGrace", name: createCaptionCopy("invitations.data.customClassicalThemes.copy11"), color: "#fffaf5", ink: "#855b68", accent: "#d6a6b4", frameAsset: null, ornamentAsset: "/images/christening/blush-cascade.png", christeningLayout: "cascade" },
  { id: "christeningBabyBoy", name: createCaptionCopy("invitations.data.customClassicalThemes.copy12"), color: "#edf5fb", ink: "#49677c", accent: "#9bb7c9", frameAsset: "/images/wedding-themes/somethingBlue-frame.webp", ornamentAsset: "/images/components/watercolor/little-dove.webp", squarePhoto: true, artworkTone: "blue" },
  { id: "christeningBabyGirl", name: createCaptionCopy("invitations.data.customClassicalThemes.copy13"), color: "#fff1f4", ink: "#855b68", accent: "#d6a6b4", frameAsset: "/images/wedding-themes/pressedRose-frame.webp", ornamentAsset: "/images/components/watercolor/little-dove.webp", squarePhoto: true, artworkTone: "pink" },
].map((theme, index) => ({ ...classicalThemes[0], ...theme, number: String(index + 1).padStart(2, "0"), occasion: "christening", frameShape: "classic", footerScene: "none", illustration: theme.ornamentAsset }));
export const customizableOccasions = ["wedding", "christening"];
export function getCustomThemes(occasion) {
  return occasion === "christening" ? christeningCustomThemes : weddingCustomThemes;
}
export function getCustomThemeForOccasion(id, occasion) {
  const themes = getCustomThemes(occasion);
  return themes.find(theme => theme.id === (legacyThemeIds[id] ?? id))
    ?? themes.find(theme => theme.id === "somethingBlue")
    ?? themes[0];
}

const legacyThemeIds = {
  ivoryClassic: "somethingBlue",
  blueClassic: "somethingBlue",
  gardenVeil: "somethingBlue",
  quietParchment: "pearlLetter",
  vellumPromise: "pearlLetter",
  champagneVows: "pearlLetter",
  forestClassic: "somethingBlue",
  sepia: "pearlLetter",
  heritage: "somethingBlue",
  romance: "pressedRose",
  midnight: "pearlLetter",
  gilded: "pearlLetter",
  silver: "pearlLetter",
  sageMeadow: "somethingBlue",
  pastelBloom: "pressedRose",
  lavenderHour: "lilacWhisper",
  bluePorcelain: "somethingBlue",
  embossedIvory: "pearlLetter",
  embossedSage: "pearlLetter",
};
export function getClassicalTheme(id) {
  return (
    [...weddingCustomThemes, ...christeningCustomThemes].find((theme) => theme.id === (legacyThemeIds[id] ?? id)) ??
    classicalThemes[0]
  );
}

export const getClassicalScene = (id) => classicalScenes[id] ?? "";
export const getClassicalPaper = (id) => classicalPapers[id] ?? "";
export const getClassicalOrnament = (id) => classicalOrnaments[id] ?? "";

export function canUploadCustomCover(theme) {
  return theme?.photoTheme === true || theme?.squarePhoto === true;
}
