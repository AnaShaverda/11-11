import { useEffect, useRef } from "react";
import Icon from "../../components/ui/Icon.jsx";
import { useLanguage } from "../../localization/LanguageContext.jsx";
import { entranceStyles, motionStyles, openingEffects, openingSpeeds, photoTypes, MAX_GALLERY_PHOTOS } from "../data/guestCardDesign.js";
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

function Choices({ label, values, value, onChange, getLabel, visual = false }) {
  return <fieldset className={`guest-canvas-choices${visual ? " has-previews" : ""}`}>
    <legend>{label}</legend>
    <div>{values.map(choice => <button type="button" key={choice} aria-pressed={choice === value} onClick={() => onChange(choice)}>
      {visual && <span className={`guest-choice-preview is-${choice}`} aria-hidden="true"><i /><i /><i /><i /><i /></span>}
      <span>{getLabel(choice)}</span>
    </button>)}</div>
  </fieldset>;
}

export function CanvasMainTools({ settings, onChange, onPreview, fields, onEdit, mobile }) {
  const { t } = useLanguage();
  return <div className="guest-canvas-main-tools">
    <CanvasPopover label={t("guestCards.canvas.wording")} className="guest-canvas-wording">
      <p className="guest-canvas-hint">{t("guestCards.canvas.tap")}</p>
      <div className="guest-canvas-text-list">{fields.map(field => <button type="button" key={`${field.group}:${field.key}`} onClick={event => {
        event.currentTarget.closest("details").open = false;
        onEdit([field], event.currentTarget);
      }}><span>{field.labelText ?? t(`guestCards.text.${field.label}`)}</span><small>{field.value || t("guestCards.canvas.emptyText")}</small><Icon name="pen" size={14} /></button>)}</div>
    </CanvasPopover>
    <CanvasPopover label={t("guestCards.canvas.animations")} className="guest-canvas-animation" centered={mobile}>
      <header><strong>{t("guestCards.canvas.animations")}</strong><p>{t("guestCards.canvas.animationHint")}</p></header>
      <Choices label={t("guestCards.envelope.entrance")} values={entranceStyles} value={settings.entrance} onChange={entrance => onChange({ entrance })} getLabel={value => t(`guestCards.entrance.${value}`)} visual />
      <Choices label={t("guestCards.opening.title")} values={openingEffects} value={settings.openingEffect} onChange={openingEffect => onChange({ openingEffect })} getLabel={value => t(`guestCards.opening.${value}`)} visual />
      <Choices label={t("guestCards.motionStyle")} values={motionStyles} value={settings.motion} onChange={motion => onChange({ motion })} getLabel={value => t(`guestCards.motion.${value}`)} />
      {settings.openingEffect !== "none" && <details className="guest-canvas-fine-tune"><summary>{t("guestCards.canvas.fineTune")}<Icon name="chevron-down" size={14} /></summary>
        <Choices label={t("guestCards.opening.density")} values={["subtle", "celebration"]} value={settings.openingIntensity} onChange={openingIntensity => onChange({ openingIntensity })} getLabel={v => t(`guestCards.opening.${v}`)} />
        <Choices label={t("guestCards.opening.speed")} values={openingSpeeds} value={settings.openingSpeed} onChange={openingSpeed => onChange({ openingSpeed })} getLabel={v => t(`guestCards.opening.speed.${v}`)} />
        <Choices label={t("guestCards.opening.duration")} values={[3, 5, 8, 12]} value={settings.openingDuration} onChange={openingDuration => onChange({ openingDuration })} getLabel={count => t("guestCards.opening.seconds", { count })} />
        <Choices label={t("guestCards.opening.colors")} values={["theme", "gold", "pastel"]} value={settings.openingPalette} onChange={openingPalette => onChange({ openingPalette })} getLabel={v => t(`guestCards.opening.palette.${v}`)} />
      </details>}
      <button className="guest-canvas-primary" type="button" onClick={onPreview}>{t("guestCards.canvas.tryAnimation")}<Icon name="arrow-up-right" size={16} /></button>
    </CanvasPopover>
    <span className="guest-canvas-tap-hint">{t("guestCards.canvas.tap")}</span>
  </div>;
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

export function CanvasReplyTools({ settings, notes, onChange, onNotesChange }) {
  const { t } = useLanguage();
  return <CanvasPopover label={t("guestCards.canvas.replySettings")} className="guest-canvas-reply-tools">
    <Choices label={t("guestCards.companionsAllowed")} values={[0, 1, 2, 3, 4, 5]} value={settings.companions} onChange={companions => onChange({ companions })} getLabel={count => count === 0 ? t("guestCards.noCompanions") : `+${count}`} />
    <button className="guest-canvas-note-toggle" type="button" role="switch" aria-checked={notes.enabled} onClick={() => onNotesChange({ ...notes, enabled: !notes.enabled })}>
      {t("guestCards.notes.allow")}<span className="guest-toggle-track"><span /></span>
    </button>
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
