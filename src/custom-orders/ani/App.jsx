import { useEffect, useRef, useState } from "react";
import BirthdayRecord from "./BirthdayRecord";
import BirthdayCake from "./BirthdayCake";
import PhotoAlbum, { DiscoBall } from "./PhotoAlbum";
import ScratchCard from "./ScratchCard";
import PortraitStickers from "./PortraitStickers";

const confetti = [
  {
    left: "6%",
    top: "12%",
    color: "var(--red)",
    rotate: "-18deg",
    delay: "0s",
  },
  {
    left: "14%",
    top: "28%",
    color: "var(--pink)",
    rotate: "32deg",
    delay: ".4s",
  },
  {
    left: "8%",
    top: "74%",
    color: "var(--berry)",
    rotate: "12deg",
    delay: ".8s",
  },
  {
    left: "22%",
    top: "84%",
    color: "var(--cream)",
    rotate: "-38deg",
    delay: ".2s",
  },
  {
    left: "81%",
    top: "15%",
    color: "var(--berry)",
    rotate: "24deg",
    delay: ".7s",
  },
  {
    left: "91%",
    top: "32%",
    color: "var(--pink)",
    rotate: "-28deg",
    delay: ".1s",
  },
  {
    left: "87%",
    top: "72%",
    color: "var(--red)",
    rotate: "38deg",
    delay: ".5s",
  },
  {
    left: "72%",
    top: "88%",
    color: "var(--cream)",
    rotate: "-12deg",
    delay: ".9s",
  },
];

function Star({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 40 40" aria-hidden="true">
      <path d="M20 1c.9 12.4 6.6 18.1 19 19-12.4.9-18.1 6.6-19 19C19.1 26.6 13.4 20.9 1 20 13.4 19.1 19.1 13.4 20 1Z" />
    </svg>
  );
}

function Cake() {
  return (
    <div className="card-cake-preview" aria-hidden="true">
      <img
        className="card-cake-preview__cake"
        src="/custom-orders/a1cbe778fe47dc687ef50b9f24d4981d/images/birthday-cake-flat.png"
        alt=""
      />
      <span className="card-cake-preview__numbers">
        <img
          src="/custom-orders/a1cbe778fe47dc687ef50b9f24d4981d/images/number-25-candles.png"
          alt=""
        />
      </span>
    </div>
  );
}

function BirthdayCard() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section
      className={`page ${isOpen ? "is-open" : ""}`}
      aria-label="Birthday card"
    >
      <div className="sun-glow" />
      <PortraitStickers page="card" />

      <div className="card-disco" aria-hidden="true">
        <DiscoBall />
        {Array.from({ length: 16 }, (_, index) => (
          <Star
            key={index}
            className={`disco-sparkle disco-sparkle--${index}`}
          />
        ))}
      </div>

      {confetti.map((piece, index) => (
        <span
          className={`confetti confetti--${index % 3}`}
          key={index}
          style={{
            "--left": piece.left,
            "--top": piece.top,
            "--color": piece.color,
            "--rotate": piece.rotate,
            "--delay": piece.delay,
          }}
        />
      ))}

      <Star className="star star--one" />
      <Star className="star star--two" />

      <section className="experience" aria-live="polite">
        <div className="intro" data-reveal>
          <p className="eyebrow">From Akh Netavi, with love</p>
          <h1>
            {isOpen
              ? "It’s your day, Ani."
              : "At this point, you’re officially too old for Leonardo DiCaprio."}
          </h1>
          <p className="subtitle">
            {isOpen
              ? "Happy birthday! Here’s to a year full of joy, sweet surprises, and a tiny bit of magic."
              : "A birthday note from Akh Netavi, wrapped up just for you."}
          </p>
        </div>

        <div className="card-scene" data-reveal>
          <article className="birthday-card" id="birthday-wishes">
            <div className="card__topline">
              <span>Especially for Ani</span>
              <span className="card__number">01</span>
            </div>

            <div className="card__content">
              <p className="card__kicker">Ani, today calls for cake</p>
              <h2>
                Happy
                <br />
                Birthday!
              </h2>
              <Cake />
              <p className="card__message">
                May your next trip around the sun be full of good people, loud
                laughs, and moments worth keeping.
              </p>
            </div>

            <div className="card__footer">
              <span>With love, Akh Netavi</span>
              <svg viewBox="0 0 62 18" aria-hidden="true">
                <path d="M2 11c8-14 9 9 17-4 5-8-3 15 7 4 9-10 1 9 10 0 6-6 9-5 13 0 4 5 8 3 11-1" />
              </svg>
            </div>
          </article>

          <button
            className="envelope"
            type="button"
            onClick={() => setIsOpen((current) => !current)}
            aria-label={
              isOpen
                ? "Close Ani’s birthday envelope"
                : "Open Ani’s birthday envelope"
            }
            aria-expanded={isOpen}
            aria-controls="birthday-wishes"
          >
            <span className="envelope__back" aria-hidden="true" />
            <span className="envelope__flap" aria-hidden="true" />
            <span className="envelope__front-left" aria-hidden="true" />
            <span className="envelope__front-right" aria-hidden="true" />
            <span className="envelope__seal" aria-hidden="true">
              <Star />
            </span>
          </button>
        </div>

        <button
          className="open-button"
          type="button"
          aria-expanded={isOpen}
          aria-controls="birthday-wishes"
          onClick={() => setIsOpen((current) => !current)}
        >
          <span>{isOpen ? "Tuck it back in" : "Open your card"}</span>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5 12h14M14 7l5 5-5 5" />
          </svg>
        </button>
      </section>

      <p className="corner-note">Made for a very good human</p>
      <p className="scroll-cue" aria-label="Scroll down to see the rest">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 4v15m-6-6 6 6 6-6" />
        </svg>
      </p>
    </section>
  );
}

function MusicPage() {
  return (
    <section className="page music-page" aria-label="Birthday music">
      <div className="sun-glow" />
      <PortraitStickers page="music" />
      <section className="music-content" data-reveal>
        <p className="eyebrow">Side A · From Akh Netavi</p>
        <h1>
          Spinning records.
          <br />
          Another Taylor album on repeat.
        </h1>
        <p className="subtitle">
          For Ani, on her special day. Give this one a spin.
        </p>
        <BirthdayRecord />
      </section>
    </section>
  );
}

export default function App() {
  const siteRef = useRef(null);

  useEffect(() => {
    const site = siteRef.current;
    if (!site) return;

    const updateCue = () =>
      site.classList.toggle("has-scrolled", window.scrollY > 80);
    updateCue();
    window.addEventListener("scroll", updateCue, { passive: true });

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!reducedMotion && "IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            entry.target.classList.toggle("is-revealed", entry.isIntersecting);
          }
        },
        { threshold: 0.1, rootMargin: "0px 0px -8% 0px" },
      );
      site.classList.add("is-motion-ready");
      site
        .querySelectorAll("[data-reveal]")
        .forEach((element) => observer.observe(element));
      return () => {
        observer.disconnect();
        window.removeEventListener("scroll", updateCue);
      };
    }

    return () => window.removeEventListener("scroll", updateCue);
  }, []);

  return (
    <main className="birthday-site" ref={siteRef}>
      <BirthdayCard />
      <MusicPage />
      <BirthdayCake />
      <PhotoAlbum />
      <ScratchCard />
      <footer className="maker-credit">
        <span>Made by</span>
        <a href="/" aria-label="11:11 — visit the company that made this card">
          <img
            src="/logos/logo-pink-star.svg"
            alt="11:11"
            width="1330"
            height="1112"
          />
        </a>
      </footer>
    </main>
  );
}
