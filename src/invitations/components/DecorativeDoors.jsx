import { useLanguage } from "../../localization/LanguageContext.jsx";
import Icon from "../../components/ui/Icon.jsx";

function DoorLeaf({ side, variant }) {
  const image = variant === "blueFloral" ? "/images/opening/blue-floral-door-leaf.png" : `/images/opening/classical-${variant}-door-leaf.webp`;
  return <div className={`guest-door-leaf is-${side}`} aria-hidden="true">
    <img src={image} alt="" decoding="async" draggable="false" />
  </div>;
}

export default function DecorativeDoors({ phase, title, onOpen, variant = "white" }) {
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
  </div>;
}
