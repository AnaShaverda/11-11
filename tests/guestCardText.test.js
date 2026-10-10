import test from "node:test";
import assert from "node:assert/strict";
import { invitationTemplates } from "../src/invitations/data/templates.js";
import { invitationSamples } from "../src/invitations/data/invitationSamples.js";
import { getCardTextFields, getCardExtraCopyFields, normalizeCardText, applyCardText, getEditableCardFields, matchEditableCardText, guestCardWordingKeys } from "../src/invitations/data/guestCardText.js";
import { guestCardCopy } from "../src/localization/guestCardCopy.js";

test("all designs expose localized text controls while preserving source records", () => {
  const before = JSON.stringify(invitationSamples);
  for (const template of invitationTemplates) {
    const sample = invitationSamples[template.slug];
    const fields = getCardTextFields(template, sample);
    for (const field of [...fields, ...getCardExtraCopyFields(template, sample)]) {
      for (const language of ["en", "ka"]) assert.ok(guestCardCopy[language][`guestCards.text.${field.label}`], `${template.slug}: ${field.label}`);
    }
    const edits = normalizeCardText({ fields: { title: "Our celebration", date: "12 SEP 2027", location: "The garden", unknown: "bad" }, translations: { "meta.title": "bad" } }, template, sample);
    const result = applyCardText(sample, edits, key => key);
    assert.equal(result.title, "Our celebration");
    assert.equal(result.location, "The garden");
    assert.equal(edits.fields.unknown, undefined);
    assert.deepEqual(edits.translations, {});
  }
  assert.equal(JSON.stringify(invitationSamples), before);
});

test("name and age aliases update together and an edited time reaches the invitation date", () => {
  const sample = { name: "Ana", posterName: "Ana", namePossessive: "Ana’s", age: 30, posterAge: "30", date: "12 SEP 2027 · 17:00" };
  const result = applyCardText(sample, { fields: { posterName: "Maya", posterAge: "32", time: "18:30" } }, (key, values) => `${values.name}’s`);
  assert.equal(result.name, "Maya");
  assert.equal(result.posterName, "Maya");
  assert.equal(result.namePossessive, "Maya’s");
  assert.equal(result.age, "32");
  assert.equal(result.posterAge, "32");
  assert.equal(result.date, "12 SEP 2027 · 18:30");
});

test("the invitation title follows a changed name until explicitly customized", () => {
  const sample = { title: "Mia’s Pizza Party", posterName: "Mia", date: "18 JULY 2027" };
  assert.equal(applyCardText(sample, { fields: { posterName: "Lily" } }, () => "").title, "Lily’s Pizza Party");
  assert.equal(applyCardText(sample, { fields: { posterName: "Lily", title: "A slice of summer" } }, () => "").title, "A slice of summer");
});

test("saved text rejects unsupported keys, malformed values and oversized wording", () => {
  const template = invitationTemplates[0];
  const sample = invitationSamples[template.slug];
  assert.deepEqual(normalizeCardText(null, template, sample), { fields: {}, translations: {} });
  assert.deepEqual(normalizeCardText({ fields: { title: {}, location: "x".repeat(121) }, translations: { "invitations.invited": "x".repeat(161) } }, template, sample), { fields: {}, translations: {} });
});

test("supporting card wording persists through the scoped allowlist without editing creator controls", () => {
  const template = invitationTemplates[0];
  const sample = invitationSamples[template.slug];
  const translations = Object.fromEntries(guestCardWordingKeys.map(key => [key, `Custom ${key}`]));
  const value = normalizeCardText({ translations: { ...translations, "guestCards.canvas.animations": "Invalid override" } }, template, sample);
  assert.deepEqual(value.translations, translations);
  assert.deepEqual(normalizeCardText(JSON.parse(JSON.stringify(value)), template, sample), value);
  assert.deepEqual(normalizeCardText({ translations: { "guestCards.when": "x".repeat(161), "guestCards.where": {} } }, template, sample).translations, {});
  const fields = getEditableCardFields(template, sample, translations, key => guestCardCopy.en[key] ?? key);
  const when = fields.find(field => field.key === "guestCards.when");
  assert.equal(when.value, translations[when.key]);
  assert.equal(when.labelText, "When");
  assert.equal(matchEditableCardText(when.value, fields)[0].key, when.key);
});

test("changing the date preserves its time and a deliberately cleared time stays cleared", () => {
  const sample = { date: "23 MAY 2027 · 17:00", location: "Tbilisi" };
  assert.equal(applyCardText(sample, { fields: { date: "24 MAY 2027" } }, () => "").date, "24 MAY 2027 · 17:00");
  assert.equal(applyCardText(sample, { fields: { date: "24 MAY 2027", time: "" } }, () => "").date, "24 MAY 2027");
  assert.equal(applyCardText(sample, { fields: { date: "24 MAY 2027 · 19:30" } }, () => "").date, "24 MAY 2027 · 19:30");
});

test("tap targets resolve split typography and compound details without matching decorations", () => {
  const template = invitationTemplates.find(item => item.slug === "wedding-sweet-snapshot");
  const sample = { ...invitationSamples[template.slug], title: "Maya & Luka", location: "Garden terrace" };
  const fields = getEditableCardFields(template, sample, {}, key => key === "cards.wedding.saveDate" ? "SAVE THE DATE" : key);
  assert.equal(matchEditableCardText("Maya\n&\nLuka", fields)[0].key, "title");
  assert.equal(matchEditableCardText("Maya", fields, true)[0].key, "title");
  assert.equal(matchEditableCardText("Save the date", fields)[0].group, "translations");
  assert.ok(matchEditableCardText(`${sample.date}\nGarden terrace`, fields).some(field => field.key === "location"));
  assert.deepEqual(matchEditableCardText("♡", fields, true), []);
  assert.deepEqual(matchEditableCardText("", fields), []);
});

test("an age embedded in turns wording exposes the age as well as the wording", () => {
  const template = invitationTemplates.find(item => item.slug === "birthday-little-pizza-chef");
  const sample = invitationSamples[template.slug];
  const fields = getEditableCardFields(template, sample, {}, key => key === "birthday.turns" ? "turns {age}" : key);
  const matched = matchEditableCardText(`${sample.posterName} turns ${sample.posterAge}`, fields);
  assert.ok(matched.some(field => field.key === "posterName"));
  assert.ok(matched.some(field => field.key === "posterAge"));
  assert.ok(matched.some(field => field.key === "birthday.turns"));
});
