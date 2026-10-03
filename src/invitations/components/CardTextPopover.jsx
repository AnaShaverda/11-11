import { useLayoutEffect, useRef, useState } from "react";
import Icon from "../../components/ui/Icon.jsx";
import { useLanguage } from "../../localization/LanguageContext.jsx";

export default function CardTextPopover({ target, onSave, onClose }) {
  const { t } = useLanguage();
  const dialog = useRef(null);
  const [draft, setDraft] = useState(() => target.fields.map(field => field.value));

  useLayoutEffect(() => {
    const element = dialog.current;
    element.showModal();
    function place() {
      const viewport = window.visualViewport;
      const width = viewport?.width ?? window.innerWidth;
      const height = viewport?.height ?? window.innerHeight;
      const offset = viewport?.offsetTop ?? 0;
      const rect = target.element.getBoundingClientRect();
      const box = element.getBoundingClientRect();
      const gutter = 12;
      const below = rect.bottom + 12;
      const preferredTop = below + box.height <= height + offset - gutter ? below : rect.top - box.height - 12;
      element.style.left = `${Math.max(gutter, Math.min(rect.left + rect.width / 2 - box.width / 2, width - box.width - gutter))}px`;
      element.style.top = `${Math.max(offset + gutter, Math.min(preferredTop, height + offset - box.height - gutter))}px`;
      element.style.maxHeight = `${height - gutter * 2}px`;
    }
    place();
    element.querySelector("input, textarea")?.focus({ preventScroll: true });
    window.addEventListener("resize", place);
    window.visualViewport?.addEventListener("resize", place);
    window.visualViewport?.addEventListener("scroll", place);
    return () => {
      window.removeEventListener("resize", place);
      window.visualViewport?.removeEventListener("resize", place);
      window.visualViewport?.removeEventListener("scroll", place);
      if (element.open) element.close();
      if (target.element.isConnected) target.element.focus({ preventScroll: true });
    };
  }, [target]);

  return <dialog ref={dialog} className="guest-inline-editor" aria-labelledby="guest-inline-title" onCancel={event => { event.preventDefault(); onClose(); }}>
    <form onSubmit={event => {
      event.preventDefault();
      const emptyRequired = target.fields.findIndex((field, index) => field.required && !draft[index].trim());
      if (emptyRequired !== -1) {
        const input = event.currentTarget.querySelector(`#guest-inline-${emptyRequired}`);
        input.setCustomValidity(t("guestCards.plan.error")); input.reportValidity(); return;
      }
      onSave(target.fields.map((field, index) => ({ ...field, value: draft[index] }))); onClose();
    }}>
      <header><h2 id="guest-inline-title">{t("guestCards.text.inlineTitle")}</h2><button className="guest-text-close" type="button" aria-label={t("guestCards.text.close")} onClick={onClose}><Icon name="close" size={18} /></button></header>
      {target.fields.map((field, index) => {
        const props = { id: `guest-inline-${index}`, value: draft[index], maxLength: field.maxLength,
          required: field.required, type: field.type ?? "text",
          onInput: event => { event.target.setCustomValidity(""); setDraft(values => values.map((value, position) => position === index ? event.target.value : value)); } };
        return <label className="guest-creator-field" key={`${field.group}:${field.key}`} htmlFor={props.id}>
          {field.labelText ?? t(`guestCards.text.${field.label}`)}
          {field.multiline ? <textarea {...props} rows={3} /> : <input {...props} />}
          {field.group === "translations" && /\{\w+\}/.test(field.value) && <small>{t("guestCards.text.variableHint", { token: field.value.match(/\{\w+\}/)[0] })}</small>}
        </label>;
      })}
      <footer><button className="guest-plan-clear" type="button" onClick={onClose}>{t("guestCards.text.cancel")}</button><button className="guest-plan-save" type="submit">{t("guestCards.text.inlineSave")}</button></footer>
    </form>
  </dialog>;
}
