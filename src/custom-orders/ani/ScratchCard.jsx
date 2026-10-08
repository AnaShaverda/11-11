import { useId, useState } from "react";
import PortraitStickers from "./PortraitStickers";

const totalPatches = 12;

export default function ScratchCard() {
  const maskId = useId();
  const [scratched, setScratched] = useState([]);
  const revealed = scratched.length === totalPatches;
  const progress = Math.round((scratched.length / totalPatches) * 100);
  const ScratchSurface = revealed ? "a" : "button";

  const scratch = (event) => {
    if (revealed) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const column = Math.max(
      0,
      Math.min(
        3,
        Math.floor(((event.clientX - bounds.left) / bounds.width) * 4),
      ),
    );
    const row = Math.max(
      0,
      Math.min(
        2,
        Math.floor(((event.clientY - bounds.top) / bounds.height) * 3),
      ),
    );
    const target = event.detail === 0 ? 0 : row * 4 + column;
    setScratched((current) => {
      const remaining = Array.from(
        { length: totalPatches },
        (_, index) => index,
      ).filter((index) => !current.includes(index));
      remaining.sort((first, second) => {
        const distance = (index) =>
          Math.abs((index % 4) - (target % 4)) +
          Math.abs(Math.floor(index / 4) - Math.floor(target / 4));
        return distance(first) - distance(second);
      });
      return remaining.length ? [...current, remaining[0]] : current;
    });
  };

  return (
    <section className="page scratch-page" aria-label="Birthday surprise">
      <div className="sun-glow" />
      <PortraitStickers page="surprise" />
      <section className="scratch-content" data-reveal>
        <p className="eyebrow">Chapter 05 · Just for Ani</p>
        <h1>
          A little scratch.
          <br />A lovely surprise.
        </h1>
        <p className="subtitle">
          Some wishes are worth uncovering. Tap the pink foil,
          <br />a little at a time, to find yours.
        </p>
        <article className="scratch-ticket">
          <div className="ticket-top">
            <span>Akh Netavi’s birthday club</span>
            <span>No. 004</span>
          </div>
          <p className="ticket-title">Ani, you’re the lucky one.</p>
          <ScratchSurface
            className={`scratch-surface ${revealed ? "is-revealed" : ""}`}
            type={revealed ? undefined : "button"}
            href={revealed ? "https://www.amazon.co.uk/gc/redeem" : undefined}
            onClick={revealed ? undefined : scratch}
            aria-label={
              revealed
                ? "Open Amazon UK gift card redemption"
                : `Scratch birthday surprise. ${progress}% uncovered`
            }
            aria-describedby="scratch-status"
          >
            <span className="scratch-prize" aria-hidden={!revealed}>
              <img
                className="scratch-prize-image"
                src="/custom-orders/a1cbe778fe47dc687ef50b9f24d4981d/images/birthday-wishes-gift-card.png"
                alt=""
              />
            </span>
            {!revealed && (
              <svg
                className="scratch-foil"
                viewBox="0 0 480 264"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <defs>
                  <mask
                    id={maskId}
                    maskUnits="userSpaceOnUse"
                    x="0"
                    y="0"
                    width="480"
                    height="264"
                  >
                    <rect width="480" height="264" fill="white" />
                    {scratched.map((patch) => {
                      const left = (patch % 4) * 120;
                      const top = Math.floor(patch / 4) * 88;
                      return (
                        <path
                          key={patch}
                          d={`M${left - 3} ${top + 7}l24 -10 19 8 28 -9 25 7 30 -6 3 97 -24 -6 -23 7 -24 -5 -22 6 -36 -4Z`}
                          fill="black"
                        />
                      );
                    })}
                  </mask>
                  <pattern
                    id={`${maskId}-texture`}
                    width="14"
                    height="14"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M0 14L14 0M-4 4L4-4M10 18L18 10"
                      stroke="#fff3f7"
                      strokeOpacity="0.13"
                      strokeWidth="1"
                    />
                  </pattern>
                </defs>
                <g mask={`url(#${maskId})`}>
                  <rect width="480" height="264" fill="#d63c74" />
                  <rect
                    width="480"
                    height="264"
                    fill={`url(#${maskId}-texture)`}
                  />
                  <text
                    x="240"
                    y="120"
                    textAnchor="middle"
                    fill="#fff3f7"
                    className="foil-title"
                  >
                    A gift is hiding here.
                  </text>
                  <text
                    x="240"
                    y="151"
                    textAnchor="middle"
                    fill="#fff3f7"
                    className="foil-hint"
                  >
                    CLICK TO SCRATCH A LITTLE MAGIC
                  </text>
                </g>
              </svg>
            )}
          </ScratchSurface>
        </article>
        <div
          className="scratch-progress"
          role="progressbar"
          aria-label="Card scratched"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="scratch-progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="scratch-status" id="scratch-status" role="status">
          {revealed
            ? "Surprise! Your Birthday Wishes gift card is revealed."
            : `${progress}% uncovered · every click reveals a little more`}
        </p>
        <button
          className="scratch-reset"
          type="button"
          onClick={() => setScratched([])}
          disabled={!scratched.length}
        >
          ↺ Scratch again
        </button>
      </section>
    </section>
  );
}
