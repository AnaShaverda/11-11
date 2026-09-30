import { Link } from "react-router-dom";
import ThemeCanvas from "./ThemeCanvas.jsx";
import { themeDemoEvents } from "../data/demoEvents.js";

export default function ThemeCard({ theme }) {
  return (
    <Link className="theme-card" to={`/themes/${theme.slug}`} aria-label={`Preview ${theme.name} ${theme.category} theme`}>
      <ThemeCanvas theme={theme} event={themeDemoEvents[theme.category]} compact />
      <span className="theme-card-caption"><span><strong>{theme.name}</strong><small>{theme.mood}</small></span><span aria-hidden="true">↗</span></span>
    </Link>
  );
}
