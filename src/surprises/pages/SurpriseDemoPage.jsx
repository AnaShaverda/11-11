import { Link, useSearchParams } from "react-router-dom";
import { getThemeBySlug } from "../../themes/data/themes.js";
import SurpriseExperience from "../components/SurpriseExperience.jsx";
import { birthdaySurprise, surpriseOptionalModuleIds } from "../data/surprises.js";

const quickThemes = ["birthday-retro-disco", "birthday-coquette", "birthday-y2k-digital"];

export default function SurpriseDemoPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedTheme = getThemeBySlug(searchParams.get("theme")) ?? getThemeBySlug(birthdaySurprise.themeId);
  const themeChoices = quickThemes.includes(selectedTheme.id) ? quickThemes : [selectedTheme.id, ...quickThemes];
  const requestedModules = searchParams.has("modules") ? searchParams.get("modules").split(",") : birthdaySurprise.enabledModules;
  const enabledModules = ["main-message", ...surpriseOptionalModuleIds.filter((id) => requestedModules.includes(id))];

  function changeTheme(id) {
    setSearchParams((previous) => { const next = new URLSearchParams(previous); next.set("theme", id); return next; }, { replace: true });
  }

  return <div className="surprise-demo-page"><div className="surprise-demo-toolbar"><Link className="back-link" to="/surprises">← Digital Surprise</Link><span>INTERACTIVE BIRTHDAY EXAMPLE · SAMPLE CONTENT</span></div><div className="surprise-demo-intro"><div><span className="surprise-site-label">SAME STORY, DIFFERENT LOOK</span><h2>Switch the theme. Keep the feeling.</h2><p>Each section below follows the theme you choose. No event venue or RSVP is needed for a surprise made for one person.</p></div><div className="surprise-demo-theme-switch" role="group" aria-label="Preview birthday surprise themes">{themeChoices.map((id) => { const theme = getThemeBySlug(id); return <button key={id} type="button" aria-pressed={selectedTheme.id === id} className={selectedTheme.id === id ? "is-selected" : ""} onClick={() => changeTheme(id)}>{theme.name}</button>; })}</div></div><SurpriseExperience surprise={birthdaySurprise} theme={selectedTheme} enabledModules={enabledModules} /><div className="surprise-demo-end"><p>Want to imagine one for your person?</p><Link className="primary-link" to="/surprises#create-surprise">Explore Digital Surprise <span aria-hidden="true">↗</span></Link></div></div>;
}
