import { Link, useSearchParams, useNavigate, useLocation } from "react-router-dom";
import InvitationGallery from "../components/InvitationGallery.jsx";
import CatalogControls from "../components/CatalogControls.jsx";
import { invitationTemplates } from "../data/templates.js";
import { invitationStyleOptions } from "../data/invitationStyles.js";
import { readCatalogFilters, updateCatalogFilters } from "../data/catalogFilters.js";
import { projects } from "../../data/projects.js";
import BirthdayExperience from "../../projects/BirthdayExperience.jsx";
import WeddingExperience from "../../projects/WeddingExperience.jsx";
import CorporateExperience from "../../projects/CorporateExperience.jsx";
import OtherCelebrationsExperience from "../../projects/OtherCelebrationsExperience.jsx";
import { useLanguage } from "../../localization/LanguageContext.jsx";

const experiences = { birthday: BirthdayExperience, wedding: WeddingExperience, other: OtherCelebrationsExperience };

function InvitationCollection({ project, selected, templates, total, renderHeading = true }) {
  const { t } = useLanguage();
  const { hash } = useLocation();
  const Heading = selected ? "h1" : "h2";
  const Experience = experiences[project.id];

  return (
    <section className="invitation-collection" id={`collection-${project.id}`} aria-label={t(`common.${project.id}`)}>
      {renderHeading ? <div className="invitation-collection-heading">
        <div>
          <Heading>{t(`common.${project.id}`)}</Heading>
          {total === 0 ? <p>{t(`project.${project.id}.description`)}</p> : null}
        </div>
        <small>{total ? `${templates.length} ${t(templates.length === 1 ? "common.design" : "common.designs")}` : t("common.preview")}</small>
      </div> : null}
      {total > 0 ? <>
        {templates.length ? <InvitationGallery templates={templates} /> : null}
        {selected && Experience ? <details data-scroll-restoration-details={`category-${project.id}`} className="collection-experience" open={hash === "#optional-modules" ? true : undefined}><summary>{t("catalog.more", { category: t(`common.${project.id}`) })}</summary><Experience project={project} embedded /></details> : null}
      </> : project.id === "corporate" ? <CorporateExperience embedded /> : <OtherCelebrationsExperience project={project} embedded />}
    </section>
  );
}

export default function InvitationsPage({ project = null, embedded = false }) {
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { pathname, hash, state } = useLocation();
  const categories = project ? [project] : projects;
  const { style } = readCatalogFilters(searchParams, project?.id);
  const hasFilters = style !== "all";
  const availableTemplates = invitationTemplates.filter((template) => !project || template.category.toLowerCase() === project.id);
  const visibleTemplates = availableTemplates.filter((template) => style === "all" || template.styleTags.includes(style));
  const options = invitationStyleOptions.map((option) => ({
    ...option,
    count: availableTemplates.filter((template) => option.id === "all" || template.styleTags.includes(option.id)).length,
  })).filter((option) => option.id === "all" || option.id === style || availableTemplates.some((template) => template.styleTags.includes(option.id)));
  const showControls = availableTemplates.length > 0;

  function updateFilters(changes) {
    const next = updateCatalogFilters(searchParams, { style, ...changes });
    // A result anchor may no longer exist after filtering. Keep module links intact.
    navigate({ pathname, search: next.toString(), hash: hash.startsWith("#design-") ? "" : hash }, { preventScrollReset: true, replace: true, state: { ...state, preserveScroll: true } });
  }

  function categoryLink(category) {
    const next = new URLSearchParams();
    if (style !== "all") next.set("style", style);
    return { pathname: category ? `/projects/${category.slug}` : "/invitations", search: next.toString() };
  }

  return (
    <section id="invitations" className={`invitations-page event-catalog${embedded ? " is-embedded" : " inner-page"}`} aria-label={t("catalog.title")}>
            <div className="invitations-heading"><div><span className="invitations-eyebrow">{t("invitations.eyebrow")}</span><h1>{t(project ? (availableTemplates.length ? `invitations.${project.id}.title` : `common.${project.id}`) : "catalog.title")}</h1><p>{t(project ? (availableTemplates.length ? `invitations.${project.id}.description` : `project.${project.id}.description`) : "catalog.description")}</p></div></div>
      <CatalogControls project={project} style={style} options={options} resultCount={visibleTemplates.length} showStyle={showControls} onChange={updateFilters} categoryLink={categoryLink} />
      {showControls && visibleTemplates.length === 0 ? <div className="invitation-empty-state"><h2>{t("catalog.empty.title")}</h2><p>{t("catalog.empty.description")}</p></div> : null}
      {categories.map((category) => {
        const templates = visibleTemplates.filter((template) => template.category.toLowerCase() === category.id);
        const total = availableTemplates.filter((template) => template.category.toLowerCase() === category.id).length;
        if (hasFilters && templates.length === 0 && !project) return null;
        return <InvitationCollection key={category.id} project={category} selected={Boolean(project)} templates={templates} total={total} renderHeading={!project} />;
      })}
      <div className="invitation-storefront-note"><p>{t("invitations.note")}</p></div>
    </section>
  );
}
