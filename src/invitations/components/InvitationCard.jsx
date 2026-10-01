import { Link } from "react-router-dom";
import { invitationSamples } from "../data/invitationSamples.js";
import BirthdayIllustrations from "./BirthdayIllustrations.jsx";
import { useLanguage } from "../../localization/LanguageContext.jsx";
import Icon from "../../components/ui/Icon.jsx";
import PhotoInvitationPoster from "./PhotoInvitationPoster.jsx";
import ReferenceSocialPoster from "./ReferenceSocialPoster.jsx";
import FullImageInvitationPoster from "./FullImageInvitationPoster.jsx";
import { photoCardStyle } from "../data/assetPresentation.js";

function RetroPoster({ sample, invitedLabel }) {
  return (
    <div className="retro-poster">
      <span className="retro-poster-kicker">{invitedLabel}</span>
      <strong className="retro-poster-title"><span>{sample.posterName}</span><span>{sample.posterOccasion}</span></strong>
      <span className="retro-poster-sun" />
      <span className="retro-poster-burst" />
      <span className="retro-poster-age">{sample.posterAge}</span>
      <span className="retro-poster-stripes" />
      <span className="retro-poster-details"><span>{sample.date} · {sample.location}</span><span>{sample.line}</span></span>
    </div>
  );
}

export function InvitationArtwork({ template, large = false, sample: suppliedSample }) {
  const { t } = useLanguage();
  const sample = suppliedSample ?? invitationSamples[template.slug];
  const { design } = template;
  const photoCard = template.visualAssets?.photoCard;
  const coverImage = template.visualAssets?.coverImage;
  const showGeneratedDecor = !["birthday-coquette", "birthday-floral-affair", "birthday-beer-party"].includes(template.slug);
  return (
    <div
      className={`invitation-art invitation-preview-art theme-${template.visual} preview-${template.previewArt} preview-layout-${template.layout} preview-${template.category.toLowerCase()} design-pattern-${design.pattern}${!coverImage && template.visualAssets?.invitation?.length ? " has-birthday-illustrations" : ""}${photoCard ? " photo-invitation-art" : ""}${coverImage ? " full-image-cover" : ""}${large ? " is-large" : ""}`}
      style={{ "--showcase-paper": design.palette[0], "--showcase-ink": design.palette[1], "--showcase-accent": design.palette[2], "--showcase-secondary": design.palette[3], ...(coverImage ? { "--cover-image": `url("${coverImage}")` } : {}), ...photoCardStyle(photoCard) }}
      aria-hidden="true"
    >
      {coverImage && ["cobalt-cheers", "ribbon-social"].includes(template.visual) ? <ReferenceSocialPoster variant={template.visual} {...sample} /> : coverImage && template.slug === "birthday-pastel-dream" ? <div className="pastel-image-cover-copy">
        <span className="pastel-image-opening">{t("invitations.invited")}</span>
        <strong className="pastel-image-name">{sample.posterName}</strong>
        <span className="pastel-image-sweet">Sweet</span>
        <strong className="pastel-image-age">{sample.posterAge}</strong>
        <em>{sample.line}</em>
        <span className="pastel-image-details">{sample.date} · {sample.location}</span>
      </div> : coverImage && template.slug === "birthday-y2k-party" ? <div className="y2k-image-cover-copy">
        <span className="y2k-image-opening">{t("invitations.invited")}</span>
        <span className="y2k-image-host">{sample.posterName}</span>
        <strong className="y2k-image-title">Y2K</strong>
        <strong className="y2k-image-party">Party</strong>
        <em>{sample.line}</em>
        <span className="y2k-image-details">{sample.date} · {sample.location}</span>
      </div> : coverImage && template.slug === "birthday-retro-pop" ? <div className="retro-image-cover-copy">
        <span className="retro-image-opening">{t("invitations.invited")}</span>
        <strong className="retro-image-title"><span>{sample.posterName}</span><span>{sample.posterOccasion}</span></strong>
        <strong className="retro-image-age">{sample.posterAge}</strong>
        <em>{sample.line}</em>
        <span className="retro-image-details">{sample.date} · {sample.location}</span>
      </div> : coverImage ? <FullImageInvitationPoster variant={template.visual} title={sample.title} line={sample.line} date={sample.date} location={sample.location} /> : photoCard ? <PhotoInvitationPoster photoCard={photoCard} name={sample.name} age={sample.age} turns={t("modernToast.turns", { age: sample.age })} opening={t("modernToast.celebration")} closing={t("invitations.invited")} /> : template.slug === "birthday-retro-pop" ? <RetroPoster sample={sample} invitedLabel={t("invitations.invited")} /> : <>
      <span className="invitation-preview-edge">11:11 {showGeneratedDecor && <span aria-hidden="true">✦</span>} {t(`common.${template.category.toLowerCase()}`)}</span>
      {showGeneratedDecor && <><span className="invitation-preview-shape shape-one" /><span className="invitation-preview-shape shape-two" /><span className="invitation-preview-graphic"><span>{design.motif}</span></span></>}
      {showGeneratedDecor && <><span className="invitation-preview-decor">{template.decor}</span><span className="invitation-preview-mark">{sample.mark}</span></>}
      <span className="invitation-preview-copy"><span>{t("invitations.invited")}</span><strong>{sample.title}</strong><em>{sample.line}</em></span>
      <span className="invitation-preview-foot"><span>{sample.date} · {sample.location}</span><span>{t("invitations.invites")}</span></span>
      </>}
      {!coverImage && <BirthdayIllustrations assets={template.visualAssets?.invitation} slot="invitation" eager={large} />}
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
