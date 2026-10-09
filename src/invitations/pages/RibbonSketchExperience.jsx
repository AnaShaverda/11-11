import useInvitationGuestName from "../hooks/useInvitationGuestName.js";
import InvitationArtwork from "../components/InvitationArtwork.jsx";
import { useLanguage } from "../../localization/LanguageContext.jsx";
import RibbonSketchToolbar from "../ribbon-sketch/RibbonSketchToolbar.jsx";
import { useEffect, useRef, useState } from "react";
import RibbonSketchDesign from "../ribbon-sketch/RibbonSketchDesign.jsx";
import InvitationEntrance from "../components/InvitationEntrance.jsx";
import RibbonSketchCardArt from "../components/RibbonSketchCardArt.jsx";
import { ribbonAssets, ribbonPhotos, ribbonPhotoCaptions } from "../ribbon-sketch/assets.js";
import "../ribbon-sketch/experience.css";

const storageKey = "1111-ribbon-sketch:v1";
const photoCaptions = [
  "make a wish",
  "the birthday girl ♡",
  "little moments",
  "my favorite people ♡",
  "a night with you",
  "sweet little things",
];
function readSaved() {
  try {
    return JSON.parse(localStorage.getItem(storageKey)) ?? {};
  } catch {
    return {};
  }
}
function saveReply(key, value) {
  try {
    localStorage.setItem(
      storageKey,
      JSON.stringify({ ...readSaved(), [key]: value }),
    );
    return true;
  } catch {
    return false;
  }
}
function addToCalendar() {
  const content = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//11:11//Ribbon Sketch//EN",
    "BEGIN:VEVENT",
    "UID:birthday-ribbon-sketch-20270523@11-11",
    "DTSTAMP:20261009T000000Z",
    "DTSTART:20270523T130000Z",
    "DTEND:20270523T170000Z",
    "SUMMARY:Mia’s Birthday",
    "LOCATION:Tbilisi\\, Georgia",
    "DESCRIPTION:A little party\\, a lot of love.",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  const url = URL.createObjectURL(
    new Blob([content], { type: "text/calendar;charset=utf-8" }),
  );
  const link = document.createElement("a");
  link.href = url;
  link.download = "mias-birthday.ics";
  link.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}
const modalNames = {
  photo: "Photo viewer",
  capture: "Your new memory",
  rsvp: "Your RSVP confirmation",
  wish: "Your birthday wish",
};
function ReplyConfirmation({ actions, state }) {
  const wish = state.replyType === "wish";
  return <div className="rsb-confirmation"><h2>{wish ? "A little love, delivered." : state.rsvp?.attending ? "See you at the party!" : "We’ll miss you!"}</h2><p>{wish ? state.wish?.name : state.rsvp?.name}</p>{wish && <blockquote>{state.wish?.message}</blockquote>}<button type="button" className="rsb-button" onClick={wish ? actions.editWish : actions.editRsvp}>{wish ? "Edit your wish" : "Change my response"}</button></div>;
}

