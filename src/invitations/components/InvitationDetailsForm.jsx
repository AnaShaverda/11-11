import { useId } from 'react';
import { useLanguage } from '../../localization/LanguageContext.jsx';
import { getEditorFieldGroups, getEditorFieldHelp, toDateInputValue } from '../data/editorFields.js';

export function InvitationEditorField({ field, value, onChange, id, onInput, required = false }) {
  const { t, language } = useLanguage();
  const hintId = `${id}-hint`;
  const input = { id, value, maxLength: field.maxLength, required, 'aria-describedby': hintId,
    onChange: event => { event.target.setCustomValidity(''); onChange(event.target.value); onInput?.(event); },
    inputMode: ['age', 'posterAge'].includes(field.key) ? 'numeric' : undefined };
  return <div className="invitation-editor-field">
    <label htmlFor={id}>{field.labelText ?? t(`guestCards.text.${field.label}`)}</label>
    {field.multiline ? <textarea {...input} rows={3} /> : <input {...input} type={field.type ?? 'text'} />}
    {field.key === 'date' && <label className="invitation-date-picker">
      <span>{t('editor.datePicker')}</span>
      <input type="date" value={toDateInputValue(value)} aria-label={t('editor.datePicker')} onChange={event => {
        if (!event.target.value) return;
        const [year, month, day] = event.target.value.split('-').map(Number);
        onChange(new Intl.DateTimeFormat(language === 'ka' ? 'ka-GE' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(year, month - 1, day)));
      }} />
    </label>}
    <p id={hintId}>{getEditorFieldHelp(field, t)}
      {field.group === 'translations' && /\{\w+\}/.test(field.value) && <span className="invitation-token-hint">{t('guestCards.text.variableHint', { token: field.value.match(/\{\w+\}/)[0] })}</span>}
    </p>
    {field.multiline && <small className="invitation-character-count">{t('editor.chars', { count: value.length, max: field.maxLength })}</small>}
  </div>;
}

export default function InvitationDetailsForm({ fields, onChange, onViewCard }) {
  const { t } = useLanguage();
  const formId = useId();
  const groups = getEditorFieldGroups(fields);
  return <section className="invitation-details-form" aria-labelledby={`${formId}-title`}>
    <header><h2 id={`${formId}-title`}>{t('editor.detailsTitle')}</h2><p>{t('editor.detailsHint')}</p></header>
    <form onSubmit={event => event.preventDefault()}>
      {groups.map(group => {
        const content = group.fields.map(field => <InvitationEditorField key={`${field.group}:${field.key}`} field={field} value={field.value}
          id={`${formId}-${field.group}-${field.key}`} onChange={value => onChange([{ ...field, value }])} />);
        return group.extra ? <details className="invitation-extra-wording" key={group.title}><summary>{t(group.title)}</summary>{content}</details>
          : <fieldset key={group.title}><legend>{t(group.title)}</legend>{content}</fieldset>;
      })}
    </form>
    <footer><p>{t('editor.live')}</p><button className="invitation-editor-primary invitation-mobile-view" type="button" onClick={onViewCard}>{t('editor.viewCard')}</button></footer>
  </section>;
}
