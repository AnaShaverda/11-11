import { useEffect, useRef, useState } from "react";

// Original paths with cached, centered transforms: no runtime pixel scanning.
const paths = {
  hearts: { path: "M12 21C10 19 2 13 2 7C2 1 9 0 12 5C15 0 22 1 22 7C22 13 14 19 12 21Z", matrix: [.5, 0, 0, .5, -6, -5.5] },
  sparkles: { path: "M12 0C14 8 16 10 24 12C16 14 14 16 12 24C10 16 8 14 0 12C8 10 10 8 12 0Z", matrix: [5 / 12, 0, 0, 5 / 12, -5, -5] },
  petals: { path: "M3 20C-2 10 5 0 19 1C23 11 16 22 3 20Z", matrix: [.5, 0, 0, .5, -5, -5.5] },
  streamers: { path: "M2 2C28-5 38 24 21 35C-8 53-3 77 26 75L26 79C-12 82-13 48 19 31C34 21 25 0 3 6Z", matrix: [.12, 0, 0, .12, -1.5, -4.5] },
};
let customShapes;

function getShapes(confetti) {
  if (!customShapes) {
    customShapes = { hearts: "circle", sparkles: "star", petals: "circle", streamers: "square" };
    if (typeof Path2D !== "undefined") {
      for (const [name, shape] of Object.entries(paths)) customShapes[name] = confetti.shapeFromPath(shape);
    }
  }
  return customShapes;
}

