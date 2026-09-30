import { Link } from "react-router-dom";
import ExperienceSection from "./components/ExperienceSection.jsx";
import ExperienceCTA from "./components/ExperienceCTA.jsx";
import ResponseCard from "./components/ResponseCard.jsx";
import QuestionCard from "./components/QuestionCard.jsx";
import { friendshipQuestions, friendshipResponses } from "./data/showcases.js";

export default function FriendshipDiaryExperience() {
  return (
    <div className="experience-page friendship-experience">
      <Link className="experience-back" to="/projects">← All experiences</Link>
      <section className="friendship-hero">
        <div><span className="section-label">FRIENDSHIP DIARY / 11:11</span><h1>Every friendship has a story.</h1><p>Imagine sending one link and discovering how your favorite people remember the moments you share.</p><a className="primary-link" href="#diary-preview">See how it feels <span aria-hidden="true">↓</span></a></div>
        <div className="friendship-notebook" aria-hidden="true"><span className="notebook-tape"/><span className="notebook-star">✳</span><small>01 / 06</small><strong>How did we meet?</strong><p>We met on a rainy Tuesday and talked until the café closed...</p><span className="notebook-signature">— Ani ♡</span></div>
      </section>
      <ExperienceSection id="diary-preview" label="A FEW GOOD QUESTIONS" title="The prompts make it personal" description="Friends answer in their own words. The result is a diary only your people could make.">
        <div className="question-grid">{friendshipQuestions.map((prompt) => <QuestionCard key={prompt.number} prompt={prompt} />)}</div>
      </ExperienceSection>
      <ExperienceSection label="A SNEAK PEEK" title="Different memories. One friendship." description="A sample of the kind of stories a diary can hold.">
        <div className="response-grid friendship-responses">{friendshipResponses.map((response) => <ResponseCard key={response.name} response={response} />)}</div>
      </ExperienceSection>
      <ExperienceCTA className="friendship-final" title="Keep the little stories close." text="Friendship Diary is coming to 11:11. Explore more ways to celebrate in the meantime." to="/projects" action="Explore experiences" />
    </div>
  );
}
