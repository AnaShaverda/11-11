import { useEffect, useRef, useState } from "react";
import FullscreenChapter from "./FullscreenChapter.jsx";
import InvitationArtwork from "./InvitationArtwork.jsx";

const items = ["cake", "slice", "cherries", "present", "bow", "cupcake"];
const names = {
 en: ["Birthday cake", "Cake slice", "Cherries", "Present", "Ribbon bow", "Cupcake"],
 ka: ["დაბადების დღის ტორტი", "ტორტის ნაჭერი", "ალუბალი", "საჩუქარი", "ბაფთა", "კექსი"],
};
function newDeck() {
 const deck = items.flatMap(type => [0, 1].map(copy => ({ id: `${type}-${copy}`, type })));
 for (let i = deck.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [deck[i], deck[j]] = [deck[j], deck[i]]; }
 return deck;
}
export default function BirthdayMatchGame({ language, motion, onComplete }) {
 const ka = language === "ka";
 const [deck, setDeck] = useState(newDeck);
 const [revealed, setRevealed] = useState([]);
 const [matched, setMatched] = useState([]);
 const [moves, setMoves] = useState(0);
 const [notice, setNotice] = useState("ready");
 const pending = useRef(null);
 const locked = useRef(false);
 const first = useRef(null);
 useEffect(() => () => clearTimeout(pending.current), []);
 function pick(card) {
  if (locked.current || matched.includes(card.type) || revealed.includes(card.id)) return;
  if (!first.current) { first.current = card; setRevealed([card.id]); setNotice("pick"); return; }
  const previous = first.current;
  first.current = null;
  setMoves(value => value + 1);
  setRevealed([previous.id, card.id]);
  if (previous.type === card.type) {
   const next = [...matched, card.type]; setMatched(next); setRevealed([]);
   setNotice(next.length === items.length ? "complete" : "match");
   if (next.length === items.length) onComplete?.();
  } else {
   locked.current = true; setNotice("miss");
   pending.current = setTimeout(() => { setRevealed([]); locked.current = false; setNotice("ready"); }, motion ? 1100 : 900);
  }
 }
 function reset() { clearTimeout(pending.current); locked.current = false; first.current = null; setDeck(newDeck()); setRevealed([]); setMatched([]); setMoves(0); setNotice("ready"); }
 const status = ka ? { ready:"იპოვე ორი ერთნაირი ილუსტრაცია.", pick:"ახლა იპოვე მისი წყვილი.", match:"წყვილი ნაპოვნია!", miss:"კიდევ სცადე. დაიმახსოვრე ეს ორი.", complete:"ყველა წყვილი იპოვე! ტკბილი გამარჯვება." } : { ready:"Turn two cards. Find a matching pair.", pick:"Now find its matching partner.", match:"A sweet little match!", miss:"Not quite. Remember these two.", complete:"All six pairs. A sweet little victory!" };
 return <FullscreenChapter id="playground-game" className="doodles-game-screen" contentClassName="doodles-game-layout" aria-labelledby="doodles-game-title">
  <div className="doodles-game-copy"><h2 id="doodles-game-title">{ka ? "ტკბილი წყვილები." : "A little piece of cake."}</h2><img className="doodles-game-divider" src="/images/birthday/party-doodles/playground/match-bow.webp" alt=""/><p>{ka ? "იპოვე ერთნაირი წყვილები. ექვსი პატარა დაბადების დღის სიურპრიზი." : "Find the matching pairs. Six sweet little birthday surprises."}</p>
   <dl className="doodles-game-score"><div><dt>{ka ? "სვლები" : "Moves"}</dt><dd>{moves}</dd></div><div><dt>{ka ? "წყვილები" : "Pairs"}</dt><dd>{matched.length}<small> / 6</small></dd></div></dl>
   <button className="doodles-game-reset" onClick={reset}>{ka ? "აურიე და ითამაშე თავიდან" : "Shuffle & play again"}</button>
  </div>
  <div className="doodles-game-table"><div className="doodles-match-grid" aria-label={ka ? "დაბადების დღის წყვილების თამაში" : "Birthday matching pairs"}>
   {deck.map((card, index) => { const found = matched.includes(card.type); const faceUp = found || revealed.includes(card.id); const name = names[ka ? "ka" : "en"][items.indexOf(card.type)];
    return <button key={card.id} className={`doodles-match-card ${faceUp ? "is-revealed" : ""} ${found ? "is-matched" : ""}`} aria-label={faceUp ? `${index + 1}. ${name}${found ? (ka ? ", წყვილი ნაპოვნია" : ", matched") : ""}` : `${ka ? "გახსენი ბარათი" : "Reveal card"} ${index + 1}`} aria-disabled={found} aria-pressed={faceUp} onClick={() => pick(card)}>
     <span className="doodles-match-inner"><span className="doodles-match-back" aria-hidden="true"><img src="/images/birthday/party-doodles/playground/match-bow.webp" alt=""/></span><span className="doodles-match-front" aria-hidden="true"><img src={`/images/birthday/party-doodles/playground/match-${card.type}.webp`} alt="" draggable="false"/>{found && <span className="doodles-match-seal"><InvitationArtwork name="check" size={16}/></span>}</span></span>
    </button>;
   })}
  </div><p className={`doodles-game-status ${notice === "complete" ? "is-complete" : ""}`} role="status" aria-live="polite">{status[notice]}</p></div>
 </FullscreenChapter>;
}
