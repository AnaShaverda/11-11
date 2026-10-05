import { useEffect, useId, useRef, useState } from "react";
import { useLanguage } from "../../localization/LanguageContext.jsx";
import { getEditorFieldGroups } from "../data/editorFields.js";
import { entranceStyles, openingEffects, MAX_GALLERY_PHOTOS, photoTypes } from "../data/guestCardDesign.js";
import { eventTimeZones } from "../data/guestCalendar.js";
import { InvitationEditorField } from "./InvitationDetailsForm.jsx";
import GuestDayPlanEditor from "./GuestDayPlanEditor.jsx";

const steps = ["people", "event", "story", "guests", "opening"];

function readStep(slug) {
  try {
    const saved = Number(localStorage.getItem(`1111-invitation-guide-step:${slug}`));
    return Number.isInteger(saved) && saved >= 0 && saved < steps.length ? saved : 0;
  } catch { return 0; }
}

function initials(value) {
  return value.trim().charAt(0).toLocaleUpperCase();
}

function QuestionField({ field, onChange, id }) {
  return <InvitationEditorField field={field} id={id} value={field.value} onChange={value => onChange([{ ...field, value }])} />;
}

function ChoiceGroup({ label, values, value, onChange, getLabel }) {
  return <fieldset className="invitation-guide-choice-group">
    <legend>{label}</legend>
    <div className="invitation-guide-choice-list">{values.map(item => <button key={item} type="button" aria-pressed={item === value} onClick={() => onChange(item)}>{getLabel(item)}</button>)}</div>
  </fieldset>;
}

