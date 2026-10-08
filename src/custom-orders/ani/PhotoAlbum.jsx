import { useId } from "react";
import PortraitStickers from "./PortraitStickers";

const initialMemories = [
  {
    id: 1,
    image:
      "/custom-orders/a1cbe778fe47dc687ef50b9f24d4981d/images/album/ani-album-01.jpg",
    caption: "Zero responsible decisions.",
  },
  {
    id: 2,
    image:
      "/custom-orders/a1cbe778fe47dc687ef50b9f24d4981d/images/album/memory-2.jpg",
    caption: "All bundled up together",
  },
  {
    id: 3,
    image:
      "/custom-orders/a1cbe778fe47dc687ef50b9f24d4981d/images/album/memory-3-updated.jpg",
    caption: "Adventures with you",
  },
  {
    id: 4,
    image:
      "/custom-orders/a1cbe778fe47dc687ef50b9f24d4981d/images/album/memory-4.jpg",
    caption: "A night worth keeping",
  },
];

export function DiscoBall() {
  const clipId = useId();
  const tiles = Array.from({ length: 768 }, (_, index) => {
    const row = Math.floor(index / 32);
    const column = index % 32;
    const latitude = -Math.PI / 2 + (row * Math.PI) / 24;
    const longitude = -Math.PI / 2 + (column * Math.PI) / 32;
    const project = (vertical, horizontal) =>
      `${100 + 72 * Math.cos(vertical) * Math.sin(horizontal)},${115 + 72 * Math.sin(vertical)}`;
    const reflection = Math.sin(column * 0.47 + Math.sin(row * 0.48) * 2.8);
    const highlight = Math.exp(
      -((column - 11) ** 2 / 20 + (row - 8) ** 2 / 14),
    );
    const variation = ((index * 37) % 23) - 11;
    const shade = Math.round(
      Math.min(
        255,
        Math.max(35, 125 + reflection * 65 + highlight * 115 + variation),
      ),
    );
    return (
      <polygon
        key={index}
        points={[
          project(latitude, longitude),
          project(latitude, longitude + Math.PI / 32),
          project(latitude + Math.PI / 24, longitude + Math.PI / 32),
          project(latitude + Math.PI / 24, longitude),
        ].join(" ")}
        fill={`rgb(${Math.min(255, shade + 10)}, ${shade}, ${Math.min(255, shade + 3)})`}
        stroke="#483e3b"
        strokeOpacity="0.55"
        strokeWidth="0.3"
        strokeLinejoin="round"
      />
    );
  });

  return (
    <svg className="album-disco-ball" viewBox="0 0 200 205" aria-hidden="true">
      <path d="M100 0v42" stroke="#b91f4c" strokeWidth="1.5" />
      <defs>
        <radialGradient id={clipId} cx="35%" cy="28%" r="75%">
          <stop offset="0" stopColor="#fff" stopOpacity="0.35" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#251a1b" stopOpacity="0.55" />
        </radialGradient>
      </defs>
      <g className="disco-mirrors">
        <circle cx="100" cy="115" r="72" fill="#8d8381" />
        {tiles}
        <circle
          cx="100"
          cy="115"
          r="72"
          fill={`url(#${clipId})`}
          stroke="#64534e"
          strokeWidth="0.5"
        />
        <path
          className="disco-glint"
          d="M149 46l2 15 14 2-14 2-2 15-2-15-14-2 14-2Z"
          fill="#b52b55"
        />
        <path
          className="disco-glint"
          d="M58 118l2 10 10 2-10 2-2 10-2-10-10-2 10-2Z"
          fill="#fff2df"
        />
      </g>
    </svg>
  );
}

export default function PhotoAlbum() {
  return (
    <section className="page album-page" aria-label="Birthday memories">
      <PortraitStickers page="album" />
      <section className="album-content">
        <DiscoBall />
        <header className="album-heading" data-reveal>
          <p className="eyebrow">Chapter 04 · The good stuff</p>
          <h1>Moments worth keeping.</h1>
          <p className="subtitle">
            An album for Ani, with love from Akh Netavi.
            <br />
            Here’s to all the memories still to come.
          </p>
        </header>
        <div className="memory-grid">
          {initialMemories.map((memory, index) => (
            <article
              className="memory-print"
              key={memory.id}
              data-reveal
              style={{ "--reveal-delay": `${index * 90}ms` }}
            >
              <span className="memory-tape" aria-hidden="true" />
              <div className="memory-photo">
                <img
                  src={memory.image}
                  alt={memory.caption || `Memory ${index + 1}`}
                />
              </div>
              <div className="memory-caption">
                <span>0{index + 1}</span>
                <span className="memory-caption-text">{memory.caption}</span>
              </div>
            </article>
          ))}
        </div>
        <p className="album-note">Four memories, so much love.</p>
      </section>
    </section>
  );
}
