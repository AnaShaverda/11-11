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
});

test("complete glass-tower and envelope/portrait compositions retain their individual components", () => {
  for (const slug of ["birthday-cherry-tower", "bridal-cherry-tower", "wedding-sweet-snapshot", "bridal-mint-cheers"]) {
    const layers = separatedThemeAssets[slug];
    assert.ok(layers.components.some(component => component.id.includes("assembly")), slug);
    assert.ok(layers.componentLibrary.length > layers.components.length, slug);
  }
});
