export default function RetroPopTemplate({ event }) {
  const possessiveName = event.celebrantName.endsWith("s") ? `${event.celebrantName}’` : `${event.celebrantName}’s`;

  return (
    <article className="invite-design invite-retro" aria-label={`${event.celebrantName}'s birthday invitation`}>
      <span className="retro-sun" aria-hidden="true">✷</span>
      <span className="retro-sticker retro-sticker-left" aria-hidden="true">✳</span>
      <span className="retro-sticker retro-sticker-right" aria-hidden="true">✦</span>
      <div className="retro-intro">IT’S</div>
      <h2 className="retro-name">{possessiveName}</h2>
      <div className="retro-birthday">Birthday!</div>
      {event.age ? <div className="retro-age" aria-label={`Turning ${event.age}`}><span>{event.age}</span></div> : null}
      <p className="retro-message">{event.message}</p>
      <div className="retro-details">
        <div><span className="retro-detail-icon" aria-hidden="true">✳</span><span className="retro-detail-label">DATE</span><strong>{event.date}</strong></div>
        <div><span className="retro-detail-icon" aria-hidden="true">◷</span><span className="retro-detail-label">TIME</span><strong>{event.time}</strong></div>
        <div><span className="retro-detail-icon" aria-hidden="true">⌖</span><span className="retro-detail-label">PLACE</span><strong>{event.location}</strong></div>
      </div>
      <span className="retro-bottom-mark" aria-hidden="true">11:11 ✦</span>
    </article>
  );
}
