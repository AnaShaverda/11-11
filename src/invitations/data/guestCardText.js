import { getGuestEventDetails } from "./guestCardDesign.js";

const limits = { title: 120, name: 80, posterName: 80, namePossessive: 90, headline: 120, opening: 120, line: 200, date: 80, time: 20, location: 120, mark: 12, age: 12, posterAge: 12, posterOccasion: 80, details: 240 };
const extra = (key, label, values) => ({ key, label, values, maxLength: 160 });

function getArtworkExtraCopyFields(template, sample) {
  const assets = template.visualAssets ?? {};
  const age = sample.posterAge ?? sample.age;
  const ageLine = extra("birthday.turns", "ageLine", { age });
  if (assets.selectedBridal) return [];
  if (assets.paintedCocktail) return template.subcategory === "bridal-party" ? [] : [ageLine];
  if (assets.comicBirthday) return [ageLine, extra("comicBirthday.turns", "ageWord")];
  if (assets.pizzaChef || assets.paintedPool) return [ageLine];
  if (assets.lineArt) return sample.opening === undefined ? [extra("invitations.invited", "opening")] : [];
  if (assets.christeningCard) return [extra("cards.christening.opening", "opening"), extra("cards.christening.title", "occasion"), extra("cards.christening.closing", "closing")];
  if (assets.retroBridal) return [extra("cards.bridal.opening", "opening"), extra("cards.bridal.title", "occasion"), extra("cards.party", "occasionSecond")];
  if (["cherry-toast", "little-yes", "blush-lift"].includes(template.visual)) return [extra(template.visual === "little-yes" ? "cards.engagement.opening" : "cards.bridal.toast", "opening")];
  if (template.subcategory === "gender-reveal") {
    const variant = ["bear-hug", "up-in-the-air", "special-delivery", "little-wonder", "pink-or-blue"].includes(template.visual) ? template.visual : "default";
    return [extra(`cards.reveal.${variant}`, "headline"), extra("cards.reveal.invited", "opening"), extra("cards.reveal.closing", "closing")];
  }
  if (template.category === "Wedding") return [extra("cards.wedding.saveDate", "opening"), ...(["wedding-day-notes", "date-and-dinner", "colorful-company"].includes(template.visual) ? [0, 1, 2, 3].map(index => extra(`cards.wedding.step.${index}`, `step${index + 1}`)) : [])];
  if (template.visual === "cobalt-cheers") return [extra("cards.social.title.0", "occasion"), extra("cards.social.title.1", "occasionSecond"), extra("cards.social.menu", "menu"), extra("cards.social.wear", "dressCode"), extra("cards.social.time", "timeLabel"), extra("cards.social.where", "locationLabel")];
  return [extra("invitations.invited", "opening"), ...(template.slug === "birthday-y2k-party" ? [extra("cards.y2k", "occasion"), extra("cards.party", "occasionSecond")] : !assets.coverImage ? [extra("invitations.invites", "closing")] : [])];
}

export const guestCardWordingKeys = [
  "guestCards.when", "guestCards.where", "guestCards.plan.title", "guestCards.gallery.title",
  "guestCards.rsvp.title", "guestCards.rsvp.question", "guestCards.fullName", "guestCards.going",
  "guestCards.declined", "guestCards.comingWith", "guestCards.confirm", "guestCards.map",
];

export function getCardExtraCopyFields(template, sample) {
  return [...getArtworkExtraCopyFields(template, sample), ...guestCardWordingKeys.map(key => ({ key, label: "heading", labelKey: key, maxLength: 160 }))];
}

export function getCardTextFields(template, sample) {
  const details = getGuestEventDetails(template, sample);
  const fields = Object.keys(sample).filter(key => key in limits && !(key === "name" && sample.posterName !== undefined) && !(key === "age" && sample.posterAge !== undefined));
  if (!fields.includes("time")) fields.splice(fields.indexOf("date") + 1, 0, "time");
  return fields.map(key => ({ key, label: key, maxLength: limits[key], multiline: ["headline", "line", "details"].includes(key), value: String(key === "date" ? details.date : sample[key] ?? (key === "time" ? details.time ?? "" : "")) }));
}

export function normalizeCardText(value, template, sample) {
  const fields = getCardTextFields(template, sample);
  const translations = getCardExtraCopyFields(template, sample);
  const read = (source, options) => Object.fromEntries(options.flatMap(field => {
    const text = source?.[field.key];
    return typeof text === "string" && text.length <= field.maxLength ? [[field.key, text]] : [];
  }));
  return { fields: read(value?.fields, fields), translations: read(value?.translations, translations) };
}

