const ornaments = [
  { x: 6, y: 24, size: 15 },
  { x: 94, y: 19, size: 8 },
  { x: 8, y: 40, size: 7 },
  { x: 96, y: 49, size: 13 },
  { x: 5, y: 54, size: 7 },
  { x: 90, y: 70, size: 8 },
  { x: 96, y: 78, size: 15 },
  { x: 95, y: 91, size: 7 },
  { x: 96, y: 96, size: 8 },
];

export default function DecorativeLayer() {
  return (
    <div className="decorative-layer" aria-hidden="true">
      <div className="ornament-field">
        {ornaments.map(({ x, y, size }, index) => (
          <svg key={index} className="ambient-sparkle" viewBox="0 0 24 24" style={{ "--sparkle-x": `${x}%`, "--sparkle-y": `${y}%`, "--sparkle-size": `${size}px` }}>
            <path d="M12 0 15.5 8.5 24 12 15.5 15.5 12 24 8.5 15.5 0 12 8.5 8.5Z" fill="currentColor" />
          </svg>
        ))}
        {["right", "left"].map((side) => (
          <svg key={side} className={`ambient-cube cube-${side}`} viewBox="0 0 40 44">
            <path d="m20 1 18 10-18 11L2 12Z" fill="var(--ornament-cube-top)" />
            <path d="m2 12 18 10v21L3 32Z" fill="var(--ornament-cube-left)" />
            <path d="m20 22 18-11-2 22-16 10Z" fill="var(--ornament-cube-right)" />
          </svg>
        ))}
        <svg className="background-mountains" viewBox="0 0 240 65"><defs><linearGradient id="ambient-hills"><stop stopColor="var(--ornament-hill-light)" /><stop offset="1" stopColor="var(--ornament-hill-dark)" /></linearGradient></defs><path d="M0 62C24 54 30 14 59 14S90 56 113 29s39 9 63 9 27-13 40-4 18 26 24 28Z" fill="url(#ambient-hills)" /></svg>
      </div>
    </div>
  );
}
