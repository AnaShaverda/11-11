import { useEffect, useRef, useState } from 'react';
import InvitationArtwork from '../components/InvitationArtwork.jsx';


function readReply(replyKey) {
  try { const value = JSON.parse(localStorage.getItem(replyKey)); return typeof value?.name === 'string' && ['yes', 'maybe', 'no'].includes(value.attendance) ? value : null; } catch { return null; }
}
function readSongs(songKey) {
  try { const value = JSON.parse(localStorage.getItem(songKey)); return Array.isArray(value) ? value.filter(v => typeof v === 'string').slice(-8) : []; } catch { return []; }
}

export function RSVPForm({ t, eventId }) {
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
  return <div className="y2k-reply-body">{saved ? <div ref={confirmation} tabIndex={-1} className="y2k-reply-confirmation" role="status"><InvitationArtwork name="heart-filled" size={42} /><h3>{saved.attendance === 'yes' ? t('You’re on the list.', 'სიაში ხარ.') : saved.attendance === 'maybe' ? t('Keep us posted.', 'ველით შენს პასუხს.') : t('You’ll be missed.', 'დაგვაკლდები.')}</h3><p>{saved.name}</p>{saved.note && <p className="y2k-reply-note">{saved.note}</p>}<button className="y2k-button" onClick={() => setSaved(null)}>{t('Edit my reply', 'პასუხის შეცვლა')}</button></div> : <form onSubmit={submit} className="y2k-rsvp-form"><label htmlFor="y2k-name">{t('Your name', 'შენი სახელი')}<input id="y2k-name" autoComplete="name" required pattern=".*\S.*" maxLength={80} value={name} placeholder={t('First & last name', 'სახელი და გვარი')} onChange={e => setName(e.target.value)} /></label><fieldset><legend>{t('Will you be there?', 'შემოგვიერთდები?')}</legend><div className="y2k-attendance">{[['yes', t('Can’t wait', 'მოვდივარ')], ['maybe', t('Maybe', 'შესაძლოა')], ['no', t('Can’t make it', 'ვერ მოვდივარ')]].map(([value, label]) => <label key={value} className={attendance === value ? 'is-selected' : ''}><input type="radio" name="y2k-attendance" value={value} checked={attendance === value} onChange={() => setAttendance(value)} />{label}</label>)}</div></fieldset><label htmlFor="y2k-note">{t('A little note (optional)', 'შენიშვნა (სურვილისამებრ)')}<textarea id="y2k-note" rows={2} maxLength={400} value={note} placeholder={t('Food preferences, a birthday wish…', 'კვების სურვილი, დაბადების დღის მილოცვა…')} onChange={e => setNote(e.target.value)} /></label><button className="y2k-button" type="submit">{t('Save my RSVP', 'პასუხის შენახვა')}<InvitationArtwork name="arrow-right" size={18} /></button></form>}<p className="y2k-preview-note">{persistent ? t('Demo invitation. Your reply is saved on this device only.', 'დემო მოსაწვევი. პასუხი ინახება მხოლოდ ამ მოწყობილობაზე.') : t('Your reply is saved for this visit only.', 'პასუხი ინახება მხოლოდ ამ ვიზიტისთვის.')}</p></div>;
}

const formatTime = time => `${Math.floor(time / 60)}:${String(Math.floor(time % 60)).padStart(2, '0')}`;

export function Soundtrack({ t, eventId }) {
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
    else { try { await audio.current.play(); setError(''); } catch { setError(t('Playback unavailable. Try again.', 'მუსიკა ვერ ჩაირთო. სცადე ხელახლა.')); } }
  }
  function submit(event) {
    event.preventDefault(); if (!song.trim()) return;
    const value = song.trim();
    const next = [...songs.filter(item => item.toLowerCase() !== value.toLowerCase()), value].slice(-8);
    try { localStorage.setItem(songKey, JSON.stringify(next)); setNotice(t('Added to your mix on this device.', 'დაემატა შენს სიას ამ მოწყობილობაზე.')); }
    catch { setNotice(t('Added for this visit only.', 'დაემატა მხოლოდ ამ ვიზიტისთვის.')); }
    setSongs(next); setSong('');
  }
  return <div className="y2k-sound-layout"><div className={`y2k-player ${playing ? 'is-playing' : ''}`}>
    <div className="y2k-player-disc" aria-hidden="true" /><div className="y2k-player-copy"><span className="y2k-mono">{t('NOW PLAYING', 'ახლა უკრავს')}</span><h3>{t('Back to 2000', 'უკან 2000-ში')}</h3><p>{t('An original little arcade loop', 'პატარა ორიგინალური არკადული მელოდია')}</p><div className="y2k-player-controls"><button type="button" className="y2k-play-button" onClick={toggle} aria-label={playing ? t('Pause music', 'მუსიკის დაპაუზება') : t('Play music', 'მუსიკის ჩართვა')}><InvitationArtwork name={playing ? 'pause' : 'play'} size={24} /></button><label className="y2k-sr-only" htmlFor="y2k-seek">{t('Seek music', 'მუსიკის გადახვევა')}</label><input id="y2k-seek" type="range" min="0" max={duration || 1} step="0.1" value={Math.min(time, duration || 1)} disabled={!duration} onChange={e => { audio.current.currentTime = Number(e.target.value); setTime(Number(e.target.value)); }} /><span className="y2k-mono">{formatTime(time)} / {formatTime(duration)}</span></div><p role="status">{error}</p></div>
    <audio ref={audio} src="/audio/y2k-arcade-loop.wav" preload="metadata" onLoadedMetadata={e => setDuration(e.currentTarget.duration)} onTimeUpdate={e => { setTime(e.currentTarget.currentTime); if (Number.isFinite(e.currentTarget.duration)) setDuration(e.currentTarget.duration); }} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onEnded={() => setPlaying(false)} onError={() => setError(t('Music is unavailable.', 'მუსიკა მიუწვდომელია.'))} />
  </div><div className="y2k-song-request"><form onSubmit={submit}><label htmlFor="y2k-song">{t('What’s your 2000s anthem?', 'რომელია შენი 2000-იანების ჰიტი?')}</label><div><input id="y2k-song" required pattern=".*\S.*" maxLength={100} value={song} placeholder={t('Song title & artist', 'სიმღერა და შემსრულებელი')} onChange={e => setSong(e.target.value)} /><button className="y2k-button" type="submit">{t('Add to mix', 'სიაში დამატება')}<InvitationArtwork name="plus" size={18} /></button></div></form><p className="y2k-preview-note" role="status">{notice || t('Song requests stay on this device in this demo.', 'დემოში სიმღერები ინახება მხოლოდ ამ მოწყობილობაზე.')}</p>{songs.length > 0 && <ol className="y2k-request-list" aria-label={t('Your song requests', 'შენი სიმღერების სია')}>{songs.map((item, i) => <li key={item}><span className="y2k-mono">{String(i + 1).padStart(2, '0')}</span>{item}<button className="y2k-icon-button" aria-label={t(`Remove ${item}`, `წაშალე ${item}`)} onClick={() => { const next = songs.filter(s => s !== item); setSongs(next); try { localStorage.setItem(songKey, JSON.stringify(next)); } catch { setNotice(t('Changed for this visit only.', 'შეიცვალა მხოლოდ ამ ვიზიტისთვის.')); } }}><InvitationArtwork name="close" size={16} /></button></li>)}</ol>}</div></div>;
}
