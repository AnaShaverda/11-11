import { useLayoutEffect, useRef, useState } from "react";
import Icon from "../../components/ui/Icon.jsx";
import { catalogColorOptions } from "../data/catalogAppearance.js";
import { projects } from "../../data/projects.js";
import { useLanguage } from "../../localization/LanguageContext.jsx";

function SelectionList({ className, selection, choiceSelector, highlightClassName, children }) {
  const listRef = useRef(null);
  const [highlight, setHighlight] = useState(null);
  useLayoutEffect(() => {
    const list = listRef.current;
    function measureSelection() {
      const label = list.querySelector(choiceSelector);
      if (!label) return;
      const container = list.getBoundingClientRect();
      const box = label.getBoundingClientRect();
      const next = { y: box.top - container.top, height: box.height, width: box.width };
      setHighlight((previous) => previous && Object.keys(next).every((key) => Math.abs(previous[key] - next[key]) < .5) ? previous : next);
    }
    measureSelection();
    const observer = new ResizeObserver(measureSelection);
    observer.observe(list);
    return () => observer.disconnect();
  }, [selection, choiceSelector]);
  return <div className={className} ref={listRef}>
    {highlight ? <div className={`sidebar-selection-highlight ${highlightClassName}`} aria-hidden="true" style={{ transform: `translateY(${highlight.y}px)`, height: highlight.height, width: highlight.width }} /> : null}
    {children}
  </div>;
}

export default function CollectionFilters({ prefix, project, occasion, appearance, themeOptions, availableColors, showAppearance, hasFilters, onCategoryChange, onChange, onReset }) {
  const { t } = useLanguage();
  const selectedCategory = project?.id ?? "all";
  const categories = [{ id: "all", captionKey: "invitations.all" }, ...projects.map((item) => ({ ...item, captionKey: `common.${item.id}` }))];
  function toggleChoice(key, id) {
    const selected = appearance[key];
    onChange({ [key]: (selected.includes(id) ? selected.filter((value) => value !== id) : [...selected, id]).join(",") });
  }

  return <div className="sidebar-filter-fields">
    <fieldset className="sidebar-filter-group">
      <legend>{t("catalog.categories")}</legend>
      <SelectionList className="sidebar-categories-list" selection={selectedCategory} choiceSelector='.sidebar-category-choice[data-selected="true"]' highlightClassName="sidebar-category-highlight">
      {categories.map((item) => {
        const selected = selectedCategory === item.id;
        return <div className="sidebar-category-item" key={item.id} data-category={item.id}>
          <label className="sidebar-filter-choice sidebar-category-choice" data-selected={selected}>
            <input type="radio" name={`${prefix}-category`} value={item.id} checked={selected} onClick={() => { if (selected && item.id !== "all") onCategoryChange(null); }} onKeyDown={(event) => { if (event.currentTarget.checked && item.id !== "all" && event.key === " ") { event.preventDefault(); onCategoryChange(null); } }} onChange={() => onCategoryChange(projects.find((category) => category.id === item.id) ?? null)} />
            <span>{t(item.captionKey)}</span>
            {item.subcategories?.length ? <Icon name={selected ? "chevron-down" : "chevron-right"} size={16} /> : null}
          </label>
          {item.subcategories?.length ? <div className={`sidebar-subcategories-panel${selected ? " is-open" : ""}`} aria-hidden={!selected} inert={!selected}><div className="sidebar-subcategories-content"><fieldset className="sidebar-subcategories" disabled={!selected}>
            <legend>{t("catalog.subcategories")} · {t(item.captionKey)}</legend>
            <SelectionList className="sidebar-subcategory-list" selection={selected ? occasion : null} choiceSelector='.sidebar-subcategory-choice[data-selected="true"]' highlightClassName="sidebar-subcategory-highlight">
            <label className="sidebar-filter-choice sidebar-subcategory-choice" data-selected={selected && occasion === "all"}>
              <input type="radio" name={`${prefix}-${item.id}-occasion`} value="all" checked={selected && occasion === "all"} onChange={() => onChange({ occasion: "all" })} />
              <span>{t("catalog.allCategory", { category: t(item.captionKey) })}</span>
            </label>
            {item.subcategories.map((subcategory) => <label className="sidebar-filter-choice sidebar-subcategory-choice" key={subcategory.id} data-selected={selected && occasion === subcategory.id}>
              <input type="radio" name={`${prefix}-${item.id}-occasion`} value={subcategory.id} checked={selected && occasion === subcategory.id} onClick={() => { if (occasion === subcategory.id) onChange({ occasion: "all" }); }} onKeyDown={(event) => { if (event.currentTarget.checked && event.key === " ") { event.preventDefault(); onChange({ occasion: "all" }); } }} onChange={() => onChange({ occasion: subcategory.id })} />
              <span>{t(subcategory.captionKey)}</span>
            </label>)}
            </SelectionList>
          </fieldset></div></div> : null}
        </div>;
      })}
      </SelectionList>
    </fieldset>
    {showAppearance ? <>
      <fieldset className="sidebar-filter-group sidebar-theme-group">
        <legend>{t("catalog.themeLabel")}</legend>
        <div className="catalog-theme-options">{themeOptions.map((option) => <button key={option.id} type="button" className="catalog-theme-chip" data-theme-filter={option.id} aria-pressed={appearance.themes.includes(option.id)} onClick={() => toggleChoice("themes", option.id)}>{t(`catalog.theme.${option.id}`)}</button>)}</div>
      </fieldset>
      <fieldset className="sidebar-filter-group sidebar-color-group">
        <legend>{t("catalog.colorLabel")}</legend>
        <div className="catalog-color-options">{catalogColorOptions.map((option) => {
          const selected = appearance.colors.includes(option.id);
          return <button key={option.id} type="button" className="catalog-color-choice" data-color-filter={option.id} aria-label={t(`catalog.color.${option.id}`)} title={t(`catalog.color.${option.id}`)} aria-pressed={selected} disabled={!selected && !availableColors.includes(option.id)} onClick={() => toggleChoice("colors", option.id)}><span className="catalog-color-swatch" style={{ backgroundColor: option.hex }} /><span className="catalog-color-check" aria-hidden="true">{selected ? "✓" : ""}</span></button>;
        })}</div>
      </fieldset>
    </> : null}
    {hasFilters ? <button type="button" className="collection-clear-filters" onClick={onReset}>{t("catalog.clearFilters")}</button> : null}
  </div>;
}
