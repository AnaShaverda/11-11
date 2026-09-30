import { Link } from "react-router-dom";
import { invitationSamples } from "../data/invitationSamples.js";
import BirthdayIllustrations from "./BirthdayIllustrations.jsx";

export function InvitationArtwork({ template, large = false }) {
  const sample = invitationSamples[template.slug];
  const { design } = template;
  const showGeneratedDecor = template.slug !== "birthday-coquette";
  return (
    <div
      className={`invitation-art invitation-preview-art theme-${template.visual} preview-${template.previewArt} preview-layout-${template.layout} preview-${template.category.toLowerCase()} design-pattern-${design.pattern}${template.visualAssets?.invitation.length ? " has-birthday-illustrations" : ""}${large ? " is-large" : ""}`}
      style={{ "--showcase-paper": design.palette[0], "--showcase-ink": design.palette[1], "--showcase-accent": design.palette[2], "--showcase-secondary": design.palette[3] }}
      aria-hidden="true"
    >
      <span className="invitation-preview-edge">11:11 {showGeneratedDecor && <span aria-hidden="true">✦</span>} {template.category.toUpperCase()}</span>
      {showGeneratedDecor && <><span className="invitation-preview-shape shape-one" /><span className="invitation-preview-shape shape-two" /><span className="invitation-preview-graphic"><span>{design.motif}</span></span></>}
      <BirthdayIllustrations assets={template.visualAssets?.invitation} slot="invitation" eager={large} />
      {showGeneratedDecor && <><span className="invitation-preview-decor">{template.decor}</span><span className="invitation-preview-mark">{sample.mark}</span></>}
      <span className="invitation-preview-copy"><span>YOU’RE INVITED</span><strong>{sample.title}</strong><em>{sample.line}</em></span>
      <span className="invitation-preview-foot"><span>{sample.date} · {sample.location}</span><span>11:11 INVITES</span></span>
    </div>
  );
}

export default function InvitationCard({ template }) {
  const sample = invitationSamples[template.slug];
  return (
    <Link className="invitation-card invitation-showcase-card" to={`/invitations/${template.slug}`} aria-label={`Explore ${template.title} design: ${sample.title}`}>
      <InvitationArtwork template={template} />
      <span className="invitation-card-bottom">
        <span><strong>{template.title}</strong><small>{template.category} / {template.style}</small></span>
        <span className="invitation-card-action">Explore design ↗</span>
      </span>
    </Link>
  );
}
