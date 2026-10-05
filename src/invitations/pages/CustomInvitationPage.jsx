import CreatorDateInput from "../components/CreatorDateInput.jsx";
import { formatInvitationDate } from "../data/invitationDate.js";
import { normalizeWeddingParty, weddingPartyRoles } from "../data/weddingParty.js";
import { WeddingThemePreview } from "../components/WeddingThemeDecoration.jsx";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Icon from "../../components/ui/Icon.jsx";
import { useLanguage } from "../../localization/LanguageContext.jsx";
import { useAppearance } from "../../appearance/AppearanceContext.jsx";
import GuestCardSuite from "../components/GuestCardSuite.jsx";
import { normalizeCustomDesign } from "../components/CustomInvitationCover.jsx";
import { getCustomTemplate } from "../data/customTemplates.js";
import { classicalThemes, footerScenes } from "../data/customClassicalThemes.js";
import { getDraftMedia, removeDraftMedia, saveDraftMedia } from "../data/draftMedia.js";
import { guestPreviewDefaults, MAX_GALLERY_PHOTOS, MAX_PHOTO_BYTES, normalizeGuestSettings, photoTypes } from "../data/guestCardDesign.js";
import { normalizeGuestNoteSettings } from "../data/guestNotes.js";
import { occasionOptions, occasionProfiles, getInitialOccasion, getOccasionWording } from "../data/customOccasions.js";
import { getMomentPresets, normalizeMoments, sortMomentsByTime } from "../data/customMoments.js";

