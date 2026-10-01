import InteractionCard from "./InteractionCard.jsx";
import { interactionRegistry } from "../registry.js";
import { useLanguage } from "../../localization/LanguageContext.jsx";

export default function InteractionModuleRenderer({ event, interaction, expanded, onOpen, onClose }) {
  const { t } = useLanguage();
  const Component = interactionRegistry[interaction.type]?.Component;
  if (!Component) return <p role="status">{t("interactions.unavailable")}</p>;
  return <InteractionCard event={event} interaction={interaction} expanded={expanded} onOpen={onOpen} onClose={onClose}><Component interaction={interaction} /></InteractionCard>;
}
