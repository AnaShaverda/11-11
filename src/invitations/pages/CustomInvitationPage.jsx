import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Icon from "../../components/ui/Icon.jsx";
import { useLanguage } from "../../localization/LanguageContext.jsx";
import GuestCardSuite from "../components/GuestCardSuite.jsx";
import GuestDayPlanEditor from "../components/GuestDayPlanEditor.jsx";
import { coverColors, coverFonts, coverFrames, coverLayouts, coverPatterns, normalizeCustomDesign } from "../components/CustomInvitationCover.jsx";
import { getCustomTemplate } from "../data/customTemplates.js";
import { classicalThemes, classicalPapers, classicalOrnaments, footerScenes, ornamentTones } from "../data/customClassicalThemes.js";
import { getDraftMedia, removeDraftMedia, saveDraftMedia } from "../data/draftMedia.js";
import { guestPreviewDefaults, MAX_GALLERY_PHOTOS, MAX_PHOTO_BYTES, normalizeGuestSettings, photoTypes, motionStyles, entranceStyles, openingEffects } from "../data/guestCardDesign.js";
import { normalizeGuestDayPlan } from "../data/guestDayPlan.js";
import { normalizeGuestNoteSettings } from "../data/guestNotes.js";
import { getMomentPresets, normalizeMoments } from "../data/customMoments.js";

