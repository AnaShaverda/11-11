import { pinkChampagneBirthdayAssets } from "./pinkChampagneDesigns.js";
import { cocktailBirthdayAssets } from "./cocktailBirthdayDesigns.js";
import { pizzaBirthdayAssets } from "./pizzaBirthdayDesigns.js";
import { comicBirthdayAssets } from "./comicBirthdayDesigns.js";
import { poolBirthdayAssets } from "./poolBirthdayDesigns.js";
import { girlyBirthdayAssets } from "./girlyBirthdayDesigns.js";
import { paintedSummerAssets } from "./summerAssets.js";

const image = (group, name) => `/images/birthday/${group}/${name}.webp`;

export const birthdayImages = {
  cobaltCover: image("cobalt-cheers", "blue-ink-toast"),
  cobaltItem: image("cobalt-cheers", "coupe-cheers"),
  pinkGlamCover: image("pink-glam", "satin-disco-heart"),
  y2kCover: image("y2k-party", "chrome-cyber-party"),
  retroCover: image("retro-pop", "screenprint-groove"),
  cakePink: image("cakes", "cake-pink-bow"),
  discoSilver: image("disco", "disco-ball-silver"),
  discoPink: image("disco", "disco-ball-pink"),
  discoBow: image("disco", "disco-ball-pink-bow"),
  discoRainbowVivid: image("disco", "disco-ball-rainbow-vivid"),
  discoSilverBlueStars: image("disco", "disco-ball-silver-blue-stars"),
  discoFuchsia: image("disco", "disco-ball-fuchsia"),
  discoHeartPink: image("disco", "disco-heart-pink"),
  discoIridescentBlue: image("disco", "disco-ball-iridescent-blue"),
  discoLavender: image("disco", "disco-ball-lavender"),
  discoRoseGold: image("disco", "disco-ball-rose-gold"),
  discoSilverFaceted: image("disco", "disco-ball-silver-faceted"),
  discoSilverRedStars: image("disco", "disco-ball-silver-red-stars"),
  discoSilverSatinBow: image("disco", "disco-ball-silver-satin-bow"),
  discoSilverSimple: image("disco", "disco-ball-silver-simple"),
  discoSilverWhiteRim: image("disco", "disco-ball-silver-white-rim"),
  balloons: image("balloons", "heart-balloon-bunch"),
  bow: image("bows", "satin-bow-red"),
  citrusFrame: image("frames", "citrus-floral-frame"),
  garlandRed: image("garlands", "garland-red-party"),
  garlandColorful: image("garlands", "garland-colorful-disco"),
  partyHat: image("party", "party-hat-pink"),
  partyHatRed: image("party", "party-hat-red-bow"),
  partyHatColorfulDots: image("party", "party-hat-colorful-polka-dots"),
  partyHatFuchsiaSequins: image("party", "party-hat-fuchsia-sequins"),
  partyHatPinkGlitterTulle: image("party", "party-hat-pink-glitter-star-tulle"),
  partyHatPinkGoldStripes: image("party", "party-hat-pink-gold-stripes"),
  partyHatPinkSilverDots: image("party", "party-hat-pink-silver-dots"),
  partyHatPinkSilverStripes: image("party", "party-hat-pink-silver-stripes"),
  partyHatPinkTulleStar: image("party", "party-hat-pink-tulle-star"),
  partyHatSilverGlitter: image("party", "party-hat-silver-glitter"),
  starGold: image("accents", "star-glitter-gold"),
  lips: image("accents", "lips-glitter-pink"),
  tulips: image("flowers", "tulip-bouquet-pink"),
  lilySoft: image("flowers", "lily-soft-pink"),
  lilyDeep: image("flowers", "lily-deep-pink"),
  lilyFuchsia: image("flowers", "lily-fuchsia-pink"),
  hibiscusCoral: image("flowers", "hibiscus-coral"),
  hibiscusFuchsia: image("flowers", "hibiscus-fuchsia-pink"),
  hibiscusPalePink: image("flowers", "hibiscus-pale-pink"),
  hibiscusPeachCream: image("flowers", "hibiscus-peach-cream"),
  hibiscusPeach: image("flowers", "hibiscus-peach"),
  hibiscusYellow: image("flowers", "hibiscus-sunshine-yellow"),
  hibiscusBlushIvory: image("flowers", "hibiscus-blush-ivory"),
  gardeniaIvory: image("flowers", "gardenia-ivory"),
  anemoneWhiteLilac: image("flowers", "anemone-white-lilac"),
  plumeriaIvoryYellow: image("flowers", "plumeria-ivory-yellow"),
  stickerBlackCat: image("stickers", "black-cat-coffee"),
  stickerCherrySoda: image("stickers", "cherry-soda-bottle"),
  stickerChiliMartini: image("stickers", "chili-martini"),
  stickerCreamCat: image("stickers", "cream-cat-sunglasses"),
  stickerSardines: image("stickers", "illustrated-sardine-tin"),
  stickerPinkLobster: image("stickers", "pink-lobster"),
  stickerRedGuitar: image("stickers", "red-star-guitar"),
  stickerSmilingFlower: image("stickers", "smiling-multicolor-flower"),
  y2kChromeLoop: image("y2k", "iridescent-chrome-loop"),
  y2kGelBubbles: image("y2k", "iridescent-gel-bubbles"),
  retroRibbonLines: image("retro", "retro-ribbon-lines"),
  retroDotsCurves: image("retro", "retro-dots-curves"),
};

