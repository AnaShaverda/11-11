import { captionValue, createCaptionCopy } from "../../localization/captionValues.js";

import "../../styles/bridal-photo-collage.css";
import InvitationMotif from "./InvitationMotif.jsx";

const photos = [
  {
    image: "/images/bridal/party-polaroids/sky-toast.webp",
    altEn: createCaptionCopy("data.components.BridalPhotoCollage.record1.altEn").en,
    altKa: createCaptionCopy("data.components.BridalPhotoCollage.record1.altEn").ka,
    position: "center 62%",
    ...createCaptionCopy(
      "invitations.components.BridalPhotoCollage.extraCopy1"
    ),
  },
  {
    image: "/images/bridal/party-polaroids/champagne-spray.webp",
    altEn: createCaptionCopy("data.components.BridalPhotoCollage.record2.altEn").en,
    altKa: createCaptionCopy("data.components.BridalPhotoCollage.record2.altEn").ka,
    position: "center 57%",
    ...createCaptionCopy(
      "invitations.components.BridalPhotoCollage.extraCopy2"
    ),
  },
  {
    image: "/images/bridal/party-polaroids/shadow-toast.webp",
    altEn: createCaptionCopy("data.components.BridalPhotoCollage.record3.altEn").en,
    altKa: createCaptionCopy("data.components.BridalPhotoCollage.record3.altEn").ka,
    position: "center",
    ...createCaptionCopy(
      "invitations.components.BridalPhotoCollage.extraCopy3"
    ),
  },
];

export default function BridalPhotoCollage({
  language = "en",
  style = "summer",
  accentArt,
}) {
  const ka = language === "ka";
  return (
    <section
      className={`bridal-photo-collage bridal-photo-collage--${style}`}
      aria-labelledby={`bridal-photos-${style}`}>
      <div className="bridal-photo-heading">
        <span className="bridal-photo-eyebrow">
          {captionValue(
            "ui.invitations.components.BridalPhotoCollage.littleMomentsBigLove",
            language
          )}
        </span>
        <h2 id={`bridal-photos-${style}`}>
          {captionValue(
            "ui.invitations.components.BridalPhotoCollage.theGoodTimesTogether",
            language
          )}
        </h2>
        <p>
          {captionValue(
            "ui.invitations.components.BridalPhotoCollage.aFewSnapshotsOfTheMomentsWe",
            language
          )}
        </p>
      </div>
      <div className="bridal-photo-stage">
        <span className="bridal-photo-scribble" aria-hidden="true">
          <InvitationMotif name="heart" />
        </span>
        <span
          className="bridal-photo-sticker bridal-photo-sticker--star"
          aria-hidden="true">
          <InvitationMotif name="burst" />
        </span>
        {accentArt && (
          <img
            className="bridal-photo-art"
            src={accentArt}
            alt=""
            loading="lazy"
          />
        )}
        <div className="bridal-photo-cards">
          {photos.map((photo, index) => (
            <figure className="bridal-polaroid" key={photo.image}>
              <img
                className="bridal-polaroid-image"
                src={photo.image}
                alt={ka ? photo.altKa : photo.altEn}
                style={{ objectPosition: photo.position }}
                loading="lazy"
              />
              <figcaption>
                {ka ? photo.ka : photo.en}
                <span aria-hidden="true">
                  {" "}
                  <InvitationMotif name="heart" />
                </span>
              </figcaption>
              {index === 1 && (
                <span className="bridal-photo-tape" aria-hidden="true" />
              )}
            </figure>
          ))}
        </div>
        <span
          className="bridal-photo-sticker bridal-photo-sticker--round"
          aria-hidden="true">
          {captionValue(
            "ui.invitations.components.BridalPhotoCollage.loveYou",
            language
          )}
        </span>
      </div>
    </section>
  );
}
