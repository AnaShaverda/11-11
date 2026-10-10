import { captionValue,  createCaptionCopy } from "../../localization/captionValues.js";
import { useState } from "react";
import InvitationArtwork from "./InvitationArtwork.jsx";
import { partyToasts } from "../data/partyToasts.js";

const categories = ["all", "women", "bride", "friendship", "love", "celebration"];
const labels = createCaptionCopy([
  "invitations.components.ToastCollection.copy1.0",
  "invitations.components.ToastCollection.copy1.1",
  "invitations.components.ToastCollection.copy1.2",
  "invitations.components.ToastCollection.copy1.3",
  "invitations.components.ToastCollection.copy1.4",
  "invitations.components.ToastCollection.copy1.5"
]);
export default function ToastCollection({ language, bridal, onChoose }) {
  const ka = language === "ka";
  const lang = ka ? "ka" : "en";
  const [category, setCategory] = useState("all");
  const [index, setIndex] = useState(0);
  const visibleCategories = categories.filter(item => bridal ? item !== "celebration" : item !== "bride");
  const list = partyToasts.filter(item => (category === "all" || item.category === category) && (bridal ? item.category !== "celebration" : item.category !== "bride"));
  const current = list[index % list.length][lang];
  function change(next) { setCategory(next); setIndex(0); }
  return <section className="party-toast-collection" aria-labelledby="party-collection-title">
    <div className="party-collection-header"><h2 id="party-collection-title">{captionValue("ui.invitations.components.ToastCollection.aCollectionOf", language)}<br /><em>{captionValue("ui.invitations.components.ToastCollection.lovelyToasts", language)}</em></h2><p>{captionValue("ui.invitations.components.ToastCollection.forWhenYourWordsNeedALittle", language)}</p></div>
    <div className="party-toast-categories" role="group" aria-label={captionValue("ui.invitations.components.ToastCollection.toastCategory", language)}>{visibleCategories.map(item => <button key={item} aria-pressed={category === item} onClick={() => change(item)}>{labels[lang][categories.indexOf(item)]}</button>)}</div>
    <article className="party-toast-page" aria-live="polite" aria-atomic="true"><span className="party-toast-number" aria-hidden="true">{String(index % list.length + 1).padStart(2, "0")}</span><div><h3>{current.title}</h3><blockquote>{current.body}</blockquote></div><span className="party-toast-heart" aria-hidden="true"><InvitationArtwork name="heart" size={38} /></span></article>
    <div className="party-toast-controls"><div><button className="party-round-button" aria-label={captionValue("ui.invitations.components.ToastCollection.previousToast", language)} onClick={() => setIndex(value => (value % list.length + list.length - 1) % list.length)}><InvitationArtwork name="arrow-left" size={20} /></button><span>{index % list.length + 1} / {list.length}</span><button className="party-round-button" aria-label={captionValue("ui.invitations.components.ToastCollection.nextToast", language)} onClick={() => setIndex(value => (value + 1) % list.length)}><InvitationArtwork name="arrow-right" size={20} /></button></div><button className="cherry-button" onClick={() => onChoose(current.body)}>{captionValue("ui.invitations.components.ToastCollection.raiseThisToast", language)}<InvitationArtwork name="sparkle" size={18} /></button></div>
  </section>;
}
