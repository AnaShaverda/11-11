import ProjectGrid from "../components/ui/ProjectGrid.jsx";
import { projects } from "../data/projects.js";
import { Link } from "react-router-dom";

export default function ProjectsPage() {
  return (
    <section className="inner-page projects-page">
      <div className="page-heading">
        <h1>Find your celebration.</h1>
        <p>Choose an event, discover a design, then make room for the features that bring your people together.</p>
      </div>
      <ProjectGrid projects={projects} showDetails />
      <div className="projects-surprise-feature"><div><span className="home-section-index">MADE FOR ONE PERSON</span><h2>Or make a whole little world for someone far away.</h2><p>A Digital Surprise brings your messages, memories, and interactive moments together without a guest list or a venue.</p><Link className="primary-link" to="/surprises">Explore Digital Surprise <span aria-hidden="true">↗</span></Link></div><span className="projects-surprise-art" aria-hidden="true">♡</span></div>
    </section>
  );
}
