import { Link } from "react-router-dom";
import ThemeModulePreview from "../components/ThemeModulePreview.jsx";
import { themeDemoEvents } from "../../themes/data/demoEvents.js";
import ExperienceSection from "../../projects/components/ExperienceSection.jsx";
import QuestionCard from "../../projects/components/QuestionCard.jsx";
import ResponseCard from "../../projects/components/ResponseCard.jsx";
import { friendshipQuestions, friendshipResponses } from "../../projects/data/showcases.js";

export default function FriendshipDiaryModulePage() {
  return (
    <div className="experience-page friendship-module-page">
      <Link className="experience-back" to="/projects/birthday#optional-modules">← Birthday modules</Link>
      <section className="friendship-module-hero"><span className="section-label">OPTIONAL EVENT MODULE / 11:11</span><h1>Friendship Diary, made for your moment.</h1><p>Ask the questions only your people could answer. Add the diary to a Birthday event and let its look follow the design you choose.</p><Link className="primary-link" to="/projects/birthday#themes">Explore Birthday themes <span aria-hidden="true">↗</span></Link></section>
      <ExperienceSection label="ONE FEATURE, MANY LOOKS" title="The story stays yours. The style changes." description="A Friendship Diary is part of an event, not a separate app. Here is the same preview in two Birthday themes."><div className="module-skins"><div className="theme-canvas theme-retro-disco"><ThemeModulePreview moduleId="friendship-diary" event={themeDemoEvents.birthday} /></div><div className="theme-canvas theme-coquette"><ThemeModulePreview moduleId="friendship-diary" event={themeDemoEvents.birthday} /></div></div></ExperienceSection>
      <ExperienceSection label="GOOD QUESTIONS" title="A little prompt goes a long way" description="Six example questions help friends share the moments they remember best."><div className="question-grid">{friendshipQuestions.map((prompt) => <QuestionCard key={prompt.number} prompt={prompt} />)}</div></ExperienceSection>
      <ExperienceSection label="MOCK RESPONSES" title="Answers worth keeping" description="A preview of the kind of stories that can live inside an event."><div className="response-grid friendship-responses">{friendshipResponses.map((response) => <ResponseCard key={response.name} response={response} />)}</div></ExperienceSection>
    </div>
  );
}