const wizardLabels = {
  en: { basics: "The occasion", moments: "Event moments", moment: "Time & place", cover: "Main photo", galleryStep: "More photos", wording: "Invitation words", experience: "Replies & wishes", designStep: "Your design", openingStep: "Opening effect", review: "Review your invitation", city: "City", selectMoments: "What will happen at your celebration?", addMoment: "Add another moment", customMoment: "Name another moment", unknownTime: "I don't know the time yet", venue: "Venue name or address", mapUrl: "Exact Google Maps link (optional)", hour: "Hour", minute: "Minute", removeMoment: "Remove moment", uploadCover: "Choose a cover photo", uploadGallery: "Add gallery photos", zoom: "Photo zoom", rotation: "Photo rotation", chooseWording: "Choose a suggestion or write your own", headline: "Headline", invitationText: "Invitation message", previewNow: "View as a guest", viewFinal: "View final invitation", editStep: "Edit", reviewHint: "Review your choices, then open the invitation exactly as a guest would.", noPublish: "This is a visual draft saved on this device. A shareable link and real replies need a backend later.", selected: "Selected", optional: "Optional", chooseDesign: "Create your own design with a photo, colors, paper, frame and ornaments.", coverHint: "This photo appears on the first screen. You can adjust its crop here.", momentsHint: "Start with the occasion name and date. You can choose your design next.", galleryHint: "Add up to 10 images to the guest gallery.", skip: "Skip", backToReview: "Back to review", timeHint: "Choose a time or leave it undecided.", viewOpening: "View opening", saveLocal: "All changes save automatically on this device." },
  ka: { basics: "ღონისძიება", moments: "დღის მოვლენები", moment: "დრო და ადგილი", cover: "მთავარი ფოტო", galleryStep: "სხვა ფოტოები", wording: "მოსაწვევის ტექსტი", experience: "პასუხები და მილოცვები", designStep: "შენი დიზაინი", openingStep: "გახსნის ეფექტი", review: "გადაამოწმე მოსაწვევი", city: "ქალაქი", selectMoments: "რა მოვლენები გექნებათ?", addMoment: "მოვლენის დამატება", customMoment: "სხვა მოვლენის სახელი", unknownTime: "დრო ჯერ არ ვიცი", venue: "ადგილის სახელი ან მისამართი", mapUrl: "Google Maps-ის ზუსტი ბმული (არასავალდებულო)", hour: "საათი", minute: "წუთი", removeMoment: "მოვლენის წაშლა", uploadCover: "მთავარი ფოტოს არჩევა", uploadGallery: "გალერეის ფოტოების დამატება", zoom: "ფოტოს გადიდება", rotation: "ფოტოს მოტრიალება", chooseWording: "აირჩიე ტექსტი ან დაწერე შენი", headline: "სათაური", invitationText: "მოწვევის ტექსტი", previewNow: "სტუმრის ხედით ნახვა", viewFinal: "საბოლოო მოსაწვევის ნახვა", editStep: "შეცვლა", reviewHint: "გადაამოწმე არჩევანი და ნახე მოსაწვევი ზუსტად ისე, როგორც სტუმარი.", noPublish: "ეს ლოკალური ვიზუალური მონახაზია. გასაზიარებელ ბმულსა და რეალურ პასუხებს მოგვიანებით დასჭირდება backend.", selected: "არჩეულია", optional: "არასავალდებულო", chooseDesign: "შექმენი შენი დიზაინი ფოტოთი, ფერებით, ქაღალდით, ჩარჩოთი და ორნამენტებით.", coverHint: "ეს ფოტო პირველ ეკრანზე გამოჩნდება. აქვე შეგიძლია კადრის შეცვლა.", momentsHint: "დაიწყე ღონისძიების სახელითა და თარიღით. შემდეგ დიზაინს აირჩევ.", galleryHint: "სტუმრის გალერეაში დაამატე 10-მდე ფოტო.", skip: "გამოტოვება", backToReview: "გადახედვაზე დაბრუნება", timeHint: "აირჩიე დრო ან დატოვე გაურკვეველი.", viewOpening: "გახსნის ნახვა", saveLocal: "ყველა ცვლილება ამ მოწყობილობაზე ავტომატურად ინახება." },
};
const wordingSuggestions = {
  en: { headlines: ["We are getting married!", "You're invited", "Let's celebrate together"], messages: ["With joy, we invite you to celebrate this special day with us.", "Your presence would make our celebration even more memorable.", "Join us for a day of love, laughter, and beautiful memories."] },
  ka: { headlines: ["ჩვენ ვქორწინდებით!", "გეპატიჟებით", "ერთად ვიზეიმოთ"], messages: ["სიხარულით გეპატიჟებით ჩვენს დღესასწაულზე. გვინდა, ეს დღე თქვენთან ერთად გავატაროთ.", "თქვენი მოსვლა ჩვენს დღეს კიდევ უფრო განსაკუთრებულს გახდის.", "გელით სიყვარულით, სიხარულითა და ლამაზი მოგონებებით სავსე დღეს."] },
};
const georgianTitles = { all: "შენი დღესასწაული", wedding: "ჩვენი ქორწილი", birthday: "დაბადების დღე", "baby-kids": "პატარა დღესასწაული", "pre-wedding": "ჩვენი წვეულება", parties: "დღესასწაული", gifts: "განსაკუთრებული სიურპრიზი", corporate: "მოგესალმებით" };
const footerSceneNames = {
  en: { none: "No artwork", church: "Church in the hills", vineyard: "Vineyard valley", wine: "Wine celebration", grapes: "Grape vines", landscape: "Mountain landscape" },
  ka: { none: "გამოსახულების გარეშე", church: "ტაძარი მთებში", vineyard: "ვენახის ხეობა", wine: "ღვინის დღესასწაული", grapes: "ყურძნის ვაზი", landscape: "მთის პეიზაჟი" },
};
const themePreviewPapers = {
  ivory: "#f1e6d5", rose: "#efdcda", navy: "#344054", umber: "#b9947e",
  sagePaper: "#dbe4d7", lavenderPaper: "#e5dded", bluePaper: "#dce7ee",
};
const coverOnlyDesignFields = new Set(["coverImage", "position", "zoom", "rotation"]);
const labels = {
  en: { create: "Create your own design", intro: "Build an invitation from your own words, colors and photographs.", details: "Your celebration", design: "Your design", guests: "Guest experience", opening: "Opening & motion", name: "Names or event title", date: "Date", time: "Time", place: "Location", message: "A personal message", openingLine: "Small line above the title", photo: "Cover photo", remove: "Remove photo", position: "Photo position", frame: "Frame", color: "Color", pattern: "Pattern", font: "Typography", layout: "Text placement", photos: "Guest gallery photos", gallery: "Photo gallery", rsvp: "RSVP", notes: "Guest notes", detailsSection: "Date and place section", companions: "Extra guests per RSVP", entrance: "Opening style", effect: "Celebration effect", motion: "Page motion", preview: "Preview as a guest", edit: "Back to editing", replay: "Replay opening", previous: "Back", next: "Continue", saved: "Saved on this device", local: "Local visual draft. Sharing and collecting real responses can be added later.", invalid: "Choose a valid image under 8 MB.", count: "{count} of {max} photos", category: "Collection", schedule: "Day schedule (optional)", noPhoto: "Your design works with or without a cover photo.", more: "Choose the look of your original card.", guestsHint: "See how each section appears in the guest preview.", openingHint: "Envelope, doors and confetti are all available for your own design.", immediate: "Show card", envelope: "Envelope", doors: "Opening doors", bottom: "At the bottom", center: "Centered", serif: "Editorial", modern: "Modern", playful: "Playful", plain: "Clean", floral: "Florals", confetti: "Confetti", stars: "Stars", stripes: "Stripes", arch: "Arch", engraved: "Double arch", oval: "Oval", classic: "Classic", minimal: "Minimal", film: "Film", desktop: "Desktop", mobile: "Mobile", looks: "Choose a look", artwork: "Cover artwork", paper: "Paper", ornament: "Botanical ornament", none: "None", church: "Stone church", garden: "Garden reception", manor: "Evening manor", ivory: "Ivory cotton", rose: "Rose paper", navy: "Midnight paper", laurel: "Laurel branch" },
  ka: { create: "შექმენი საკუთარი დიზაინი", intro: "ააწყვე მოსაწვევი შენი ტექსტით, ფერებითა და ფოტოებით.", details: "შენი დღესასწაული", design: "შენი დიზაინი", guests: "სტუმრის გამოცდილება", opening: "გახსნა და მოძრაობა", name: "სახელები ან ღონისძიების სახელი", date: "თარიღი", time: "დრო", place: "ადგილი", message: "პირადი ტექსტი", openingLine: "მოკლე წარწერა სათაურის ზემოთ", photo: "ყდის ფოტო", remove: "ფოტოს წაშლა", position: "ფოტოს მდებარეობა", frame: "ჩარჩო", color: "ფერი", pattern: "ორნამენტი", font: "შრიფტი", layout: "ტექსტის განლაგება", photos: "გალერეის ფოტოები", gallery: "ფოტოების გალერეა", rsvp: "RSVP", notes: "სტუმრის ჩანაწერები", detailsSection: "თარიღისა და ადგილის სექცია", companions: "დამატებითი სტუმრები", entrance: "გახსნის სტილი", effect: "სადღესასწაულო ეფექტი", motion: "გვერდის მოძრაობა", preview: "სტუმრის ხედით ნახვა", edit: "რედაქტირებაზე დაბრუნება", replay: "გახსნის გამეორება", previous: "უკან", next: "გაგრძელება", saved: "ამ მოწყობილობაზე ინახება", local: "ეს ლოკალური ვიზუალური მონახაზია. გაზიარება და პასუხების შეგროვება მოგვიანებით დაემატება.", invalid: "აირჩიე სწორი ფოტო 8 მბ-მდე.", count: "{count} / {max} ფოტო", category: "კოლექცია", schedule: "დღის განრიგი (არასავალდებულო)", noPhoto: "დიზაინი ფოტოს გარეშეც მუშაობს.", more: "აირჩიე შენი ორიგინალური ბარათის იერი.", guestsHint: "ნახე, როგორ გამოჩნდება თითოეული სექცია სტუმართან.", openingHint: "კონვერტი, კარები და კონფეტი შენი დიზაინისთვისაც ხელმისაწვდომია.", immediate: "ბარათის ჩვენება", envelope: "კონვერტი", doors: "გასახსნელი კარები", bottom: "ქვემოთ", center: "ცენტრში", serif: "კლასიკური", modern: "თანამედროვე", playful: "მხიარული", plain: "სუფთა", floral: "ყვავილები", confetti: "კონფეტი", stars: "ვარსკვლავები", stripes: "ზოლები", arch: "თაღი", engraved: "ორმაგი თაღი", oval: "ოვალური", classic: "კლასიკური", minimal: "მინიმალური", film: "ფირი", desktop: "კომპიუტერი", mobile: "მობილური", looks: "აირჩიე იერი", artwork: "ყდის გამოსახულება", paper: "ქაღალდი", ornament: "ბოტანიკური ორნამენტი", none: "გარეშე", church: "ქვის ტაძარი", garden: "ბაღის სუფრა", manor: "საღამოს სასახლე", ivory: "სპილოსძვლისფერი", rose: "ვარდისფერი ქაღალდი", navy: "ღამის ლურჯი", laurel: "დაფნის რტო" },
};

