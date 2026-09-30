import { useSearchParams } from "react-router-dom";
import InvitationGallery from "../components/InvitationGallery.jsx";
import { invitationTemplates } from "../data/templates.js";

const filters = ["All", "Birthday", "Wedding", "Party"];

export default function InvitationsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const requestedFilter = searchParams.get("type");
  const filter = filters.includes(requestedFilter) ? requestedFilter : "All";
  const visibleTemplates = filter === "All" ? invitationTemplates : invitationTemplates.filter((template) => template.eventTypes.includes(filter));

  return (
    <section className="inner-page invitations-page">
      <div className="invitations-heading">
        <div><h1>Invitations that feel like you.</h1><p>Find a first impression worth keeping. Each design is a little world of its own.</p></div>
        <span className="invitations-heading-mark" aria-hidden="true">✳</span>
      </div>
      <div className="invitation-filters" role="group" aria-label="Filter invitation templates">
        {filters.map((option) => <button className={`filter-button${filter === option ? " is-active" : ""}`} type="button" key={option} aria-pressed={filter === option} onClick={() => setSearchParams(option === "All" ? {} : { type: option })}>{option}</button>)}
      </div>
      <p className="filter-count">{visibleTemplates.length} {visibleTemplates.length === 1 ? "design" : "designs"} to explore</p>
      <InvitationGallery templates={visibleTemplates} />
    </section>
  );
}
