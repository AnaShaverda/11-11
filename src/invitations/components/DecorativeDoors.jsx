import { useLanguage } from "../../localization/LanguageContext.jsx";
import Icon from "../../components/ui/Icon.jsx";

function DoorLeaf({ side, variant }) {
  return <div className={`guest-door-leaf is-${side}`} aria-hidden="true">
    <img src={`/images/opening/classical-${variant}-door-leaf.webp`} alt="" decoding="async" draggable="false" />
  </div>;
}

export default function DecorativeDoors({ phase, title, onOpen, onView, viewButton, variant = "white" }) {
  const { t } = useLanguage();
  return <div className="guest-door-scene">
    <div className="guest-door-scrim" aria-hidden="true" />
    <p className="guest-door-greeting">{t("guestCards.envelope.forYou")}</p>
    <div className="guest-door-stage guest-image-door-stage" data-door-variant={variant} aria-hidden="true">
      <DoorLeaf side="left" variant={variant} /><DoorLeaf side="right" variant={variant} />
      <span className="guest-door-light" />
    </div>
    {phase === "sealed" && <button type="button" className="guest-door-open" onClick={onOpen} aria-label={t("guestCards.doors.open")}>
      <span>{title}</span><small>{t("guestCards.doors.open")} <Icon name="arrow-up-right" size={16} /></small>
    </button>}
    {(phase === "preview" || phase === "finishing") && <button className="guest-door-view" ref={viewButton} type="button" onClick={onView} disabled={phase === "finishing"}>
      {t("guestCards.doors.view")} <Icon name="arrow-down" size={16} />
    </button>}
  </div>;
}
