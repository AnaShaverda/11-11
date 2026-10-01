import assert from "node:assert/strict";
import test from "node:test";
import { createDemoDraft, draftStorageKey, normalizeDraft, readDrafts } from "../src/events/data/eventDrafts.js";
import { invitationTemplates } from "../src/invitations/data/templates.js";
import { getThemePresentation } from "../src/themes/themePresentation.js";
import { createInteraction, defaultAccess } from "../src/modules/data/interactionDefinitions.js";
import { interactionCopy } from "../src/modules/data/interactionCopy.js";

const t = (key) => interactionCopy.en[key];
const retro = invitationTemplates.find((template) => template.slug === "birthday-retro-pop");

test("every invitation seeds a valid event with no interactions", () => {
  for (const template of invitationTemplates) {
    const draft = createDemoDraft(template);
    assert.equal(draft.event.themeId, template.themeId);
    assert.deepEqual(draft.event.interactions, []);
    assert.deepEqual(normalizeDraft(draft), draft);
  }
});

test("multiple instances, including the same type, keep independent config and access", () => {
  const draft = createDemoDraft(retro);
  draft.event.interactions = [createInteraction("photo-upload", t, "photos-1"), createInteraction("quiz", t, "quiz-1"), createInteraction("photo-upload", t, "photos-2")];
  draft.event.interactions[2].config.maxFiles = 5;
  draft.access.interactions = {
    "photos-1": { ...defaultAccess(), methods: ["direct-link", "qr-code"] },
    "quiz-1": { methods: ["guest-link", "direct-link"], delivery: { mode: "scheduled", date: "2027-10-17", time: "18:30", timeZone: "Asia/Tbilisi" } },
    "photos-2": defaultAccess(),
  };
  const restored = normalizeDraft(JSON.parse(JSON.stringify(draft)));
  assert.deepEqual(restored, draft);
  assert.equal(restored.event.interactions[0].config.maxFiles, 10);
  assert.equal(restored.event.interactions[2].config.maxFiles, 5);
});

test("an explicitly empty or disabled interaction selection survives storage", () => {
  const draft = createDemoDraft(retro);
  draft.event.interactions = [createInteraction("guest-book", t, "notes")];
  draft.event.interactions[0].enabled = false;
  const storage = { getItem: (key) => key === draftStorageKey ? JSON.stringify({ [draft.event.id]: draft }) : null };
  assert.equal(readDrafts(storage)[draft.event.id].event.interactions[0].enabled, false);
  draft.event.interactions = [];
  assert.deepEqual(readDrafts(storage)[draft.event.id].event.interactions, []);
});

test("corrupted browser storage and unsupported drafts cannot break rendering", () => {
  for (const data of ["{bad", "null", "[]", '"wrong"', '{"bad":{"event":{"themeId":"missing"}}}']) {
    assert.deepEqual(readDrafts({ getItem: () => data }), {});
  }
  assert.deepEqual(readDrafts({ getItem() { throw new Error("Blocked storage"); } }), {});
  const draft = createDemoDraft(retro);
  const photo = createInteraction("photo-upload", t, "photos");
  draft.event.interactions = [photo, photo, { ...photo, id: "unknown", type: "unsupported" }];
  photo.config.maxFiles = 999;
  draft.access.interactions.photos = { methods: ["direct-link", "direct-link", "invalid"], delivery: { mode: "scheduled", date: "bad", time: "90:00" } };
  const normalized = normalizeDraft(draft);
  assert.equal(normalized.event.interactions.length, 1);
  assert.equal(normalized.event.interactions[0].config.maxFiles, 20);
  assert.deepEqual(normalized.access.interactions.photos.methods, ["direct-link"]);
  assert.equal(normalized.access.interactions.photos.delivery.date, "");
  assert.equal(normalized.access.interactions.photos.delivery.time, "");
});

test("theme aliases reference the existing invitation design and asset records", () => {
  for (const template of invitationTemplates) {
    const presentation = getThemePresentation(template.themeId);
    assert.equal(presentation.template, template);
    assert.equal(presentation.style["--theme-bg"], template.design.palette[0]);
    assert.equal(presentation.style["--theme-ink"], template.design.palette[1]);
  }
  assert.equal(getThemePresentation("birthday-retro-disco").template.slug, "birthday-retro-pop");
  assert.equal(getThemePresentation("birthday-y2k-digital").template.slug, "birthday-y2k-party");
  assert.equal(getThemePresentation("wedding-modern-editorial").template.slug, "wedding-editorial");
  assert.equal(getThemePresentation("missing"), null);
});

test("interaction controls have matching English and Georgian translation keys", () => {
  assert.deepEqual(Object.keys(interactionCopy.en).sort(), Object.keys(interactionCopy.ka).sort());
  for (const copy of Object.values(interactionCopy)) assert.ok(Object.values(copy).every((value) => typeof value === "string" && value.length));
});
