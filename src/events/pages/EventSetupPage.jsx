import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useLanguage } from "../../localization/LanguageContext.jsx";
import { invitationTemplates } from "../../invitations/data/templates.js";
import { useEventDrafts } from "../EventDraftLayout.jsx";
import EventInvitation from "../components/EventInvitation.jsx";
import EventGuestExperience from "../components/EventGuestExperience.jsx";
import InteractionPicker from "../../modules/components/InteractionPicker.jsx";
import InteractionModuleRenderer from "../../modules/components/InteractionModuleRenderer.jsx";
import InteractionAccessSettings from "../../modules/components/InteractionAccessSettings.jsx";
import { interactionRegistry } from "../../modules/registry.js";
import { createInteraction, defaultAccess } from "../../modules/data/interactionDefinitions.js";

const steps = ["invitation", "interactions", "summary"];

function InteractionEditor({ event, interaction, access, onChange, onAccessChange }) {
  const { t } = useLanguage();
  const [expanded, setExpanded] = useState(false);
  const Editor = interactionRegistry[interaction.type].Editor;
  return <div className="event-editor-layout"><section className="event-panel event-module-editor" aria-label={`${t("interactions.configure")}: ${interaction.title}`}><div className="event-panel-heading"><span className="event-eyebrow">{t(`interactions.${interaction.type}.label`)}</span><h3>{t("interactions.configure")}</h3></div><div className="event-fields"><label>{t("interactions.title")}<input maxLength={100} value={interaction.title} onChange={(e) => onChange({ title: e.target.value })} /></label><Editor interaction={interaction} onChange={onChange} /></div><InteractionAccessSettings access={access} path={`/events/${event.id}/interactions/${interaction.id}`} onChange={onAccessChange} /></section><section className="event-live-preview"><span className="event-eyebrow">{t("interactions.live")}</span><InteractionModuleRenderer key={`${interaction.id}-${JSON.stringify(interaction.config)}`} event={event} interaction={interaction} expanded={expanded} onOpen={() => setExpanded(true)} onClose={() => setExpanded(false)} /></section></div>;
}