export default function InvitationQuestionnaire({ template, fields, settings, onFieldsChange, onSettingsChange, dayPlan, onSaveDayPlan,
  noteSettings, onNoteSettingsChange, onChoosePhotos, uploadedCount, uploading, photoError, onPreviewGuest, onViewCard, onAdvancedAnimations }) {
  const { t } = useLanguage();
  const id = useId();
  const [step, setStep] = useState(() => readStep(template.slug));
  const headingRef = useRef(null);
  const navigated = useRef(false);
  useEffect(() => { if (navigated.current) headingRef.current?.focus({ preventScroll: true }); }, [step]);
  const groups = getEditorFieldGroups(fields);
  const peopleFields = groups.find(group => group.title === "editor.who")?.fields ?? [];
  const eventFields = groups.find(group => group.title === "editor.when")?.fields ?? [];
  const storyFields = groups.find(group => group.title === "editor.words")?.fields ?? [];
  const titleField = peopleFields.find(field => field.key === "title");
  const markField = storyFields.find(field => field.key === "mark");
  const couple = template.category === "Wedding" && titleField && /\s(?:&|და|and)\s/i.test(titleField.value);
  const [firstName = "", secondName = ""] = couple ? titleField.value.split(/\s(?:&|და|and)\s/i, 2) : [];

  function goTo(index) {
    const next = Math.max(0, Math.min(steps.length - 1, index));
    navigated.current = true;
    setStep(next);
    try { localStorage.setItem(`1111-invitation-guide-step:${template.slug}`, String(next)); } catch { /* Step stays usable in memory. */ }
  }

  function changeCouple(first, second) {
    const value = `${first} & ${second}`;
    const changes = [{ ...titleField, value }];
    if (markField) changes.push({ ...markField, value: [initials(first), initials(second)].filter(Boolean).join("&") });
    onFieldsChange(changes);
  }

  const active = steps[step];
  return <section className="invitation-questionnaire" aria-labelledby={`${id}-heading`}>
    <nav className="invitation-guide-progress" aria-label={t("guide.progress")}>
      {steps.map((name, index) => <button key={name} type="button" aria-current={step === index ? "step" : undefined} className={index < step ? "is-complete" : ""} onClick={() => goTo(index)}>
        <span className="invitation-guide-progress-number">{index + 1}</span><span>{t(`guide.step.${name}`)}</span>
      </button>)}
    </nav>
    <div className="invitation-guide-content" key={active}>
      <p className="invitation-guide-count">{t("guide.count", { current: step + 1, total: steps.length })}</p>
      <h2 ref={headingRef} id={`${id}-heading`} tabIndex={-1}>{t(`guide.title.${active}`)}</h2>
      <p className="invitation-guide-intro">{t(`guide.intro.${active}`)}</p>

      {active === "people" && <div className="invitation-guide-fields">
        {couple ? <>
          <div className="invitation-editor-field"><label htmlFor={`${id}-first`}>{t("guide.firstName")}</label><input id={`${id}-first`} value={firstName} onChange={event => changeCouple(event.target.value, secondName)} autoComplete="off" /></div>
          <div className="invitation-editor-field"><label htmlFor={`${id}-second`}>{t("guide.secondName")}</label><input id={`${id}-second`} value={secondName} onChange={event => changeCouple(firstName, event.target.value)} autoComplete="off" /></div>
          <p className="invitation-guide-hint">{t("guide.namesHint")}</p>
          {peopleFields.filter(field => field !== titleField).map(field => <QuestionField key={field.key} field={field} id={`${id}-${field.key}`} onChange={onFieldsChange} />)}
        </> : peopleFields.map(field => <QuestionField key={field.key} field={field} id={`${id}-${field.key}`} onChange={onFieldsChange} />)}
      </div>}

      {active === "event" && <div className="invitation-guide-fields">
        {eventFields.map(field => <QuestionField key={field.key} field={field} id={`${id}-${field.key}`} onChange={onFieldsChange} />)}
        <div className="invitation-guide-select"><label htmlFor={`${id}-zone`}>{t("editor.eventZone")}</label><select id={`${id}-zone`} value={settings.timeZone} onChange={event => onSettingsChange({ timeZone: event.target.value })}>{eventTimeZones.map(zone => <option key={zone} value={zone}>{zone.replaceAll("_", " ")}</option>)}</select></div>
        <details className="invitation-guide-optional"><summary>{t("guide.schedule")}</summary><GuestDayPlanEditor dayPlan={dayPlan} onSave={onSaveDayPlan} embedded /></details>
      </div>}

      {active === "story" && <div className="invitation-guide-fields">
        {storyFields.filter(field => !(couple && field.key === "mark")).map(field => <QuestionField key={field.key} field={field} id={`${id}-${field.key}`} onChange={onFieldsChange} />)}
        <div className="invitation-guide-upload"><label htmlFor={`${id}-photos`}>{t("guide.photos")}</label><p>{t("guide.photosHint")}</p><input id={`${id}-photos`} type="file" accept={photoTypes.join(",")} multiple disabled={uploading || uploadedCount >= MAX_GALLERY_PHOTOS} onChange={onChoosePhotos} /><small>{t("guide.photoCount", { count: uploadedCount, max: MAX_GALLERY_PHOTOS })}</small>{photoError && <p role="alert">{t("guestCards.photoError")}</p>}</div>
      </div>}

      {active === "guests" && <div className="invitation-guide-fields">
        {[["details", "guestCards.details"], ["rsvp", "guestCards.rsvp.title"], ["gallery", "guestCards.gallery"], ["notes", "guestCards.notes.title"]].map(([key, label]) => {
          const checked = key === "notes" ? noteSettings.enabled : settings[key];
          return <label className="invitation-guide-toggle" key={key}><span><strong>{t(label)}</strong><small>{t(`guestCards.canvas.section.${key}`)}</small></span><input type="checkbox" checked={checked} onChange={event => key === "notes" ? onNoteSettingsChange({ ...noteSettings, enabled: event.target.checked }) : onSettingsChange({ [key]: event.target.checked })} /></label>;
        })}
        {settings.rsvp && <div className="invitation-guide-select"><label htmlFor={`${id}-companions`}>{t("editor.extraGuests")}</label><select id={`${id}-companions`} value={settings.companions} onChange={event => onSettingsChange({ companions: Number(event.target.value) })}>{[0, 1, 2, 3, 4, 5].map(count => <option key={count} value={count}>{t(count === 0 ? "editor.justGuest" : count === 1 ? "editor.oneExtraGuest" : "editor.extraGuestCount", { count })}</option>)}</select></div>}
      </div>}

      {active === "opening" && <div className="invitation-guide-fields">
        <ChoiceGroup label={t("editor.opening")} values={entranceStyles} value={settings.entrance} onChange={entrance => onSettingsChange({ entrance })} getLabel={value => t(`guestCards.entrance.${value}`)} />
        <ChoiceGroup label={t("editor.celebration")} values={openingEffects} value={settings.openingEffect} onChange={openingEffect => onSettingsChange({ openingEffect })} getLabel={value => t(`guestCards.opening.${value}`)} />
        <button className="invitation-guide-text-button" type="button" onClick={onAdvancedAnimations}>{t("guide.advancedAnimation")}</button>
        <div className="invitation-guide-review"><strong>{t("guide.readyTitle")}</strong><p>{t("guide.readyHint")}</p></div>
      </div>}
    </div>
    <footer className="invitation-guide-actions">
      <button type="button" onClick={() => goTo(step - 1)} disabled={step === 0}>{t("guide.back")}</button>
      {step < steps.length - 1 ? <button type="button" onClick={() => goTo(step + 1)}>{t("guide.continue")}</button> : <button type="button" onClick={onPreviewGuest}>{t("guide.previewGuest")}</button>}
    </footer>
    <button type="button" className="invitation-guide-mobile-preview" onClick={onViewCard}>{t("editor.viewCard")}</button>
  </section>;
}
