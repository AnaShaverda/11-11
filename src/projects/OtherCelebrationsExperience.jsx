import { useState } from "react";
import { Link } from "react-router-dom";
import ExperienceCTA from "./components/ExperienceCTA.jsx";

export default function OtherCelebrationsExperience({ project }) {
  const [selectedId, setSelectedId] = useState(project.subcategories[0].id);
  const selected = project.subcategories.find((item) => item.id === selectedId);

  return (
    <div className="experience-page other-experience">
      <Link className="experience-back" to="/projects">← All event categories</Link>
      <section className="other-hero"><span className="section-label">OTHER CELEBRATIONS / 11:11</span><h1>Every reason has its own magic.</h1><p>From the big surprises to the quiet milestones, there’s room to make it yours.</p></section>
      <section className="other-chooser" aria-label="Other celebration types"><div className="other-chooser-intro"><span className="section-label">CHOOSE AN OCCASION</span><h2>What are we celebrating?</h2><p>These are the first looks at more celebrations joining the 11:11 world.</p></div><div className="other-options" role="group" aria-label="Preview a celebration type">{project.subcategories.map((item) => <button key={item.id} type="button" className={selectedId === item.id ? "is-active" : ""} aria-pressed={selectedId === item.id} onClick={() => setSelectedId(item.id)}><span>{item.title}</span><small>{item.description}</small></button>)}</div></section>
      <div className={`other-stage stage-${selected.visual}`}><div className="other-stage-copy"><span className="other-stage-overline">11:11 / OCCASION PREVIEW</span><h2>{selected.title}</h2><p>{selected.description}</p><span className="other-stage-tag">Themes coming later ✧</span></div><div className="other-stage-art" aria-hidden="true"><span>{selected.visual === "reveal" ? "?" : selected.visual === "bachelorette" ? "✳" : "✧"}</span></div></div>
      <ExperienceCTA title="Your occasion, your way." text="More designs are on the way. Start by exploring what 11:11 can already create." to="/projects" action="Explore categories" />
    </div>
  );
}
