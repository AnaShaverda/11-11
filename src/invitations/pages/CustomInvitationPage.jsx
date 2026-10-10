import { createCaptionCopy, captionValue } from "../../localization/captionValues.js";
import WebsiteLayout from "../../components/layout/WebsiteLayout.jsx";
import InvitationPhone from "../components/InvitationPhone.jsx";
import { customBuilderCopy } from "../data/customBuilderCopy.js";
import CreatorDateInput from "../components/CreatorDateInput.jsx";
import { formatInvitationDate } from "../data/invitationDate.js";
import { normalizeWeddingParty, weddingPartyRoles } from "../data/weddingParty.js";
import { WeddingThemePreview } from "../components/WeddingThemeDecoration.jsx";
import { getWaxInitials, getWaxMonogram, normalizeWaxInitial } from "../components/EmbossedWaxSeal.jsx";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import InvitationArtwork from "../components/InvitationArtwork.jsx";
import { useLanguage } from "../../localization/LanguageContext.jsx";
import { useAppearance } from "../../appearance/AppearanceContext.jsx";
import GuestCardSuite from "../components/GuestCardSuite.jsx";
import { normalizeCustomDesign } from "../components/CustomInvitationCover.jsx";
import { getCustomTemplate } from "../data/customTemplates.js";
import { footerScenes, canUploadCustomCover, customizableOccasions, getCustomThemes, getCustomThemeForOccasion } from "../data/customClassicalThemes.js";
import { getDraftMedia, removeDraftMedia, saveDraftMedia } from "../data/draftMedia.js";
import { entranceStyles, guestPreviewDefaults, MAX_GALLERY_PHOTOS, MAX_PHOTO_BYTES, normalizeGuestSettings, photoTypes } from "../data/guestCardDesign.js";
import { normalizeGuestNoteSettings } from "../data/guestNotes.js";
import { occasionOptions, occasionProfiles, getInitialOccasion, getOccasionWording } from "../data/customOccasions.js";
import { getMomentPresets, normalizeMoments, sortMomentsByTime } from "../data/customMoments.js";

const wizardLabels = createCaptionCopy({
  "occasion": "invitations.pages.CustomInvitationPage.copy1.occasion",
  "basics": "invitations.pages.CustomInvitationPage.copy1.basics",
  "moments": "invitations.pages.CustomInvitationPage.copy1.moments",
  "moment": "invitations.pages.CustomInvitationPage.copy1.moment",
  "cover": "invitations.pages.CustomInvitationPage.copy1.cover",
  "galleryStep": "invitations.pages.CustomInvitationPage.copy1.galleryStep",
  "wording": "invitations.pages.CustomInvitationPage.copy1.wording",
  "experience": "invitations.pages.CustomInvitationPage.copy1.experience",
  "designStep": "invitations.pages.CustomInvitationPage.copy1.designStep",
  "openingStep": "invitations.pages.CustomInvitationPage.copy1.openingStep",
  "review": "invitations.pages.CustomInvitationPage.copy1.review",
  "city": "invitations.pages.CustomInvitationPage.copy1.city",
  "selectMoments": "invitations.pages.CustomInvitationPage.copy1.selectMoments",
  "addMoment": "invitations.pages.CustomInvitationPage.copy1.addMoment",
  "customMoment": "invitations.pages.CustomInvitationPage.copy1.customMoment",
  "unknownTime": "invitations.pages.CustomInvitationPage.copy1.unknownTime",
  "venue": "invitations.pages.CustomInvitationPage.copy1.venue",
  "mapUrl": "invitations.pages.CustomInvitationPage.copy1.mapUrl",
  "hour": "invitations.pages.CustomInvitationPage.copy1.hour",
  "minute": "invitations.pages.CustomInvitationPage.copy1.minute",
  "removeMoment": "invitations.pages.CustomInvitationPage.copy1.removeMoment",
  "uploadCover": "invitations.pages.CustomInvitationPage.copy1.uploadCover",
  "uploadGallery": "invitations.pages.CustomInvitationPage.copy1.uploadGallery",
  "zoom": "invitations.pages.CustomInvitationPage.copy1.zoom",
  "rotation": "invitations.pages.CustomInvitationPage.copy1.rotation",
  "chooseWording": "invitations.pages.CustomInvitationPage.copy1.chooseWording",
  "headline": "invitations.pages.CustomInvitationPage.copy1.headline",
  "invitationText": "invitations.pages.CustomInvitationPage.copy1.invitationText",
  "previewNow": "invitations.pages.CustomInvitationPage.copy1.previewNow",
  "viewFinal": "invitations.pages.CustomInvitationPage.copy1.viewFinal",
  "editStep": "invitations.pages.CustomInvitationPage.copy1.editStep",
  "reviewHint": "invitations.pages.CustomInvitationPage.copy1.reviewHint",
  "noPublish": "invitations.pages.CustomInvitationPage.copy1.noPublish",
  "selected": "invitations.pages.CustomInvitationPage.copy1.selected",
  "optional": "invitations.pages.CustomInvitationPage.copy1.optional",
  "chooseDesign": "invitations.pages.CustomInvitationPage.copy1.chooseDesign",
  "coverHint": "invitations.pages.CustomInvitationPage.copy1.coverHint",
  "momentsHint": "invitations.pages.CustomInvitationPage.copy1.momentsHint",
  "galleryHint": "invitations.pages.CustomInvitationPage.copy1.galleryHint",
  "skip": "invitations.pages.CustomInvitationPage.copy1.skip",
  "backToReview": "invitations.pages.CustomInvitationPage.copy1.backToReview",
  "timeHint": "invitations.pages.CustomInvitationPage.copy1.timeHint",
  "viewOpening": "invitations.pages.CustomInvitationPage.copy1.viewOpening",
  "saveLocal": "invitations.pages.CustomInvitationPage.copy1.saveLocal"
});
const footerSceneNames = createCaptionCopy({
  "none": "invitations.pages.CustomInvitationPage.copy2.none",
  "church": "invitations.pages.CustomInvitationPage.copy2.church",
  "vineyard": "invitations.pages.CustomInvitationPage.copy2.vineyard",
  "wine": "invitations.pages.CustomInvitationPage.copy2.wine",
  "grapes": "invitations.pages.CustomInvitationPage.copy2.grapes",
  "landscape": "invitations.pages.CustomInvitationPage.copy2.landscape"
});
const labels = createCaptionCopy({
  "create": "invitations.pages.CustomInvitationPage.copy3.create",
  "intro": "invitations.pages.CustomInvitationPage.copy3.intro",
  "details": "invitations.pages.CustomInvitationPage.copy3.details",
  "design": "invitations.pages.CustomInvitationPage.copy3.design",
  "guests": "invitations.pages.CustomInvitationPage.copy3.guests",
  "opening": "invitations.pages.CustomInvitationPage.copy3.opening",
  "name": "invitations.pages.CustomInvitationPage.copy3.name",
  "date": "invitations.pages.CustomInvitationPage.copy3.date",
  "time": "invitations.pages.CustomInvitationPage.copy3.time",
  "place": "invitations.pages.CustomInvitationPage.copy3.place",
  "message": "invitations.pages.CustomInvitationPage.copy3.message",
  "openingLine": "invitations.pages.CustomInvitationPage.copy3.openingLine",
  "photo": "invitations.pages.CustomInvitationPage.copy3.photo",
  "remove": "invitations.pages.CustomInvitationPage.copy3.remove",
  "position": "invitations.pages.CustomInvitationPage.copy3.position",
  "frame": "invitations.pages.CustomInvitationPage.copy3.frame",
  "color": "invitations.pages.CustomInvitationPage.copy3.color",
  "pattern": "invitations.pages.CustomInvitationPage.copy3.pattern",
  "font": "invitations.pages.CustomInvitationPage.copy3.font",
  "layout": "invitations.pages.CustomInvitationPage.copy3.layout",
  "photos": "invitations.pages.CustomInvitationPage.copy3.photos",
  "gallery": "invitations.pages.CustomInvitationPage.copy3.gallery",
  "rsvp": "invitations.pages.CustomInvitationPage.copy3.rsvp",
  "notes": "invitations.pages.CustomInvitationPage.copy3.notes",
  "detailsSection": "invitations.pages.CustomInvitationPage.copy3.detailsSection",
  "companions": "invitations.pages.CustomInvitationPage.copy3.companions",
  "entrance": "invitations.pages.CustomInvitationPage.copy3.entrance",
  "effect": "invitations.pages.CustomInvitationPage.copy3.effect",
  "motion": "invitations.pages.CustomInvitationPage.copy3.motion",
  "preview": "invitations.pages.CustomInvitationPage.copy3.preview",
  "edit": "invitations.pages.CustomInvitationPage.copy3.edit",
  "replay": "invitations.pages.CustomInvitationPage.copy3.replay",
  "previous": "invitations.pages.CustomInvitationPage.copy3.previous",
  "next": "invitations.pages.CustomInvitationPage.copy3.next",
  "saved": "invitations.pages.CustomInvitationPage.copy3.saved",
  "local": "invitations.pages.CustomInvitationPage.copy3.local",
  "invalid": "invitations.pages.CustomInvitationPage.copy3.invalid",
  "count": "invitations.pages.CustomInvitationPage.copy3.count",
  "category": "invitations.pages.CustomInvitationPage.copy3.category",
  "schedule": "invitations.pages.CustomInvitationPage.copy3.schedule",
  "noPhoto": "invitations.pages.CustomInvitationPage.copy3.noPhoto",
  "more": "invitations.pages.CustomInvitationPage.copy3.more",
  "guestsHint": "invitations.pages.CustomInvitationPage.copy3.guestsHint",
  "openingHint": "invitations.pages.CustomInvitationPage.copy3.openingHint",
  "immediate": "invitations.pages.CustomInvitationPage.copy3.immediate",
  "envelope": "invitations.pages.CustomInvitationPage.copy3.envelope",
  "doors": "invitations.pages.CustomInvitationPage.copy3.doors",
  "bottom": "invitations.pages.CustomInvitationPage.copy3.bottom",
  "center": "invitations.pages.CustomInvitationPage.copy3.center",
  "serif": "invitations.pages.CustomInvitationPage.copy3.serif",
  "modern": "invitations.pages.CustomInvitationPage.copy3.modern",
  "playful": "invitations.pages.CustomInvitationPage.copy3.playful",
  "plain": "invitations.pages.CustomInvitationPage.copy3.plain",
  "floral": "invitations.pages.CustomInvitationPage.copy3.floral",
  "confetti": "invitations.pages.CustomInvitationPage.copy3.confetti",
  "stars": "invitations.pages.CustomInvitationPage.copy3.stars",
  "stripes": "invitations.pages.CustomInvitationPage.copy3.stripes",
  "arch": "invitations.pages.CustomInvitationPage.copy3.arch",
  "engraved": "invitations.pages.CustomInvitationPage.copy3.engraved",
  "oval": "invitations.pages.CustomInvitationPage.copy3.oval",
  "classic": "invitations.pages.CustomInvitationPage.copy3.classic",
  "minimal": "invitations.pages.CustomInvitationPage.copy3.minimal",
  "film": "invitations.pages.CustomInvitationPage.copy3.film",
  "desktop": "invitations.pages.CustomInvitationPage.copy3.desktop",
  "mobile": "invitations.pages.CustomInvitationPage.copy3.mobile",
  "looks": "invitations.pages.CustomInvitationPage.copy3.looks",
  "artwork": "invitations.pages.CustomInvitationPage.copy3.artwork",
  "paper": "invitations.pages.CustomInvitationPage.copy3.paper",
  "ornament": "invitations.pages.CustomInvitationPage.copy3.ornament",
  "none": "invitations.pages.CustomInvitationPage.copy3.none",
  "church": "invitations.pages.CustomInvitationPage.copy3.church",
  "garden": "invitations.pages.CustomInvitationPage.copy3.garden",
  "manor": "invitations.pages.CustomInvitationPage.copy3.manor",
  "ivory": "invitations.pages.CustomInvitationPage.copy3.ivory",
  "rose": "invitations.pages.CustomInvitationPage.copy3.rose",
  "navy": "invitations.pages.CustomInvitationPage.copy3.navy",
  "laurel": "invitations.pages.CustomInvitationPage.copy3.laurel"
});

