import test from "node:test";
import assert from "node:assert/strict";
import { catalogColorOptions, catalogThemeOptions, getCatalogAppearance, matchesCatalogAppearance, readCatalogAppearance } from "../src/invitations/data/catalogAppearance.js";
import { activeInvitationTemplates, invitationTemplates } from "../src/invitations/data/templates.js";
import { getInvitationCatalogLink, updateCatalogFilters } from "../src/invitations/data/catalogFilters.js";
import { projects } from "../src/data/projects.js";
import { giftCatalogItems } from "../src/surprises/data/giftCatalog.js";
import { captions } from "../src/localization/captions.js";

const design = (id) => invitationTemplates.find((item) => item.id === id);
test("theme and color filters match the public design metadata", () => {
  assert.ok(getCatalogAppearance(design("birthday-white-and-blue")).colors.includes("blue"));
  const ribbon = getCatalogAppearance(design("birthday-ribbon-sketch"));
  assert.ok(ribbon.colors.includes("pink"));
  assert.ok(ribbon.colors.includes("red"));
  assert.ok(getCatalogAppearance(design("birthday-peach-fizz")).colors.includes("peach"));
  assert.ok(getCatalogAppearance(design("birthday-midnight-martini")).colors.includes("navy"));
  for (const item of activeInvitationTemplates) {
    const appearance = getCatalogAppearance(item);
    assert.ok(appearance.colors.length, item.id);
    assert.ok(appearance.themes.length, item.id);
  }
});
test("multiple selections allow either choice within a group and require both groups", () => {
  const blue = design("birthday-white-and-blue");
  assert.ok(matchesCatalogAppearance(blue, { themes: ["retro", "line-art"], colors: ["pink", "blue"] }));
  assert.equal(matchesCatalogAppearance(blue, { themes: ["floral"], colors: ["blue"] }), false);
  assert.equal(matchesCatalogAppearance(blue, { themes: ["line-art"], colors: ["pink"] }), false);
  assert.ok(matchesCatalogAppearance(blue, {}));
  assert.ok(matchesCatalogAppearance(giftCatalogItems[0], {}));
  assert.equal(matchesCatalogAppearance(giftCatalogItems[0], { colors: ["pink"] }), false);
});
test("URL selections validate, deduplicate, migrate old styles and survive category changes", () => {
  assert.deepEqual(readCatalogAppearance(new URLSearchParams("themes=unknown,retro,retro&colors=blue,pink,bogus")), { themes: ["retro"], colors: ["pink", "blue"] });
  assert.deepEqual(readCatalogAppearance(new URLSearchParams(), "photographic"), { themes: ["photo"], colors: [] });
  assert.deepEqual(readCatalogAppearance(new URLSearchParams(), "green"), { themes: [], colors: ["green"] });
  assert.deepEqual(readCatalogAppearance(new URLSearchParams("themes=floral"), "green"), { themes: ["floral"], colors: [] });
  const original = new URLSearchParams("category=birthday&occasion=kids-birthday&themes=retro&colors=blue&ref=home");
  const link = getInvitationCatalogLink(projects.find((item) => item.id === "baby-kids"), original);
  assert.equal(new URLSearchParams(link.search).get("occasion"), "kids-birthday");
  assert.deepEqual(readCatalogAppearance(new URLSearchParams(link.search)), { themes: ["retro"], colors: ["blue"] });
  const cleared = updateCatalogFilters(original, { themes: "", colors: "", style: "all" });
  assert.equal(cleared.has("themes"), false);
  assert.equal(cleared.has("colors"), false);
  assert.equal(cleared.get("category"), "birthday");
  assert.equal(cleared.get("ref"), "home");
});
test("every theme and color has English and Georgian accessible labels", () => {
  for (const lang of ["en", "ka"]) {
    for (const option of catalogThemeOptions) assert.ok(captions[lang][`catalog.theme.${option.id}`]);
    for (const option of catalogColorOptions) assert.ok(captions[lang][`catalog.color.${option.id}`]);
  }
});
