import { captionValue } from "../../localization/captionValues.js";
import InvitationArtwork from "./InvitationArtwork.jsx";
import { formatInvitationDate } from "../data/invitationDate.js";

export default function CreatorDateInput({ value, language, label, onChange }) {
  const updateDate = event => onChange(event.currentTarget.value);
  const openPicker = event => {
    const input = event.currentTarget;
    if (typeof input.showPicker !== "function") return;
    try { input.showPicker(); }
    catch { input.focus(); }
  };
  return <span className="creator-date-input">
    <span aria-hidden="true" className={value ? "" : "is-placeholder"}>{formatInvitationDate(value, language) || (captionValue("invitations.components.CreatorDateInput.caption1", language))}</span>
    <InvitationArtwork name="calendar" size={20} />
    <input type="date" lang={captionValue("invitations.components.CreatorDateInput.caption2", language)} aria-label={label} value={value} onClick={openPicker} onKeyDown={event => {
      if (event.key === "Enter" || event.key === " ") { event.preventDefault(); openPicker(event); }
    }} onInput={updateDate} onChange={updateDate} />
  </span>;
}
