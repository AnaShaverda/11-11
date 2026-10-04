import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { invitationTemplates } from "../src/invitations/data/templates.js";
import { invitationSamples } from "../src/invitations/data/invitationSamples.js";
import { getGuestCardDesign, getGuestEventDetails, getGuestGallery, getReplySeats, normalizeGuestSettings, normalizeGuestReply, guestPreviewDefaults, entranceStyles, motionStyles, MAX_GUEST_NAME_LENGTH, colorContrast } from "../src/invitations/data/guestCardDesign.js";
import { guestCardCopy } from "../src/localization/guestCardCopy.js";

test("all invitation designs supply readable guest cards and saved artwork without mutating source data", () => {
  const before = JSON.stringify(invitationTemplates);
  for (const template of invitationTemplates) {
    const design = getGuestCardDesign(template);
    assert.ok(colorContrast(design.paper, design.ink) >= 4.5, template.slug);
    assert.ok(colorContrast(design.paper, design.errorInk) >= 4.5, `${template.slug}: validation text`);
    assert.ok(colorContrast(design.supportPaper, "#000000") >= 17, `${template.slug}: pale supporting paper`);
    assert.ok(colorContrast(design.supportPaper, design.supportInk) >= 4.5, `${template.slug}: dark supporting text`);
    assert.ok(colorContrast(design.supportPaper, design.supportErrorInk) >= 4.5, `${template.slug}: supporting validation text`);
    for (const image of [design.background, design.frame, ...design.ornaments].filter(Boolean)) {
      assert.ok(fs.existsSync(new URL(`../public${image}`, import.meta.url)), `${template.slug}: ${image}`);
    }
    const details = getGuestEventDetails(template, invitationSamples[template.slug]);
    assert.ok(details.date && details.location, template.slug);
    assert.equal(details.date.includes("·"), false, template.slug);
  }
  assert.equal(JSON.stringify(invitationTemplates), before);
});

test("event galleries select occasion-appropriate photos with both languages", () => {
  assert.deepEqual(Object.keys(guestCardCopy.en).sort(), Object.keys(guestCardCopy.ka).sort());
  for (const template of invitationTemplates) {
    const photos = getGuestGallery(template);
    assert.equal(photos.length, 3);
    assert.equal(new Set(photos.map(photo => photo.id)).size, 3);
    for (const photo of photos) {
      assert.ok(guestCardCopy.en[photo.captionKey]);
      assert.ok(guestCardCopy.ka[photo.captionKey]);
      assert.ok(fs.existsSync(new URL(`../public${photo.src}`, import.meta.url)));
      assert.ok(photo.row >= 0 && photo.row <= 3 && photo.column >= 0 && photo.column <= 2);
    }
  }
  const bridal = invitationTemplates.find(template => template.subcategory === "bridal-party");
  assert.equal(getGuestGallery(bridal)[0].row, 2);
  const christening = invitationTemplates.find(template => template.subcategory === "christening");
  assert.equal(getGuestGallery(christening)[0].row, 3);
});

test("supporting cards reserve bow frames and crowded floral frames for the main invitation", () => {
  for (const slug of ["birthday-ribbon-sketch", "birthday-ribbon-social", "bridal-doll-pink-card", "bridal-modern-pink-line-card", "bridal-pink-cocktail-card", "christening-olive-full-frame", "christening-blue-full-frame"]) {
    const template = invitationTemplates.find(item => item.slug === slug);
    const design = getGuestCardDesign(template);
    assert.equal(design.frame, undefined, slug);
    assert.ok(design.ornaments.every(image => !/ribbon|bow|frame|border/.test(image)), slug);
  }
  assert.ok(getGuestCardDesign(invitationTemplates.find(item => item.slug === "birthday-white-and-blue")).frame);
});

test("companion limits constrain attendance totals and declines never reserve seats", () => {
  assert.equal(getReplySeats("going", 0, 5), 1);
  assert.equal(getReplySeats("going", 3, 5), 4);
  assert.equal(getReplySeats("going", 9, 1), 2);
  assert.equal(getReplySeats("going", -1, 1), 1);
  assert.equal(getReplySeats("going", 4, 0), 1);
  assert.equal(getReplySeats("declined", 5, 5), 0);
});

