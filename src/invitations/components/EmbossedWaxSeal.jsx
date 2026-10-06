const placeholderTitles = new Set(["our wedding", "your celebration", "wedding", "ჩვენი ქორწილი", "თქვენი დღესასწაული"]);
const eventWords = new Set(["our", "your", "wedding", "invitation", "celebration", "ჩვენი", "ქორწილი", "მოსაწვევი", "დღესასწაული"]);

export function normalizeWaxInitial(value) {
  const initial = typeof value === "string" ? value.match(/\p{L}/u)?.[0] ?? "" : "";
  return /\p{Script=Georgian}/u.test(initial) ? initial : initial.toLocaleUpperCase();
}

export function getWaxInitials(title) {
  if (typeof title !== "string" || placeholderTitles.has(title.trim().toLocaleLowerCase())) return ["", ""];
  const parts = title.split(/(?:\s*(?:&|\+|\/|,|\band\b)\s*|\s+და\s+)/iu).map(part => part.trim()).filter(Boolean);
  const names = parts.length > 1 ? parts : (title.match(/[\p{L}]+/gu) ?? []).filter(word => !eventWords.has(word.toLocaleLowerCase()));
  return [normalizeWaxInitial(names[0]), normalizeWaxInitial(names[1])];
}

export function getWaxMonogram(title, initials) {
  const suggested = getWaxInitials(title);
  const first = normalizeWaxInitial(initials?.first) || suggested[0];
  const second = normalizeWaxInitial(initials?.second) || suggested[1];
  return [first, second].filter(Boolean).join("&");
}

export default function EmbossedWaxSeal({ className, title, initials }) {
  const monogram = getWaxMonogram(title, initials);
  return <span className={className} aria-hidden="true">
    {monogram && <span className={`wax-monogram${/\p{Script=Georgian}/u.test(monogram) ? " is-georgian" : ""}${monogram.includes("&") ? " is-pair" : ""}`}>{monogram}</span>}
  </span>;
}
