import "../../styles/bridal-photo-collage.css";
import InvitationMotif from "./InvitationMotif.jsx";

const photos = [
  { image: "/images/bridal/party-polaroids/sky-toast.webp", en: "together", ka: "ერთად", altEn: "Friends raising glasses against a blue sky", altKa: "მეგობრები ცის ფონზე ჭიქებს სწევენ", position: "center 62%" },
  { image: "/images/bridal/party-polaroids/champagne-spray.webp", en: "let’s celebrate", ka: "ვიზეიმოთ", altEn: "Champagne spraying into a clear sky", altKa: "შამპანური მოწმენდილ ცაში იფრქვევა", position: "center 57%" },
  { image: "/images/bridal/party-polaroids/shadow-toast.webp", en: "cheers to us", ka: "ჩვენ გაგვიმარჯოს", altEn: "Shadows of two friends clinking glasses", altKa: "ორი მეგობრის ჩრდილები ჭიქებით", position: "center" },
];

export default function BridalPhotoCollage({ language = "en", style = "summer", accentArt }) {
  const ka = language === "ka";
  return <section className={`bridal-photo-collage bridal-photo-collage--${style}`} aria-labelledby={`bridal-photos-${style}`}>
    <div className="bridal-photo-heading"><span className="bridal-photo-eyebrow">{ka ? "პატარა მოგონებები / დიდი სიყვარული" : "LITTLE MOMENTS / BIG LOVE"}</span><h2 id={`bridal-photos-${style}`}>{ka ? "მოგონებები ერთად." : "The good times, together."}</h2><p>{ka ? "ერთი საღამო, რომელსაც ისევ და ისევ გავიხსენებთ." : "A few snapshots of the moments we’ll always keep close."}</p></div>
    <div className="bridal-photo-stage"><span className="bridal-photo-scribble" aria-hidden="true"><InvitationMotif name="heart" /></span><span className="bridal-photo-sticker bridal-photo-sticker--star" aria-hidden="true"><InvitationMotif name="burst" /></span>{accentArt && <img className="bridal-photo-art" src={accentArt} alt="" loading="lazy" />}
      <div className="bridal-photo-cards">{photos.map((photo, index) => <figure className="bridal-polaroid" key={photo.image}><img className="bridal-polaroid-image" src={photo.image} alt={ka ? photo.altKa : photo.altEn} style={{ objectPosition: photo.position }} loading="lazy" /><figcaption>{ka ? photo.ka : photo.en}<span aria-hidden="true"> <InvitationMotif name="heart" /></span></figcaption>{index === 1 && <span className="bridal-photo-tape" aria-hidden="true" />}</figure>)}</div>
      <span className="bridal-photo-sticker bridal-photo-sticker--round" aria-hidden="true">{ka ? "სიყვარული" : "love you"}</span>
    </div>
  </section>;
}
