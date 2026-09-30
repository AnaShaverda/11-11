import { Link } from "react-router-dom";
import ProjectIcon from "./ProjectIcon.jsx";

export default function ProjectCard({ project, showDetails = false }) {
  return (
    <Link
      className={`project-card accent-${project.accent}${showDetails ? " project-card-detailed" : ""}`}
      to={`/projects/${project.slug}`}
    >
      <span className="folder" aria-hidden="true">
        <span className="folder-tab" />
        <span className="folder-front">
          <ProjectIcon name={project.icon} />
          <span className="folder-spark">✦</span>
        </span>
      </span>
      <span className="project-title">{project.title}</span>
      {showDetails ? (
        <span className="project-card-details">
          <span className="project-description">{project.shortDescription}</span>
          <span className="project-card-meta">{project.status === "ready" ? "Explore experience" : "Coming soon"} <span aria-hidden="true">↗</span></span>
        </span>
      ) : null}
    </Link>
  );
}
