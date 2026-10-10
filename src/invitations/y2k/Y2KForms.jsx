import { useLanguage } from "../../localization/LanguageContext.jsx";
import { captionValue } from "../../localization/captionValues.js";
import { useEffect, useRef, useState } from 'react';
import InvitationArtwork from '../components/InvitationArtwork.jsx';


function readReply(replyKey) {
  try { const value = JSON.parse(localStorage.getItem(replyKey)); return typeof value?.name === 'string' && ['yes', 'maybe', 'no'].includes(value.attendance) ? value : null; } catch { return null; }
}
function readSongs(songKey) {
  try { const value = JSON.parse(localStorage.getItem(songKey)); return Array.isArray(value) ? value.filter(v => typeof v === 'string').slice(-8) : []; } catch { return []; }
}

export function RSVPForm({ t, eventId }) {
 const { language } = useLanguage();

  const replyKey = `1111-${eventId}-reply:v1`;
  const [saved, setSaved] = useState(() => readReply(replyKey));
  const [name, setName] = useState(saved?.name || '');
  const [attendance, setAttendance] = useState(saved?.attendance || 'yes');
  const [note, setNote] = useState(saved?.note || '');
  const [persistent, setPersistent] = useState(true);
  const confirmation = useRef(null);
  function submit(event) {
    event.preventDefault();
    if (!name.trim()) return;
    const value = { name: name.trim(), attendance, note: note.trim() };
    try { localStorage.setItem(replyKey, JSON.stringify(value)); setPersistent(true); } catch { setPersistent(false); }
    setSaved(value);
    requestAnimationFrame(() => confirmation.current?.focus({ preventScroll: true }));
  }
  return <div className="y2k-reply-body">{saved ? <div ref={confirmation} tabIndex={-1} className="y2k-reply-confirmation" role="status"><InvitationArtwork name="heart-filled" size={42} /><h3>{saved.attendance === 'yes' ? captionValue("invitations.y2k.Y2KForms.caption1", language) : saved.attendance === 'maybe' ? captionValue("invitations.y2k.Y2KForms.caption2", language) : captionValue("invitations.y2k.Y2KForms.caption3", language)}</h3><p>{saved.name}</p>{saved.note && <p className="y2k-reply-note">{saved.note}</p>}<button className="y2k-button" onClick={() => setSaved(null)}>{captionValue("invitations.y2k.Y2KForms.caption4", language)}</button></div> : <form onSubmit={submit} className="y2k-rsvp-form"><label htmlFor="y2k-name">{captionValue("invitations.y2k.Y2KForms.caption5", language)}<input id="y2k-name" autoComplete="name" required pattern=".*\S.*" maxLength={80} value={name} placeholder={captionValue("invitations.y2k.Y2KForms.caption6", language)} onChange={e => setName(e.target.value)} /></label><fieldset><legend>{captionValue("invitations.y2k.Y2KForms.caption7", language)}</legend><div className="y2k-attendance">{[['yes', captionValue("invitations.y2k.Y2KForms.caption8", language)], ['maybe', captionValue("invitations.y2k.Y2KForms.caption9", language)], ['no', captionValue("invitations.y2k.Y2KForms.caption10", language)]].map(([value, label]) => <label key={value} className={attendance === value ? 'is-selected' : ''}><input type="radio" name="y2k-attendance" value={value} checked={attendance === value} onChange={() => setAttendance(value)} />{label}</label>)}</div></fieldset><label htmlFor="y2k-note">{captionValue("invitations.y2k.Y2KForms.caption11", language)}<textarea id="y2k-note" rows={2} maxLength={400} value={note} placeholder={captionValue("invitations.y2k.Y2KForms.caption12", language)} onChange={e => setNote(e.target.value)} /></label><button className="y2k-button" type="submit">{captionValue("invitations.y2k.Y2KForms.caption13", language)}<InvitationArtwork name="arrow-right" size={18} /></button></form>}<p className="y2k-preview-note">{persistent ? captionValue("invitations.y2k.Y2KForms.caption14", language) : captionValue("invitations.y2k.Y2KForms.caption15", language)}</p></div>;
}

const formatTime = time => `${Math.floor(time / 60)}:${String(Math.floor(time % 60)).padStart(2, '0')}`;

