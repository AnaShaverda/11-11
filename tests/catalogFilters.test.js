import assert from "node:assert/strict";
import test from "node:test";
import { getInvitationCatalogLink, readCatalogCategory, readCatalogFilters, readCatalogOccasion, updateCatalogFilters } from "../src/invitations/data/catalogFilters.js";
import { projects, getProjectBySlug } from "../src/data/projects.js";
import { celebrationThemes, weddingThemes, getThemeBySlug } from "../src/themes/data/themes.js";

test("the shared catalog validates category URLs and accepts legacy type links", () => {
  for (const project of projects) {
    assert.equal(readCatalogCategory(new URLSearchParams(`category=${project.id}`)), project);
    assert.equal(readCatalogCategory(new URLSearchParams(`type=${project.slug}`)), project);
  }
  assert.equal(readCatalogCategory(new URLSearchParams("category=WEDDING"))?.id, "wedding");
  assert.equal(readCatalogCategory(new URLSearchParams("category=birthday&type=wedding"))?.id, "birthday");
  for (const query of ["", "category=all", "category=unknown", "type=unknown"]) {
    assert.equal(readCatalogCategory(new URLSearchParams(query)), null);
  }
});

test("category switching uses one route, keeps style, and scopes occasions to Other", () => {
  const original = new URLSearchParams("category=other&style=pastel&occasion=christening&ref=home");
  const all = getInvitationCatalogLink(null, original);
  assert.equal(all.pathname, "/invitations");
  assert.equal(all.search, "style=pastel&occasion=christening&ref=home");
  const birthday = getInvitationCatalogLink(projects[0], original);
  assert.equal(birthday.pathname, "/invitations");
  assert.equal(birthday.search, "category=birthday&style=pastel&ref=home");
  assert.equal(original.get("category"), "other");
  assert.equal(original.get("occasion"), "christening");
});

test("old project and type links migrate to category URLs with their style", () => {
  const project = getProjectBySlug("birthday-wishes");
  const link = getInvitationCatalogLink(project, new URLSearchParams("birthdayStyle=green&q=garden"));
  assert.deepEqual(link, { pathname: "/invitations", search: "category=birthday&style=green" });
  const params = new URLSearchParams("type=other-celebrations&otherStyle=pastel&occasion=bridal-party");
  const migrated = getInvitationCatalogLink(readCatalogCategory(params), params);
  assert.equal(migrated.pathname, "/invitations");
  assert.equal(readCatalogCategory(new URLSearchParams(migrated.search))?.id, "other");
  assert.equal(new URLSearchParams(migrated.search).get("occasion"), "bridal-party");
  assert.equal(new URLSearchParams(migrated.search).get("style"), "pastel");
  assert.equal(new URLSearchParams(migrated.search).has("type"), false);
  assert.equal(new URLSearchParams(migrated.search).has("otherStyle"), false);
});

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
