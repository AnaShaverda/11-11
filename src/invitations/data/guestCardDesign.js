import { normalizeRsvpDeadline } from "./invitationDate.js";
import { eventTimeZones } from "./guestCalendar.js";
import { getBirthdayImageAssets } from "./assetPresentation.js";
import { separatedThemeAssets, getSeparatedBackground, getSeparatedComponents } from "./separatedThemeAssets.js";
import { themeDemoEvents } from "../../themes/data/demoEvents.js";
import { invitationSamples } from "./invitationSamples.js";
import { MAX_GUEST_NOTE_LENGTH } from "./guestNotes.js";

export const guestPreviewDefaults = { timeZone: "Asia/Tbilisi", details: true, rsvp: true, rsvpDeadline: "", music: false, gallery: false, motion: "none", format: "square", companions: 1, entrance: "envelope", envelope: true, openingEffect: "none", openingIntensity: "subtle", openingSpeed: "slow", openingDuration: 8, openingPalette: "theme" };
export const entranceStyles = ["ivoryPaperEnvelope", "pinkPaperEnvelope", "bluePaperEnvelope", "classicBurgundyEnvelope", "redPortraitEnvelope", "pastelGreenEnvelope", "bordeauxLaceEnvelope", "greenLaceEnvelope", "doors", "doorsBrown", "doorsBlueFloral", "stampedPaper", "immediate"];
export const motionStyles = ["none", "gentle", "float", "sparkle", "elegant"];
export const openingEffects = ["none", "confetti", "streamers", "hearts", "sparkles", "petals"];
export const openingSpeeds = ["dreamy", "slow", "lively"];
export const MAX_GALLERY_PHOTOS = 12;
export const MAX_PHOTO_BYTES = 8 * 1024 * 1024;
export const MAX_GUEST_NAME_LENGTH = 200;
export const photoTypes = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"];

export function normalizeGuestReply(value, limit) {
  if (!value || !["going", "declined"].includes(value.attendance)
    || !Number.isInteger(value.companions) || value.companions < 0 || value.companions > limit) return null;
  let fullName = value.fullName;
  // Carry previously saved two-field replies forward without guessing name parts.
  if (!Object.hasOwn(value, "fullName") && typeof value.firstName === "string" && typeof value.lastName === "string"
    && value.firstName.trim() && value.lastName.trim() && value.firstName.length <= 80 && value.lastName.length <= 80) {
    fullName = `${value.firstName.trim()} ${value.lastName.trim()}`;
  }
  if (typeof fullName !== "string" || !fullName.trim() || fullName.length > MAX_GUEST_NAME_LENGTH) return null;
  if (value.note !== undefined && (typeof value.note !== "string" || value.note.length > MAX_GUEST_NOTE_LENGTH)) return null;
  return { attendance: value.attendance, fullName: fullName.trim(), companions: value.attendance === "going" ? value.companions : 0,
    ...(value.note?.trim() ? { note: value.note.trim() } : {}) };
}

// Only simple borders that stay clear at small sizes belong on supporting cards.
// Bows and substantial floral compositions are reserved for the main invitation.
const supportFrames = new Set([
  "blue-frame.webp", "birthday-classic-celebration-frame.webp",
  "wedding-garden-table-garden-frame.webp", "wedding-come-rain-or-shine-frame.webp",
  "wedding-first-dance-frame.webp", "christening-little-dreamer-gold-frame.webp",
  "bridal-retro-pink-card-frame.webp", "bridal-pink-disco-dream-card-frame.webp",
  "gender-reveal-little-wonder-frame.webp", "gender-reveal-bear-hug-frame.webp",
  "gender-reveal-special-delivery-frame.webp", "gender-reveal-pink-or-blue-frame.webp",
]);

