import { useRef, useState } from 'react';
import InvitationArtwork from '../components/InvitationArtwork.jsx';

function readReply(key) {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    return typeof value?.name === 'string' && ['yes', 'maybe', 'no'].includes(value.attendance) && Number.isInteger(value.guests) && value.guests >= 1 && value.guests <= 20 ? value : null;
  } catch { return null; }
}

export function SpiderReply({ theme, t }) {
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
  return <div className="sp-reply">{saved ? <div className="sp-reply-success" role="status" tabIndex={-1} ref={confirmation}><InvitationArtwork name="check" size={48} /><h3>{saved.attendance === 'yes' ? t('You’re on the list.', 'სიაში ხარ.') : saved.attendance === 'maybe' ? t('Keep us posted.', 'ველით შენს პასუხს.') : t('You’ll be missed.', 'დაგვაკლდები.')}</h3><p>{saved.name}{saved.attendance === 'yes' ? ` / ${saved.guests} ${t('guests', 'სტუმარი')}` : ''}</p><button className="sp-button" onClick={() => setSaved(null)}>{t('Edit my reply', 'პასუხის შეცვლა')}<InvitationArtwork name="pen" size={18} /></button></div> : <form onSubmit={submit}>
    <label htmlFor="sp-name">{t('Your name', 'შენი სახელი')}<input id="sp-name" autoComplete="name" required maxLength={80} pattern=".*\S.*" value={name} onChange={e => setName(e.target.value)} placeholder={t('First & last name', 'სახელი და გვარი')} /></label>
    <fieldset><legend>{t('Will you be there?', 'შემოგვიერთდები?')}</legend><div className="sp-attendance">{[['yes', t('Count me in', 'მოვდივარ')], ['maybe', t('Maybe', 'შესაძლოა')], ['no', t('Can’t make it', 'ვერ მოვდივარ')]].map(([value, label]) => <label key={value}><input type="radio" name="sp-attendance" value={value} checked={attendance === value} onChange={() => setAttendance(value)} /><span>{label}</span></label>)}</div></fieldset>
    {attendance !== 'no' && <label htmlFor="sp-guests">{t('Guests, including you', 'სტუმრები, შენი ჩათვლით')}<select id="sp-guests" value={guests} onChange={e => setGuests(Number(e.target.value))}>{Array.from({ length: 20 }, (_, i) => <option key={i + 1} value={i + 1}>{i + 1}</option>)}</select></label>}
    <label htmlFor="sp-note">{t('A little note (optional)', 'შენიშვნა (სურვილისამებრ)')}<textarea id="sp-note" rows={2} maxLength={400} value={note} onChange={e => setNote(e.target.value)} placeholder={t('A birthday wish, food preferences…', 'მილოცვა, კვების სურვილები…')} /></label>
    <button className="sp-button" type="submit">{t('Save my RSVP', 'პასუხის შენახვა')}<InvitationArtwork name="arrow-right" size={20} /></button>
  </form>}<p className="sp-demo-note">{persistent ? t('Demo invitation. Your reply is saved on this device only.', 'დემო მოსაწვევი. პასუხი ინახება მხოლოდ ამ მოწყობილობაზე.') : t('Your reply is saved for this visit only.', 'პასუხი ინახება მხოლოდ ამ ვიზიტისთვის.')}</p></div>;
}

export function SpiderPersonalize({ details, onSave, t }) {
  const [draft, setDraft] = useState(details);
  const [notice, setNotice] = useState('');
  function change(key, value) { setDraft(current => ({ ...current, [key]: value })); setNotice(''); }
  function submit(event) {
    event.preventDefault();
    if (!draft.name.trim() || !draft.venue.trim()) return;
    onSave({ ...draft, name: draft.name.trim(), venue: draft.venue.trim() });
    setNotice(t('Preview updated. Make it your kind of birthday.', 'პრევიუ განახლდა. იზეიმე შენი სტილით.'));
  }
  return <details className="sp-personalize"><summary>{t('Make this birthday yours', 'მოარგე შენს დაბადების დღეს')}<InvitationArtwork name="pen" size={17} /></summary><form onSubmit={submit}><p>{t('Any age. Your people. Your kind of celebration. Changes update this preview.', 'ნებისმიერი ასაკი. შენი ადამიანები. შენი წვეულება. ცვლილებები განაახლებს პრევიუს.')}</p><div className="sp-personalize-fields">
    <label htmlFor="sp-host">{t('Name', 'სახელი')}<input id="sp-host" required maxLength={32} value={draft.name} onChange={e => change('name', e.target.value)} /></label>
    <label htmlFor="sp-age">{t('Age (optional)', 'ასაკი (სურვილისამებრ)')}<input id="sp-age" type="number" min="1" max="120" value={draft.age} onChange={e => change('age', e.target.value)} /></label>
    <label htmlFor="sp-date">{t('Date', 'თარიღი')}<input id="sp-date" required type="date" min="2026-01-01" max="2100-12-31" value={draft.date} onChange={e => change('date', e.target.value)} /></label>
    <label htmlFor="sp-time">{t('Time (Tbilisi)', 'დრო (თბილისი)')}<input id="sp-time" required type="time" value={draft.time} onChange={e => change('time', e.target.value)} /></label>
    <label htmlFor="sp-venue">{t('Venue / address', 'ადგილი / მისამართი')}<input id="sp-venue" required maxLength={100} value={draft.venue} onChange={e => change('venue', e.target.value)} /></label>
  </div><button className="sp-button" type="submit">{t('Update preview', 'პრევიუს განახლება')}<InvitationArtwork name="check" size={18} /></button><p role="status">{notice}</p></form></details>;
}
