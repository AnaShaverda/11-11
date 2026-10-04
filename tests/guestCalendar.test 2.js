import test from 'node:test';
import assert from 'node:assert/strict';
import { getCalendarEvent, getCountdown, createCalendarFile, getGoogleCalendarUrl } from '../src/invitations/data/guestCalendar.js';

test('event time respects its location zone and supports 12-hour times', () => {
  const details = {date:'18 JULY 2027', time:'2:00 PM'};
  assert.equal(getCalendarEvent(details).instant, Date.parse('2027-07-18T10:00:00Z'));
  assert.equal(getCalendarEvent(details, 'America/New_York').instant, Date.parse('2027-07-18T18:00:00Z'));
  assert.equal(getCalendarEvent({date:'2027-01-18',time:'14:00'}, 'America/New_York').instant, Date.parse('2027-01-18T19:00:00Z'));
});
test('invalid dates and times do not become guessed calendar events', () => {
  for (const details of [{date:'31 FEB 2027'}, {date:'soon'}, {date:'18 JUL 2027',time:'25:00'}, {date:'18 JUL 2027',time:'evening'}, {date:'18 JUL 2027',time:'0:00 PM'}]) assert.equal(getCalendarEvent(details), null);
  assert.equal(getCalendarEvent({date:'2027-03-14',time:'02:30'},'America/New_York'),null);
});
test('countdown rolls over correctly and stops at zero', () => {
  assert.deepEqual(getCountdown(90061000,0), {days:1,hours:1,minutes:1,seconds:1});
  assert.deepEqual(getCountdown(0,1000), {days:0,hours:0,minutes:0,seconds:0});
});
test('calendar file uses UTC, escapes user text, folds UTF-8 lines, and keeps location', () => {
  const event = getCalendarEvent({date:'18 JUL 2027',time:'14:00'});
  const metadata = {title:'Party, for; us\n'+ 'ქართული'.repeat(30),location:'Tbilisi',url:'https://example.com/invitation',uid:'test@example.com'};
  const file = createCalendarFile(event, metadata, 0);
  assert.match(file,/DTSTART:20270718T100000Z/);
  assert.match(file,/SUMMARY:Party\\, for\\; us\\n/);
  assert.match(file,/LOCATION:Tbilisi/);
  for (const line of file.split('\r\n')) assert.ok(new TextEncoder().encode(line).length <= 75);
  const google = new URL(getGoogleCalendarUrl(event,metadata));
  assert.equal(google.searchParams.get('ctz'),'Asia/Tbilisi');
  assert.equal(google.searchParams.get('dates'),'20270718T100000Z/20270718T100000Z');
});
test('date-only invitations export an all-day event', () => {
  const event = getCalendarEvent({date:'31 DEC 2027'});
  assert.equal(event.allDay,true);
  assert.match(createCalendarFile(event,{title:'Party',uid:'test'}), /DTSTART;VALUE=DATE:20271231/);
  assert.equal(new URL(getGoogleCalendarUrl(event,{title:'Party',location:'',url:''})).searchParams.get('dates'),'20271231/20280101');
});
