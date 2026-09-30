import ProjectCard from "./ProjectCard.jsx";

export default function ProjectGrid({ projects, showDetails = false }) {
  return (
    <div className="project-grid">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} showDetails={showDetails} />
      ))}
    </div>
  );
}