export default function OpeningCelebration({ settings, design }) {
  const canvas = useRef(null);
  const instance = useRef(null);
  const [finished, setFinished] = useState(false);
  const { openingEffect: effect, openingIntensity: intensity, openingSpeed: speed, openingDuration: duration, openingPalette: palette } = settings;

  useEffect(() => {
    if (effect === "none" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let cancelled = false;
    const timers = new Set();
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const stop = () => {
      cancelled = true;
      timers.forEach(clearTimeout);
      instance.current?.reset();
    };
    const onMotionChange = event => { if (event.matches) { stop(); setFinished(true); } };
    reducedMotion.addEventListener("change", onMotionChange);

    // Load the animation engine only for invitations that enable an effect.
    import("canvas-confetti").then(({ default: confetti }) => {
      if (cancelled || !canvas.current) return;
      const cardHeight = canvas.current.getBoundingClientRect().height;
      const cardWidth = canvas.current.getBoundingClientRect().width;
      instance.current ??= confetti.create(canvas.current, { resize: true, useWorker: true, disableForReducedMotion: true });
      const rate = speed === "dreamy" ? .32 : speed === "lively" ? 1 : .5;
      const fire = options => instance.current({ ...options,
        startVelocity: (options.startVelocity ?? 45) * rate,
        gravity: (options.gravity ?? 1) * rate,
        drift: (options.drift ?? 0) * rate,
        decay: (options.decay ?? .9) ** rate,
        ticks: Math.min(Math.round((options.ticks ?? 200) / rate), duration * 60),
      });
      const shapes = getShapes(confetti);
      const colors = palette === "gold" ? ["#cfa44f", "#e9ce8b", "#a37830"]
        : palette === "pastel" ? ["#d99eb8", "#a1bddb", "#b5c9a6", "#e6c982"]
        : [design.ink, design.accent, design.secondary];
      const festive = intensity === "celebration";
      const raining = effect !== "sparkles";
      const emissionWindow = Math.max(0, duration * 1000 - (raining ? 2400 : 1600) / rate);
      const rounds = Math.floor(emissionWindow / (500 / rate)) + 1;
      const spacing = rounds > 1 ? emissionWindow / (rounds - 1) : 0;
      const common = { colors, ticks: 145, decay: .94, disableForReducedMotion: true };
      const streamers = (origin, count, burst = false) => fire({ ...common, particleCount: count, shapes: [shapes.streamers],
        flat: true, scalar: 5 + Math.random() * 3, angle: burst ? 90 : 270, spread: burst ? 260 : 100,
        startVelocity: burst ? 17 : 4, gravity: Math.max(.65, cardHeight / 435 * .75), drift: Math.random() * 1.4 - .7, origin });
      const launch = round => {
        if (cancelled) return;
        if (effect === "confetti" || effect === "streamers") {
          if (!round) {
            fire({ ...common, particleCount: festive ? 90 : 40, angle: 90, spread: 360,
              startVelocity: Math.max(22, Math.min(40, Math.max(cardWidth, cardHeight) / 24)),
              gravity: .8, scalar: 1, shapes: ["square", "circle", "star"], origin: { x: .5, y: .48 } });
            if (effect === "streamers") streamers({ x: .5, y: .52 }, festive ? 9 : 5, true);
          }
          for (let side = 0; side < 3; side++) fire({ ...common, particleCount: festive ? 7 : 3,
            angle: 270, spread: 85, startVelocity: 4, gravity: Math.max(.7, cardHeight / 435 * .9), scalar: .8 + Math.random() * .4,
            shapes: ["square", "circle"], origin: { x: .1 + side * .4, y: -.02 } });
          if (effect === "streamers" && round % 2 === 0) streamers({ x: .15 + Math.random() * .7, y: -.06 }, festive ? 3 : 1);
        } else if (effect === "sparkles") {
          if (!round) for (let row = 0; row < 3; row++) for (let column = 0; column < 3; column++) {
            fire({ ...common, ticks: 85, particleCount: festive ? 4 : 2, shapes: [shapes.sparkles, "star"],
              flat: true, spread: 360, startVelocity: 4, gravity: .03, decay: .91, scalar: 1.4,
              origin: { x: .15 + column * .35, y: .12 + row * .36 } });
          }
          fire({ ...common, ticks: 95, particleCount: festive ? 12 : 5, shapes: [shapes.sparkles, "star"],
            flat: true, spread: 360, startVelocity: 5, gravity: .08, decay: .91, scalar: 1.3,
            origin: { x: .18 + (round * .29) % .64, y: .16 + (round * .19) % .62 } });
        } else {
          if (!round) for (let row = 0; row < 3; row++) fire({ ...common, particleCount: festive ? 9 : 4,
            shapes: [shapes[effect]], flat: effect === "hearts", angle: 270, spread: 100, startVelocity: 4,
            gravity: Math.max(.65, cardHeight / 435 * .9), scalar: (effect === "hearts" ? 1.4 : 1.2),
            origin: { x: .25 + row * .25, y: row * .24 } });
          for (let side = 0; side < 3; side++) fire({ ...common, particleCount: festive ? 5 : 2,
            shapes: [shapes[effect]], ticks: 145, flat: effect === "hearts", angle: 270, spread: 85, startVelocity: 3,
            gravity: Math.max(.65, cardHeight / 435 * .9),
            drift: side === 1 ? .2 : side === 0 ? .65 : -.65, scalar: (effect === "hearts" ? 1.4 : 1.2) + Math.random() * .4,
            origin: { x: .16 + side * .34, y: -.02 } });
        }
      };
      for (let round = 0; round < rounds; round++) {
        if (!round) launch(round);
        else timers.add(setTimeout(() => launch(round), round * spacing));
      }
      timers.add(setTimeout(() => { stop(); setFinished(true); }, duration * 1000));
    }).catch(error => {
      if (!cancelled) { stop(); setFinished(true); console.error("Unable to load the invitation opening effect", error); }
    });

    return () => { stop(); reducedMotion.removeEventListener("change", onMotionChange); };
  }, [effect, intensity, speed, duration, palette, design.ink, design.accent, design.secondary]);

  if (finished || effect === "none") return null;
  return <div className={`guest-opening-celebration is-${effect}`} data-animation-speed={speed} aria-hidden="true">
    <canvas ref={canvas} />
  </div>;
}
