import { useEffect, useState } from "react";
import InvitationArtwork from "./InvitationArtwork.jsx";
import { useLanguage } from "../../localization/LanguageContext.jsx";
import { getDayPlanErrors, normalizeGuestDayPlan, MAX_DAY_PLAN_ITEMS, MAX_DAY_PLAN_TITLE, MAX_DAY_PLAN_DETAILS } from "../data/guestDayPlan.js";

const draftItem = (item = {}) => ({ time: "", title: "", details: "", ...item,
  id: globalThis.crypto?.randomUUID?.() ?? `plan-${Date.now()}-${Math.random().toString(36).slice(2)}` });
const makeDraft = items => items.length ? items.map(draftItem) : [draftItem()];

export default function GuestDayPlanEditor({ dayPlan, onSave, embedded = false }) {
  const { t } = useLanguage();
  const [draft, setDraft] = useState(() => makeDraft(dayPlan));
  const [invalidIds, setInvalidIds] = useState([]);
  const [saved, setSaved] = useState(false);
  useEffect(() => { setDraft(makeDraft(dayPlan)); setInvalidIds([]); }, [dayPlan]);

  function update(id, patch) {
    setDraft(items => items.map(item => item.id === id ? { ...item, ...patch } : item));
    setInvalidIds(ids => ids.filter(value => value !== id));
    setSaved(false);
  }

  function move(index, direction) {
    setDraft(items => {
      const next = [...items];
      [next[index], next[index + direction]] = [next[index + direction], next[index]];
      return next;
    });
    setSaved(false);
  }

  function remove(id) {
    setDraft(items => items.length === 1 ? [draftItem()] : items.filter(item => item.id !== id));
    setInvalidIds(ids => ids.filter(value => value !== id));
    setSaved(false);
  }

  function save(event) {
    event.preventDefault();
    const errors = getDayPlanErrors(draft);
    if (errors.length) {
      setInvalidIds(errors.map(index => draft[index].id));
      const item = draft[errors[0]];
      event.currentTarget.elements.namedItem(`plan-${item.time ? "title" : "time"}-${item.id}`).focus();
      return;
    }
    const next = normalizeGuestDayPlan(draft);
    onSave(next);
    setDraft(makeDraft(next));
    setInvalidIds([]);
    setSaved(true);
  }

  function clear() {
    onSave([]);
    setDraft([draftItem()]);
    setInvalidIds([]);
    setSaved(true);
  }

  const Container = embedded ? "div" : "details";
  return <Container className={`guest-plan-settings${embedded ? " is-embedded" : ""}`}>
    {!embedded && <summary>{t("guestCards.plan.title")}<InvitationArtwork name="chevron-down" size={14} /></summary>}
    <p className="guest-plan-hint">{t("guestCards.plan.hint")}</p>
    <form onSubmit={save} noValidate>
      <ol className="guest-plan-draft">{draft.map((item, index) => {
        const invalid = invalidIds.includes(item.id);
        const errorId = `plan-error-${item.id}`;
        return <li key={item.id}>
          <div className="guest-plan-draft-heading">
            <span>{t("guestCards.plan.moment", { count: index + 1 })}</span>
            <div>
              <button type="button" disabled={index === 0} onClick={() => move(index, -1)} aria-label={t("guestCards.plan.moveUp", { count: index + 1 })}><InvitationArtwork name="chevron-down" className="guest-plan-up" size={14} /></button>
              <button type="button" disabled={index === draft.length - 1} onClick={() => move(index, 1)} aria-label={t("guestCards.plan.moveDown", { count: index + 1 })}><InvitationArtwork name="chevron-down" size={14} /></button>
              <button type="button" onClick={() => remove(item.id)} aria-label={t("guestCards.plan.remove", { count: index + 1 })}><InvitationArtwork name="close" size={14} /></button>
            </div>
          </div>
          <label htmlFor={`plan-time-${item.id}`}>{t("guestCards.plan.time")}</label>
          <input type="time" id={`plan-time-${item.id}`} name={`plan-time-${item.id}`} value={item.time} required
            aria-invalid={invalid && !item.time ? "true" : undefined} aria-describedby={invalid ? errorId : undefined}
            onInput={event => update(item.id, { time: event.currentTarget.value })} />
          <label htmlFor={`plan-title-${item.id}`}>{t("guestCards.plan.activity")}</label>
          <input id={`plan-title-${item.id}`} name={`plan-title-${item.id}`} value={item.title} required maxLength={MAX_DAY_PLAN_TITLE}
            aria-invalid={invalid && !item.title.trim() ? "true" : undefined} aria-describedby={invalid ? errorId : undefined}
            onChange={event => update(item.id, { title: event.target.value })} />
          <label htmlFor={`plan-details-${item.id}`}>{t("guestCards.plan.details")}</label>
          <textarea id={`plan-details-${item.id}`} value={item.details} rows={2} maxLength={MAX_DAY_PLAN_DETAILS}
            onChange={event => update(item.id, { details: event.target.value })} />
          {invalid && <p id={errorId} className="guest-plan-error" role="alert">{t("guestCards.plan.error")}</p>}
        </li>;
      })}</ol>
      <button className="guest-plan-add" type="button" disabled={draft.length >= MAX_DAY_PLAN_ITEMS} onClick={() => { setDraft(items => [...items, draftItem()]); setSaved(false); }}>{t("guestCards.plan.add")}</button>
      <div className="guest-plan-actions">
        <button className="guest-plan-save" type="submit">{t("guestCards.plan.save")}</button>
        {dayPlan.length > 0 && <button className="guest-plan-clear" type="button" onClick={clear}>{t("guestCards.plan.clear")}</button>}
      </div>
      {saved && <p className="guest-plan-status" role="status">{t(dayPlan.length ? "guestCards.plan.saved" : "guestCards.plan.hidden")}</p>}
    </form>
  </Container>;
}
