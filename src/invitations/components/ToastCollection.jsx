import { useState } from "react";
import InvitationArtwork from "./InvitationArtwork.jsx";
import { partyToasts } from "../data/partyToasts.js";

const categories = ["all", "women", "bride", "friendship", "love", "celebration"];
const labels = {
  en: ["All toasts", "To women", "To the bride", "To friendship", "To love", "To the birthday girl"],
  ka: ["ყველა", "ქალებს", "პატარძალს", "მეგობრობას", "სიყვარულს", "იუბილარს"],
};
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
    <div className="party-collection-header"><h2 id="party-collection-title">{ka ? "სადღეგრძელოების" : "A collection of"}<br /><em>{ka ? "კრებული" : "lovely toasts."}</em></h2><p>{ka ? "როცა სათქმელს პატარა შთაგონება სჭირდება. აირჩიე სადღეგრძელო და ასწიე ბოკალი." : "For when your words need a little inspiration. Find a toast, then raise your glass."}</p></div>
    <div className="party-toast-categories" role="group" aria-label={ka ? "სადღეგრძელოს თემა" : "Toast category"}>{visibleCategories.map(item => <button key={item} aria-pressed={category === item} onClick={() => change(item)}>{labels[lang][categories.indexOf(item)]}</button>)}</div>
    <article className="party-toast-page" aria-live="polite" aria-atomic="true"><span className="party-toast-number" aria-hidden="true">{String(index % list.length + 1).padStart(2, "0")}</span><div><h3>{current.title}</h3><blockquote>{current.body}</blockquote></div><span className="party-toast-heart" aria-hidden="true"><InvitationArtwork name="heart" size={38} /></span></article>
    <div className="party-toast-controls"><div><button className="party-round-button" aria-label={ka ? "წინა სადღეგრძელო" : "Previous toast"} onClick={() => setIndex(value => (value % list.length + list.length - 1) % list.length)}><InvitationArtwork name="arrow-left" size={20} /></button><span>{index % list.length + 1} / {list.length}</span><button className="party-round-button" aria-label={ka ? "შემდეგი სადღეგრძელო" : "Next toast"} onClick={() => setIndex(value => (value + 1) % list.length)}><InvitationArtwork name="arrow-right" size={20} /></button></div><button className="cherry-button" onClick={() => onChoose(current.body)}>{ka ? "ამ სადღეგრძელოს გაუმარჯოს" : "Raise this toast"}<InvitationArtwork name="sparkle" size={18} /></button></div>
  </section>;
}
