import ThemeCard from "./ThemeCard.jsx";

import { isThemeActive } from "../data/themeRegistry.js";

export default function ThemeGallery({ themes }) {
  return <div className="theme-gallery">{themes.filter(isThemeActive).map((theme) => <ThemeCard key={theme.id} theme={theme} />)}</div>;
}
