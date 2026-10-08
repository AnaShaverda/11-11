import { useEffect, useRef, useState } from "react";

// Add MP3 files to public/custom-orders/ani/audio, then list them here.
const tracks = [
  { name: "Love Story · Taylor Swift", url: "/custom-orders/ani/audio/love-story.mp3" },
  { name: "Shake It Off · Taylor Swift", url: "/custom-orders/ani/audio/shake-it-off.mp3" },
  { name: "You Belong With Me · Taylor Swift", url: "/custom-orders/ani/audio/you-belong-with-me.mp3" },
];

export default function BirthdayRecord() {
  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState("");
  const audioRef = useRef(null);
  const playOnChange = useRef(false);

  useEffect(() => () => {
    audioRef.current?.pause();
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !tracks[trackIndex]) return;
    audio.load();
    if (playOnChange.current) {
      playOnChange.current = false;
      void audio.play().then(() => {
        setIsPlaying(true);
        setError("");
      }).catch(() => {
        setIsPlaying(false);
        setError("Music couldn’t start. Tap the record to try again.");
      });
    }
  }, [tracks[trackIndex]?.url]);

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio || !tracks.length) return;
    if (isPlaying) {
      audio.pause();
      audio.currentTime = 0;
      setIsPlaying(false);
      return;
    }
    try {
      await audio.play();
      setIsPlaying(true);
      setError("");
    } catch {
      setError("Music couldn’t start. Tap the record to try again.");
    }
  };

  const changeTrack = (direction) => {
    if (tracks.length < 2) return;
    playOnChange.current = isPlaying;
    audioRef.current?.pause();
    setIsPlaying(false);
    setTrackIndex((index) => (index + direction + tracks.length) % tracks.length);
  };

  const nextTrack = () => {
    if (tracks.length > 1) changeTrack(1);
    else setIsPlaying(false);
  };

  return (
    <div className="record-player">
      <div className="record-player-controls">
        <button className="record-skip" type="button" onClick={() => changeTrack(-1)} disabled={tracks.length < 2} aria-label="Previous song">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M5 5h2v14H5zM18.5 5.7v12.6a1 1 0 0 1-1.53.85l-9-6.3a1 1 0 0 1 0-1.7l9-6.3a1 1 0 0 1 1.53.85Z" /></svg>
        </button>
        <button className={`record-button ${isPlaying ? "is-playing" : ""}`} type="button" onClick={toggleMusic} disabled={!tracks.length} aria-label={isPlaying ? "Stop music" : "Play music"} aria-pressed={isPlaying}>
          <span className="record-disc" aria-hidden="true"><span className="record-label"><span>ANI’S</span><strong>birthday mix</strong><i /></span></span>
          <span className="record-control" aria-hidden="true">
            {isPlaying ? (
              <svg viewBox="0 0 24 24" fill="none"><rect x="6" y="6" width="12" height="12" rx="1.5" fill="currentColor" /></svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none"><path d="M7 5.75a1 1 0 0 1 1.52-.85l10 6.25a1 1 0 0 1 0 1.7l-10 6.25A1 1 0 0 1 7 18.25V5.75Z" fill="currentColor" /></svg>
            )}
          </span>
        </button>
        <button className="record-skip" type="button" onClick={() => changeTrack(1)} disabled={tracks.length < 2} aria-label="Next song">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17 5h2v14h-2zM5.5 5.7v12.6a1 1 0 0 0 1.53.85l9-6.3a1 1 0 0 0 0-1.7l-9-6.3a1 1 0 0 0-1.53.85Z" /></svg>
        </button>
      </div>
      <div className="record-caption">
        <span className="record-eyebrow">A little birthday soundtrack</span>
        <p aria-live="polite">{error || tracks[trackIndex].name}</p>
        {tracks.length > 0 && <span className="record-credit">Song {trackIndex + 1} of {tracks.length}</span>}
      </div>
      <audio ref={audioRef} src={tracks[trackIndex]?.url} onEnded={nextTrack} onError={() => { if (tracks.length) { setIsPlaying(false); setError("This MP3 couldn’t be played."); } }} />
    </div>
  );
}
