import Icon from "../../components/ui/Icon.jsx";
import { Link, useParams } from "react-router-dom";
import { getInvitationTemplate } from "../data/templates.js";
import { invitationSamples } from "../data/invitationSamples.js";
import { InvitationArtwork } from "../components/InvitationCard.jsx";
import InvitationMoodBoards from "../components/InvitationMoodBoards.jsx";
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

  const sample = invitationSamples[template.slug];
  const { design } = template;
  const paletteVars = { "--showcase-paper": design.palette[0], "--showcase-ink": design.palette[1], "--showcase-accent": design.palette[2], "--showcase-secondary": design.palette[3] };

  return (
    <section className={`invitation-preview-page invitation-design-page design-type-${design.type} design-pattern-${design.pattern}${template.category === "Birthday" ? " birthday-design-page" : ""}`} style={paletteVars}>
      <div className="preview-topline"><Link className="back-link" to={`/invitations?type=${template.category}`}><Icon name="arrow-left" size={18} /> {t(`invitations.${template.category.toLowerCase()}.title`)}</Link><span>11:11 / {t("invitations.showcase")}</span></div>
      <div className="design-hero">
        <div className="design-hero-art"><InvitationArtwork template={template} large /></div>
        <div className="design-hero-copy"><span className="preview-category">{t(`common.${template.category.toLowerCase()}`)} {t("common.invitation")} · {t(`themes.${template.id}.style`)}</span><h1>{t(`themes.${template.id}.name`)}</h1><p>{t(`themes.${template.id}.description`)}</p><div className="design-hero-rule" /><div className="design-hero-sample"><span>{t("invitations.sample")}</span><strong>{sample.title}</strong><small>{sample.date} · {sample.location}</small></div><p className="design-hero-explainer">{t("invitations.explainer")}</p><div className="design-hero-palette" aria-label={t("invitations.colors")}>{design.palette.map((color) => <span key={color} style={{ backgroundColor: color }} />)}</div></div>
      </div>
      <div className="design-page-end"><div><span>{t("product.demo.label")}</span><h2>{t("product.demo.title")}</h2><p>{t("product.demo.description")}</p></div><Link className="primary-link" to={`/experiences/${template.themeId}/demo`}>{t("product.demo.action")} <Icon name="arrow-up-right" size={18} /></Link></div>
      <InvitationMoodBoards template={template} sample={sample} />
      <div className="design-page-end"><div><span>{t("invitations.end.label")}</span><h2>{t("invitations.end.title")}</h2></div><Link className="primary-link" to="/invitations">{t("invitations.end.action")} <Icon name="arrow-up-right" size={18} /></Link></div>
    </section>
  );
}
