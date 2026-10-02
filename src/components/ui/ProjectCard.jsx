import { Link } from "react-router-dom";
import Icon from "./Icon.jsx";
import DocumentFolder from "./DocumentFolder.jsx";
import { useLanguage } from "../../localization/LanguageContext.jsx";

export default function ProjectCard({ project, showDetails = false }) {
  const { t } = useLanguage();
  return (
    <Link
      id={`project-${project.id}`}

      className={`project-card accent-${project.accent}${showDetails ? " project-card-detailed" : ""}`}
      to={`/projects/${project.slug}`}
    >
      <span className="folder" aria-hidden="true">
        <DocumentFolder />
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
