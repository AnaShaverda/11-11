import ThemeGallery from "./ThemeGallery.jsx";
import { birthdayThemes, weddingThemes } from "../data/themes.js";

export default function ThemeExplorer({ category }) {
  const themes = category === "birthday" ? birthdayThemes : weddingThemes;
  return (
    <section id="themes" className="theme-explorer">
      <div className="theme-explorer-heading"><span>CHOOSE YOUR DESIGN</span><h2>One celebration. So many ways to make it yours.</h2><p>Start with a visual world you love. Invitations and optional features follow its look.</p><strong>{themes.length} {category} themes</strong></div>
      <ThemeGallery themes={themes} />
    </section>
  );
}
