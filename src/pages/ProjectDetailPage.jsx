import { Link, Navigate, useParams } from "react-router-dom";
import ProjectIcon from "../components/ui/ProjectIcon.jsx";
import { getCanonicalProjectSlug, getProjectBySlug } from "../data/projects.js";
import BirthdayExperience from "../projects/BirthdayExperience.jsx";
import WeddingExperience from "../projects/WeddingExperience.jsx";
import CorporateExperience from "../projects/CorporateExperience.jsx";
import OtherCelebrationsExperience from "../projects/OtherCelebrationsExperience.jsx";

const experiencePages = {
  birthday: BirthdayExperience,
  wedding: WeddingExperience,
  corporate: CorporateExperience,
  "other-celebrations": OtherCelebrationsExperience,
};

export default function ProjectDetailPage() {
  const { slug } = useParams();
  if (slug === "friendship-diary") return <Navigate to="/modules/friendship-diary" replace />;
  const canonicalSlug = getCanonicalProjectSlug(slug);
  if (canonicalSlug !== slug) return <Navigate to={`/projects/${canonicalSlug}`} replace />;
  const project = getProjectBySlug(slug);
  if (!project) {
    return (
      <section className="inner-page copy-page">
        <h1>Experience not found</h1>
        <p>That experience isn’t here, but there is more to explore.</p>
        <Link className="text-link" to="/projects">All experiences <span aria-hidden="true">↗</span></Link>
      </section>
    );
  }

  const ExperiencePage = experiencePages[project.slug];
  if (ExperiencePage) return <ExperiencePage project={project} />;

  return (
    <section className="inner-page detail-page">
      <Link className="back-link" to="/projects">
        ← All experiences
      </Link>
      <div className={`detail-icon accent-${project.accent}`}>
        <ProjectIcon name={project.icon} />
      </div>
      <h1>{project.title}</h1>
      <p>This experience is coming soon.</p>
    </section>
  );
}
