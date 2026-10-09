// Reuse the circle artwork from the original invitation design.
export default function RibbonSectionBubbles() {
  return <span className="rsb-section-bubbles" aria-hidden="true">{Array.from({ length: 9 }, (_, index) => <span key={index} className="rs-filled-bubble" style={{ "--bubble-color": ["#efb5c1", "#a75068", "#7c102b", "#d889a0"][index % 4], left: `${4 + index * 11}%`, "--bubble-delay": `${index * .24}s`, "--bubble-drift": `${index % 2 ? 22 : -22}px`, width: `${12 + index % 3 * 7}px` }} />)}</span>;
}
