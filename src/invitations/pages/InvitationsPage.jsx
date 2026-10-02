import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import InvitationGallery from "../components/InvitationGallery.jsx";
import CatalogControls from "../components/CatalogControls.jsx";
import CelebrationSubcategories from "../components/CelebrationSubcategories.jsx";
import { activeInvitationTemplates } from "../data/templates.js";
import { invitationStyleOptions } from "../data/invitationStyles.js";
import { getInvitationCatalogLink, readCatalogCategory, readCatalogFilters, readCatalogOccasion, updateCatalogFilters } from "../data/catalogFilters.js";
import { projects, getCategoryCaptionKey, getCelebrationSubcategory } from "../../data/projects.js";
import BirthdayExperience from "../../projects/BirthdayExperience.jsx";
import WeddingExperience from "../../projects/WeddingExperience.jsx";
import CorporateExperience from "../../projects/CorporateExperience.jsx";
import OtherCelebrationsExperience from "../../projects/OtherCelebrationsExperience.jsx";
import { useLanguage } from "../../localization/LanguageContext.jsx";

const experiences = { birthday: BirthdayExperience, wedding: WeddingExperience };

function InvitationCollection({ project, selected, templates, total, occasion, onOccasionChange, emptyMessage }) {
  const { t } = useLanguage();
  const { hash } = useLocation();
  const Experience = experiences[project.id];
  const title = t(getCategoryCaptionKey(project.id, occasion));

  return (
    <section className="invitation-collection" id={`collection-${project.id}`} aria-label={title}>
      <div className="invitation-collection-heading">
        <div>
          <h2>{title}</h2>
          {total === 0 ? <p>{t(`project.${project.id}.description`)}</p> : null}
        </div>
        <small>{total ? `${templates.length} ${t(templates.length === 1 ? "common.design" : "common.designs")}` : t("common.preview")}</small>
      </div>
      {project.id === "other" && !selected ? <CelebrationSubcategories project={project} value={occasion} onChange={onOccasionChange} /> : null}
      {total > 0 ? <>
        {templates.length ? <InvitationGallery templates={templates} /> : null}
        {!templates.length && (!selected || project.id === "other") ? <div className="invitation-empty-state"><h2>{emptyMessage.title}</h2><p>{emptyMessage.description}</p></div> : null}
        {selected && Experience ? <details data-scroll-restoration-details={`category-${project.id}`} className="collection-experience" open={hash === "#optional-modules" ? true : undefined}><summary>{t("catalog.more", { category: t(`common.${project.id}`) })}</summary><Experience project={project} embedded /></details> : null}
      </> : project.id === "corporate" ? <CorporateExperience embedded /> : <OtherCelebrationsExperience project={project} embedded />}
    </section>
  );
}

export default function InvitationsPage() {
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { pathname, hash, state } = useLocation();
  const project = readCatalogCategory(searchParams);
  const categories = project ? [project] : projects;
  const { style } = readCatalogFilters(searchParams, project?.id);
  const occasion = readCatalogOccasion(searchParams);
  const hasFilters = style !== "all";
  const categoryTemplates = activeInvitationTemplates.filter((template) => !project || template.category.toLowerCase() === project.id);
  const availableTemplates = categoryTemplates.filter((template) => template.category !== "Other" || occasion === "all" || template.subcategory === occasion);
  const visibleTemplates = availableTemplates.filter((template) => style === "all" || template.styleTags.includes(style));
  const options = invitationStyleOptions.map((option) => ({
    ...option,
    count: availableTemplates.filter((template) => option.id === "all" || template.styleTags.includes(option.id)).length,
  })).filter((option) => option.id === "all" || option.id === style || availableTemplates.some((template) => template.styleTags.includes(option.id)));
  const showControls = categoryTemplates.length > 0;
  const selectedOccasion = getCelebrationSubcategory(occasion);
  const occasionComingSoon = selectedOccasion && !activeInvitationTemplates.some((template) => template.category === "Other" && template.subcategory === occasion);
  const emptyMessage = occasionComingSoon ? {
    title: t("catalog.occasion.empty.title", { occasion: t(selectedOccasion.captionKey) }),
    description: t("catalog.occasion.empty.description"),
  } : { title: t("catalog.empty.title"), description: t("catalog.empty.description") };

  function updateFilters(changes) {
    const next = updateCatalogFilters(searchParams, { style, ...changes });
    // A result anchor may no longer exist after filtering. Keep module links intact.
    navigate({ pathname, search: next.toString(), hash: hash.startsWith("#design-") ? "" : hash }, { preventScrollReset: true, replace: true, state: { ...state, preserveScroll: true } });
  }

  function categoryLink(category) {
    return getInvitationCatalogLink(category, searchParams);
  }

  return (
    <section id="invitations" className="invitations-page event-catalog inner-page" aria-label={t("catalog.title")}>
      <div className="invitations-heading"><div><span className="invitations-eyebrow">{t("invitations.eyebrow")}</span><h1>{t("catalog.title")}</h1><p>{t("catalog.description")}</p></div></div>
      <CatalogControls project={project} style={style} options={options} resultCount={visibleTemplates.length} showStyle={showControls} onChange={updateFilters} categoryLink={categoryLink}>
        {project?.id === "other" ? <CelebrationSubcategories project={project} value={occasion} onChange={(id) => updateFilters({ occasion: id })} /> : null}
      </CatalogControls>
      {showControls && visibleTemplates.length === 0 && project?.id !== "other" ? <div className="invitation-empty-state"><h2>{t("catalog.empty.title")}</h2><p>{t("catalog.empty.description")}</p></div> : null}
      {categories.map((category) => {
        const templates = visibleTemplates.filter((template) => template.category.toLowerCase() === category.id);
        const total = categoryTemplates.filter((template) => template.category.toLowerCase() === category.id).length;
        if (hasFilters && templates.length === 0 && !project && !(category.id === "other" && occasion !== "all")) return null;
        return <InvitationCollection key={category.id} project={category} selected={Boolean(project)} templates={templates} total={total} occasion={occasion} onOccasionChange={(id) => updateFilters({ occasion: id })} emptyMessage={emptyMessage} />;
      })}
      <div className="invitation-storefront-note"><p>{t("invitations.note")}</p></div>
    </section>
  );
}
