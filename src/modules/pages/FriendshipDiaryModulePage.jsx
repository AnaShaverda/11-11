import Icon from "../../components/ui/Icon.jsx";
import { Link } from "react-router-dom";
import ThemeModulePreview from "../components/ThemeModulePreview.jsx";
import { themeDemoEvents } from "../../themes/data/demoEvents.js";
import ExperienceSection from "../../projects/components/ExperienceSection.jsx";
import QuestionCard from "../../projects/components/QuestionCard.jsx";
import ResponseCard from "../../projects/components/ResponseCard.jsx";
import { friendshipQuestions, friendshipResponses } from "../../projects/data/showcases.js";
import { useLanguage } from "../../localization/LanguageContext.jsx";

export default function FriendshipDiaryModulePage() {
  const { t } = useLanguage();
  return (
    <div className="experience-page friendship-module-page">
      <Link className="experience-back" to="/projects/birthday#optional-modules"><Icon name="arrow-left" size={18} /> {t("friendship.back")}</Link>
      <section className="friendship-module-hero"><span className="section-label">{t("friendship.hero.label")}</span><h1>{t("friendship.hero.title")}</h1><p>{t("friendship.hero.description")}</p><Link className="primary-link" to="/projects/birthday#themes">{t("friendship.hero.action")} <Icon name="arrow-up-right" size={18} /></Link></section>
      <ExperienceSection label={t("friendship.looks.label")} title={t("friendship.looks.title")} description={t("friendship.looks.description")}><div className="module-skins"><div className="theme-canvas theme-retro-disco"><ThemeModulePreview moduleId="friendship-diary" event={themeDemoEvents.birthday} /></div><div className="theme-canvas theme-coquette"><ThemeModulePreview moduleId="friendship-diary" event={themeDemoEvents.birthday} /></div></div></ExperienceSection>
      <ExperienceSection label={t("friendship.questions.label")} title={t("friendship.questions.title")} description={t("friendship.questions.description")}><div className="question-grid">{friendshipQuestions.map((prompt, index) => <QuestionCard key={prompt.number} prompt={{ ...prompt, title: t(`showcase.friendshipQuestions.${index}.title`), hint: t(`showcase.friendshipQuestions.${index}.detail`) }} />)}</div></ExperienceSection>
      <ExperienceSection label={t("friendship.responses.label")} title={t("friendship.responses.title")} description={t("friendship.responses.description")}><div className="response-grid friendship-responses">{friendshipResponses.map((response) => <ResponseCard key={response.name} response={response} />)}</div></ExperienceSection>
    </div>
  );
}
