import { useLanguage } from "../../localization/LanguageContext.jsx";
import { interactionRegistry } from "../registry.js";

export default function InteractionPicker({ interactions, onToggle, onSkip }) {
  const { t } = useLanguage();
  return <section className="interaction-picker" aria-label={t("interactions.add")}><div className="event-section-heading"><p>{t("interactions.addNote")}</p><button type="button" className="event-text-button" onClick={onSkip}>{t("interactions.skip")}</button></div><div className="interaction-picker-options">{Object.entries(interactionRegistry).map(([type, definition]) => {
    const selected = interactions.some((interaction) => interaction.type === type && interaction.enabled);
    return <button type="button" className={`interaction-picker-option${selected ? " is-selected" : ""}`} key={type} aria-pressed={selected} onClick={() => onToggle(type)}><span className="interaction-option-symbol" aria-hidden="true">{definition.symbol}</span><strong>{t(`interactions.${type}.label`)}</strong><small>{t(`interactions.${type}.short`)}</small><span className="interaction-option-status">{selected ? "✓ " : "+ "}{t(selected ? "interactions.enabled" : "interactions.addAction")}</span></button>;
  })}</div><small className="event-muted">{t("interactions.soon")}</small></section>;
}
