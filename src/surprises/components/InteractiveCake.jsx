import { useState } from "react";

const candleIds = [1, 2, 3];

export function CakeVisual({ litCandles = [true, true, true], onCandleClick, canBlow = false }) {
  return (
    <div className="surprise-cake-art" aria-label="Birthday cake with three candles">
      <div className="surprise-cake-candles">
        {candleIds.map((id, index) => {
          const candle = <><span className={`surprise-flame${litCandles[index] ? " is-lit" : ""}`} /><span className="surprise-wick" /><span className="surprise-candle-stick" /></>;
          return onCandleClick ? (
            <button key={id} type="button" className="surprise-candle-control" aria-label={`Blow out candle ${id}`} aria-pressed={!litCandles[index]} disabled={!canBlow || !litCandles[index]} onClick={() => onCandleClick(index)}>{candle}</button>
          ) : <span key={id} className="surprise-candle-control" aria-hidden="true">{candle}</span>;
        })}
      </div>
      <div className="surprise-cake-icing" /><div className="surprise-cake-top" /><div className="surprise-cake-body"><span>✿</span><span>✦</span><span>✿</span></div><div className="surprise-cake-base" /><div className="surprise-cake-stand" />
    </div>
  );
}

export default function InteractiveCake() {
  const [wishStarted, setWishStarted] = useState(false);
  const [litCandles, setLitCandles] = useState([true, true, true]);
  const allOut = litCandles.every((lit) => !lit);

  function blowCandle(index) {
    setLitCandles((current) => current.map((lit, candleIndex) => candleIndex === index ? false : lit));
  }

  function reset() {
    setWishStarted(false);
    setLitCandles([true, true, true]);
  }

  return (
    <section className={`surprise-section surprise-cake-section${allOut ? " is-celebrating" : ""}`} id="surprise-cake" aria-labelledby="cake-title">
      <div className="surprise-section-copy"><span className="surprise-section-number">02 / A LITTLE WISH</span><h2 id="cake-title">Make a wish.</h2><p>Three candles, one big wish. This little moment is all yours.</p></div>
      <CakeVisual litCandles={litCandles} onCandleClick={blowCandle} canBlow={wishStarted} />
      <div className="surprise-cake-actions" aria-live="polite">
        {allOut ? <><strong>Wish made ✨</strong><p>May this year be as wonderful as you are.</p><button type="button" className="surprise-outline-button" onClick={reset}>Light them again</button></> : wishStarted ? <><p>Tap each candle to blow it out.</p><button type="button" className="surprise-solid-button" onClick={() => setLitCandles([false, false, false])}>Blow them all out ✨</button></> : <button type="button" className="surprise-solid-button" onClick={() => setWishStarted(true)}>Make a wish ✨</button>}
      </div>
    </section>
  );
}