export function normalizeGuestSettings(value = {}) {
  if (!value || typeof value !== "object") value = {};
  const entrance = ["portraitEnvelope", "envelope", "redVelvetEnvelope"].includes(value.entrance) ? "ivoryPaperEnvelope" : entranceStyles.includes(value.entrance) ? value.entrance : value.envelope === false ? "immediate" : "ivoryPaperEnvelope";
  return {
    timeZone: eventTimeZones.includes(value.timeZone) ? value.timeZone : "Asia/Tbilisi",
    details: value.details !== false,
    rsvp: value.rsvp !== false,
    rsvpDeadline: normalizeRsvpDeadline(value.rsvpDeadline),
    gallery: value.gallery === true,
    music: value.music === true,
    motion: motionStyles.includes(value.motion) ? value.motion : "none",
    format: value.format === "portrait" ? "portrait" : "square",
    companions: Number.isInteger(value.companions) ? Math.min(5, Math.max(0, value.companions)) : 1,
    entrance,
    envelopeStamp: value.envelopeStamp === true,
    envelope: entrance === "classicBurgundyEnvelope" || entrance === "greenLaceEnvelope" || entrance === "bordeauxLaceEnvelope" || entrance === "roseFiberEnvelope" || entrance === "embossedBurgundyEnvelope" || entrance === "pastelGreenEnvelope" || entrance === "redPortraitEnvelope" || entrance === "ivoryPaperEnvelope" || entrance === "redVelvetEnvelope" || entrance === "pinkPaperEnvelope" || entrance === "bluePaperEnvelope" || entrance === "envelope" || entrance === "embossedIvoryEnvelope" || entrance === "embossedSageEnvelope",
    openingEffect: openingEffects.includes(value.openingEffect) ? value.openingEffect : "none",
    openingIntensity: value.openingIntensity === "celebration" ? "celebration" : "subtle",
    openingSpeed: openingSpeeds.includes(value.openingSpeed) ? value.openingSpeed : "slow",
    openingDuration: [3, 5, 8, 12].includes(value.openingDuration) ? value.openingDuration : 8,
    openingPalette: ["theme", "gold", "pastel"].includes(value.openingPalette) ? value.openingPalette : "theme",
  };
}

function luminance(color) {
  const rgb = color.replace("#", "").match(/.{2}/g).map(hex => parseInt(hex, 16) / 255);
  const linear = rgb.map(channel => channel <= .04045 ? channel / 12.92 : ((channel + .055) / 1.055) ** 2.4);
  return linear[0] * .2126 + linear[1] * .7152 + linear[2] * .0722;
}

export function colorContrast(a, b) {
  const values = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (values[0] + .05) / (values[1] + .05);
}

// Keep the theme's ink where legible; deepen or lighten that same hue when necessary.
function readableInk(paper, ink) {
  if (colorContrast(paper, ink) >= 4.5) return ink;
  const target = luminance(paper) > .179 ? 0 : 255;
  const rgb = ink.replace("#", "").match(/.{2}/g).map(hex => parseInt(hex, 16));
  for (let step = 1; step <= 10; step++) {
    const mixed = `#${rgb.map(channel => Math.round(channel + (target - channel) * step / 10).toString(16).padStart(2, "0")).join("")}`;
    if (colorContrast(paper, mixed) >= 4.5) return mixed;
  }
  return target === 0 ? "#000000" : "#ffffff";
}

function patternFamily(pattern = "") {
  if (/gingham|checker|checks|tiles|grid|pixels/.test(pattern)) return "checks";
  if (/stripe|lines|linen/.test(pattern)) return "stripes";
  if (/stars|sparkle|disco|dots|confetti|cosmic/.test(pattern)) return "dots";
  if (/wave|rings|coast/.test(pattern)) return "waves";
  return "paper";
}

const classicWeddingVisuals = new Set([
  "editorial", "ivory-vows", "garden-table", "little-vows", "rose-letter", "sage-letter",
  "portrait-promise", "golden-promise", "ring-and-spark", "watercolor-banquet",
  "wedding-day-notes", "date-and-dinner", "first-dance", "ink-and-ivy",
]);

