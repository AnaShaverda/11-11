import { birthdayThemes, weddingThemes } from "../../themes/data/themes.js";
import { showcaseDesigns } from "./showcaseDesigns.js";
import { birthdayThemeAssets } from "./birthdayAssets.js";
import { invitationStyleTags } from "./invitationStyles.js";

// Public storefront metadata stays separate from the full invitation registry and demo event content.
const storefront = {
  "birthday-pink-post": {"slug": "birthday-pink-post", "title": "Pink Post", "style": "Blush watercolor & personal notes"},
  "birthday-disco-scrapbook": {"slug": "birthday-disco-scrapbook", "title": "Disco Scrapbook", "style": "Cut-paper colors & disco sparkle"},
  "birthday-velvet-post": {"slug": "birthday-velvet-post", "title": "Velvet Post", "style": "Wine stripes & blush ink"},
  "birthday-checkerboard-cheers": {"slug": "birthday-checkerboard-cheers", "title": "Checkerboard Cheers", "style": "Orange checks & painted cocktails"},
  "birthday-pastel-disco": {"slug": "birthday-pastel-disco", "title": "Pastel Disco", "style": "Pastel sparkles & painted disco"},
  "birthday-paper-garland": {"slug": "birthday-paper-garland", "title": "Paper Garland", "style": "Painted streamers & birthday cake"},
  "birthday-strawberry-social": { slug: "birthday-strawberry-social", title: "Strawberry Social", style: "Painted stripes & strawberry shortcake" },
  "birthday-cobalt-cheers": { slug: "birthday-cobalt-cheers", title: "Cobalt Cheers", style: "Blue ink & cocktail cheers" },
  "birthday-ribbon-social": { slug: "birthday-ribbon-social", title: "Ribbon Social", style: "Burgundy ribbons & cocktail sketches" },
  "birthday-football-club": { slug: "birthday-football-club", title: "Football Club", style: "Vintage match-day celebration" },
  "birthday-ballerina": { slug: "birthday-ballerina", title: "Ballerina", style: "Blush ballet & airy tulle" },
  "birthday-khinkali-beer": { slug: "birthday-khinkali-beer", title: "Khinkali & Beer", style: "Georgian food & golden beer" },
  "birthday-space-explorer": { slug: "birthday-space-explorer", title: "Space Explorer", style: "Painted planets & rocket dreams" },
  "birthday-dino-adventure": { slug: "birthday-dino-adventure", title: "Dino Adventure", style: "Jungle leaves & friendly dinosaurs" },
  "birthday-race-day": { slug: "birthday-race-day", title: "Race Day", style: "Vintage racers & checkered flags" },
  "birthday-supper-club": { slug: "birthday-supper-club", title: "Supper Club", style: "Burgundy & candlelight" },
  "birthday-modern-toast": { slug: "birthday-modern-toast", title: "Modern Toast", style: "Ivory & sculptural silver" },
  "birthday-classic-celebration": { slug: "birthday-classic-celebration", title: "Classic Celebration", style: "Joyful & timeless" },
  "birthday-floral-affair": { slug: "birthday-floral-affair", title: "Floral Affair", style: "Refined & blooming" },
  "birthday-retro-disco": { slug: "birthday-retro-pop", title: "Retro Pop", style: "Bold & playful", art: "retro-pop", fullTemplateSlug: "birthday-retro-pop" },
  "birthday-y2k-digital": { slug: "birthday-y2k-party", title: "Y2K Party", style: "Digital nostalgia" },
  "birthday-pink-glam": { slug: "birthday-pink-glam", title: "Pink Glam", style: "A party in full color" },
  "birthday-coquette": { slug: "birthday-coquette", title: "Coquette", style: "Soft & sweet" },
  "birthday-garden-party": { slug: "birthday-garden-party", title: "Garden Party", style: "Fresh & floral" },
  "birthday-pastel-dream": { slug: "birthday-pastel-dream", title: "Pastel Dream", style: "Lighthearted color" },
  "birthday-tropical-summer": { slug: "birthday-tropical-summer", title: "Tropical Summer", style: "Sunlit & lively" },
  "birthday-painted-summer": { slug: "birthday-painted-summer", title: "Painted Summer", style: "Hand-painted coast" },
  "birthday-beer-party": { slug: "birthday-beer-party", title: "Beer Party", style: "Warm bar nights" },
  "wedding-timeless-white": { slug: "wedding-timeless-white", title: "Timeless White", style: "Classic elegance" },
  "wedding-modern-editorial": { slug: "wedding-editorial", title: "Modern Editorial", style: "Graphic & refined", art: "editorial", fullTemplateSlug: "wedding-editorial" },
  "wedding-romantic-garden": { slug: "wedding-romantic-garden", title: "Romantic Garden", style: "A day in bloom" },
  "wedding-black-tie": { slug: "wedding-black-tie", title: "Black Tie", style: "Formal after dark" },
  "wedding-tuscany": { slug: "wedding-tuscany", title: "Tuscany", style: "Warm & sunlit" },
  "wedding-coastal": { slug: "wedding-coastal", title: "Coastal", style: "Soft sea air" },
  "wedding-bohemian": { slug: "wedding-bohemian", title: "Bohemian", style: "Earthy & heartfelt" },
  "wedding-vintage-romance": { slug: "wedding-vintage-romance", title: "Vintage Romance", style: "Old-world charm" },
  "wedding-celestial": { slug: "wedding-celestial", title: "Celestial", style: "Written in the stars" },
  "wedding-modern-botanical": { slug: "wedding-modern-botanical", title: "Modern Botanical", style: "Sculptural greenery" },
};

export const invitationTemplates = [...birthdayThemes, ...weddingThemes].map((theme) => {
  const preview = storefront[theme.id];
  return {
    id: theme.id,
    slug: preview.slug,
    title: preview.title,
    category: theme.category === "birthday" ? "Birthday" : "Wedding",
    eventTypes: [theme.category === "birthday" ? "Birthday" : "Wedding"],
    style: preview.style,
    styleTags: invitationStyleTags[preview.slug],
    shortDescription: theme.description,
    themeId: theme.id,
    visual: theme.visual,
    layout: theme.layout,
    decor: theme.decor,
    previewArt: preview.art ?? theme.visual,
    design: showcaseDesigns[preview.slug],
    visualAssets: birthdayThemeAssets[preview.slug] ?? null,
    fullTemplateSlug: preview.fullTemplateSlug ?? null,
    isPremium: true,
    unlockStatus: "locked",
  };
});

export function getInvitationTemplate(slug) {
  return invitationTemplates.find((template) => template.slug === slug);
}
