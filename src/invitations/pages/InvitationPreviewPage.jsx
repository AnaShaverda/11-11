import { Link, useParams } from "react-router-dom";
import { getInvitationTemplate } from "../data/templates.js";
import { demoEvents } from "../data/demoEvents.js";
import { invitationRegistry } from "../registry.js";

export default function InvitationPreviewPage() {
  const { slug } = useParams();
  const template = getInvitationTemplate(slug);
  const Design = invitationRegistry[slug];

  if (!template || !Design || !demoEvents[slug]) {
    return (
      <section className="inner-page copy-page">
        <h1>Invitation not found</h1>
        <p>That invitation isn’t ready to preview. Explore the available designs instead.</p>
        <Link className="text-link" to="/invitations">All invitations <span aria-hidden="true">↗</span></Link>
      </section>
    );
  }

  return (
    <section className="invitation-preview-page">
      <div className="preview-topline"><Link className="back-link" to="/invitations">← All invitations</Link><span>11:11 / DEMO PREVIEW</span></div>
      <div className="preview-layout">
        <div className="preview-intro"><span className="preview-category">{template.eventTypes.join(" · ")} invitation</span><h1>{template.title}</h1><p>{template.shortDescription}</p><p className="preview-note">This is a sample design with demo event details.</p></div>
        <div className="preview-canvas"><Design event={demoEvents[slug]} /></div>
      </div>
    </section>
  );
}
