import { paintedSummerAssets } from "./summerAssets.js";

const image = (group, name) => `/images/birthday/${group}/${name}.webp`;

export const birthdayImages = {
  cakeCherry: image("cakes", "cake-cherry-red"),
  cakePink: image("cakes", "cake-pink-bow"),
  discoSilver: image("disco", "disco-ball-silver"),
  discoPink: image("disco", "disco-ball-pink"),
  discoBow: image("disco", "disco-ball-pink-bow"),
  balloons: image("balloons", "heart-balloon-bunch"),
  bow: image("bows", "satin-bow-red"),
  cocktailCherry: image("drinks", "cocktail-cherry-bow"),
  cocktailToast: image("drinks", "cocktail-toast-illustration"),
  cocktailCitrus: image("drinks", "cocktail-glitter-citrus"),
  citrusFrame: image("frames", "citrus-floral-frame"),
  garlandRed: image("garlands", "garland-red-party"),
  garlandColorful: image("garlands", "garland-colorful-disco"),
  partyHat: image("party", "party-hat-pink"),
  partyHatRed: image("party", "party-hat-red-bow"),
  starGold: image("accents", "star-glitter-gold"),
  lips: image("accents", "lips-glitter-pink"),
  tulips: image("flowers", "tulip-bouquet-pink"),
};

// Theme data chooses the illustrations; shared components decide their placement.
export const birthdayThemeAssets = {
  "birthday-retro-pop": { invitation: [birthdayImages.discoSilver, birthdayImages.cakeCherry], typography: birthdayImages.garlandRed, pattern: birthdayImages.discoSilver, supportCards: [birthdayImages.partyHatRed, birthdayImages.discoSilver, birthdayImages.cakeCherry] },
  "birthday-y2k-party": { invitation: [birthdayImages.discoPink, birthdayImages.starGold], typography: birthdayImages.starGold, pattern: birthdayImages.discoPink, supportCards: [birthdayImages.starGold, birthdayImages.discoBow, birthdayImages.discoPink] },
  "birthday-pink-glam": { invitation: [birthdayImages.cakePink, birthdayImages.lips], typography: birthdayImages.bow, pattern: birthdayImages.lips, supportCards: [birthdayImages.bow, birthdayImages.lips, birthdayImages.cakePink] },
  "birthday-coquette": { invitation: [birthdayImages.balloons, birthdayImages.bow], typography: birthdayImages.bow, pattern: birthdayImages.balloons, supportCards: [birthdayImages.bow, birthdayImages.balloons, birthdayImages.cakePink] },
  "birthday-midnight-luxury": { invitation: [birthdayImages.cocktailCherry, birthdayImages.starGold], typography: birthdayImages.starGold, pattern: birthdayImages.cocktailCherry, supportCards: [birthdayImages.cocktailToast, birthdayImages.starGold, birthdayImages.cocktailCherry] },
  "birthday-garden-party": { invitation: [birthdayImages.tulips], typography: birthdayImages.tulips, pattern: birthdayImages.tulips, supportCards: [birthdayImages.tulips, null, birthdayImages.tulips] },
  "birthday-neon-night": { invitation: [birthdayImages.discoPink, birthdayImages.lips], typography: birthdayImages.discoPink, pattern: birthdayImages.starGold, supportCards: [birthdayImages.lips, birthdayImages.discoPink, birthdayImages.discoPink] },
  "birthday-pastel-dream": { invitation: [birthdayImages.partyHat, birthdayImages.garlandColorful], typography: birthdayImages.garlandColorful, pattern: birthdayImages.partyHat, supportCards: [birthdayImages.garlandColorful, birthdayImages.partyHat, birthdayImages.cakePink] },
  "birthday-minimal-editorial": { invitation: [birthdayImages.starGold], typography: birthdayImages.starGold, pattern: birthdayImages.starGold, supportCards: [birthdayImages.starGold, null, birthdayImages.starGold] },
  "birthday-tropical-summer": { invitation: [birthdayImages.cocktailCitrus, birthdayImages.citrusFrame], typography: birthdayImages.citrusFrame, pattern: birthdayImages.cocktailCitrus, supportCards: [birthdayImages.cocktailCitrus, null, birthdayImages.citrusFrame] },
  "birthday-painted-summer": {
    invitation: [paintedSummerAssets.conchCoral, paintedSummerAssets.hibiscusCoral, paintedSummerAssets.starfishPastel],
    typography: [paintedSummerAssets.beachChairBlue, paintedSummerAssets.sailboatBlue],
    pattern: [paintedSummerAssets.jellyfishBluePink, paintedSummerAssets.scallopShellPink],
    supportCards: [paintedSummerAssets.sailboatBlue, paintedSummerAssets.seaTurtle, paintedSummerAssets.coconutDrink],
  },
};

export const birthdayLandingAssets = [birthdayImages.cakePink, birthdayImages.discoSilver, birthdayImages.starGold];
