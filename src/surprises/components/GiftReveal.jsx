import { useState } from "react";

export default function GiftReveal({ message }) {
  const [opened, setOpened] = useState(false);
  return (
    <section className={`surprise-section surprise-gift-section${opened ? " is-open" : ""}`} aria-labelledby="gift-title">
      <div className="surprise-section-copy"><span className="surprise-section-number">09 / JUST FOR YOU</span><h2 id="gift-title">A little something for you.</h2><p>There is one more thing I wanted to give you.</p></div>
      <div className="surprise-gift-stage">
        <div className="surprise-gift-box" aria-hidden="true"><span className="surprise-gift-lid"/><span className="surprise-gift-ribbon"/><span className="surprise-gift-bow">∞</span><span className="surprise-gift-front"/></div>
        <div className="surprise-gift-note" aria-hidden={!opened}><span>✦</span><p>{message}</p></div>
      </div>
      <button type="button" className="surprise-solid-button" aria-expanded={opened} onClick={() => setOpened((value) => !value)}>{opened ? "Wrap it again" : "Open your gift 🎁"}</button>
    </section>
  );
}
