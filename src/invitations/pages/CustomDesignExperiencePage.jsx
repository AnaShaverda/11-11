import { captionValue, createCaptionCopy } from "../../localization/captionValues.js";
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
    title: captionValue("invitations.pages.CustomDesignExperiencePage.caption1", language), name: captionValue("invitations.pages.CustomDesignExperiencePage.caption2", language),
    opening: captionValue("invitations.pages.CustomDesignExperiencePage.caption3", language), line: captionValue("invitations.pages.CustomDesignExperiencePage.caption4", language),
    date: "2027-06-18", displayDate: captionValue("invitations.pages.CustomDesignExperiencePage.caption5", language), time: "16:00", location: captionValue("invitations.pages.CustomDesignExperiencePage.caption6", language), city: captionValue("invitations.pages.CustomDesignExperiencePage.caption7", language), initials: { first: "A", second: "N" },
  } : {
    title: captionValue("invitations.pages.CustomDesignExperiencePage.caption8", language), name: captionValue("invitations.pages.CustomDesignExperiencePage.caption9", language),
    opening: captionValue("invitations.pages.CustomDesignExperiencePage.caption10", language), line: captionValue("invitations.pages.CustomDesignExperiencePage.caption11", language),
    date: "2027-06-18", displayDate: captionValue("invitations.pages.CustomDesignExperiencePage.caption12", language), time: "12:00", location: captionValue("invitations.pages.CustomDesignExperiencePage.caption13", language), city: captionValue("invitations.pages.CustomDesignExperiencePage.caption14", language), initials: { first: "M", second: "" },
  };
  const coverImage = theme.photoTheme ? portraitSamplePhoto : theme.squarePhoto ? "/images/christening/little-dreamer/invitation-cover-square.webp" : "";
  const design = normalizeCustomDesign({ theme: theme.id, coverImage });
  const settings = normalizeGuestSettings({ ...guestPreviewDefaults, details: true, gallery: true, rsvp: true, companions: 2, motion: "none", entrance: "immediate", openingEffect: "none" });
  const moments = wedding ? [
    { id: "ceremony", time: "16:00", venue: sample.location, mapUrl: "", ...createCaptionCopy("invitations.pages.CustomDesignExperiencePage.extraCopy1") },
    { id: "reception", time: "19:00", venue: sample.location, mapUrl: "", ...createCaptionCopy("invitations.pages.CustomDesignExperiencePage.extraCopy2") },
  ] : [
    { id: "baptism", time: "12:00", venue: sample.location, mapUrl: "", ...createCaptionCopy("invitations.pages.CustomDesignExperiencePage.extraCopy3") },
    { id: "reception", time: "15:00", venue: sample.location, mapUrl: "", ...createCaptionCopy("invitations.pages.CustomDesignExperiencePage.extraCopy4") },
  ];
  const photos = (wedding ? ["/images/wedding/couple-slider/spinning-embrace.png", "/images/wedding/couple-slider/running-together.png", "/images/wedding/couple-slider/bridal-veil.png"] : ["/images/christening/blue-dove/invitation-cover.webp", "/images/christening/olive-ribbon/invitation-cover.webp", "/images/christening/little-dreamer/invitation-cover.webp"]).map((src, index) => ({ id: `sample-${index}`, src }));
  const dayPlan = wedding ? [
    { time: "16:00", title: captionValue("invitations.pages.CustomDesignExperiencePage.caption15", language), details: sample.location },
    { time: "19:00", title: captionValue("invitations.pages.CustomDesignExperiencePage.caption16", language), details: sample.location },
  ] : [
    { time: "12:00", title: captionValue("invitations.pages.CustomDesignExperiencePage.caption17", language), details: sample.location },
    { time: "15:00", title: captionValue("invitations.pages.CustomDesignExperiencePage.caption18", language), details: sample.location },
  ];
  const previewTemplate = { ...template, slug: `gallery-${category}-${theme.id}`, subcategory: occasion };

  return <main className="guest-preview-page is-guest-preview custom-design-experience-page">
    <Link className="custom-design-preview-choose" target="_top" to={`/order-online/${category}/create?occasion=${occasion}&theme=${encodeURIComponent(theme.id)}`}>
      {captionValue("invitations.pages.CustomDesignExperiencePage.caption19", language)}<InvitationArtwork name="arrow-right" size={18} />
    </Link>
    <div className="guest-preview-stage">
      <GuestCardSuite template={previewTemplate} sample={sample} customDesign={design} moments={moments} city={sample.city}
        weddingParty={wedding ? [{ id: "maid", role: "maidOfHonour", name: captionValue("invitations.pages.CustomDesignExperiencePage.caption20", language) }, { id: "best", role: "bestMan", name: captionValue("invitations.pages.CustomDesignExperiencePage.caption21", language) }] : []}
        copyTranslations={{}} editableFields={[]} settings={settings} photos={photos} dayPlan={dayPlan}
        noteSettings={{ enabled: true, preset: "wish", prompt: "" }} creator={false} showCreatorTools={false} hasPortrait adaptiveCoverArtwork={wedding}
        initialGuestName={captionValue("invitations.pages.CustomDesignExperiencePage.caption22", language)}
        initialNote={captionValue("invitations.pages.CustomDesignExperiencePage.caption23", language)} />
    </div>
  </main>;
}
