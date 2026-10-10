import { captionValue,  createCaptionCopy } from "../../localization/captionValues.js";
export const occasionProfiles = {
  "wedding": {
    "id": "wedding",
    "name": createCaptionCopy("invitations.data.customOccasions.copy1"),
    "titleLabel": createCaptionCopy("invitations.data.customOccasions.copy2"),
    "titleHint": createCaptionCopy("invitations.data.customOccasions.copy3"),
    "dateLabel": createCaptionCopy("invitations.data.customOccasions.copy4"),
    "cityHint": createCaptionCopy("invitations.data.customOccasions.copy5"),
    "momentsQuestion": createCaptionCopy("invitations.data.customOccasions.copy6"),
    "defaultTitle": createCaptionCopy("invitations.data.customOccasions.copy7")
  },
  "birthday": {
    "id": "birthday",
    "name": createCaptionCopy("invitations.data.customOccasions.copy8"),
    "titleLabel": createCaptionCopy("invitations.data.customOccasions.copy9"),
    "titleHint": createCaptionCopy("invitations.data.customOccasions.copy10"),
    "dateLabel": createCaptionCopy("invitations.data.customOccasions.copy11"),
    "cityHint": createCaptionCopy("invitations.data.customOccasions.copy12"),
    "momentsQuestion": createCaptionCopy("invitations.data.customOccasions.copy13"),
    "defaultTitle": createCaptionCopy("invitations.data.customOccasions.copy14")
  },
  "christening": {
    "id": "christening",
    "name": createCaptionCopy("invitations.data.customOccasions.copy15"),
    "titleLabel": createCaptionCopy("invitations.data.customOccasions.copy16"),
    "titleHint": createCaptionCopy("invitations.data.customOccasions.copy17"),
    "dateLabel": createCaptionCopy("invitations.data.customOccasions.copy18"),
    "cityHint": createCaptionCopy("invitations.data.customOccasions.copy19"),
    "momentsQuestion": createCaptionCopy("invitations.data.customOccasions.copy20"),
    "defaultTitle": createCaptionCopy("invitations.data.customOccasions.copy21")
  },
  "baby-kids": {
    "id": "baby-kids",
    "name": createCaptionCopy("invitations.data.customOccasions.copy22"),
    "titleLabel": createCaptionCopy("invitations.data.customOccasions.copy23"),
    "titleHint": createCaptionCopy("invitations.data.customOccasions.copy24"),
    "dateLabel": createCaptionCopy("invitations.data.customOccasions.copy25"),
    "cityHint": createCaptionCopy("invitations.data.customOccasions.copy26"),
    "momentsQuestion": createCaptionCopy("invitations.data.customOccasions.copy27"),
    "defaultTitle": createCaptionCopy("invitations.data.customOccasions.copy28")
  },
  "pre-wedding": {
    "id": "pre-wedding",
    "name": createCaptionCopy("invitations.data.customOccasions.copy29"),
    "titleLabel": createCaptionCopy("invitations.data.customOccasions.copy30"),
    "titleHint": createCaptionCopy("invitations.data.customOccasions.copy31"),
    "dateLabel": createCaptionCopy("invitations.data.customOccasions.copy32"),
    "cityHint": createCaptionCopy("invitations.data.customOccasions.copy33"),
    "momentsQuestion": createCaptionCopy("invitations.data.customOccasions.copy34"),
    "defaultTitle": createCaptionCopy("invitations.data.customOccasions.copy35")
  },
  "parties": {
    "id": "parties",
    "name": createCaptionCopy("invitations.data.customOccasions.copy36"),
    "titleLabel": createCaptionCopy("invitations.data.customOccasions.copy37"),
    "titleHint": createCaptionCopy("invitations.data.customOccasions.copy38"),
    "dateLabel": createCaptionCopy("invitations.data.customOccasions.copy39"),
    "cityHint": createCaptionCopy("invitations.data.customOccasions.copy40"),
    "momentsQuestion": createCaptionCopy("invitations.data.customOccasions.copy41"),
    "defaultTitle": createCaptionCopy("invitations.data.customOccasions.copy42")
  },
  "gifts": {
    "id": "gifts",
    "name": createCaptionCopy("invitations.data.customOccasions.copy43"),
    "titleLabel": createCaptionCopy("invitations.data.customOccasions.copy44"),
    "titleHint": createCaptionCopy("invitations.data.customOccasions.copy45"),
    "dateLabel": createCaptionCopy("invitations.data.customOccasions.copy46"),
    "cityHint": createCaptionCopy("invitations.data.customOccasions.copy47"),
    "momentsQuestion": createCaptionCopy("invitations.data.customOccasions.copy48"),
    "defaultTitle": createCaptionCopy("invitations.data.customOccasions.copy49")
  },
  "corporate": {
    "id": "corporate",
    "name": createCaptionCopy("invitations.data.customOccasions.copy50"),
    "titleLabel": createCaptionCopy("invitations.data.customOccasions.copy51"),
    "titleHint": createCaptionCopy("invitations.data.customOccasions.copy52"),
    "dateLabel": createCaptionCopy("invitations.data.customOccasions.copy53"),
    "cityHint": createCaptionCopy("invitations.data.customOccasions.copy54"),
    "momentsQuestion": createCaptionCopy("invitations.data.customOccasions.copy55"),
    "defaultTitle": createCaptionCopy("invitations.data.customOccasions.copy56")
  }
};

