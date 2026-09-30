import { Link } from "react-router-dom";
import ExperienceSection from "./components/ExperienceSection.jsx";
import ExperienceInvitations from "./components/ExperienceInvitations.jsx";
import ExperienceCTA from "./components/ExperienceCTA.jsx";
import ResponseCard from "./components/ResponseCard.jsx";
import QuestionCard from "./components/QuestionCard.jsx";
import { birthdayWishes, birthdayPrompts, birthdayGames } from "./data/showcases.js";

export default function BirthdayExperience() {
  return (
    <div className="experience-page birthday-experience">
      <Link className="experience-back" to="/projects">← All experiences</Link>
      <section className="birthday-hero">
        <div className="birthday-hero-copy"><span className="section-label">BIRTHDAY / 11:11</span><h1>Make another year <em>unforgettable.</em></h1><p>Thoughtful invitations, heartfelt words, and the little stories that make someone feel celebrated.</p><Link className="primary-link" to="/invitations?type=Birthday">Explore birthday invitations <span aria-hidden="true">↗</span></Link></div>
        <div className="birthday-hero-art" aria-hidden="true"><span className="birthday-orbit orbit-one" /><span className="birthday-orbit orbit-two" /><span className="birthday-orbit orbit-three" /><span className="birthday-hero-number">11:11</span><span className="birthday-hero-star star-one">✦</span><span className="birthday-hero-star star-two">✳</span><span className="birthday-hero-art-copy">another trip<br />around the sun</span></div>
      </section>
      <ExperienceInvitations type="Birthday" description="A first glimpse of the celebration, designed to make people smile before the day even begins." />
      <ExperienceSection label="KIND WORDS" title="Birthday wishes" description="A little message can become a memory you keep forever.">
        <div className="response-grid">{birthdayWishes.map((wish) => <ResponseCard key={wish.name} response={wish} />)}</div>
      </ExperienceSection>
      <ExperienceSection label="KEEP THE STORIES" title="More than a date on the calendar" description="Give friends a few prompts and see the celebration through their eyes.">
        <div className="question-grid">{birthdayPrompts.map((prompt) => <QuestionCard key={prompt.number} prompt={prompt} />)}</div>
      </ExperienceSection>
      <ExperienceSection label="PHOTO MEMORIES" title="A gallery of all your people" description="The candid moments, the joyful chaos, the photos you come back to.">
        <div className="memory-mosaic" aria-label="Decorative preview of a future photo memories gallery"><div className="memory-tile tile-one"><span>good times</span></div><div className="memory-tile tile-two"><span>✳</span></div><div className="memory-tile tile-three"><span>our favorite people</span></div><div className="memory-tile tile-four"><span>11:11</span></div></div>
      </ExperienceSection>
      <ExperienceSection label="COMING LATER" title="The fun keeps going" description="Little games to bring everyone into the story.">
        <div className="game-grid">{birthdayGames.map((game) => <article className="game-card" key={game.title}><span aria-hidden="true">{game.symbol}</span><h3>{game.title}</h3><p>{game.detail}</p><small>Preview</small></article>)}</div>
      </ExperienceSection>
      <ExperienceCTA className="birthday-final" title="Ready to celebrate?" text="Start with an invitation they’ll remember." to="/invitations?type=Birthday" action="Explore birthday invitations" />
    </div>
  );
}
