import { captionValue } from "../../localization/captionValues.js";
import RibbonSectionBubbles from "./RibbonSectionBubbles.jsx";
import { useState } from "react";
import { useLanguage } from "../../localization/LanguageContext.jsx";
import InvitationArtwork from "../components/InvitationArtwork.jsx";

const questions = [
  [
    "ribbonSketch.whenIsAnikoSBirthday.115",
    "ribbonSketch.23May.116",
    "ribbonSketch.17May.117",
    "ribbonSketch.23June.118"
  ],
  [
    "ribbonSketch.whereAreWeCelebrating.119",
    "ribbonSketch.tbilisi.120",
    "ribbonSketch.batumi.121",
    "ribbonSketch.kutaisi.122"
  ],
  [
    "ribbonSketch.whatSTheDressCode.123",
    "ribbonSketch.prettyInPink.124",
    "ribbonSketch.allInWhite.125",
    "ribbonSketch.blackTie.126"
  ],
  [
    "ribbonSketch.whenDoesThePartyStart.127",
    "ribbonSketch.1700.128",
    "ribbonSketch.1900.129",
    "ribbonSketch.2000.130"
  ]
];
export default function RibbonSketchGames() {
  const { language } = useLanguage();
  const ka = language === "ka";
  const t = (captionKey, values) => captionValue(captionKey, language, values);
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState(null);
  const question = questions[answers.length];
  const options = question ? [question[1], question[2], question[3]] : [];
  if (question) options.push(...options.splice(0, answers.length % 3));
  function reset() {
    setAnswers([]); setSelected(null);
  }
  return <section id="party-games" className="rsb-games rsb-reveal" aria-labelledby="rsb-games-title"><RibbonSectionBubbles />
    <div className="rsb-game-intro"><img className="rsb-game-ribbon" src="/images/components/separated/burgundy-bow.webp" alt="" /><h2 id="rsb-games-title">{captionValue("invitations.ribbon-sketch.RibbonSketchGames.caption1", language)}</h2><p className="rsb-hand">{captionValue("invitations.ribbon-sketch.RibbonSketchGames.caption2", language)}</p><p>{captionValue("invitations.ribbon-sketch.RibbonSketchGames.caption3", language)}</p></div>
    <div className="rsb-game-paper">
      {question ? <div className="rsb-quiz" key={answers.length}>
        <p className="rsb-game-count">{answers.length + 1} / {questions.length}</p>
        <h3>{captionValue(question[0], language)}</h3>
        <div className="rsb-game-options">{options.map(option => <button type="button" key={option} disabled={selected !== null} className={selected !== null && option === question[1] ? "is-correct" : selected === option ? "is-wrong" : ""} onClick={() => setSelected(option)}>{captionValue(option, language)}{selected !== null && option === question[1] && <InvitationArtwork name="check" size={20} />}</button>)}</div>
        {selected !== null && <div className="rsb-game-feedback" role="status"><p>{selected === question[1] ? captionValue("invitations.ribbon-sketch.RibbonSketchGames.caption4", language) : captionValue("invitations.ribbon-sketch.RibbonSketchGames.caption5", language)}</p><button className="rsb-button" type="button" onClick={() => { setAnswers(value => [...value, selected === question[1]]); setSelected(null); }}>{captionValue("invitations.ribbon-sketch.RibbonSketchGames.caption6", language)}<InvitationArtwork name="arrow-right" size={20} /></button></div>}
      </div> : <div className="rsb-game-result" role="status"><img className="rsb-game-ribbon" src="/images/components/separated/burgundy-bow.webp" alt="" /><h3>{answers.filter(Boolean).length} / {questions.length}</h3><p className="rsb-hand">{captionValue("invitations.ribbon-sketch.RibbonSketchGames.caption7", language)}</p><button type="button" className="rsb-button" onClick={reset}>{captionValue("invitations.ribbon-sketch.RibbonSketchGames.caption8", language)}</button></div>}
    </div>
  </section>;
}
