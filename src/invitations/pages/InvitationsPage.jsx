import { useSearchParams } from "react-router-dom";
import InvitationGallery from "../components/InvitationGallery.jsx";
import { invitationTemplates } from "../data/templates.js";
import { invitationStyleOptions } from "../data/invitationStyles.js";
import { useLanguage } from "../../localization/LanguageContext.jsx";

const filters = ["All", "Birthday", "Wedding"];
const collectionCopy = { Birthday: { index: "01", key: "birthday" }, Wedding: { index: "02", key: "wedding" } };

export default function InvitationsPage() {
  const { t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const requestedFilter = searchParams.get("type");
  const filter = filters.includes(requestedFilter) ? requestedFilter : "All";
  const requestedStyle = searchParams.get("style");
  const style = invitationStyleOptions.some((option) => option.id === requestedStyle) ? requestedStyle : "all";
  const categories = filter === "All" ? ["Birthday", "Wedding"] : [filter];
  const categoryTemplates = invitationTemplates.filter((template) => filter === "All" || template.category === filter);
  const visibleTemplates = categoryTemplates.filter((template) => style === "all" || template.styleTags.includes(style));

  function updateFilter(key, value) {
    setSearchParams((current) => {
      const next = new URLSearchParams(current);
      next.delete("q");
      if (value) next.set(key, value);
      else next.delete(key);
      return next;
    });
  }

  return (
    <section className="inner-page invitations-page">
      <div className="invitations-heading">
        <div><span className="invitations-eyebrow">{t("invitations.eyebrow")}</span><h1>{t("invitations.title")}</h1><p>{t("invitations.description", { count: invitationTemplates.length })}</p></div>
        <span className="invitations-heading-mark" aria-hidden="true">✳</span>
      </div>
      <div className="invitation-filters" role="group" aria-label={t("invitations.filter")}>
        {filters.map((option) => <button className={`filter-button${filter === option ? " is-active" : ""}`} type="button" key={option} aria-pressed={filter === option} onClick={() => updateFilter("type", option === "All" ? "" : option)}>{option === "All" ? t("invitations.all") : t(`common.${option.toLowerCase()}`)}</button>)}
      </div>
      <div className="invitation-style-filter" role="group" aria-label={t("invitations.styleFilter")}>
        <span className="invitation-style-filter-label">{t("common.style")}</span>
        <div className="invitation-style-options">{invitationStyleOptions.map((option) => {
          const count = option.id === "all" ? categoryTemplates.length : categoryTemplates.filter((template) => template.styleTags.includes(option.id)).length;
          return <button className={`style-filter-button${style === option.id ? " is-active" : ""}${count === 0 ? " is-empty" : ""}`} type="button" key={option.id} aria-pressed={style === option.id} onClick={() => updateFilter("style", option.id === "all" ? "" : option.id)}><span>{option.id === "all" ? t("invitations.allStyles") : t(`invitations.styles.${option.id}`)}</span><small>{count}</small></button>;
        })}</div>
      </div>
      <p className="filter-count">{visibleTemplates.length} {t(visibleTemplates.length === 1 ? "common.design" : "common.designs")}</p>
      {categories.map((category) => {
        const templates = visibleTemplates.filter((template) => template.category === category);
        if (templates.length === 0) return null;
        const copy = collectionCopy[category];
        return (
          <section className="invitation-collection" key={category} aria-labelledby={`invitation-${category.toLowerCase()}-heading`}>
            <div className="invitation-collection-heading"><span>{copy.index} / {t("invitations.collection")}</span><div><h2 id={`invitation-${category.toLowerCase()}-heading`}>{t(`invitations.${copy.key}.title`)}</h2><p>{t(`invitations.${copy.key}.description`)}</p></div><small>{templates.length} {t("common.designs")}</small></div>
            <InvitationGallery templates={templates} />
          </section>
        );
      })}
      {visibleTemplates.length === 0 && <div className="invitation-empty-state"><h2>{t("invitations.empty.title")}</h2><p>{t("invitations.empty.description")}</p><button type="button" className="filter-button" onClick={() => setSearchParams(filter === "All" ? {} : { type: filter })}>{t("invitations.viewAllStyles")}</button></div>}
      <div className="invitation-storefront-note"><span aria-hidden="true">✦</span><p>{t("invitations.note")}</p></div>
    </section>
  );
}
