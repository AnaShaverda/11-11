import GuestMusicControl from "./GuestMusicControl.jsx";
import { formatRsvpDeadline } from "../data/invitationDate.js";
import { weddingPartyRoleLabel } from "../data/weddingParty.js";
import { useCallback, useEffect, useRef, useState } from "react";
import Icon from "../../components/ui/Icon.jsx";
import { CardCopyProvider, useLanguage } from "../../localization/LanguageContext.jsx";
import { InvitationArtwork } from "./InvitationCard.jsx";
import { getCardTypography, getDesignFont } from "../data/cardTypography.js";
import { getGuestCardDesign, getGuestEventDetails, getReplySeats, normalizeGuestReply, MAX_GUEST_NAME_LENGTH } from "../data/guestCardDesign.js";
import { getGuestNotePrompt, normalizeGuestNoteSettings, MAX_GUEST_NOTE_LENGTH, MAX_NOTE_PROMPT_LENGTH } from "../data/guestNotes.js";
import GuestEventTools from "./GuestEventTools.jsx";
import InvitationEntrance from "./InvitationEntrance.jsx";
import EditableInvitationArtwork from "./EditableInvitationArtwork.jsx";
import CustomInvitationCover, { lightCoverColors } from "./CustomInvitationCover.jsx";
import WeddingThemeDecoration, { weddingThemeStyle } from "./WeddingThemeDecoration.jsx";
import { getClassicalTheme, footerScenes, getClassicalOrnament, getClassicalPaper, ornamentTones } from "../data/customClassicalThemes.js";
import { MAX_DAY_PLAN_TITLE, MAX_DAY_PLAN_DETAILS } from "../data/guestDayPlan.js";
import { momentMapUrl } from "../data/customMoments.js";
import { useReducedGuestMotion, useElegantGuestMotion, useGuestComponentReveals } from "../hooks/useGuestMotion.js";
import GuestDayPlanEditor from "./GuestDayPlanEditor.jsx";
import { CanvasSectionTools, CanvasAddSection, CanvasReplyTools, CanvasNotesTools, CanvasGalleryTools } from "./GuestCanvasControls.jsx";

const pastelCustomColors = new Set(["#ad8290", "#839d87", "#9283a8", "#829db6"]);

function EditableValue({ field, onEdit, children }) {
  const { t } = useLanguage();
  if (!onEdit || !field) return <span>{children}</span>;
  return <button className="guest-editable-value" type="button" aria-label={t("guestCards.text.tapLabel", { label: field.labelText ?? t(`guestCards.text.${field.label}`) })}
    onClick={event => onEdit([field], event.currentTarget)}>{children}</button>;
}

function CardDecoration({ design, ornament = 0 }) {
  return <div className="guest-card-decoration" aria-hidden="true">
    {design.frame ? <img className="guest-card-frame" src={design.frame} alt="" decoding="async" />
      : design.ornaments.length > 0 && <img className="guest-card-ornament" src={design.ornaments[ornament % design.ornaments.length]} alt="" decoding="async" />}
  </div>;
}

function NoteCard({ design, className = "", ornament, children, tools, ...props }) {
  return <section className={`guest-note${design.weddingTheme ? " wedding-stationery-note" : ""}${design.frame ? " has-frame" : ""} ${className}`} {...props}>
    {tools}
    {design.weddingTheme ? <WeddingThemeDecoration theme={design.weddingTheme} adaptive /> : <CardDecoration design={design} ornament={ornament} />}
    <div className="guest-note-content">{children}</div>
  </section>;
}

function readReply(slug, limit) {
  try {
    return normalizeGuestReply(JSON.parse(localStorage.getItem(`1111-guest-reply-v1:${slug}`)), limit);
  } catch { /* Local previews work even when storage is unavailable. */ }
  return null;
}

