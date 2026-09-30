import { Link, useParams } from "react-router-dom";
import { getInvitationTemplate } from "../data/templates.js";
import { invitationSamples } from "../data/invitationSamples.js";
import { InvitationArtwork } from "../components/InvitationCard.jsx";
import InvitationMoodBoards from "../components/InvitationMoodBoards.jsx";

export default function InvitationPreviewPage() {
  const { slug } = useParams();
  const template = getInvitationTemplate(slug);

  if (!template) return (
    <section className="inner-page copy-page">
      <h1>Invitation not found</h1>
      <p>Explore the current designs and find one that feels like your celebration.</p>
      <Link className="text-link" to="/invitations">All invitations <span aria-hidden="true">↗</span></Link>
    </section>
  );

  const sample = invitationSamples[template.slug];
  const { design } = template;
  const paletteVars = { "--showcase-paper": design.palette[0], "--showcase-ink": design.palette[1], "--showcase-accent": design.palette[2], "--showcase-secondary": design.palette[3] };

  return (
    <section className={`invitation-preview-page invitation-design-page design-type-${design.type} design-pattern-${design.pattern}${template.category === "Birthday" ? " birthday-design-page" : ""}`} style={paletteVars}>
      <div className="preview-topline"><Link className="back-link" to={`/invitations?type=${template.category}`}>← {template.category} invitations</Link><span>11:11 / DESIGN SHOWCASE</span></div>
      <div className="design-hero">
        <div className="design-hero-art"><InvitationArtwork template={template} large /></div>
        <div className="design-hero-copy"><span className="preview-category">{template.category} invitation · {template.style}</span><h1>{template.title}</h1><p>{template.shortDescription}</p><div className="design-hero-rule" /><div className="design-hero-sample"><span>THE INVITATION SAMPLE</span><strong>{sample.title}</strong><small>{sample.date} · {sample.location}</small></div><p className="design-hero-explainer">A first look at the visual world of this design. Explore its type, colors, details, and event pieces below.</p><div className="design-hero-palette" aria-label="Theme colors">{design.palette.map((color) => <span key={color} style={{ backgroundColor: color }} />)}</div></div>
      </div>
      <InvitationMoodBoards template={template} sample={sample} />
      <div className="design-page-end"><div><span>FIND YOUR FIRST HELLO</span><h2>Explore the full collection.</h2></div><Link className="primary-link" to="/invitations">All invitation designs <span aria-hidden="true">↗</span></Link></div>
    </section>
  );
}
