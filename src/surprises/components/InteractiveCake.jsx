import { useState } from "react";
import { useLanguage } from "../../localization/LanguageContext.jsx";

const candleIds = [1, 2, 3];

export function CakeVisual({ litCandles = [true, true, true], onCandleClick, canBlow = false }) {
  const { t } = useLanguage();
  return (
    <div className="surprise-cake-art" aria-label={t("surprise.cake.aria")}>
      <div className="surprise-cake-candles">
        {candleIds.map((id, index) => {
          const candle = <><span className={`surprise-flame${litCandles[index] ? " is-lit" : ""}`} /><span className="surprise-wick" /><span className="surprise-candle-stick" /></>;
          return onCandleClick ? (
            <button key={id} type="button" className="surprise-candle-control" aria-label={t("surprise.cake.candle", { number: id })} aria-pressed={!litCandles[index]} disabled={!canBlow || !litCandles[index]} onClick={() => onCandleClick(index)}>{candle}</button>
          ) : <span key={id} className="surprise-candle-control" aria-hidden="true">{candle}</span>;
        })}
      </div>
      <div className="surprise-cake-icing" /><div className="surprise-cake-top" /><div className="surprise-cake-body"><span>✿</span><span>✦</span><span>✿</span></div><div className="surprise-cake-base" /><div className="surprise-cake-stand" />
    </div>
  );
}

export default function InteractiveCake() {
  const { t } = useLanguage();
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
      <div className="surprise-section-copy"><span className="surprise-section-number">{t("surprise.cake.label")}</span><h2 id="cake-title">{t("surprise.cake.title")}</h2><p>{t("surprise.cake.description")}</p></div>
      <CakeVisual litCandles={litCandles} onCandleClick={blowCandle} canBlow={wishStarted} />
      <div className="surprise-cake-actions" aria-live="polite">
        {allOut ? <><strong>{t("surprise.cake.made")}</strong><p>{t("surprise.cake.blessing")}</p><button type="button" className="surprise-outline-button" onClick={reset}>{t("surprise.cake.relight")}</button></> : wishStarted ? <><p>{t("surprise.cake.tap")}</p><button type="button" className="surprise-solid-button" onClick={() => setLitCandles([false, false, false])}>{t("surprise.cake.blowAll")}</button></> : <button type="button" className="surprise-solid-button" onClick={() => setWishStarted(true)}>{t("surprise.cake.wish")}</button>}
      </div>
    </section>
  );
}