function AttendanceCard({ template, design, rsvpDeadline, maxCompanions, onEditText, tools, creator, showCreatorTools, editableFields, onSettingsChange, fullName, onFullNameChange }) {
  const { t, language } = useLanguage();
  const deadlineLine = formatRsvpDeadline(rsvpDeadline, language);
  const [reply, setReply] = useState(() => readReply(template.slug, maxCompanions));
  const [attendance, setAttendance] = useState(() => reply?.attendance ?? "going");
  const [companions, setCompanions] = useState(() => reply?.companions ?? 0);
  const [nameError, setNameError] = useState(false);
  const seats = getReplySeats(attendance, companions, maxCompanions);

  useEffect(() => {
    setCompanions(count => Math.min(count, maxCompanions));
    if (reply && reply.companions > maxCompanions) {
      setReply(null);
      try { localStorage.removeItem(`1111-guest-reply-v1:${template.slug}`); } catch { /* Keep the form usable. */ }
    }
  }, [maxCompanions, reply, template.slug]);

  function submit(event) {
    event.preventDefault();
    if (!fullName.trim()) {
      setNameError(true);
      event.currentTarget.elements.namedItem("fullName").focus();
      return;
    }
    const nextReply = { attendance, fullName: fullName.trim(), companions: attendance === "going" ? Math.min(companions, maxCompanions) : 0 };
    setReply(nextReply);
    try { localStorage.setItem(`1111-guest-reply-v1:${template.slug}`, JSON.stringify(nextReply)); } catch { /* Keep the in-memory reply. */ }
  }

  function editReply() {
    setReply(null);
    try { localStorage.removeItem(`1111-guest-reply-v1:${template.slug}`); } catch { /* Storage is optional. */ }
  }

  return <NoteCard design={design} className="guest-rsvp" id="guest-rsvp" aria-labelledby="guest-rsvp-title" ornament={2} tabIndex={-1} tools={tools}>
    {showCreatorTools && <CanvasReplyTools settings={{ companions: maxCompanions }} onChange={onSettingsChange} />}
    {reply ? <div className="guest-reply-confirmation" role="status">
      <span className="guest-reply-mark"><Icon name={reply.attendance === "going" ? "check" : "heart"} size={26} /></span>
      <h2 id="guest-rsvp-title">{t(reply.attendance === "going" ? "guestCards.confirmed" : "guestCards.declineConfirmed")}</h2>
      <p className="guest-reply-name">{reply.fullName}</p>
      {reply.attendance === "going" && <p>{t(reply.companions ? "guestCards.confirmedTogether" : "guestCards.confirmedAlone", { count: reply.companions, seats: getReplySeats(reply.attendance, reply.companions, maxCompanions) })}</p>}
      <small>{t("guestCards.savedLocally")}</small>
      <button className="guest-button" type="button" onClick={editReply}>{t("guestCards.edit")} <Icon name="pen" size={16} /></button>
    </div> : <form onSubmit={submit} noValidate>
      <h2 id="guest-rsvp-title"><EditableValue field={editableFields.find(field => field.key === "guestCards.rsvp.title")} onEdit={onEditText}>{t("guestCards.rsvp.title")}</EditableValue></h2>
      {deadlineLine && <p className="guest-rsvp-deadline">{deadlineLine}</p>}
      {showCreatorTools && <p className="guest-canvas-response-hint">{t("guestCards.canvas.replyHint")}</p>}
      <div className="guest-name-field">
        <label htmlFor="guest-full-name"><EditableValue field={editableFields.find(field => field.key === "guestCards.fullName")} onEdit={onEditText}>{t("guestCards.fullName")}</EditableValue></label>
        <input id="guest-full-name" name="fullName" autoComplete="name" autoCapitalize="words" spellCheck={false} required maxLength={MAX_GUEST_NAME_LENGTH} readOnly={creator} placeholder={creator ? t("guestCards.canvas.guestName") : undefined}
          aria-invalid={nameError ? "true" : undefined} aria-describedby={nameError ? "guest-name-error" : undefined}
          value={fullName} onChange={event => { onFullNameChange(event.target.value, "rsvp"); if (event.target.value.trim()) setNameError(false); }} />
        {nameError && <p id="guest-name-error" className="guest-name-error" role="alert">{t("guestCards.nameError")}</p>}
      </div>
      <fieldset className="guest-attendance-options">
        <legend><EditableValue field={editableFields.find(field => field.key === "guestCards.rsvp.question")} onEdit={onEditText}>{t("guestCards.rsvp.question")}</EditableValue></legend>
        <div className="guest-attendance-choices">{["going", "declined"].map(value => <label className={attendance === value ? "is-selected" : ""} key={value}>
          <input type="radio" name={`attendance-${template.slug}`} value={value} checked={attendance === value} disabled={creator} onChange={() => setAttendance(value)} />
          <span>{t(`guestCards.${value}`)}</span>
        </label>)}</div>
      </fieldset>
      {attendance === "going" && <div className="guest-party-size">
        {maxCompanions > 0 && <>
          <p id="guest-companions-label">{t("guestCards.comingWith")}</p>
          <div className="guest-companion-stepper" role="group" aria-labelledby="guest-companions-label">
            <button type="button" aria-label={t("guestCards.fewer")} disabled={creator || companions === 0} onClick={() => setCompanions(count => Math.max(0, count - 1))}><Icon name="minus" size={18} /></button>
            <output aria-label={t("guestCards.companionCount")} aria-live="polite">{companions}</output>
            <button type="button" aria-label={t("guestCards.more")} disabled={creator || companions >= maxCompanions} onClick={() => setCompanions(count => Math.min(maxCompanions, count + 1))}><Icon name="plus" size={18} /></button>
          </div>
        </>}
        <span className="guest-total-seats" aria-live="polite">{t(seats === 1 ? "guestCards.seat" : "guestCards.seats", { count: seats })}</span>
      </div>}
      <button className="guest-button" type="submit" disabled={creator}>{t("guestCards.confirm")}</button>
    </form>}
  </NoteCard>;
}

