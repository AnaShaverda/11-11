import { toDateInputValue } from './editorFields.js';

export const eventTimeZones = Array.from(new Set(['Asia/Tbilisi', ...(Intl.supportedValuesOf?.('timeZone') ?? ['UTC', 'Europe/London', 'Europe/Paris', 'America/New_York', 'America/Los_Angeles', 'Asia/Dubai', 'Asia/Tokyo'])]));

export function getCalendarEvent(details, timeZone = 'Asia/Tbilisi') {
  const date = toDateInputValue(details.date ?? '');
  if (!date) return null;
  const rawTime = (details.time ?? '').trim();
  const match = rawTime.match(/^(\d{1,2}):([0-5]\d)(?:\s*(AM|PM))?$/i);
  if (rawTime && !match) return null;
  let hour = match ? Number(match[1]) : 0;
  if (match?.[3]) { if (hour < 1 || hour > 12) return null; hour = hour % 12 + (/pm/i.test(match[3]) ? 12 : 0); }
  if (hour > 23) return null;
  const wallTime = Date.parse(`${date}T${String(hour).padStart(2, '0')}:${match?.[2] ?? '00'}:00Z`);
  const formatter = new Intl.DateTimeFormat('en-CA', { timeZone, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23' });
  let instant = wallTime;
  for (let i = 0; i < 3; i++) {
    const parts = Object.fromEntries(formatter.formatToParts(instant).map(p => [p.type, p.value]));
    const represented = Date.parse(`${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}:${parts.second}Z`);
    const difference = wallTime - represented;
    instant += difference;
    if (!difference) break;
    if (i === 2) return null;
  }
  return { date, instant, allDay: !match, timeZone };
}

export function getCountdown(instant, now) {
  const seconds = Math.max(0, Math.floor((instant - now) / 1000));
  return { days: Math.floor(seconds / 86400), hours: Math.floor(seconds / 3600) % 24, minutes: Math.floor(seconds / 60) % 60, seconds: seconds % 60 };
}
const stamp = value => new Date(value).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
const escapeText = value => String(value ?? '').replace(/\\/g, '\\\\').replace(/\r?\n/g, '\\n').replace(/[,;]/g, '\\$&');
function fold(line) {
  let result = '', bytes = 0;
  for (const character of line) {
    const size = new TextEncoder().encode(character).length;
    if (bytes + size > 75) { result += '\r\n '; bytes = 1; }
    result += character; bytes += size;
  }
  return result;
}
export function createCalendarFile(event, { title, location, url, uid }, now = Date.now()) {
  return ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//11:11//Invitation//EN', 'CALSCALE:GREGORIAN', 'BEGIN:VEVENT',
    `UID:${escapeText(uid)}`, `DTSTAMP:${stamp(now)}`,
    event.allDay ? `DTSTART;VALUE=DATE:${event.date.replaceAll('-', '')}` : `DTSTART:${stamp(event.instant)}`,
    `SUMMARY:${escapeText(title)}`, `LOCATION:${escapeText(location)}`, `DESCRIPTION:${escapeText(url)}`,
    'END:VEVENT', 'END:VCALENDAR'].map(fold).join('\r\n') + '\r\n';
}
export function getGoogleCalendarUrl(event, { title, location, url }) {
  const start = event.allDay ? event.date.replaceAll('-', '') : stamp(event.instant);
  const end = event.allDay ? stamp(Date.parse(`${event.date}T00:00:00Z`) + 86400000).slice(0, 8) : start;
  const params = new URLSearchParams({ action: 'TEMPLATE', text: title, dates: `${start}/${end}`, location, details: url, ctz: event.timeZone });
  return `https://calendar.google.com/calendar/render?${params}`;
}