export function getGuestCardDesign(template) {
  const layers = separatedThemeAssets[template.slug];
  const assets = template.visualAssets ?? {};
  const background = layers ? getSeparatedBackground(layers) : { color: template.design.palette[0] };
  const allAssets = getBirthdayImageAssets([
    ...(layers?.components ?? []), ...(assets.photoCard?.artwork ?? []),
    ...(assets.invitation ?? []), ...[assets.typography, assets.pattern, assets.support].filter(Boolean),
    ...(assets.supportCards ?? []).flat().filter(Boolean),
  ]);
  const images = [...new Map(allAssets.map(asset => [asset.image, asset])).values()];
  const frame = images.find(asset => supportFrames.has(asset.image.split("/").at(-1)));
  const ornaments = images.filter(asset => asset !== frame && !/frame|border|background|envelope|tape|ribbon|bow|-pool\./.test(asset.image)).slice(0, 3);
  const paper = background.color ?? template.design.palette[0];
  const mobileBackground = layers ? getSeparatedBackground(layers, "portrait") : background;
  const mobilePaper = mobileBackground.color ?? paper;
  const mobileFrame = layers ? getSeparatedComponents(layers, "portrait")
    .find(asset => /frame|border/.test(asset.id) && asset.width === "100%" && asset.height === "100%")?.image : undefined;
  const classicMobilePaper = ["christening", "gender-reveal"].includes(template.subcategory)
    || template.category === "Wedding" && classicWeddingVisuals.has(template.visual);
  const colors = [paper, ...template.design.palette];
  const lightest = colors.reduce((a, b) => luminance(a) > luminance(b) ? a : b);
  const darkest = colors.reduce((a, b) => luminance(a) < luminance(b) ? a : b);
  // Keep only a hint of the lightest theme color on supporting surfaces.
  const supportPaper = `#${lightest.slice(1).match(/.{2}/g)
    .map(hex => Math.round(parseInt(hex, 16) * .15 + 255 * .85).toString(16).padStart(2, "0")).join("")}`;
  return {
    paper,
    classicMobilePaper,
    mobilePaper,
    mobileFrame,
    mobileFrameInset: mobileFrame && /full-frame|petal-frame|floral-frame|olive-frame|garden-frame/.test(mobileFrame) ? "16%"
      : template.subcategory === "gender-reveal" && mobileFrame ? "12%" : "8%",
    mobileBackground: mobileBackground.image,
    mobileInk: readableInk(mobilePaper, template.design.palette[1]),
    mobileErrorInk: readableInk(mobilePaper, "#a72b36"),
    supportPaper,
    supportInk: readableInk(supportPaper, darkest),
    supportErrorInk: readableInk(supportPaper, "#a72b36"),
    ink: readableInk(paper, template.design.palette[1]),
    errorInk: readableInk(paper, "#a72b36"),
    accent: template.design.palette[2],
    secondary: template.design.palette[3],
    background: background.image,
    softScreen: Boolean(background.image && luminance(paper) > .55
      && /stripe|gingham|check|painted-pool/.test(template.design.pattern)),
    pattern: patternFamily(template.design.pattern),
    frame: frame?.image,
    ornaments: ornaments.map(asset => asset.image),
  };
}

export function getGuestEventDetails(template, sample) {
  const parts = sample.date.split("·").map(part => part.trim());
  return { date: parts[0], time: sample.time ?? parts[1] ?? themeDemoEvents[template.themeId]?.time, location: sample.location };
}

export function getGuestGallery(template) {
  const sample = invitationSamples[template.slug];
  const age = Number(sample.age ?? sample.posterAge);
  if (template.category === "Birthday" && age > 0 && age <= 12) {
    return [{ row: 0, column: 0, captionKey: "guestCards.photos.birthday.0" },
      { row: 3, column: 1, captionKey: "guestCards.photos.family.1" },
      { row: 0, column: 2, captionKey: "guestCards.photos.birthday.2" }].map((photo, index) => ({
      ...photo, id: `kids-${index}`, src: "/images/guest-gallery/event-moments.webp", sample: true,
    }));
  }
  const family = template.subcategory === "bridal-party" ? "bridal"
    : ["christening", "gender-reveal"].includes(template.subcategory) || /space-explorer|dino-adventure|race-day|ballerina|football-club/.test(template.slug) ? "family"
    : template.category === "Wedding" ? "wedding" : "birthday";
  const row = { birthday: 0, wedding: 1, bridal: 2, family: 3 }[family];
  return [0, 1, 2].map(column => ({
    id: `${family}-${column}`, src: "/images/guest-gallery/event-moments.webp", row, column,
    captionKey: `guestCards.photos.${family}.${column}`, sample: true,
  }));
}

export function getReplySeats(attendance, companions, limit) {
  return attendance === "going" ? 1 + Math.min(Math.max(0, Math.trunc(companions) || 0), Math.max(0, limit)) : 0;
}
