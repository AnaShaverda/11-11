import { Link } from "react-router-dom";
import ExperienceSection from "./components/ExperienceSection.jsx";
import ExperienceInvitations from "./components/ExperienceInvitations.jsx";
import ExperienceCTA from "./components/ExperienceCTA.jsx";
import ResponseCard from "./components/ResponseCard.jsx";
import { weddingFeatures, weddingMessages } from "./data/showcases.js";
import ThemeExplorer from "../themes/components/ThemeExplorer.jsx";

export default function WeddingExperience() {
  return (
    <div className="experience-page wedding-experience">
      <Link className="experience-back" to="/projects">← All experiences</Link>
      <section className="wedding-hero">
        <div className="wedding-hero-copy"><span className="section-label">WEDDING / 11:11</span><h1>One day.<br />One story.<br /><em>Yours.</em></h1><p>A space for the people, promises, and beautiful details that make the day your own.</p><Link className="primary-link wedding-link" to="/invitations?type=Wedding">Explore wedding invitations <span aria-hidden="true">↗</span></Link></div>
        <div className="wedding-hero-art" aria-hidden="true"><div className="wedding-paper paper-back" /><div className="wedding-paper paper-front"><span>11:11 / WEDDING</span><strong>M <em>&amp;</em> L</strong><span>one beautiful day</span><i>✧</i></div></div>
      </section>
      <ThemeExplorer category="wedding" />
      <ExperienceInvitations type="Wedding" description="A thoughtful first chapter for the celebration to come." />
      <ExperienceSection label="THE WHOLE STORY" title="More than an invitation" description="The little details that help everyone feel part of your day." className="wedding-feature-section">
        <div className="wedding-feature-grid">{weddingFeatures.map((feature) => <article key={feature.title} className="wedding-feature"><span aria-hidden="true">{feature.symbol}</span><h3>{feature.title}</h3><p>{feature.detail}</p></article>)}</div>
      </ExperienceSection>
      <ExperienceSection label="WORDS TO KEEP" title="A guest book full of love" description="Messages from the people who know your story best.">
        <div className="response-grid wedding-responses">{weddingMessages.map((message) => <ResponseCard key={message.name} response={message} />)}</div>
      </ExperienceSection>
      <ExperienceCTA className="wedding-final" title="Let the story begin." text="Find the invitation that feels like your day." to="/invitations?type=Wedding" action="Explore wedding invitations" />
    </div>
  );
}
