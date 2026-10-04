import { useLayoutEffect, useRef } from "react";
import { useLanguage } from "../../localization/LanguageContext.jsx";
import { matchEditableCardText, isExactCardText } from "../data/guestCardText.js";

// Keep each poster's typography and line breaks intact. Only existing text
// elements receive editing affordances; the original artwork remains React-owned.
export default function EditableInvitationArtwork({ fields, onEdit, children }) {
  const root = useRef(null);
  const targets = useRef(new Map());
  const { t } = useLanguage();

  useLayoutEffect(() => {
    if (!onEdit) return;
    const container = root.current;
    const found = new Map();
    const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      const node = walker.currentNode;
      const ignored = node.parentElement.closest('[aria-hidden="true"], svg, button, a');
      if (!node.textContent.trim() || (ignored && container.contains(ignored))) continue;
      let element = node.parentElement;
      let matches = [];
      for (let depth = 0; element && element !== container && depth < 4; depth++, element = element.parentElement) {
        const exact = fields.find(field => isExactCardText(element.textContent, field));
        matches = exact ? matchEditableCardText(element.textContent, fields) : [];
        if (matches.length) break;
      }
      if (!matches.length) {
        element = node.parentElement;
        matches = matchEditableCardText(element.textContent, fields, true);
      }
      if (matches.length && element !== container) found.set(element, matches);
    }
    for (const element of container.querySelectorAll('.heart-calendar-day, .day-calendar .selected-day')) {
      const date = fields.find(field => field.group === "fields" && field.key === "date");
      if (date) found.set(element, [date]);
    }
    // A complete heading may be split into words. Keep its single editing target.
    for (const [element, matches] of found) {
      if (matches.length !== 1 || !isExactCardText(element.textContent, matches[0])) continue;
      for (const child of found.keys()) if (child !== element && element.contains(child)) found.delete(child);
    }
    // Keep a compound row when it contains its own text (e.g. "Birthday edition"
    // and "turns 7" around a nested editable name). Removing that row leaves
    // those words without a target.
    for (const element of found.keys()) {
      const hasOwnText = [...element.childNodes].some(node => node.nodeType === Node.TEXT_NODE && node.textContent.trim());
      if (!hasOwnText && [...found.keys()].some(child => child !== element && element.contains(child))) found.delete(element);
    }
    const previous = new Map();
    for (const [element, matches] of found) {
      const label = matches.map(field => field.labelText ?? t(`guestCards.text.${field.label}`)).join(", ");
      const attributes = { "data-card-edit": matches.map(field => `${field.group}:${field.key}`).join(" "), role: "button", tabindex: "0", "aria-label": t("guestCards.text.tapLabel", { label }), title: t("guestCards.text.tapLabel", { label }) };
      previous.set(element, Object.fromEntries(Object.keys(attributes).map(key => [key, element.getAttribute(key)])));
      for (const [key, value] of Object.entries(attributes)) element.setAttribute(key, value);
    }
    targets.current = found;
    return () => {
      for (const [element, attributes] of previous) for (const [key, value] of Object.entries(attributes)) {
        if (value === null) element.removeAttribute(key); else element.setAttribute(key, value);
      }
      targets.current = new Map();
    };
  }, [fields, t, onEdit]);

  function activate(event) {
    const element = event.target.closest("[data-card-edit]");
    const selected = targets.current.get(element);
    if (!selected || !onEdit) return;
    event.preventDefault();
    onEdit(selected, element);
  }

  return <div className="guest-editable-artwork" ref={root} onClick={activate} onKeyDown={event => {
    if (event.key === "Enter" || event.key === " ") activate(event);
  }}>{children}</div>;
}
