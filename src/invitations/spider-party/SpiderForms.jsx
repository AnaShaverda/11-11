import { useLanguage } from "../../localization/LanguageContext.jsx";
import { captionValue } from "../../localization/captionValues.js";
import { useRef, useState } from 'react';
import InvitationArtwork from '../components/InvitationArtwork.jsx';

function readReply(key) {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    return typeof value?.name === 'string' && ['yes', 'maybe', 'no'].includes(value.attendance) && Number.isInteger(value.guests) && value.guests >= 1 && value.guests <= 20 ? value : null;
  } catch { return null; }
}

export function SpiderReply({ theme, t }) {
 const { language } = useLanguage();

  const storageKey = `1111-spider-${theme}-reply:v1`;
  const [saved, setSaved] = useState(() => readReply(storageKey));
  const [name, setName] = useState(saved?.name ?? '');
  const [guests, setGuests] = useState(saved?.guests ?? 1);
  const [attendance, setAttendance] = useState(saved?.attendance ?? 'yes');
  const [note, setNote] = useState(saved?.note ?? '');
  const [persistent, setPersistent] = useState(true);
  const confirmation = useRef(null);
  function submit(event) {
    event.preventDefault();
    if (!name.trim()) return;
    const value = { name: name.trim(), guests: Number(guests), attendance, note: note.trim() };
    try { localStorage.setItem(storageKey, JSON.stringify(value)); setPersistent(true); } catch { setPersistent(false); }
    setSaved(value);
    requestAnimationFrame(() => confirmation.current?.focus({ preventScroll: true }));
  }
  return <div className="sp-reply">{saved ? <div className="sp-reply-success" role="status" tabIndex={-1} ref={confirmation}><InvitationArtwork name="check" size={48} /><h3>{saved.attendance === 'yes' ? captionValue("invitations.spider-party.SpiderForms.caption1", language) : saved.attendance === 'maybe' ? captionValue("invitations.spider-party.SpiderForms.caption2", language) : captionValue("invitations.spider-party.SpiderForms.caption3", language)}</h3><p>{saved.name}{saved.attendance === 'yes' ? ` / ${saved.guests} ${captionValue("invitations.spider-party.SpiderForms.caption4", language)}` : ''}</p><button className="sp-button" onClick={() => setSaved(null)}>{captionValue("invitations.spider-party.SpiderForms.caption5", language)}<InvitationArtwork name="pen" size={18} /></button></div> : <form onSubmit={submit}>
    <label htmlFor="sp-name">{captionValue("invitations.spider-party.SpiderForms.caption6", language)}<input id="sp-name" autoComplete="name" required maxLength={80} pattern=".*\S.*" value={name} onChange={e => setName(e.target.value)} placeholder={captionValue("invitations.spider-party.SpiderForms.caption7", language)} /></label>
    <fieldset><legend>{captionValue("invitations.spider-party.SpiderForms.caption8", language)}</legend><div className="sp-attendance">{[['yes', captionValue("invitations.spider-party.SpiderForms.caption9", language)], ['maybe', captionValue("invitations.spider-party.SpiderForms.caption10", language)], ['no', captionValue("invitations.spider-party.SpiderForms.caption11", language)]].map(([value, label]) => <label key={value}><input type="radio" name="sp-attendance" value={value} checked={attendance === value} onChange={() => setAttendance(value)} /><span>{label}</span></label>)}</div></fieldset>
    {attendance !== 'no' && <label htmlFor="sp-guests">{captionValue("invitations.spider-party.SpiderForms.caption12", language)}<select id="sp-guests" value={guests} onChange={e => setGuests(Number(e.target.value))}>{Array.from({ length: 20 }, (_, i) => <option key={i + 1} value={i + 1}>{i + 1}</option>)}</select></label>}
    <label htmlFor="sp-note">{captionValue("invitations.spider-party.SpiderForms.caption13", language)}<textarea id="sp-note" rows={2} maxLength={400} value={note} onChange={e => setNote(e.target.value)} placeholder={captionValue("invitations.spider-party.SpiderForms.caption14", language)} /></label>
    <button className="sp-button" type="submit">{captionValue("invitations.spider-party.SpiderForms.caption15", language)}<InvitationArtwork name="arrow-right" size={20} /></button>
  </form>}<p className="sp-demo-note">{persistent ? captionValue("invitations.spider-party.SpiderForms.caption16", language) : captionValue("invitations.spider-party.SpiderForms.caption17", language)}</p></div>;
}

export function SpiderPersonalize({ details, onSave, t }) {
 const { language } = useLanguage();

  const [draft, setDraft] = useState(details);
  const [notice, setNotice] = useState('');
  function change(key, value) { setDraft(current => ({ ...current, [key]: value })); setNotice(''); }
  function submit(event) {
    event.preventDefault();
    if (!draft.name.trim() || !draft.venue.trim()) return;
    onSave({ ...draft, name: draft.name.trim(), venue: draft.venue.trim() });
    setNotice(captionValue("invitations.spider-party.SpiderForms.caption18", language));
  }
  return <details className="sp-personalize"><summary>{captionValue("invitations.spider-party.SpiderForms.caption19", language)}<InvitationArtwork name="pen" size={17} /></summary><form onSubmit={submit}><p>{captionValue("invitations.spider-party.SpiderForms.caption20", language)}</p><div className="sp-personalize-fields">
    <label htmlFor="sp-host">{captionValue("invitations.spider-party.SpiderForms.caption21", language)}<input id="sp-host" required maxLength={32} value={draft.name} onChange={e => change('name', e.target.value)} /></label>
    <label htmlFor="sp-age">{captionValue("invitations.spider-party.SpiderForms.caption22", language)}<input id="sp-age" type="number" min="1" max="120" value={draft.age} onChange={e => change('age', e.target.value)} /></label>
    <label htmlFor="sp-date">{captionValue("invitations.spider-party.SpiderForms.caption23", language)}<input id="sp-date" required type="date" min="2026-01-01" max="2100-12-31" value={draft.date} onChange={e => change('date', e.target.value)} /></label>
    <label htmlFor="sp-time">{captionValue("invitations.spider-party.SpiderForms.caption24", language)}<input id="sp-time" required type="time" value={draft.time} onChange={e => change('time', e.target.value)} /></label>
    <label htmlFor="sp-venue">{captionValue("invitations.spider-party.SpiderForms.caption25", language)}<input id="sp-venue" required maxLength={100} value={draft.venue} onChange={e => change('venue', e.target.value)} /></label>
  </div><button className="sp-button" type="submit">{captionValue("invitations.spider-party.SpiderForms.caption26", language)}<InvitationArtwork name="check" size={18} /></button><p role="status">{notice}</p></form></details>;
}