const wizardLabels = {
  en: { occasion: "Your event type", basics: "Names & event details", moments: "Event moments", moment: "Time & place", cover: "Main photo", galleryStep: "More photos", wording: "Invitation words", experience: "Replies & wishes", designStep: "Your design", openingStep: "Opening effect", review: "Review your invitation", city: "City", selectMoments: "What will happen at your celebration?", addMoment: "Add another moment", customMoment: "Name another moment", unknownTime: "Time will be confirmed later", venue: "Venue name or address", mapUrl: "Exact Google Maps link (optional)", hour: "Hour", minute: "Minute", removeMoment: "Remove moment", uploadCover: "Choose a cover photo", uploadGallery: "Add gallery photos", zoom: "Photo zoom", rotation: "Photo rotation", chooseWording: "Choose a suggestion or write your own", headline: "Headline", invitationText: "Invitation message", previewNow: "View as a guest", viewFinal: "View final invitation", editStep: "Edit", reviewHint: "Review your choices, then open the invitation exactly as a guest would.", noPublish: "Your draft is saved on this device. Sharing is not available yet.", selected: "Selected", optional: "Optional", chooseDesign: "Choose a complete theme. Its colors, typography, frame and ornaments are already coordinated.", coverHint: "Add a photo to the first card, or keep the theme artwork. Both options work beautifully.", momentsHint: "Add the names, date, and city for your invitation.", galleryHint: "Add up to 10 images to the guest gallery.", skip: "Skip", backToReview: "Back to review", timeHint: "Choose the event time. If it is not confirmed yet, select “Time will be confirmed later”.", viewOpening: "View opening", saveLocal: "All changes save automatically on this device." },
  ka: { occasion: "ღონისძიების ტიპი", basics: "სახელები და დეტალები", moments: "დღის მოვლენები", moment: "დრო და ადგილი", cover: "მთავარი ფოტო", galleryStep: "სხვა ფოტოები", wording: "მოსაწვევის ტექსტი", experience: "პასუხები და მილოცვები", designStep: "შენი დიზაინი", openingStep: "გახსნის ეფექტი", review: "გადაამოწმე მოსაწვევი", city: "ქალაქი", selectMoments: "რა მოვლენები გექნებათ?", addMoment: "მოვლენის დამატება", customMoment: "სხვა მოვლენის სახელი", unknownTime: "დრო მოგვიანებით დაზუსტდება", venue: "ადგილის სახელი ან მისამართი", mapUrl: "Google Maps-ის ზუსტი ბმული (არასავალდებულო)", hour: "საათი", minute: "წუთი", removeMoment: "მოვლენის წაშლა", uploadCover: "მთავარი ფოტოს არჩევა", uploadGallery: "გალერეის ფოტოების დამატება", zoom: "ფოტოს გადიდება", rotation: "ფოტოს მოტრიალება", chooseWording: "აირჩიე ტექსტი ან დაწერე შენი", headline: "სათაური", invitationText: "მოწვევის ტექსტი", previewNow: "სტუმრის ხედით ნახვა", viewFinal: "საბოლოო მოსაწვევის ნახვა", editStep: "შეცვლა", reviewHint: "გადაამოწმე არჩევანი და ნახე მოსაწვევი ზუსტად ისე, როგორც სტუმარი.", noPublish: "მონახაზი ინახება ამ მოწყობილობაზე. გაზიარება ჯერ არ არის ხელმისაწვდომი.", selected: "არჩეულია", optional: "არასავალდებულო", chooseDesign: "აირჩიე თემა — ფერები, შრიფტი, ჩარჩო და ორნამენტები უკვე შეხამებულია.", coverHint: "პირველ ბარათზე შეგიძლია დაამატო ფოტო ან დატოვო თემის გაფორმება.", momentsHint: "მიუთითე მოსაწვევის სახელები, თარიღი და ქალაქი.", galleryHint: "სტუმრის გალერეაში დაამატე 10-მდე ფოტო.", skip: "გამოტოვება", backToReview: "გადახედვაზე დაბრუნება", timeHint: "მიუთითე ამ მოვლენის დრო. თუ ჯერ არ არის ცნობილი, მონიშნე „დრო მოგვიანებით დაზუსტდება“.", viewOpening: "გახსნის ნახვა", saveLocal: "ყველა ცვლილება ამ მოწყობილობაზე ავტომატურად ინახება." },
};
const footerSceneNames = {
  en: { none: "No footer", church: "Church in the hills", vineyard: "Vineyard valley", wine: "Wine celebration", grapes: "Grape vines", landscape: "Mountain landscape" },
  ka: { none: "ქვედა ნაწილის გარეშე", church: "ტაძარი მთებში", vineyard: "ვენახის ხეობა", wine: "ღვინის დღესასწაული", grapes: "ყურძნის ვაზი", landscape: "მთის პეიზაჟი" },
};
const labels = {
  en: { create: "Create your own design", intro: "Choose a theme and add your invitation words and photographs.", details: "Your celebration", design: "Your design", guests: "Guest experience", opening: "Opening & motion", name: "Names or event title", date: "Date", time: "Time", place: "Location", message: "A personal message", openingLine: "Small line above the title", photo: "Cover photo", remove: "Remove photo", position: "Photo position", frame: "Frame", color: "Color", pattern: "Pattern", font: "Typography", layout: "Text placement", photos: "Guest gallery photos", gallery: "Photo gallery", rsvp: "Attendance replies", notes: "Guest notes", detailsSection: "Date and place section", companions: "Extra guests per RSVP", entrance: "Opening style", effect: "Celebration effect", motion: "Page motion", preview: "Preview as a guest", edit: "Back to editing", replay: "Replay opening", previous: "Back", next: "Continue", saved: "Saved on this device", local: "Local visual draft. Sharing and collecting real responses can be added later.", invalid: "Choose a valid image under 8 MB.", count: "{count} of {max} photos", category: "Collection", schedule: "Day schedule (optional)", noPhoto: "Your design works with or without a cover photo.", more: "Choose the look of your original card.", guestsHint: "See how each section appears in the guest preview.", openingHint: "Envelope, doors and confetti are all available for your own design.", immediate: "Show card", envelope: "Envelope", doors: "Opening doors", bottom: "At the bottom", center: "Centered", serif: "Editorial", modern: "Modern", playful: "Playful", plain: "Clean", floral: "Florals", confetti: "Confetti", stars: "Stars", stripes: "Stripes", arch: "Arch", engraved: "Double arch", oval: "Oval", classic: "Classic", minimal: "Minimal", film: "Film", desktop: "Desktop", mobile: "Mobile", looks: "Choose a look", artwork: "Cover artwork", paper: "Paper", ornament: "Botanical ornament", none: "None", church: "Stone church", garden: "Garden reception", manor: "Evening manor", ivory: "Ivory cotton", rose: "Rose paper", navy: "Midnight paper", laurel: "Laurel branch" },
  ka: { create: "შექმენი საკუთარი დიზაინი", intro: "აირჩიე თემა და დაამატე ტექსტი და ფოტოები.", details: "შენი დღესასწაული", design: "შენი დიზაინი", guests: "სტუმრის გამოცდილება", opening: "გახსნა და მოძრაობა", name: "სახელები ან ღონისძიების სახელი", date: "თარიღი", time: "დრო", place: "ადგილი", message: "პირადი ტექსტი", openingLine: "მოკლე წარწერა სათაურის ზემოთ", photo: "ყდის ფოტო", remove: "ფოტოს წაშლა", position: "ფოტოს მდებარეობა", frame: "ჩარჩო", color: "ფერი", pattern: "ორნამენტი", font: "შრიფტი", layout: "ტექსტის განლაგება", photos: "გალერეის ფოტოები", gallery: "ფოტოების გალერეა", rsvp: "დასწრების დადასტურება", notes: "სტუმრის ჩანაწერები", detailsSection: "თარიღისა და ადგილის სექცია", companions: "დამატებითი სტუმრები", entrance: "გახსნის სტილი", effect: "სადღესასწაულო ეფექტი", motion: "გვერდის მოძრაობა", preview: "სტუმრის ხედით ნახვა", edit: "რედაქტირებაზე დაბრუნება", replay: "გახსნის გამეორება", previous: "უკან", next: "გაგრძელება", saved: "ამ მოწყობილობაზე ინახება", local: "ეს ლოკალური ვიზუალური მონახაზია. გაზიარება და პასუხების შეგროვება მოგვიანებით დაემატება.", invalid: "აირჩიე სწორი ფოტო 8 მბ-მდე.", count: "{count} / {max} ფოტო", category: "კოლექცია", schedule: "დღის განრიგი (არასავალდებულო)", noPhoto: "დიზაინი ფოტოს გარეშეც მუშაობს.", more: "აირჩიე შენი ორიგინალური ბარათის იერი.", guestsHint: "ნახე, როგორ გამოჩნდება თითოეული სექცია სტუმართან.", openingHint: "კონვერტი, კარები და კონფეტი შენი დიზაინისთვისაც ხელმისაწვდომია.", immediate: "ბარათის ჩვენება", envelope: "კონვერტი", doors: "გასახსნელი კარები", bottom: "ქვემოთ", center: "ცენტრში", serif: "კლასიკური", modern: "თანამედროვე", playful: "მხიარული", plain: "სუფთა", floral: "ყვავილები", confetti: "კონფეტი", stars: "ვარსკვლავები", stripes: "ზოლები", arch: "თაღი", engraved: "ორმაგი თაღი", oval: "ოვალური", classic: "კლასიკური", minimal: "მინიმალური", film: "ფირი", desktop: "კომპიუტერი", mobile: "მობილური", looks: "აირჩიე იერი", artwork: "ყდის გამოსახულება", paper: "ქაღალდი", ornament: "ბოტანიკური ორნამენტი", none: "გარეშე", church: "ქვის ტაძარი", garden: "ბაღის სუფრა", manor: "საღამოს სასახლე", ivory: "სპილოსძვლისფერი", rose: "ვარდისფერი ქაღალდი", navy: "ღამის ლურჯი", laurel: "დაფნის რტო" },
};

