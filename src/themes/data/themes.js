export const birthdayThemes = [
  { id: "birthday-retro-disco", slug: "birthday-retro-disco", category: "birthday", name: "Retro Disco", description: "Mirrorball nights, warm color, and a little dance-floor drama.", mood: "Funky · warm · electric", visual: "retro-disco", layout: "stage", decor: "✳" },
  { id: "birthday-y2k-digital", slug: "birthday-y2k-digital", category: "birthday", name: "Y2K Digital", description: "Glossy windows and pixel stars for a new kind of nostalgia.", mood: "Chrome · digital · playful", visual: "y2k-digital", layout: "desktop", decor: "✧" },
  { id: "birthday-pink-glam", slug: "birthday-pink-glam", category: "birthday", name: "Pink Glam", description: "A fashion-forward birthday with sparkle and confidence.", mood: "Glossy · bold · fashion", visual: "pink-glam", layout: "editorial", decor: "✦" },
  { id: "birthday-coquette", slug: "birthday-coquette", category: "birthday", name: "Coquette Birthday", description: "Soft ribbons, delicate type, and a dreamy little celebration.", mood: "Blush · delicate · romantic", visual: "coquette", layout: "arch", decor: "୨୧" },
  { id: "birthday-midnight-luxury", slug: "birthday-midnight-luxury", category: "birthday", name: "Midnight Luxury", description: "Champagne details and a black-tie mood after dark.", mood: "Dark · polished · intimate", visual: "midnight-luxury", layout: "editorial", decor: "✧" },
  { id: "birthday-garden-party", slug: "birthday-garden-party", category: "birthday", name: "Garden Party", description: "An open-air feeling with greenery and soft daylight.", mood: "Botanical · fresh · graceful", visual: "garden-party", layout: "arch", decor: "❀" },
  { id: "birthday-neon-night", slug: "birthday-neon-night", category: "birthday", name: "Neon Night", description: "Electric color and a dance floor that goes late.", mood: "Nightlife · bright · bold", visual: "neon-night", layout: "stage", decor: "⚡" },
  { id: "birthday-pastel-dream", slug: "birthday-pastel-dream", category: "birthday", name: "Pastel Dream", description: "Cloud-soft color and rounded shapes full of joy.", mood: "Airy · sweet · colorful", visual: "pastel-dream", layout: "cloud", decor: "☁" },
  { id: "birthday-minimal-editorial", slug: "birthday-minimal-editorial", category: "birthday", name: "Minimal Editorial", description: "Confident typography and space for the moment to breathe.", mood: "Neutral · graphic · modern", visual: "minimal-editorial", layout: "editorial", decor: "—" },
  { id: "birthday-tropical-summer", slug: "birthday-tropical-summer", category: "birthday", name: "Tropical Summer", description: "Citrus energy, pool-blue color, and sunshine all day.", mood: "Summer · citrus · lively", visual: "tropical-summer", layout: "split", decor: "☀" },
];

export const weddingThemes = [
  { id: "wedding-timeless-white", slug: "wedding-timeless-white", category: "wedding", name: "Timeless White", description: "Quiet ivory elegance with room for every precious detail.", mood: "Classic · light · graceful", visual: "timeless-white", layout: "arch", decor: "✧" },
  { id: "wedding-modern-editorial", slug: "wedding-modern-editorial", category: "wedding", name: "Modern Editorial", description: "A contemporary love story told in bold black and white.", mood: "Graphic · refined · current", visual: "modern-editorial", layout: "editorial", decor: "&" },
  { id: "wedding-romantic-garden", slug: "wedding-romantic-garden", category: "wedding", name: "Romantic Garden", description: "Soft florals and green paths for a celebration in bloom.", mood: "Floral · tender · airy", visual: "romantic-garden", layout: "arch", decor: "❀" },
  { id: "wedding-black-tie", slug: "wedding-black-tie", category: "wedding", name: "Black Tie", description: "Formal evenings, candlelight, and a hint of gold.", mood: "Formal · dramatic · luminous", visual: "black-tie", layout: "stage", decor: "✦" },
  { id: "wedding-tuscany", slug: "wedding-tuscany", category: "wedding", name: "Tuscany", description: "Terracotta warmth and an unhurried Mediterranean mood.", mood: "Warm · rustic · elegant", visual: "tuscany", layout: "split", decor: "◒" },
  { id: "wedding-coastal", slug: "wedding-coastal", category: "wedding", name: "Coastal Wedding", description: "Sea air, soft sand, and light that seems to last forever.", mood: "Breezy · pale · serene", visual: "coastal", layout: "split", decor: "≈" },
  { id: "wedding-bohemian", slug: "wedding-bohemian", category: "wedding", name: "Bohemian", description: "Earthy texture and effortless, heartfelt style.", mood: "Organic · relaxed · warm", visual: "bohemian", layout: "arch", decor: "✺" },
  { id: "wedding-vintage-romance", slug: "wedding-vintage-romance", category: "wedding", name: "Vintage Romance", description: "Antique-paper charm with a storybook sense of occasion.", mood: "Nostalgic · ornate · intimate", visual: "vintage-romance", layout: "poster", decor: "❦" },
  { id: "wedding-celestial", slug: "wedding-celestial", category: "wedding", name: "Celestial Wedding", description: "Silver constellations and a night sky made for two.", mood: "Dreamlike · midnight · glowing", visual: "celestial", layout: "stage", decor: "☾" },
  { id: "wedding-modern-botanical", slug: "wedding-modern-botanical", category: "wedding", name: "Modern Botanical", description: "Clean lines meet deep green and sculptural leaves.", mood: "Natural · minimal · fresh", visual: "modern-botanical", layout: "editorial", decor: "✿" },
];

export const themes = [...birthdayThemes, ...weddingThemes];

export function getThemeBySlug(slug) {
  return themes.find((theme) => theme.slug === slug);
}
