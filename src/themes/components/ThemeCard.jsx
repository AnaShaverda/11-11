import Icon from "../../components/ui/Icon.jsx";
import { Link } from "react-router-dom";
import ThemeCanvas from "./ThemeCanvas.jsx";
import { themeDemoEvents } from "../data/demoEvents.js";
import { useLanguage } from "../../localization/LanguageContext.jsx";

export default function ThemeCard({ theme }) {
  const { t } = useLanguage();
  return (
    <Link className="theme-card" to={`/themes/${theme.slug}`} aria-label={t("themeCanvas.cardAria", { name: t(`themes.${theme.id}.name`) })}>
      <ThemeCanvas theme={theme} event={themeDemoEvents[theme.id] ?? themeDemoEvents[theme.category]} compact />
      <span className="theme-card-caption"><span><strong>{t(`themes.${theme.id}.name`)}</strong><small>{t(`themes.${theme.id}.mood`)}</small></span><Icon name="arrow-up-right" size={18} /></span>
    </Link>
  );
}
