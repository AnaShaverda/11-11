import fs from "node:fs/promises";
import { createRequire } from "node:module";
const sharp = createRequire(import.meta.url)("/Users/mac/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp");
const frames = [
  "ribbon-frame", "ribbon-social-frame", "birthday-coquette-frame",
  "christening-olive-full-frame-olive-frame", "christening-blue-full-frame-blue-floral-frame",
  "christening-little-dreamer-gold-frame", "christening-blush-petals-petal-frame", "christening-olive-ribbon-olive-frame",
  "bridal-doll-pink-card-frame", "bridal-pink-cocktail-card-frame", "bridal-modern-pink-line-card-ribbon-frame",
  "wedding-portrait-promise-floral-frame", "wedding-ribbon-revel-floral-frame",
];
const backgrounds = ["disco-scrapbook-paper", ...["city-after-dark", "comic-cutout", "retro-sport", "upside-down", "pink-lido", "blue-splash"].map(key => `birthday-${key}-background`), "bridal-cool-girl-card-background", "bridal-peach-cherry-background"];
const jobs = [
  ...frames.map(id => ({ id: `${id}-portrait`, originalId: id, source: `${process.cwd()}/public/images/components/separated/${id}.webp`, background: false, kind: "portrait-frame" })),
  ...backgrounds.map(id => ({ id: `${id}-portrait`, originalId: id, source: `${process.cwd()}/public/images/backgrounds/separated/${id}.webp`, background: true, kind: "portrait-background" })),
  { id: "wedding-ink-and-ivy-frame-portrait", source: `${process.cwd()}/public/images/recipient/wedding-ink-and-ivy/invitation-portrait.webp`, background: false, kind: "portrait-frame" },
  { id: "gender-reveal-ribbon-surprise-frame-portrait", source: `${process.cwd()}/public/images/recipient/gender-reveal-ribbon-surprise/invitation-portrait.webp`, background: false, kind: "portrait-frame" },
  { id: "wedding-sweet-snapshot-assembly", source: `${process.cwd()}/public/images/wedding/sweet-snapshot/sage-envelope-portrait.webp`, background: false, kind: "whole-assembly" },
];
await fs.writeFile("output/imagegen/responsive-asset-jobs.json", JSON.stringify(jobs, null, 2) + "\n");
for (let offset = 0; offset < jobs.length; offset += 16) {
  const group = jobs.slice(offset, offset + 16), tiles = [];
  for (const [index, job] of group.entries()) {
    const x = index % 4 * 270, y = Math.floor(index / 4) * 300;
    tiles.push({ input: await sharp(job.source).resize(260, 260, { fit: "contain", background: "#eeeeee" }).png().toBuffer(), left: x, top: y });
    tiles.push({ input: Buffer.from(`<svg width="270" height="40"><rect width="270" height="40" fill="white"/><text x="3" y="17" font-family="Arial" font-size="9">${job.id}</text></svg>`), left: x, top: y + 260 });
  }
  await sharp({ create: { width: 1080, height: Math.ceil(group.length / 4) * 300, channels: 4, background: "#eeeeee" } }).composite(tiles).png().toFile(`/tmp/responsive-sources-${offset / 16 + 1}.png`);
}
console.log(JSON.stringify({ jobs: jobs.length }));
