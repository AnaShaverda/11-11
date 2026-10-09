import { useEffect, useState } from 'react';
import InvitationArtwork from './InvitationArtwork.jsx';
import { useLanguage } from '../../localization/LanguageContext.jsx';
import { createCalendarFile, eventTimeZones, getCalendarEvent, getCountdown, getGoogleCalendarUrl } from '../data/guestCalendar.js';

export default function GuestEventTools({ details, sample, template, settings, onSettingsChange, creator, embedded = false }) {
  const { t } = useLanguage();
  const [now, setNow] = useState(Date.now);
  useEffect(() => { const timer = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(timer); }, []);
  const event = getCalendarEvent(details, settings.timeZone);
  const metadata = { title: sample.title, location: details.location ?? '', url: window.location.href, uid: `${template.slug}@11-11` };
  function download() {
    const url = URL.createObjectURL(new Blob([createCalendarFile(event, metadata)], { type: 'text/calendar;charset=utf-8' }));
    const link = document.createElement('a'); link.href = url; link.download = `${template.slug}.ics`; link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  const Container = embedded ? "div" : "section";
  return <Container className={`guest-event-tools${embedded ? " is-embedded" : " guest-note"}`} aria-labelledby={embedded ? "guest-when-title" : "guest-countdown-title"}>
    {!embedded && <h2 id="guest-countdown-title">{t('editor.countdown')}</h2>}
    {creator && <label className="guest-event-zone">{t('editor.eventZone')}<select value={settings.timeZone} onChange={e => onSettingsChange({ timeZone: e.target.value })}>
      {eventTimeZones.map(zone => <option key={zone} value={zone}>{zone.replaceAll('_', ' ')}</option>)}
    </select><small>{t('editor.zoneHint')}</small></label>}
    {event ? <>
      <p className="guest-event-date">{sample.displayDate || details.date}{details.time ? ` · ${details.time}` : ''}{!template.isCustom && ` · ${event.timeZone.replaceAll('_', ' ')}`}</p>
      {embedded && <p className="guest-countdown-label">{t('editor.countdown')}</p>}
      {event.instant > now ? <div className="guest-countdown" role="timer" aria-live="off">{Object.entries(getCountdown(event.instant, now)).map(([unit, value]) => <div key={unit}><strong>{String(value).padStart(2, '0')}</strong><span>{t(`editor.${unit}`)}</span></div>)}</div> : <p>{t('editor.eventStarted')}</p>}
      <details className="guest-calendar-menu"><summary>{t('editor.addCalendar')}</summary><div>
        <a href={getGoogleCalendarUrl(event, metadata)} target="_blank" rel="noreferrer">Google Calendar <InvitationArtwork name="arrow-up-right" size={16} /></a>
        <button type="button" onClick={download}>{t('editor.calendarFile')}</button>
        <small>{t('editor.calendarHint')}</small>
      </div></details>
    </> : creator ? <p>{t('editor.dateNeeded')}</p> : <p>{t('editor.dateComing')}</p>}
  </Container>;
}
