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
  { id: "sepia", name: { en: "Botanical letterpress", ka: "ბოტანიკური წერილი" }, scene: "", paper: "umber", footerScene: "landscape", ornament: "fern", ornamentTone: "champagne", color: "#76554b", frame: "engraved", pattern: "plain", font: "serif", layout: "center" },
  { id: "heritage", name: { en: "Heritage garden", ka: "კლასიკური ბაღი" }, scene: "church", paper: "ivory", footerScene: "church", ornament: "laurel", color: "#76554b", frame: "engraved", pattern: "plain", font: "serif", layout: "bottom" },
  { id: "romance", name: { en: "Rose soirée", ka: "ვარდების საღამო" }, scene: "garden", paper: "rose", footerScene: "landscape", ornament: "roseBranch", ornamentTone: "champagne", color: "#986579", frame: "oval", pattern: "plain", font: "serif", layout: "bottom" },
  { id: "midnight", name: { en: "Midnight manor", ka: "ღამის სასახლე" }, scene: "manor", paper: "navy", footerScene: "landscape", ornament: "laurel", color: "#253c56", frame: "classic", pattern: "plain", font: "serif", layout: "center" },
  { id: "gilded", name: { en: "Gilded botanical", ka: "ოქროს ბოტანიკა" }, scene: "", paper: "umber", footerScene: "vineyard", ornament: "goldBotanical", ornamentTone: "gold", color: "#76554b", frame: "botanical", pattern: "plain", font: "serif", layout: "center" },
  { id: "silver", name: { en: "Silver moon", ka: "ვერცხლის მთვარე" }, scene: "manor", paper: "navy", footerScene: "landscape", ornament: "silverBotanical", ornamentTone: "silver", color: "#485361", frame: "engraved", pattern: "plain", font: "serif", layout: "bottom" },
  { id: "pastelBloom", name: { en: "Pastel bloom", ka: "პასტელური ყვავილები" }, scene: "blushGarden", paper: "rose", footerScene: "landscape", ornament: "roseBranch", ornamentTone: "blush", color: "#ad8290", frame: "oval", pattern: "plain", font: "serif", layout: "bottom" },
  { id: "sageMeadow", name: { en: "Sage meadow", ka: "სალბის მდელო" }, scene: "sageGarden", paper: "sagePaper", footerScene: "vineyard", ornament: "fern", ornamentTone: "sage", color: "#839d87", frame: "arch", pattern: "plain", font: "serif", layout: "bottom" },
  { id: "lavenderHour", name: { en: "Lavender hour", ka: "ლავანდის საღამო" }, scene: "lavenderTerrace", paper: "lavenderPaper", footerScene: "grapes", ornament: "roseBranch", ornamentTone: "lilac", color: "#9283a8", frame: "engraved", pattern: "plain", font: "serif", layout: "bottom" },
  { id: "bluePorcelain", name: { en: "Blue porcelain", ka: "ლურჯი ფაიფური" }, scene: "blueCourtyard", paper: "bluePaper", footerScene: "landscape", ornament: "silverBotanical", ornamentTone: "powderBlue", color: "#829db6", frame: "classic", pattern: "plain", font: "serif", layout: "bottom" },
];

export const getClassicalScene = id => classicalScenes[id] ?? "";
export const getClassicalPaper = id => classicalPapers[id] ?? "";
export const getClassicalOrnament = id => classicalOrnaments[id] ?? "";
