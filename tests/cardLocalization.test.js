import test from "node:test";
import assert from "node:assert/strict";
import { captions } from "../src/localization/captions.js";
import { cardCopy, formatCardDate, getInvitationSample, getThemeDemoEvent, localizeCardRecord } from "../src/localization/cardCopy.js";
import { invitationSamples } from "../src/invitations/data/invitationSamples.js";
import { showcaseDesigns } from "../src/invitations/data/showcaseDesigns.js";
import { themeDemoEvents } from "../src/themes/data/demoEvents.js";
import { guestCardCopy } from "../src/localization/guestCardCopy.js";
import { guestCanvasCopy } from "../src/localization/guestCanvasCopy.js";
import { entranceStyles, motionStyles } from "../src/invitations/data/guestCardDesign.js";

function translator(language) {
  return (key) => {
    assert.equal(typeof captions[language][key], "string", `Missing ${language} resource: ${key}`);
    return captions[language][key];
  };
}

test("canvas editing and modal controls have complete English and Georgian copy", () => {
  assert.deepEqual(Object.keys(guestCanvasCopy.en).sort(), Object.keys(guestCanvasCopy.ka).sort());
  for (const key of Object.keys(guestCanvasCopy.en)) {
    assert.ok(guestCardCopy.en[key]?.trim(), key);
    assert.ok(guestCardCopy.ka[key]?.trim(), key);
    assert.equal(/[a-z]/i.test(guestCardCopy.ka[key].replace(/\{\w+\}/g, "")), false, key);
  }
});

test("every card resource has Georgian and English copy, with no Latin text in Georgian", () => {
  assert.deepEqual(Object.keys(cardCopy.ka).sort(), Object.keys(cardCopy.en).sort());
  for (const [key, value] of Object.entries(cardCopy.ka)) {
    assert.equal(/[a-z]/i.test(value), false, `${key}: ${value}`);
  }
});

test("all invitation samples translate every display field and restore the original English", () => {
  for (const [slug, source] of Object.entries(invitationSamples)) {
    const ka = getInvitationSample(slug, translator("ka"));
    const en = getInvitationSample(slug, translator("en"));
    for (const [field, value] of Object.entries(source)) {
      assert.equal(en[field], value, `${slug}.${field}`);
      if (typeof value === "string") assert.equal(/[a-z]/i.test(ka[field]), false, `${slug}.${field}`);
      else assert.equal(ka[field], value);
    }
  }
});

test("names, possessives, initials, dates and locations use Georgian resources", () => {
  const t = translator("ka");
  const christening = getInvitationSample("christening-olive-light", t);
  assert.equal(christening.name, "სოფია");
  assert.equal(christening.namePossessive, "სოფიას");
  assert.equal(christening.date, "18 მაისი 2027 · 13:00");
  assert.equal(christening.location, "თბილისი");
  assert.equal(getInvitationSample("wedding-little-yes", t).mark, "ა და ს");
  assert.equal(getInvitationSample("birthday-velvet-post", t).namePossessive, "მარიფერის");
});

test("supporting cards and demo events translate while preserving event configuration", () => {
  const t = translator("ka");
  for (const [slug, design] of Object.entries(showcaseDesigns)) {
    const localized = localizeCardRecord("designs", slug, design, t);
    for (const field of ["specimen", "phrase", "accentCard", "accentCopy", "finish"]) {
      assert.equal(/[a-z]/i.test(localized[field]), false, `${slug}.${field}`);
    }
    assert.deepEqual(localized.palette, design.palette);
    assert.equal(localized.pattern, design.pattern);
  }
  for (const [slug, source] of Object.entries(themeDemoEvents)) {
    const localized = getThemeDemoEvent(slug, t);
    assert.equal(localized.dateISO, source.dateISO);
    assert.deepEqual(localized.enabledModules, source.enabledModules);
    assert.equal(/[a-z]/i.test(localized.title), false, slug);
  }
  assert.equal(getThemeDemoEvent("unknown-event", t), undefined);
});


test("Georgian dates do not rely on browser support for the Georgian Intl locale", () => {
  const t = (key, values = {}) => translator("ka")(key).replace(/\{(\w+)\}/g, (_, name) => String(values[name]));
  assert.equal(formatCardDate("2027-10-23T17:00:00+04:00", "ka", t), "23 ოქტომბერი 2027");
  assert.equal(formatCardDate("2027-01-01T00:30:00+04:00", "ka", t), "1 იანვარი 2027");
});

test("guest entrances, continuation controls and every motion option have English and Georgian labels", () => {
  const keys = [...entranceStyles.map(value => `guestCards.entrance.${value}`),
    ...motionStyles.map(value => `guestCards.motion.${value}`),
    "guestCards.doors.open", "guestCards.doors.view", "guestCards.doors.opening"];
  for (const key of keys) {
    assert.ok(guestCardCopy.en[key]?.trim(), key);
    assert.ok(guestCardCopy.ka[key]?.trim(), key);
    assert.equal(/[a-z]/i.test(guestCardCopy.ka[key]), false, key);
  }
});
