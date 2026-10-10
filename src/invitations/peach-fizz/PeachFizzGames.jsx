import { useState } from "react";

export default function PeachFizzGames({ text }) {
  const [fortune, setFortune] = useState(-1);
  const [question, setQuestion] = useState(-1);
  const [answer, setAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const finished = question === text.questions.length;
  const current = text.questions[question];
  function begin() { setQuestion(0); setAnswer(null); setScore(0); }
  function choose(index) {
    if (answer !== null) return;
    setAnswer(index);
    if (index === current.answer) setScore(value => value + 1);
  }
  return <section className="pf-section pf-games" id="pf-games" aria-labelledby="pf-games-title">
    <div className="pf-wrap">
      <h2 id="pf-games-title">{text.games}</h2><p className="pf-label pf-game-label">{text.optional}</p>
      <div className="pf-game-layout">
        <div className="pf-ticket pf-fortune">
          <div className="pf-ticket-inner">
            <p className="pf-label">{text.ticket}</p>
            <div className="pf-fortune-body" aria-live="polite">
              {fortune < 0 ? <h3>{text.fortuneTitle}</h3> : <p className="pf-fortune-message">{text.fortunes[fortune]}</p>}
            </div>
            <button className="pf-button" onClick={() => setFortune(value => value < 0 ? Math.floor(Math.random() * text.fortunes.length) : (value + 1) % text.fortunes.length)}>{fortune < 0 ? text.reveal : text.another}</button>
          </div>
        </div>
        <div className="pf-quiz-side">
          <div className="pf-ticket pf-quiz">
            <div className="pf-ticket-inner">
              {question < 0 ? <><h3>{text.quiz}</h3><p>{text.quizLine}</p><button className="pf-button pf-outline" onClick={begin}>{text.startQuiz}</button></>
                : finished ? <div aria-live="polite"><h3>{text.result}</h3><p>{text.score}: {score} / {text.questions.length}</p><button className="pf-button pf-outline" onClick={begin}>{text.replay}</button></div>
                  : <><span className="pf-label">{question + 1} / {text.questions.length}</span><h3 className="pf-question">{current.title}</h3>
                    <div className="pf-quiz-options">{current.options.map((option, i) => <button key={i} disabled={answer !== null} aria-pressed={answer === i} onClick={() => choose(i)}>{option}</button>)}</div>
                    <p className="pf-answer" role="status">{answer === null ? "" : answer === current.answer ? text.correct : `${text.incorrect} ${current.options[current.answer]}`}</p>
                    {answer !== null ? <button className="pf-button pf-outline" onClick={() => { setQuestion(value => value + 1); setAnswer(null); }}>{text.next}</button> : null}
                  </>}
            </div>
          </div>
          <a className="pf-text-link" href="#pf-wishes">{text.skip}</a>
        </div>
      </div>
    </div>
  </section>;
}
