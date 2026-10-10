import RibbonSectionBubbles from "./RibbonSectionBubbles.jsx";
import InvitationArtwork from "../components/InvitationArtwork.jsx";
import RibbonText from "./RibbonText.jsx";
import { useRibbonCopy } from "./copy.js";
import { useEffect, useRef, useState } from "react";
import { getDraftMedia, saveDraftMedia } from "../data/draftMedia.js";
import { celebrationArtwork } from "./celebrationArtwork.js";
const hostMediaKey = "ribbon-sketch:host-photos:bridal-memories-v1";
export default function RibbonSketchCamera({
  motion
}) {
  const tr = useRibbonCopy();
  const editMode = new URLSearchParams(window.location.search).get("edit") === "photos";
  const [queue, setQueue] = useState(() => celebrationArtwork.map(art => ({
    src: art.src,
    name: art.caption
  })));
  const [screenPhoto, setScreenPhoto] = useState(null);
  const [index, setIndex] = useState(0);
  const [prints, setPrints] = useState([]);
  const [capturedCount, setCapturedCount] = useState(0);
  const exhausted = queue.length > 0 && capturedCount >= queue.length;
  const [flash, setFlash] = useState(0);
  const [viewer, setViewer] = useState(null);
  const [notice, setNotice] = useState("");
  const input = useRef(null),
    urls = useRef([]),
    close = useRef(null),
    previousFocus = useRef(null);
  useEffect(() => {
    let cancelled = false;
    getDraftMedia(hostMediaKey).then(files => {
      if (cancelled || !Array.isArray(files) || !files.length) return;
      const photos = files.filter(file => file instanceof Blob && file.type.startsWith("image/")).map(file => {
        const src = URL.createObjectURL(file);
        urls.current.push(src);
        return {
          src,
          name: file.name ?? "A little memory"
        };
      });
      if (photos.length) setQueue(photos);
    }).catch(() => {
      if (!cancelled && editMode) setNotice("Saved photos could not load. Add them again for this preview.");
    });
    return () => {
      cancelled = true;
      urls.current.forEach(URL.revokeObjectURL);
    };
  }, [editMode]);
  useEffect(() => {
    if (!viewer) return;
    previousFocus.current = document.activeElement;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    close.current?.focus();
    const keyboard = event => {
      if (event.key === "Escape") setViewer(null);
      if (event.key === "Tab") {
        event.preventDefault();
        close.current?.focus();
      }
    };
    document.addEventListener("keydown", keyboard);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", keyboard);
      previousFocus.current?.focus();
    };
  }, [viewer]);
  async function choose(event) {
    if (!editMode) return;
    const files = Array.from(event.target.files ?? []);
    const valid = files.filter(file => file.type.startsWith("image/") && file.size <= 15 * 1024 * 1024).slice(0, 12);
    if (!valid.length) {
      setNotice("Choose an image under 15 MB.");
      event.target.value = "";
      return;
    }
    const next = valid.map(file => {
      const src = URL.createObjectURL(file);
      urls.current.push(src);
      return {
        src,
        name: file.name
      };
    });
    setQueue(next);
    setCapturedCount(0);
    setIndex(0);
    setScreenPhoto(null);
    setPrints([]);
    setNotice(valid.length < files.length ? "Loaded up to 12 images under 15 MB. Press the shutter on top." : "Ready! Press the shutter on top of the camera.");
    event.target.value = "";
    try {
      await saveDraftMedia(hostMediaKey, valid);
      window.dispatchEvent(new Event("ribbon-host-photos"));
      setNotice("Host photos saved on this device. Open the guest preview to try the shutter.");
    } catch {
      setNotice("Photos are ready for this visit, but this browser could not save the draft.");
    }
  }
  function clearCollection() {
    setPrints([]);
    setCapturedCount(0);
    setScreenPhoto(null);
    setFlash(0);
    setViewer(null);
    setNotice("Your collection is clear. Take another little memory.");
  }
  function capture() {
    if (!queue.length) {
      setNotice("The host is preparing the memories.");
      return;
    }
    const photo = {
      ...queue[exhausted ? 0 : capturedCount],
      id: Date.now() + Math.random()
    };
    setPrints(items => exhausted ? [photo] : [...items, photo]);
    setScreenPhoto(photo);
    setFlash(value => value + 1);
    setNotice("Click! Your little memory is ready.");
    setCapturedCount(value => exhausted ? 1 : value + 1);
  }
  return <section className="rsb-camera-section rsb-reveal" id="memories" aria-labelledby="rsb-camera-title"><RibbonSectionBubbles />
    <div className="rsb-camera-side"><h2 id="rsb-camera-title">{tr("ribbonSketch.capture.65")}<br />{tr("ribbonSketch.theMoments.66")}</h2><p className="rsb-hand">{tr("ribbonSketch.revealAMemory.75")}</p></div><p className="rsb-camera-side rsb-camera-side-right rsb-hand">{tr("ribbonSketch.same.68")}<br />{tr("ribbonSketch.friends.69")}<br />{tr("ribbonSketch.different.70")}<br /><RibbonText>{tr("ribbonSketch.chapter.71")}</RibbonText></p>
    <div className="rsb-camera" data-flash={flash}>
      <img className="rsb-camera-body" src="/images/birthday/ribbon-sketch/digital-camera.png" alt={tr("ribbonSketch.champagneSilverDigitalCamera.100")} />
      <div className="rsb-camera-screen">
        {screenPhoto || editMode && queue.length ? <img src={(screenPhoto ?? queue[index]).src} alt={"A little memory: " + (screenPhoto ?? queue[index]).name} /> : <span>{tr("ribbonSketch.aLittle.72")}<br />{tr("ribbonSketch.surprise.73")}<small><RibbonText>{tr("ribbonSketch.pressTheShutterOnTop.74")}</RibbonText></small></span>}
        {screenPhoto && !exhausted && <span className="rsb-camera-counter">{prints.length}{tr("ribbonSketch.memories.101")}</span>}
      </div>
      <span className="rsb-shutter-cue" aria-hidden="true"><span>{tr("ribbonSketch.pressHere.78")}</span><svg viewBox="0 0 70 42"><path d="M12 8l10 17M35 2v19M58 8L48 25" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg></span>
      <button type="button" className="rsb-shutter" disabled={!queue.length} onClick={capture} aria-label={tr("ribbonSketch.pressCameraShutter.102")}><span className="rs-sr-only">{tr("ribbonSketch.pressCameraShutter.102")}</span></button>
      {flash > 0 && motion && <span className="rsb-camera-flash" key={flash} aria-hidden="true" />}
    </div>
    {editMode && <div className="rsb-host-editor"><p>{tr("ribbonSketch.hostPhotos.79")}</p><div className="rsb-camera-actions">
      <button type="button" className="rsb-button rsb-outline" onClick={() => input.current?.click()}>{tr("ribbonSketch.uploadHostPhotos.80")}</button>
      {queue.length > 1 && <div className="rsb-preview-nav"><button type="button" aria-label={tr("ribbonSketch.previousPreview.103")} onClick={() => setIndex(i => (i - 1 + queue.length) % queue.length)}><InvitationArtwork name="arrow-left" size="1em" /></button><span>{index + 1}{tr("ribbonSketch.of.104")}{queue.length}</span><button type="button" aria-label={tr("ribbonSketch.nextPreview.105")} onClick={() => setIndex(i => (i + 1) % queue.length)}><InvitationArtwork name="arrow-right" size="1em" /></button></div>}
    </div><p className="rsb-local">{tr("ribbonSketch.savedOnThisDeviceSharedPublishingIsNot.81")}</p><a href="/invitations/birthday-ribbon-sketch#memories"><RibbonText>{tr("ribbonSketch.openGuestPreview.82")}</RibbonText></a></div>}

    {editMode && <input ref={input} className="rs-file-input" type="file" multiple accept="image/*" onChange={choose} aria-label={tr("ribbonSketch.uploadHostPhotosForTheCamera.106")} />}
    <p className="rsb-camera-status rs-sr-only" role="status" aria-live="polite">{notice}</p>
    {<div className="rsb-print-shelf" aria-label={tr("ribbonSketch.yourCapturedMemories.107")}>
      <div className="rsb-print-track">{prints.map((photo, i) => <button type="button" className="rsb-print" key={photo.id} onClick={() => setViewer(photo)} aria-label={"View little memory " + (i + 1)} style={{
          "--print-rotation": (i % 2 ? 3 : -3) + "deg",
          "--print-x": [13, 76, 15, 74][i % 4] + Math.floor(i / 4) * .6 + "%",
          "--print-y": [11, 10, 65, 65][i % 4] + Math.floor(i / 4) * .6 + "%",
          "--print-order": i
        }}><img src={photo.src} alt={photo.name} /><span>{tr("ribbonSketch.littleMemory.108")}{String(i + 1).padStart(2, "0")}</span></button>)}</div>
      <button type="button" className="rsb-text-button" disabled={!prints.length} onClick={clearCollection}>{tr("ribbonSketch.clearCollection.76")}</button>
    </div>}
    {viewer && <div className="rsb-photo-backdrop" onClick={event => {
      if (event.target === event.currentTarget) setViewer(null);
    }}><div className="rsb-photo-dialog" role="dialog" aria-modal="true" aria-label={tr("ribbonSketch.yourLittleMemory.109")}><button type="button" ref={close} onClick={() => setViewer(null)} aria-label={tr("ribbonSketch.closePhotograph.110")}><InvitationArtwork name="close" size={20} /></button><img src={viewer.src} alt={viewer.name} /></div></div>}
  </section>;
}