function readDraft(slug) {
  try { return JSON.parse(localStorage.getItem(`1111-custom-draft-v1:${slug}`)) ?? {}; } catch { return {}; }
}

function Builder({ template }) {
  const [searchParams] = useSearchParams();
  const selectedTheme = searchParams.get("theme");
  const selectedOccasion = searchParams.get("occasion");
  const { t, language, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useAppearance();
  const l = labels[language] ?? labels.en;
  const w = wizardLabels[language] ?? wizardLabels.en;
  const ux = customBuilderCopy[language] ?? customBuilderCopy.en;
  const [formError, setFormError] = useState("");
  const draft = useRef(readDraft(template.slug));
  const requestedOccasion = getInitialOccasion(template.subcategory, selectedOccasion || draft.current.eventType);
  const initialOccasion = customizableOccasions.includes(requestedOccasion) ? requestedOccasion : "";
  const [eventType, setEventType] = useState(initialOccasion);
  const availableThemes = getCustomThemes(eventType);
  const occasion = occasionProfiles[eventType];
  const wording = getOccasionWording(eventType, language);
  const isWedding = eventType === "wedding" || eventType === "pre-wedding";
  const occasionMoments = useRef(draft.current.occasionMoments ?? {});
  const [step, setStep] = useState(0);
  const [editingDesign, setEditingDesign] = useState(false);
  const [view, setView] = useState(() => window.matchMedia("(min-width: 721px)").matches ? "desktop" : "mobile");
  const [stepsExpanded, setStepsExpanded] = useState(false);
  const [wideForm, setWideForm] = useState(() => window.matchMedia("(min-width: 901px)").matches);
  useEffect(() => {
    const media = window.matchMedia("(min-width: 901px)");
    const update = () => setWideForm(media.matches);
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  const [fields, setFields] = useState(() => ({ title: "", initialFirst: "", initialSecond: "", date: "", time: "", location: "", city: "", line: "", opening: "", ...draft.current.fields }));
  const [moments, setMoments] = useState(() => initialOccasion || Array.isArray(draft.current.moments) ? normalizeMoments(draft.current.moments, initialOccasion || "parties") : []);
  const [weddingParty, setWeddingParty] = useState(() => normalizeWeddingParty(draft.current.weddingParty));
  const [customMomentName, setCustomMomentName] = useState("");
  const [design, setDesign] = useState(() => normalizeCustomDesign({ ...draft.current.design, theme: getCustomThemeForOccasion(selectedTheme || draft.current.design?.theme, initialOccasion).id }, template.defaultDesign));
  const coverUploadAllowed = canUploadCustomCover(availableThemes.find(theme => theme.id === design.theme));
  const [settings, setSettings] = useState(() => normalizeGuestSettings({ ...guestPreviewDefaults, ...draft.current.settings, entrance: entranceStyles.includes(draft.current.settings?.entrance) ? draft.current.settings.entrance : guestPreviewDefaults.entrance, motion: guestPreviewDefaults.motion, openingEffect: guestPreviewDefaults.openingEffect }));
  const [noteSettings, setNoteSettings] = useState(() => normalizeGuestNoteSettings(draft.current.noteSettings));
  const [coverFile, setCoverFile] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [photoError, setPhotoError] = useState(false);
  const [guestPreview, setGuestPreview] = useState(false);
  const [previewCycle, setPreviewCycle] = useState(0);
  const mediaUrls = useRef(new Set());
  const previewPane = useRef(null);
  const previewDocument = useRef(null);
  const formPanel = useRef(null);
  const formHeading = useRef(null);
  const previousFormStep = useRef(null);
  const previewScrollFrame = useRef(null);
  const defaultTitle = occasion?.defaultTitle[language] ?? (captionValue("invitations.pages.CustomInvitationPage.caption4", language));
  const needsOccasionChoice = !customizableOccasions.includes(template.subcategory);
  const steps = [...(needsOccasionChoice && !initialOccasion ? ["occasion"] : []), ...(!selectedTheme ? ["designStep"] : []), "basics", "moments", "galleryStep", "wording", "experience", "openingStep", "footerStep", "review"];
  const currentStep = editingDesign ? "designStep" : steps[Math.min(step, steps.length - 1)];
  const optionalStep = ["galleryStep", "wording"].includes(currentStep);
  const currentStepLabel = item => {
    const moment = item.startsWith("moment:") ? moments.find(moment => `moment:${moment.id}` === item) : null;
    return moment ? (language === "ka" ? moment.ka : moment.en) : ux.steps[item] || w[item];
  };
  const activeMoment = currentStep.startsWith("moment:") ? moments.find(item => `moment:${item.id}` === currentStep) : null;
  const stepPreviewTarget = activeMoment ? `[data-moment-id="${CSS.escape(activeMoment.id)}"]` : {
    moments: "#guest-custom-moments", galleryStep: "#guest-photos", wording: "[data-section=message]", experience: "#guest-rsvp", footerStep: ".guest-footer",
  }[currentStep] ?? "#guest-invitation";
  const scrollPreviewTo = useCallback(selector => {
    cancelAnimationFrame(previewScrollFrame.current);
    previewScrollFrame.current = requestAnimationFrame(() => {
      if (!window.matchMedia("(min-width: 721px)").matches) return;
      const doc = previewDocument.current;
      if (!doc) return;
      const section = doc.querySelector(selector);
      if (!section) return;
      const win = doc.defaultView;
      const rect = section.getBoundingClientRect();
      const top = Math.max(0, win.scrollY + rect.top - 16);
      if (Math.abs(win.scrollY - top) < 20) return;
      win.scrollTo({ top, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
    });
  }, []);
  useEffect(() => {
    scrollPreviewTo(stepPreviewTarget);
    return () => cancelAnimationFrame(previewScrollFrame.current);
  }, [stepPreviewTarget, guestPreview, view, scrollPreviewTo]);
  useEffect(() => {
    setFormError("");
    formPanel.current?.scrollTo({ top: 0, behavior: "instant" });
    if (previousFormStep.current !== null && previousFormStep.current !== currentStep) {
      formHeading.current?.focus({ preventScroll: true });
      const section = formPanel.current?.closest(".custom-builder-sidebar");
      if (section) {
        const rect = section.getBoundingClientRect();
        const actionsHeight = document.querySelector(".custom-builder-actions")?.getBoundingClientRect().height ?? 80;
        const availableHeight = window.innerHeight - actionsHeight;
        const inset = Math.max(24, (availableHeight - rect.height) / 2);
        window.scrollTo({ top: Math.max(0, window.scrollY + rect.top - inset), behavior: "instant" });
      }
    }
    previousFormStep.current = currentStep;
  }, [currentStep]);
  function followFormInteraction(event) {
    const control = event.target.closest("input, select, textarea, button, summary");
    if (!control?.closest(".custom-builder-panel")) return;
    scrollPreviewTo(control.closest("[data-preview-target]")?.dataset.previewTarget ?? stepPreviewTarget);
  }
  const displayDate = formatInvitationDate(fields.date, language);
  const suggestedInitials = getWaxInitials(fields.title);
  const initials = { first: fields.initialFirst, second: fields.initialSecond };
  const sealMonogram = getWaxMonogram(fields.title, initials);
  const chronologicalMoments = sortMomentsByTime(moments);
  const sample = { ...fields, title: fields.title || defaultTitle, initials, displayDate, date: fields.date || (captionValue("invitations.pages.CustomInvitationPage.caption5", language)), time: chronologicalMoments.find(item => item.time && !item.unknownTime)?.time || fields.time, location: chronologicalMoments.find(item => item.venue)?.venue || fields.location || (captionValue("invitations.pages.CustomInvitationPage.caption6", language)), name: fields.title || defaultTitle };

  useEffect(() => {
    try { localStorage.setItem(`1111-custom-draft-v1:${template.slug}`, JSON.stringify({ eventType, occasionMoments: { ...occasionMoments.current, [eventType]: moments }, fields, moments, design: { ...design, coverImage: "" }, settings, noteSettings, weddingParty, dayPlan: [] })); } catch { /* Continue in memory. */ }
  }, [template.slug, eventType, fields, moments, design, settings, noteSettings, weddingParty]);

  useEffect(() => {
    let active = true;
    Promise.all([getDraftMedia(`custom-cover:${template.slug}`), getDraftMedia(`custom-gallery:${template.slug}`)]).then(([cover, gallery]) => {
      if (!active) return;
      if (cover instanceof File) {
        const url = URL.createObjectURL(cover); mediaUrls.current.add(url); setCoverFile(cover); setDesign(current => ({ ...current, coverImage: url }));
      }
      if (Array.isArray(gallery)) setPhotos(gallery.filter(file => file instanceof File).slice(0, 10).map(file => {
        const src = URL.createObjectURL(file); mediaUrls.current.add(src); return { id: globalThis.crypto?.randomUUID?.() ?? `photo-${Date.now()}-${Math.random()}`, src, file, name: file.name };
      }));
    }).catch(() => {});
    const urls = mediaUrls.current;
    return () => { active = false; urls.forEach(url => URL.revokeObjectURL(url)); urls.clear(); };
  }, [template.slug]);

  function updateSettings(patch) { setSettings(current => normalizeGuestSettings({ ...current, ...patch })); }
  function updateDesign(patch) {
    setDesign(current => normalizeCustomDesign({
      ...current,
      ...patch,
      theme: Object.hasOwn(patch, "theme") ? patch.theme : current.theme,
    }, template.defaultDesign));
  }
  function chooseOccasion(value) {
    if (value === eventType) return;
    occasionMoments.current[eventType] = moments;
    setEventType(value);
    updateDesign({ theme: getCustomThemeForOccasion(design.theme, value).id, footerScene: "none", showFooter: false });
    setMoments(normalizeMoments(occasionMoments.current[value], value));
    setCustomMomentName("");
    setStep(0);
  }
  function updateField(key, value) { setFields(current => ({ ...current, [key]: value })); }
  function updateMoment(id, patch) { setMoments(current => current.map(item => item.id === id ? { ...item, ...patch } : item)); }
  function toggleMoment([id, en, ka]) {
    setMoments(current => current.some(item => item.id === id) ? current.filter(item => item.id !== id) : [...current, { id, en, ka, time: "", unknownTime: false, venue: "", mapUrl: "" }]);
  }
  function addCustomMoment() {
    const name = customMomentName.trim();
    if (!name || moments.length >= 12) return;
    setMoments(current => [...current, { id: `custom-${globalThis.crypto?.randomUUID?.() ?? Date.now()}`, en: name, ka: name, time: "", unknownTime: false, venue: "", mapUrl: "" }]);
    setCustomMomentName("");
  }
  function validImage(file) { return file && photoTypes.includes(file.type) && file.size <= MAX_PHOTO_BYTES; }
  function chooseCover(event) {
    const file = event.target.files?.[0]; event.target.value = "";
    if (!file) return;
    if (!validImage(file)) { setPhotoError(true); return; }
    if (design.coverImage) { URL.revokeObjectURL(design.coverImage); mediaUrls.current.delete(design.coverImage); }
    const coverImage = URL.createObjectURL(file); mediaUrls.current.add(coverImage);
    setCoverFile(file); updateDesign({ coverImage }); setPhotoError(false);
    saveDraftMedia(`custom-cover:${template.slug}`, file).catch(() => {});
  }
  function removeCover() {
    if (design.coverImage) { URL.revokeObjectURL(design.coverImage); mediaUrls.current.delete(design.coverImage); }
    setCoverFile(null); updateDesign({ coverImage: "" }); removeDraftMedia(`custom-cover:${template.slug}`).catch(() => {});
  }
  function choosePhotos(event) {
    const files = Array.from(event.target.files ?? []); event.target.value = "";
    const galleryLimit = Math.min(10, MAX_GALLERY_PHOTOS);
    const valid = files.filter(validImage).slice(0, galleryLimit - photos.length);
    setPhotoError(valid.length !== files.length);
    if (!valid.length) return;
    const next = [...photos, ...valid.map(file => { const src = URL.createObjectURL(file); mediaUrls.current.add(src); return { id: globalThis.crypto?.randomUUID?.() ?? `photo-${Date.now()}-${Math.random()}`, src, file, name: file.name }; })];
    setPhotos(next); updateSettings({ gallery: true }); saveDraftMedia(`custom-gallery:${template.slug}`, next.map(photo => photo.file)).catch(() => {});
  }
  function removePhoto(id) {
    const photo = photos.find(item => item.id === id); if (photo) { URL.revokeObjectURL(photo.src); mediaUrls.current.delete(photo.src); }
    const next = photos.filter(item => item.id !== id); setPhotos(next); saveDraftMedia(`custom-gallery:${template.slug}`, next.map(item => item.file)).catch(() => {});
  }
  function advanceStep() {
    if (currentStep === "basics" && (!fields.title.trim() || !fields.date)) {
      const missingTitle = !fields.title.trim();
      setFormError(missingTitle ? ux.titleError : ux.dateError);
      formPanel.current?.querySelector(missingTitle ? "input[type=text]" : "input[type=date]")?.focus();
      return;
    }
    setFormError("");
    setStep(value => value + 1);
  }
  function preview() { setPreviewCycle(value => value + 1); setGuestPreview(true); window.scrollTo({ top: 0, behavior: "instant" }); }
  const invitationPreview = <GuestCardSuite key={`${template.slug}:${guestPreview ? `preview-${previewCycle}` : "edit"}`} template={{ ...template, subcategory: eventType || template.subcategory }} sample={sample} customDesign={design} moments={moments} city={fields.city} weddingParty={isWedding ? weddingParty : []} copyTranslations={{}} editableFields={[]} settings={settings} photos={photos} noteSettings={noteSettings} creator={!guestPreview} previewOpening={currentStep === "openingStep"} openingReplay={previewCycle} fullscreenCards showCreatorTools={false} mobile={!guestPreview || view === "mobile"} hasPortrait onSettingsChange={updateSettings} onNoteSettingsChange={value => setNoteSettings(normalizeGuestNoteSettings(value))} galleryTools={{ onChoose: choosePhotos, onRemove: removePhoto, onReset: () => { photos.forEach(photo => { URL.revokeObjectURL(photo.src); mediaUrls.current.delete(photo.src); }); setPhotos([]); removeDraftMedia(`custom-gallery:${template.slug}`).catch(() => {}); }, count: photos.length, photoError, samplePhotos: false }} />;
  const content = <div className={`guest-preview-page custom-builder-page${guestPreview ? " is-guest-preview" : ""}`} data-preview-mode={view}>
    {guestPreview && <header className="guest-preview-toolbar custom-builder-toolbar">
      <Link className="guest-preview-back" to={`/order-online?occasion=${eventType === "christening" ? "christening" : "wedding"}`}><InvitationArtwork name="arrow-left" size={18} />{t("nav.orderOnline")}</Link>
      {guestPreview && <div className="guest-preview-device"><div className="guest-device-buttons" role="group" aria-label={t("guestCards.device")}>{["desktop", "mobile"].map(device => <button type="button" key={device} aria-pressed={view === device} onClick={() => setView(device)}>{l[device]}</button>)}</div></div>}
      {guestPreview && <div className="invitation-guest-preview-actions"><button type="button" onClick={() => setGuestPreview(false)}>{l.edit}</button><button type="button" onClick={() => setPreviewCycle(value => value + 1)}>{l.replay}</button></div>}
      {!guestPreview && <span className="custom-builder-wordmark">11:11</span>}
      {!guestPreview && <span className="custom-builder-save-hint">{ux.saved}</span>}
      <div className="custom-builder-header-preferences">
        {guestPreview && <button type="button" className={`appearance-switch is-${theme}`} onClick={toggleTheme}
          aria-label={t(theme === "dark" ? "appearance.switchLight" : "appearance.switchDark")}
          aria-pressed={theme === "light"} title={t(theme === "dark" ? "appearance.dark" : "appearance.light")}>
          <InvitationArtwork name={theme === "dark" ? "moon" : "sun"} size={20} />
        </button>}
        <button className="guest-preview-language" type="button" aria-label={captionValue("invitations.pages.CustomInvitationPage.caption7", language)} onClick={() => setLanguage((language === "ka" ? "en" : "ka"))}>{captionValue("invitations.pages.CustomInvitationPage.caption9", language)}</button>
      </div>
    </header>}
    {!guestPreview && <div className="custom-builder-site-intro"><Link to={`/order-online?occasion=${eventType === "christening" ? "christening" : "wedding"}`}><InvitationArtwork name="arrow-left" size={18} />{t("nav.orderOnline")}</Link><span>{ux.saved}</span></div>}

    <div className={`custom-builder-workspace${guestPreview ? " is-preview" : " is-form-only"}`}>
      {!guestPreview && <div className="custom-builder-flow-rail">
        <div className="custom-builder-flow-title"><h1>{captionValue("invitations.pages.CustomInvitationPage.caption10", language)}</h1><p>{availableThemes.find(item => item.id === design.theme)?.name[language] ?? design.theme}</p></div>
        {wideForm && <InvitationPhone documentRef={previewDocument} className="custom-builder-iphone" resetKey={`${currentStep}:${settings.entrance}:${previewCycle}`}>{invitationPreview}</InvitationPhone>}
        <button className="custom-builder-steps-toggle" type="button" aria-expanded={stepsExpanded} aria-controls="invitation-form-steps" onClick={() => setStepsExpanded(value => !value)}>{captionValue("invitations.pages.CustomInvitationPage.caption11", language)}<span>{step + 1} / {steps.length}</span><InvitationArtwork name="chevron-down" size={16} /></button>
          <nav id="invitation-form-steps" className="custom-builder-stepper" hidden={wideForm || !stepsExpanded} aria-label={captionValue("invitations.pages.CustomInvitationPage.caption12", language)}>
            {steps.map((item, index) => <button type="button" key={item} aria-current={item === currentStep ? "step" : undefined} disabled={!eventType && index > 0} onClick={() => { setEditingDesign(false); setStep(index); if (window.matchMedia("(max-width: 720px)").matches) setStepsExpanded(false); }}>
              <span aria-hidden="true">{index < step ? <InvitationArtwork name="check" size={14} /> : index + 1}</span><span>{currentStepLabel(item)}</span>
            </button>)}
          </nav>      </div>}
      {!guestPreview && <aside className="custom-builder-sidebar" onFocusCapture={followFormInteraction} onClickCapture={followFormInteraction} onChangeCapture={followFormInteraction}>

        <div className="custom-builder-navigation">
          <div className="custom-builder-navigation-summary">
            <div className="custom-builder-section-title"><h2 id="invitation-form-heading" ref={formHeading} tabIndex={-1}>{activeMoment ? `${w.moment}: ${language === "ka" ? activeMoment.ka : activeMoment.en}` : (w[currentStep] || ux.steps[currentStep])}</h2><span role="status" aria-live="polite">{captionValue("invitations.pages.CustomInvitationPage.caption13", language)} {step + 1} / {steps.length}</span>{optionalStep && <span className="custom-builder-optional-label">{w.optional}</span>}</div>

          </div>
          <div className="custom-builder-completion" role="progressbar" aria-label={captionValue("invitations.pages.CustomInvitationPage.caption14", language)} aria-valuemin={0} aria-valuemax={steps.length} aria-valuenow={step + 1}><span style={{ width: `${((step + 1) / steps.length) * 100}%` }} /></div>


        </div>

        <section className="custom-builder-panel" ref={formPanel} aria-labelledby="invitation-form-heading">
          {currentStep === "occasion" && <div className="custom-builder-fields"><p>{captionValue("invitations.pages.CustomInvitationPage.caption15", language)}</p>
            <fieldset className="custom-builder-occasion-choice"><legend>{captionValue("invitations.pages.CustomInvitationPage.caption16", language)}</legend><div className="custom-builder-moments">{occasionOptions.filter(option => customizableOccasions.includes(option.id)).map(option => <button key={option.id} type="button" aria-pressed={eventType === option.id} onClick={() => chooseOccasion(option.id)}>{option.name[language]}</button>)}</div></fieldset>
          </div>}
          {currentStep === "basics" && <div className="custom-builder-fields">
            <p>{(captionValue("invitations.pages.CustomInvitationPage.caption17", language))}</p>

            {eventType && <>
            <label>{occasion.titleLabel[language]}<small id="invitation-title-hint" className="custom-builder-field-hint">{occasion.titleHint[language]}</small><input aria-label={occasion.titleLabel[language]} aria-describedby="invitation-title-hint" type="text" maxLength="120" value={fields.title} onChange={event => updateField("title", event.target.value)} /></label>

            <label>{occasion.dateLabel[language]}<CreatorDateInput value={fields.date} language={language} label={occasion.dateLabel[language]} onChange={value => updateField("date", value)} /></label>
            <label>{w.city}<small id="invitation-city-hint" className="custom-builder-field-hint">{occasion.cityHint[language]}</small><input aria-label={w.city} aria-describedby="invitation-city-hint" autoComplete="address-level2" type="text" maxLength="120" value={fields.city} onChange={event => updateField("city", event.target.value)} /></label>
            {isWedding && <section className="custom-builder-initials-options"><h3 className="custom-builder-options-heading">{captionValue("invitations.pages.CustomInvitationPage.caption18", language)}</h3><fieldset className="custom-builder-initials"><legend>{captionValue("invitations.pages.CustomInvitationPage.caption19", language)}</legend>
              <p className="custom-builder-field-hint">{captionValue("invitations.pages.CustomInvitationPage.caption20", language)}</p>
              <div className="custom-builder-initials-row">
                <label>{captionValue("invitations.pages.CustomInvitationPage.caption21", language)}<input aria-label={captionValue("invitations.pages.CustomInvitationPage.caption22", language)} type="text" inputMode="text" maxLength="2" value={fields.initialFirst || suggestedInitials[0]} onChange={event => updateField("initialFirst", normalizeWaxInitial(event.target.value))} /></label>
                <label>{captionValue("invitations.pages.CustomInvitationPage.caption23", language)}<input aria-label={captionValue("invitations.pages.CustomInvitationPage.caption24", language)} type="text" inputMode="text" maxLength="2" value={fields.initialSecond || suggestedInitials[1]} onChange={event => updateField("initialSecond", normalizeWaxInitial(event.target.value))} /></label>
                <output aria-label={captionValue("invitations.pages.CustomInvitationPage.caption25", language)}>{sealMonogram || "—"}</output>
              </div>
              {(fields.initialFirst || fields.initialSecond) && <button type="button" className="custom-builder-initials-reset" onClick={() => setFields(current => ({ ...current, initialFirst: "", initialSecond: "" }))}>{captionValue("invitations.pages.CustomInvitationPage.caption26", language)}</button>}
            </fieldset></section>}
            </>}
          </div>}
          {currentStep === "moments" && <div className="custom-builder-fields"><p>{ux.scheduleHint}</p><div className="custom-builder-moments">{getMomentPresets(eventType).map(preset => <button key={preset[0]} type="button" aria-pressed={moments.some(item => item.id === preset[0])} onClick={() => toggleMoment(preset)}><span>{language === "ka" ? preset[2] : preset[1]}</span>{moments.some(item => item.id === preset[0]) && <InvitationArtwork name="check" size={16} />}</button>)}</div><section className="custom-builder-extra-options"><h3 className="custom-builder-options-heading">{ux.moreEvent}</h3><label>{w.customMoment}<input type="text" value={customMomentName} maxLength="100" onChange={event => setCustomMomentName(event.target.value)} onKeyDown={event => { if (event.key === "Enter") { event.preventDefault(); addCustomMoment(); } }} /></label><button className="custom-builder-add" type="button" onClick={addCustomMoment} disabled={!customMomentName.trim() || moments.length >= 12}><InvitationArtwork name="plus" size={18} /> {w.addMoment}</button></section>{moments.filter(item => item.id.startsWith("custom-")).map(item => <button key={item.id} className="custom-builder-link" type="button" onClick={() => setMoments(current => current.filter(moment => moment.id !== item.id))}><small className="custom-builder-moment-order">{String(moments.findIndex(moment => moment.id === item.id) + 1).padStart(2, "0")}</small>{language === "ka" ? item.ka : item.en} <InvitationArtwork name="close" size={16} /></button>)}</div>}
          {currentStep === "moments" && moments.map(activeMoment => <fieldset key={activeMoment.id} className="custom-builder-fields custom-builder-event-details"><legend>{language === "ka" ? activeMoment.ka : activeMoment.en}</legend><p>{ux.timeHint}</p><label className="custom-builder-toggle">{ux.unknown}<input type="checkbox" checked={activeMoment.unknownTime} onChange={event => updateMoment(activeMoment.id, { unknownTime: event.target.checked, time: event.target.checked ? "" : activeMoment.time })} /></label><div className="custom-builder-time"><label>{w.hour}<select value={activeMoment.time?.slice(0, 2) ?? ""} onChange={event => updateMoment(activeMoment.id, { unknownTime: !event.target.value, time: event.target.value ? `${event.target.value}:${activeMoment.time?.slice(3) || "00"}` : "" })}><option value="">—</option>{Array.from({ length: 24 }, (_, index) => String(index).padStart(2, "0")).map(hour => <option key={hour} value={hour}>{hour}</option>)}</select></label><label>{w.minute}<select value={activeMoment.time?.slice(3) || "00"} onChange={event => updateMoment(activeMoment.id, { unknownTime: false, time: `${activeMoment.time?.slice(0, 2) || "12"}:${event.target.value}` })}>{Array.from({ length: 60 }, (_, index) => String(index).padStart(2, "0")).map(minute => <option key={minute} value={minute}>:{minute}</option>)}</select></label></div><label>{ux.venue}<input type="text" maxLength="160" value={activeMoment.venue} onChange={event => updateMoment(activeMoment.id, { venue: event.target.value })} /></label><section className="custom-builder-extra-options"><h3 className="custom-builder-options-heading">{ux.eventExtras}</h3><label>{captionValue("invitations.pages.CustomInvitationPage.caption27", language)}<input type="text" value={language === "ka" ? activeMoment.ka : activeMoment.en} maxLength="100" onChange={event => updateMoment(activeMoment.id, { [language]: event.target.value })} /></label><label>{w.mapUrl}<input type="url" value={activeMoment.mapUrl} onChange={event => updateMoment(activeMoment.id, { mapUrl: event.target.value })} placeholder="https://maps.google.com/..." /></label></section><button className="custom-builder-link" type="button" onClick={() => setMoments(current => current.filter(item => item.id !== activeMoment.id))}>{w.removeMoment}</button></fieldset>)}
          {currentStep === "galleryStep" && <div className="custom-builder-fields"><p>{ux.galleryHint}</p>            {coverUploadAllowed && <><fieldset className="custom-builder-cover-choice" data-preview-target="#guest-invitation"><legend>{ux.cover}</legend><div><button type="button" aria-pressed={!coverFile} onClick={removeCover}><span className="custom-cover-choice-icon"><InvitationArtwork name="image" size={24} /></span><strong>{captionValue("invitations.pages.CustomInvitationPage.caption29", language)}</strong><small>{captionValue("invitations.pages.CustomInvitationPage.caption30", language)}</small></button><label className={coverFile ? "is-selected" : ""}>{design.coverImage ? <img src={design.coverImage} alt="" /> : <span className="custom-cover-choice-icon"><InvitationArtwork name="plus" size={24} /></span>}<strong>{captionValue("invitations.pages.CustomInvitationPage.caption31", language)}</strong><small>{coverFile ? (captionValue("invitations.pages.CustomInvitationPage.caption32", language)) : (captionValue("invitations.pages.CustomInvitationPage.caption33", language))}</small><input type="file" accept={photoTypes.join(",")} onChange={chooseCover} aria-label={w.uploadCover} /></label></div></fieldset>{coverFile && <div className="custom-builder-cover-tools" data-preview-target="#guest-invitation">{!availableThemes.find(theme => theme.id === design.theme)?.squarePhoto && !["couplePortrait", "couplePortraitDark"].includes(design.theme) && <fieldset className="custom-builder-photo-layout"><legend>{captionValue("invitations.pages.CustomInvitationPage.caption34", language)}</legend><div>{["full", "framed"].map(layout => <button type="button" key={layout} aria-pressed={design.photoLayout === layout} onClick={() => updateDesign({ photoLayout: layout, zoom: 100, rotation: 0 })}>{layout === "full" ? captionValue("invitations.pages.CustomInvitationPage.caption35", language) : captionValue("invitations.pages.CustomInvitationPage.caption36", language)}</button>)}</div></fieldset>}<button type="button" className="custom-builder-link" onClick={removeCover}>{l.remove}</button></div>}</>}

<h3 className="custom-builder-subheading">{ux.gallery}</h3><label className="custom-builder-upload">{w.uploadGallery}<input type="file" accept={photoTypes.join(",")} multiple disabled={photos.length >= 10} onChange={choosePhotos} /><span className="custom-builder-upload-action">{captionValue("invitations.pages.CustomInvitationPage.caption37", language)}</span><small>{l.count.replace("{count}", photos.length).replace("{max}", 10)}</small></label>{photos.length > 0 && <div className="custom-builder-photo-list">{photos.map((photo, index) => <div key={photo.id}><img src={photo.src} alt="" /><button type="button" onClick={() => removePhoto(photo.id)} aria-label={`${l.remove}: ${index + 1}`}><InvitationArtwork name="close" size={16} /></button></div>)}</div>}</div>}
          {currentStep === "wording" && <div className="custom-builder-fields" data-preview-target="[data-section=message]">
            <p>{ux.messageHint}</p>
            <p className="custom-builder-field-hint">{captionValue("invitations.pages.CustomInvitationPage.caption38", language)}</p>
            <fieldset className="custom-builder-wording-group" data-preview-target="[data-section=message]"><legend>{ux.headline}</legend><p className="custom-builder-field-hint">{ux.headlineHint}</p>
              <div className="custom-builder-suggestions custom-builder-headline-suggestions">{wording.headlines.map(value => <button key={value} type="button" aria-pressed={fields.opening === value} onClick={() => updateField("opening", value)}>{value}</button>)}</div>
              <label className="custom-builder-own-words"><span>{captionValue("invitations.pages.CustomInvitationPage.caption39", language)}</span><input type="text" maxLength="120" value={fields.opening} onChange={event => updateField("opening", event.target.value)} /></label>
            </fieldset>
            <fieldset className="custom-builder-wording-group"><legend>{ux.message}</legend>
              <div className="custom-builder-suggestions custom-builder-message-suggestions">{wording.messages.map(value => <button key={value} type="button" aria-pressed={fields.line === value} onClick={() => updateField("line", value)}>{value}</button>)}</div>
              <label className="custom-builder-own-words"><span>{captionValue("invitations.pages.CustomInvitationPage.caption40", language)}</span><textarea rows="4" maxLength="500" value={fields.line} placeholder={captionValue("invitations.pages.CustomInvitationPage.caption41", language)} onChange={event => updateField("line", event.target.value)} /></label>
            </fieldset>
          </div>}
          {currentStep === "experience" && <div className="custom-builder-fields"><section className="custom-builder-response-section" data-preview-target="#guest-rsvp"><h3>{captionValue("invitations.pages.CustomInvitationPage.caption42", language)}</h3><p>{captionValue("invitations.pages.CustomInvitationPage.caption43", language)}</p><label className="custom-builder-toggle" data-preview-target="#guest-rsvp">{ux.rsvp}<input type="checkbox" checked={settings.rsvp} onChange={event => updateSettings({ rsvp: event.target.checked })} /></label>{settings.rsvp && <label data-preview-target="#guest-rsvp">{captionValue("invitations.pages.CustomInvitationPage.caption44", language)}<CreatorDateInput value={settings.rsvpDeadline} language={language} label={captionValue("invitations.pages.CustomInvitationPage.caption45", language)} onChange={value => updateSettings({ rsvpDeadline: value })} /><span className="custom-builder-field-hint">{captionValue("invitations.pages.CustomInvitationPage.caption46", language)}</span></label>}{settings.rsvp && <label data-preview-target="#guest-rsvp">{ux.companions}<select value={settings.companions} onChange={event => updateSettings({ companions: Number(event.target.value) })}>{[0,1,2,3,4,5].map(value => <option key={value} value={value}>{value}</option>)}</select></label>}</section><section className="custom-builder-response-section" data-preview-target="#guest-notes"><h3>{captionValue("invitations.pages.CustomInvitationPage.caption47", language)}</h3><p>{captionValue("invitations.pages.CustomInvitationPage.caption48", language)}</p><label className="custom-builder-toggle" data-preview-target="#guest-notes">{ux.notes}<input type="checkbox" checked={noteSettings.enabled} onChange={event => setNoteSettings(current => normalizeGuestNoteSettings({ ...current, enabled: event.target.checked }))} /></label></section><section className="custom-builder-extra-options"><h3 className="custom-builder-options-heading">{ux.extras}</h3><label className="custom-builder-toggle">{captionValue("invitations.pages.CustomInvitationPage.caption49", language)}<input type="checkbox" checked={settings.music} onChange={event => updateSettings({ music: event.target.checked })} /></label>
            {isWedding && <fieldset className="custom-builder-wedding-party" data-preview-target="#guest-wedding-party"><legend>{captionValue("invitations.pages.CustomInvitationPage.caption50", language)}</legend>
              {weddingParty.map((person,index) => <div className="custom-builder-party-person" key={person.id}>
                <label>{captionValue("ui.invitations.pages.CustomInvitationPage.role", language, { value1: index + 1 })}<select value={person.role} onChange={event => setWeddingParty(current => current.map(p => p.id === person.id ? { ...p, role: event.target.value } : p))}>{weddingPartyRoles.map(role => <option key={role.id} value={role.id}>{role[language] ?? role.en}</option>)}</select></label>
                <label>{captionValue("ui.invitations.pages.CustomInvitationPage.fullName", language, { value1: index + 1 })}<input type="text" maxLength="120" value={person.name} onChange={event => setWeddingParty(current => current.map(p => p.id === person.id ? { ...p, name: event.target.value } : p))} /></label>
                <button type="button" className="custom-builder-link" onClick={() => setWeddingParty(current => current.filter(p => p.id !== person.id))}>{captionValue("ui.invitations.pages.CustomInvitationPage.removePerson", language, { value1: index + 1 })}</button>
              </div>)}
              <button type="button" className="custom-builder-party-add" disabled={weddingParty.length >= 20} onClick={() => { setWeddingParty(current => [...current, { id: crypto.randomUUID(), role: "bridesmaid", name: "" }]); scrollPreviewTo("#guest-wedding-party"); }}><InvitationArtwork name="plus" size={18} /> {captionValue("invitations.pages.CustomInvitationPage.caption51", language)}</button>
            </fieldset>}</section></div>}
          {currentStep === "designStep" && <div className="custom-builder-fields"><p>{w.chooseDesign}</p>
            <fieldset className="custom-builder-themes"><legend>{(eventType === "christening" ? captionValue("ui.invitations.pages.CustomInvitationPage.christeningDesigns", language) : captionValue("ui.invitations.pages.CustomInvitationPage.weddingDesignsUploadYourOwnCoverImage", language))}</legend><div>{availableThemes.map(theme => <button type="button" key={theme.id} aria-label={theme.name[language] ?? theme.name.en} aria-pressed={design.theme === theme.id} onClick={() => {
              updateDesign({ ...theme, scene: "", theme: theme.id, footerScene: design.footerScene, showFooter: design.showFooter });
              if (theme.embossedPaper) updateSettings({ entrance: `${theme.id}Envelope` });
            }}><WeddingThemePreview theme={theme} label={captionValue("invitations.pages.CustomInvitationPage.caption52", language)} /><span className="custom-theme-name">{theme.name[language] ?? theme.name.en}</span></button>)}</div></fieldset>


          </div>}
          {currentStep === "footerStep" && <div className="custom-builder-fields"><p>{ux.footerHint}</p>            <fieldset className="custom-builder-footer-scenes" data-preview-target=".guest-footer"><legend>{captionValue("invitations.pages.CustomInvitationPage.caption53", language)}</legend><div>{["none", ...Object.keys(footerScenes).filter(scene => eventType !== "christening" || ["church", "landscape"].includes(scene))].map(scene => <button type="button" key={scene} aria-pressed={scene === "none" ? !design.showFooter : design.showFooter && design.footerScene === scene} onClick={() => updateDesign({ footerScene: scene, showFooter: scene !== "none" })}>{scene === "none" ? <span className="custom-footer-none"><InvitationArtwork name="minus" size={20} /></span> : <img src={footerScenes[scene]} alt="" />}<span>{footerSceneNames[language]?.[scene] ?? footerSceneNames.en[scene]}</span></button>)}</div></fieldset></div>}
          {currentStep === "review" && <div className="custom-builder-fields"><p>{ux.reviewHint}</p><div className="custom-builder-review">
            <button type="button" onClick={() => setStep(steps.indexOf("basics"))}><span className="custom-builder-review-answer"><strong>{fields.title || ux.empty}</strong><small>{[displayDate, fields.city].filter(Boolean).join(" · ") || ux.empty}</small></span><span>{ux.edit}</span></button>
            <button type="button" onClick={() => setEditingDesign(true)}><span className="custom-builder-review-answer"><strong>{ux.design}</strong><small>{availableThemes.find(theme => theme.id === design.theme)?.name[language] ?? design.theme}</small></span><span>{ux.edit}</span></button>
            <button type="button" onClick={() => setStep(steps.indexOf("moments"))}><span className="custom-builder-review-answer"><strong>{ux.steps.moments}</strong>{moments.length ? chronologicalMoments.map(item => <small key={item.id}>{language === "ka" ? item.ka : item.en} · {item.unknownTime || !item.time ? ux.unknown : item.time} · {item.venue || ux.empty}</small>) : <small>{ux.empty}</small>}</span><span>{ux.edit}</span></button>
            <button type="button" onClick={() => setStep(steps.indexOf("galleryStep"))}><span className="custom-builder-review-answer"><strong>{ux.steps.galleryStep}</strong><small>{coverFile ? `${ux.cover}: ${coverFile.name}. ` : ""}{photos.length ? `${ux.gallery}: ${photos.length}` : ux.noPhotos}</small></span><span>{ux.edit}</span></button>
            <button type="button" onClick={() => setStep(steps.indexOf("wording"))}><span className="custom-builder-review-answer"><strong>{ux.steps.wording}</strong><small>{fields.opening}</small><small>{fields.line || ux.noMessage}</small></span><span>{ux.edit}</span></button>
            <button type="button" onClick={() => setStep(steps.indexOf("experience"))}><span className="custom-builder-review-answer"><strong>{ux.steps.experience}</strong><small>{[settings.rsvp && ux.rsvp, noteSettings.enabled && ux.notes].filter(Boolean).join(" · ") || ux.empty}</small></span><span>{ux.edit}</span></button>
            <button type="button" onClick={() => setStep(steps.indexOf("openingStep"))}><span className="custom-builder-review-answer"><strong>{ux.steps.openingStep}</strong><small>{ux.openingReview}</small></span><span>{ux.edit}</span></button>
            <button type="button" onClick={() => setStep(steps.indexOf("footerStep"))}><span className="custom-builder-review-answer"><strong>{ux.steps.footerStep}</strong><small>{footerSceneNames[language]?.[design.showFooter ? design.footerScene : "none"] ?? footerSceneNames.en[design.showFooter ? design.footerScene : "none"]}</small></span><span>{ux.edit}</span></button>
          </div><p className="custom-builder-local-note">{w.noPublish}</p></div>}
          {currentStep === "openingStep" && <div className="custom-builder-fields"><section className="custom-builder-opening-preview"><button type="button" className="custom-builder-replay-opening" onClick={() => setPreviewCycle(value => value + 1)}>{l.replay}</button>{!wideForm && <InvitationPhone className="custom-builder-opening-phone" resetKey={`${settings.entrance}:${previewCycle}`}>{invitationPreview}</InvitationPhone>}<p>{captionValue("invitations.pages.CustomInvitationPage.caption54", language)}</p></section><p>{captionValue("invitations.pages.CustomInvitationPage.caption55", language)}</p><fieldset className="custom-builder-opening-choice" data-preview-target="#guest-invitation"><legend>{l.entrance}</legend><div>{entranceStyles.map(entrance => <button type="button" key={entrance} aria-pressed={settings.entrance === entrance} onClick={() => { updateSettings({ entrance }); setPreviewCycle(value => value + 1); if (!wideForm) document.querySelector(".custom-builder-opening-preview")?.scrollIntoView({ behavior: "smooth", block: "start" }); }}><span aria-hidden="true" className={`opening-mini opening-mini-${entrance}`}>{entrance === "immediate" && <WeddingThemePreview theme={availableThemes.find(theme => theme.id === design.theme) ?? availableThemes[0]} label={captionValue("invitations.pages.CustomInvitationPage.caption56", language)} />}</span><span>{entrance === "classicBurgundyEnvelope" ? captionValue("invitations.pages.CustomInvitationPage.caption57", language) : entrance === "ivoryPaperEnvelope" ? captionValue("invitations.pages.CustomInvitationPage.caption58", language) : entrance === "pastelGreenEnvelope" ? captionValue("invitations.pages.CustomInvitationPage.caption59", language) : entrance === "redPortraitEnvelope" ? captionValue("invitations.pages.CustomInvitationPage.caption60", language) : entrance === "redVelvetEnvelope" ? captionValue("invitations.pages.CustomInvitationPage.caption61", language) : entrance === "pinkPaperEnvelope" ? captionValue("invitations.pages.CustomInvitationPage.caption62", language) : entrance === "bluePaperEnvelope" ? captionValue("invitations.pages.CustomInvitationPage.caption63", language) : entrance === "embossedIvoryEnvelope" ? captionValue("invitations.pages.CustomInvitationPage.caption64", language) : entrance === "roseFiberEnvelope" ? captionValue("invitations.pages.CustomInvitationPage.caption65", language) : entrance === "greenLaceEnvelope" ? captionValue("invitations.pages.CustomInvitationPage.caption66", language) : entrance === "bordeauxLaceEnvelope" ? captionValue("invitations.pages.CustomInvitationPage.caption67", language) : entrance === "embossedBurgundyEnvelope" ? captionValue("invitations.pages.CustomInvitationPage.caption68", language) : entrance === "embossedSageEnvelope" ? captionValue("invitations.pages.CustomInvitationPage.caption69", language) : entrance === "envelope" ? captionValue("invitations.pages.CustomInvitationPage.caption70", language) : entrance === "doors" ? captionValue("invitations.pages.CustomInvitationPage.caption71", language) : entrance === "doorsBrown" ? captionValue("invitations.pages.CustomInvitationPage.caption72", language) : entrance === "doorsBlueFloral" ? captionValue("invitations.pages.CustomInvitationPage.caption73", language) : entrance === "stampedPaper" ? captionValue("invitations.pages.CustomInvitationPage.caption74", language) : l[entrance]}</span></button>)}</div></fieldset>{["pinkPaperEnvelope", "bluePaperEnvelope"].includes(settings.entrance) && <label className="custom-builder-toggle">{captionValue("invitations.pages.CustomInvitationPage.caption75", language)}<input type="checkbox" checked={settings.envelopeStamp} onChange={event => updateSettings({ envelopeStamp: event.target.checked })} /></label>}</div>}
          {optionalStep && <button type="button" className="custom-builder-skip" onClick={advanceStep}>{ux.skip}</button>}
          {formError && <p className="custom-builder-error" role="alert">{formError}</p>}
          {photoError && <p className="custom-builder-error" role="alert">{l.invalid}</p>}
        </section>
        <footer className="custom-builder-actions">{editingDesign ? <button type="button" onClick={() => setEditingDesign(false)}>{w.backToReview}</button> : <><button type="button" onClick={() => setStep(value => Math.max(0, value - 1))} disabled={step === 0}>{l.previous}</button>{step < steps.length - 1 ? <button type="button" disabled={!eventType} onClick={advanceStep}>{l.next}</button> : <button type="button" onClick={preview}>{w.viewFinal}</button>}</>}</footer>
      </aside>}
      {guestPreview && <div className="custom-builder-preview-pane" ref={previewPane}><div className={`guest-preview-stage is-${view}`}>{invitationPreview}</div></div>}
    </div>
    <p className="guest-preview-disclaimer">{w.noPublish}</p>
  </div>;
  return guestPreview ? content : <WebsiteLayout>{content}</WebsiteLayout>;
}

export default function CustomInvitationPage() {
  const { category } = useParams();
  const { t } = useLanguage();
  const template = getCustomTemplate(category);
  if (!template) return <main className="inner-page copy-page"><h1>{t("invitations.notFound.title")}</h1><Link to="/invitations">{t("invitations.allInvitations")}</Link></main>;
  return <Builder key={category} template={template} />;
}
