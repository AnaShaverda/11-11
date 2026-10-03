import fs from "node:fs/promises";
import { createRequire } from "node:module";
import { invitationTemplates } from "../../src/invitations/data/templates.js";

const require = createRequire(import.meta.url);
const sharp = require("/Users/mac/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp");
const categories = ["Birthday", "Wedding", "Other"];
for (const category of categories) {
  const templates = invitationTemplates.filter((t) => t.category === category && t.visualAssets?.coverImage);
  const width = 1000;
  const tile = 200;
  const height = Math.ceil(templates.length / 5) * 230;
  const layers = [];
  for (const [index, template] of templates.entries()) {
    const left = (index % 5) * tile;
    const top = Math.floor(index / 5) * 230;
    layers.push({ input: await sharp(`public${template.visualAssets.coverImage}`).resize(190, 190, { fit: "contain", background: "#eeeeee" }).png().toBuffer(), left, top });
    const title = template.slug.replace(/^(birthday|wedding|christening|gender-reveal|bridal)-/, "");
    const label = `<svg width="200" height="35"><rect width="200" height="35" fill="white"/><text x="4" y="14" font-family="Arial" font-size="10">${title}</text><text x="4" y="29" font-family="Arial" font-size="10">${template.status}</text></svg>`;
    layers.push({ input: Buffer.from(label), left, top: top + 190 });
  }
  const destination = `/tmp/theme-audit-${category.toLowerCase()}.png`;
  await sharp({ create: { width, height, channels: 4, background: "#eeeeee" } }).composite(layers).png().toFile(destination);
  console.log(destination);
}
const foregrounds = invitationTemplates.filter((t) => t.visualAssets?.selectedBridal || t.visualAssets?.paintedCocktail || t.visualAssets?.pizzaChef);
const layers = [];
for (const [index, template] of foregrounds.entries()) {
  const left = (index % 5) * 200;
  const top = Math.floor(index / 5) * 225;
  const image = template.visualAssets.selectedBridal?.artwork ?? template.visualAssets.cocktailIllustration ?? template.visualAssets.pizzaIllustration;
  layers.push({ input: await sharp(`public${image}`).resize(190, 190, { fit: "contain", background: "#eeeeee" }).png().toBuffer(), left, top });
  const label = `<svg width="200" height="30"><rect width="200" height="30" fill="white"/><text x="4" y="16" font-family="Arial" font-size="10">${template.slug}</text></svg>`;
  layers.push({ input: Buffer.from(label), left, top: top + 190 });
}
await sharp({ create: { width: 1000, height: Math.ceil(foregrounds.length / 5) * 225, channels: 4, background: "#eeeeee" } }).composite(layers).png().toFile("/tmp/theme-audit-existing-foregrounds.png");
