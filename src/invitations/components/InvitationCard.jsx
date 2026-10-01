import { Link } from "react-router-dom";
import { invitationSamples } from "../data/invitationSamples.js";
import BirthdayIllustrations from "./BirthdayIllustrations.jsx";
import { useLanguage } from "../../localization/LanguageContext.jsx";
import Icon from "../../components/ui/Icon.jsx";

export function InvitationArtwork({ template, large = false }) {
  const { t } = useLanguage();
  const sample = invitationSamples[template.slug];
  const { design } = template;
  const showGeneratedDecor = template.slug !== "birthday-coquette";
  return (
    <div
      className={`invitation-art invitation-preview-art theme-${template.visual} preview-${template.previewArt} preview-layout-${template.layout} preview-${template.category.toLowerCase()} design-pattern-${design.pattern}${template.visualAssets?.invitation.length ? " has-birthday-illustrations" : ""}${large ? " is-large" : ""}`}
      style={{ "--showcase-paper": design.palette[0], "--showcase-ink": design.palette[1], "--showcase-accent": design.palette[2], "--showcase-secondary": design.palette[3] }}
      aria-hidden="true"
    >
      <span className="invitation-preview-edge">11:11 {showGeneratedDecor && <span aria-hidden="true">✦</span>} {t(`common.${template.category.toLowerCase()}`)}</span>
      {showGeneratedDecor && <><span className="invitation-preview-shape shape-one" /><span className="invitation-preview-shape shape-two" /><span className="invitation-preview-graphic"><span>{design.motif}</span></span></>}
      <BirthdayIllustrations assets={template.visualAssets?.invitation} slot="invitation" eager={large} />
      {showGeneratedDecor && <><span className="invitation-preview-decor">{template.decor}</span><span className="invitation-preview-mark">{sample.mark}</span></>}
      <span className="invitation-preview-copy"><span>{t("invitations.invited")}</span><strong>{sample.title}</strong><em>{sample.line}</em></span>
      <span className="invitation-preview-foot"><span>{sample.date} · {sample.location}</span><span>{t("invitations.invites")}</span></span>
    </div>
  );
}

export default function InvitationCard({ template }) {
  const { t } = useLanguage();
  const sample = invitationSamples[template.slug];
  return (
    <Link className="invitation-card invitation-showcase-card" to={`/invitations/${template.slug}`} aria-label={`${t("common.exploreDesign")}: ${t(`themes.${template.id}.name`)}: ${sample.title}`}>
      <InvitationArtwork template={template} />
      <span className="invitation-card-bottom">
        <span><strong>{t(`themes.${template.id}.name`)}</strong><small>{t(`common.${template.category.toLowerCase()}`)} / {t(`themes.${template.id}.style`)}</small></span>
        <span className="invitation-card-action">{t("common.exploreDesign")} <Icon name="arrow-up-right" size={16} /></span>
      </span>
    </Link>
  );
}
