import ProjectGrid from "../components/ui/ProjectGrid.jsx";
import { projects } from "../data/projects.js";

export default function ProjectsPage() {
  return (
    <section className="inner-page projects-page">
      <div className="page-heading">
        <h1>Experiences</h1>
        <p>Find the perfect place for your people, your stories, and every reason to celebrate.</p>
      </div>
      <ProjectGrid projects={projects} showDetails />
    </section>
  );
}
