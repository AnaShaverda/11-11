import { Link, useParams } from "react-router-dom";
import { useLanguage } from "../../localization/LanguageContext.jsx";
import GuestCardSuite from "../components/GuestCardSuite.jsx";
import InvitationArtwork from "../components/InvitationArtwork.jsx";
import { normalizeCustomDesign } from "../components/CustomInvitationCover.jsx";
import { getCustomTemplate } from "../data/customTemplates.js";
import { getCustomThemes, portraitSamplePhoto } from "../data/customClassicalThemes.js";
import { guestPreviewDefaults, normalizeGuestSettings } from "../data/guestCardDesign.js";

export default function CustomDesignExperiencePage() {
  const { category, theme: themeId } = useParams();
  const { language, t } = useLanguage();
  const template = getCustomTemplate(category);
  const occasion = getCustomThemes("christening").some(item => item.id === themeId) ? "christening" : "wedding";
  const theme = getCustomThemes(occasion).find(item => item.id === themeId);
  if (!template || !theme) return <main className="inner-page copy-page"><h1>{t("invitations.notFound.title")}</h1><Link to="/invitations">{t("invitations.allInvitations")}</Link></main>;

  const wedding = occasion === "wedding";
  const sample = wedding ? {
    title: language === "ka" ? "ანა და ნიკა" : "Anna & Nika", name: language === "ka" ? "ანა და ნიკა" : "Anna & Nika",
    opening: language === "ka" ? "გეპატიჟებით" : "You’re invited", line: language === "ka" ? "სიხარულით გეპატიჟებით ჩვენი სიყვარულის აღსანიშნავად. გთხოვთ, შემოგვიერთდეთ ამ განსაკუთრებულ დღეს." : "With joy in our hearts, we invite you to celebrate our wedding day with us.",
    date: "2027-06-18", displayDate: language === "ka" ? "18 ივნისი, 2027" : "18 June 2027", time: "16:00", location: language === "ka" ? "გარდენ ჰოლი, თბილისი" : "Garden Hall, Tbilisi", city: language === "ka" ? "თბილისი" : "Tbilisi", initials: { first: "A", second: "N" },
  } : {
    title: language === "ka" ? "მარიამის ნათლობა" : "Mariam’s Christening", name: language === "ka" ? "მარიამის ნათლობა" : "Mariam’s Christening",
    opening: language === "ka" ? "გეპატიჟებით" : "You’re invited", line: language === "ka" ? "სიყვარულით გეპატიჟებით მარიამის ნათლობის დღეს. ერთად გავიზიაროთ ეს განსაკუთრებული წუთები." : "Please join us to celebrate Mariam’s christening and share this special day with our family.",
    date: "2027-06-18", displayDate: language === "ka" ? "18 ივნისი, 2027" : "18 June 2027", time: "12:00", location: language === "ka" ? "სამების ტაძარი, თბილისი" : "Holy Trinity Cathedral, Tbilisi", city: language === "ka" ? "თბილისი" : "Tbilisi", initials: { first: "M", second: "" },
  };
  const coverImage = theme.photoTheme ? portraitSamplePhoto : theme.squarePhoto ? "/images/christening/little-dreamer/invitation-cover-square.webp" : "";
  const design = normalizeCustomDesign({ theme: theme.id, coverImage });
  const settings = normalizeGuestSettings({ ...guestPreviewDefaults, details: true, gallery: true, rsvp: true, companions: 2, motion: "none", entrance: "immediate", openingEffect: "none" });
  const moments = wedding ? [
    { id: "ceremony", en: "Wedding ceremony", ka: "ქორწილის ცერემონია", time: "16:00", venue: sample.location, mapUrl: "" },
    { id: "reception", en: "Wedding reception", ka: "სადღესასწაულო მიღება", time: "19:00", venue: sample.location, mapUrl: "" },
  ] : [
    { id: "baptism", en: "Christening ceremony", ka: "ნათლობის ცერემონია", time: "12:00", venue: sample.location, mapUrl: "" },
    { id: "reception", en: "Family reception", ka: "სადღესასწაულო მიღება", time: "15:00", venue: sample.location, mapUrl: "" },
  ];
  const photos = (wedding ? ["/images/wedding/couple-slider/spinning-embrace.png", "/images/wedding/couple-slider/running-together.png", "/images/wedding/couple-slider/bridal-veil.png"] : ["/images/christening/blue-dove/invitation-cover.webp", "/images/christening/olive-ribbon/invitation-cover.webp", "/images/christening/little-dreamer/invitation-cover.webp"]).map((src, index) => ({ id: `sample-${index}`, src }));
  const dayPlan = wedding ? [
    { time: "16:00", title: language === "ka" ? "ცერემონია" : "Ceremony", details: sample.location },
    { time: "19:00", title: language === "ka" ? "ვახშამი და ცეკვა" : "Dinner & dancing", details: sample.location },
  ] : [
    { time: "12:00", title: language === "ka" ? "ნათლობა" : "Christening", details: sample.location },
    { time: "15:00", title: language === "ka" ? "ოჯახური სუფრა" : "Family reception", details: sample.location },
  ];
  const previewTemplate = { ...template, slug: `gallery-${category}-${theme.id}`, subcategory: occasion };

  return <main className="guest-preview-page is-guest-preview custom-design-experience-page">
    <Link className="custom-design-preview-choose" target="_top" to={`/order-online/${category}/create?occasion=${occasion}&theme=${encodeURIComponent(theme.id)}`}>
      {language === "ka" ? "ამ დიზაინის არჩევა" : "Choose this design"}<InvitationArtwork name="arrow-right" size={18} />
    </Link>
    <div className="guest-preview-stage">
      <GuestCardSuite template={previewTemplate} sample={sample} customDesign={design} moments={moments} city={sample.city}
        weddingParty={wedding ? [{ id: "maid", role: "maidOfHonour", name: language === "ka" ? "თამარ ბერიძე" : "Tamar Beridze" }, { id: "best", role: "bestMan", name: language === "ka" ? "გიორგი მაისურაძე" : "Giorgi Maisuradze" }] : []}
        copyTranslations={{}} editableFields={[]} settings={settings} photos={photos} dayPlan={dayPlan}
        noteSettings={{ enabled: true, preset: "wish", prompt: "" }} creator={false} showCreatorTools={false} hasPortrait adaptiveCoverArtwork={wedding}
        initialGuestName={language === "ka" ? "თამარ ბერიძე" : "Tamar Beridze"}
        initialNote={language === "ka" ? "გილოცავთ! მოუთმენლად ველი ამ დღეს." : "Congratulations! I can’t wait to celebrate with you."} />
    </div>
  </main>;
}
