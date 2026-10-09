import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import InvitationGallery from "../components/InvitationGallery.jsx";
import BackToTop from "../components/BackToTop.jsx";
import CatalogControls from "../components/CatalogControls.jsx";
import { activeInvitationTemplates } from "../data/templates.js";
import { catalogThemeOptions, getCatalogAppearance, matchesCatalogAppearance, readCatalogAppearance } from "../data/catalogAppearance.js";
import { getInvitationCatalogLink, readCatalogCategory, readCatalogFilters, readCatalogOccasion, updateCatalogFilters } from "../data/catalogFilters.js";
import { itemMatchesCategory } from "../../data/catalogMembership.js";
import { getCelebrationSubcategory } from "../../data/projects.js";
import BirthdayExperience from "../../projects/BirthdayExperience.jsx";
import WeddingExperience from "../../projects/WeddingExperience.jsx";
import CorporateExperience from "../../projects/CorporateExperience.jsx";
import { useLanguage } from "../../localization/LanguageContext.jsx";
import { customCategories } from "../data/customTemplates.js";

const experiences = { birthday: BirthdayExperience, wedding: WeddingExperience };

export default function InvitationsPage() {
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { pathname, hash, state } = useLocation();
  const project = readCatalogCategory(searchParams);
  const { style: requestedStyle } = readCatalogFilters(searchParams, project?.id);
  const occasion = readCatalogOccasion(searchParams);
  const categoryTemplates = activeInvitationTemplates.filter((item) => itemMatchesCategory(item, project?.id));
  const availableTemplates = categoryTemplates.filter((item) => itemMatchesCategory(item, project?.id, occasion));
  const appearance = readCatalogAppearance(searchParams, requestedStyle);
  const hasAppearance = appearance.themes.length > 0 || appearance.colors.length > 0;
  const showAppearance = availableTemplates.length > 0 || hasAppearance;
  const visibleTemplates = availableTemplates.filter((item) => matchesCatalogAppearance(item, appearance));
  const customCategory = project?.id === "baby-kids" ? (["all", "christening"].includes(occasion) ? "christening" : null) : project?.id && customCategories.includes(project.id) ? project.id : !project || project.id === "trending" ? "all" : null;
  const resultCount = visibleTemplates.length + Number(Boolean(customCategory));
  const resultKey = [project?.id ?? "all", occasion, appearance.themes.join(","), appearance.colors.join(",")].join("|");
  const availableAppearance = availableTemplates.map(getCatalogAppearance);
  const themeOptions = catalogThemeOptions.filter((option) => appearance.themes.includes(option.id) || availableAppearance.some((item) => item.themes.includes(option.id)));
  const availableColors = [...new Set(availableAppearance.flatMap((item) => item.colors))];
  const selectedOccasion = getCelebrationSubcategory(occasion);
  const title = project ? t(`common.${project.id}`) : t("invitations.all");
  const Experience = experiences[project?.id];

  function updateFilters(changes) {
    const next = updateCatalogFilters(searchParams, { style: "all", themes: appearance.themes.join(","), colors: appearance.colors.join(","), ...changes });
    navigate({ pathname, search: next.toString(), hash: hash.startsWith("#design-") ? "" : hash }, { preventScrollReset: true, replace: true, state: { ...state, preserveScroll: true } });
  }

  function changeCategory(category) {
    const link = getInvitationCatalogLink(category, searchParams);
    const next = updateCatalogFilters(new URLSearchParams(link.search), { style: "all", themes: appearance.themes.join(","), colors: appearance.colors.join(",") });
    navigate({ ...link, search: next.toString(), hash: hash.startsWith("#design-") ? "" : hash }, { preventScrollReset: true, replace: true, state: { ...state, preserveScroll: true } });
  }

  return (
    <section id="invitations" className="invitations-page event-catalog" aria-label={t("catalog.title")}>
      <div className="catalog-layout">
      <CatalogControls project={project} occasion={occasion} appearance={appearance} themeOptions={themeOptions} availableColors={availableColors} showAppearance={showAppearance} resultCount={resultCount} hasFilters={Boolean(project) || occasion !== "all" || hasAppearance} onCategoryChange={changeCategory} onChange={updateFilters} onReset={() => updateFilters({ category: "all", occasion: "all", themes: "", colors: "" })} />
      <div className="catalog-results-column">
      <section className="invitation-collection" id={`collection-${project?.id ?? "all"}`} aria-label={title}>
        <div className="invitation-collection-heading"><div className="collection-heading-copy"><h2>{title} <span className="category-heading-count" aria-live="polite" aria-atomic="true">({resultCount})</span></h2>{project ? <p>{t(`project.${project.id}.description`)}</p> : null}</div></div>
        {project?.id === "trending" ? <p className="category-curated-note">{t("category.trending.note")}</p> : null}
        {(visibleTemplates.length || customCategory) ? <InvitationGallery key={resultKey} templates={visibleTemplates} customCategory={customCategory} /> : null}
        {!resultCount && project?.id !== "corporate" ? <div className="invitation-empty-state"><h2>{t(selectedOccasion && !hasAppearance ? "catalog.occasion.empty.title" : "catalog.empty.title", { occasion: selectedOccasion ? t(selectedOccasion.captionKey) : title })}</h2><p>{t(selectedOccasion && !hasAppearance ? "catalog.occasion.empty.description" : "catalog.empty.description")}</p>{hasAppearance ? <button type="button" className="collection-clear-filters" onClick={() => updateFilters({ themes: "", colors: "" })}>{t("catalog.clearAppearance")}</button> : null}</div> : null}
        {project?.id === "corporate" ? <CorporateExperience embedded /> : null}
        {Experience ? <details data-scroll-restoration-details={`category-${project.id}`} className="collection-experience" open={hash === "#optional-modules" ? true : undefined}><summary>{t("catalog.more", { category: t(`common.${project.id}`) })}</summary><Experience project={project} embedded /></details> : null}
      </section>
      </div>
      </div>
      <div className="invitation-storefront-note"><p>{t("invitations.note")}</p></div>
      <BackToTop />
    </section>
  );
}
