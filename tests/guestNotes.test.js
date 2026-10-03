import test from "node:test";
import assert from "node:assert/strict";
import { normalizeGuestNoteSettings, getGuestNotePrompt, MAX_NOTE_PROMPT_LENGTH, MAX_GUEST_NOTE_LENGTH } from "../src/invitations/data/guestNotes.js";
import { normalizeGuestReply } from "../src/invitations/data/guestCardDesign.js";
import { guestCardCopy } from "../src/localization/guestCardCopy.js";

test("guest notes are off by default and creator prompts tolerate corrupt saved settings", () => {
  assert.deepEqual(normalizeGuestNoteSettings(null), { enabled: false, preset: "wish", prompt: "" });
  assert.deepEqual(normalizeGuestNoteSettings({ enabled: "yes", preset: "bad", prompt: 4 }), { enabled: false, preset: "wish", prompt: "" });
  assert.equal(normalizeGuestNoteSettings({ prompt: "x".repeat(MAX_NOTE_PROMPT_LENGTH + 1) }).prompt, "");
});

test("creators can choose a translated suggestion or a custom question without losing spaces while editing", () => {
  for (const language of ["en", "ka"]) {
    const t = key => guestCardCopy[language][key];
    for (const preset of ["wish", "memory", "advice"]) assert.ok(getGuestNotePrompt({ preset }, t));
    assert.equal(getGuestNotePrompt({ preset: "custom", prompt: "  How did we meet?  " }, t), "How did we meet?");
    assert.equal(getGuestNotePrompt({ preset: "custom", prompt: " " }, t), t("guestCards.notes.prompt.wish"));
  }
  assert.equal(normalizeGuestNoteSettings({ prompt: "A wish " }).prompt, "A wish ");
});

test("optional notes survive reply storage and invalid messages cannot restore a reply", () => {
  const reply = { attendance: "going", fullName: "Maya Beridze", companions: 0 };
  const note = "გისურვებთ ბედნიერ დღეს!\nSee you soon.";
  assert.equal(normalizeGuestReply({ ...reply, note: `  ${note}  ` }, 1).note, note);
  assert.equal(Object.hasOwn(normalizeGuestReply({ ...reply, note: " " }, 1), "note"), false);
  assert.equal(normalizeGuestReply({ ...reply, note: {} }, 1), null);
  assert.equal(normalizeGuestReply({ ...reply, note: "x".repeat(MAX_GUEST_NOTE_LENGTH + 1) }, 1), null);
});