export const occasionOptions = Object.values(occasionProfiles);
export function getInitialOccasion(category, saved) {
  if (category === "all") return Object.hasOwn(occasionProfiles, saved) ? saved : "";
  if (category === "baby-kids" && saved === "christening") return saved;
  return Object.hasOwn(occasionProfiles, category) ? category : "parties";
}

export function getOccasionWording(type, language) {
  const ka = language === "ka";
  const shared = { headlines: [captionValue("ui.invitations.data.customOccasions.youReInvited", language), captionValue("ui.invitations.data.customOccasions.letSCelebrateTogether", language)], messages: [captionValue("ui.invitations.data.customOccasions.withJoyWeInviteYouToCelebrate", language), captionValue("ui.invitations.data.customOccasions.yourPresenceWouldMakeOurCelebrationEven", language)] };
  const specific = {
    wedding: [captionValue("ui.invitations.data.customOccasions.weAreGettingMarried", language), captionValue("ui.invitations.data.customOccasions.withJoyWeInviteYouToOur", language)],
    christening: [captionValue("ui.invitations.data.customOccasions.celebrateTheChristeningWithUs", language), captionValue("ui.invitations.data.customOccasions.joinUsWithLoveAsWeCelebrate", language)],
    birthday: [captionValue("ui.invitations.data.customOccasions.letSCelebrateABirthday", language), captionValue("ui.invitations.data.customOccasions.youReInvitedToABirthdayCelebration", language)],
    "baby-kids": [captionValue("ui.invitations.data.customOccasions.aBigDayForLittleOnes", language), captionValue("ui.invitations.data.customOccasions.joinUsForOurLittleOneS", language)],
    "pre-wedding": [captionValue("ui.invitations.data.customOccasions.letTheWeddingCelebrationsBegin", language), captionValue("ui.invitations.data.customOccasions.joinUsForACelebrationBeforeThe", language)],
    corporate: [captionValue("ui.invitations.data.customOccasions.joinUsAtOurEvent", language), captionValue("ui.invitations.data.customOccasions.youReInvitedToOurEventTo", language)],
    gifts: [captionValue("ui.invitations.data.customOccasions.joinTheSurprise", language), captionValue("ui.invitations.data.customOccasions.joinUsToMakeASpecialSurprise", language)],
  }[type];
  return specific ? { headlines: [specific[0], ...shared.headlines], messages: [specific[1], ...shared.messages] } : shared;
}
