import { captionValue,  createCaptionCopy } from "../../localization/captionValues.js";
import { useState } from "react";
import InvitationArtwork from "./InvitationArtwork.jsx";
const decks = {
  roulette: createCaptionCopy({
  "title": "invitations.components.PartyGames.copy1.title",
  "prompts": [
    "invitations.components.PartyGames.copy1.prompts.0",
    "invitations.components.PartyGames.copy1.prompts.1",
    "invitations.components.PartyGames.copy1.prompts.2",
    "invitations.components.PartyGames.copy1.prompts.3",
    "invitations.components.PartyGames.copy1.prompts.4",
    "invitations.components.PartyGames.copy1.prompts.5"
  ]
}),
  likely: createCaptionCopy({
  "title": "invitations.components.PartyGames.copy2.title",
  "prompts": [
    "invitations.components.PartyGames.copy2.prompts.0",
    "invitations.components.PartyGames.copy2.prompts.1",
    "invitations.components.PartyGames.copy2.prompts.2",
    "invitations.components.PartyGames.copy2.prompts.3",
    "invitations.components.PartyGames.copy2.prompts.4",
    "invitations.components.PartyGames.copy2.prompts.5"
  ]
}),
  never: createCaptionCopy({
  "title": "invitations.components.PartyGames.copy3.title",
  "prompts": [
    "invitations.components.PartyGames.copy3.prompts.0",
    "invitations.components.PartyGames.copy3.prompts.1",
    "invitations.components.PartyGames.copy3.prompts.2",
    "invitations.components.PartyGames.copy3.prompts.3",
    "invitations.components.PartyGames.copy3.prompts.4",
    "invitations.components.PartyGames.copy3.prompts.5"
  ]
}),
};
function shuffle() {
  const cards = [0, 1, 2, 3, 4, 5];
  for (let i = cards.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [cards[i], cards[j]] = [cards[j], cards[i]]; }
  return cards;
}
export default function PartyGames({ language }) {
  const ka = language === "ka";
  const lang = ka ? "ka" : "en";
  const [mode, setMode] = useState("roulette");
  const [round, setRound] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [order, setOrder] = useState(shuffle);
  const deck = decks[mode][lang];
  function choose(next) { setMode(next); setRound(0); setRevealed(false); setOrder(shuffle()); }
  function next() { setRound(value => value + 1); setRevealed(false); }
  return <section className="party-games" aria-labelledby="party-games-title"><div className="party-games-copy"><h2 id="party-games-title">{captionValue("ui.invitations.components.PartyGames.aLittlePartyPlay", language)}</h2><p>{captionValue("ui.invitations.components.PartyGames.gatherYourGirlsChooseAGameAnd", language)}</p><div className="party-game-modes" role="group" aria-label={captionValue("ui.invitations.components.PartyGames.chooseAGame", language)}>{Object.keys(decks).map(key => <button key={key} aria-pressed={mode === key} onClick={() => choose(key)}>{decks[key][lang].title}</button>)}</div><p className="party-game-rule">{(mode === "roulette" ? captionValue("ui.invitations.components.PartyGames.giveYourToastThenEveryoneRaisesA", language) : (mode === "likely" ? captionValue("ui.invitations.components.PartyGames.countToThreeAndPointTheChosen", language) : captionValue("ui.invitations.components.PartyGames.ifYouVeDoneItShareThe", language)))}</p><small>{captionValue("ui.invitations.components.PartyGames.anyDrinkYourRules", language)}</small></div><div className="party-game-table"><button className={`party-game-card ${revealed ? "party-game-revealed" : ""}`} onClick={() => setRevealed(value => !value)} aria-expanded={revealed} aria-label={(revealed ? captionValue("ui.invitations.components.PartyGames.turnCardOver", language) : captionValue("ui.invitations.components.PartyGames.revealPartyCard", language))}><span className="party-game-card-title">{deck.title}</span>{revealed ? <span className="party-game-prompt">{deck.prompts[order[round % order.length]]}</span> : <><InvitationArtwork name="sparkle" size={64} /><span>{captionValue("ui.invitations.components.PartyGames.tapForALittleFun", language)}</span></>}<small>{captionValue("ui.invitations.components.PartyGames.round", language)} {round + 1}</small></button><button className="cherry-link" onClick={next}>{captionValue("ui.invitations.components.PartyGames.nextCard", language)}<InvitationArtwork name="arrow-right" size={18} /></button></div></section>;
}
