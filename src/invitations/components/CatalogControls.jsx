import { useEffect, useRef, useState } from "react";
import Icon from "../../components/ui/Icon.jsx";
import CollectionFilters from "./CollectionFilters.jsx";
import { useLanguage } from "../../localization/LanguageContext.jsx";

export default function CatalogControls({ resultCount, ...filterProps }) {
  const { t } = useLanguage();
  const dialogRef = useRef(null);
  const [open, setOpen] = useState(false);
  const activeCount = Number(Boolean(filterProps.project)) + Number(filterProps.occasion !== "all") + filterProps.appearance.themes.length + filterProps.appearance.colors.length;

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [open]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 901px)");
    function closeOnDesktop(event) {
      if (event.matches) dialogRef.current?.close();
    }
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  function openFilters() {
    dialogRef.current.showModal();
    setOpen(true);
  }

  return <div className="catalog-filter-shell">
    <aside className="catalog-sidebar" aria-label={t("catalog.filtersTitle")}>
      <CollectionFilters prefix="desktop-filter" {...filterProps} />
    </aside>
    <button type="button" className="catalog-mobile-filter-trigger" onClick={openFilters} aria-label={t("catalog.openFilters")} title={t("catalog.openFilters")} aria-haspopup="dialog" aria-controls="catalog-filter-dialog" aria-expanded={open}>
      <Icon name="filter" size={22} />
      {activeCount ? <span className="filter-active-badge" aria-hidden="true">{activeCount}</span> : null}
    </button>
    <dialog ref={dialogRef} id="catalog-filter-dialog" className="catalog-filter-dialog" aria-label={t("catalog.filtersTitle")} onClose={() => setOpen(false)} onClick={(event) => { if (event.target === event.currentTarget) dialogRef.current.close(); }}>
      <div className="catalog-filter-dialog-panel">
        <div className="catalog-dialog-heading"><button type="button" className="catalog-dialog-close" aria-label={t("catalog.closeFilters")} onClick={() => dialogRef.current.close()}><Icon name="close" size={22} /></button></div>
        <div className="catalog-dialog-body"><CollectionFilters prefix="mobile-filter" {...filterProps} /></div>
        <div className="catalog-dialog-footer"><button type="button" className="catalog-show-results" onClick={() => dialogRef.current.close()}>{t("catalog.showResults", { count: resultCount })}</button></div>
      </div>
    </dialog>
  </div>;
}
