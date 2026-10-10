import { captionValue } from "../../localization/captionValues.js";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../../localization/LanguageContext.jsx";
import InvitationArtwork from "./InvitationArtwork.jsx";

export default function GuestMusicControl() {
  const { language } = useLanguage();
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  const ka = language === "ka";
  useEffect(() => {
    const audio = audioRef.current;
    audio.volume = 0.35;
    return () => audio.pause();
  }, []);
  function toggleMusic() {
    const audio = audioRef.current;
    if (!audio.paused) { audio.pause(); return; }
    setFailed(false);
    audio.play().catch(() => { if (audioRef.current === audio) setFailed(true); });
  }
  return <div className="guest-music-control">
    <audio ref={audioRef} src="/audio/classical-piano.mp3" loop preload="none" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onError={() => setFailed(true)} />
    <button type="button" onClick={toggleMusic} aria-pressed={playing} aria-label={playing ? (captionValue("ui.invitations.components.GuestMusicControl.pauseMusic", language)) : (captionValue("ui.invitations.components.GuestMusicControl.playMusic", language))}>
      <InvitationArtwork name={playing ? "pause" : "play"} size={16} /><span>{captionValue("ui.invitations.components.GuestMusicControl.music", language)}</span>
    </button>
    {failed && <span role="status">{captionValue("ui.invitations.components.GuestMusicControl.musicCouldNotPlayTryAgain", language)}</span>}
  </div>;
}
