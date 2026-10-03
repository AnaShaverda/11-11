import { getCategoryCaptionKey } from "../../data/projects.js";
import Icon from "../../components/ui/Icon.jsx";
import { Link, useParams } from "react-router-dom";
import { getInvitationTemplate } from "../data/templates.js";
import { getInvitationSample } from "../../localization/cardCopy.js";
import { InvitationArtwork } from "../components/InvitationCard.jsx";
import InvitationMoodBoards, { ElementsBoard } from "../components/InvitationMoodBoards.jsx";
import { useLanguage } from "../../localization/LanguageContext.jsx";

export default function InvitationPreviewPage() {
  const { t } = useLanguage();
  const { slug } = useParams();
  const template = getInvitationTemplate(slug);

  if (!template) return (
    <section className="inner-page copy-page">
      <h1>{t("invitations.notFound.title")}</h1>
      <p>{t("invitations.notFound.description")}</p>
      <Link className="text-link" to="/invitations">{t("invitations.allInvitations")} <Icon name="arrow-up-right" size={18} /></Link>
    </section>
  );

  const sample = getInvitationSample(template.slug, t);
  const { design } = template;
  const paletteVars = { "--showcase-paper": design.palette[0], "--showcase-ink": design.palette[1], "--showcase-accent": design.palette[2], "--showcase-secondary": design.palette[3] };

  return (
    <section className={`invitation-preview-page invitation-design-page design-theme-${template.visual} design-type-${design.type} design-pattern-${design.pattern}${template.category === "Birthday" ? " birthday-design-page" : ""}`} style={paletteVars}>
      <div className="preview-topline"><span>11:11 / {t("invitations.showcase")}</span></div>
      <div className="design-hero">
        <div className="design-hero-art"><InvitationArtwork template={template} large /></div>
        <div className="design-hero-copy">
          <div className="design-hero-summary"><span className="preview-category">{t(getCategoryCaptionKey(template.category, template.subcategory))} {t("common.invitation")} · {t(`themes.${template.id}.style`)}</span><h1>{t(`themes.${template.id}.name`)}</h1><p>{t(`themes.${template.id}.description`)}</p><Link className="invitation-open-action" to={`/invitations/${template.slug}/open`}>{t("invitationOpening.action")} <Icon name="arrow-up-right" size={16} /></Link></div>
          <ElementsBoard template={template} sample={sample} />
        </div>
      </div>
      <InvitationMoodBoards template={template} sample={sample} />
      <div className="design-guest-preview-link"><div><h2>{t("guestCards.suite.title")}</h2><p>{t("guestCards.suite.description")}</p></div><Link className="invitation-open-action" to={`/invitations/${template.slug}/open`}>{t("guestCards.suite.action")} <Icon name="arrow-up-right" size={18} /></Link></div>
      {!(template.visualAssets?.standaloneCard || template.visualAssets?.cardOnlyBridal || template.visualAssets?.isolatedBridalCard) && <div className="design-page-end"><div><span>{t("product.demo.label")}</span><h2>{t("product.demo.title")}</h2><p>{t("product.demo.description")}</p></div><Link className="primary-link" to={`/experiences/${template.themeId}/demo`}>{t("product.demo.action")} <Icon name="arrow-up-right" size={18} /></Link></div>}
      <div className="design-page-end"><div><span>{t("invitations.end.label")}</span><h2>{t("invitations.end.title")}</h2></div><Link className="primary-link" to="/invitations">{t("invitations.end.action")} <Icon name="arrow-up-right" size={18} /></Link></div>
    </section>
  );
}
