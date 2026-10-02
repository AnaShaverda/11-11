import { Link, useParams, useSearchParams } from "react-router-dom";
import { useLayoutEffect } from "react";
import { InvitationArtwork } from "../components/InvitationCard.jsx";
import { getInvitationTemplate } from "../data/templates.js";
import { invitationSamples } from "../data/invitationSamples.js";
import { useLanguage } from "../../localization/LanguageContext.jsx";
import ScrollManager from "../../components/layout/ScrollManager.jsx";
import { recipientArtwork } from "../data/recipientArtwork.js";

export default function InvitationOpeningPage() {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const template = getInvitationTemplate(slug);
  const hasPortrait = !template?.visualAssets?.coverImage || Boolean(recipientArtwork[slug]);
  const original = searchParams.get("format") === "original" || !hasPortrait;
  const { t, language, setLanguage } = useLanguage();

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [original]);

  if (!template) return <main className="inner-page copy-page"><h1>{t("invitations.notFound.title")}</h1><Link to="/invitations">{t("invitations.allInvitations")}</Link></main>;

  const sample = invitationSamples[template.slug];
  const palette = template.design.palette;
  return <main className="invitation-opening" style={{ "--invitation-paper": palette[0], "--invitation-ink": palette[1], "--invitation-accent": palette[2] }} aria-label={sample.title}>
    <ScrollManager />
    <div className="invitation-opening-stage">
      <div className={`invitation-opening-frame${original ? " is-original" : ""}`}>
        <InvitationArtwork template={template} large presentation={original ? "square" : "portrait"} ariaLabel={sample.title} />
      </div>
    </div>
    <nav className="invitation-opening-formats" aria-label={t("invitationOpening.format")}>
      <Link to="?format=original" aria-current={original ? "page" : undefined}>{t("invitationOpening.original")}</Link>
      {hasPortrait && <Link to="?format=portrait" aria-current={!original ? "page" : undefined}>{t("invitationOpening.portrait")}</Link>}
    </nav>
    <nav className="invitation-opening-controls" aria-label={t("invitationOpening.controls")}>
      <Link to={`/invitations/${template.slug}`}>{t("invitationOpening.back")}</Link>
      <button type="button" onClick={() => setLanguage(language === "ka" ? "en" : "ka")} aria-label={language === "ka" ? "English" : "ქართული"}>{language === "ka" ? "EN" : "KA"}</button>
    </nav>
  </main>;
}
