import { useRef, useState } from 'react';
import useInvitationGuestName from '../hooks/useInvitationGuestName.js';

function readSaved(kind, scope) {
  try {
    const value = JSON.parse(localStorage.getItem(`1111-${scope}-${kind}-v1`));
    return typeof value?.name === 'string' && (kind === 'wish' ? typeof value.message === 'string' : ['yes', 'no'].includes(value.attending)) ? value : null;
  } catch { return null; }
}
export default function PartyForm({ kind, text, scope = 'pizza-chef' }) {
  const wish = kind === 'wish';
  const heading = useRef(null);
  const demoId = `pp-${kind}-demo`;
  const [saved, setSaved] = useState(() => readSaved(kind, scope));
  const [name, setName] = useInvitationGuestName(scope, readSaved('wish', scope)?.name || readSaved('reply', scope)?.name || '');
  const [message, setMessage] = useState(() => readSaved(kind, scope)?.message || '');
  const [attending, setAttending] = useState(() => readSaved(kind, scope)?.attending || (scope === 'slice-club' ? '' : 'yes'));
  const [persistent, setPersistent] = useState(true);
  function submit(event) {
    event.preventDefault();
    const nameField = event.currentTarget.elements.namedItem('guest');
    if (!name.trim()) { nameField.setCustomValidity(text.nameError); nameField.reportValidity(); return; }
    if (wish && !message.trim()) { const field = event.currentTarget.elements.namedItem('message'); field.setCustomValidity(text.wishError); field.reportValidity(); return; }
    const next = wish ? { name: name.trim(), message: message.trim() } : { name: name.trim(), attending };
    try { localStorage.setItem(`1111-${scope}-${kind}-v1`, JSON.stringify(next)); setPersistent(true); } catch { setPersistent(false); }
    setSaved(next);
    requestAnimationFrame(() => heading.current?.focus({ preventScroll: true }));
  }
  function edit() { setSaved(null); try { localStorage.removeItem(`1111-${scope}-${kind}-v1`); } catch { /* In-memory editing still works. */ } }
  return <div className="pp-form">
    <h2 ref={heading} tabIndex={-1} id={`pp-${kind}-heading`}>{saved ? wish ? text.wishSaved : saved.attending === 'yes' ? text.thanks : text.miss : wish ? text.wishTitle : text.rsvp}</h2>
    {!saved && <p>{wish ? text.wishIntro : text.rsvpIntro}</p>}
    {saved ? <div className="pp-confirmation" role="status"><p className="pp-saved-name">{saved.name}</p>{wish && <blockquote>{saved.message}</blockquote>}<p className="pp-small">{persistent ? text.local : text.session}</p><button className="pp-button pp-outline" onClick={edit}>{wish ? text.editWish : text.editReply}</button></div> : <form onSubmit={submit} aria-describedby={demoId}>
      <label htmlFor={`pp-${kind}-name`}>{text.yourName}</label><input id={`pp-${kind}-name`} name="guest" autoComplete="name" required maxLength={80} placeholder={text.namePlaceholder} value={name} onChange={event => { event.target.setCustomValidity(''); setName(event.target.value); }} />
      {wish ? <><label htmlFor="pp-message">{text.yourWish}</label><textarea id="pp-message" name="message" required maxLength={400} rows={4} aria-describedby="pp-message-count" placeholder={text.wishPlaceholder} value={message} onChange={event => { event.target.setCustomValidity(''); setMessage(event.target.value); }} /><span id="pp-message-count" className="pp-count">{message.length}/400</span></> : <fieldset><legend>{text.attendance}</legend><div className="pp-radios">{['yes', 'no'].map(option => <label key={option}><input type="radio" required name="attendance" value={option} checked={attending === option} onChange={() => setAttending(option)} /><span>{text[option]}</span></label>)}</div></fieldset>}
      <button className="pp-button" type="submit">{wish ? text.saveWish : text.saveReply}</button>
    </form>}
    <p id={demoId} className="pp-small pp-demo">{text.demo}</p>
  </div>;
}