function readDraft(slug) {
  try { return JSON.parse(localStorage.getItem(`1111-custom-draft-v1:${slug}`)) ?? {}; } catch { return {}; }
}

function Builder({ template }) {
  const { t, language, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useAppearance();
  const l = labels[language] ?? labels.en;
  const w = wizardLabels[language] ?? wizardLabels.en;
  const draft = useRef(readDraft(template.slug));
  const initialOccasion = getInitialOccasion(template.subcategory, draft.current.eventType);
  const [eventType, setEventType] = useState(initialOccasion);
  const occasion = occasionProfiles[eventType];
  const wording = getOccasionWording(eventType, language);
  const isWedding = eventType === "wedding" || eventType === "pre-wedding";
  const occasionMoments = useRef(draft.current.occasionMoments ?? {});
  const [step, setStep] = useState(0);
  const [view, setView] = useState(() => window.matchMedia("(min-width: 721px)").matches ? "desktop" : "mobile");
  const [stepsExpanded, setStepsExpanded] = useState(false);
  const [fields, setFields] = useState(() => ({ title: "", date: "", time: "", location: "", city: "", line: "", opening: "", ...draft.current.fields }));
  const [moments, setMoments] = useState(() => initialOccasion || Array.isArray(draft.current.moments) ? normalizeMoments(draft.current.moments, initialOccasion || "parties") : []);
  const [weddingParty, setWeddingParty] = useState(() => normalizeWeddingParty(draft.current.weddingParty));
  const [customMomentName, setCustomMomentName] = useState("");
  const [design, setDesign] = useState(() => normalizeCustomDesign(draft.current.design, template.defaultDesign));
  const [settings, setSettings] = useState(() => normalizeGuestSettings({ ...guestPreviewDefaults, ...draft.current.settings, entrance: ["envelope", "portraitEnvelope", "doors", "doorsBrown", "immediate"].includes(draft.current.settings?.entrance) ? draft.current.settings.entrance : guestPreviewDefaults.entrance, motion: guestPreviewDefaults.motion, openingEffect: guestPreviewDefaults.openingEffect }));
  const [noteSettings, setNoteSettings] = useState(() => normalizeGuestNoteSettings(draft.current.noteSettings));
  const [coverFile, setCoverFile] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [momentImages, setMomentImages] = useState({});
  const [photoError, setPhotoError] = useState(false);
  const [guestPreview, setGuestPreview] = useState(false);
  const [previewCycle, setPreviewCycle] = useState(0);
  const mediaUrls = useRef(new Set());
  const previewPane = useRef(null);
  const formPanel = useRef(null);
  const formHeading = useRef(null);
  const previousFormStep = useRef(null);
  const previewScrollFrame = useRef(null);
  const defaultTitle = occasion?.defaultTitle[language] ?? (language === "ka" ? "შენი დღესასწაული" : "Your celebration");
  const needsOccasionChoice = template.subcategory === "all" || template.subcategory === "baby-kids";
  const steps = [...(needsOccasionChoice ? ["occasion"] : []), "designStep", "basics", "moments", ...moments.map(item => `moment:${item.id}`), "galleryStep", "wording", "experience", "review"];
  const currentStep = steps[Math.min(step, steps.length - 1)];
  const optionalStep = ["galleryStep", "wording"].includes(currentStep);
  const currentStepLabel = item => {
    const moment = item.startsWith("moment:") ? moments.find(moment => `moment:${moment.id}` === item) : null;
    return moment ? (language === "ka" ? moment.ka : moment.en) : w[item];
  };
  const activeMoment = currentStep.startsWith("moment:") ? moments.find(item => `moment:${item.id}` === currentStep) : null;
  const stepPreviewTarget = activeMoment ? `[data-moment-id="${CSS.escape(activeMoment.id)}"]` : {
    moments: "#guest-custom-moments", galleryStep: "#guest-photos", wording: "[data-section=message]", experience: "#guest-rsvp",
  }[currentStep] ?? "#guest-invitation";
  const scrollPreviewTo = useCallback(selector => {
    cancelAnimationFrame(previewScrollFrame.current);
    previewScrollFrame.current = requestAnimationFrame(() => {
      if (!window.matchMedia("(min-width: 721px)").matches) return;
      const pane = previewPane.current;
      if (!pane || pane.closest(".is-preview")) return;
      const section = pane.querySelector(selector);
      if (!section) return;
      const paneRect = pane.getBoundingClientRect();
      const sectionRect = section.getBoundingClientRect();
      const visibleHeight = Math.min(sectionRect.height, pane.clientHeight - 32);
      if (sectionRect.top >= paneRect.top && sectionRect.top + visibleHeight <= paneRect.bottom) return;
      pane.scrollTo({ top: Math.max(0, pane.scrollTop + sectionRect.top - paneRect.top - 16),
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
    });
  }, []);
  useEffect(() => {
    scrollPreviewTo(stepPreviewTarget);
    return () => cancelAnimationFrame(previewScrollFrame.current);
  }, [stepPreviewTarget, guestPreview, view, scrollPreviewTo]);
  useEffect(() => {
    formPanel.current?.scrollTo({ top: 0, behavior: "instant" });
    if (previousFormStep.current !== null && previousFormStep.current !== currentStep) {
      formHeading.current?.focus({ preventScroll: true });
      if (window.matchMedia("(max-width: 720px)").matches) {
        window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
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
  const chronologicalMoments = sortMomentsByTime(moments);
  const sample = { ...fields, title: fields.title || defaultTitle, displayDate, date: fields.date || (language === "ka" ? "შეიყვანე თარიღი" : "Add a date"), time: chronologicalMoments.find(item => item.time && !item.unknownTime)?.time || fields.time, location: chronologicalMoments.find(item => item.venue)?.venue || fields.location || (language === "ka" ? "შეიყვანე ადგილი" : "Add a place"), name: fields.title || defaultTitle };

  useEffect(() => {
    try { localStorage.setItem(`1111-custom-draft-v1:${template.slug}`, JSON.stringify({ eventType, occasionMoments: { ...occasionMoments.current, [eventType]: moments }, fields, moments, design: { ...design, coverImage: "" }, settings, noteSettings, weddingParty, dayPlan: [] })); } catch { /* Continue in memory. */ }
  }, [template.slug, eventType, fields, moments, design, settings, noteSettings, weddingParty]);

  useEffect(() => {
    let active = true;
    Promise.all([getDraftMedia(`custom-cover:${template.slug}`), getDraftMedia(`custom-gallery:${template.slug}`), getDraftMedia(`custom-details:${template.slug}`)]).then(([cover, gallery, detailImages]) => {
      if (!active) return;
      if (cover instanceof File) {
        const url = URL.createObjectURL(cover); mediaUrls.current.add(url); setCoverFile(cover); setDesign(current => ({ ...current, coverImage: url }));
      }
      if (detailImages && typeof detailImages === "object") {
        setMomentImages(Object.fromEntries(Object.entries(detailImages).filter(([, file]) => file instanceof File && validImage(file)).map(([id, file]) => {
          const src = URL.createObjectURL(file); mediaUrls.current.add(src);
          return [id, { src, file, name: file.name }];
        })));
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
  function saveMomentImages(next) {
    setMomentImages(next);
    saveDraftMedia(`custom-details:${template.slug}`, Object.fromEntries(Object.entries(next).map(([id, image]) => [id, image.file]))).catch(() => {});
  }
  function chooseMomentImage(id, event) {
    const file = event.target.files?.[0]; event.target.value = "";
    if (!file) return;
    if (!validImage(file)) { setPhotoError(true); return; }
    const previous = momentImages[id];
    if (previous) { URL.revokeObjectURL(previous.src); mediaUrls.current.delete(previous.src); }
    const src = URL.createObjectURL(file); mediaUrls.current.add(src);
    saveMomentImages({ ...momentImages, [id]: { src, file, name: file.name } });
    setPhotoError(false);
  }
  function removeMomentImage(id) {
    const previous = momentImages[id];
    if (previous) { URL.revokeObjectURL(previous.src); mediaUrls.current.delete(previous.src); }
    const next = { ...momentImages }; delete next[id]; saveMomentImages(next);
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
  function preview() { setPreviewCycle(value => value + 1); setGuestPreview(true); window.scrollTo({ top: 0, behavior: "instant" }); }
  return <main className="guest-preview-page custom-builder-page" data-preview-mode={view}>
    <header className="guest-preview-toolbar custom-builder-toolbar">
      <Link className="guest-preview-back" to={template.subcategory === "all" ? "/invitations" : `/invitations?category=${template.subcategory}`}><Icon name="arrow-left" size={18} />{template.subcategory === "all" ? t("invitations.all") : t(`common.${template.subcategory}`)}</Link>
      <div className="guest-preview-device"><div className="guest-device-buttons" role="group" aria-label={t("guestCards.device")}>{["desktop", "mobile"].map(device => <button type="button" key={device} aria-pressed={view === device} onClick={() => setView(device)}>{l[device]}</button>)}</div></div>
      {guestPreview && <div className="invitation-guest-preview-actions"><button type="button" onClick={() => setGuestPreview(false)}>{l.edit}</button><button type="button" onClick={() => setPreviewCycle(value => value + 1)}>{l.replay}</button></div>}
      <div className="custom-builder-header-preferences">
        <button type="button" className={`appearance-switch is-${theme}`} onClick={toggleTheme}
          aria-label={t(theme === "dark" ? "appearance.switchLight" : "appearance.switchDark")}
          aria-pressed={theme === "light"} title={t(theme === "dark" ? "appearance.dark" : "appearance.light")}>
          <Icon name={theme === "dark" ? "moon" : "sun"} size={20} />
        </button>
        <button className="guest-preview-language" type="button" aria-label={language === "ka" ? "Switch to English" : "ქართულზე გადართვა"} onClick={() => setLanguage(language === "ka" ? "en" : "ka")}>{language === "ka" ? "EN" : "KA"}</button>
      </div>
    </header>

    <div className={`custom-builder-workspace${guestPreview ? " is-preview" : ""}`}>
      {!guestPreview && <aside className="custom-builder-sidebar" onFocusCapture={followFormInteraction} onClickCapture={followFormInteraction} onChangeCapture={followFormInteraction}>

        <div className="custom-builder-navigation">
          <div className="custom-builder-navigation-summary">
            <div className="custom-builder-section-title"><h2 id="invitation-form-heading" ref={formHeading} tabIndex={-1}>{activeMoment ? `${w.moment}: ${language === "ka" ? activeMoment.ka : activeMoment.en}` : w[currentStep]}</h2><span role="status" aria-live="polite">{step + 1} / {steps.length}</span>{optionalStep && <span className="custom-builder-optional-label">{w.optional}</span>}</div>
            <button type="button" aria-expanded={stepsExpanded} aria-controls="invitation-form-steps" onClick={() => setStepsExpanded(value => !value)}>{language === "ka" ? "ყველა ნაბიჯი" : "All steps"}<Icon name="chevron-down" size={16} /></button>
          </div>
          <div className="custom-builder-completion" role="progressbar" aria-label={language === "ka" ? "მოსაწვევის შექმნის პროგრესი" : "Invitation creation progress"} aria-valuemin={0} aria-valuemax={steps.length} aria-valuenow={step + 1}><span style={{ width: `${((step + 1) / steps.length) * 100}%` }} /></div>
          <nav id="invitation-form-steps" className="custom-builder-stepper" hidden={!stepsExpanded} aria-label={language === "ka" ? "მოსაწვევის შექმნის ნაბიჯები" : "Invitation form steps"}>
            {steps.map((item, index) => <button type="button" key={item} aria-current={item === currentStep ? "step" : undefined} disabled={!eventType && index > 0} onClick={() => { setStep(index); if (window.matchMedia("(max-width: 720px)").matches) setStepsExpanded(false); }}>
              <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><span>{currentStepLabel(item)}</span>
            </button>)}
          </nav>

        </div>
        <section className="custom-builder-panel" ref={formPanel} aria-labelledby="invitation-form-heading">
          {currentStep === "occasion" && <div className="custom-builder-fields"><p>{language === "ka" ? "აირჩიე, რას აღნიშნავთ — კითხვებსა და დღის გეგმას თქვენს ღონისძიებას მოვარგებთ." : "Choose your occasion. We’ll tailor the questions and day plan to your event."}</p>
            <fieldset className="custom-builder-occasion-choice"><legend>{language === "ka" ? "რას აღნიშნავთ?" : "What are you celebrating?"}</legend><div className="custom-builder-moments">{occasionOptions.filter(option => template.subcategory === "all" || ["baby-kids", "christening"].includes(option.id)).map(option => <button key={option.id} type="button" aria-pressed={eventType === option.id} onClick={() => chooseOccasion(option.id)}>{option.name[language]}</button>)}</div></fieldset>
          </div>}
          {currentStep === "basics" && <div className="custom-builder-fields">
            <p>{w.momentsHint}</p>

            {eventType && <>
            <label>{occasion.titleLabel[language]}<small id="invitation-title-hint" className="custom-builder-field-hint">{occasion.titleHint[language]}</small><input aria-label={occasion.titleLabel[language]} aria-describedby="invitation-title-hint" type="text" maxLength="120" value={fields.title} onChange={event => updateField("title", event.target.value)} /></label>
            <label>{occasion.dateLabel[language]}<CreatorDateInput value={fields.date} language={language} label={occasion.dateLabel[language]} onChange={value => updateField("date", value)} /></label>
            <label>{w.city}<small id="invitation-city-hint" className="custom-builder-field-hint">{occasion.cityHint[language]}</small><input aria-label={w.city} aria-describedby="invitation-city-hint" autoComplete="address-level2" type="text" maxLength="120" value={fields.city} onChange={event => updateField("city", event.target.value)} /></label>
            </>}
          </div>}
          {currentStep === "moments" && <div className="custom-builder-fields"><p>{occasion?.momentsQuestion[language] ?? w.selectMoments}</p><p className="custom-builder-field-hint">{language === "ka" ? "ნომრები აჩვენებს დეტალების შევსების რიგს. ბარათზე მოვლენები დროის მიხედვით დალაგდება; დაუზუსტებელი დროები — ბოლოს." : "Numbers show the order for entering details. Cards arrange events by time, with unconfirmed times last."}</p><div className="custom-builder-moments">{getMomentPresets(eventType).map(preset => <button key={preset[0]} type="button" aria-pressed={moments.some(item => item.id === preset[0])} onClick={() => toggleMoment(preset)}><span>{language === "ka" ? preset[2] : preset[1]}</span>{moments.some(item => item.id === preset[0]) && <small className="custom-builder-moment-order" aria-label={language === "ka" ? `შევსების რიგი ${moments.findIndex(item => item.id === preset[0]) + 1}` : `Editing order ${moments.findIndex(item => item.id === preset[0]) + 1}`}>{String(moments.findIndex(item => item.id === preset[0]) + 1).padStart(2, "0")}</small>}</button>)}</div><label>{w.customMoment}<input type="text" value={customMomentName} maxLength="100" onChange={event => setCustomMomentName(event.target.value)} onKeyDown={event => { if (event.key === "Enter") { event.preventDefault(); addCustomMoment(); } }} /></label><button className="custom-builder-add" type="button" onClick={addCustomMoment} disabled={!customMomentName.trim() || moments.length >= 12}><Icon name="plus" size={18} /> {w.addMoment}</button>{moments.filter(item => item.id.startsWith("custom-")).map(item => <button key={item.id} className="custom-builder-link" type="button" onClick={() => setMoments(current => current.filter(moment => moment.id !== item.id))}><small className="custom-builder-moment-order">{String(moments.findIndex(moment => moment.id === item.id) + 1).padStart(2, "0")}</small>{language === "ka" ? item.ka : item.en} <Icon name="close" size={16} /></button>)}</div>}
          {activeMoment && <div className="custom-builder-fields"><p>{w.timeHint}</p><label>{language === "ka" ? "მოვლენის სახელი" : "Moment name"}<input type="text" value={language === "ka" ? activeMoment.ka : activeMoment.en} maxLength="100" onChange={event => updateMoment(activeMoment.id, { [language === "ka" ? "ka" : "en"]: event.target.value })} /></label><label className="custom-builder-toggle">{w.unknownTime}<input type="checkbox" checked={activeMoment.unknownTime} onChange={event => updateMoment(activeMoment.id, { unknownTime: event.target.checked, time: event.target.checked ? "" : activeMoment.time })} /></label><div className="custom-builder-time"><label>{w.hour}<select value={activeMoment.time?.slice(0, 2) ?? ""} onChange={event => updateMoment(activeMoment.id, { unknownTime: !event.target.value, time: event.target.value ? `${event.target.value}:${activeMoment.time?.slice(3) || "00"}` : "" })}><option value="">—</option>{Array.from({ length: 16 }, (_, index) => String(index + 8).padStart(2, "0")).map(hour => <option key={hour} value={hour}>{hour}</option>)}</select></label><label>{w.minute}<select value={activeMoment.time?.slice(3) || "00"} onChange={event => updateMoment(activeMoment.id, { unknownTime: false, time: `${activeMoment.time?.slice(0, 2) || "12"}:${event.target.value}` })}>{["00", "15", "30", "45"].map(minute => <option key={minute} value={minute}>:{minute}</option>)}</select></label></div><label>{w.venue}<input type="text" maxLength="160" value={activeMoment.venue} onChange={event => updateMoment(activeMoment.id, { venue: event.target.value })} /></label><label>{w.mapUrl}<input type="url" value={activeMoment.mapUrl} onChange={event => updateMoment(activeMoment.id, { mapUrl: event.target.value })} placeholder="https://maps.google.com/..." /></label><label className="custom-builder-upload">{language === "ka" ? "მოვლენის ფოტო (არასავალდებულო)" : "Event detail photo (optional)"}<input type="file" accept={photoTypes.join(",")} onChange={event => chooseMomentImage(activeMoment.id, event)} /><span className="custom-builder-upload-action">{language === "ka" ? "ფოტოს არჩევა · 8 მბ-მდე" : "Choose a photo · up to 8 MB"}</span><small>{language === "ka" ? "ეს ფოტო მხოლოდ ამ მოვლენის დეტალებში გამოჩნდება." : "This photo appears only in this event's details."}</small></label>{momentImages[activeMoment.id] && <div className="custom-builder-photo-list"><div><img src={momentImages[activeMoment.id].src} alt={language === "ka" ? "მოვლენის ფოტო" : "Event photo"} /><button type="button" onClick={() => removeMomentImage(activeMoment.id)} aria-label={l.remove}><Icon name="close" size={16} /></button></div></div>}<button className="custom-builder-link" type="button" onClick={() => { setMoments(current => current.filter(item => item.id !== activeMoment.id)); setStep(Math.max(1, step - 1)); }}>{w.removeMoment}</button></div>}
          {currentStep === "galleryStep" && <div className="custom-builder-fields"><p>{w.galleryHint}</p><label className="custom-builder-upload">{w.uploadGallery}<input type="file" accept={photoTypes.join(",")} multiple disabled={photos.length >= 10} onChange={choosePhotos} /><span className="custom-builder-upload-action">{language === "ka" ? "ფოტოების არჩევა · თითოეული 8 მბ-მდე" : "Choose photos · up to 8 MB each"}</span><small>{l.count.replace("{count}", photos.length).replace("{max}", 10)}</small></label>{photos.length > 0 && <div className="custom-builder-photo-list">{photos.map((photo, index) => <div key={photo.id}><img src={photo.src} alt="" /><button type="button" onClick={() => removePhoto(photo.id)} aria-label={`${l.remove}: ${index + 1}`}><Icon name="close" size={16} /></button></div>)}</div>}</div>}
          {currentStep === "wording" && <div className="custom-builder-fields" data-preview-target="[data-section=message]">
            <p>{w.chooseWording}</p>
            <fieldset className="custom-builder-wording-group"><legend>{w.invitationText}</legend>
              <div className="custom-builder-suggestions custom-builder-message-suggestions">{wording.messages.map(value => <button key={value} type="button" aria-pressed={fields.line === value} onClick={() => updateField("line", value)}>{value}</button>)}</div>
              <label className="custom-builder-own-words"><span>{language === "ka" ? "ან დაწერე შენი სიტყვებით" : "Or write it in your own words"}</span><textarea rows="4" maxLength="500" value={fields.line} placeholder={language === "ka" ? "შენი მოწვევის ტექსტი…" : "Your invitation message…"} onChange={event => updateField("line", event.target.value)} /></label>
            </fieldset>
            <fieldset className="custom-builder-wording-group" data-preview-target="#guest-invitation"><legend>{w.headline}</legend>
              <div className="custom-builder-suggestions custom-builder-headline-suggestions">{wording.headlines.map(value => <button key={value} type="button" aria-pressed={fields.opening === value} onClick={() => updateField("opening", value)}>{value}</button>)}</div>
              <label className="custom-builder-own-words"><span>{language === "ka" ? "ან დაწერე შენი სათაური" : "Or write your own headline"}</span><input type="text" maxLength="120" value={fields.opening} onChange={event => updateField("opening", event.target.value)} /></label>
            </fieldset>
          </div>}
          {currentStep === "experience" && <div className="custom-builder-fields"><p>{l.guestsHint}</p><label className="custom-builder-toggle" data-preview-target="#guest-rsvp">{l.rsvp}<input type="checkbox" checked={settings.rsvp} onChange={event => updateSettings({ rsvp: event.target.checked })} /></label>{settings.rsvp && <label data-preview-target="#guest-rsvp">{language === "ka" ? "პასუხის დადასტურების ბოლო თარიღი (არასავალდებულო)" : "RSVP deadline (optional)"}<CreatorDateInput value={settings.rsvpDeadline} language={language} label={language === "ka" ? "პასუხის დადასტურების ბოლო თარიღი" : "RSVP deadline"} onChange={value => updateSettings({ rsvpDeadline: value })} /><span className="custom-builder-field-hint">{language === "ka" ? "სტუმრები ამ თარიღს დასწრების ფორმის ზემოთ დაინახავენ." : "Guests will see this date above the attendance form."}</span></label>}<label className="custom-builder-toggle">{language === "ka" ? "კლასიკური მუსიკა" : "Classical music"}<input type="checkbox" checked={settings.music} onChange={event => updateSettings({ music: event.target.checked })} /></label><label className="custom-builder-toggle" data-preview-target="#guest-notes">{l.notes}<input type="checkbox" checked={noteSettings.enabled} onChange={event => setNoteSettings(current => normalizeGuestNoteSettings({ ...current, enabled: event.target.checked }))} /></label>{settings.rsvp && <label data-preview-target="#guest-rsvp">{l.companions}<select value={settings.companions} onChange={event => updateSettings({ companions: Number(event.target.value) })}>{[0,1,2,3,4,5].map(value => <option key={value} value={value}>{value}</option>)}</select></label>}<label className="custom-builder-toggle" data-preview-target="#guest-custom-moments, #guest-details">{l.detailsSection}<input type="checkbox" checked={settings.details} onChange={event => updateSettings({ details: event.target.checked })} /></label><label className="custom-builder-toggle" data-preview-target="#guest-photos">{l.gallery}<input type="checkbox" checked={settings.gallery} onChange={event => updateSettings({ gallery: event.target.checked })} /></label>
            {isWedding && <fieldset className="custom-builder-wedding-party" data-preview-target="#guest-wedding-party"><legend>{language === "ka" ? "მეჯვარეები (არასავალდებულო)" : "Wedding party (optional)"}</legend>
              {weddingParty.map((person,index) => <div className="custom-builder-party-person" key={person.id}>
                <label>{language === "ka" ? `როლი ${index + 1}` : `Role ${index + 1}`}<select value={person.role} onChange={event => setWeddingParty(current => current.map(p => p.id === person.id ? { ...p, role: event.target.value } : p))}>{weddingPartyRoles.map(role => <option key={role.id} value={role.id}>{role[language] ?? role.en}</option>)}</select></label>
                <label>{language === "ka" ? `სახელი და გვარი ${index + 1}` : `Full name ${index + 1}`}<input type="text" maxLength="120" value={person.name} onChange={event => setWeddingParty(current => current.map(p => p.id === person.id ? { ...p, name: event.target.value } : p))} /></label>
                <button type="button" className="custom-builder-link" onClick={() => setWeddingParty(current => current.filter(p => p.id !== person.id))}>{language === "ka" ? `წაშალე მეჯვარე ${index + 1}` : `Remove person ${index + 1}`}</button>
              </div>)}
              <button type="button" className="custom-builder-party-add" disabled={weddingParty.length >= 20} onClick={() => { setWeddingParty(current => [...current, { id: crypto.randomUUID(), role: "bridesmaid", name: "" }]); scrollPreviewTo("#guest-wedding-party"); }}><Icon name="plus" size={18} /> {language === "ka" ? "მეჯვარის დამატება" : "Add a person"}</button>
            </fieldset>}</div>}
          {currentStep === "designStep" && <div className="custom-builder-fields"><p>{w.chooseDesign}</p>
            <fieldset className="custom-builder-themes"><legend>{language === "ka" ? "თემები" : "Themes"}</legend><div>{classicalThemes.map(theme => <button type="button" key={theme.id} aria-label={theme.name[language] ?? theme.name.en} aria-pressed={design.theme === theme.id} onClick={() => updateDesign({ ...theme, scene: "", theme: theme.id, footerScene: design.footerScene, showFooter: design.showFooter })}><WeddingThemePreview theme={theme} label={language === "ka" ? "მოსაწვევი" : "Invitation"} /></button>)}</div></fieldset>

            <p>{w.coverHint}</p><fieldset className="custom-builder-cover-choice" data-preview-target="#guest-invitation"><legend>{l.artwork}</legend><div><button type="button" aria-pressed={!coverFile} onClick={removeCover}><span className="custom-cover-choice-icon"><Icon name="image" size={24} /></span><strong>{l.none}</strong><small>{l.noPhoto}</small></button><label className={coverFile ? "is-selected" : ""}>{design.coverImage ? <img src={design.coverImage} alt="" /> : <span className="custom-cover-choice-icon"><Icon name="plus" size={24} /></span>}<strong>{w.uploadCover}</strong><small>{coverFile ? (language === "ka" ? "ფოტო არჩეულია" : "Photo selected") : w.optional}</small><input type="file" accept={photoTypes.join(",")} onChange={chooseCover} aria-label={w.uploadCover} /></label></div></fieldset>{coverFile && <div className="custom-builder-cover-tools" data-preview-target="#guest-invitation">{!["couplePortrait", "couplePortraitDark"].includes(design.theme) && <fieldset className="custom-builder-photo-layout"><legend>{language === "ka" ? "ფოტოს განლაგება" : "Photo layout"}</legend><div>{["full", "framed"].map(layout => <button type="button" key={layout} aria-pressed={design.photoLayout === layout} onClick={() => updateDesign({ photoLayout: layout, zoom: 100, rotation: 0 })}>{layout === "full" ? language === "ka" ? "ფოტო მთელ ბარათზე" : "Full-card photo" : language === "ka" ? "ფოტო ჩარჩოში" : "Photo with frame"}</button>)}</div></fieldset>}<button type="button" className="custom-builder-link" onClick={removeCover}>{l.remove}</button></div>}

            <fieldset className="custom-builder-footer-scenes" data-preview-target=".guest-footer"><legend>{language === "ka" ? "ქვედა ნაწილი" : "Footer"}</legend><div>{["none", ...Object.keys(footerScenes)].map(scene => <button type="button" key={scene} aria-pressed={scene === "none" ? !design.showFooter : design.showFooter && design.footerScene === scene} onClick={() => updateDesign({ footerScene: scene, showFooter: scene !== "none" })}>{scene === "none" ? <span className="custom-footer-none"><Icon name="minus" size={20} /></span> : <img src={footerScenes[scene]} alt="" />}<span>{footerSceneNames[language]?.[scene] ?? footerSceneNames.en[scene]}</span></button>)}</div></fieldset>
          </div>}
          {currentStep === "review" && <div className="custom-builder-fields"><p>{w.reviewHint}</p><div className="custom-builder-review"><button type="button" onClick={() => setStep(steps.indexOf("basics"))}>{fields.title || defaultTitle}<span>{w.editStep}</span></button><button type="button" onClick={() => setStep(steps.indexOf("designStep"))}>{w.designStep} · {w.cover}: {coverFile ? <Icon name="check" size={16} /> : w.optional}<span>{w.editStep}</span></button><button type="button" onClick={() => setStep(steps.indexOf("moments"))}>{moments.length} {w.moments}<span>{w.editStep}</span></button><button type="button" onClick={() => setStep(steps.indexOf("galleryStep"))}>{w.galleryStep}: {photos.length}<span>{w.editStep}</span></button><button type="button" onClick={() => setStep(steps.indexOf("wording"))}>{w.wording}: {fields.line ? <Icon name="check" size={16} /> : w.optional}<span>{w.editStep}</span></button></div><fieldset className="custom-builder-opening-choice" data-preview-target="#guest-invitation"><legend>{l.entrance}</legend><div>{["envelope", "portraitEnvelope", "doors", "doorsBrown", "immediate"].map(entrance => <button type="button" key={entrance} aria-pressed={settings.entrance === entrance} onClick={() => updateSettings({ entrance })}><span aria-hidden="true" className={`opening-mini opening-mini-${entrance}`} /><span>{entrance === "portraitEnvelope" ? language === "ka" ? "სრული ბარათის კონვერტი" : "Full-card envelope" : entrance === "envelope" ? language === "ka" ? "არსებული კონვერტი" : "Current envelope" : entrance === "doors" ? language === "ka" ? "თეთრი კარები" : "White doors" : entrance === "doorsBrown" ? language === "ka" ? "ყავისფერი კარები" : "Brown doors" : l[entrance]}</span></button>)}</div></fieldset><p className="custom-builder-local-note">{w.noPublish}</p><button className="custom-builder-final" type="button" onClick={preview}>{w.viewFinal}</button></div>}
          {photoError && <p className="custom-builder-error" role="alert">{l.invalid}</p>}
        </section>
        <footer className="custom-builder-actions"><button type="button" onClick={() => setStep(value => Math.max(0, value - 1))} disabled={step === 0}>{l.previous}</button>{optionalStep && <button type="button" className="custom-builder-skip" onClick={() => setStep(value => value + 1)}>{w.skip}</button>}{step < steps.length - 1 && <button type="button" disabled={!eventType} onClick={() => setStep(value => value + 1)}>{l.next}</button>}</footer>
        {step < steps.length - 1 && <button className="custom-builder-mobile-preview" type="button" onClick={preview}>{w.previewNow}</button>}
      </aside>}
      <div className="custom-builder-preview-pane" ref={previewPane}><div className={`guest-preview-stage is-${view}`}><GuestCardSuite key={`${template.slug}:${guestPreview ? `preview-${previewCycle}` : "edit"}`} template={{ ...template, subcategory: eventType || template.subcategory }} sample={sample} customDesign={design} moments={moments} momentImages={momentImages} city={fields.city} weddingParty={isWedding ? weddingParty : []} copyTranslations={{}} editableFields={[]} settings={settings} photos={photos} noteSettings={noteSettings} creator={!guestPreview} showCreatorTools={false} mobile={view === "mobile"} hasPortrait onSettingsChange={updateSettings} onNoteSettingsChange={value => setNoteSettings(normalizeGuestNoteSettings(value))} galleryTools={{ onChoose: choosePhotos, onRemove: removePhoto, onReset: () => { photos.forEach(photo => { URL.revokeObjectURL(photo.src); mediaUrls.current.delete(photo.src); }); setPhotos([]); removeDraftMedia(`custom-gallery:${template.slug}`).catch(() => {}); }, count: photos.length, photoError, samplePhotos: false }} /></div></div>
    </div>
    <p className="guest-preview-disclaimer">{w.noPublish}</p>
  </main>;
}

export default function CustomInvitationPage() {
  const { category } = useParams();
  const { t } = useLanguage();
  const template = getCustomTemplate(category);
  if (!template) return <main className="inner-page copy-page"><h1>{t("invitations.notFound.title")}</h1><Link to="/invitations">{t("invitations.allInvitations")}</Link></main>;
  return <Builder key={category} template={template} />;
}