function readDraft(slug) {
  try { return JSON.parse(localStorage.getItem(`1111-custom-draft-v1:${slug}`)) ?? {}; } catch { return {}; }
}

function Choice({ title, options, value, onChange, label }) {
  return <fieldset className="custom-builder-choice"><legend>{title}</legend><div>{options.map(option => <button type="button" key={option} aria-pressed={value === option} onClick={() => onChange(option)}>{label(option)}</button>)}</div></fieldset>;
}

function Builder({ template }) {
  const { t, language, setLanguage } = useLanguage();
  const l = labels[language] ?? labels.en;
  const w = wizardLabels[language] ?? wizardLabels.en;
  const draft = useRef(readDraft(template.slug));
  const [step, setStep] = useState(0);
  const [fields, setFields] = useState(() => ({ title: "", date: "", time: "", location: "", city: "", line: "", opening: "", ...draft.current.fields }));
  const [moments, setMoments] = useState(() => normalizeMoments(draft.current.moments, template.subcategory));
  const [customMomentName, setCustomMomentName] = useState("");
  const [design, setDesign] = useState(() => normalizeCustomDesign(draft.current.design, template.defaultDesign));
  const [settings, setSettings] = useState(() => normalizeGuestSettings(draft.current.settings ?? { ...guestPreviewDefaults, openingEffect: "confetti" }));
  const [noteSettings, setNoteSettings] = useState(() => normalizeGuestNoteSettings(draft.current.noteSettings));
  const [dayPlan, setDayPlan] = useState(() => normalizeGuestDayPlan(draft.current.dayPlan));
  const [coverFile, setCoverFile] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [photoError, setPhotoError] = useState(false);
  const [guestPreview, setGuestPreview] = useState(false);
  const [previewCycle, setPreviewCycle] = useState(0);
  const [planDraft, setPlanDraft] = useState(false);
  const [view, setView] = useState(() => window.matchMedia("(max-width: 720px)").matches ? "mobile" : "desktop");
  const mediaUrls = useRef(new Set());
  const defaultTitle = language === "ka" ? georgianTitles[template.subcategory] : template.defaultTitle;
  const steps = ["basics", "designStep", "openingStep", "moments", ...moments.map(item => `moment:${item.id}`), "galleryStep", "wording", "experience", "review"];
  const currentStep = steps[Math.min(step, steps.length - 1)];
  const activeMoment = currentStep.startsWith("moment:") ? moments.find(item => `moment:${item.id}` === currentStep) : null;
  const displayDate = fields.date ? new Intl.DateTimeFormat(language === "ka" ? "ka-GE" : "en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${fields.date}T12:00:00Z`)) : "";
  const sample = { ...fields, title: fields.title || defaultTitle, displayDate, date: fields.date || (language === "ka" ? "შეიყვანე თარიღი" : "Add a date"), time: moments.find(item => item.time)?.time || fields.time, location: moments.find(item => item.venue)?.venue || fields.location || (language === "ka" ? "შეიყვანე ადგილი" : "Add a place"), name: fields.title || defaultTitle };

  useEffect(() => {
    try { localStorage.setItem(`1111-custom-draft-v1:${template.slug}`, JSON.stringify({ fields, moments, design: { ...design, coverImage: "" }, settings, noteSettings, dayPlan })); } catch { /* Continue in memory. */ }
  }, [template.slug, fields, moments, design, settings, noteSettings, dayPlan]);

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
      theme: Object.hasOwn(patch, "theme") ? patch.theme : Object.keys(patch).every(key => coverOnlyDesignFields.has(key)) ? current.theme : "",
    }, template.defaultDesign));
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
  function preview() { setPreviewCycle(value => value + 1); setGuestPreview(true); window.scrollTo({ top: 0, behavior: "instant" }); }
  const customArtworkLabels = {
    blushGarden: { en: "Blush garden", ka: "ვარდისფერი ბაღი" },
    sageGarden: { en: "Sage garden", ka: "სალბის ბაღი" },
    lavenderTerrace: { en: "Lavender terrace", ka: "ლავანდის ტერასა" },
    blueCourtyard: { en: "Blue courtyard", ka: "ლურჯი ეზო" },
    sagePaper: { en: "Sage paper", ka: "სალბის ქაღალდი" },
    lavenderPaper: { en: "Lavender paper", ka: "ლავანდის ქაღალდი" },
    bluePaper: { en: "Powder blue paper", ka: "ცისფერი ქაღალდი" },
  };
  const localLabel = option => customArtworkLabels[option]?.[language] ?? (option === "roseBranch" ? (language === "ka" ? "ვარდის რტო" : "Rose branch") : option === "fern" ? (language === "ka" ? "გვიმრის რტო" : "Fern sprig") : option === "goldBotanical" ? (language === "ka" ? "ოქროს რტო" : "Gold botanical") : option === "silverBotanical" ? (language === "ka" ? "ვერცხლის რტო" : "Silver botanical") : option === "umber" ? (language === "ka" ? "თბილი ყავისფერი" : "Warm umber") : option === "botanical" ? (language === "ka" ? "ბოტანიკური თაღი" : "Botanical arch") : l[option] ?? t(`guestCards.${option}`));
  return <main className="guest-preview-page custom-builder-page" data-preview-mode={view}>
    <header className="guest-preview-toolbar custom-builder-toolbar">
      <Link className="guest-preview-back" to={template.subcategory === "all" ? "/invitations" : `/invitations?category=${template.subcategory}`}><Icon name="arrow-left" size={18} />{template.subcategory === "all" ? t("invitations.all") : t(`common.${template.subcategory}`)}</Link>
      <div className="guest-preview-device"><span>{l.create}</span><div className="guest-device-buttons" role="group" aria-label={t("guestCards.device")}>{["desktop", "mobile"].map(device => <button type="button" key={device} aria-pressed={view === device} onClick={() => setView(device)}>{l[device]}</button>)}</div></div>
      <span className="guest-canvas-save-status">{l.saved}</span>
      {guestPreview && <div className="invitation-guest-preview-actions"><button type="button" onClick={() => setGuestPreview(false)}>{l.edit}</button><button type="button" onClick={() => setPreviewCycle(value => value + 1)}>{l.replay}</button></div>}
      <button className="guest-preview-language" type="button" onClick={() => setLanguage(language === "ka" ? "en" : "ka")}>{language === "ka" ? "EN" : "KA"}</button>
    </header>
    {!guestPreview && <div className="custom-builder-heading"><p>{l.category} / {template.subcategory === "all" ? t("invitations.all") : t(`common.${template.subcategory}`)}</p><h1>{l.create}</h1><span>{l.intro}</span></div>}
    <div className={`custom-builder-workspace${guestPreview ? " is-preview" : ""}`}>
      {!guestPreview && <aside className="custom-builder-sidebar">
        <nav className="custom-builder-progress" aria-label={t("guide.progress")}>{steps.map((name, index) => <button type="button" key={name} aria-current={step === index ? "step" : undefined} onClick={() => setStep(index)}><span>{String(index + 1).padStart(2, "0")}</span>{name.startsWith("moment:") ? `${w.moment}: ${(language === "ka" ? moments.find(item => `moment:${item.id}` === name)?.ka : moments.find(item => `moment:${item.id}` === name)?.en) ?? ""}` : w[name]}</button>)}</nav>
        <section className="custom-builder-panel"><p className="custom-builder-step-count">{step + 1} / {steps.length}</p><h2>{activeMoment ? `${w.moment}: ${language === "ka" ? activeMoment.ka : activeMoment.en}` : w[currentStep]}</h2>
          {currentStep === "basics" && <div className="custom-builder-fields">
            <p>{w.momentsHint}</p>
            <label>{l.name}<input type="text" maxLength="120" value={fields.title} onChange={event => updateField("title", event.target.value)} /></label>
            <label>{l.date}<input type="date" value={fields.date} onChange={event => updateField("date", event.target.value)} /></label>
            <label>{w.city}<input type="text" maxLength="120" value={fields.city} onChange={event => updateField("city", event.target.value)} /></label>
          </div>}
          {currentStep === "moments" && <div className="custom-builder-fields"><p>{w.selectMoments}</p><div className="custom-builder-moments">{getMomentPresets(template.subcategory).map(preset => <button key={preset[0]} type="button" aria-pressed={moments.some(item => item.id === preset[0])} onClick={() => toggleMoment(preset)}><span>{language === "ka" ? preset[2] : preset[1]}</span><small>{moments.some(item => item.id === preset[0]) ? `✓ ${w.selected}` : "+"}</small></button>)}</div><label>{w.customMoment}<input type="text" value={customMomentName} maxLength="100" onChange={event => setCustomMomentName(event.target.value)} onKeyDown={event => { if (event.key === "Enter") { event.preventDefault(); addCustomMoment(); } }} /></label><button className="custom-builder-add" type="button" onClick={addCustomMoment} disabled={!customMomentName.trim() || moments.length >= 12}>+ {w.addMoment}</button>{moments.filter(item => item.id.startsWith("custom-")).map(item => <button key={item.id} className="custom-builder-link" type="button" onClick={() => setMoments(current => current.filter(moment => moment.id !== item.id))}>{item.en} ×</button>)}</div>}
          {activeMoment && <div className="custom-builder-fields"><p>{w.timeHint}</p><label>{language === "ka" ? "მოვლენის სახელი" : "Moment name"}<input type="text" value={language === "ka" ? activeMoment.ka : activeMoment.en} maxLength="100" onChange={event => updateMoment(activeMoment.id, { [language === "ka" ? "ka" : "en"]: event.target.value })} /></label><label className="custom-builder-toggle">{w.unknownTime}<input type="checkbox" checked={activeMoment.unknownTime} onChange={event => updateMoment(activeMoment.id, { unknownTime: event.target.checked, time: event.target.checked ? "" : activeMoment.time })} /></label>{!activeMoment.unknownTime && <div className="custom-builder-time"><label>{w.hour}<select value={activeMoment.time?.slice(0, 2) ?? ""} onChange={event => updateMoment(activeMoment.id, { time: event.target.value ? `${event.target.value}:${activeMoment.time?.slice(3) || "00"}` : "" })}><option value="">—</option>{Array.from({ length: 16 }, (_, index) => String(index + 8).padStart(2, "0")).map(hour => <option key={hour} value={hour}>{hour}</option>)}</select></label><label>{w.minute}<select value={activeMoment.time?.slice(3) || "00"} onChange={event => updateMoment(activeMoment.id, { time: `${activeMoment.time?.slice(0, 2) || "12"}:${event.target.value}` })}>{["00", "15", "30", "45"].map(minute => <option key={minute} value={minute}>:{minute}</option>)}</select></label></div>}<label>{w.venue}<input type="text" maxLength="160" value={activeMoment.venue} onChange={event => updateMoment(activeMoment.id, { venue: event.target.value })} /></label><label>{w.mapUrl}<input type="url" value={activeMoment.mapUrl} onChange={event => updateMoment(activeMoment.id, { mapUrl: event.target.value })} placeholder="https://maps.google.com/..." /></label><button className="custom-builder-link" type="button" onClick={() => { setMoments(current => current.filter(item => item.id !== activeMoment.id)); setStep(Math.max(1, step - 1)); }}>{w.removeMoment}</button></div>}
          {currentStep === "galleryStep" && <div className="custom-builder-fields"><p>{w.galleryHint}</p><label className="custom-builder-upload">{w.uploadGallery}<input type="file" accept={photoTypes.join(",")} multiple disabled={photos.length >= 10} onChange={choosePhotos} /><small>{l.count.replace("{count}", photos.length).replace("{max}", 10)}</small></label>{photos.length > 0 && <div className="custom-builder-photo-list">{photos.map(photo => <div key={photo.id}><img src={photo.src} alt="" /><button type="button" onClick={() => removePhoto(photo.id)} aria-label={`${l.remove}: ${photo.name}`}>×</button></div>)}</div>}</div>}
          {currentStep === "wording" && <div className="custom-builder-fields"><p>{w.chooseWording}</p><div className="custom-builder-suggestions">{wordingSuggestions[language].headlines.map(value => <button key={value} type="button" aria-pressed={fields.opening === value} onClick={() => updateField("opening", value)}>{value}</button>)}</div><label>{w.headline}<input type="text" maxLength="120" value={fields.opening} onChange={event => updateField("opening", event.target.value)} /></label><div className="custom-builder-suggestions">{wordingSuggestions[language].messages.map(value => <button key={value} type="button" aria-pressed={fields.line === value} onClick={() => updateField("line", value)}>{value}</button>)}</div><label>{w.invitationText}<textarea rows="4" maxLength="500" value={fields.line} onChange={event => updateField("line", event.target.value)} /></label></div>}
          {currentStep === "experience" && <div className="custom-builder-fields"><p>{l.guestsHint}</p><label className="custom-builder-toggle">{l.rsvp}<input type="checkbox" checked={settings.rsvp} onChange={event => updateSettings({ rsvp: event.target.checked })} /></label><label className="custom-builder-toggle">{l.notes}<input type="checkbox" checked={noteSettings.enabled} onChange={event => setNoteSettings(current => normalizeGuestNoteSettings({ ...current, enabled: event.target.checked }))} /></label>{settings.rsvp && <label>{l.companions}<select value={settings.companions} onChange={event => updateSettings({ companions: Number(event.target.value) })}>{[0,1,2,3,4,5].map(value => <option key={value} value={value}>{value}</option>)}</select></label>}<label className="custom-builder-toggle">{l.detailsSection}<input type="checkbox" checked={settings.details} onChange={event => updateSettings({ details: event.target.checked })} /></label><label className="custom-builder-toggle">{l.gallery}<input type="checkbox" checked={settings.gallery} onChange={event => updateSettings({ gallery: event.target.checked })} /></label><details className="custom-builder-optional"><summary>{l.schedule}</summary><GuestDayPlanEditor embedded dayPlan={dayPlan} onSave={items => setDayPlan(normalizeGuestDayPlan(items))} /></details></div>}
          {currentStep === "designStep" && <div className="custom-builder-fields"><p>{w.chooseDesign}</p>
            <fieldset className="custom-builder-cover-choice"><legend>{l.artwork}</legend><div><button type="button" aria-pressed={!coverFile} onClick={removeCover}><span className="custom-cover-choice-icon" aria-hidden="true">◇</span><strong>{l.none}</strong><small>{l.noPhoto}</small></button><label className={coverFile ? "is-selected" : ""}>{design.coverImage ? <img src={design.coverImage} alt="" /> : <span className="custom-cover-choice-icon" aria-hidden="true">＋</span>}<strong>{w.uploadCover}</strong><small>{coverFile?.name || w.optional}</small><input type="file" accept={photoTypes.join(",")} onChange={chooseCover} aria-label={w.uploadCover} /></label></div></fieldset>
            {coverFile && <div className="custom-builder-cover-tools"><button type="button" className="custom-builder-link" onClick={removeCover}>{l.remove}</button><label>{l.position}<input type="range" min="0" max="100" value={design.position} onChange={event => updateDesign({ position: Number(event.target.value) })} /></label><label>{w.zoom} · {design.zoom}%<input type="range" min="100" max="180" value={design.zoom} onChange={event => updateDesign({ zoom: Number(event.target.value) })} /></label><label>{w.rotation} · {design.rotation}°<input type="range" min="-20" max="20" value={design.rotation} onChange={event => updateDesign({ rotation: Number(event.target.value) })} /></label></div>}
            <fieldset className="custom-builder-themes"><legend>{language === "ka" ? "თემები" : "Themes"}</legend><div>{classicalThemes.map(theme => <button type="button" key={theme.id} aria-pressed={design.theme === theme.id} onClick={() => updateDesign({ ...theme, scene: "", theme: theme.id })}><span className={`custom-theme-mini frame-${theme.frame} layout-${theme.layout}`} style={{ "--theme-color": theme.color, "--theme-paper": themePreviewPapers[theme.paper] ?? "#f1e6d5", "--theme-accent": ornamentTones[theme.ornamentTone] ?? "#eee4d3" }} aria-hidden="true"><span className="custom-theme-mini-frame" /><span className="custom-theme-mini-copy"><i>11:11</i><b /><small>✦</small></span></span><span className="custom-theme-name">{theme.name[language] ?? theme.name.en}</span></button>)}</div></fieldset>
            <fieldset className="custom-builder-colors"><legend>{l.color}</legend><div>{coverColors.map(color => <button key={color} type="button" aria-label={color} aria-pressed={design.color === color} onClick={() => updateDesign({ color })} style={{ background: color }} />)}</div></fieldset>
            <Choice title={l.font} options={coverFonts} value={design.font} onChange={font => updateDesign({ font })} label={localLabel} />
            <Choice title={l.layout} options={coverLayouts} value={design.layout} onChange={layout => updateDesign({ layout })} label={localLabel} />
            <Choice title={l.paper} options={["none", ...Object.keys(classicalPapers)]} value={design.paper || "none"} onChange={paper => updateDesign({ paper: paper === "none" ? "" : paper })} label={localLabel} />
            <Choice title={l.ornament} options={["none", ...Object.keys(classicalOrnaments)]} value={design.ornament || "none"} onChange={ornament => updateDesign({ ornament: ornament === "none" ? "" : ornament, ...(ornament === "goldBotanical" ? { ornamentTone: "gold" } : ornament === "silverBotanical" ? { ornamentTone: "silver" } : {}) })} label={localLabel} />
            {design.ornament && <fieldset className="custom-builder-colors"><legend>{language === "ka" ? "ორნამენტის ფერი" : "Ornament shade"}</legend><div>{Object.entries(ornamentTones).map(([tone,color]) => <button key={tone} type="button" aria-label={tone.replace(/([A-Z])/g, " $1").toLowerCase()} title={tone.replace(/([A-Z])/g, " $1").toLowerCase()} aria-pressed={design.ornamentTone === tone} onClick={() => updateDesign({ ornamentTone: tone, ...(design.ornament === "goldBotanical" && tone.toLowerCase().includes("silver") ? { ornament: "silverBotanical" } : design.ornament === "silverBotanical" && tone.toLowerCase().includes("gold") ? { ornament: "goldBotanical" } : {}) })} style={{ background: color }} />)}</div></fieldset>}
            <Choice title={l.frame} options={coverFrames} value={design.frame} onChange={frame => updateDesign({ frame })} label={localLabel} />
            <Choice title={l.pattern} options={coverPatterns} value={design.pattern} onChange={pattern => updateDesign({ pattern })} label={localLabel} />
            <fieldset className="custom-builder-footer-scenes"><legend>{language === "ka" ? "ქვედა ნაწილის პეიზაჟი" : "Footer landscape"}</legend><div>{["none", ...Object.keys(footerScenes)].map(scene => <button type="button" key={scene} aria-pressed={design.footerScene === scene} onClick={() => updateDesign({ footerScene: scene })}>{scene === "none" ? <span className="custom-footer-none" aria-hidden="true">—</span> : <img src={footerScenes[scene]} alt="" />}<span>{footerSceneNames[language]?.[scene] ?? footerSceneNames.en[scene]}</span></button>)}</div></fieldset>
          </div>}
          {currentStep === "openingStep" && <div className="custom-builder-fields"><p>{l.openingHint}</p><Choice title={l.entrance} options={entranceStyles} value={settings.entrance} onChange={entrance => updateSettings({ entrance })} label={localLabel} /><Choice title={l.effect} options={openingEffects} value={settings.openingEffect} onChange={openingEffect => updateSettings({ openingEffect })} label={option => t(`guestCards.opening.${option}`)} /><Choice title={l.motion} options={motionStyles} value={settings.motion} onChange={motion => updateSettings({ motion })} label={option => t(`guestCards.motion.${option}`)} /><button className="custom-builder-add" type="button" onClick={preview}>{w.viewOpening}</button></div>}
          {currentStep === "review" && <div className="custom-builder-fields"><p>{w.reviewHint}</p><div className="custom-builder-review"><button type="button" onClick={() => setStep(steps.indexOf("basics"))}>{fields.title || defaultTitle}<span>{w.editStep}</span></button><button type="button" onClick={() => setStep(steps.indexOf("designStep"))}>{w.designStep} · {w.cover}: {coverFile ? "✓" : w.optional}<span>{w.editStep}</span></button><button type="button" onClick={() => setStep(steps.indexOf("openingStep"))}>{w.openingStep}: {localLabel(settings.entrance)}<span>{w.editStep}</span></button><button type="button" onClick={() => setStep(steps.indexOf("moments"))}>{moments.length} {w.moments}<span>{w.editStep}</span></button><button type="button" onClick={() => setStep(steps.indexOf("galleryStep"))}>{w.galleryStep}: {photos.length}<span>{w.editStep}</span></button><button type="button" onClick={() => setStep(steps.indexOf("wording"))}>{w.wording}: {fields.line ? "✓" : w.optional}<span>{w.editStep}</span></button></div><p className="custom-builder-local-note">{w.noPublish}</p><button className="custom-builder-final" type="button" onClick={preview}>{w.viewFinal}</button></div>}
          {photoError && <p className="custom-builder-error" role="alert">{l.invalid}</p>}
        </section>
        <footer className="custom-builder-actions"><button type="button" onClick={() => setStep(value => Math.max(0, value - 1))} disabled={step === 0}>{l.previous}</button>{step < steps.length - 1 && <button type="button" onClick={() => setStep(value => value + 1)}>{l.next}</button>}</footer>
        {step < steps.length - 1 && <button className="custom-builder-mobile-preview" type="button" onClick={preview}>{w.previewNow}</button>}
      </aside>}
      <div className={`guest-preview-stage is-${view}`}><GuestCardSuite key={`${template.slug}:${guestPreview ? `preview-${previewCycle}` : "edit"}`} template={template} sample={sample} customDesign={design} moments={moments} city={fields.city} copyTranslations={{}} editableFields={[]} settings={settings} photos={photos} dayPlan={dayPlan} noteSettings={noteSettings} creator={!guestPreview} mobile={view === "mobile"} hasPortrait onSettingsChange={updateSettings} onAddSection={section => section === "notes" ? setNoteSettings(current => ({ ...current, enabled: true })) : section === "plan" ? setPlanDraft(true) : updateSettings({ [section]: true })} planDraft={planDraft} onSavePlan={items => { setDayPlan(normalizeGuestDayPlan(items)); setPlanDraft(false); }} onNoteSettingsChange={value => setNoteSettings(normalizeGuestNoteSettings(value))} galleryTools={{ onChoose: choosePhotos, onRemove: removePhoto, onReset: () => { photos.forEach(photo => { URL.revokeObjectURL(photo.src); mediaUrls.current.delete(photo.src); }); setPhotos([]); removeDraftMedia(`custom-gallery:${template.slug}`).catch(() => {}); }, count: photos.length, photoError, samplePhotos: false }} /></div>
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