function GuestNotesCard({ template, design, noteSettings, onNoteSettingsChange, onEditText, creator, showCreatorTools, tools, fullName }) {
  const { t } = useLanguage();
  const [saved, setSaved] = useState(() => {
    try { return JSON.parse(localStorage.getItem(`1111-guest-message-v1:${template.slug}`)) ?? null; } catch { return null; }
  });
  const [note, setNote] = useState(() => saved?.note ?? readReply(template.slug, 5)?.note ?? "");
  function submit(event) {
    event.preventDefault();
    const message = { fullName: fullName.trim(), note: note.trim() };
    if (!message.note) return;
    setSaved(message);
    try { localStorage.setItem(`1111-guest-message-v1:${template.slug}`, JSON.stringify(message)); } catch { /* Keep the in-memory note. */ }
  }
  return <NoteCard design={design} className="guest-rsvp guest-notes" id="guest-notes" aria-labelledby="guest-notes-title" ornament={1} tabIndex={-1} tools={tools}>
    {showCreatorTools && <CanvasNotesTools notes={noteSettings} onNotesChange={onNoteSettingsChange} />}
    <h2 id="guest-notes-title">{t("guestCards.notes.title")}</h2>
    {saved && !creator ? <div className="guest-reply-confirmation" role="status">
      <p>{t("editor.noteSaved")}</p>{saved.fullName && <p className="guest-reply-name">{saved.fullName}</p>}<blockquote className="guest-reply-note">{saved.note}</blockquote>
      <small>{t("guestCards.savedLocally")}</small>
      <button className="guest-button" type="button" disabled={creator} onClick={() => setSaved(null)}>{t("guestCards.edit")} <Icon name="pen" size={16} /></button>
    </div> : <form onSubmit={submit}>
      <div className="guest-note-field">
        <label htmlFor="guest-personal-note"><span className="guest-editable-prompt" role={onEditText ? "button" : undefined} tabIndex={onEditText ? 0 : undefined} aria-label={onEditText ? t("guestCards.text.tapLabel", { label: t("guestCards.notes.question") }) : undefined}
          onClick={onEditText ? event => { event.preventDefault(); onEditText([{ group: "notes", key: "prompt", labelText: t("guestCards.notes.question"), value: getGuestNotePrompt(noteSettings, t), maxLength: MAX_NOTE_PROMPT_LENGTH, multiline: true }], event.currentTarget); } : undefined}
          onKeyDown={event => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); event.currentTarget.click(); } }}>
          {getGuestNotePrompt(noteSettings, t)}</span></label>
        <textarea id="guest-personal-note" name="note" rows={3} required readOnly={creator} maxLength={MAX_GUEST_NOTE_LENGTH} value={note} aria-label={getGuestNotePrompt(noteSettings, t)} aria-describedby="guest-personal-note-hint" onChange={event => setNote(event.target.value)} />
        <small id="guest-personal-note-hint">{t(`guestCards.notes.help.${noteSettings.preset}`)}</small>
      </div>
      <button className="guest-button" type="submit" disabled={creator}>{t("editor.sendNote")}</button>
    </form>}
  </NoteCard>;
}

function GalleryPhoto({ photo, caption, eager = false }) {
  const [failed, setFailed] = useState(false);
  const { t } = useLanguage();
  return <span className={`guest-photo-image${photo.sample ? " is-contact-sheet" : ""}`}>
    {failed ? <span className="guest-photo-error">{t("guestCards.photoUnreadable")}</span> : <img src={photo.src} alt={caption} loading={eager ? "eager" : "lazy"} decoding="async"
      style={photo.sample ? { left: `${-100 * photo.column}%`, top: `${-100 * photo.row}%` } : undefined} onError={() => setFailed(true)} />}
  </span>;
}

