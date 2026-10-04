export const MAX_GUEST_NOTE_LENGTH = 500;
export const MAX_NOTE_PROMPT_LENGTH = 160;
export const guestNotePresets = ["wish", "memory", "advice", "custom"];

export function normalizeGuestNoteSettings(value) {
  return {
    enabled: value?.enabled === true,
    preset: guestNotePresets.includes(value?.preset) ? value.preset : "wish",
    prompt: typeof value?.prompt === "string" && value.prompt.length <= MAX_NOTE_PROMPT_LENGTH ? value.prompt : "",
  };
}

export function getGuestNotePrompt(settings, t) {
  return settings.preset === "custom" && settings.prompt.trim()
    ? settings.prompt.trim() : t(`guestCards.notes.prompt.${settings.preset === "custom" ? "wish" : settings.preset}`);
}
