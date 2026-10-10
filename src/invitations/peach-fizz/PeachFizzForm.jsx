import { useState } from "react";
import useInvitationGuestName from "../hooks/useInvitationGuestName.js";
import { celebratePeach } from "./copy.js";

const scope = "birthday-peach-fizz";
function readSaved(kind) {
  try {
    const value = JSON.parse(localStorage.getItem(`1111-${scope}-${kind}-v1`));
    return typeof value?.name === "string" && (kind === "wish" ? typeof value.message === "string" : ["yes", "no"].includes(value.attending)) ? value : null;
  } catch { return null; }
}
export default function PeachFizzForm({ kind, text, motion }) {
  const wish = kind === "wish";
  // Keep the previous experience's reply key so existing demo responses survive.
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
    if (motion && (wish || attending === "yes")) celebratePeach();
  }
  return <div className="pf-form-wrap">
    <h2 id={wish ? "pf-wishes-title" : "pf-rsvp-title"}>{saved ? wish ? text.wishThanks : saved.attending === "yes" ? text.thanks : text.miss : (wish ? text.wishes : text.join).map(line => <span key={line}>{line}</span>)}</h2>
    <p className="pf-form-intro">{wish ? text.wishLine : text.joinLine}</p>
    {saved ? <div className="pf-confirmation" role="status">
      {wish ? <blockquote>{saved.message}</blockquote> : null}
      <p>{saved.name}</p><small>{stored ? text.saved : text.session}</small>
      <button className="pf-button pf-outline" onClick={() => { setSaved(null); try { localStorage.removeItem(key); } catch { /* Editing also works without storage. */ } }}>{wish ? text.editWish : text.editReply}</button>
    </div> : <form onSubmit={submit}>
      <label className="pf-label" htmlFor={`pf-${kind}-name`}>{text.name}</label>
      <input id={`pf-${kind}-name`} autoComplete="name" value={name} onChange={e => setName(e.target.value)} required pattern=".*\S.*" maxLength={80} placeholder={text.namePlaceholder} />
      {wish ? <><label className="pf-label" htmlFor="pf-message">{text.message}</label><div className="pf-message-field"><textarea id="pf-message" value={message} onChange={e => { e.target.setCustomValidity(""); setMessage(e.target.value); }}
        onInvalid={e => { if (!message.trim()) e.target.setCustomValidity(text.requiredMessage); }} required rows={4} maxLength={300} placeholder={text.messagePlaceholder} /><span className="pf-count" aria-hidden="true">{message.length}/300</span></div></>
        : <fieldset><legend className="pf-label">{text.coming}</legend>{["yes", "no"].map(option => <label key={option}><input type="radio" name="pf-attending" value={option} checked={attending === option} onChange={() => setAttending(option)} />{text[option]}</label>)}</fieldset>}
      <button className="pf-button" type="submit" onClick={e => { if (wish) e.currentTarget.form.querySelector("textarea").setCustomValidity(message.trim() ? "" : text.requiredMessage); }}>{wish ? text.saveWish : text.saveReply}</button>
    </form>}
    <p className="pf-demo">{wish ? text.wishDemo : text.replyDemo}</p>
  </div>;
}