function PhotoLightbox({ photos, index, onIndexChange, onClose }) {
  const { t } = useLanguage();
  const dialog = useRef(null);
  const photo = photos[index];
  const caption = photo.captionKey ? t(photo.captionKey) : t("guestCards.photoNumber", { number: index + 1 });
  useEffect(() => {
    const element = dialog.current;
    if (!element.open) element.showModal();
  }, []);

  function step(direction) { onIndexChange((index + direction + photos.length) % photos.length); }

  return <dialog ref={dialog} className="guest-photo-lightbox" aria-label={t("guestCards.openPhoto", { name: caption })} onClose={onClose}
    onClick={event => { if (event.target === event.currentTarget) onClose(); }}
    onKeyDown={event => { if (event.key === "ArrowRight" || event.key === "ArrowLeft") { event.preventDefault(); step(event.key === "ArrowRight" ? 1 : -1); } }}>
    <div className="guest-lightbox-inner">
      <button className="guest-lightbox-close" type="button" onClick={onClose} aria-label={t("guestCards.closePhoto")}><Icon name="close" /></button>
      <GalleryPhoto key={photo.id} photo={photo} caption={caption} eager />
      <div className="guest-lightbox-caption">
        <button type="button" onClick={() => step(-1)} aria-label={t("guestCards.previousPhoto")} disabled={photos.length === 1}><Icon name="arrow-left" /></button>
        <div>{photo.captionKey && <strong>{caption}</strong>}<small>{t("guestCards.photoPosition", { current: index + 1, count: photos.length })}</small></div>
        <button type="button" onClick={() => step(1)} aria-label={t("guestCards.nextPhoto")} disabled={photos.length === 1}><Icon name="arrow-right" /></button>
      </div>
    </div>
  </dialog>;
}

function PhotoGallery({ photos, design, creator, tools, galleryTools, headingField, onEditText }) {
  const { t } = useLanguage();
  const [activePhoto, setActivePhoto] = useState(null);
  return <section className="guest-gallery" id="guest-photos" aria-labelledby="guest-gallery-title" tabIndex={-1}>
    {tools}
    <div className="guest-gallery-heading">
      {design.ornaments[0] && <img src={design.ornaments[0]} alt="" aria-hidden="true" loading="lazy" />}
      <h2 id="guest-gallery-title"><EditableValue field={headingField} onEdit={onEditText}>{t("guestCards.gallery.title")}</EditableValue></h2>
    </div>
    {creator && <CanvasGalleryTools {...galleryTools} />}
    {photos.length === 0 && <div className="guest-canvas-empty-gallery"><Icon name="image" size={32} /><p>{t("guestCards.canvas.galleryEmpty")}</p></div>}
    <div className="guest-photo-strip">{photos.map((photo, index) => {
      const caption = photo.captionKey ? t(photo.captionKey) : t("guestCards.photoNumber", { number: index + 1 });
      return <figure className="guest-polaroid" key={photo.id}>
        {creator && !photo.sample && <button className="guest-canvas-remove-photo" type="button" onClick={() => galleryTools.onRemove(photo.id)} aria-label={t("guestCards.removePhoto", { name: caption })}><Icon name="close" size={16} /></button>}
        <button type="button" onClick={() => setActivePhoto(index)} aria-label={t("guestCards.openPhoto", { name: caption })}><GalleryPhoto photo={photo} caption={caption} /></button>
        {photo.captionKey && <figcaption>{caption}</figcaption>}
      </figure>;
    })}</div>
    {activePhoto !== null && <PhotoLightbox photos={photos} index={activePhoto} onIndexChange={setActivePhoto} onClose={() => setActivePhoto(null)} />}
  </section>;
}

function DayPlanCard({ dayPlan, design, onEditText, tools, editor, headingField }) {
  const { t } = useLanguage();
  return <NoteCard design={design} className="guest-day-plan" id="guest-day-plan" aria-labelledby="guest-day-plan-title" ornament={1} tabIndex={-1} tools={tools}>
    <h2 id="guest-day-plan-title"><EditableValue field={headingField} onEdit={onEditText}>{t("guestCards.plan.title")}</EditableValue></h2>
    {editor || <ol className="guest-plan-items">{dayPlan.map((item, index) => <li key={`${index}:${item.time}`}>
      <time dateTime={item.time}><EditableValue onEdit={onEditText} field={{ group: "plan", key: "time", index, labelText: t("guestCards.plan.time"), value: item.time, type: "time", required: true }}>{item.time}</EditableValue></time>
      <div><h3 aria-label={item.title}><EditableValue onEdit={onEditText} field={{ group: "plan", key: "title", index, labelText: t("guestCards.plan.activity"), value: item.title, maxLength: MAX_DAY_PLAN_TITLE, required: true }}>{item.title}</EditableValue></h3>{item.details && <p><EditableValue onEdit={onEditText} field={{ group: "plan", key: "details", index, labelText: t("guestCards.plan.details"), value: item.details, maxLength: MAX_DAY_PLAN_DETAILS, multiline: true }}>{item.details}</EditableValue></p>}</div>
    </li>)}</ol>}
  </NoteCard>;
}

