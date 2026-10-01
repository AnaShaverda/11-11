import { useState } from "react";
import { useLanguage } from "../../localization/LanguageContext.jsx";

export function GuestBookEditor({ interaction, onChange }) {
  const { t } = useLanguage();
  return <label>{t("interactions.questionPrompt")}<textarea aria-label={t("interactions.questionPrompt")} rows={2} maxLength={240} value={interaction.description} onChange={(event) => onChange({ description: event.target.value })} /></label>;
}

export default function GuestBook() {
  const { t } = useLanguage();
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  function submit(event) {
    event.preventDefault();
    if (!name.trim() || !message.trim() || messages.length >= 20) return;
    setMessages((current) => [{ id: crypto.randomUUID(), name: name.trim(), message: message.trim() }, ...current]);
    setMessage("");
  }
  return <div><form className="interaction-form" onSubmit={submit}><label>{t("interactions.book.name")}<input required maxLength={60} value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" /></label><label>{t("interactions.book.message")}<textarea aria-label={t("interactions.book.message")} required rows={3} maxLength={600} value={message} onChange={(event) => setMessage(event.target.value)} /></label><button className="interaction-button" disabled={!name.trim() || !message.trim() || messages.length >= 20}>{t("interactions.book.send")}</button></form>{messages.length ? <p className="interaction-footnote" role="status">{t(messages.length >= 20 ? "interactions.book.full" : "interactions.book.thanks")}</p> : <p className="interaction-footnote">{t("interactions.book.note")}</p>}<div className="interaction-messages">{messages.map((entry) => <blockquote key={entry.id}><p>{entry.message}</p><cite>{entry.name}</cite></blockquote>)}</div></div>;
}
