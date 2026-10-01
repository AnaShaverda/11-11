import { useId, useState } from "react";
import { useLanguage } from "../../localization/LanguageContext.jsx";
import { accessMethods } from "../data/interactionDefinitions.js";

function MockQR() {
  const { t } = useLanguage();
  return <div className="interaction-mock-qr"><svg viewBox="0 0 100 100" width="76" height="76" aria-hidden="true"><rect width="100" height="100" fill="white" />{[[5, 5], [65, 5], [5, 65]].map(([x, y]) => <g key={`${x}-${y}`}><rect x={x} y={y} width="30" height="30" fill="#30264d" /><rect x={x + 5} y={y + 5} width="20" height="20" fill="white" /><rect x={x + 10} y={y + 10} width="10" height="10" fill="#30264d" /></g>)}<path d="M45 5h10v10H45zM45 25h10v25H45zM65 45h25v10H65zM45 65h10v25H45zM65 65h10v10H65zM85 75h10v20H85zM65 85h10v10H65z" fill="#30264d" /></svg><small>{t("interactions.mockQR")}</small></div>;
}

export default function InteractionAccessSettings({ access, onChange, path }) {
  const { t } = useLanguage();
  const id = useId();
  const [copyStatus, setCopyStatus] = useState("");
  const url = `${window.location.origin}${path}`;
  function toggle(method) {
    onChange({ ...access, methods: access.methods.includes(method) ? access.methods.filter((item) => item !== method) : [...access.methods, method] });
  }
  async function copy() {
    try { await navigator.clipboard.writeText(url); setCopyStatus("interactions.copied"); }
    catch { setCopyStatus("interactions.copyFailed"); }
  }
  function delivery(update) { onChange({ ...access, delivery: { ...access.delivery, ...update } }); }
  return <details className="interaction-access"><summary>{t("interactions.access")}<span>{access.methods.length ? access.methods.map((method) => t(`interactions.access.${method}`)).join(" + ") : t("interactions.none")}</span></summary><div className="interaction-access-body"><p className="event-muted">{t("interactions.accessNote")}</p><div className="interaction-access-methods">{accessMethods.map((method) => <label key={method}><input type="checkbox" checked={access.methods.includes(method)} onChange={() => toggle(method)} />{t(`interactions.access.${method}`)}</label>)}</div>{access.methods.includes("direct-link") ? <div className="interaction-share-link"><label><span className="sr-only">{t("interactions.access.direct-link")}</span><input readOnly value={url} onFocus={(event) => event.target.select()} /></label><button className="event-secondary-button" type="button" onClick={copy}>{t("interactions.copy")}</button><small>{t("interactions.linkNote")}</small>{copyStatus ? <small role="status">{t(copyStatus)}</small> : null}</div> : null}{access.methods.includes("guest-link") ? <p className="event-muted">{t("interactions.privateNote")}</p> : null}{access.methods.includes("qr-code") ? <MockQR /> : null}<fieldset className="interaction-delivery"><legend>{t("interactions.delivery")}</legend><div>{["now", "scheduled"].map((mode) => <label key={mode}><input type="radio" name={`delivery-${id}`} checked={access.delivery.mode === mode} onChange={() => delivery({ mode })} />{t(mode === "now" ? "interactions.now" : "interactions.schedule")}</label>)}</div>{access.delivery.mode === "scheduled" ? <div className="event-field-pair"><label>{t("interactions.date")}<input type="date" value={access.delivery.date} onChange={(event) => delivery({ date: event.target.value })} /></label><label>{t("interactions.time")}<input type="time" value={access.delivery.time} onChange={(event) => delivery({ time: event.target.value })} /></label><small>{access.delivery.timeZone}</small></div> : null}<small className="event-muted">{t("interactions.deliveryNote")}</small></fieldset></div></details>;
}
