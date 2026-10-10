import { useState } from "react";
import useInvitationGuestName from "../hooks/useInvitationGuestName.js";
import { celebrateMidnight } from "./copy.js";

const scope = "birthday-midnight-martini";
function readSaved(kind) {
  try {
    const value = JSON.parse(localStorage.getItem(`1111-${scope}-${kind}-v1`));
    return typeof value?.name === "string" && (kind === "wish" ? typeof value.message === "string" : ["yes", "no"].includes(value.attending)) ? value : null;
  } catch { return null; }
}
export default function MidnightForm({ kind, text, motion }) {
  const wish = kind === "wish";
  // Wishes and RSVP have independent, theme-specific storage.
  const key = `1111-${scope}-${wish ? "wish" : "reply"}-v1`;
  const [saved, setSaved] = useState(() => readSaved(wish ? "wish" : "reply"));
  const [name, setName] = useInvitationGuestName(scope, saved?.name || "");
  const [message, setMessage] = useState(saved?.message || "");
  const [attending, setAttending] = useState(saved?.attending || "yes");
  const [stored, setStored] = useState(true);
  function submit(event) {
    event.preventDefault();
    const next = wish ? { name: name.trim(), message: message.trim() } : { name: name.trim(), attending };
    if (!next.name || (wish && !next.message)) return;
    try { localStorage.setItem(key, JSON.stringify(next)); setStored(true); } catch { setStored(false); }
    setSaved(next);
    if (motion && (wish || attending === "yes")) celebrateMidnight();
  }
  return <div className="mm-form-wrap">
    <h2 id={wish ? "mm-wishes-title" : "mm-rsvp-title"}>{saved ? wish ? text.wishThanks : saved.attending === "yes" ? text.thanks : text.miss : (wish ? text.wishes : text.join).map(line => <span key={line}>{line}</span>)}</h2>
    <p className="mm-form-intro">{wish ? text.wishLine : text.joinLine}</p>
    {saved ? <div className="mm-confirmation" role="status">
      {wish ? <blockquote>{saved.message}</blockquote> : null}
      <p>{saved.name}</p><small>{stored ? text.saved : text.session}</small>
      <button className="mm-button mm-outline" onClick={() => { setSaved(null); try { localStorage.removeItem(key); } catch { /* Editing also works without storage. */ } }}>{wish ? text.editWish : text.editReply}</button>
    </div> : <form onSubmit={submit}>
      <label className="mm-label" htmlFor={`mm-${kind}-name`}>{text.name}</label>
      <input id={`mm-${kind}-name`} autoComplete="name" value={name} onChange={e => setName(e.target.value)} required pattern=".*\S.*" maxLength={80} placeholder={text.namePlaceholder} />
      {wish ? <><label className="mm-label" htmlFor="mm-message">{text.message}</label><div className="mm-message-field"><textarea id="mm-message" value={message} onChange={e => { e.target.setCustomValidity(""); setMessage(e.target.value); }}
        onInvalid={e => { if (!message.trim()) e.target.setCustomValidity(text.requiredMessage); }} required rows={4} maxLength={300} placeholder={text.messagePlaceholder} /><span className="mm-count" aria-hidden="true">{message.length}/300</span></div></>
        : <fieldset><legend className="mm-label">{text.coming}</legend>{["yes", "no"].map(option => <label key={option}><input type="radio" name="mm-attending" value={option} checked={attending === option} onChange={() => setAttending(option)} />{text[option]}</label>)}</fieldset>}
      <button className="mm-button" type="submit" onClick={e => { if (wish) e.currentTarget.form.querySelector("textarea").setCustomValidity(message.trim() ? "" : text.requiredMessage); }}>{wish ? text.saveWish : text.saveReply}</button>
    </form>}
    <p className="mm-demo">{wish ? text.wishDemo : text.replyDemo}</p>
  </div>;
}
