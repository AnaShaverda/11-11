import { invitationSamples } from "../invitations/data/invitationSamples.js";

export function invitationSampleForEvent(event, template, language) {
  const sample = invitationSamples[template.slug];
  const date = new Intl.DateTimeFormat(language === "ka" ? "ka-GE" : "en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }).format(new Date(`${event.date}T12:00:00Z`));
  return { ...sample, title: event.title, name: event.hostName, age: event.age, posterName: language === "ka" ? event.hostName : `${event.hostName}’s`, posterAge: event.age, date: `${date} · ${event.time}`, time: event.time, location: event.location, line: event.invitation.message };
}
