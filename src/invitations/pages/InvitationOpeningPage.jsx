import { Link, useParams, useSearchParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Icon from "../../components/ui/Icon.jsx";
import { getInvitationTemplate } from "../data/templates.js";
import { getInvitationSample } from "../../localization/cardCopy.js";
import { useLanguage, CardCopyProvider } from "../../localization/LanguageContext.jsx";
import ScrollManager from "../../components/layout/ScrollManager.jsx";
import { recipientArtwork } from "../data/recipientArtwork.js";
import GuestCardSuite from "../components/GuestCardSuite.jsx";
import CardTextPopover from "../components/CardTextPopover.jsx";
import InvitationDetailsForm from "../components/InvitationDetailsForm.jsx";
import InvitationAnimationEditor from "../components/InvitationAnimationEditor.jsx";
import InvitationSectionsEditor from "../components/InvitationSectionsEditor.jsx";
import { applyCardText, normalizeCardText, getEditableCardFields, getCardTextFields } from "../data/guestCardText.js";
import { normalizeGuestDayPlan } from "../data/guestDayPlan.js";
import { normalizeGuestNoteSettings } from "../data/guestNotes.js";
import { getGuestGallery, guestPreviewDefaults, normalizeGuestSettings, motionStyles, MAX_GALLERY_PHOTOS, MAX_PHOTO_BYTES, photoTypes } from "../data/guestCardDesign.js";

function readSettings(slug, params, hasPortrait) {
  let saved = guestPreviewDefaults;
  try {
    const stored = JSON.parse(localStorage.getItem(`1111-guest-preview-v1:${slug}`));
    if (stored?.customized === true) saved = stored;
  } catch { /* Storage is optional. */ }
  const settings = normalizeGuestSettings(saved);
  if (params.has("gallery")) settings.gallery = params.get("gallery") === "1";
  if (motionStyles.includes(params.get("motion"))) settings.motion = params.get("motion");
  if (params.has("format")) settings.format = params.get("format") === "portrait" ? "portrait" : "square";
  if (!hasPortrait) settings.format = "square";
  return settings;
}

function readDayPlan(slug) {
  try { return normalizeGuestDayPlan(JSON.parse(localStorage.getItem(`1111-guest-day-plan-v1:${slug}`))); }
  catch { return []; }
}

function readNoteSettings(slug) {
  try { return normalizeGuestNoteSettings(JSON.parse(localStorage.getItem(`1111-guest-notes-v1:${slug}`))); }
  catch { return normalizeGuestNoteSettings(null); }
}

function readCardText(template, sample) {
  try { return normalizeCardText(JSON.parse(localStorage.getItem(`1111-guest-card-text-v1:${template.slug}`)), template, sample); }
  catch { return { fields: {}, translations: {} }; }
}

function GuestPreview({ template }) {
  const { t, language, setLanguage } = useLanguage();
  const [params] = useSearchParams();
  const hasPortrait = !template.visualAssets?.coverImage || Boolean(recipientArtwork[template.slug]);
  const [settings, setSettings] = useState(() => readSettings(template.slug, params, hasPortrait));
  const [smallViewport, setSmallViewport] = useState(() => window.matchMedia("(max-width: 720px)").matches);
  const [view, setView] = useState(() => params.get("view") === "mobile" || (!params.has("view") && window.matchMedia("(max-width: 720px)").matches) ? "mobile" : "desktop");
  const [uploadedPhotos, setUploadedPhotos] = useState([]);
  const [photoError, setPhotoError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [dayPlan, setDayPlan] = useState(() => readDayPlan(template.slug));
  const [noteSettings, setNoteSettings] = useState(() => readNoteSettings(template.slug));
  const [inlineEdit, setInlineEdit] = useState(null);
  const creator = true;
  const [editorMode, setEditorMode] = useState("card");
  const [animationTab, setAnimationTab] = useState("opening");
  const [planDraft, setPlanDraft] = useState(false);
  const [samplePhotos, setSamplePhotos] = useState(true);
  const [pendingSection, setPendingSection] = useState(null);
  const photoUrls = useRef(new Set());
  const customized = useRef(false);
  const mounted = useRef(true);
  const baseSample = getInvitationSample(template.slug, t);
  const [cardText, setCardText] = useState(() => readCardText(template, baseSample));
  const sample = applyCardText(baseSample, cardText, t);
  const editableFields = getEditableCardFields(template, sample, cardText.translations, t);
  const photos = uploadedPhotos.length || !samplePhotos ? uploadedPhotos : getGuestGallery(template);

  useEffect(() => {
    if (!pendingSection) return;
    const section = document.getElementById(pendingSection);
    if (section) {
      section.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "center" });
      section.focus({ preventScroll: true });
      setPendingSection(null);
    }
  }, [pendingSection, settings, dayPlan, planDraft, noteSettings]);

  function addSection(section) {
    if (smallViewport || view === "mobile") setEditorMode("card");
    if (section === "plan") setPlanDraft(true);
    else if (section === "notes") { updateNoteSettings({ ...noteSettings, enabled: true }); }
    else { updateSettings({ [section]: true }); if (section === "gallery") setSamplePhotos(false); }
    setPendingSection(section === "details" ? "guest-event-details" : section === "notes" ? "guest-notes" : `guest-${section === "gallery" ? "photos" : section === "plan" ? "day-plan" : section}`);
  }

  function goToSection(id) {
    if (smallViewport || view === "mobile") setEditorMode("card");
    setPendingSection(id);
  }

  function chooseEditorMode(mode) {
    setEditorMode(mode);
    window.scrollTo({ top: 0, behavior: "instant" });
  }

  useEffect(() => {
    if (!customized.current) return;
    try { localStorage.setItem(`1111-guest-preview-v1:${template.slug}`, JSON.stringify({ ...settings, customized: true })); } catch { /* The preview still works in memory. */ }
  }, [settings, template.slug]);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 720px)");
    function onChange() { setSmallViewport(media.matches); }
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    mounted.current = true;
    const urls = photoUrls.current;
    return () => { mounted.current = false; urls.forEach(url => URL.revokeObjectURL(url)); urls.clear(); };
  }, []);

  function updateSettings(patch) { customized.current = true; setSettings(current => normalizeGuestSettings({ ...current, ...patch })); }

  function saveDayPlan(items) {
    const next = normalizeGuestDayPlan(items);
    setDayPlan(next);
    try {
      if (next.length) localStorage.setItem(`1111-guest-day-plan-v1:${template.slug}`, JSON.stringify(next));
      else localStorage.removeItem(`1111-guest-day-plan-v1:${template.slug}`);
    } catch { /* The plan remains available in the current preview. */ }
  }

  function updateNoteSettings(value) {
    const next = normalizeGuestNoteSettings(value);
    setNoteSettings(next);
    try { localStorage.setItem(`1111-guest-notes-v1:${template.slug}`, JSON.stringify(next)); }
    catch { /* Keep the creator's choices in this preview. */ }
  }


  function saveCardText(value) {
    const next = normalizeCardText(value, template, baseSample);
    setCardText(next);
    try {
      if (Object.keys(next.fields).length || Object.keys(next.translations).length) localStorage.setItem(`1111-guest-card-text-v1:${template.slug}`, JSON.stringify(next));
      else localStorage.removeItem(`1111-guest-card-text-v1:${template.slug}`);
    } catch { /* Keep personal wording in this preview. */ }
  }

  function editFromCard(fields, element) {
    setInlineEdit({ fields, element });
  }

  function saveFromCard(fields) {
    const nextText = { fields: { ...cardText.fields }, translations: { ...cardText.translations } };
    const defaults = getCardTextFields(template, baseSample);
    let changedText = false;
    let nextPlan = dayPlan;
    for (const field of fields) {
      if (field.group === "plan") {
        nextPlan = nextPlan.map((item, index) => index === field.index ? { ...item, [field.key]: field.value } : item);
      } else if (field.group === "notes") {
        updateNoteSettings({ ...noteSettings, preset: "custom", prompt: field.value });
      } else {
        const original = field.group === "fields" ? defaults.find(item => item.key === field.key)?.value : t(field.key);
        if (field.value === original) delete nextText[field.group][field.key];
        else nextText[field.group][field.key] = field.value;
        changedText = true;
      }
    }
    if (changedText) saveCardText(nextText);
    if (nextPlan !== dayPlan) saveDayPlan(nextPlan);
  }

  async function choosePhotos(event) {
    const files = Array.from(event.target.files ?? []);
    event.target.value = "";
    if (!files.length) return;
    setUploading(true);
    const slots = MAX_GALLERY_PHOTOS - uploadedPhotos.length;
    const candidates = files.filter(file => photoTypes.includes(file.type) && file.size <= MAX_PHOTO_BYTES).slice(0, slots);
    const decoded = await Promise.all(candidates.map(file => new Promise(resolve => {
      const src = URL.createObjectURL(file);
      photoUrls.current.add(src);
      const image = new Image();
      image.onload = () => resolve({ id: crypto.randomUUID(), src, name: file.name });
      image.onerror = () => { URL.revokeObjectURL(src); photoUrls.current.delete(src); resolve(null); };
      image.src = src;
    })));
    if (!mounted.current) return;
    const valid = decoded.filter(Boolean);
    setPhotoError(valid.length !== files.length);
    setUploadedPhotos(current => [...current, ...valid].slice(0, MAX_GALLERY_PHOTOS));
    if (valid.length) { setSamplePhotos(false); updateSettings({ gallery: true }); }
    setUploading(false);
  }

  function removePhoto(id) {
    const photo = uploadedPhotos.find(item => item.id === id);
    if (photo) { URL.revokeObjectURL(photo.src); photoUrls.current.delete(photo.src); }
    setUploadedPhotos(current => current.filter(item => item.id !== id));
    setPhotoError(false);
  }

  function resetPhotos() {
    setSamplePhotos(true);
    uploadedPhotos.forEach(photo => { URL.revokeObjectURL(photo.src); photoUrls.current.delete(photo.src); });
    setUploadedPhotos([]);
    setPhotoError(false);
  }

  return <main className={`guest-preview-page${creator ? " is-creating" : ""}`} data-template={template.slug} data-preview-mode={view === "mobile" || smallViewport ? "mobile" : "desktop"}>
    <ScrollManager />
    <header className="guest-preview-toolbar">
      <Link className="guest-preview-back" to={`/invitations/${template.slug}`}><Icon name="arrow-left" size={18} /><span>{t("guestCards.back")}</span></Link>
      <div className="guest-preview-device"><span>{t("guestCards.preview")}</span><div className="guest-device-buttons" role="group" aria-label={t("guestCards.device")}>{["desktop", "mobile"].map(device => <button key={device} type="button" aria-pressed={view === device} onClick={() => setView(device)}>{t(`guestCards.${device}`)}</button>)}</div></div>
      <span className="guest-canvas-save-status">{t("editor.saved")}</span>
      <button className="guest-preview-language" type="button" onClick={() => setLanguage(language === "ka" ? "en" : "ka")} aria-label={language === "ka" ? "English" : "ქართული"}>{language === "ka" ? "EN" : "KA"}</button>
    </header>
    <section className="invitation-editor-guide" aria-labelledby="invitation-editor-title">
      <div><h1 id="invitation-editor-title">{t("editor.title")}</h1><p>{t("editor.intro")}</p></div>
      <div className="invitation-editor-modes" role="group" aria-label={t("editor.title")}>
        {["card", "form", "animations", "sections"].map(mode => <button type="button" key={mode} aria-pressed={editorMode === mode} onClick={() => chooseEditorMode(mode)}>{t(`editor.${mode}`)}</button>)}
      </div>
      {editorMode === "card" && <p className="invitation-editor-card-hint">{t("editor.cardHint")}</p>}
    </section>
    <div className={`invitation-editor-workspace${creator && editorMode !== "card" ? " has-editor" : ""}`} data-editor-mode={editorMode}>
      {creator && editorMode !== "card" && <aside className="invitation-editor-sidebar">
        {editorMode === "form" && <InvitationDetailsForm fields={editableFields} onChange={saveFromCard} onViewCard={() => chooseEditorMode("card")} />}
        {editorMode === "animations" && <InvitationAnimationEditor settings={settings} onChange={updateSettings} tab={animationTab} onTabChange={setAnimationTab} />}
        {editorMode === "sections" && <InvitationSectionsEditor onSettingsChange={updateSettings} noteSettings={noteSettings} settings={settings} dayPlan={dayPlan} planDraft={planDraft} onAdd={addSection} onGo={goToSection} />}
      </aside>}
      <div className={`guest-preview-stage is-${view}`}>
      <CardCopyProvider overrides={cardText.translations}><GuestCardSuite template={template} sample={sample} copyTranslations={cardText.translations} editableFields={editableFields} onEditText={creator ? editFromCard : undefined} creator={creator} onSettingsChange={updateSettings} onAddSection={addSection} planDraft={planDraft} onSavePlan={items => { saveDayPlan(items); setPlanDraft(false); }} onNoteSettingsChange={updateNoteSettings} galleryTools={{ onChoose: choosePhotos, onRemove: removePhoto, onReset: resetPhotos, uploading, count: uploadedPhotos.length, photoError, samplePhotos }} settings={settings} photos={photos} dayPlan={dayPlan} noteSettings={noteSettings} mobile={view === "mobile" || smallViewport} hasPortrait={hasPortrait} /></CardCopyProvider>
      </div>
    </div>
    {inlineEdit && <CardTextPopover target={inlineEdit} onSave={saveFromCard} onClose={() => setInlineEdit(null)} />}
    <p className="guest-preview-disclaimer">{t("guestCards.demo")}{settings.gallery && samplePhotos && !uploadedPhotos.length ? ` · ${t("guestCards.gallery.sample")}` : ""}</p>
  </main>;
}

export default function InvitationOpeningPage() {
  const { slug } = useParams();
  const { t } = useLanguage();
  const template = getInvitationTemplate(slug);
  if (!template) return <main className="inner-page copy-page"><h1>{t("invitations.notFound.title")}</h1><Link to="/invitations">{t("invitations.allInvitations")}</Link></main>;
  return <GuestPreview key={slug} template={template} />;
}
