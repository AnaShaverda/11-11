import { useEffect, useRef, useState } from "react";
import Icon from "../../components/ui/Icon.jsx";
import { useLanguage } from "../../localization/LanguageContext.jsx";
import { getCardTextFields, getCardExtraCopyFields, normalizeCardText } from "../data/guestCardText.js";

function TextDialog({ template, sample, edits, onSave, onClose }) {
  const { t } = useLanguage();
  const dialog = useRef(null);
  const fields = getCardTextFields(template, sample);
  const extra = getCardExtraCopyFields(template, sample);
  const [draft, setDraft] = useState(() => ({
    fields: Object.fromEntries(fields.map(field => [field.key, edits.fields[field.key] ?? field.value])),
    translations: Object.fromEntries(extra.map(field => [field.key, edits.translations[field.key] ?? t(field.key)])),
  }));
  useEffect(() => { if (!dialog.current.open) dialog.current.showModal(); }, []);

  function save(event) {
    event.preventDefault();
    const changes = {
      fields: Object.fromEntries(fields.filter(field => draft.fields[field.key] !== field.value).map(field => [field.key, draft.fields[field.key]])),
      translations: Object.fromEntries(extra.filter(field => draft.translations[field.key] !== t(field.key)).map(field => [field.key, draft.translations[field.key]])),
    };
    onSave(normalizeCardText(changes, template, sample));
    onClose();
  }

  function input(field, group) {
    const props = {
      id: `guest-text-${group}-${field.key}`, value: draft[group][field.key], maxLength: field.maxLength,
      onChange: event => setDraft(current => ({ ...current, [group]: { ...current[group], [field.key]: event.target.value } })),
    };
    return <label className={`guest-creator-field${field.multiline ? " is-wide" : ""}`} key={field.key} htmlFor={props.id}>
      {t(`guestCards.text.${field.label}`)}
      {field.multiline ? <textarea {...props} rows={2} /> : <input {...props} />}
      {group === "translations" && /\{\w+\}/.test(t(field.key)) && <small>{t("guestCards.text.variableHint", { token: t(field.key).match(/\{\w+\}/)[0] })}</small>}
    </label>;
  }

  return <dialog ref={dialog} className="guest-text-dialog" aria-labelledby="guest-text-editor-title" onClose={onClose}>
    <form onSubmit={save}>
      <header><h2 id="guest-text-editor-title">{t("guestCards.text.edit")}</h2><button type="button" className="guest-text-close" aria-label={t("guestCards.text.close")} onClick={onClose}><Icon name="close" /></button></header>
      <p>{t("guestCards.text.hint")}</p>
      <div className="guest-text-fields">{fields.map(field => input(field, "fields"))}</div>
      {extra.length > 0 && <><h3>{t("guestCards.text.wording")}</h3><div className="guest-text-fields">{extra.map(field => input(field, "translations"))}</div></>}
      <footer><button type="button" className="guest-plan-clear" onClick={() => { onSave({ fields: {}, translations: {} }); onClose(); }}>{t("guestCards.text.reset")}</button><button type="submit" className="guest-plan-save">{t("guestCards.text.save")}</button></footer>
    </form>
  </dialog>;
}

export default function InvitationTextEditor(props) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  return <div className="guest-text-settings"><button className="guest-opening-replay" type="button" onClick={() => setOpen(true)}><Icon name="pen" size={16} />{t("guestCards.text.edit")}</button>{open && <TextDialog {...props} onClose={() => setOpen(false)} />}</div>;
}