test("saved preview preferences tolerate corrupt storage and reject unrecognized animation settings", () => {
  assert.deepEqual(normalizeGuestSettings(null), guestPreviewDefaults);
  assert.deepEqual(normalizeGuestSettings({ gallery: "yes", motion: "bad", format: "invalid", companions: 500 }), { ...guestPreviewDefaults, companions: 5 });
  assert.equal(normalizeGuestSettings({ companions: -3 }).companions, 0);
  assert.equal(normalizeGuestSettings({ companions: 1.5 }).companions, 1);
  assert.deepEqual(normalizeGuestSettings({ openingEffect: "bad", openingIntensity: 10, openingDuration: 999, openingPalette: "bad" }), guestPreviewDefaults);
  assert.deepEqual(normalizeGuestSettings({ openingEffect: "confetti", openingIntensity: "celebration", openingDuration: 8, openingPalette: "gold" }), { ...guestPreviewDefaults, openingEffect: "confetti", openingIntensity: "celebration", openingDuration: 8, openingPalette: "gold" });
  assert.equal(normalizeGuestSettings({ openingEffect: "hearts" }).openingEffect, "hearts");
  assert.equal(normalizeGuestSettings({ envelope: false }).envelope, false);
  assert.equal(normalizeGuestSettings({ envelope: "invalid" }).envelope, true);
  assert.equal(normalizeGuestSettings({ openingSpeed: "invalid" }).openingSpeed, "slow");
  assert.equal(normalizeGuestSettings({ openingSpeed: "dreamy", openingDuration: 12 }).openingSpeed, "dreamy");
  assert.equal(normalizeGuestSettings({ openingSpeed: "dreamy", openingDuration: 12 }).openingDuration, 12);
});

test("full names retain compound and international names without guessing first or last parts", () => {
  for (const name of ["მაია ბერიძე", "María del Carmen O’Neill", "Jean-Luc van der Meer", "李小龍", "A"]) {
    assert.deepEqual(normalizeGuestReply({ attendance: "going", fullName: `  ${name}  `, companions: 1 }, 3), {
      attendance: "going", fullName: name, companions: 1,
    });
  }
  assert.equal(normalizeGuestReply({ attendance: "declined", fullName: "Maya Beridze", companions: 1 }, 3).companions, 0);
});

test("entrance migration preserves legacy choices and gives valid new preferences precedence", () => {
  assert.equal(guestPreviewDefaults.entrance, "envelope");
  for (const legacy of [{}, { envelope: true }, { envelope: null }, { envelope: "false" }]) {
    assert.equal(normalizeGuestSettings(legacy).entrance, "envelope");
  }
  assert.equal(normalizeGuestSettings({ envelope: false }).entrance, "immediate");
  assert.equal(normalizeGuestSettings({ entrance: "unknown", envelope: false }).entrance, "immediate");
  assert.equal(normalizeGuestSettings({ entrance: {}, envelope: true }).entrance, "envelope");
  for (const entrance of entranceStyles) {
    const next = normalizeGuestSettings({ entrance, envelope: entrance !== "envelope", motion: "elegant", gallery: true, companions: 3, openingEffect: "hearts" });
    assert.equal(next.entrance, entrance);
    assert.equal(next.envelope, entrance === "envelope");
    assert.equal(next.motion, "elegant");
    assert.equal(next.gallery, true);
    assert.equal(next.companions, 3);
    assert.equal(next.openingEffect, "hearts");
    assert.deepEqual(normalizeGuestSettings(JSON.parse(JSON.stringify(next))), next);
  }
  for (const motion of motionStyles) assert.equal(normalizeGuestSettings({ motion }).motion, motion);
});

test("canvas sections preserve legacy visibility and round-trip deliberate removals", () => {
  for (const record of [{}, { envelope: false }, { details: "false", rsvp: null }]) {
    const settings = normalizeGuestSettings(record);
    assert.equal(settings.details, true);
    assert.equal(settings.rsvp, true);
  }
  const removed = normalizeGuestSettings({ details: false, rsvp: false, gallery: true, entrance: "doors", openingEffect: "hearts" });
  assert.equal(removed.details, false);
  assert.equal(removed.rsvp, false);
  assert.deepEqual(normalizeGuestSettings(JSON.parse(JSON.stringify(removed))), removed);
});

test("saved two-field replies migrate to a full name without changing attendance or headcount", () => {
  assert.deepEqual(normalizeGuestReply({ attendance: "going", firstName: "  María del Carmen ", lastName: " O’Neill  ", companions: 2 }, 3), {
    attendance: "going", fullName: "María del Carmen O’Neill", companions: 2,
  });
  assert.equal(normalizeGuestReply({ attendance: "going", firstName: "Maya", lastName: " ", companions: 0 }, 1), null);
});

test("malformed saved names or seat counts cannot restore a confirmed reply", () => {
  const reply = { attendance: "going", fullName: "Maya Beridze", companions: 1 };
  for (const value of [null, {}, { ...reply, fullName: "   " }, { ...reply, fullName: 42 },
    { ...reply, fullName: "a".repeat(MAX_GUEST_NAME_LENGTH + 1) }, { ...reply, companions: 2 },
    { ...reply, companions: -1 }, { ...reply, companions: 0.5 }, { ...reply, attendance: "unknown" },
    { ...reply, fullName: "", firstName: "Maya", lastName: "Beridze" }]) {
    assert.equal(normalizeGuestReply(value, 1), null);
  }
});
