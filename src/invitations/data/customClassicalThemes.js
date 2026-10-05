const asset = name => `/images/custom-classical/${name}.webp`;

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
};

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
    "id": "silkIvory",
    "number": "01",
    "name": {
      "en": "Silk & Ivory",
      "ka": "აბრეშუმი და სპილოსძვლისფერი"
    },
    "color": "#f4efe5",
    "ink": "#554635",
    "accent": "#aa967a",
    "paper": "ivory",
    "frame": "stationery",
    "frameShape": "oval",
    "pattern": "plain",
    "font": "serif",
    "layout": "center",
    "scene": "",
    "footerScene": "none",
    "ornament": "",
    "italic": false,
    "frameAsset": "/images/wedding-themes/silkIvory-frame.webp",
    "ornamentAsset": "/images/wedding-themes/silkIvory-ornaments.webp",
    "illustration": "/images/wedding-themes/silkIvory-illustration.webp"
  },
  {
    "id": "somethingBlue",
    "number": "02",
    "name": {
      "en": "Something Blue",
      "ka": "ცისფერი ამბავი"
    },
    "color": "#f1f3f2",
    "ink": "#354553",
    "accent": "#8499a8",
    "paper": "ivory",
    "frame": "stationery",
    "frameShape": "oval",
    "pattern": "plain",
    "font": "serif",
    "layout": "center",
    "scene": "",
    "footerScene": "none",
    "ornament": "",
    "italic": false,
    "frameAsset": "/images/wedding-themes/somethingBlue-frame.webp",
    "ornamentAsset": "/images/wedding-themes/somethingBlue-ornaments.webp",
    "illustration": "/images/wedding-themes/somethingBlue-illustration.webp"
  },
  {
    "id": "pressedRose",
    "number": "03",
    "name": {
      "en": "Pressed Rose",
      "ka": "დაწნეხილი ვარდი"
    },
    "color": "#f5eae3",
    "ink": "#614c3c",
    "accent": "#b48a76",
    "paper": "rose",
    "frame": "stationery",
    "frameShape": "rectangle",
    "pattern": "plain",
    "font": "serif",
    "layout": "center",
    "scene": "",
    "footerScene": "none",
    "ornament": "",
    "italic": true,
    "frameAsset": "/images/wedding-themes/pressedRose-frame.webp",
    "ornamentAsset": "/images/wedding-themes/pressedRose-ornaments.webp",
    "illustration": "/images/wedding-themes/pressedRose-illustration.webp"
  },
  {
    "id": "gardenVeil",
    "number": "04",
    "name": {
      "en": "Garden Veil",
      "ka": "ბაღის ნაზი ფარდა"
    },
    "color": "#f3f1e7",
    "ink": "#48503d",
    "accent": "#929977",
    "paper": "ivory",
    "frame": "stationery",
    "frameShape": "arch",
    "pattern": "plain",
    "font": "serif",
    "layout": "center",
    "scene": "",
    "footerScene": "none",
    "ornament": "",
    "italic": false,
    "frameAsset": "/images/wedding-themes/gardenVeil-frame.webp",
    "ornamentAsset": "/images/wedding-themes/gardenVeil-ornaments.webp",
    "illustration": "/images/wedding-themes/gardenVeil-illustration.webp"
  },
  {
    "id": "pearlLetter",
    "number": "05",
    "name": {
      "en": "Pearl Letter",
      "ka": "მარგალიტის წერილი"
    },
    "color": "#f1efea",
    "ink": "#4e4c47",
    "accent": "#aaa69c",
    "paper": "ivory",
    "frame": "stationery",
    "frameShape": "rectangle",
    "pattern": "plain",
    "font": "serif",
    "layout": "center",
    "scene": "",
    "footerScene": "none",
    "ornament": "",
    "italic": false,
    "frameAsset": "/images/wedding-themes/pearlLetter-frame.webp",
    "ornamentAsset": "/images/wedding-themes/pearlLetter-ornaments-v2.webp",
    "illustration": "/images/wedding-themes/pearlLetter-illustration.webp"
  },
  {
    "id": "lilacWhisper",
    "number": "06",
    "name": {
      "en": "Lilac Whisper",
      "ka": "იასამნის ჩურჩული"
    },
    "color": "#f3eff3",
    "ink": "#554e59",
    "accent": "#b0a0ba",
    "paper": "ivory",
    "frame": "stationery",
    "frameShape": "rectangle",
    "pattern": "plain",
    "font": "serif",
    "layout": "center",
    "scene": "",
    "footerScene": "none",
    "ornament": "",
    "italic": true,
    "frameAsset": "/images/wedding-themes/lilacWhisper-frame.webp",
    "ornamentAsset": "/images/wedding-themes/lilacWhisper-ornaments.webp",
    "illustration": "/images/wedding-themes/lilacWhisper-illustration.webp"
  },
  {
    "id": "champagneVows",
    "number": "07",
    "name": {
      "en": "Champagne Vows",
      "ka": "შამპანურისფერი აღთქმა"
    },
    "color": "#f5efe3",
    "ink": "#5b4837",
    "accent": "#b99b71",
    "paper": "ivory",
    "frame": "stationery",
    "frameShape": "rectangle",
    "pattern": "plain",
    "font": "serif",
    "layout": "center",
    "scene": "",
    "footerScene": "none",
    "ornament": "",
    "italic": true,
    "frameAsset": "/images/wedding-themes/champagneVows-frame.webp",
    "ornamentAsset": "/images/wedding-themes/champagneVows-ornaments.webp",
    "illustration": "/images/wedding-themes/champagneVows-illustration.webp"
  },
  {
    "id": "vellumPromise",
    "number": "08",
    "name": {
      "en": "Vellum Promise",
      "ka": "ნაზი დაპირება"
    },
    "color": "#f4f0e9",
    "ink": "#5d5245",
    "accent": "#b3a38e",
    "paper": "ivory",
    "frame": "stationery",
    "frameShape": "arch",
    "pattern": "plain",
    "font": "serif",
    "layout": "center",
    "scene": "",
    "footerScene": "none",
    "ornament": "",
    "italic": false,
    "frameAsset": "/images/wedding-themes/vellumPromise-frame.webp",
    "ornamentAsset": "/images/wedding-themes/vellumPromise-ornaments.webp",
    "illustration": "/images/wedding-themes/vellumPromise-illustration.webp"
  },
  {
    "id": "quietParchment",
    "number": "09",
    "name": {
      "en": "Quiet Parchment",
      "ka": "მშვიდი პერგამენტი"
    },
    "color": "#efe9db",
    "ink": "#514b36",
    "accent": "#a29471",
    "paper": "ivory",
    "frame": "stationery",
    "frameShape": "arch",
    "pattern": "plain",
    "font": "serif",
    "layout": "center",
    "scene": "",
    "footerScene": "none",
    "ornament": "",
    "italic": true,
    "frameAsset": "/images/wedding-themes/quietParchment-frame.webp",
    "ornamentAsset": "/images/wedding-themes/quietParchment-ornaments.webp",
    "illustration": "/images/wedding-themes/quietParchment-illustration.webp"
  },
  {
    "id": "meadowMorning",
    "number": "10",
    "name": {
      "en": "Meadow Morning",
      "ka": "მდელოს დილა"
    },
    "color": "#f4f1e8",
    "ink": "#4b513b",
    "accent": "#9caa91",
    "paper": "ivory",
    "frame": "stationery",
    "frameShape": "rectangle",
    "pattern": "plain",
    "font": "serif",
    "layout": "center",
    "scene": "",
    "footerScene": "none",
    "ornament": "",
    "italic": false,
    "frameAsset": "/images/wedding-themes/meadowMorning-frame.webp",
    "ornamentAsset": "/images/wedding-themes/meadowMorning-ornaments.webp",
    "illustration": "/images/wedding-themes/meadowMorning-illustration.webp"
  },
{
  "id": "autumn",
  "number": "11",
  "name": {
    "en": "Autumn Promise",
    "ka": "შემოდგომის დაპირება"
  },
  "color": "#f4ecdf",
  "ink": "#66462f",
  "accent": "#ad7950",
  "frameAsset": "/images/wedding-themes/quietParchment-frame.webp",
  "ornamentAsset": "/images/wedding-themes/autumn-ornaments.webp",
  "illustration": "/images/wedding-themes/autumn-illustration.webp",
  "paper": "ivory",
  "frame": "stationery",
  "frameShape": "rectangle",
  "pattern": "plain",
  "font": "serif",
  "layout": "center",
  "scene": "",
  "footerScene": "none",
  "ornament": "",
  "italic": false
},
{
  "id": "rtveli",
  "number": "12",
  "name": {
    "en": "Rtveli",
    "ka": "რთველი"
  },
  "color": "#f1ecdf",
  "ink": "#573a43",
  "accent": "#8f6772",
  "frameAsset": "/images/wedding-themes/champagneVows-frame.webp",
  "ornamentAsset": "/images/wedding-themes/rtveli-ornaments.webp",
  "illustration": "/images/wedding-themes/rtveli-illustration.webp",
  "paper": "ivory",
  "frame": "stationery",
  "frameShape": "rectangle",
  "pattern": "plain",
  "font": "serif",
  "layout": "center",
  "scene": "",
  "footerScene": "none",
  "ornament": "",
  "italic": false
}
];

