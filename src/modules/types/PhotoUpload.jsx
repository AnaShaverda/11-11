import { useEffect, useId, useRef, useState } from "react";
import { useLanguage } from "../../localization/LanguageContext.jsx";

function PhotoTile({ item, onRemove, onCaption }) {
  const { t } = useLanguage();
  const [src, setSrc] = useState("");
  useEffect(() => { const url = URL.createObjectURL(item.file); setSrc(url); return () => URL.revokeObjectURL(url); }, [item.file]);
  return <figure className="interaction-photo-tile">{src ? <img src={src} alt={item.caption || item.file.name} /> : null}<button type="button" className="interaction-photo-remove" onClick={onRemove} aria-label={`${t("interactions.photos.remove")}: ${item.file.name}`}>×</button><label><span className="sr-only">{t("interactions.photos.caption")}</span><input maxLength={100} placeholder={t("interactions.photos.caption")} value={item.caption} onChange={(event) => onCaption(event.target.value)} /></label></figure>;
}

export function PhotoUploadEditor({ interaction, onChange }) {
  const { t } = useLanguage();
  return <><label>{t("interactions.prompt")}<textarea aria-label={t("interactions.prompt")} rows={2} maxLength={240} value={interaction.description} onChange={(event) => onChange({ description: event.target.value })} /></label><label>{t("interactions.maxFiles")}<select aria-label={t("interactions.maxFiles")} value={interaction.config.maxFiles} onChange={(event) => onChange({ config: { maxFiles: Number(event.target.value) } })}>{[1, 5, 10, 20].map((count) => <option key={count} value={count}>{count}</option>)}</select></label></>;
}

export default function PhotoUpload({ interaction }) {
  const { t } = useLanguage();
  const id = useId();
  const fileInput = useRef(null);
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(false);
  const maxFiles = interaction.config.maxFiles;
  function choose(event) {
    const incoming = Array.from(event.target.files);
    const valid = incoming.filter((file) => ["image/jpeg", "image/png", "image/webp", "image/gif"].includes(file.type) && file.size <= 8 * 1024 * 1024);
    setError(valid.length !== incoming.length || files.length + valid.length > maxFiles);
    setFiles((current) => [...current, ...valid.slice(0, Math.max(0, maxFiles - current.length)).map((file) => ({ id: crypto.randomUUID(), file, caption: "" }))]);
    event.target.value = "";
  }
  return <div className="interaction-photo-upload"><button type="button" className="interaction-dropzone" aria-describedby={id} onClick={() => fileInput.current.click()}><span aria-hidden="true">↗</span><strong>{t("interactions.photo-upload.action")}</strong><small id={id}>{t("interactions.photos.note", { count: maxFiles })}</small></button><input ref={fileInput} hidden aria-label={t("interactions.photo-upload.action")} type="file" accept="image/jpeg,image/png,image/webp,image/gif" multiple onChange={choose} />{error ? <p role="alert">{t("interactions.photos.error")}</p> : null}<div className="interaction-photo-grid">{files.map((item) => <PhotoTile key={item.id} item={item} onRemove={() => setFiles((current) => current.filter((file) => file.id !== item.id))} onCaption={(caption) => setFiles((current) => current.map((file) => file.id === item.id ? { ...file, caption } : file))} />)}</div>{files.length ? <p role="status" className="interaction-footnote">{t("interactions.photos.chosen", { count: files.length })}</p> : null}</div>;
}
