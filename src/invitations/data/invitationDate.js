import { captionValue } from "../../localization/captionValues.js";
const georgianMonths = ["dates.month.1","dates.month.2","dates.month.3","dates.month.4","dates.month.5","dates.month.6","dates.month.7","dates.month.8","dates.month.9","dates.month.10","dates.month.11","dates.month.12"];

export function formatInvitationDate(value, language) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value ?? "")) return "";
  const date = new Date(`${value}T12:00:00Z`);
  if (Number.isNaN(date.getTime())) return "";
  // Georgian is not supported by Intl in every browser; use explicit month names.
  if (language === "ka") return `${date.getUTCDate()} ${captionValue(georgianMonths[date.getUTCMonth()], language)} ${date.getUTCFullYear()}`;
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
    const months = ["dates.deadlineMonth.1","dates.deadlineMonth.2","dates.deadlineMonth.3","dates.deadlineMonth.4","dates.deadlineMonth.5","dates.deadlineMonth.6","dates.deadlineMonth.7","dates.deadlineMonth.8","dates.deadlineMonth.9","dates.deadlineMonth.10","dates.deadlineMonth.11","dates.deadlineMonth.12"];
    return captionValue("dates.rsvpDeadline", language, { date: `${date.getUTCDate()} ${captionValue(months[date.getUTCMonth()], language)}` });
  }
  const label = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", timeZone: "UTC" }).format(date);
  return captionValue("dates.rsvpDeadline", language, { date: label });
}
