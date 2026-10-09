import InvitationArtwork from "../components/InvitationArtwork.jsx";
import RibbonText from "./RibbonText.jsx";
import { useRibbonCopy } from "./copy.js";
import { useEffect, useState } from "react";
import { getDraftMedia } from "../data/draftMedia.js";
import { celebrationArtwork } from "./celebrationArtwork.js";
export default function RibbonSketchDiary() {
  const tr = useRibbonCopy();
  const [photos, setPhotos] = useState(() => celebrationArtwork.map(p => ({
    src: p.src,
    caption: p.caption
  })));
  const [index, setIndex] = useState(0);
  useEffect(() => {
    let alive = true,
      urls = [];
    async function read() {
      try {
        const files = await getDraftMedia("ribbon-sketch:host-photos");
        if (!alive || !files?.length) return;
        const next = files.filter(f => f instanceof Blob && f.type.startsWith("image/")).map(f => {
          const src = URL.createObjectURL(f);
          urls.push(src);
          return {
            src,
            caption: f.name?.replace(/\.[^.]+$/, "") || "A lovely little memory"
          };
        });
        if (next.length) {
          setPhotos(next);
          setIndex(0);
        }
      } catch {}
    }
    read();
    window.addEventListener("ribbon-host-photos", read);
    return () => {
      alive = false;
      window.removeEventListener("ribbon-host-photos", read);
      urls.forEach(URL.revokeObjectURL);
    };
  }, []);
  function turn(step) {
    setIndex(i => (i + step + photos.length) % photos.length);
  }
  return <section className="rsb-diary rsb-reveal" id="photo-diary" aria-labelledby="rsb-diary-title">
  <div className="rsb-diary-intro"><p className="rsb-diary-eyebrow">{tr("The person. The moments. The memories.")}</p><h2 id="rsb-diary-title">{tr("Our little")}<br />{tr("photo diary")}</h2><p className="rsb-hand"><RibbonText>{tr("Same girl, a thousand little stories \u2661")}</RibbonText></p><p>{tr("Turn the page for another little memory.")}</p></div>
  <div className="rsb-diary-album">
   <img className="rsb-diary-frame" src="/images/components/separated/ribbon-frame.webp" alt="" />
   <figure className="rsb-diary-photo" key={photos[index].src}><img src={photos[index].src} alt={photos[index].caption} /><figcaption><RibbonText>{photos[index].caption}</RibbonText></figcaption></figure>
   <div className="rsb-diary-controls"><button type="button" aria-label={tr("Previous diary memory")} onClick={() => turn(-1)}><InvitationArtwork name="arrow-left" size="1em" /></button><span aria-live="polite">{tr("Memory")}{" "}{index + 1}{tr("/")}{photos.length}</span><button type="button" aria-label={tr("Next diary memory")} onClick={() => turn(1)}><InvitationArtwork name="arrow-right" size="1em" /></button></div>
   <div className="rsb-diary-thumbnails" aria-label={tr("Choose a diary memory")}>{photos.map((photo, i) => <button type="button" key={photo.src} aria-label={"Show diary memory " + (i + 1)} aria-pressed={i === index} onClick={() => setIndex(i)}><img src={photo.src} alt="" /></button>)}</div>
  </div>
 </section>;
}
