import { useState } from "react";

export default function LetterReveal({ letter, creatorName }) {
  const [opened, setOpened] = useState(false);
  return (
    <section className={`surprise-section surprise-letter-section${opened ? " is-open" : ""}`} aria-labelledby="letter-title">
      <div className="surprise-section-copy"><span className="surprise-section-number">10 / ONE LAST THING</span><h2 id="letter-title">A letter from me to you.</h2><p>Some words deserve a place of their own.</p></div>
      <div className="surprise-envelope" aria-hidden="true"><span className="surprise-envelope-back"/><span className="surprise-envelope-paper">For you, always.</span><span className="surprise-envelope-front"/><span className="surprise-envelope-flap"/><span className="surprise-envelope-seal">♥</span></div>
      <button type="button" className="surprise-solid-button" aria-expanded={opened} onClick={() => setOpened((value) => !value)}>{opened ? "Close the letter" : "Open the letter ✨"}</button>
      {opened ? <article className="surprise-letter-paper"><p>{letter}</p><span>With love, {creatorName} ♡</span></article> : null}
    </section>
  );
}