export function applyCardText(sample, edits, t) {
  const result = { ...sample, ...edits.fields };
  const nameKey = sample.posterName !== undefined ? "posterName" : "name";
  if (Object.hasOwn(edits.fields, nameKey)) {
    if (sample.name !== undefined) result.name = edits.fields[nameKey];
    if (sample.posterName !== undefined) result.posterName = edits.fields[nameKey];
    if (sample.namePossessive !== undefined && !Object.hasOwn(edits.fields, "namePossessive")) result.namePossessive = t("cards.possessive", { name: edits.fields[nameKey] });
    if (sample.title && sample[nameKey] && !Object.hasOwn(edits.fields, "title")) {
      result.title = sample.title.split(String(sample[nameKey])).join(edits.fields[nameKey]);
    }
  }
  const ageKey = sample.posterAge !== undefined ? "posterAge" : "age";
  if (Object.hasOwn(edits.fields, ageKey)) {
    if (sample.age !== undefined) result.age = edits.fields[ageKey];
    if (sample.posterAge !== undefined) result.posterAge = edits.fields[ageKey];
  }
  const changedDate = Object.hasOwn(edits.fields, "date");
  const changedTime = Object.hasOwn(edits.fields, "time");
  if ((changedDate || changedTime) && (sample.date.includes("·") || sample.time === undefined)) {
    const time = changedTime ? edits.fields.time : (changedDate && edits.fields.date.includes("·") ? edits.fields.date.split("·")[1].trim() : sample.date.split("·")[1]?.trim() ?? "");
    result.date = `${result.date.split("·")[0].trim()}${time ? ` · ${time}` : ""}`;
  }
  return result;
}

export function getEditableCardFields(template, sample, translations, t) {
  const fields = getCardTextFields(template, sample).map(field => ({ ...field, group: "fields", aliases: [field.value] }));
  const assets = template.visualAssets ?? {};
  const titleIsMetadata = sample.headline !== undefined || assets.christeningCard || assets.retroBridal
    || ["cobalt-cheers"].includes(template.visual)
    || ["birthday-y2k-party", "birthday-retro-pop"].includes(template.slug)
    || (assets.photoCard && !assets.coverImage);
  const title = fields.find(field => field.key === "title");
  if (titleIsMetadata && title) title.aliases = [];
  // These poster families do not render the sample's generic message.
  if (assets.pizzaChef || assets.paintedPool || assets.paintedCocktail || assets.comicBirthday && template.visual !== "retro-sport") {
    const message = fields.find(field => field.key === "line");
    if (message) message.aliases = [];
  }
  const name = fields.find(field => field.key === "posterName" || field.key === "name");
  if (name && (sample.namePossessive === undefined || sample.namePossessive === t("cards.possessive", { name: name.value }))) name.aliases.push(t("cards.possessive", { name: name.value }));
  for (const field of getCardExtraCopyFields(template, sample)) {
    const value = translations[field.key] ?? t(field.key);
    fields.push({ ...field, labelText: field.labelKey ? t(field.labelKey) : undefined, group: "translations", value, relatedKeys: field.values?.age === undefined ? [] : [sample.posterAge === undefined ? "age" : "posterAge"], aliases: [value.replace(/\{(\w+)\}/g, (match, name) => String(field.values?.[name] ?? match))] });
  }
  return fields;
}

const compactText = value => String(value).normalize("NFKC").toLocaleLowerCase().replace(/[’‘`]/g, "'").replace(/\s+/g, "");

export function isExactCardText(text, field) {
  return field.aliases.some(alias => compactText(alias) === compactText(text));
}

// Resolve visible text to its data field, including names split over several lines.
export function matchEditableCardText(text, fields, partial = false) {
  const withRelated = matches => {
    const keys = matches.flatMap(field => field.relatedKeys ?? []);
    return [...matches, ...fields.filter(field => field.group === "fields" && keys.includes(field.key) && !matches.includes(field))];
  };
  const value = compactText(text);
  if (!value) return [];
  const exact = fields.filter(field => isExactCardText(text, field));
  if (exact.length) return withRelated([exact[0]]);
  const contained = fields.filter(field => field.aliases.some(alias => {
    const candidate = compactText(alias);
    return candidate.length >= 3 && value.includes(candidate);
  }));
  if (contained.length) return withRelated(contained.slice(0, 4));
  if (!partial || value.length < 3) return [];
  const fragments = fields.filter(field => field.aliases.some(alias => compactText(alias).includes(value)));
  const heading = fragments.find(field => field.group === "fields" && field.key === "headline");
  if (heading) return [heading];
  return fragments.length === 1 ? fragments : [];
}
