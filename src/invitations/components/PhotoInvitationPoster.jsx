import BirthdayIllustrations from "./BirthdayIllustrations.jsx";
import { useLanguage } from "../../localization/LanguageContext.jsx";
import SeparatedForeground from "./SeparatedForeground.jsx";
import { birthdayAssetStyle } from "../data/assetPresentation.js";

// Shared paper card on a generated scene; all event text remains live HTML.
export default function PhotoInvitationPoster({ name, age, turns, opening, closing, details, photoCard, components }) {
  const illustrated = ["illustrated", "tavern"].includes(photoCard.variant);
  const playful = ["playful", "space", "dino"].includes(photoCard.variant);
  const framed = ["space", "dino"].includes(photoCard.variant);
  const { t } = useLanguage();
  return (
    <div className={`modern-toast-paper photo-invitation-paper${illustrated ? " photo-paper-illustrated" : ""}${playful ? " photo-paper-playful" : ""}${framed || photoCard.variant === "tavern" ? ` photo-paper-${photoCard.variant}` : ""}`}>
      {!illustrated && !playful && <span className="modern-toast-curves" aria-hidden="true">{[0, 1, 2, 3, 4].map((line) => <i key={line} />)}</span>}
      <span className="modern-toast-opening">{playful ? t("invitations.invited") : opening}</span>
      {!illustrated && <strong className="modern-toast-age">{age}</strong>}
      <span className="modern-toast-name"><span>{name}</span><span>{framed ? t("photoCard.turns") : turns}</span></span>
      <span className="modern-toast-closing">{playful ? t("photoCard.celebrate") : closing}</span>
      {details ? <span className="modern-toast-details">{details}</span> : null}
      {photoCard.noteKey ? <span className="photo-paper-note">{t(photoCard.noteKey)}</span> : null}
      {photoCard.captionKey ? <span className="photo-paper-caption">{t(photoCard.captionKey)}</span> : null}
      {components ? <SeparatedForeground className="photo-paper-separated-foreground" assets={components} style={birthdayAssetStyle(photoCard.artwork[0])} aspectRatio={2 / 3} eager /> : <BirthdayIllustrations assets={photoCard.artwork} slot="paper" eager />}
    </div>
  );
}
