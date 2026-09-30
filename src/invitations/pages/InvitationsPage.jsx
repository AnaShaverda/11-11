import { useSearchParams } from "react-router-dom";
import InvitationGallery from "../components/InvitationGallery.jsx";
import { invitationTemplates } from "../data/templates.js";

const filters = ["All", "Birthday", "Wedding"];
const collectionCopy = {
  Birthday: { index: "01", heading: "Birthday invitations", description: "For another year of stories, late nights, and all your favorite people." },
  Wedding: { index: "02", heading: "Wedding invitations", description: "A beautiful first glimpse of the day you’ll always remember." },
};

export default function InvitationsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const requestedFilter = searchParams.get("type");
  const filter = filters.includes(requestedFilter) ? requestedFilter : "All";
  const categories = filter === "All" ? ["Birthday", "Wedding"] : [filter];

  return (
    <section className="inner-page invitations-page">
      <div className="invitations-heading">
        <div><span className="invitations-eyebrow">THE DESIGN COLLECTION / 11:11</span><h1>An invitation they’ll want to keep.</h1><p>Find a first hello that feels like your celebration. Explore {invitationTemplates.length} looks, each with its own point of view.</p></div>
        <span className="invitations-heading-mark" aria-hidden="true">✳</span>
      </div>
      <div className="invitation-filters" role="group" aria-label="Filter invitation templates">
        {filters.map((option) => <button className={`filter-button${filter === option ? " is-active" : ""}`} type="button" key={option} aria-pressed={filter === option} onClick={() => setSearchParams(option === "All" ? {} : { type: option })}>{option}</button>)}
      </div>
      <p className="filter-count">{filter === "All" ? `${invitationTemplates.length} designs · two ways to celebrate` : `${invitationTemplates.filter((template) => template.category === filter).length} ${filter.toLowerCase()} designs`}</p>
      {categories.map((category) => {
        const templates = invitationTemplates.filter((template) => template.category === category);
        const copy = collectionCopy[category];
        return (
          <section className="invitation-collection" key={category} aria-labelledby={`invitation-${category.toLowerCase()}-heading`}>
            <div className="invitation-collection-heading"><span>{copy.index} / THE COLLECTION</span><div><h2 id={`invitation-${category.toLowerCase()}-heading`}>{copy.heading}</h2><p>{copy.description}</p></div><small>{templates.length} DESIGNS</small></div>
            <InvitationGallery templates={templates} />
          </section>
        );
      })}
      <div className="invitation-storefront-note"><span aria-hidden="true">✦</span><p>These are design previews. Full invitations will be part of the event creation experience.</p></div>
    </section>
  );
}
