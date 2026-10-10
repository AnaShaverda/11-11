import assert from "node:assert/strict";
import test from "node:test";
import { activeThemes, getThemeBySlug } from "../src/themes/data/themeRegistry.js";
import { surpriseOccasions } from "../src/surprises/data/surprises.js";

const hiddenThemeIds = [
  "wedding-little-yes",
  "wedding-garden-table", "wedding-ribbon-revel", "wedding-side-by-side",
  "wedding-first-dance", "wedding-day-notes",
  "bridal-dream-doll-bride",
  "wedding-blush-lift", "bridal-pink-tea-club",
];

test("requested hidden themes stay inactive and remain saved for existing invitations", () => {
  for (const id of hiddenThemeIds) {
    assert.equal(getThemeBySlug(id)?.status, "inactive", id);
    assert.ok(!activeThemes.some((theme) => theme.id === id), id);
    assert.ok(!surpriseOccasions.some((occasion) => occasion.themeIds.includes(id)), id);
  }
});


test("every surprise occasion keeps an active theme after hiding designs", () => {
  for (const occasion of surpriseOccasions) {
    assert.ok(occasion.themeIds.length > 0, occasion.id);
    assert.ok(occasion.themeIds.every((id) => getThemeBySlug(id)?.status === "active"), occasion.id);
  }
});


test("visibility overrides survive design metadata being reset to active", async () => {
  const { applyThemeStatus } = await import("../src/themes/data/themeStatus.js");
  for (const id of hiddenThemeIds) {
    assert.equal(applyThemeStatus({ id, status: "active" }).status, "inactive", id);
  }
});
