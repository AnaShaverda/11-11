export default function EditorialTemplate({ event }) {
  return (
    <article className="invite-design invite-editorial" aria-label={`${event.brideName} and ${event.groomName}'s wedding invitation`}>
      <div className="editorial-arch" aria-hidden="true" />
      <span className="editorial-star" aria-hidden="true">✧</span>
      <p className="editorial-opening">{event.invitationMessage}</p>
      <h2 className="editorial-names"><span>{event.brideName}</span><em>&amp;</em><span>{event.groomName}</span></h2>
      <div className="editorial-rule" aria-hidden="true" />
      <p className="editorial-date">{event.date}</p>
      <p className="editorial-time">at {event.time}</p>
      <p className="editorial-location">{event.location}</p>
      <div className="editorial-rule editorial-rule-small" aria-hidden="true" />
      <p className="editorial-footer">A new chapter, together <span aria-hidden="true">✦</span> 11:11</p>
    </article>
  );
}
