export default function StampedPaperOpening({ phase, onOpen, openLabel }) {
  return <div className={`stamped-paper-opening is-${phase}`}>
    <div className="stamped-paper-half is-left" aria-hidden="true"><span className="stamped-paper-stamp"><img src="/images/opening/ivory-paper-wax-seal.png" alt="" /></span></div>
    <div className="stamped-paper-half is-right" aria-hidden="true"><span className="stamped-paper-stamp"><img src="/images/opening/ivory-paper-wax-seal.png" alt="" /></span></div>
    {phase === "sealed" && <button type="button" className="stamped-paper-open" onClick={onOpen} aria-label={openLabel}>
      <span className="stamped-paper-caption">{openLabel}</span>
    </button>}
  </div>;
}
