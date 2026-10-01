import IntroControl from "../components/ui/IntroControl.jsx";
import ProjectGrid from "../components/ui/ProjectGrid.jsx";
import { projects } from "../data/projects.js";
import HomeSections from "../components/home/HomeSections.jsx";
import { useLanguage } from "../localization/LanguageContext.jsx";

export default function HomePage() {
  const { t } = useLanguage();
  return (
    <div className="home-page">
      <section className="home-hero" aria-label="11:11">
        <h1 className="hero-brand">11:11</h1>
        <p className="home-hero-message">{t("home.hero.message")}</p>
        <IntroControl />
      </section>
      <section
        id="projects"
        className="home-projects"
        aria-label={t("common.exploreEvents")}
      >
        <div className="home-grid-heading"><div><h2>{t("home.projects.title")}</h2><p>{t("home.projects.description")}</p></div><span>{t("home.projects.index")}</span></div>
        <ProjectGrid projects={projects} showDetails />
      </section>
      <HomeSections />
    </div>
  );
}
