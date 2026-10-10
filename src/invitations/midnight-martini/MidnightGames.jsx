import { useState } from 'react';

export default function MidnightGames({ text }) {
  const [tab, setTab] = useState(0);
  const [toast, setToast] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [question, setQuestion] = useState(-1);
  const [answer, setAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const current = text.questions[question];
  function begin() { setQuestion(0); setAnswer(null); setScore(0); }
  return <section className="mm-section mm-night mm-games" id="mm-games" aria-labelledby="mm-games-title"><div className="mm-wrap mm-grid">
    <div><h2 id="mm-games-title">{text.gamesTitle.map(line => <span key={line}>{line}</span>)}</h2><p className="mm-intro">{text.gamesLine}</p></div>
    <div className="mm-game-card">
      <div className="mm-game-tabs" role="group" aria-label={text.optional}>{text.gameTabs.map((label, i) => <button key={label} aria-pressed={tab === i} onClick={() => setTab(i)}>{label}</button>)}<span className="mm-game-progress">{tab === 0 ? `${Math.max(1, toast + 1)} / ${text.toasts.length}` : `${Math.max(1, Math.min(question + 1, text.questions.length))} / ${text.questions.length}`}</span></div>
      {tab === 0 ? <div className="mm-toast-panel"><blockquote aria-live="polite">{text.toasts[toast]}</blockquote><button className="mm-button" onClick={() => { setToast(value => (value + 1) % text.toasts.length); setRevealed(true); }}>{revealed ? text.another : text.reveal}</button></div>
        : question < 0 ? <div className="mm-quiz"><h3>{text.quiz}</h3><p>{text.quizLine}</p><button className="mm-button" onClick={begin}>{text.startQuiz}</button></div>
          : question === text.questions.length ? <div className="mm-quiz" role="status"><h3>{text.result}</h3><p>{text.score}: {score} / {text.questions.length}</p><button className="mm-button" onClick={begin}>{text.replay}</button></div>
            : <div className="mm-quiz"><h3>{current.title}</h3><div className="mm-quiz-options">{current.options.map((option, i) => <button key={option} disabled={answer !== null} aria-pressed={answer === i} onClick={() => { setAnswer(i); if (i === current.answer) setScore(value => value + 1); }}>{option}</button>)}</div><p className="mm-answer" role="status">{answer === null ? '' : answer === current.answer ? text.correct : `${text.incorrect} ${current.options[current.answer]}`}</p>{answer !== null && <button className="mm-button" onClick={() => { setQuestion(value => value + 1); setAnswer(null); }}>{text.next}</button>}</div>}
    </div>
  </div></section>;
}
