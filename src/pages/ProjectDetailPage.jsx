import Icon from "../components/ui/Icon.jsx";
import { Link, Navigate, useParams } from "react-router-dom";
import { getCanonicalProjectSlug, getProjectBySlug } from "../data/projects.js";
import InvitationsPage from "../invitations/pages/InvitationsPage.jsx";
import { useLanguage } from "../localization/LanguageContext.jsx";

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

  return <InvitationsPage project={project} />;

}
