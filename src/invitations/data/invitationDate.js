const georgianMonths = ["იანვარი", "თებერვალი", "მარტი", "აპრილი", "მაისი", "ივნისი", "ივლისი", "აგვისტო", "სექტემბერი", "ოქტომბერი", "ნოემბერი", "დეკემბერი"];

export function formatInvitationDate(value, language) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value ?? "")) return "";
  const date = new Date(`${value}T12:00:00Z`);
  if (Number.isNaN(date.getTime())) return "";
  // Georgian is not supported by Intl in every browser; use explicit month names.
  if (language === "ka") return `${date.getUTCDate()} ${georgianMonths[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(date);
}

export function normalizeRsvpDeadline(value) {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return "";
  const date = new Date(`${value}T12:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value ? value : "";
}

export function formatRsvpDeadline(value, language) {
  const validDate = normalizeRsvpDeadline(value);
  if (!validDate) return "";
  const date = new Date(`${validDate}T12:00:00Z`);
  if (language === "ka") {
    const months = ["იანვრამდე", "თებერვლამდე", "მარტამდე", "აპრილამდე", "მაისამდე", "ივნისამდე", "ივლისამდე", "აგვისტომდე", "სექტემბრამდე", "ოქტომბრამდე", "ნოემბრამდე", "დეკემბრამდე"];
    return `გთხოვთ, დასწრება დაადასტუროთ ${date.getUTCDate()} ${months[date.getUTCMonth()]}.`;
  }
  const label = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", timeZone: "UTC" }).format(date);
  return `Please confirm your attendance by ${label}.`;
}
