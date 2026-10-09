import { useEffect, useRef, useState } from "react";
import PortraitStickers from "./PortraitStickers";

const candleNames = ["2", "5"];
const cakeImage =
  "/custom-orders/a1cbe778fe47dc687ef50b9f24d4981d/images/birthday-cake-flat.png";
const numberImage =
  "/custom-orders/a1cbe778fe47dc687ef50b9f24d4981d/images/number-25-candles.png";

export default function BirthdayCake() {
  const [lit, setLit] = useState([true, true]);
  const [microphoneState, setMicrophoneState] = useState("idle");
  const [message, setMessage] = useState("");
  const audioRef = useRef(null);
  const requestId = useRef(0);
  const allOut = lit.every((flame) => !flame);

  function releaseMicrophone() {
    requestId.current += 1;
    const audio = audioRef.current;
    audioRef.current = null;
    if (audio) {
      cancelAnimationFrame(audio.frame);
      audio.stream.getTracks().forEach((track) => track.stop());
      void audio.context.close();
    }
  }

  useEffect(() => () => releaseMicrophone(), []);

  function blowOutAll() {
    releaseMicrophone();
    setMicrophoneState("idle");
    setLit([false, false]);
    setMessage("Your wish is on its way, Ani. Happy birthday!");
  }

  function blowOutOne(index) {
    const next = lit.map((flame, candle) => (candle === index ? false : flame));
    setLit(next);
    if (next.every((flame) => !flame)) {
      releaseMicrophone();
      setMicrophoneState("idle");
      setMessage("Your wish is on its way, " + name + ". Happy birthday!");
    } else {
      setMessage("Keep going—there are more wishes to make.");
    }
  }

  async function startMicrophone() {
    if (!navigator.mediaDevices?.getUserMedia) {
      setMessage(
        "Microphone access isn’t available here. Tap the candles instead.",
      );
      return;
    }

    releaseMicrophone();
    const id = requestId.current;
    setMicrophoneState("requesting");
    setMessage("Allow microphone access, then blow gently toward it.");

    let stream = null;
    let context = null;
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true, noiseSuppression: false },
      });
      if (id !== requestId.current) {
        stream.getTracks().forEach((track) => track.stop());
        return;
      }
      context = new AudioContext();
      await context.resume();
      if (id !== requestId.current) {
        stream.getTracks().forEach((track) => track.stop());
        void context.close();
        return;
      }

      const analyser = context.createAnalyser();
      analyser.fftSize = 2048;
      context.createMediaStreamSource(stream).connect(analyser);
      const samples = new Float32Array(analyser.fftSize);
      const started = performance.now();
      let baseline = 0.012;
      let blowingSince = 0;
      audioRef.current = { stream, context, frame: 0 };
      setMicrophoneState("listening");
      setMessage("Blow toward your microphone—or tap the candles.");

      const listen = (now) => {
        if (!audioRef.current || id !== requestId.current) return;
        analyser.getFloatTimeDomainData(samples);
        let squareSum = 0;
        for (const sample of samples) squareSum += sample * sample;
        const volume = Math.sqrt(squareSum / samples.length);

        if (now - started < 700) {
          baseline = baseline * 0.9 + volume * 0.1;
        } else if (volume > Math.max(0.045, baseline * 2.8)) {
          blowingSince ||= now;
          if (now - blowingSince > 180) {
            blowOutAll();
            return;
          }
        } else {
          blowingSince = 0;
        }
        audioRef.current.frame = requestAnimationFrame(listen);
      };
      audioRef.current.frame = requestAnimationFrame(listen);
    } catch {
      stream?.getTracks().forEach((track) => track.stop());
      if (context) void context.close();
      setMicrophoneState("idle");
      setMessage(
        "Microphone access didn’t start. Tap the candles to blow them out.",
      );
    }
  }

  function stopMicrophone() {
    releaseMicrophone();
    setMicrophoneState("idle");
    setMessage("Tap a candle, or turn the microphone on again.");
  }

  function relight() {
    setLit([true, true]);
    setMessage("Make another wish, Ani.");
  }

  return (
    <section className="page cake-page" aria-label="Birthday cake and candles">
      <div className="sun-glow" />
      <PortraitStickers page="cake" />
      <div className="cake-chapter" data-reveal>
        <p className="eyebrow">Chapter 03 · Make a wish</p>
        <h2>A cake just for you, Ani.</h2>
        <p className="subtitle">
          Close your eyes, think of something lovely, and blow out the candles.
        </p>
        <div className="cake-stage">
          <img
            className="cake-art"
            src={cakeImage}
            alt="Pink birthday cake with cream frosting and red bows"
          />
          <div
            className="number-topper"
            role="group"
            aria-label="Number 25 birthday candles"
          >
            <img src={numberImage} alt="Pink glitter 25 birthday candles" />
            {lit.map((flame, index) => (
              <button
                className={`number-candle number-candle--${candleNames[index]} ${flame ? "is-lit" : "is-out"}`}
                key={index}
                type="button"
                onClick={() => blowOutOne(index)}
                disabled={!flame}
                aria-label={`Number ${candleNames[index]} candle: ${flame ? "lit, tap to blow out" : "blown out"}`}
              >
                <svg
                  className="number-candle__flame"
                  viewBox="0 0 36 60"
                  aria-hidden="true"
                >
                  <defs>
                    <radialGradient
                      id={`candle-glow-${index}`}
                      cx="50%"
                      cy="67%"
                      r="65%"
                    >
                      <stop offset="0" stopColor="#fffdf0" />
                      <stop offset=".42" stopColor="#fff8b9" />
                      <stop offset=".78" stopColor="#ffd45d" />
                      <stop offset="1" stopColor="#efa032" />
                    </radialGradient>
                  </defs>
                  <path
                    d="M18 1C14 8 7 20 5 32 2 48 9 58 18 58s16-10 13-26C29 20 22 8 18 1Z"
                    fill={`url(#candle-glow-${index})`}
                  />
                  <path
                    d="M18 24c-4 8-7 15-7 22 0 7 3 11 7 11s7-4 7-11c0-7-3-14-7-22Z"
                    fill="#fffdf3"
                    opacity=".72"
                  />
                </svg>
                <span className="number-candle__wick" />
              </button>
            ))}
          </div>
        </div>
        <div className="cake-actions">
          {!allOut ? (
            <>
              <button
                type="button"
                className="cake-action cake-action--primary"
                onClick={
                  microphoneState === "listening"
                    ? stopMicrophone
                    : startMicrophone
                }
                disabled={microphoneState === "requesting"}
              >
                {microphoneState === "requesting"
                  ? "Waiting for microphone…"
                  : microphoneState === "listening"
                    ? "Stop microphone"
                    : "Blow with microphone"}
              </button>
              <button
                type="button"
                className="cake-action"
                onClick={blowOutAll}
              >
                Blow out all candles
              </button>
            </>
          ) : (
            <button
              type="button"
              className="cake-action cake-action--primary"
              onClick={relight}
            >
              Light them again
            </button>
          )}
        </div>
        <p className="cake-help">
          {allOut
            ? "One wish, two little flames, and a whole year ahead."
            : "Tap either number, or turn on your microphone and blow."}
        </p>
        <p className="cake-message" role="status" aria-live="polite">
          {message}
        </p>
      </div>
    </section>
  );
}
