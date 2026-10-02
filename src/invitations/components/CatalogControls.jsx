import { useLayoutEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Icon from "../../components/ui/Icon.jsx";
import SelectField from "../../components/ui/SelectField.jsx";
import { projects } from "../../data/projects.js";
import { useLanguage } from "../../localization/LanguageContext.jsx";

let lastCategoryLine = null;

export default function CatalogControls({ project, style, options, resultCount, showStyle, onChange, categoryLink }) {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const categoryRef = useRef(null);
  const lineMounted = useRef(false);
  const hasFilter = showStyle && style !== "all";

  useLayoutEffect(() => {
    const nav = categoryRef.current;
    let mounted = true;
    function positionLine() {
      if (!mounted) return;
      const active = nav.querySelector('[aria-current="page"]');
      if (!active) return;
      if (!lineMounted.current && lastCategoryLine) {
        nav.style.setProperty("--category-active-left", `${lastCategoryLine.left}px`);
        nav.style.setProperty("--category-active-width", `${lastCategoryLine.width}px`);
        nav.querySelector(".category-active-line").getBoundingClientRect();
      }
      lineMounted.current = true;
      nav.style.setProperty("--category-active-left", `${active.offsetLeft}px`);
      nav.style.setProperty("--category-active-width", `${active.offsetWidth}px`);
      lastCategoryLine = { left: active.offsetLeft, width: active.offsetWidth };
      nav.scrollTo({ left: Math.max(0, active.offsetLeft + active.offsetWidth - nav.clientWidth), behavior: "auto" });
    }
    positionLine();
    const resize = new ResizeObserver(positionLine);
    resize.observe(nav);
    document.fonts.ready.then(positionLine);
    return () => { mounted = false; resize.disconnect(); };
  }, [project?.id, language]);

  function changeCategory(event) {
    navigate(categoryLink(projects.find((category) => category.id === event.target.value) ?? null), { replace: true, state: { ...location.state, preserveScroll: true } });
  }

  return (
    <div className="catalog-controls">
      <div className="catalog-toolbar">
        <div className="catalog-desktop-categories">
          <nav ref={categoryRef} className="invitation-filters category-navigation" aria-label={t("common.exploreEvents")}>
            <Link replace state={{ ...location.state, preserveScroll: true }} className={`filter-button${!project ? " is-active" : ""}`} to={categoryLink(null)} aria-current={!project ? "page" : undefined}>{t("invitations.all")}</Link>
            {projects.map((category) => <Link replace state={{ ...location.state, preserveScroll: true }} className={`filter-button${project?.id === category.id ? " is-active" : ""}`} key={category.id} to={categoryLink(category)} aria-current={project?.id === category.id ? "page" : undefined}>{t(`common.${category.id}`)}</Link>)}
            <span className="category-active-line" aria-hidden="true" />
          </nav>
        </div>
        <SelectField className="catalog-mobile-category" id="catalog-category" label={t("catalog.category")} hideLabel value={project?.id ?? "all"} onChange={changeCategory}>
          <option value="all">{t("invitations.all")}</option>
          {projects.map((category) => <option key={category.id} value={category.id}>{t(`common.${category.id}`)}</option>)}
        </SelectField>
        <SelectField className="catalog-style" id="catalog-style" label={t("catalog.filter")} hideLabel value={showStyle ? style : "all"} disabled={!showStyle} onChange={(event) => onChange({ style: event.target.value })}>
          {options.map((option) => <option key={option.id} value={option.id} disabled={option.count === 0 && style !== option.id}>{option.id === "all" ? t("invitations.allStyles") : `${t(`invitations.styles.${option.id}`)} (${option.count})`}</option>)}
        </SelectField>
      </div>
      <div className="catalog-results-bar">
        <p className="catalog-result-count" role="status">{showStyle ? t(resultCount === 1 ? "catalog.result.one" : "catalog.result.many", { count: resultCount }) : t("common.preview")}</p>
        {hasFilter ? <div className="catalog-applied-filters" role="group" aria-label={t("catalog.filters.applied")}>
          <button className="catalog-filter-chip" type="button" onClick={() => onChange({ style: "all" })} aria-label={t("catalog.style.remove", { style: t(`invitations.styles.${style}`) })}><span>{t(`invitations.styles.${style}`)}</span><Icon name="close" size={16} /></button>
        </div> : null}
      </div>
    </div>
  );
}
