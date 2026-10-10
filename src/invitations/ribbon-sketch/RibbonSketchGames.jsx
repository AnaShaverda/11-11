import RibbonSectionBubbles from "./RibbonSectionBubbles.jsx";
import { useState } from "react";
import { useLanguage } from "../../localization/LanguageContext.jsx";
import InvitationArtwork from "../components/InvitationArtwork.jsx";

const questions = [
  ["When is Aniko’s birthday?", "როდის არის ანიკოს დაბადების დღე?", ["23 May", "23 მაისი"], ["17 May", "17 მაისი"], ["23 June", "23 ივნისი"]],
  ["Where are we celebrating?", "სად ვიკრიბებით?", ["Tbilisi", "თბილისი"], ["Batumi", "ბათუმი"], ["Kutaisi", "ქუთაისი"]],
  ["What’s the dress code?", "როგორია ჩაცმის სტილი?", ["Pretty in pink", "ვარდისფერი განწყობა"], ["All in white", "ყველაფერი თეთრი"], ["Black tie", "კლასიკური საღამო"]],
  ["When does the party start?", "როდის იწყება წვეულება?", ["17:00", "17:00"], ["19:00", "19:00"], ["20:00", "20:00"]],
];
export default function RibbonSketchGames() {
  const { language } = useLanguage();
  const ka = language === "ka";
  const t = (en, ge) => ka ? ge : en;
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState(null);
  const question = questions[answers.length];
  const options = question ? [question[2], question[3], question[4]] : [];
  if (question) options.push(...options.splice(0, answers.length % 3));
  function reset() {
    setAnswers([]); setSelected(null);
  }
  return <section id="party-games" className="rsb-games rsb-reveal" aria-labelledby="rsb-games-title"><RibbonSectionBubbles />
    <div className="rsb-game-intro"><img className="rsb-game-ribbon" src="/images/components/separated/burgundy-bow.webp" alt="" /><h2 id="rsb-games-title">{t("Ready for the party?", "მზად ხარ წვეულებისთვის?")}</h2><p className="rsb-hand">{t("A little party quiz", "პატარა წვეულების ქვიზი")}</p><p>{t("Four little questions. Let’s see what you remember from the invitation.", "ოთხი პატარა კითხვა. ვნახოთ, რა გახსოვს მოსაწვევიდან.")}</p></div>
    <div className="rsb-game-paper">
      {question ? <div className="rsb-quiz" key={answers.length}>
        <p className="rsb-game-count">{answers.length + 1} / {questions.length}</p>
        <h3>{question[ka ? 1 : 0]}</h3>
        <div className="rsb-game-options">{options.map(option => <button type="button" key={option[0]} disabled={selected !== null} className={selected !== null && option === question[2] ? "is-correct" : selected === option[0] ? "is-wrong" : ""} onClick={() => setSelected(option[0])}>{option[ka ? 1 : 0]}{selected !== null && option === question[2] && <InvitationArtwork name="check" size={20} />}</button>)}</div>
        {selected !== null && <div className="rsb-game-feedback" role="status"><p>{selected === question[2][0] ? t("You remembered!", "გახსოვს!") : t("A little reminder for the party.", "პატარა შეხსენება წვეულებისთვის.")}</p><button className="rsb-button" type="button" onClick={() => { setAnswers(value => [...value, selected === question[2][0]]); setSelected(null); }}>{t("Continue", "გაგრძელება")}<InvitationArtwork name="arrow-right" size={20} /></button></div>}
      </div> : <div className="rsb-game-result" role="status"><img className="rsb-game-ribbon" src="/images/components/separated/burgundy-bow.webp" alt="" /><h3>{answers.filter(Boolean).length} / {questions.length}</h3><p className="rsb-hand">{t("Ready for Aniko’s big day!", "ანიკოს დღისთვის მზად ხარ!")}</p><button type="button" className="rsb-button" onClick={reset}>{t("Play again", "თავიდან თამაში")}</button></div>}
    </div>
  </section>;
}