export function Soundtrack({ t, eventId }) {
 const { language } = useLanguage();

  const songKey = `1111-${eventId}-songs:v1`;
  const audio = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState('');
  const [song, setSong] = useState('');
  const [songs, setSongs] = useState(() => readSongs(songKey));
  const [notice, setNotice] = useState('');
  useEffect(() => {
    const el = audio.current;
    const metadata = () => { if (Number.isFinite(el.duration)) setDuration(el.duration); };
    el.addEventListener('loadedmetadata', metadata);
    el.addEventListener('durationchange', metadata);
    metadata();
    return () => { el.pause(); el.removeEventListener('loadedmetadata', metadata); el.removeEventListener('durationchange', metadata); };
  }, []);
  async function toggle() {
    if (Number.isFinite(audio.current.duration)) setDuration(audio.current.duration);
    if (!audio.current.paused) audio.current.pause();
    else { try { await audio.current.play(); setError(''); } catch { setError(captionValue("invitations.y2k.Y2KForms.caption16", language)); } }
  }
  function submit(event) {
    event.preventDefault(); if (!song.trim()) return;
    const value = song.trim();
    const next = [...songs.filter(item => item.toLowerCase() !== value.toLowerCase()), value].slice(-8);
    try { localStorage.setItem(songKey, JSON.stringify(next)); setNotice(captionValue("invitations.y2k.Y2KForms.caption17", language)); }
    catch { setNotice(captionValue("invitations.y2k.Y2KForms.caption18", language)); }
    setSongs(next); setSong('');
  }
  return <div className="y2k-sound-layout"><div className={`y2k-player ${playing ? 'is-playing' : ''}`}>
    <div className="y2k-player-disc" aria-hidden="true" /><div className="y2k-player-copy"><span className="y2k-mono">{captionValue("invitations.y2k.Y2KForms.caption19", language)}</span><h3>{captionValue("invitations.y2k.Y2KForms.caption20", language)}</h3><p>{captionValue("invitations.y2k.Y2KForms.caption21", language)}</p><div className="y2k-player-controls"><button type="button" className="y2k-play-button" onClick={toggle} aria-label={playing ? captionValue("invitations.y2k.Y2KForms.caption22", language) : captionValue("invitations.y2k.Y2KForms.caption23", language)}><InvitationArtwork name={playing ? 'pause' : 'play'} size={24} /></button><label className="y2k-sr-only" htmlFor="y2k-seek">{captionValue("invitations.y2k.Y2KForms.caption24", language)}</label><input id="y2k-seek" type="range" min="0" max={duration || 1} step="0.1" value={Math.min(time, duration || 1)} disabled={!duration} onChange={e => { audio.current.currentTime = Number(e.target.value); setTime(Number(e.target.value)); }} /><span className="y2k-mono">{formatTime(time)} / {formatTime(duration)}</span></div><p role="status">{error}</p></div>
    <audio ref={audio} src="/audio/y2k-arcade-loop.wav" preload="metadata" onLoadedMetadata={e => setDuration(e.currentTarget.duration)} onTimeUpdate={e => { setTime(e.currentTarget.currentTime); if (Number.isFinite(e.currentTarget.duration)) setDuration(e.currentTarget.duration); }} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onEnded={() => setPlaying(false)} onError={() => setError(captionValue("invitations.y2k.Y2KForms.caption25", language))} />
  </div><div className="y2k-song-request"><form onSubmit={submit}><label htmlFor="y2k-song">{captionValue("invitations.y2k.Y2KForms.caption26", language)}</label><div><input id="y2k-song" required pattern=".*\S.*" maxLength={100} value={song} placeholder={captionValue("invitations.y2k.Y2KForms.caption27", language)} onChange={e => setSong(e.target.value)} /><button className="y2k-button" type="submit">{captionValue("invitations.y2k.Y2KForms.caption28", language)}<InvitationArtwork name="plus" size={18} /></button></div></form><p className="y2k-preview-note" role="status">{notice || captionValue("invitations.y2k.Y2KForms.caption29", language)}</p>{songs.length > 0 && <ol className="y2k-request-list" aria-label={captionValue("invitations.y2k.Y2KForms.caption30", language)}>{songs.map((item, i) => <li key={item}><span className="y2k-mono">{String(i + 1).padStart(2, '0')}</span>{item}<button className="y2k-icon-button" aria-label={captionValue("ui.invitations.y2k.Y2KForms.remove", language, { item: item })} onClick={() => { const next = songs.filter(s => s !== item); setSongs(next); try { localStorage.setItem(songKey, JSON.stringify(next)); } catch { setNotice(captionValue("invitations.y2k.Y2KForms.caption31", language)); } }}><InvitationArtwork name="close" size={16} /></button></li>)}</ol>}</div></div>;
}
