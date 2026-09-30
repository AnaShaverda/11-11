import ThemeCard from "./ThemeCard.jsx";

export default function ThemeGallery({ themes }) {
  return <div className="theme-gallery">{themes.map((theme) => <ThemeCard key={theme.id} theme={theme} />)}</div>;
}
