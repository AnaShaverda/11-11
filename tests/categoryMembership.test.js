import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { projects, getProjectBySlug } from "../src/data/projects.js";
import { themes } from "../src/themes/data/themeRegistry.js";
import { getDesignMembership, itemMatchesCategory } from "../src/data/catalogMembership.js";
import { giftCatalogItems } from "../src/surprises/data/giftCatalog.js";
import { getInvitationCatalogLink, readCatalogCategory, readCatalogOccasion } from "../src/invitations/data/catalogFilters.js";
import { captions } from "../src/localization/captions.js";

const items = themes.map((theme) => ({ ...theme, ...getDesignMembership(theme) }));

test("all eight categories have SVG assets and bilingual labels, with weddings and birthdays first", () => {
  assert.deepEqual(projects.map((p) => p.id), ["wedding", "birthday", "baby-kids", "pre-wedding", "parties", "gifts", "trending", "corporate"]);
  for (const project of projects) {
    assert.match(readFileSync(new URL(`../public${project.folderAsset}`, import.meta.url), "utf8"), /<svg/);
    for (const language of ["en", "ka"]) {
      assert.ok(captions[language][`common.${project.id}`]);
      for (const occasion of project.subcategories ?? []) assert.ok(captions[language][occasion.captionKey]);
    }
  }
});

test("every active design has valid memberships without duplicating its identity", () => {
  assert.equal(new Set(items.map((item) => item.id)).size, items.length);
  for (const item of items) {
    assert.ok(item.categoryIds.length, item.id);
    for (const id of item.categoryIds) {
      const project = projects.find((p) => p.id === id);
      assert.ok(project, `${item.id}: ${id}`);
      for (const occasion of item.categoryOccasions[id]) assert.ok(project.subcategories?.some((sub) => sub.id === occasion), `${item.id}: ${occasion}`);
    }
  }
});

test("one birthday design appears in both adult and kids collections, with its original slug", () => {
  const item = items.find((i) => i.id === "birthday-white-and-blue");
  assert.ok(itemMatchesCategory(item, "birthday", "adult-birthday"));
  assert.ok(itemMatchesCategory(item, "birthday", "kids-birthday"));
  assert.ok(itemMatchesCategory(item, "baby-kids", "kids-birthday"));
  assert.ok(!itemMatchesCategory(item, "baby-kids", "christening"));
  assert.equal(item.slug, "birthday-white-and-blue");
  assert.ok(!itemMatchesCategory(items.find((i) => i.id === "birthday-midnight-martini"), "baby-kids"));
});

test("bridal designs merge into bachelorette while religious and reveal designs move into baby and kids", () => {
  for (const item of items) {
    if (item.subcategory === "bridal-party") assert.ok(itemMatchesCategory(item, "pre-wedding", "bachelorette"));
    if (["gender-reveal", "christening"].includes(item.subcategory)) assert.ok(itemMatchesCategory(item, "baby-kids", item.subcategory));
  }
});

test("gifts share birthday and trending collections and open their correct surprise occasion", () => {
  const gift = giftCatalogItems.find((item) => item.occasionId === "birthday");
  for (const id of ["birthday", "gifts", "trending"]) assert.ok(itemMatchesCategory(gift, id));
  assert.ok(itemMatchesCategory(gift, "birthday", "birthday-gift"));
  for (const item of giftCatalogItems) {
    assert.equal(new URL(item.href, "https://example.test").searchParams.get("occasion"), item.occasionId);
    for (const language of ["en", "ka"]) assert.ok(captions[language][item.captionKey]);
  }
});

test("old Other links resolve by occasion and category switching retains only compatible filters", () => {
  const old = new URLSearchParams("category=other&occasion=christening&style=pastel");
  assert.equal(readCatalogCategory(old).id, "baby-kids");
  const kids = projects.find((p) => p.id === "baby-kids");
  const birthday = projects.find((p) => p.id === "birthday");
  const shared = new URLSearchParams("category=birthday&occasion=kids-birthday&style=pastel");
  assert.equal(new URLSearchParams(getInvitationCatalogLink(kids, shared).search).get("occasion"), "kids-birthday");
  assert.equal(new URLSearchParams(getInvitationCatalogLink(birthday, old).search).has("occasion"), false);
  assert.equal(readCatalogOccasion(new URLSearchParams("category=wedding&occasion=christening")), "all");
  assert.equal(getProjectBySlug("birthday-wishes").id, "birthday");
  assert.equal(readCatalogCategory(new URLSearchParams("category=other&occasion=bridal-party")).id, "pre-wedding");
});
