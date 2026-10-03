import fs from "node:fs/promises";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const sharp = require("/Users/mac/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp");
const records = JSON.parse(await fs.readFile(new URL("./separated-component-prompts.json", import.meta.url), "utf8"));
for (const record of records) {
  const kind = record.background ? "backgrounds" : "components";
  const target = path.resolve(`public/images/${kind}/separated/${record.id}.webp`);
  const sourceTarget = path.resolve(`src/assets/${kind}/separated/${record.id}.png`);
  await fs.mkdir(path.dirname(target), { recursive: true });
  await fs.mkdir(path.dirname(sourceTarget), { recursive: true });
  if (process.argv.includes("--only-new") && !process.argv.includes(`--replace=${record.id}`)) {
    try { await fs.access(target); await fs.access(sourceTarget); continue; } catch { /* New asset. */ }
  }
  await fs.copyFile(record.generatedPath, sourceTarget);
  let image = sharp(record.generatedPath);
  if (!record.background && !record.id.includes("frame")) image = image.trim({ threshold: 10 });
  await image.webp({ quality: 94, alphaQuality: 100 }).toFile(target);
  const { data, info } = await sharp(target).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  let transparent = 0;
  let painted = 0;
  for (let i = 3; i < data.length; i += info.channels) {
    if (data[i] === 0) transparent++;
    else painted++;
  }
  if (!record.background && (!transparent || !painted)) throw new Error(`Invalid transparent component: ${record.id}`);
  console.log(`${record.id}: ${info.width}x${info.height}, ${Math.round(100 * transparent / (transparent + painted))}% transparent`);
}
