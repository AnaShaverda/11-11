import IntroControl from "../components/ui/IntroControl.jsx";
import ProjectGrid from "../components/ui/ProjectGrid.jsx";
import { projects } from "../data/projects.js";
import HomeSections from "../components/home/HomeSections.jsx";

export default function HomePage() {
  return (
    <div className="home-page">
      <section className="home-hero" aria-label="11:11 introduction">
        <h1 className="hero-brand">11:11</h1>
        <p className="home-hero-message">Make moments worth remembering.</p>
        <IntroControl />
      </section>
      <section
        id="projects"
        className="home-projects"
        aria-label="Explore experiences"
      >
        <div className="home-grid-heading"><h2>Choose your moment</h2><span>01 / EXPERIENCES</span></div>
        <ProjectGrid projects={projects} />
      </section>
      <HomeSections />
    </div>
  );
}