export default function RibbonSketchExperience() {
  const {language}=useLanguage();
  const [motion, setMotion] = useState(
    () => !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [opened, setOpened] = useState(false);
  const [saved] = useState(readSaved);
  const [guestName, setGuestName] = useInvitationGuestName("birthday-ribbon-sketch", saved.wish?.name ?? saved.rsvp?.name ?? "");
  const [rsvp, setRsvp] = useState(() => saved.rsvp ?? null);
  const [wish, setWish] = useState(() => saved.wish ?? null);
  const [attending, setAttending] = useState(
    () => saved.rsvp?.attending ?? true,
  );
  const [modal, setModal] = useState(null);
  const [viewerPhoto, setViewerPhoto] = useState(ribbonPhotos[1]);
  const [diaryIndex, setDiaryIndex] = useState(0);
  const [selectedMemory, setSelectedMemory] = useState(null);
  const [uploads, setUploads] = useState([]);
  const [notice, setNotice] = useState("");
  const root = useRef(null);
  const fileInput = useRef(null);
  const modalRef = useRef(null);
  const lastFocus = useRef(null);
  const uploadUrls = useRef([]);
  const photos = [...uploads, ...ribbonPhotos];
  const viewerIndex = Math.max(0, photos.indexOf(viewerPhoto));
  const cameraPhoto = uploads[0] ?? null;
  const diaryPhoto = selectedMemory ?? (diaryIndex === 0 && !uploads.length ? null : photos[diaryIndex % photos.length]);

  useEffect(() => {

    window.scrollTo(0, 0);

    return () => {

      uploadUrls.current.forEach(URL.revokeObjectURL);
    };
  }, []);
  useEffect(() => {
    if (!modal) return;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    lastFocus.current = document.activeElement;
    modalRef.current?.querySelector("button, input, textarea")?.focus();
    function keyboard(event) {
      if (event.key === "Escape") setModal(null);
      if (event.key !== "Tab") return;
      const focusable = [
        ...modalRef.current.querySelectorAll(
          "button:not([disabled]), input, textarea, a[href]",
        ),
      ];
      const first = focusable[0],
        last = focusable.at(-1);
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      }
      if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    }
    document.addEventListener("keydown", keyboard);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", keyboard);
      lastFocus.current?.focus();
    };
  }, [modal]);

  function scrollTo(name, focus = false) {
    window.requestAnimationFrame(() => {
      const target = root.current?.querySelector('[data-name="' + name + '"]');
      target?.scrollIntoView({
        behavior: motion ? "smooth" : "instant",
        block: "start",
      });
      if (focus) target?.querySelector("input")?.focus({ preventScroll: true });
    });
  }
  function moveViewer(delta) {
    setViewerPhoto(
      photos[(viewerIndex + delta + photos.length) % photos.length],
    );
  }
  function requestCapture() {
    fileInput.current?.click();
  }
  async function capture(event) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setNotice("Please choose a photograph.");
      return;
    }
    const url = URL.createObjectURL(file);
    uploadUrls.current.push(url);
    setUploads((items) => [url, ...items].slice(0, 24));
    setNotice("");
    setModal("capture");
  }
  function submitRsvp(event) {
    event.preventDefault();
    const name = new FormData(event.currentTarget).get("name").trim();
    if (!name) return;
    const reply = { name, attending };
    setRsvp(reply);
    setModal("rsvp");
    setNotice(
      saveReply("rsvp", reply)
        ? "Your response is saved on this device."
        : "Your response is saved for this visit.",
    );
  }
  function submitWish(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const next = {
      name: data.get("name").trim(),
      message: data.get("message").trim(),
    };
    if (!next.name || !next.message) return;
    setWish(next);
    setModal("wish");
    setNotice(
      saveReply("wish", next)
        ? "Your wish is saved on this device."
        : "Your wish is saved for this visit.",
    );
  }
  function resetCollection() {
    uploadUrls.current.forEach(URL.revokeObjectURL);
    uploadUrls.current = [];
    setUploads([]);
    setDiaryIndex(0);
    setNotice("Your added photos have been cleared.");
  }
  const state = {
    guestName,
    motion,
    replyType: modal,
    opened,
    attending,
    rsvp,
    wish,
    captures: 6 + uploads.length,
    cameraPhoto,
    diaryPhoto,
    diaryIndex,
    viewerPhoto,
    viewerIndex,
    viewerCaption: uploads.includes(viewerPhoto)
      ? "a new little memory ♡"
      : ribbonPhotoCaptions[viewerPhoto] ?? photoCaptions[viewerIndex % photoCaptions.length],
    totalPhotos: photos.length,
  };
  function replay() { setModal(null); setOpened(false); window.scrollTo({ top: 0, behavior: "instant" }); window.requestAnimationFrame(() => document.querySelector(".rs-ribbon-opening .guest-envelope-open")?.focus({ preventScroll: true })); }
  const actions = {
    guestName: setGuestName,
    replay,
    open: () => setOpened(true),
    read: () => scrollTo("Birthday girl era"),
    motion: () => setMotion((value) => !value),
    capture: requestCapture,
    reset: resetCollection,
    photo: (src) => {
      setViewerPhoto(src);
      setModal("photo");
    },
    select: (src) => {
      const index = photos.indexOf(src);
      setDiaryIndex(index < 0 ? 0 : index); setSelectedMemory(src);
    },
    next: () => { setSelectedMemory(null); setDiaryIndex(index => (index + 1) % photos.length); },
    previous: () => { setSelectedMemory(null); setDiaryIndex(index => (index - 1 + photos.length) % photos.length); },
    viewerNext: () => moveViewer(1),
    viewerPrevious: () => moveViewer(-1),
    attendance: setAttending,
    rsvp: submitRsvp,
    wish: submitWish,
    calendar: addToCalendar,
    location: () =>
      window.open(
        "https://www.google.com/maps/search/?api=1&query=Tbilisi%2C%20Georgia",
        "_blank",
        "noopener,noreferrer",
      ),
    close: () => setModal(null),
    editRsvp: () => {
      setModal(null);
      scrollTo("Will you be there RSVP", true);
    },
    editWish: () => {
      setModal(null);
      scrollTo("Leave a little love wishes", true);
    },
  };
  const View = RibbonSketchDesign;
  const ModalView = modal === "rsvp" || modal === "wish" ? ReplyConfirmation : null;
  return (
    <>
      <RibbonSketchToolbar motion={motion} onMotion={()=>setMotion(value=>!value)}/>
      {!opened && <section className="rs-ribbon-opening" aria-label="Mia’s birthday invitation">
        <InvitationEntrance paperTexture="/images/birthday/ribbon-sketch/sketch-paper.png" sealArtwork="/images/birthday/ribbon-sketch/line-ornament.webp" settings={{ entrance: "ivoryPaperEnvelope", openingEffect: "none" }} design={{ paper: "#fff8f5", ink: "#731d34", accent: "#ad1626" }} title="Mia’s birthday" initials="M" reducedMotion={!motion} onComplete={() => { setOpened(true); window.scrollTo(0, 0); }}>
          <div className="rs-ribbon-letter"><RibbonSketchCardArt /></div>
        </InvitationEntrance>
      </section>}
    <main
      ref={root}
      className="ribbon-sketch rs-with-ribbon-opening"
      hidden={!opened}
      data-open={opened}
      data-motion={motion}
      lang={language}
    >
      <View actions={actions} state={state} />


      <p className="rs-sr-only" role="status" aria-live="polite">
        {notice}
      </p>
      {uploads.length ? (
        <aside className="rs-new-photos" aria-label="Your new memories">
          {uploads.map((src) => (
            <button
              key={src}
              type="button"
              onClick={() => actions.photo(src)}
              aria-label="View your captured memory"
            >
              <img src={src} alt="Your new birthday memory" />
              <span>a new little memory <InvitationArtwork name="heart" size="1em" /></span>
            </button>
          ))}
        </aside>
      ) : null}
      {ModalView ? (
        <div
          className="rs-modal-backdrop"
          onClick={(event) => {
            if (event.target === event.currentTarget) setModal(null);
          }}
        >
          <div
            ref={modalRef}
            className={"rs-modal rs-modal-" + modal}
            role="dialog"
            aria-modal="true"
            aria-label={modalNames[modal]}
          >
            <button
              type="button"
              className="rs-modal-close"
              onClick={() => setModal(null)}
              aria-label="Close dialog"
            >
              <InvitationArtwork name="close" size={22} />
            </button>
            <ModalView actions={actions} state={state} />
            {modal === "rsvp" || modal === "wish" ? (
              <p className="rs-local-note">{notice}</p>
            ) : null}
          </div>
        </div>
      ) : null}
    </main>
    </>
  );
}
