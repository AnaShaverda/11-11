import { useRef, useState } from 'react';
import InvitationArtwork from '../components/InvitationArtwork.jsx';

function read(key, validate) {
  try { const value = JSON.parse(localStorage.getItem(key)); return validate(value) ? value : null; } catch { return null; }
}
const replyKey = '1111-pink-glam-reply:v1';
const validName = value => typeof value?.name === 'string' && value.name.trim().length > 0;

export function AfterpartyRSVP({ t }) {
  const [saved, setSaved] = useState(() => read(replyKey, value => validName(value) && ['yes', 'maybe', 'no'].includes(value.attendance)));
  const [open, setOpen] = useState(() => !saved);
  const [name, setName] = useState(saved?.name || '');
  const [attendance, setAttendance] = useState(saved?.attendance || 'yes');
  const [note, setNote] = useState(saved?.note || '');
  const [persistent, setPersistent] = useState(true);
  const confirmation = useRef(null);
  function submit(event) {
    event.preventDefault(); if (!name.trim()) return;
    const value = { name: name.trim(), attendance, note: note.trim() };
    try { localStorage.setItem(replyKey, JSON.stringify(value)); setPersistent(true); } catch { setPersistent(false); }
    setSaved(value); setOpen(false);
    requestAnimationFrame(() => confirmation.current?.focus({ preventScroll: true }));
  }
  if (saved && !open) return <div className="ap-reply-saved" tabIndex={-1} ref={confirmation} role="status"><InvitationArtwork name="heart" size={30} /><h3>{saved.attendance === 'yes' ? t('Your place is waiting.', 'შენი ადგილი გელოდება.') : saved.attendance === 'maybe' ? t('Keep us posted.', 'ველით შენს პასუხს.') : t('You’ll be missed.', 'დაგვაკლდები.')}</h3><p>{saved.name}</p><button className="ap-button" onClick={() => setOpen(true)}>{t('Edit my reply', 'პასუხის შეცვლა')}</button><button className="ap-text-button" onClick={() => { try { localStorage.removeItem(replyKey); } catch {} setSaved(null); setName(''); setNote(''); setAttendance('yes'); setOpen(true); }}>{t('Reset demo reply', 'დემო პასუხის გასუფთავება')}</button><p className="ap-demo">{persistent ? t('Saved on this device only.', 'შენახულია მხოლოდ ამ მოწყობილობაზე.') : t('Saved for this visit only.', 'შენახულია მხოლოდ ამ ვიზიტისთვის.')}</p></div>;
  return <div className="ap-reply-interaction">
    {!open ? <div className="ap-reply-options"><button className="ap-button ap-button-filled" onClick={() => { setAttendance('yes'); setOpen(true); }}>{t('I’ll be there', 'მოვდივარ')}</button><button className="ap-button" onClick={() => { setAttendance('maybe'); setOpen(true); }}>{t('Maybe', 'შესაძლოა')}</button></div> : <form className="ap-form" onSubmit={submit}>
      <label htmlFor="ap-reply-name">{t('Your name', 'შენი სახელი')}<input id="ap-reply-name" autoComplete="name" maxLength={80} required pattern=".*\S.*" value={name} onChange={event => setName(event.target.value)} /></label>
      <label htmlFor="ap-attendance">{t('Will you join us?', 'შემოგვიერთდები?')}<select id="ap-attendance" value={attendance} onChange={event => setAttendance(event.target.value)}><option value="yes">{t('I’ll be there', 'მოვდივარ')}</option><option value="maybe">{t('Maybe', 'შესაძლოა')}</option><option value="no">{t('Can’t make it', 'ვერ მოვდივარ')}</option></select></label>
      <label htmlFor="ap-reply-note">{t('A little note (optional)', 'შენიშვნა (სურვილისამებრ)')}<textarea id="ap-reply-note" rows={2} maxLength={400} value={note} onChange={event => setNote(event.target.value)} /></label>
      <div className="ap-form-actions"><button className="ap-button ap-button-filled" type="submit">{t('Save my RSVP', 'პასუხის შენახვა')}<InvitationArtwork name="arrow-right" size={16} /></button><button className="ap-text-button" type="button" onClick={() => setOpen(false)}>{t('Close', 'დახურვა')}</button></div>
    </form>}
    <p className="ap-demo">{t('Demo invitation. Your reply stays on this device.', 'დემო მოსაწვევი. პასუხი ინახება ამ მოწყობილობაზე.')}</p>
  </div>;
}

const songsKey = '1111-pink-glam-songs:v1';
function readSongs() {
  try { const value = JSON.parse(localStorage.getItem(songsKey)); return Array.isArray(value) ? value.filter(item => typeof item === 'string').slice(-8) : []; } catch { return []; }
}
export function AfterpartySongs({ t }) {
  const [songs, setSongs] = useState(readSongs);
  const [song, setSong] = useState('');
  const [notice, setNotice] = useState('');
  function save(next) {
    setSongs(next);
    try { localStorage.setItem(songsKey, JSON.stringify(next)); setNotice(t('Saved on this device only.', 'შენახულია მხოლოდ ამ მოწყობილობაზე.')); }
    catch { setNotice(t('Saved for this visit only.', 'შენახულია მხოლოდ ამ ვიზიტისთვის.')); }
  }
  function submit(event) {
    event.preventDefault(); if (!song.trim()) return;
    const value = song.trim();
    save([...songs.filter(item => item.toLowerCase() !== value.toLowerCase()), value].slice(-8));
    setSong('');
  }
  return <div className="ap-song-request"><form onSubmit={submit}><label htmlFor="ap-song">{t('Song request', 'სიმღერის სურვილი')}</label><div className="ap-song-input"><input id="ap-song" maxLength={100} required pattern=".*\S.*" placeholder={t('What should we play?', 'რომელი სიმღერა გინდა?')} value={song} onChange={event => setSong(event.target.value)} /><button type="submit" aria-label={t('Add song request', 'სიმღერის დამატება')}><InvitationArtwork name="arrow-right" size={20} /></button></div></form><p className="ap-demo" role="status">{notice || t('Demo requests stay on this device.', 'დემოში სურვილები ინახება ამ მოწყობილობაზე.')}</p>{songs.length > 0 && <ol className="ap-song-list" aria-label={t('Your song requests', 'შენი სიმღერების სურვილები')}>{songs.map(item => <li key={item}><span>{item}</span><button aria-label={t(`Remove ${item}`, `წაშალე ${item}`)} onClick={() => save(songs.filter(song => song !== item))}><InvitationArtwork name="close" size={16} /></button></li>)}</ol>}</div>;
}
