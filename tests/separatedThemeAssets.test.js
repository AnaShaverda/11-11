import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import { separatedThemeAssets, getSeparatedComponents, getSeparatedBackground } from "../src/invitations/data/separatedThemeAssets.js";
import { invitationTemplates } from "../src/invitations/data/templates.js";
import { birthdayAssetStyle, getBirthdayImageAssets } from "../src/invitations/data/assetPresentation.js";

test("separated themes reference saved backgrounds and individually identified components", () => {
  const templates = new Map(invitationTemplates.map(template => [template.slug, template]));
  for (const [slug, layers] of Object.entries(separatedThemeAssets)) {
    assert.ok(templates.has(slug), slug);
    assert.ok(layers.background.color, slug);
    assert.ok(layers.components.length, slug);
    assert.equal(new Set(layers.components.map(component => component.id)).size, layers.components.length, slug);
    const imageAssets = getBirthdayImageAssets(layers.components);
    assert.equal(new Set(imageAssets.map(component => component.id)).size, imageAssets.length, slug);
    for (const image of [layers.background.image, ...imageAssets.map(component => component.image)].filter(Boolean)) {
      assert.ok(image.startsWith("/images/"), image);
      assert.ok(fs.existsSync(new URL(`../public${image}`, import.meta.url)), image);
    }
    for (const component of [...layers.components, ...imageAssets]) {
      assert.ok(component.left && component.top && component.width && component.height, `${slug}: ${component.id}`);
      assert.ok(birthdayAssetStyle(component).zIndex < 3);
    }
  }
});

test("the bow and cherries form one component while hearts and underline stay independent", () => {
  const components = separatedThemeAssets["birthday-pink-minimal"].components;
  assert.equal(components.length, 4);
  assert.equal(new Set(getBirthdayImageAssets(components).map(component => component.image)).size, 4);
  const withoutHearts = components.filter(component => !component.id.includes("heart"));
  assert.equal(withoutHearts.length, 2);
  assert.deepEqual(withoutHearts[0].components.map(component => component.id), ["burgundy-bow", "burgundy-cherries"]);
  assert.equal(getBirthdayImageAssets(components.filter(component => component.id !== "bow-cherries-assembly")).length, 3);
});

test("the bow knot and cherry stem stay joined in the same fixed-ratio coordinate space", () => {
  const layers = separatedThemeAssets["birthday-pink-minimal"];
  const before = JSON.stringify(layers);
  const square = getSeparatedComponents(layers)[0];
  const portrait = getSeparatedComponents(layers, "portrait")[0];
  assert.equal(square.aspectRatio, 4 / 3);
  assert.equal(portrait.aspectRatio, square.aspectRatio);
  assert.deepEqual(portrait.components, square.components);
  assert.notEqual(portrait.height, square.height);
  const [bow, cherries] = square.components;
  const anchor = (part, x, y) => ({
    x: parseFloat(part.left) + parseFloat(part.width) * x,
    y: (parseFloat(part.top) + parseFloat(part.height) * y) / square.aspectRatio,
  });
  const knot = anchor(bow, 0.493, 0.234);
  const stem = anchor(cherries, 0.51, 0.045);
  assert.ok(Math.abs(knot.x - stem.x) < 0.01);
  assert.ok(Math.abs(knot.y - stem.y) < 0.01);
  assert.equal(JSON.stringify(layers), before);
});

test("portrait overrides do not mutate the square component configuration", () => {
  const layers = separatedThemeAssets["birthday-ribbon-sketch"];
  const before = JSON.stringify(layers);
  assert.equal(getSeparatedComponents(layers, "square")[1].width, "10%");
  assert.equal(getSeparatedComponents(layers, "portrait")[1].width, "14%");
  assert.ok(getSeparatedComponents(layers, "portrait").every(component => !Object.hasOwn(component, "portrait")));
  assert.equal(JSON.stringify(layers), before);
});

test("mirrored reusable ornaments preserve their rotation and alpha-compatible image rendering", () => {
  assert.equal(birthdayAssetStyle({ image: "/leaf.webp", rotation: 15, flipX: true }).transform, "rotate(15deg) scaleX(-1)");
});

test("every portrait variant and retained individual cutout references a saved asset", () => {
  for (const layers of Object.values(separatedThemeAssets)) {
    const components = getBirthdayImageAssets([...getSeparatedComponents(layers, "portrait"), ...(layers.componentLibrary ?? [])]);
    const images = [getSeparatedBackground(layers, "portrait").image, ...components.map(component => component.image)].filter(Boolean);
    for (const image of images) assert.ok(fs.existsSync(new URL(`../public${image}`, import.meta.url)), image);
    assert.equal(new Set(getSeparatedComponents(layers, "portrait").map(component => component.id)).size, getSeparatedComponents(layers, "portrait").length);
  }
});

test("ornate frames use portrait artwork but simple line frames and plain paper are reused", () => {
  const ornate = separatedThemeAssets["birthday-ribbon-sketch"];
  assert.notEqual(getSeparatedComponents(ornate)[0].image, getSeparatedComponents(ornate, "portrait")[0].image);
  const simple = separatedThemeAssets["gender-reveal-bear-hug"];
  assert.deepEqual(getSeparatedBackground(simple), getSeparatedBackground(simple, "portrait"));
  assert.equal(getSeparatedComponents(simple).at(-1).image, getSeparatedComponents(simple, "portrait").at(-1).image);
  const before = JSON.stringify(separatedThemeAssets["birthday-checkerboard-cheers"]);
  assert.match(getSeparatedBackground(separatedThemeAssets["birthday-checkerboard-cheers"], "portrait").image, /-portrait\.webp$/);
  assert.equal(JSON.stringify(separatedThemeAssets["birthday-checkerboard-cheers"]), before);
});

test("complete glass-tower and envelope/portrait compositions retain their individual components", () => {
  for (const slug of ["birthday-cherry-tower", "bridal-cherry-tower", "wedding-sweet-snapshot", "bridal-mint-cheers"]) {
    const layers = separatedThemeAssets[slug];
    assert.ok(layers.components.some(component => component.id.includes("assembly")), slug);
    assert.ok(layers.componentLibrary.length > layers.components.length, slug);
  }
});
