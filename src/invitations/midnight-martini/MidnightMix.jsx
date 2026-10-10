import { useState } from 'react';
import { midnightAssets, celebrateMidnight } from './copy.js';

export default function MidnightMix({ text, motion }) {
  const [choice, setChoice] = useState(0);
  const [toasted, setToasted] = useState(false);
  const [round, setRound] = useState(0);
  function cheers() {
    setToasted(true); setRound(value => value + 1);
    if (motion) celebrateMidnight();
  }
  return <section className="mm-section mm-mix" id="mm-mix" aria-labelledby="mm-mix-title">
    <div className="mm-wrap mm-grid">
      <div><h2 id="mm-mix-title">{text.mixTitle.map(line => <span key={line}>{line}</span>)}</h2>
        <p className="mm-label mm-mix-label">{text.mixLine}</p>
        <div className="mm-choices" role="group" aria-label={text.mixLine}>{text.mixChoices.map((label, i) => <button key={label} aria-pressed={choice === i} onClick={() => { setChoice(i); setToasted(false); }}>{label}</button>)}</div>
        <button className="mm-button" onClick={cheers}>{toasted ? text.cheersAgain : text.cheersButton}</button>
      </div>
      <div className={`mm-mix-art mm-choice-${choice}`}>
        <button className={`mm-glass-button ${toasted ? 'mm-toasted' : ''}`} onClick={cheers} aria-label={text.cheersButton}><img key={round} src={midnightAssets.artwork} alt="" width="1254" height="1254" loading="lazy" /></button>
        {choice === 1 && <img className="mm-extra-star" src={midnightAssets.star} alt="" aria-hidden="true" />}
        <p className="mm-mix-status" role="status">{toasted ? text.cheersMessage : text.mixMessages[choice]}</p>
      </div>
    </div>
  </section>;
}
