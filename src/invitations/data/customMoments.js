const presets = {
  wedding: [
    ["ceremony", "Ceremony", "ჯვრისწერა"], ["photos", "Photo session", "ფოტოსესია"],
    ["civil", "Civil ceremony", "ხელმოწერა"], ["reception", "Guest reception", "სტუმრების მიღება"],
    ["dinner", "Celebration dinner", "საზეიმო ვახშამი"], ["cake", "Cake cutting", "ტორტის გაჭრა"],
  ],
  birthday: [["welcome", "Welcome", "სტუმრების მიღება"], ["party", "Birthday party", "დაბადების დღის წვეულება"], ["cake", "Cake", "ტორტი"], ["dance", "Dancing", "ცეკვა"]],
  "baby-kids": [["welcome", "Welcome", "სტუმრების მიღება"], ["activity", "Activities", "აქტივობები"], ["cake", "Cake", "ტორტი"]],
  "pre-wedding": [["welcome", "Welcome", "სტუმრების მიღება"], ["dinner", "Dinner", "ვახშამი"], ["party", "Party", "წვეულება"]],
  parties: [["welcome", "Welcome", "სტუმრების მიღება"], ["party", "Party", "წვეულება"], ["dinner", "Dinner", "ვახშამი"], ["dance", "Dancing", "ცეკვა"]],
  gifts: [["surprise", "Surprise", "სიურპრიზი"], ["gathering", "Gathering", "შეხვედრა"]],
  corporate: [["welcome", "Welcome", "სტუმრების მიღება"], ["presentation", "Presentation", "პრეზენტაცია"], ["dinner", "Dinner", "ვახშამი"], ["networking", "Networking", "ნეთვორქინგი"]],
};

export function getMomentPresets(category) { return presets[category] ?? presets.parties; }

export function defaultMoments(category) {
  const list = getMomentPresets(category);
  const selected = category === "wedding" ? [list[0], list[4]] : [list[0]];
  return selected.map(([id, en, ka]) => ({ id, en, ka, time: "", unknownTime: false, venue: "", mapUrl: "" }));
}

export function normalizeMoments(value, category) {
  if (!Array.isArray(value)) return defaultMoments(category);
  return value.slice(0, 12).filter(item => item && typeof item.id === "string").map(item => ({
    id: item.id.slice(0, 80), en: String(item.en ?? "").slice(0, 100), ka: String(item.ka ?? "").slice(0, 100),
    time: /^([01]\d|2[0-3]):[0-5]\d$/.test(item.time) ? item.time : "",
    unknownTime: Boolean(item.unknownTime), venue: String(item.venue ?? "").slice(0, 160),
    mapUrl: /^https?:\/\//i.test(item.mapUrl) ? String(item.mapUrl).slice(0, 1000) : "",
  }));
}

export function momentMapUrl(moment, city = "") {
  if (/^https?:\/\//i.test(moment.mapUrl)) return moment.mapUrl;
  const query = [moment.venue, city].filter(Boolean).join(", ");
  return query ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}` : "";
}
