import InvitationArtwork from "./InvitationArtwork.jsx";
import { formatInvitationDate } from "../data/invitationDate.js";

export default function CreatorDateInput({ value, language, label, onChange }) {
  const updateDate = event => onChange(event.currentTarget.value);
  return <span className="creator-date-input">
    <span aria-hidden="true" className={value ? "" : "is-placeholder"}>{formatInvitationDate(value, language) || (language === "ka" ? "აირჩიე თარიღი" : "Choose a date")}</span>
    <InvitationArtwork name="calendar" size={20} />
    <input type="date" lang={language === "ka" ? "ka-GE" : "en-GB"} aria-label={label} value={value} onInput={updateDate} onChange={updateDate} />
  </span>;
}