function CustomMomentsCard({ moments, city, date, design, images = {} }) {
  const { language } = useLanguage();
  return <NoteCard design={design} className="guest-custom-moments" id="guest-custom-moments" aria-labelledby="guest-custom-moments-title" ornament={1} tabIndex={-1}>
    <h2 id="guest-custom-moments-title">{language === "ka" ? "ღონისძიების დეტალები" : "Event details"}</h2>
    {date && <p className="guest-custom-moments-date">{date}</p>}
    {design.weddingTheme?.illustration && <img className="wedding-details-illustration" src={design.weddingTheme.illustration} alt="" loading="lazy" decoding="async" />}
    <ol>{moments.map((moment, index) => <li key={moment.id} data-moment-id={moment.id}>
      {images[moment.id]?.src && <img className="guest-custom-moment-image" src={images[moment.id].src} alt="" loading="lazy" decoding="async" />}
      <span className="guest-custom-moment-number">{String(index + 1).padStart(2, "0")}</span>
      <div><time>{moment.unknownTime || !moment.time ? (language === "ka" ? "დრო დაზუსტდება" : "Time to follow") : moment.time}</time>
        <h3>{(language === "ka" ? moment.ka : moment.en) || moment.en || moment.ka}</h3>
        {moment.venue && <p>{moment.venue}</p>}
        {moment.venue && <a href={momentMapUrl(moment, city)} target="_blank" rel="noreferrer">{language === "ka" ? "რუკა" : "Map"} <Icon name="arrow-up-right" size={15} /></a>}
      </div>
    </li>)}</ol>
  </NoteCard>;
}

