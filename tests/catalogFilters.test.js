import assert from "node:assert/strict";
import test from "node:test";
import { readCatalogFilters, readCatalogOccasion, updateCatalogFilters } from "../src/invitations/data/catalogFilters.js";
import { celebrationThemes, weddingThemes, getThemeBySlug } from "../src/themes/data/themes.js";

test("current filters take precedence over older category-specific links", () => {
  assert.deepEqual(readCatalogFilters(new URLSearchParams("q=garden&birthdayStyle=green"), "birthday"), { style: "green" });
  assert.equal(readCatalogFilters(new URLSearchParams("style=pastel&birthdayStyle=green"), "birthday").style, "pastel");
  assert.equal(readCatalogFilters(new URLSearchParams("style=not-a-style")).style, "all");
});

test("celebration subcategories validate old links and clear independently of style", () => {
  assert.equal(readCatalogOccasion(new URLSearchParams("occasion=bridal-party")), "bridal-party");
  assert.equal(readCatalogOccasion(new URLSearchParams("occasion=gender-reveal")), "gender-reveal");
  assert.equal(readCatalogOccasion(new URLSearchParams("occasion=bachelorette")), "bachelorette");
  assert.equal(readCatalogOccasion(new URLSearchParams("occasion=unknown")), "all");
  const cleared = updateCatalogFilters(new URLSearchParams("style=pastel&occasion=bridal-party"), { occasion: "all" });
  assert.equal(cleared.has("occasion"), false);
  assert.equal(cleared.get("style"), "pastel");
});

test("bridal designs belong to Other Celebrations and keep their existing preview URLs", () => {
  assert.equal(weddingThemes.some((theme) => theme.subcategory === "bridal-party"), false);
  assert.ok(celebrationThemes.some((theme) => theme.subcategory === "bridal-party"));
  for (const slug of ["wedding-blush-lift", "wedding-cherry-toast"]) {
    const theme = getThemeBySlug(slug);
    assert.equal(theme.category, "other");
    assert.equal(theme.subcategory, "bridal-party");
  }
  assert.equal(getThemeBySlug("wedding-little-yes").category, "wedding");
});

test("style changes remove replaced search parameters and preserve unrelated state", () => {
  const original = new URLSearchParams("birthdayStyle=green&occasion=christening&q=garden");
  const updated = updateCatalogFilters(original, { style: "pastel" });
  assert.equal(updated.has("birthdayStyle"), false);
  assert.equal(updated.has("q"), false);
  assert.equal(updated.get("occasion"), "christening");
  assert.equal(updated.get("style"), "pastel");
  assert.equal(original.get("birthdayStyle"), "green");
  const cleared = updateCatalogFilters(updated, { style: "all" });
  assert.equal(cleared.has("style"), false);
  assert.equal(cleared.get("occasion"), "christening");
});
