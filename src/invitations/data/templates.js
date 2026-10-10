import { getDesignMembership } from "../../data/catalogMembership.js";
import { selectedBridalStorefront } from "./selectedBridalDesigns.js";
import { pinkChampagneStorefront } from "./pinkChampagneDesigns.js";
import { cocktailBirthdayStorefront } from "./cocktailBirthdayDesigns.js";
import { pizzaBirthdayStorefront } from "./pizzaBirthdayDesigns.js";
import { comicBirthdayStorefront } from "./comicBirthdayDesigns.js";
import { poolBirthdayStorefront } from "./poolBirthdayDesigns.js";
import { girlyBirthdayStorefront } from "./girlyBirthdayDesigns.js";
import { celebrationThemeAssets } from "./celebrationAssets.js";
import { birthdayThemes, weddingThemes, celebrationThemes, isThemeActive } from "../../themes/data/themeRegistry.js";
import { showcaseDesigns } from "./showcaseDesigns.js";
import { weddingThemeAssets } from "./weddingAssets.js";
import { birthdayThemeAssets } from "./birthdayAssets.js";
import { invitationStyleTags } from "./invitationStyles.js";

// Public storefront metadata stays separate from the full invitation registry and demo event content.
const storefront = {
  ...girlyBirthdayStorefront,
  ...comicBirthdayStorefront,
  ...poolBirthdayStorefront,
  ...pizzaBirthdayStorefront,
  ...cocktailBirthdayStorefront,
  ...pinkChampagneStorefront,
  ...selectedBridalStorefront,
  "christening-olive-full-frame": {"slug": "christening-olive-full-frame", "title": "Olive Watercolor Frame", "style": "A complete watercolor frame of soft olive leaves."},
  "christening-blue-full-frame": {"slug": "christening-blue-full-frame", "title": "Blue Watercolor Frame", "style": "A complete frame of little blue flowers, ribbons, and a soft dove."},
  "christening-little-dreamer": {"slug": "christening-little-dreamer", "title": "Little Dreamer", "style": "A tiny sleeping baby, a simple watercolor frame, and soft painted sparkles."},
  "christening-blue-dove": {"slug": "christening-blue-dove", "title": "Blue Dove", "style": "A small watercolor dove with a soft blue ribbon."},
  "christening-olive-dove": {"slug": "christening-olive-dove", "title": "Dove & Olive", "style": "A loosely painted dove and a few soft olive leaves."},
  "christening-blush-petals": {"slug": "christening-blush-petals", "title": "Blush Petal Frame", "style": "Light watercolor petals, tiny bows, and a little dove."},
  "christening-olive-ribbon": {"slug": "christening-olive-ribbon", "title": "Olive Ribbon Frame", "style": "An airy border of little olive sprigs and painted ribbons."},
  "christening-ivory-blessing": {"slug": "christening-ivory-blessing", "title": "Ivory Blessing", "style": "Ivory paper with a small champagne watercolor ribbon."},
  "christening-little-blue-heaven": {"slug": "christening-little-blue-heaven", "title": "Little Blue Heaven", "style": "A soft blue watercolor bow with a few painted petals."},
  "christening-blush-grace": {"slug": "christening-blush-grace", "title": "Blush & Grace", "style": "A blush watercolor ribbon and a few loose pink petals."},
  "christening-olive-light": {"slug": "christening-olive-light", "title": "Olive & Light", "style": "A small watercolor olive sprig on plain ivory paper."},
  "bridal-retro-pink-card": {"slug": "bridal-retro-pink-card", "title": "Retro Pink Social", "style": "Warm pink seventies paper, cherries, and little daisies."},
  "bridal-doll-pink-card": {"slug": "bridal-doll-pink-card", "title": "Doll Pink Bride", "style": "Fashion doll pink, scalloped stationery, pearls, and heels."},
  "bridal-cool-girl-card": {"slug": "bridal-cool-girl-card", "title": "Cool Girl Club", "style": "Bold pink, checkerboard edges, and heart sunglasses."},
  "bridal-pink-cocktail-card": {"slug": "bridal-pink-cocktail-card", "title": "Pink Cocktail Hour", "style": "Clinking coupes, ribbon bows, and wine-pink etched details."},
  "bridal-modern-pink-line-card": {"slug": "bridal-modern-pink-line-card", "title": "Pink After Hours", "style": "Modern raspberry line art, champagne coupes, and airy pink paper."},
  "bridal-pink-disco-dream-card": {"slug": "bridal-pink-disco-dream-card", "title": "Pink Disco Dream — Card", "style": "Pink disco balls, sparkling silver stars, bows, and vintage party lettering."},
  "bridal-pink-disco-dream": {"slug": "bridal-pink-disco-dream", "title": "Pink Disco Dream", "style": "Pink disco balls, sparkling silver stars, bows, and vintage party lettering."},
  "bridal-dream-doll-bride": {"slug": "bridal-dream-doll-bride", "title": "Dream Doll Bride", "style": "Vintage pink doll-box stationery, pearls, and a charming fashion illustration."},
  "bridal-malibu-bride": {"slug": "bridal-malibu-bride", "title": "Malibu Bride", "style": "Pink beach-club scallops, pool-blue accents, and a vintage convertible."},
  "bridal-pink-tea-club": {"slug": "bridal-pink-tea-club", "title": "Pink Tea Club", "style": "Pink gingham, scalloped paper, floral teacups, and a little cake."},
  "bridal-pink-disco-scrapbook": {"slug": "bridal-pink-disco-scrapbook", "title": "Pink Disco Scrapbook", "style": "Torn pink paper, silver disco, and pencil cocktail sketches."},
  "bridal-peach-cherry": {"slug": "bridal-peach-cherry", "title": "Peach & Cherry", "style": "Seventies scallops, cherry cocktails, and warm peach paper."},
  "bridal-electric-pink": {"slug": "bridal-electric-pink", "title": "Electric Pink", "style": "Hot pink paste-up, halftone disco, and an eighties dance floor."},
  "bridal-rose-supper-club": {"slug": "bridal-rose-supper-club", "title": "Rose Supper Club", "style": "Dusty rose paper, wine stripes, pearls, and vintage cocktails."},
  "bridal-pink-line": {"slug": "bridal-pink-line", "title": "Pink Bridal Scrapbook", "style": "Pink scrapbook paper & disco sketches"},
  "bridal-pink-disco": {"slug": "bridal-pink-disco", "title": "Pink Disco Bride", "style": "Pink disco, bridal bows & champagne"},
  "wedding-blush-lift": {"slug": "wedding-blush-lift", "title": "Blush Lift", "style": "Simple line art & colored accents"},
  "wedding-little-yes": {"slug": "wedding-little-yes", "title": "Little Yes", "style": "Simple line art & colored accents"},
  "wedding-cherry-toast": {"slug": "wedding-cherry-toast", "title": "Cherry Toast", "style": "Simple line art & colored accents"},
  "gender-reveal-tiny-footprints": {"slug": "gender-reveal-tiny-footprints", "title": "Tiny Footprints", "style": "Watercolor baby footprints"},
  "gender-reveal-little-wonder": {"slug": "gender-reveal-little-wonder", "title": "Little Wonder", "style": "Tiny watercolor booties & a painted border"},
  "gender-reveal-bear-hug": {"slug": "gender-reveal-bear-hug", "title": "Bear Hug", "style": "Two little watercolor bears in pink and blue"},
  "gender-reveal-special-delivery": {"slug": "gender-reveal-special-delivery", "title": "Special Delivery", "style": "A storybook stork & a little surprise"},
  "gender-reveal-up-in-the-air": {"slug": "gender-reveal-up-in-the-air", "title": "Up in the Air", "style": "Pink-and-blue hot air balloons"},
  "gender-reveal-little-surprise": {"slug": "gender-reveal-little-surprise", "title": "Little Surprise", "style": "Pastel balloons & ivory paper"},
  "gender-reveal-ribbon-surprise": {"slug": "gender-reveal-ribbon-surprise", "title": "Ribbon Surprise", "style": "Two-color watercolor ribbons"},
  "gender-reveal-pink-or-blue": {"slug": "gender-reveal-pink-or-blue", "title": "Pink or Blue", "style": "Soft stripes & a ribbon frame"},
  "wedding-happy-table": {"slug": "wedding-happy-table", "title": "Happy Table", "style": "Colorful pen doodles & a wedding table"},
  "wedding-watercolor-banquet": {"slug": "wedding-watercolor-banquet", "title": "Watercolor Banquet", "style": "Loose watercolor & a wedding banquet"},
  "wedding-ring-and-spark": {"slug": "wedding-ring-and-spark", "title": "Ring & Spark", "style": "Simple ink rings & yellow sparkles"},
  "wedding-golden-promise": {"slug": "wedding-golden-promise", "title": "Golden Promise", "style": "Watercolor rings & little golden sparkles"},
  "wedding-sweet-snapshot": {"slug": "wedding-sweet-snapshot", "title": "Sweet Snapshot", "style": "Simple couple doodles & a blush envelope"},
  "wedding-portrait-promise": {"slug": "wedding-portrait-promise", "title": "Portrait Promise", "style": "Simple pencil portraits & a blue floral border"},
  "wedding-heartmarked": {"slug": "wedding-heartmarked", "title": "Heartmarked", "style": "Burgundy toasts & a heartmarked calendar"},
  "wedding-colorful-company": {"slug": "wedding-colorful-company", "title": "Colorful Company", "style": "Colorful pencil sketches & a date to keep"},
  "wedding-linked-steps": {"slug": "wedding-linked-steps", "title": "Linked Steps", "style": "Burgundy line art & a shared next step"},
  "wedding-garden-table": {"slug": "wedding-garden-table", "title": "Garden Table", "style": "Watercolor dinner & a green ribbon frame"},
  "wedding-ivory-vows": {"slug": "wedding-ivory-vows", "title": "Ivory Vows", "style": "Watercolor wedding attire & delicate gold"},
  "wedding-ribbon-revel": {"slug": "wedding-ribbon-revel", "title": "Ribbon Revel", "style": "Colorful watercolor guests & flowing ribbons"},
  "wedding-come-rain-or-shine": {"slug": "wedding-come-rain-or-shine", "title": "Come Rain or Shine", "style": "A wind-swept couple & an ink umbrella"},
  "wedding-side-by-side": {"slug": "wedding-side-by-side", "title": "Side by Side", "style": "A small ink couple & quiet ivory paper"},
  "wedding-rose-letter": {"slug": "wedding-rose-letter", "title": "Rose Letter", "style": "Blush watercolor & a wedding letter"},
  "wedding-sage-letter": {"slug": "wedding-sage-letter", "title": "Sage Letter", "style": "Sage watercolor & a wedding letter"},
  "wedding-first-dance": {"slug": "wedding-first-dance", "title": "First Dance", "style": "A dancing couple & a ribbon frame"},
  "wedding-happily-away": {"slug": "wedding-happily-away", "title": "Happily Away", "style": "A getaway doodle & a playful ink frame"},
  "wedding-our-people": {"slug": "wedding-our-people", "title": "Our People", "style": "Simple cartoon guests & shared joy"},
  "wedding-date-and-dinner": {"slug": "wedding-date-and-dinner", "title": "Date & Dinner", "style": "A blue-ink table & a date to keep"},
  "wedding-little-vows": {"slug": "wedding-little-vows", "title": "Little Vows", "style": "Simple couple doodles & red notes"},
  "wedding-celebration-table": {"slug": "wedding-celebration-table", "title": "Celebration Table", "style": "Simple pen sketches & a shared table"},
  "wedding-day-notes": {"slug": "wedding-day-notes", "title": "Wedding Day Notes", "style": "Pastel doodles & a wedding-day timeline"},
  "wedding-blue-clink": {"slug": "wedding-blue-clink", "title": "Blue Clink", "style": "Blue pen toasts & cream paper"},
  "wedding-tipsy-together": {"slug": "wedding-tipsy-together", "title": "Tipsy Together", "style": "Playful wine-prop pen doodles"},
  "wedding-heart-hideaway": {"slug": "wedding-heart-hideaway", "title": "Heart Hideaway", "style": "A heart & a little mystery"},
  "wedding-blue-pour": {"slug": "wedding-blue-pour", "title": "Blue Pour", "style": "Cobalt ink & a playful pour"},
  "wedding-garden-dance": { slug: "wedding-garden-dance", title: "Garden Dance", style: "Watercolor guests & garden disco" },
  "wedding-ink-and-ivy": { slug: "wedding-ink-and-ivy", title: "Ink & Ivy", style: "Indigo illustrations & wildflowers" },

  "birthday-disco-scrapbook": {"slug": "birthday-disco-scrapbook", "title": "Disco Scrapbook", "style": "Cut-paper colors & disco sparkle"},

  "birthday-checkerboard-cheers": {"slug": "birthday-checkerboard-cheers", "title": "Checkerboard Cheers", "style": "Orange checks & painted cocktails"},
  "birthday-cobalt-cheers": { slug: "birthday-cobalt-cheers", title: "Cobalt Cheers", style: "Blue ink & cocktail cheers" },
  "birthday-retro-disco": { slug: "birthday-retro-pop", title: "Retro Pop", style: "Bold & playful", art: "retro-pop", fullTemplateSlug: "birthday-retro-pop" },
  "birthday-y2k-digital": { slug: "birthday-y2k-party", title: "Y2K Party", style: "Digital nostalgia" },
  "birthday-pink-glam": { slug: "birthday-pink-glam", title: "Pink Glam", style: "A party in full color" },
};

