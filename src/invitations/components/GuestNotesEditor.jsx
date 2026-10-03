import Icon from "../../components/ui/Icon.jsx";
import { useLanguage } from "../../localization/LanguageContext.jsx";
import { guestNotePresets, MAX_NOTE_PROMPT_LENGTH } from "../data/guestNotes.js";

export default function GuestNotesEditor({ settings, onChange }) {
  const { t } = useLanguage();
  return <details className="guest-notes-settings">
    <summary>{t("guestCards.notes.title")}<Icon name="chevron-down" size={14} /></summary>
    <button className="guest-preview-toggle" type="button" role="switch" aria-checked={settings.enabled} onClick={() => onChange({ ...settings, enabled: !settings.enabled })}>
      <span>{t("guestCards.notes.allow")}</span><span className="guest-toggle-track" aria-hidden="true"><span /></span>
    </button>
    {settings.enabled && <>
      <label className="guest-creator-field">{t("guestCards.notes.choose")}<select value={settings.preset} onChange={event => onChange({ ...settings, preset: event.target.value })}>
        {guestNotePresets.map(preset => <option value={preset} key={preset}>{t(`guestCards.notes.preset.${preset}`)}</option>)}
      </select></label>
      {settings.preset === "custom" && <label className="guest-creator-field">{t("guestCards.notes.question")}<input maxLength={MAX_NOTE_PROMPT_LENGTH} value={settings.prompt} onChange={event => onChange({ ...settings, prompt: event.target.value })} /></label>}
      <p className="guest-plan-hint">{t("guestCards.notes.hint")}</p>
    </>}
  </details>;
}