export default function EventSetupPage() {
  const { t } = useLanguage();
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();
  const { getDraft, updateDraft } = useEventDrafts();
  const template = invitationTemplates.find((item) => item.themeId === params.get("theme")) ?? invitationTemplates.find((item) => item.slug === "birthday-retro-pop");
  const eventId = `demo-${template.themeId}`;
  const draft = getDraft(eventId);
  const { event, access } = draft;
  const requestedStep = params.get("step");
  const step = steps.includes(requestedStep) ? requestedStep : "invitation";
  const enabled = event.interactions.filter((interaction) => interaction.enabled);
  const [selectedId, setSelectedId] = useState(null);
  const selected = enabled.find((interaction) => interaction.id === selectedId) ?? enabled[0];
  const [previewId, setPreviewId] = useState(null);
  const [notice, setNotice] = useState("");
  const invitationReady = Boolean(event.title.trim() && event.hostName.trim() && event.location.trim() && event.date && event.time);
  const quizReady = enabled.every((interaction) => !interactionRegistry[interaction.type].isReady || interactionRegistry[interaction.type].isReady(interaction));
  const activeAccess = [access.invitation, ...enabled.map((interaction) => access.interactions[interaction.id])];
  const deliveryReady = activeAccess.every((item) => item.delivery.mode !== "scheduled" || item.delivery.date && item.delivery.time && item.methods.length);

  function changeStep(next) {
    if (next === "summary" && (!quizReady || !deliveryReady)) { setNotice(quizReady ? "interactions.scheduleMissing" : "interactions.invalidQuiz"); return; }
    setNotice(""); setPreviewId(null);
    setParams({ theme: template.themeId, step: next });
  }
  function changeEvent(update) { updateDraft(eventId, (current) => ({ ...current, event: { ...current.event, ...update } })); }
  function changeInvitation(update) { updateDraft(eventId, (current) => ({ ...current, event: { ...current.event, invitation: { ...current.event.invitation, ...update } } })); }
  function toggle(type) {
    const existing = event.interactions.find((interaction) => interaction.type === type);
    const next = existing ? { ...existing, enabled: !existing.enabled } : createInteraction(type, t);
    updateDraft(eventId, (current) => ({ ...current, event: { ...current.event, interactions: existing ? current.event.interactions.map((interaction) => interaction.id === existing.id ? next : interaction) : [...current.event.interactions, next] }, access: { ...current.access, interactions: { ...current.access.interactions, [next.id]: current.access.interactions[next.id] ?? defaultAccess() } } }));
    if (next.enabled) setSelectedId(next.id);
    setNotice("");
  }
  function changeInteraction(update) { updateDraft(eventId, (current) => ({ ...current, event: { ...current.event, interactions: current.event.interactions.map((interaction) => interaction.id === selected.id ? { ...interaction, ...update } : interaction) } })); }
  function changeAccess(instanceId, next) { updateDraft(eventId, (current) => ({ ...current, access: instanceId ? { ...current.access, interactions: { ...current.access.interactions, [instanceId]: next } } : { ...current.access, invitation: next } })); }
  function skip() { changeEvent({ interactions: event.interactions.map((interaction) => ({ ...interaction, enabled: false })) }); setNotice(""); setParams({ theme: template.themeId, step: "summary" }); }

  const methods = [...new Set(activeAccess.flatMap((item) => item.methods))];
  return <div className="event-page event-setup-page"><div className="event-topline"><Link className="back-link" to={`/invitations/${template.slug}`}>← {t("common.design")}</Link><span>11:11 / {t(`themes.${template.themeId}.name`)}</span></div><header className="event-setup-heading"><h1>{t(step === "invitation" ? "interactions.customize" : step === "interactions" ? "interactions.add" : "interactions.summary")}</h1><p>{t("interactions.prototype")}</p></header><nav className="event-steps" aria-label={t("interactions.setup")}>{steps.map((item, index) => <button type="button" key={item} aria-current={step === item ? "step" : undefined} className={step === item ? "is-active" : ""} disabled={item !== "invitation" && !invitationReady} onClick={() => changeStep(item)}><span>{index + 1}</span>{t(`interactions.step.${item}`)}</button>)}</nav>
    {step === "invitation" ? <form onSubmit={(e) => { e.preventDefault(); changeStep("interactions"); }}><div className="event-editor-layout"><section className="event-panel"><div className="event-panel-heading"><span className="event-eyebrow">{t(`themes.${template.themeId}.name`)}</span><Link className="event-text-link" to="/invitations">{t("interactions.changeDesign")}</Link></div><div className="event-fields"><label>{t("interactions.eventTitle")}<input required maxLength={100} value={event.title} onChange={(e) => changeEvent({ title: e.target.value })} /></label><div className="event-field-pair"><label>{t("interactions.hostName")}<input required maxLength={60} value={event.hostName} onChange={(e) => changeEvent({ hostName: e.target.value })} /></label>{event.category === "birthday" ? <label>{t("interactions.age")}<input type="number" min={1} max={120} value={event.age} onChange={(e) => changeEvent({ age: e.target.value })} /></label> : null}</div><div className="event-field-pair"><label>{t("interactions.date")}<input required type="date" value={event.date} onChange={(e) => changeEvent({ date: e.target.value })} /></label><label>{t("interactions.time")}<input required type="time" value={event.time} onChange={(e) => changeEvent({ time: e.target.value })} /></label></div><label>{t("interactions.location")}<input required maxLength={100} value={event.location} onChange={(e) => changeEvent({ location: e.target.value })} /></label><label>{t("interactions.message")}<textarea aria-label={t("interactions.message")} rows={2} maxLength={240} value={event.invitation.message} onChange={(e) => changeInvitation({ message: e.target.value })} /></label></div><InteractionAccessSettings access={access.invitation} path={`/events/${event.id}`} onChange={(next) => changeAccess(null, next)} /></section><section className="event-live-preview"><span className="event-eyebrow">{t("interactions.live")}</span><EventInvitation event={event} /></section></div><div className="event-footer-actions"><button className="event-primary-button" disabled={!invitationReady} type="submit">{t("interactions.continue")} <span aria-hidden="true">↗</span></button></div></form> : null}
    {step === "interactions" ? <><InteractionPicker interactions={event.interactions} onToggle={toggle} onSkip={skip} />{enabled.length ? <><div className="event-selected-interactions"><span className="event-eyebrow">{t("interactions.selected")}</span><div role="group" aria-label={t("interactions.selected")}>{enabled.map((interaction) => <button type="button" key={interaction.id} aria-pressed={selected.id === interaction.id} className={selected.id === interaction.id ? "is-active" : ""} onClick={() => setSelectedId(interaction.id)}>{interaction.title || t(`interactions.${interaction.type}.label`)}</button>)}</div></div><InteractionEditor key={selected.id} event={event} interaction={selected} access={access.interactions[selected.id]} onChange={changeInteraction} onAccessChange={(next) => changeAccess(selected.id, next)} /></> : null}<div className="event-footer-actions"><button className="event-text-button" type="button" onClick={() => changeStep("invitation")}>← {t("interactions.back")}</button><button className="event-primary-button" type="button" onClick={() => changeStep("summary")}>{t("interactions.previewEvent")} <span aria-hidden="true">↗</span></button></div></> : null}
    {step === "summary" ? <><section className="event-panel event-summary"><h2>{event.title}</h2><div className="event-summary-grid"><div><h3>{t("interactions.step.invitation")}</h3><p>✓ {t("interactions.ready")}</p><small>{t(`themes.${template.themeId}.name`)}</small></div><div><h3>{t("interactions.selected")}</h3>{enabled.length ? enabled.map((interaction) => <p key={interaction.id}>✓ {interaction.title || t(`interactions.${interaction.type}.label`)}</p>) : <p>{t("interactions.none")}</p>}</div><div><h3>{t("interactions.guestAccess")}</h3><p>{methods.length ? methods.map((method) => t(`interactions.access.${method}`)).join(" + ") : t("interactions.noMethods")}</p>{activeAccess.some((item) => item.delivery.mode === "scheduled") ? <small>{t("interactions.schedule")} · {activeAccess.filter((item) => item.delivery.mode === "scheduled").map((item) => `${item.delivery.date} ${item.delivery.time}`).join(" / ")} · {event.timeZone}</small> : null}</div></div><div className="event-summary-actions"><button className="event-primary-button" type="button" disabled={!invitationReady || !quizReady || !deliveryReady} onClick={() => navigate(`/events/${event.id}`)}>{t("interactions.done")} <span aria-hidden="true">↗</span></button></div><p className="event-muted">{t("interactions.publishNote")}</p></section><section className="event-summary-preview"><span className="event-eyebrow">{t("interactions.guestDemo")}</span><EventGuestExperience event={event} activeId={previewId} onOpen={setPreviewId} onClose={() => setPreviewId(null)} /></section></> : null}
    {notice ? <p className="event-notice" role="alert">{t(notice)}</p> : null}
  </div>;
}
