const ornaments = [
  { kind: "sparkle", x: 9, y: 8.3, size: 26 },
  { kind: "sparkle", x: 25, y: 27.2, size: 26 },
  { kind: "sparkle", x: 72, y: 33.5, size: 28 },
  { kind: "sparkle", x: 7.1, y: 79.8, size: 28 },
  { kind: "plus", x: 84.9, y: 17.1, size: 14 },
  { kind: "plus", x: 74.3, y: 35.9, size: 14 },
  { kind: "plus", x: 33.1, y: 64.6, size: 14 },
  { kind: "plus", x: 90.4, y: 71, size: 14 },
];

export default function DecorativeLayer() {
  return (
    <div className="decorative-layer" aria-hidden="true">
      <div className="ornament-field">
        {ornaments.map(({ kind, x, y, size }, index) => (
          <svg key={index} className={`ambient-sparkle ornament-${kind}`} viewBox="0 0 24 24" style={{ "--sparkle-x": `${x}%`, "--sparkle-y": `${y}%`, "--sparkle-size": `${size}px` }}>
            {kind === "sparkle" ? <path d="M12 0C14 7 17 10 24 12C17 14 14 17 12 24C10 17 7 14 0 12C7 10 10 7 12 0Z" fill="currentColor" /> : <path d="M12 3v18M3 12h18" stroke="currentColor" strokeWidth="3" fill="none" />}
          </svg>
        ))}
        <span className="background-shape shape-diamond" />
        <span className="background-shape shape-square" />
        <svg className="background-mountains" viewBox="0 0 420 150"><path d="M0 150 90 58 196 112 308 0 420 150Z" fill="currentColor" /></svg>
      </div>
    </div>
  );
}
