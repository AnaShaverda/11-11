import { useEffect, useRef } from "react";
import { useLanguage } from "../../localization/LanguageContext.jsx";
import InteractionCard from "../../modules/components/InteractionCard.jsx";
import InteractionModuleRenderer from "../../modules/components/InteractionModuleRenderer.jsx";
import EventInvitation from "./EventInvitation.jsx";

export default function EventGuestExperience({ event, activeId, onOpen, onClose }) {
  const { t } = useLanguage();
  const enabled = event.interactions.filter((interaction) => interaction.enabled);
  const active = enabled.find((interaction) => interaction.id === activeId);
  const activePanel = useRef(null);
  useEffect(() => { activePanel.current?.querySelector("h2")?.focus({ preventScroll: true }); }, [activeId]);
  return <div className={`event-guest-experience${active ? " has-active-interaction" : ""}`}>
    {!active ? <div className="event-guest-layout"><EventInvitation event={event} />{enabled.length ? <section className="event-extras" aria-labelledby={`extras-${event.id}`}><div className="event-extras-heading"><h2 id={`extras-${event.id}`}>{t("interactions.extras")}</h2></div><div className="event-interaction-cards">{enabled.map((interaction) => <InteractionCard key={interaction.id} event={event} interaction={interaction} onOpen={() => onOpen(interaction.id)} />)}</div></section> : null}</div> : <nav className="event-guest-nav" aria-label={t("interactions.extras")}><button className="event-secondary-button" type="button" onClick={onClose}>← {t("interactions.backEvent")}</button><div>{enabled.map((interaction) => <button key={interaction.id} type="button" className={active.id === interaction.id ? "is-active" : ""} aria-pressed={active.id === interaction.id} onClick={() => onOpen(interaction.id)}>{interaction.title || t(`interactions.${interaction.type}.label`)}</button>)}</div></nav>}
    {/* Keep local contributions mounted while moving between the event's extras. */}
    {enabled.map((interaction) => <div key={interaction.id} ref={active?.id === interaction.id ? activePanel : null} hidden={active?.id !== interaction.id} className="event-active-module"><InteractionModuleRenderer event={event} interaction={interaction} expanded onClose={onClose} /></div>)}
  </div>;
}
