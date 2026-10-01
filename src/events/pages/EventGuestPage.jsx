import { Link, useNavigate, useParams } from "react-router-dom";
import { useEventDrafts } from "../EventDraftLayout.jsx";
import EventGuestExperience from "../components/EventGuestExperience.jsx";
import { useLanguage } from "../../localization/LanguageContext.jsx";

export default function EventGuestPage() {
  const { t } = useLanguage();
  const { eventId, interactionId } = useParams();
  const { getDraft } = useEventDrafts();
  const navigate = useNavigate();
  const draft = getDraft(eventId);
  if (!draft) return <section className="inner-page copy-page"><h1>{t("interactions.notFound")}</h1><Link to="/invitations">{t("interactions.changeDesign")}</Link></section>;
  const { event } = draft;
  const basePath = `/events/${event.id}`;
  const unavailable = interactionId && !event.interactions.some((interaction) => interaction.id === interactionId && interaction.enabled);
  return <div className="event-page event-guest-page"><div className="event-topline"><Link className="back-link" to={`/events/new?theme=${event.themeId}&step=summary`}>← {t("interactions.editEvent")}</Link><span>{t("interactions.guestDemo")}</span></div><h1 className="event-guest-title">{event.title}</h1>{unavailable ? <div className="event-panel"><p role="status">{t("interactions.unavailable")}</p><Link to={basePath}>{t("interactions.backEvent")}</Link></div> : <EventGuestExperience key={event.id} event={event} activeId={interactionId} onOpen={(id) => navigate(`${basePath}/interactions/${id}`)} onClose={() => navigate(basePath)} />}</div>;
}
