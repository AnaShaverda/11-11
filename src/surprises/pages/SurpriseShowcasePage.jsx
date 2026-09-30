import { useState } from "react";
import { Link } from "react-router-dom";
import { eventModules } from "../../modules/data/eventModules.js";
import { getThemeBySlug } from "../../themes/data/themes.js";
import SurprisePhonePreview from "../components/SurprisePhonePreview.jsx";
import { birthdaySurprise, surpriseOccasions, surpriseOptionalModuleIds } from "../data/surprises.js";

const steps = ["Choose an occasion", "Pick a theme", "Add your memories", "Add interactive moments", "Share the surprise"];
const startingModules = birthdaySurprise.enabledModules.filter((id) => surpriseOptionalModuleIds.includes(id));

export default function SurpriseShowcasePage() {
  const [occasionId, setOccasionId] = useState("birthday");
  const [themeId, setThemeId] = useState(birthdaySurprise.themeId);
  const [selectedModules, setSelectedModules] = useState(startingModules);
  const occasion = surpriseOccasions.find((item) => item.id === occasionId);
  const theme = getThemeBySlug(themeId);
  const demoLink = `/surprises/demo?${new URLSearchParams({ theme: theme.id, modules: selectedModules.join(",") })}`;

  function chooseOccasion(item) {
    setOccasionId(item.id);
    setThemeId(item.themeIds[0]);
    setSelectedModules(item.id === "birthday" ? startingModules : startingModules.filter((id) => id !== "cake"));
  }

  function toggleModule(id) {
    setSelectedModules((current) => current.includes(id) ? current.filter((item) => item !== id) : surpriseOptionalModuleIds.filter((item) => item === id || current.includes(item)));
  }

  return <div className="surprise-showcase">
    <Link className="back-link" to="/projects">← All experiences</Link>
    <section className="surprise-showcase-hero" aria-labelledby="surprise-title">
      <div className="surprise-showcase-copy"><span className="surprise-site-label">DIGITAL SURPRISE / 11:11</span><h1 id="surprise-title">Can’t be there in person? <em>Make them something they’ll remember.</em></h1><p>More than a message. A whole little world of photos, memories, wishes, and surprises, made for one person to open.</p><div className="surprise-showcase-actions"><a className="primary-link" href="#create-surprise">Create your surprise <span aria-hidden="true">↗</span></a><Link className="surprise-text-link" to="/surprises/demo">Open the Birthday example →</Link></div><small>Made by you. Shared through one private link when this experience is ready to launch.</small></div>
      <div className="surprise-showcase-visual"><span className="surprise-visual-glow" aria-hidden="true"/><SurprisePhonePreview /><span className="surprise-visual-star star-a" aria-hidden="true">✳</span><span className="surprise-visual-star star-b" aria-hidden="true">✦</span></div>
    </section>
    <section className="surprise-flow" aria-labelledby="surprise-flow-title"><div><span className="surprise-site-label">HOW IT COMES TOGETHER</span><h2 id="surprise-flow-title">Five steps to a little world made for them.</h2></div><ol>{steps.map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, "0")}</span>{step}</li>)}</ol></section>
    <section className="surprise-config" id="create-surprise" aria-labelledby="create-title"><div className="surprise-config-heading"><span className="surprise-site-label">CREATE YOUR SURPRISE · FRONTEND PREVIEW</span><h2 id="create-title">Start with their story.</h2><p>Choose a reason, a look, and the moments you want to include. This preview uses sample content and does not save your choices.</p></div>
      <div className="surprise-config-grid"><div className="surprise-config-controls"><div className="surprise-config-step"><div className="surprise-config-step-heading"><span>01</span><div><h3>What are you celebrating?</h3><p>A special day, or simply a special person.</p></div></div><div className="surprise-occasion-options" role="group" aria-label="Choose a surprise occasion">{surpriseOccasions.map((item) => <button key={item.id} type="button" aria-pressed={occasionId === item.id} className={occasionId === item.id ? "is-selected" : ""} onClick={() => chooseOccasion(item)}><span aria-hidden="true">{item.symbol}</span>{item.label}</button>)}</div></div>
        <div className="surprise-config-step"><div className="surprise-config-step-heading"><span>02</span><div><h3>Give it a look.</h3><p>These are the same themes used across 11:11.</p></div></div><div className="surprise-theme-options" role="group" aria-label="Choose a surprise theme">{occasion.themeIds.map((id) => { const option = getThemeBySlug(id); return <button key={id} type="button" aria-pressed={themeId === id} className={themeId === id ? "is-selected" : ""} onClick={() => setThemeId(id)}><span className={`theme-canvas theme-${option.visual} surprise-theme-swatch`} aria-hidden="true"><span>{option.decor}</span></span><strong>{option.name}</strong></button>; })}</div></div>
        <div className="surprise-config-step"><div className="surprise-config-step-heading"><span>03</span><div><h3>Add what feels like them.</h3><p>Pick the moments that belong in their surprise.</p></div></div><div className="surprise-module-options" role="group" aria-label="Choose optional surprise moments">{surpriseOptionalModuleIds.map((id) => <button key={id} type="button" aria-pressed={selectedModules.includes(id)} className={selectedModules.includes(id) ? "is-selected" : ""} onClick={() => toggleModule(id)}><span aria-hidden="true">{selectedModules.includes(id) ? "✓" : "+"}</span>{eventModules[id].title}</button>)}</div></div></div>
        <div className="surprise-config-preview"><span className="surprise-site-label">A PREVIEW OF YOUR DIRECTION</span><h3>{occasion.headline}</h3><p>{occasion.note}</p><SurprisePhonePreview themeId={theme.id} title={occasion.id === "birthday" ? birthdaySurprise.title : "For someone special"} message={occasion.note} to={demoLink} /><div className="surprise-preview-summary"><strong>{selectedModules.length} optional moments selected</strong><span>Theme: {theme.name}</span></div><Link className="primary-link" to={demoLink}>Preview the Birthday example <span aria-hidden="true">↗</span></Link><small>The full interactive example is a Birthday Surprise. Your choices here are local to this browser preview.</small></div></div>
    </section>
    <section className="surprise-share-concept"><span className="surprise-site-label">THE FINISHING TOUCH</span><h2>One beautiful link. One person you made it for.</h2><p>When creation and sharing are available, your surprise will be ready for them to open wherever they are.</p><code>your11-11.com/s/nini-birthday</code><small>Illustrative link only · no link is created in this demo</small></section>
  </div>;
}