export const invitationTemplates = [...birthdayThemes, ...weddingThemes, ...celebrationThemes].map((theme) => {
  const preview = storefront[theme.id];
  return {
    id: theme.id,
    ...getDesignMembership(theme),
    status: theme.status,
    slug: preview.slug,
    title: preview.title,
    category: theme.category === "birthday" ? "Birthday" : theme.category === "wedding" ? "Wedding" : "Other",
    subcategory: theme.subcategory,
    eventTypes: [theme.category === "birthday" ? "Birthday" : theme.category === "wedding" ? "Wedding" : "Other"],
    style: preview.style,
    styleTags: invitationStyleTags[preview.slug],
    shortDescription: theme.description,
    themeId: theme.id,
    visual: theme.visual,
    layout: theme.layout,
    decor: theme.decor,
    previewArt: preview.art ?? theme.visual,
    design: showcaseDesigns[preview.slug],
    visualAssets: celebrationThemeAssets[preview.slug] ?? weddingThemeAssets[preview.slug] ?? birthdayThemeAssets[preview.slug] ?? null,
    fullTemplateSlug: preview.fullTemplateSlug ?? null,
    isPremium: true,
    unlockStatus: "locked",
  };
});

export const activeInvitationTemplates = invitationTemplates.filter(isThemeActive);

export function getInvitationTemplate(slug) {
  return invitationTemplates.find((template) => template.slug === slug);
}
