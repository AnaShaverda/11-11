import { Link } from "react-router-dom";
import ExperienceSection from "./components/ExperienceSection.jsx";
import ExperienceCTA from "./components/ExperienceCTA.jsx";

const occasions = ["Company celebrations", "Product launches", "Private dinners", "Team events", "Conferences", "Networking nights"];

export default function CorporateExperience() {
  return (
    <div className="experience-page corporate-experience">
      <Link className="experience-back" to="/projects">← All event categories</Link>
      <section className="corporate-hero"><div><span className="section-label">CORPORATE / 11:11</span><h1>Good work deserves a good gathering.</h1><p>Make a company event feel personal, considered, and worth remembering.</p><Link className="primary-link" to="/invitations">Explore invitation styles <span aria-hidden="true">↗</span></Link></div><div className="corporate-visual" aria-hidden="true"><span>11:11</span><strong>THE<br />GATHERING</strong><small>people · purpose · a reason to meet</small><i>✳</i></div></section>
      <ExperienceSection label="A LITTLE MORE HUMAN" title="For every reason to bring people together" description="A flexible digital event space can carry the invitation, the details, and the memories that follow."><div className="corporate-occasions">{occasions.map((occasion, index) => <div key={occasion}><span>{String(index + 1).padStart(2, "0")}</span><strong>{occasion}</strong><span aria-hidden="true">↗</span></div>)}</div></ExperienceSection>
      <div className="corporate-preview-note"><span aria-hidden="true">✦</span><div><h2>The next collection is taking shape.</h2><p>Corporate-specific themes are on the way. The same invitation, gallery, guest message, and event-detail modules can adapt to your occasion.</p></div></div>
      <ExperienceCTA title="Make the gathering memorable." text="Explore the design language already available while corporate themes are in progress." to="/invitations" action="Browse invitations" />
    </div>
  );
}
