import { Link } from "react-router-dom";
import Icon from "../components/ui/Icon.jsx";
import ExperienceSection from "./components/ExperienceSection.jsx";
import ExperienceCTA from "./components/ExperienceCTA.jsx";
import ResponseCard from "./components/ResponseCard.jsx";
import QuestionCard from "./components/QuestionCard.jsx";
import { birthdayWishes, birthdayPrompts, birthdayGames } from "./data/showcases.js";
import ThemeModulePreview from "../modules/components/ThemeModulePreview.jsx";
import { themeDemoEvents } from "../themes/data/demoEvents.js";
import { useLanguage } from "../localization/LanguageContext.jsx";

export default function BirthdayExperience() {
  const { t } = useLanguage();
  return (
    <div className="experience-page birthday-experience">
      <ExperienceSection id="optional-modules" label={t("birthday.modules.label")} title={t("birthday.modules.title")} description={t("birthday.modules.description")}>
        <div className="birthday-module-demo"><div className="theme-canvas theme-retro-disco"><ThemeModulePreview moduleId="friendship-diary" event={themeDemoEvents.birthday} /></div><div className="theme-canvas theme-coquette"><ThemeModulePreview moduleId="friendship-diary" event={themeDemoEvents.birthday} /></div></div>
        <p className="module-demo-caption">{t("birthday.modules.caption")} <Link id="friendship-diary-preview" to="/modules/friendship-diary">{t("birthday.modules.link")} <Icon name="arrow-up-right" size={18} /></Link></p>
      </ExperienceSection>
      <ExperienceSection label={t("birthday.wishes.label")} title={t("birthday.wishes.title")} description={t("birthday.wishes.description")}>
        <div className="response-grid">{birthdayWishes.map((wish) => <ResponseCard key={wish.name} response={wish} />)}</div>
      </ExperienceSection>
      <ExperienceSection label={t("birthday.stories.label")} title={t("birthday.stories.title")} description={t("birthday.stories.description")}>
        <div className="question-grid">{birthdayPrompts.map((prompt, index) => <QuestionCard key={prompt.number} prompt={{ ...prompt, title: t(`showcase.birthdayPrompts.${index}.title`), hint: t(`showcase.birthdayPrompts.${index}.detail`) }} />)}</div>
      </ExperienceSection>
      <ExperienceSection label={t("birthday.gallery.label")} title={t("birthday.gallery.title")} description={t("birthday.gallery.description")}>
        <div className="memory-mosaic" aria-label={t("birthday.gallery.aria")}><div className="memory-tile tile-one"><span>{t("birthday.gallery.goodTimes")}</span></div><div className="memory-tile tile-two"></div><div className="memory-tile tile-three"><span>{t("birthday.gallery.ourPeople")}</span></div><div className="memory-tile tile-four"><span>11:11</span></div></div>
      </ExperienceSection>
      <ExperienceSection label={t("birthday.games.label")} title={t("birthday.games.title")} description={t("birthday.games.description")}>
        <div className="game-grid">{birthdayGames.map((game, index) => <article className="game-card" key={game.title}><span aria-hidden="true"><Icon name={game.icon} size={32} /></span><h3>{t(`showcase.birthdayGames.${index}.title`)}</h3><p>{t(`showcase.birthdayGames.${index}.detail`)}</p><small>{t("common.preview")}</small></article>)}</div>
      </ExperienceSection>
      <ExperienceCTA className="birthday-final" title={t("birthday.cta.title")} text={t("birthday.cta.text")} to="/projects/birthday#collection-birthday" action={t("birthday.exploreInvitations")} />
    </div>
  );
}
