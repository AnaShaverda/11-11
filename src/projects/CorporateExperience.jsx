import Icon from "../components/ui/Icon.jsx";
import { Link, useSearchParams, useNavigate, useLocation } from "react-router-dom";
import ExperienceSection from "./components/ExperienceSection.jsx";
import ExperienceCTA from "./components/ExperienceCTA.jsx";
import { useLanguage } from "../localization/LanguageContext.jsx";

const occasions = [0, 1, 2, 3, 4, 5];

export default function CorporateExperience({ embedded = false }) {
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { hash } = useLocation();
  const requestedOccasion = searchParams.get("corporateOccasion");
  const selectedOccasion = occasions.some((item) => String(item) === requestedOccasion) ? requestedOccasion : "all";
  const visibleOccasions = selectedOccasion === "all" ? occasions : occasions.filter((item) => String(item) === selectedOccasion);
  function selectOccasion(value) {
    const next = new URLSearchParams(searchParams);
    if (value === "all") next.delete("corporateOccasion");
    else next.set("corporateOccasion", value);
    navigate({ search: next.toString(), hash }, { preventScrollReset: true });
  }
  return (
    <div className={`experience-page corporate-experience${embedded ? " is-embedded" : ""}`}>
      {!embedded ? <>
      <Link className="experience-back" to="/invitations"><Icon name="arrow-left" size={18} /> {t("common.allEvents")}</Link>
      <section className="corporate-hero"><div><span className="section-label">{t("corporate.hero.label")}</span><h1>{t("corporate.hero.title")}</h1><p>{t("corporate.hero.description")}</p><Link className="primary-link" to="/invitations">{t("corporate.explore")} <Icon name="arrow-up-right" size={18} /></Link></div><div className="corporate-visual" aria-hidden="true"><span>11:11</span><strong>{t("corporate.art.title")}</strong><small>{t("corporate.art.caption")}</small></div></section>
      </> : null}
      <div className="invitation-style-filter" role="group" aria-label={t("catalog.corporateFilter")}>
        <span className="invitation-style-filter-label">{t("catalog.occasion")}</span>
        <div className="invitation-style-options">
          <button className={`style-filter-button${selectedOccasion === "all" ? " is-active" : ""}`} type="button" aria-pressed={selectedOccasion === "all"} onClick={() => selectOccasion("all")}>{t("catalog.allOccasions")}</button>
          {occasions.map((occasion) => <button className={`style-filter-button${selectedOccasion === String(occasion) ? " is-active" : ""}`} key={occasion} type="button" aria-pressed={selectedOccasion === String(occasion)} onClick={() => selectOccasion(String(occasion))}>{t(`corporate.occasion.${occasion}`)}</button>)}
        </div>
      </div>
      <ExperienceSection label={t("corporate.section.label")} title={t("corporate.section.title")} description={t("corporate.section.description")}><div className="corporate-occasions">{visibleOccasions.map((occasion) => <div key={occasion}><span>{String(occasion + 1).padStart(2, "0")}</span><strong>{t(`corporate.occasion.${occasion}`)}</strong><Icon name="arrow-up-right" size={18} /></div>)}</div></ExperienceSection>
      <div className="corporate-preview-note"><div><h2>{t("corporate.note.title")}</h2><p>{t("corporate.note.description")}</p></div></div>
      <ExperienceCTA title={t("corporate.cta.title")} text={t("corporate.cta.description")} to="/invitations" action={t("corporate.cta.action")} />
    </div>
  );
}
