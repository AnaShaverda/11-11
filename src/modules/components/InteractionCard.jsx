import { useId } from "react";
import { useLanguage } from "../../localization/LanguageContext.jsx";
import { getThemePresentation } from "../../themes/themePresentation.js";
import { interactionRegistry } from "../registry.js";

export default function InteractionCard({ event, interaction, expanded = false, onOpen, onClose, children }) {
  const { t } = useLanguage();
  const headingId = useId();
  const presentation = getThemePresentation(event.themeId);
  const definition = interactionRegistry[interaction.type];
  if (!presentation || !definition || !interaction.enabled) return null;
  return <article className={`${presentation.className} interaction-card interaction-card--${interaction.type}${expanded ? " is-expanded" : ""}`} style={presentation.style} aria-labelledby={headingId}>
    <div className="interaction-card-top"><span>{t(`interactions.${interaction.type}.label`)}</span><span className="interaction-card-symbol" aria-hidden="true">{definition.symbol}</span></div>
    {presentation.decoration ? <img className="interaction-decoration" src={presentation.decoration} alt="" aria-hidden="true" /> : null}
    <div className="interaction-card-copy"><h2 id={headingId} tabIndex={-1}>{interaction.title || t(`interactions.${interaction.type}.defaultTitle`)}</h2>{interaction.description ? <p>{interaction.description}</p> : null}</div>
    {expanded ? <div className="interaction-card-content">{children}<button className="interaction-back" type="button" onClick={onClose}>{t("interactions.close")}</button></div> : <button className="interaction-button" type="button" onClick={onOpen}>{t(`interactions.${interaction.type}.action`)}<span aria-hidden="true">↗</span></button>}
  </article>;
}
