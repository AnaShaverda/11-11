import Icon from "../components/ui/Icon.jsx";
import { Link, Navigate, useLocation, useParams } from "react-router-dom";
import { getProjectBySlug } from "../data/projects.js";
import { getInvitationCatalogLink, readCatalogCategory } from "../invitations/data/catalogFilters.js";
import { useLanguage } from "../localization/LanguageContext.jsx";

export default function ProjectDetailPage() {
  const { t } = useLanguage();
  const { slug } = useParams();
  const { search, hash, state } = useLocation();
  if (slug === "friendship-diary") return <Navigate to={`/modules/friendship-diary${search}${hash}`} state={state} replace />;
  const params = new URLSearchParams(search);
  const project = ["other", "other-celebrations"].includes(slug) ? readCatalogCategory(new URLSearchParams({ category: "other", occasion: params.get("occasion") ?? "" })) : getProjectBySlug(slug);
  if (!project) {
    return (
      <section className="inner-page copy-page">
        <h1>{t("project.notFound.title")}</h1>
        <p>{t("project.notFound.description")}</p>
        <Link className="text-link" to="/#projects">{t("common.allEvents")} <Icon name="arrow-up-right" size={18} /></Link>
      </section>
    );
  }

  return <Navigate to={{ ...getInvitationCatalogLink(project, new URLSearchParams(search)), hash }} state={state} replace />;

}
