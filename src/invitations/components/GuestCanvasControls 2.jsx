import { useEffect, useId, useRef } from "react";
import Icon from "../../components/ui/Icon.jsx";
import { useLanguage } from "../../localization/LanguageContext.jsx";
import { photoTypes, MAX_GALLERY_PHOTOS } from "../data/guestCardDesign.js";
import { guestNotePresets, MAX_NOTE_PROMPT_LENGTH } from "../data/guestNotes.js";

function CanvasPopover({ label, children, className = "", id, centered = false }) {
  const { t } = useLanguage();
  const ref = useRef(null);
  const dialog = useRef(null);
  const trigger = useRef(null);
  useEffect(() => {
    const dismiss = event => {
      const element = ref.current;
      if (!element?.open) return;
      if (event.type === "keydown" && event.key === "Escape") {
        element.open = false; element.querySelector("summary").focus();
      } else if (event.type === "pointerdown" && !element.contains(event.target)) element.open = false;
    };
    document.addEventListener("pointerdown", dismiss);
    document.addEventListener("keydown", dismiss);
    return () => { document.removeEventListener("pointerdown", dismiss); document.removeEventListener("keydown", dismiss); };
  }, []);
  if (centered) return <div className={`guest-canvas-popover ${className}`}>
    <button className="guest-canvas-dialog-trigger" ref={trigger} type="button" onClick={() => dialog.current.showModal()}>{label}<Icon name="chevron-down" size={14} /></button>
    <dialog ref={dialog} className="guest-canvas-panel guest-canvas-centered-modal" aria-label={label}
      onClose={() => trigger.current?.focus({ preventScroll: true })}
      onClick={event => { if (event.target === event.currentTarget) dialog.current.close(); }}>
      <button className="guest-canvas-dialog-close" type="button" onClick={() => dialog.current.close()} aria-label={t("guestCards.canvas.close")}><Icon name="close" size={20} /></button>
      {children}
    </dialog>
  </div>;
  return <details ref={ref} className={`guest-canvas-popover ${className}`}>
    <summary id={id}>{label}<Icon name="chevron-down" size={14} /></summary>
    <div className="guest-canvas-panel">{children}</div>
  </details>;
}

export function Choices({ label, values, value, onChange, getLabel, getDescription, visual = false }) {
  return <fieldset className={`guest-canvas-choices${visual ? " has-previews" : ""}`}>
    <legend>{label}</legend>
    <div>{values.map(choice => <button type="button" key={choice} aria-pressed={choice === value} onClick={() => onChange(choice)}>
      {visual && <span className={`guest-choice-preview is-${choice}`} aria-hidden="true"><i /><i /><i /><i /><i /></span>}
      <span>{getLabel(choice)}</span>
      {getDescription && <small>{getDescription(choice)}</small>}
    </button>)}</div>
  </fieldset>;
}

export function CanvasSectionTools({ title, onRemove, children, recommended = false }) {
  const { t } = useLanguage();
  return <div className="guest-canvas-section-tools"><span>{title}{recommended && <small className="guest-recommended-badge">{t("guestCards.canvas.recommended")}</small>}</span><div>{children}
    {onRemove && <button type="button" onClick={onRemove} aria-label={t("guestCards.canvas.remove", { section: title })}><Icon name="close" size={16} /></button>}
  </div></div>;
}

export function CanvasAddSection({ section, onAdd }) {
  const { t } = useLanguage();
  const keys = { details: "guestCards.details", plan: "guestCards.plan.title", rsvp: "guestCards.rsvp.title", gallery: "guestCards.gallery", notes: "guestCards.notes.title" };
  const title = section === "details" ? `${t("guestCards.when")} · ${t("guestCards.where")}` : t(keys[section]);
  return <button id={`guest-add-${section}`} className={`guest-section-add is-${section}`} type="button"
    aria-label={t("guestCards.canvas.addNamed", { section: title })} onClick={() => onAdd(section)}>
    <span className="guest-section-add-copy"><strong>{title}{["details", "rsvp"].includes(section) && <span className="guest-recommended-badge">{t("guestCards.canvas.recommended")}</span>}</strong><small>{t(`guestCards.canvas.section.${section}`)}</small></span>
    <span className="guest-section-add-action"><span aria-hidden="true">＋</span>{t("guestCards.canvas.add")}</span>
  </button>;
}

export function CanvasReplyTools({ settings, onChange }) {
  const { t } = useLanguage();
  const id = useId();
  return <section className="guest-reply-settings" aria-labelledby={`${id}-title`}>
    <h3 id={`${id}-title`}>{t("guestCards.canvas.replySettings")}</h3>
    <p>{t("editor.replySettingsHint")}</p>
    <fieldset>
      <legend>{t("editor.extraGuests")}</legend>
      <div className="guest-reply-limit-options">{[0, 1, 2, 3, 4, 5].map(count => <label key={count} className={settings.companions === count ? "is-selected" : ""}>
        <input type="radio" name={`${id}-companions`} value={count} checked={settings.companions === count} onChange={() => onChange({ companions: count })} />
        <span>{t(count === 0 ? "editor.justGuest" : count === 1 ? "editor.oneExtraGuest" : "editor.extraGuestCount", { count })}</span>
      </label>)}</div>
    </fieldset>
    <p className="guest-reply-settings-result" role="status">{t(settings.companions === 0 ? "editor.replySingleSummary" : "editor.replyGroupSummary", { count: settings.companions + 1 })}</p>
    <small>{t("editor.settingsAutoSave")}</small>
  </section>;
}

export function CanvasNotesTools({ notes, onNotesChange }) {
  const { t } = useLanguage();
  return <CanvasPopover label={t("guestCards.notes.choose")} className="guest-canvas-note-tools">
    {notes.enabled && <>
      <Choices label={t("guestCards.notes.choose")} values={guestNotePresets} value={notes.preset} onChange={preset => onNotesChange({ ...notes, preset })} getLabel={v => t(`guestCards.notes.preset.${v}`)} />
      {notes.preset === "custom" && <label className="guest-creator-field">{t("guestCards.notes.question")}<input value={notes.prompt} maxLength={MAX_NOTE_PROMPT_LENGTH} onChange={event => onNotesChange({ ...notes, prompt: event.target.value })} /></label>}
      <p className="guest-canvas-hint">{t("guestCards.notes.hint")}</p>
    </>}
  </CanvasPopover>;
}

export function CanvasGalleryTools({ onChoose, uploading, count, photoError, onReset, samplePhotos }) {
  const { t } = useLanguage();
  return <div className="guest-canvas-gallery-tools">
    <label className="guest-canvas-upload"><Icon name="image" size={18} /><span>{t("guestCards.canvas.addPhotos")}</span>
      <input type="file" aria-label={t("guestCards.canvas.addPhotos")} accept={photoTypes.join(",")} multiple onChange={onChoose} disabled={uploading || count >= MAX_GALLERY_PHOTOS} />
    </label>
    {!samplePhotos && <button type="button" onClick={onReset}>{t("guestCards.resetPhotos")}</button>}
    <small>{t(samplePhotos ? "guestCards.canvas.sampleHint" : "guestCards.photoHint")}</small>
    {photoError && <p role="alert">{t("guestCards.photoError")}</p>}
  </div>;
}
