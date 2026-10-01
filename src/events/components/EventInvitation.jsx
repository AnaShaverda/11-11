import { InvitationArtwork } from "../../invitations/components/InvitationCard.jsx";
import { invitationSampleForEvent } from "../invitationAdapter.js";
import { getThemePresentation } from "../../themes/themePresentation.js";
import { useLanguage } from "../../localization/LanguageContext.jsx";

export default function EventInvitation({ event }) {
  const { language, t } = useLanguage();
  const { template } = getThemePresentation(event.themeId);
  const sample = invitationSampleForEvent(event, template, language);
  // Photo-backed catalog posters omit event facts. Keep them readable here,
  // without changing the authored catalog composition or squeezing text into it.
  return <div className="event-invitation" role="img" aria-label={`${event.title} · ${event.date} · ${event.time} · ${event.location} · ${event.invitation.message} · ${t("interactions.step.invitation")}`}><InvitationArtwork template={template} sample={sample} />{template.visualAssets?.photoCard ? <div className="event-invitation-facts"><strong>{sample.date}</strong><span>{event.location}</span>{event.invitation.message ? <p>{event.invitation.message}</p> : null}</div> : null}</div>;
}