export default function GuestCardSuite({ template, sample, copyTranslations, editableFields, onEditText, settings, photos, dayPlan = [], noteSettings = normalizeGuestNoteSettings(null), openingReplay = 0, mobile, hasPortrait,
  creator, showCreatorTools = creator, onSettingsChange, onAddSection, planDraft, onSavePlan, onNoteSettingsChange, galleryTools, customDesign, moments = [], momentImages = {}, city = "", weddingParty = [] }) {
  const { t, language } = useLanguage();
  const root = useRef(null);
  const [guestIdentity, setGuestIdentity] = useState(() => {
    const reply = readReply(template.slug, 5);
    if (reply?.fullName) return { name: reply.fullName, source: "rsvp" };
    try {
      const note = JSON.parse(localStorage.getItem(`1111-guest-message-v1:${template.slug}`));
      if (typeof note?.fullName === "string" && note.fullName.length <= MAX_GUEST_NAME_LENGTH) return { name: note.fullName, source: "notes" };
    } catch { /* Names can still be shared without local storage. */ }
    return { name: "", source: null };
  });
  const changeGuestName = (name, source) => setGuestIdentity({ name, source });
  const reducedMotion = useReducedGuestMotion();
  useGuestComponentReveals(root, reducedMotion);
  const [editingPlan, setEditingPlan] = useState(false);
  const entranceKey = `${template.slug}:${creator ? "edit" : settings.entrance}:${openingReplay}`;
  const [completedEntrance, setCompletedEntrance] = useState(null);
  const entranceComplete = creator || settings.entrance === "immediate" || completedEntrance === entranceKey;
  const completeEntrance = useCallback(() => setCompletedEntrance(entranceKey), [entranceKey]);
  useElegantGuestMotion(root, !creator && settings.motion === "elegant", entranceComplete, reducedMotion, entranceKey);
  const weddingTheme = template.isCustom ? getClassicalTheme(customDesign.theme) : null;
  const baseDesign = getGuestCardDesign(template);
  const design = weddingTheme ? { ...baseDesign, weddingTheme } : baseDesign;
  useEffect(() => {
    if (!design.mobileFrame || !root.current) return;
    const frame = new Image();
    let active = true;
    frame.onload = () => {
      // Equal pixel slices keep every corner square, even for portrait assets.
      if (active && root.current) root.current.style.setProperty("--guest-frame-slice", String(Math.round(frame.naturalWidth * .25)));
    };
    frame.src = design.mobileFrame;
    return () => { active = false; };
  }, [design.mobileFrame]);
  const details = getGuestEventDetails(template, sample);
  const typography = getCardTypography(template);
  const font = getDesignFont(typography.display, language);
  const presentation = mobile && hasPortrait ? "portrait" : "square";
  const style = {
    "--guest-mobile-frame": design.mobileFrame ? `url("${design.mobileFrame}")` : "none",
    "--guest-mobile-frame-inset": design.mobileFrameInset,
    "--guest-mobile-paper": design.mobilePaper, "--guest-mobile-ink": design.mobileInk,
    "--guest-mobile-error-ink": design.mobileErrorInk,
    "--guest-mobile-background": design.mobileBackground ? `url("${design.mobileBackground}")` : "none",
    "--guest-paper": design.paper, "--guest-ink": design.ink, "--guest-accent": template.isCustom ? customDesign.color : design.accent,
    "--guest-support-paper": design.supportPaper, "--guest-support-ink": design.supportInk,
    "--guest-support-error-ink": design.supportErrorInk,
    "--guest-error-ink": design.errorInk,
    "--guest-secondary": design.secondary, "--guest-background": design.background ? `url("${design.background}")` : "none",
    "--guest-display-font": font.style["--design-font-family"],
    "--guest-frame-image": design.frame ? `url("${design.frame}")` : "none",
    ...(weddingTheme ? weddingThemeStyle(weddingTheme) : {}),
    ...(template.isCustom ? { "--custom-cover-color": customDesign.color, "--custom-paper-image": getClassicalPaper(customDesign.paper) ? `url("${getClassicalPaper(customDesign.paper)}")` : "none", "--custom-ornament-image": getClassicalOrnament(customDesign.ornament) ? `url("${getClassicalOrnament(customDesign.ornament)}")` : "none", "--custom-ornament-color": ornamentTones[customDesign.ornamentTone] ?? ornamentTones.ivory } : {}),
  };
  const [removedSection, setRemovedSection] = useState(null);
  useEffect(() => {
    if (!removedSection) return;
    document.getElementById(`guest-add-${removedSection}`)?.focus({ preventScroll: true });
    setRemovedSection(null);
  }, [removedSection]);
  const removeSection = patch => { onSettingsChange(patch); setRemovedSection(Object.keys(patch)[0]); };
  const dayPlanCard = (dayPlan.length > 0 || showCreatorTools && planDraft) && <DayPlanCard dayPlan={dayPlan} design={design} onEditText={onEditText} headingField={editableFields.find(field => field.key === "guestCards.plan.title")}
    tools={showCreatorTools && <CanvasSectionTools title={t("guestCards.plan.title")} onRemove={() => { onSavePlan([]); setEditingPlan(false); setRemovedSection("plan"); }}>
      {!planDraft && <button type="button" onClick={() => setEditingPlan(value => !value)}>{t(editingPlan ? "guestCards.canvas.done" : "guestCards.canvas.editPlan")}</button>}
    </CanvasSectionTools>}
    editor={showCreatorTools && (editingPlan || planDraft) && <GuestDayPlanEditor embedded dayPlan={dayPlan} onSave={items => { onSavePlan(items); setEditingPlan(false); }} />} />;
  const editField = key => editableFields.find(field => field.group === "fields" && field.key === key);

  return <article ref={root} data-classic-frame={design.classicMobilePaper && Boolean(design.mobileFrame)} data-template={template.slug} data-classic-paper={design.classicMobilePaper} data-classic-mobile-paper={mobile && design.classicMobilePaper} data-mobile-frame={mobile && design.classicMobilePaper && Boolean(design.mobileFrame)} data-soft-screen={design.softScreen} data-entrance-complete={entranceComplete} className={`guest-card-suite${showCreatorTools ? " is-canvas-editing" : ""}${template.isCustom ? ` guest-custom-theme wedding-stationery theme-${weddingTheme.id}${lightCoverColors.has(customDesign.color) ? " custom-light-color" : ""}${pastelCustomColors.has(customDesign.color) ? " custom-pastel-color" : ""} custom-frame-${customDesign.frame} custom-pattern-${customDesign.pattern} custom-font-${customDesign.font} custom-paper-${customDesign.paper || "none"} custom-ornament-${customDesign.ornament || "none"}` : ""} guest-pattern-${design.pattern} guest-motion-${creator ? "none" : settings.motion}${design.background ? " has-paper-image" : ""}`} style={style} aria-label={sample.title}>
    {!creator && settings.motion === "elegant" && entranceComplete && !reducedMotion && <div className="guest-elegant-atmosphere" aria-hidden="true">
      {[0, 1, 2, 3, 4, 5].map(index => <i key={index} style={{ "--particle-left": `${8 + index * 17}%`, "--particle-top": `${6 + index * 15}%`, "--particle-delay": `${-index * 3}s` }} />)}
      <span className="guest-elegant-shimmer" />
    </div>}
    <nav className="guest-nav" aria-label={sample.title}>
      <span className="guest-wordmark">11:11</span>
      <div><a href="#guest-invitation">{t("guestCards.invitation")}</a>{settings.gallery && (showCreatorTools || photos.length > 0) && <a href="#guest-photos">{t("guestCards.photos")}</a>}{settings.details && <a href="#guest-event-details">{t("guestCards.details")}</a>}{moments.length > 0 && <a href="#guest-custom-moments">{language === "ka" ? "განრიგი" : "Schedule"}</a>}{dayPlanCard && <a href="#guest-day-plan">{t("guestCards.plan.title")}</a>}{settings.rsvp && <a href="#guest-rsvp">{t("guestCards.rsvp")}</a>}{noteSettings.enabled && <a href="#guest-notes">{t("guestCards.notes.title")}</a>}</div>
    </nav>
    {settings.music && <GuestMusicControl />}
    <div className="guest-card-layout">
      <div className="guest-invitation-column">
        <section className={`guest-main-card${presentation === "portrait" ? " is-portrait" : " is-square-mobile"}`} id="guest-invitation" aria-label={t("guestCards.invitation")}>
          <div className="guest-main-content">
            <InvitationEntrance key={entranceKey} settings={creator ? { ...settings, entrance: "immediate", openingEffect: "none" } : settings} design={design} title={sample.name ?? sample.posterName ?? sample.title} reducedMotion={reducedMotion} onComplete={completeEntrance}>
              {template.isCustom ? <CustomInvitationCover design={customDesign} sample={sample} invitationLabel={t("guestCards.invitation")} />
                : <EditableInvitationArtwork fields={editableFields} onEdit={onEditText}><CardCopyProvider overrides={copyTranslations}><InvitationArtwork template={template} large presentation={presentation} sample={sample} ariaLabel={sample.title} /></CardCopyProvider></EditableInvitationArtwork>}
            </InvitationEntrance>
          </div>
        </section>
      </div>
    {template.isCustom && (sample.line || creator) && <div className="guest-section-screen" data-section="message"><NoteCard design={design} className="guest-custom-message" ornament={0}><small>{sample.opening || (language === "ka" ? "გეპატიჟებით" : "You're invited")}</small><p className={!sample.line ? "is-message-placeholder" : undefined}>{sample.line || (language === "ka" ? "მოსაწვევის ტექსტი აქ გამოჩნდება." : "Your invitation text will appear here.")}</p></NoteCard></div>}
    {settings.gallery && (showCreatorTools || photos.length > 0) && <div className="guest-section-screen" data-section="gallery"><PhotoGallery key={photos.map(photo => photo.id).join(":")} photos={photos} design={design} creator={showCreatorTools} galleryTools={galleryTools} headingField={editableFields.find(field => field.key === "guestCards.gallery.title")} onEditText={onEditText}
      tools={showCreatorTools && <CanvasSectionTools title={t("guestCards.gallery")} onRemove={() => removeSection({ gallery: false })} />} /></div>}
    {showCreatorTools && !settings.gallery && <CanvasAddSection section="gallery" onAdd={onAddSection} />}
      <div className="guest-support-cards">
        <div className="guest-event-screen" id="guest-event-details" tabIndex={-1}>
        {!template.isCustom && <GuestEventTools details={details} sample={sample} template={template} settings={settings} onSettingsChange={onSettingsChange} creator={showCreatorTools} />}
        {template.isCustom && sample.displayDate && <NoteCard design={design} className="guest-when guest-countdown-card" aria-labelledby="guest-when-title">
          <h2 id="guest-when-title">{t("guestCards.when")}</h2><span className="guest-note-rule" aria-hidden="true" />
          <GuestEventTools details={details} sample={sample} template={template} settings={settings} onSettingsChange={onSettingsChange} creator={showCreatorTools} embedded />
        </NoteCard>}
        {settings.details && (!template.isCustom || moments.length === 0) && <div className="guest-details" id="guest-details" tabIndex={-1}>
          {showCreatorTools && <CanvasSectionTools title={t("guestCards.details")} recommended onRemove={() => removeSection({ details: false })} />}
          {(!template.isCustom || !sample.displayDate) && <NoteCard design={design} className="guest-when" aria-labelledby="guest-when-title">
            <h2 id="guest-when-title"><EditableValue field={editableFields.find(field => field.key === "guestCards.when")} onEdit={onEditText}>{t("guestCards.when")}</EditableValue></h2><span className="guest-note-rule" aria-hidden="true" />
            <p className="guest-detail-value"><EditableValue field={editField("date")} onEdit={onEditText}>{sample.displayDate || details.date}</EditableValue></p>{details.time && <p className="guest-detail-time"><EditableValue field={editField("time")} onEdit={onEditText}>{details.time}</EditableValue></p>}
          </NoteCard>}
          <NoteCard design={design} className="guest-where" ornament={1} aria-labelledby="guest-where-title">
            {weddingTheme && <img className="wedding-details-illustration" src={weddingTheme.illustration} alt="" loading="lazy" decoding="async" />}
            <h2 id="guest-where-title"><EditableValue field={editableFields.find(field => field.key === "guestCards.where")} onEdit={onEditText}>{t("guestCards.where")}</EditableValue></h2><span className="guest-note-rule" aria-hidden="true" />
            <p className="guest-detail-value"><EditableValue field={editField("location")} onEdit={onEditText}>{details.location}</EditableValue></p>
            <a className="guest-map-link" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(details.location)}`} target="_blank" rel="noreferrer">{t("guestCards.map")} <Icon name="arrow-up-right" size={15} /></a>
          </NoteCard>
        </div>}
        {showCreatorTools && !settings.details && <CanvasAddSection section="details" onAdd={onAddSection} />}
        </div>
        {settings.details && moments.length > 0 && <div className="guest-section-screen" data-section="moments"><CustomMomentsCard moments={moments} city={city} date={sample.displayDate} design={design} images={momentImages} /></div>}
        {template.isCustom && weddingParty.some(person => person.name.trim() || creator) && <div className="guest-section-screen" data-section="wedding-party"><NoteCard design={design} className="guest-wedding-party" id="guest-wedding-party" aria-labelledby="guest-wedding-party-title" tabIndex={-1}>
          <h2 id="guest-wedding-party-title">{language === "ka" ? "ჩვენი მეჯვარეები" : "Our wedding party"}</h2>
          <ul>{weddingParty.filter(person => creator || person.name.trim()).map(person => <li key={person.id}><small>{weddingPartyRoleLabel(person.role,language)}</small><p>{person.name.trim() || (language === "ka" ? "სახელი და გვარი" : "Full name")}</p></li>)}</ul>
        </NoteCard></div>}
        {dayPlanCard && <div className="guest-section-screen" data-section="plan">{dayPlanCard}</div>}
        {showCreatorTools && !dayPlanCard && <CanvasAddSection section="plan" onAdd={onAddSection} />}
        {settings.rsvp && <div className="guest-section-screen" data-section="rsvp"><AttendanceCard key={template.slug} rsvpDeadline={settings.rsvpDeadline} template={template} design={design} maxCompanions={settings.companions} onEditText={onEditText} creator={creator} showCreatorTools={showCreatorTools} editableFields={editableFields} onSettingsChange={onSettingsChange} fullName={guestIdentity.name} onFullNameChange={changeGuestName}
          tools={showCreatorTools && <CanvasSectionTools title={t("guestCards.rsvp")} recommended onRemove={() => removeSection({ rsvp: false })}>
          </CanvasSectionTools>} /></div>}
        {showCreatorTools && !settings.rsvp && <CanvasAddSection section="rsvp" onAdd={onAddSection} />}
        {noteSettings.enabled && <div className="guest-section-screen" data-section="notes"><GuestNotesCard key={`notes-${template.slug}`} template={template} design={design} noteSettings={noteSettings} onNoteSettingsChange={onNoteSettingsChange} onEditText={onEditText} creator={creator} showCreatorTools={showCreatorTools} fullName={guestIdentity.name}
          tools={showCreatorTools && <CanvasSectionTools title={t("guestCards.notes.title")} onRemove={() => { onNoteSettingsChange({ ...noteSettings, enabled: false }); setRemovedSection("notes"); }} />} /></div>}
        {showCreatorTools && !noteSettings.enabled && <CanvasAddSection section="notes" onAdd={onAddSection} />}
      </div>
    </div>
    <footer className={`guest-footer${template.isCustom && customDesign.showFooter !== false && footerScenes[customDesign.footerScene] ? " has-footer-art" : ""}`}>
      {template.isCustom && customDesign.showFooter !== false && footerScenes[customDesign.footerScene] && <img className="guest-footer-art" src={footerScenes[customDesign.footerScene]} alt="" aria-hidden="true" />}
      <span>{t("guestCards.made")}</span>
    </footer>
  </article>;
}
