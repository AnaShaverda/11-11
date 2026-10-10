import { useLanguage } from "../../localization/LanguageContext.jsx";
import { captionValue } from "../../localization/captionValues.js";
import { useRef, useState } from 'react';
import InvitationArtwork from '../components/InvitationArtwork.jsx';

function read(key, validate) {
  try { const value = JSON.parse(localStorage.getItem(key)); return validate(value) ? value : null; } catch { return null; }
}
const replyKey = '1111-pink-glam-reply:v1';
const validName = value => typeof value?.name === 'string' && value.name.trim().length > 0;

export function AfterpartyRSVP({ t }) {
 const { language } = useLanguage();

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
  if (saved && !open) return <div className="ap-reply-saved" tabIndex={-1} ref={confirmation} role="status"><InvitationArtwork name="heart" size={30} /><h3>{saved.attendance === 'yes' ? captionValue("invitations.pink-glam.AfterpartyForms.caption1", language) : saved.attendance === 'maybe' ? captionValue("invitations.pink-glam.AfterpartyForms.caption2", language) : captionValue("invitations.pink-glam.AfterpartyForms.caption3", language)}</h3><p>{saved.name}</p><button className="ap-button" onClick={() => setOpen(true)}>{captionValue("invitations.pink-glam.AfterpartyForms.caption4", language)}</button><button className="ap-text-button" onClick={() => { try { localStorage.removeItem(replyKey); } catch {} setSaved(null); setName(''); setNote(''); setAttendance('yes'); setOpen(true); }}>{captionValue("invitations.pink-glam.AfterpartyForms.caption5", language)}</button><p className="ap-demo">{persistent ? captionValue("invitations.pink-glam.AfterpartyForms.caption6", language) : captionValue("invitations.pink-glam.AfterpartyForms.caption7", language)}</p></div>;
  return <div className="ap-reply-interaction">
    {!open ? <div className="ap-reply-options"><button className="ap-button ap-button-filled" onClick={() => { setAttendance('yes'); setOpen(true); }}>{captionValue("invitations.pink-glam.AfterpartyForms.caption8", language)}</button><button className="ap-button" onClick={() => { setAttendance('maybe'); setOpen(true); }}>{captionValue("invitations.pink-glam.AfterpartyForms.caption9", language)}</button></div> : <form className="ap-form" onSubmit={submit}>
      <label htmlFor="ap-reply-name">{captionValue("invitations.pink-glam.AfterpartyForms.caption10", language)}<input id="ap-reply-name" autoComplete="name" maxLength={80} required pattern=".*\S.*" value={name} onChange={event => setName(event.target.value)} /></label>
      <label htmlFor="ap-attendance">{captionValue("invitations.pink-glam.AfterpartyForms.caption11", language)}<select id="ap-attendance" value={attendance} onChange={event => setAttendance(event.target.value)}><option value="yes">{captionValue("invitations.pink-glam.AfterpartyForms.caption12", language)}</option><option value="maybe">{captionValue("invitations.pink-glam.AfterpartyForms.caption13", language)}</option><option value="no">{captionValue("invitations.pink-glam.AfterpartyForms.caption14", language)}</option></select></label>
      <label htmlFor="ap-reply-note">{captionValue("invitations.pink-glam.AfterpartyForms.caption15", language)}<textarea id="ap-reply-note" rows={2} maxLength={400} value={note} onChange={event => setNote(event.target.value)} /></label>
      <div className="ap-form-actions"><button className="ap-button ap-button-filled" type="submit">{captionValue("invitations.pink-glam.AfterpartyForms.caption16", language)}<InvitationArtwork name="arrow-right" size={16} /></button><button className="ap-text-button" type="button" onClick={() => setOpen(false)}>{captionValue("invitations.pink-glam.AfterpartyForms.caption17", language)}</button></div>
    </form>}
    <p className="ap-demo">{captionValue("invitations.pink-glam.AfterpartyForms.caption18", language)}</p>
  </div>;
}

const songsKey = '1111-pink-glam-songs:v1';
function readSongs() {
  try { const value = JSON.parse(localStorage.getItem(songsKey)); return Array.isArray(value) ? value.filter(item => typeof item === 'string').slice(-8) : []; } catch { return []; }
}
export function AfterpartySongs({ t }) {
 const { language } = useLanguage();

  const [songs, setSongs] = useState(readSongs);
  const [song, setSong] = useState('');
  const [notice, setNotice] = useState('');
  function save(next) {
    setSongs(next);
    try { localStorage.setItem(songsKey, JSON.stringify(next)); setNotice(captionValue("invitations.pink-glam.AfterpartyForms.caption19", language)); }
    catch { setNotice(captionValue("invitations.pink-glam.AfterpartyForms.caption20", language)); }
  }
  function submit(event) {
    event.preventDefault(); if (!song.trim()) return;
    const value = song.trim();
    save([...songs.filter(item => item.toLowerCase() !== value.toLowerCase()), value].slice(-8));
    setSong('');
  }
  return <div className="ap-song-request"><form onSubmit={submit}><label htmlFor="ap-song">{captionValue("invitations.pink-glam.AfterpartyForms.caption21", language)}</label><div className="ap-song-input"><input id="ap-song" maxLength={100} required pattern=".*\S.*" placeholder={captionValue("invitations.pink-glam.AfterpartyForms.caption22", language)} value={song} onChange={event => setSong(event.target.value)} /><button type="submit" aria-label={captionValue("invitations.pink-glam.AfterpartyForms.caption23", language)}><InvitationArtwork name="arrow-right" size={20} /></button></div></form><p className="ap-demo" role="status">{notice || captionValue("invitations.pink-glam.AfterpartyForms.caption24", language)}</p>{songs.length > 0 && <ol className="ap-song-list" aria-label={captionValue("invitations.pink-glam.AfterpartyForms.caption25", language)}>{songs.map(item => <li key={item}><span>{item}</span><button aria-label={captionValue("ui.invitations.pink-glam.AfterpartyForms.remove", language, { item: item })} onClick={() => save(songs.filter(song => song !== item))}><InvitationArtwork name="close" size={16} /></button></li>)}</ol>}</div>;
}
