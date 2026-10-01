import Icon from "./Icon.jsx";
import { Link } from "react-router-dom";
import ProjectIcon from "./ProjectIcon.jsx";
import { useLanguage } from "../../localization/LanguageContext.jsx";

export default function ProjectCard({ project, showDetails = false }) {
  const { t } = useLanguage();
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
      <span className="project-title">{t(`common.${project.id}`)}</span>
      {showDetails ? (
        <span className="project-card-details">
          <span className="project-description">{t(`project.${project.id}.description`)}</span>
          <span className="project-card-meta">{t("project.exploreCategory")} <Icon name="arrow-up-right" size={18} /></span>
        </span>
      ) : null}
    </Link>
  );
}