// A slot accepts a path, null, or { image, top, right, bottom, left, width, height,
// rotation, opacity, zIndex, objectFit }. Arrays keep their original slot indexes.
// Paths keep legacy CSS; objects use percentage-friendly placement from this file.
// Objects default to bottom-right, 35% wide, natural height, rotation 0, opacity 1,
// layer 0 and objectFit "contain". Decoration layers are limited to 0–2; text is 3+.
// Photo-backed cards also accept photoCard: { background, backgroundPosition,
// variant: "age" | "illustrated" | "playful" | "space" | "dino" | "tavern", paper, ink, artwork: [asset, ...] }.
export const birthdayThemeAssets = {
  ...girlyBirthdayAssets,
  ...comicBirthdayAssets,
  ...poolBirthdayAssets,
  ...pizzaBirthdayAssets,
  ...cocktailBirthdayAssets,
  ...pinkChampagneBirthdayAssets,


  "birthday-cobalt-cheers": { coverImage: birthdayImages.cobaltCover, invitation: [], typography: { image: birthdayImages.cobaltItem, right: "0%", bottom: "9%", width: "24%", height: "32%" }, pattern: null, supportCards: [null, null, { image: birthdayImages.cobaltItem, right: "-3%", bottom: "0%", width: "42%", height: "55%" }] },
  "birthday-retro-pop": {
    coverImage: birthdayImages.retroCover,
    invitation: [],
    typography: null,
    pattern: null,
    supportCards: [null, null, null],
  },
  "birthday-y2k-party": {
    coverImage: birthdayImages.y2kCover,
    invitation: [birthdayImages.y2kChromeLoop, birthdayImages.y2kGelBubbles],
    typography: birthdayImages.y2kChromeLoop,
    pattern: birthdayImages.y2kGelBubbles,
    supportCards: [
      birthdayImages.y2kGelBubbles,
      birthdayImages.y2kChromeLoop,
      null,
    ],
  },
  "birthday-pink-glam": {
    coverImage: birthdayImages.pinkGlamCover,
    invitation: [birthdayImages.cakePink],
    typography: birthdayImages.discoFuchsia,
    pattern: birthdayImages.lips,
    supportCards: [
      birthdayImages.discoHeartPink,
      birthdayImages.discoHeartPink,
      birthdayImages.cakePink,
    ],
  },
};

export const birthdayLandingAssets = [
  birthdayImages.cakePink,
  birthdayImages.discoSilver,
  birthdayImages.starGold,
];