// Photo cover stays confined to the first invitation card.
classicalThemes.push({
  ...classicalThemes.find(theme => theme.id === "quietParchment"),
  id: "couplePortrait", number: "13",
  name: { en: "Our Portrait — Light", ka: "ჩვენი პორტრეტი — ღია" },
  coverTextTone: "light",
  photoTheme: true,
  ornamentAsset: "/images/wedding-themes/pressedRose-ornaments.webp",
  illustration: "/images/components/separated/wedding-golden-promise-rings.webp",
  coverSample: "/images/wedding-editorial.webp",
});

classicalThemes.push({
  ...classicalThemes.find(theme => theme.id === "couplePortrait"),
  id: "couplePortraitDark", number: "14", coverTextTone: "dark",
  name: { en: "Our Portrait — Dark", ka: "ჩვენი პორტრეტი — მუქი" },
});

// Existing local drafts keep their content and footer while moving to the new collection.
const legacyThemeIds = {
  ivoryClassic: 'silkIvory', blueClassic: 'somethingBlue', forestClassic: 'gardenVeil',
  sepia: 'quietParchment', heritage: 'silkIvory', romance: 'pressedRose',
  midnight: 'pearlLetter', gilded: 'champagneVows', silver: 'pearlLetter',
  sageMeadow: 'meadowMorning', pastelBloom: 'pressedRose', lavenderHour: 'lilacWhisper', bluePorcelain: 'somethingBlue',
};
export function getClassicalTheme(id) {
  return classicalThemes.find(theme => theme.id === (legacyThemeIds[id] ?? id)) ?? classicalThemes[0];
}

export const getClassicalScene = id => classicalScenes[id] ?? "";
export const getClassicalPaper = id => classicalPapers[id] ?? "";
export const getClassicalOrnament = id => classicalOrnaments[id] ?? "";