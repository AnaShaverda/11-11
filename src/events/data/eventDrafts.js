import { invitationTemplates } from "../../invitations/data/templates.js";
import { invitationSamples } from "../../invitations/data/invitationSamples.js";
import { themeDemoEvents } from "../../themes/data/demoEvents.js";
import { accessMethods, defaultAccess, interactionDefinitions } from "../../modules/data/interactionDefinitions.js";

export const draftStorageKey = "1111-event-drafts:v1";

/**
 * Event: common facts + one invitation + ordered interaction instances.
 * Draft: { event, access: { invitation, interactions: { [instanceId]: Access } } }.
 * Access: independent link methods and delivery configuration; no tokens or URLs.
 * Guest contributions/files live only in component state, never in this draft.
 */
export function createDemoDraft(template) {
  const sample = invitationSamples[template.slug];
  const demo = themeDemoEvents[template.themeId] ?? themeDemoEvents[template.category.toLowerCase()];
  const name = sample.name ?? sample.posterName?.replace(/[’']s$/, "") ?? sample.title.split(/[’']/)[0];
  const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  const [day, month] = sample.date.split(" ");
  const date = months.includes(month) ? `2027-${String(months.indexOf(month) + 1).padStart(2, "0")}-${day.padStart(2, "0")}` : demo.dateISO.slice(0, 10);
  return {
    event: { id: `demo-${template.themeId}`, themeId: template.themeId, category: template.category.toLowerCase(), title: sample.title, hostName: name, age: String(sample.age ?? sample.posterAge ?? ""), date, time: sample.time ?? demo.time, timeZone: "Asia/Tbilisi", location: sample.location, invitation: { message: sample.line }, interactions: [] },
    access: { invitation: defaultAccess(), interactions: {} },
  };
}

export function getDemoDraft(eventId) {
  const template = invitationTemplates.find((item) => `demo-${item.themeId}` === eventId);
  return template ? createDemoDraft(template) : null;
}

const isRecord = (value) => value && typeof value === "object" && !Array.isArray(value);
const text = (value, max = 600) => typeof value === "string" ? value.slice(0, max) : "";
const validDate = (value) => /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(value));
const validTime = (value) => /^([01]\d|2[0-3]):[0-5]\d$/.test(value);

function normalizeAccess(value) {
  const delivery = value?.delivery;
  return { methods: [...new Set(Array.isArray(value?.methods) ? value.methods.filter((method) => accessMethods.includes(method)) : ["direct-link"])], delivery: { mode: delivery?.mode === "scheduled" ? "scheduled" : "now", date: validDate(delivery?.date) ? delivery.date : "", time: validTime(delivery?.time) ? delivery.time : "", timeZone: "Asia/Tbilisi" } };
}

// Treat stored browser data as untrusted. Invalid drafts return to their demo seed.
export function normalizeDraft(value) {
  if (!isRecord(value?.event)) return null;
  const source = value.event;
  const template = invitationTemplates.find((item) => item.themeId === source.themeId);
  if (!template || source.id !== `demo-${template.themeId}`) return null;
  const seed = createDemoDraft(template);
  const seen = new Set();
  const interactions = (Array.isArray(source.interactions) ? source.interactions : []).slice(0, 12).flatMap((module) => {
    if (!isRecord(module) || !Object.hasOwn(interactionDefinitions, module.type) || typeof module.id !== "string" || !/^[\w-]{1,80}$/.test(module.id) || seen.has(module.id)) return [];
    seen.add(module.id);
    let config = {};
    if (module.type === "photo-upload") config = { maxFiles: Math.min(20, Math.max(1, Math.floor(Number(module.config?.maxFiles) || 10))) };
    if (module.type === "quiz") {
      const questions = (Array.isArray(module.config?.questions) ? module.config.questions : []).slice(0, 3).map((question, index) => ({
        id: `q${index + 1}`, question: text(question?.question, 180),
        options: [0, 1, 2].map((option) => text(question?.options?.[option], 100)),
        correctAnswer: [0, 1, 2].includes(question?.correctAnswer) ? question.correctAnswer : 0,
      }));
      config = { questions };
    }
    return [{ id: module.id, type: module.type, enabled: module.enabled !== false, title: text(module.title, 100), description: text(module.description, 240), config }];
  });
  return {
    event: { ...seed.event, title: text(source.title, 100), hostName: text(source.hostName, 60), age: text(source.age, 3), date: validDate(source.date) ? source.date : seed.event.date, time: validTime(source.time) ? source.time : seed.event.time, location: text(source.location, 100), invitation: { message: text(source.invitation?.message, 240) }, interactions },
    access: { invitation: normalizeAccess(value.access?.invitation), interactions: Object.fromEntries(interactions.map((module) => [module.id, normalizeAccess(value.access?.interactions?.[module.id])])) },
  };
}

export function readDrafts(storage) {
  try {
    const stored = JSON.parse(storage.getItem(draftStorageKey));
    if (!isRecord(stored)) return {};
    return Object.fromEntries(Object.values(stored).slice(0, 38).map(normalizeDraft).filter(Boolean).map((draft) => [draft.event.id, draft]));
  } catch { return {}; }
}
