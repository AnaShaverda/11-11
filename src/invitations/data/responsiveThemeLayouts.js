import { selectedBridalAssets } from "./selectedBridalDesigns.js";

const at = (left, top, width, height) => ({ left: `${left}%`, top: `${top}%`, width: `${width}%`, height: `${height}%` });
const portraitFrames = new Set([
  "ribbon-frame",
  "christening-olive-full-frame-olive-frame", "christening-blue-full-frame-blue-floral-frame",
  "christening-little-dreamer-gold-frame", "christening-blush-petals-petal-frame", "christening-olive-ribbon-olive-frame",
  "bridal-doll-pink-card-frame", "bridal-pink-cocktail-card-frame", "bridal-modern-pink-line-card-ribbon-frame",
  "wedding-portrait-promise-floral-frame", "wedding-ribbon-revel-floral-frame",
]);
const portraitBackgrounds = new Set([
  "birthday-city-after-dark-background",
  "birthday-comic-cutout-background", "birthday-retro-sport-background", "birthday-upside-down-background",
  "birthday-pink-lido-background", "birthday-blue-splash-background", "bridal-cool-girl-card-background", "bridal-peach-cherry-background",
]);
const imageId = image => image?.split("/").at(-1)?.replace(/\.webp$/, "");
const fullFrame = id => ({ id, image: `/images/components/separated/${id}.webp`, ...at(0, 0, 100, 100), objectFit: "fill" });

// Keep individual cutouts available even when the default composition uses a complete group.
export function applyResponsiveThemeLayout(slug, original) {
  const record = { ...original, background: { ...original.background }, components: original.components.map(component => ({ ...component })) };
  if (portraitBackgrounds.has(imageId(record.background.image))) {
    record.background.portrait = { image: record.background.image.replace(/\.webp$/, "-portrait.webp"), size: "100% 100%" };
  } else if (record.background.image && !record.background.size) {
    record.background.size = record.background.image.includes("/separated/") ? "100% 100%" : "cover";
  }
  record.components = record.components.map(component => portraitFrames.has(imageId(component.image))
    ? { ...component, portrait: { ...component.portrait, image: component.image.replace(/\.webp$/, "-portrait.webp"), objectFit: "fill" } }
    : component);

  if (["birthday-cherry-tower", "bridal-cherry-tower"].includes(slug)) {
    record.componentLibrary = record.components;
    record.components = [{ id: "cherry-tower-assembly", image: "/images/party/cherry-tower/champagne-artwork.webp", ...at(0, 0, 100, 100) }];
  }
  if (["bridal-blue-spritz", "bridal-pink-stripe-social", "bridal-mint-cheers", "bridal-lilac-happy-hour"].includes(slug)) {
    record.componentLibrary = record.components;
    record.components = [{ id: "painted-toast-assembly", image: selectedBridalAssets[slug].selectedBridal.artwork, ...at(0, 0, 100, 100) }];
  }
  if (slug === "wedding-sweet-snapshot") {
    record.componentLibrary = record.components;
    record.components = [
      { id: "envelope-portrait-assembly", image: "/images/components/separated/wedding-sweet-snapshot-assembly.webp", ...at(15, 28, 70, 59), portrait: at(8, 28, 84, 59) },
      ...record.components.filter(component => component.id.startsWith("tulip")),
    ];
  }
  if (slug === "wedding-ink-and-ivy") {
    record.portraitComponents = [fullFrame("wedding-ink-and-ivy-frame-portrait"), ...record.components.filter(component => !component.id.includes("vine"))];
  }
  if (slug === "gender-reveal-ribbon-surprise") {
    record.portraitComponents = [fullFrame("gender-reveal-ribbon-surprise-frame-portrait")];
  }
  if (slug === "christening-olive-full-frame") {
    record.components.push({ id: "champagne-bow", image: "/images/components/watercolor/champagne-bow.webp", ...at(30, 73, 40, 30), portrait: at(23, 77, 54, 24) });
  }
  const reposition = (match, placement, portrait = placement) => {
    record.components = record.components.map(component => match(component)
      ? { ...component, ...placement, portrait: { ...component.portrait, ...portrait } }
      : component);
  };
  if (["wedding-ring-and-spark", "wedding-golden-promise"].includes(slug)) {
    reposition(component => component.id.includes("rings"), at(26, 45, 48, 33));
    reposition(component => component.id.includes("star"), { top: "48%", width: "3%", height: "4%" });
  }
  if (slug === "wedding-watercolor-banquet") reposition(() => true, at(0, 57, 100, 38));
  if (slug === "wedding-heartmarked") reposition(() => true, { top: "57%", height: "30%" });
  if (slug === "wedding-linked-steps") reposition(() => true, at(11, 48, 79, 39), at(8, 49, 84, 38));
  if (slug === "wedding-ivory-vows") reposition(() => true, { top: "45%", height: "40%" });
  if (["wedding-come-rain-or-shine", "wedding-side-by-side", "wedding-first-dance", "wedding-heart-hideaway", "wedding-little-vows"].includes(slug)) {
    reposition(component => component.id.includes("couple"), at(24, 52, 52, 34));
  }
  if (slug === "wedding-our-people") reposition(() => true, {}, at(0, 38, 100, 44));
  if (slug === "wedding-happily-away") reposition(component => component.id.includes("car"), at(8, 57, 86, 28));
  if (slug === "wedding-tipsy-together") reposition(component => component.id.includes("bride") || component.id.includes("groom"), { top: "57%", height: "29%" });
  if (slug === "wedding-cherry-toast") reposition(() => true, { top: "55%", height: "32%" });
  return record;
}
