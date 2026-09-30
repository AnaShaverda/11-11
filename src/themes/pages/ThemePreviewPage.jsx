import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import ThemeCanvas from "../components/ThemeCanvas.jsx";
import { getThemeBySlug } from "../data/themes.js";
import { themeDemoEvents } from "../data/demoEvents.js";
import { eventModules, optionalModulesByCategory } from "../../modules/data/eventModules.js";

export default function ThemePreviewPage() {
  const { slug } = useParams();
  const theme = getThemeBySlug(slug);
  const options = theme ? optionalModulesByCategory[theme.category] : [];
  const [selectedModule, setSelectedModule] = useState(options[0]);

  if (!theme) return <section className="inner-page copy-page"><h1>Theme not found</h1><p>That design isn’t in the collection.</p><Link className="text-link" to="/projects">Explore event categories <span aria-hidden="true">↗</span></Link></section>;

  const event = themeDemoEvents[theme.category];
  const activeModule = options.includes(selectedModule) ? selectedModule : options[0];
  return (
    <div className="theme-preview-page">
      <div className="theme-preview-toolbar"><Link className="back-link" to={`/projects/${theme.category}#themes`}>← {theme.category === "birthday" ? "Birthday" : "Wedding"} themes</Link><span>11:11 / EVENT EXPERIENCE</span></div>
      <div className="theme-preview-intro"><div><span className="section-label">{theme.category.toUpperCase()} DESIGN</span><h1>{theme.name}</h1><p>{theme.description}</p></div><span className="theme-mood">{theme.mood}</span></div>
      <ThemeCanvas key={theme.slug} theme={theme} event={event} moduleId={activeModule} />
      <section className="theme-options"><div><span className="section-label">MAKE IT YOURS</span><h2>One theme, more of your story.</h2><p>Choose an optional feature to see how it belongs inside this design.</p></div><div className="module-picker" role="group" aria-label="Preview optional event modules">{options.map((id) => <button key={id} type="button" aria-pressed={activeModule === id} className={activeModule === id ? "is-active" : ""} onClick={() => setSelectedModule(id)}>{eventModules[id].title}</button>)}</div></section>
      <div className="theme-preview-footer"><Link className="primary-link" to={`/projects/${theme.category}#themes`}>Explore more designs <span aria-hidden="true">↗</span></Link></div>
    </div>
  );
}
