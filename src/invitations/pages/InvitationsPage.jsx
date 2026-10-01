import { Link, useSearchParams, useNavigate, useLocation } from "react-router-dom";
import InvitationGallery from "../components/InvitationGallery.jsx";
import { invitationTemplates } from "../data/templates.js";
import { invitationStyleOptions } from "../data/invitationStyles.js";
import { projects } from "../../data/projects.js";
import BirthdayExperience from "../../projects/BirthdayExperience.jsx";
import WeddingExperience from "../../projects/WeddingExperience.jsx";
import CorporateExperience from "../../projects/CorporateExperience.jsx";
import OtherCelebrationsExperience from "../../projects/OtherCelebrationsExperience.jsx";
import { useLanguage } from "../../localization/LanguageContext.jsx";

const experiences = { birthday: BirthdayExperience, wedding: WeddingExperience };

function InvitationCollection({ project, selected, index }) {
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { hash } = useLocation();
  const styleKey = `${project.id}Style`;
  const requestedStyle = searchParams.get(styleKey);
  const style = invitationStyleOptions.some((option) => option.id === requestedStyle) ? requestedStyle : "all";
  const templates = invitationTemplates.filter((template) => template.category.toLowerCase() === project.id);
  const visibleTemplates = templates.filter((template) => style === "all" || template.styleTags.includes(style));
  const Heading = selected ? "h1" : "h2";
  const Experience = experiences[project.id];

  function updateStyle(value) {
    const next = new URLSearchParams(searchParams);
    if (value === "all") next.delete(styleKey);
    else next.set(styleKey, value);
    navigate({ search: next.toString(), hash }, { preventScrollReset: true });
  }

  return (
    <section className="invitation-collection" id={`collection-${project.id}`} aria-labelledby={`invitation-${project.id}-heading`}>
      <div className="invitation-collection-heading">
        <span>{String(index + 1).padStart(2, "0")} / {t("invitations.collection")}</span>
        <div>
          <Heading id={`invitation-${project.id}-heading`}>{t(templates.length ? `invitations.${project.id}.title` : `common.${project.id}`)}</Heading>
          <p>{t(templates.length ? `invitations.${project.id}.description` : `project.${project.id}.description`)}</p>
        </div>
        <small>{templates.length ? `${templates.length} ${t("common.designs")}` : t("common.preview")}</small>
      </div>
      {templates.length > 0 ? <>
        <div className="invitation-style-filter" role="group" aria-label={`${t(`common.${project.id}`)}: ${t("invitations.styleFilter")}`}>
          <span className="invitation-style-filter-label">{t("common.style")}</span>
          <div className="invitation-style-options">{invitationStyleOptions.map((option) => {
            const count = option.id === "all" ? templates.length : templates.filter((template) => template.styleTags.includes(option.id)).length;
            if (count === 0) return null;
            return <button className={`style-filter-button${style === option.id ? " is-active" : ""}`} type="button" key={option.id} aria-pressed={style === option.id} onClick={() => updateStyle(option.id)}><span>{option.id === "all" ? t("invitations.allStyles") : t(`invitations.styles.${option.id}`)}</span><small>{count}</small></button>;
          })}</div>
        </div>
        <p className="filter-count" aria-live="polite">{visibleTemplates.length} {t(visibleTemplates.length === 1 ? "common.design" : "common.designs")}</p>
        {visibleTemplates.length > 0 ? <InvitationGallery templates={visibleTemplates} /> : <div className="invitation-empty-state"><h2>{t("invitations.empty.title")}</h2><p>{t("invitations.empty.description")}</p><button type="button" className="filter-button" onClick={() => updateStyle("all")}>{t("invitations.viewAllStyles")}</button></div>}
        {selected && Experience ? <details className="collection-experience" open={hash === "#optional-modules" ? true : undefined}><summary>{t("catalog.more", { category: t(`common.${project.id}`) })}</summary><Experience /></details> : null}
      </> : project.id === "corporate" ? <CorporateExperience embedded /> : <OtherCelebrationsExperience project={project} embedded />}
    </section>
  );
}

export default function InvitationsPage({ project = null, embedded = false }) {
  const { t } = useLanguage();
  const categories = project ? [project] : projects;
  return (
    <section id="invitations" className={`invitations-page event-catalog${embedded ? " is-embedded" : " inner-page"}`} aria-label={t("catalog.title")}>
      {!project ? <div className="invitations-heading"><div><span className="invitations-eyebrow">{t("invitations.eyebrow")}</span><h1>{t("catalog.title")}</h1><p>{t("catalog.description")}</p></div></div> : null}
      <nav className="invitation-filters category-navigation" aria-label={t("common.exploreEvents")}>
        <Link className={`filter-button${!project ? " is-active" : ""}`} to="/invitations" aria-current={!project ? "page" : undefined}>{t("invitations.all")}</Link>
        {projects.map((category) => <Link className={`filter-button${project?.id === category.id ? " is-active" : ""}`} key={category.id} to={`/projects/${category.slug}`} aria-current={project?.id === category.id ? "page" : undefined}>{t(`common.${category.id}`)}</Link>)}
      </nav>
      {categories.map((category) => <InvitationCollection key={category.id} project={category} selected={Boolean(project)} index={projects.indexOf(category)} />)}
      <div className="invitation-storefront-note"><p>{t("invitations.note")}</p></div>
    </section>
  );
}
