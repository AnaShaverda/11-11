import Icon from "../../components/ui/Icon.jsx";
import EmbossedWaxSeal from "./EmbossedWaxSeal.jsx";

export default function EmbossedEnvelope({ variant, phase, title, initials, openLabel, onOpen, style, children }) {
  return <div className={`guest-embossed-envelope-scene is-${phase} variant-${variant}`} style={style} role="dialog" aria-modal="true" aria-label={openLabel}>
    <div className="guest-embossed-envelope">
      <div className="embossed-envelope-base" aria-hidden="true" />
      <div className="embossed-envelope-letter" aria-hidden="true" inert>{children}</div>
      <div className="embossed-envelope-panel embossed-envelope-bottom" aria-hidden="true" />
      <div className="embossed-envelope-panel embossed-envelope-left" aria-hidden="true" />
      <div className="embossed-envelope-panel embossed-envelope-right" aria-hidden="true" />
      <div className="embossed-envelope-panel embossed-envelope-top" aria-hidden="true" />
      <svg className="embossed-envelope-creases" viewBox="0 0 100 150" preserveAspectRatio="none" aria-hidden="true" focusable="false">
        <path d="M0 0 50 51 100 0M0 150 50 51 100 150" />
      </svg>
      <EmbossedWaxSeal className="embossed-envelope-seal" title={title} initials={initials} />
      {phase === "sealed" && <button type="button" className="embossed-envelope-open" autoFocus onKeyDown={event => { if (event.key === "Tab") event.preventDefault(); }} onClick={onOpen}>
        <span>{openLabel} <Icon name="arrow-up-right" size={17} /></span>
      </button>}
    </div>
  </div>;
}
