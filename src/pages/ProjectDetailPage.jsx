import Icon from "../components/ui/Icon.jsx";
import { Link, Navigate, useParams } from "react-router-dom";
import ProjectIcon from "../components/ui/ProjectIcon.jsx";
import { getCanonicalProjectSlug, getProjectBySlug } from "../data/projects.js";
import BirthdayExperience from "../projects/BirthdayExperience.jsx";
import WeddingExperience from "../projects/WeddingExperience.jsx";
import CorporateExperience from "../projects/CorporateExperience.jsx";
import OtherCelebrationsExperience from "../projects/OtherCelebrationsExperience.jsx";
import { useLanguage } from "../localization/LanguageContext.jsx";

const experiencePages = {
  birthday: BirthdayExperience,
  wedding: WeddingExperience,
  corporate: CorporateExperience,
  "other-celebrations": OtherCelebrationsExperience,
};

export default function ProjectDetailPage() {
  const { t } = useLanguage();
  const { slug } = useParams();
  if (slug === "friendship-diary") return <Navigate to="/modules/friendship-diary" replace />;
  const canonicalSlug = getCanonicalProjectSlug(slug);
  if (canonicalSlug !== slug) return <Navigate to={`/projects/${canonicalSlug}`} replace />;
  const project = getProjectBySlug(slug);
  if (!project) {
    return (
      <section className="inner-page copy-page">
        <h1>{t("project.notFound.title")}</h1>
        <p>{t("project.notFound.description")}</p>
        <Link className="text-link" to="/#projects">{t("common.allEvents")} <Icon name="arrow-up-right" size={18} /></Link>
      </section>
    );
  }

  const ExperiencePage = experiencePages[project.slug];
  if (ExperiencePage) return <ExperiencePage project={project} />;

  return (
    <section className="inner-page detail-page">
      <Link className="back-link" to="/#projects">
        <Icon name="arrow-left" size={18} /> {t("common.allEvents")}
      </Link>
      <div className={`detail-icon accent-${project.accent}`}>
        <ProjectIcon name={project.icon} />
      </div>
      <h1>{t(`common.${project.id}`)}</h1>
      <p>{t("project.comingSoon")}</p>
    </section>
  );
}
