import assert from "node:assert/strict";
import test from "node:test";
import { readCatalogFilters, updateCatalogFilters } from "../src/invitations/data/catalogFilters.js";

test("current filters take precedence over older category-specific links", () => {
  assert.deepEqual(readCatalogFilters(new URLSearchParams("q=garden&birthdayStyle=green"), "birthday"), { style: "green" });
  assert.equal(readCatalogFilters(new URLSearchParams("style=pastel&birthdayStyle=green"), "birthday").style, "pastel");
  assert.equal(readCatalogFilters(new URLSearchParams("style=not-a-style")).style, "all");
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
