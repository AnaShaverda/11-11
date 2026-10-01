import Icon from "../../components/ui/Icon.jsx";
import RSVPPreview from "../../modules/components/RSVPPreview.jsx";
import { demoGuest } from "../data/demoGuests.js";
import ThemeModulePreview from "../../modules/components/ThemeModulePreview.jsx";
import { themeStories } from "../data/themeStories.js";
import { birthdayThemeAssets } from "../../invitations/data/birthdayAssets.js";
import { useLanguage } from "../../localization/LanguageContext.jsx";
import PhotoInvitationPoster from "../../invitations/components/PhotoInvitationPoster.jsx";
import ReferenceSocialPoster from "../../invitations/components/ReferenceSocialPoster.jsx";
import FullImageInvitationPoster from "../../invitations/components/FullImageInvitationPoster.jsx";
import { normalizeBirthdayAsset, photoCardStyle } from "../../invitations/data/assetPresentation.js";

function daysUntil(isoDate) {
  return Math.max(0, Math.ceil((new Date(isoDate).getTime() - Date.now()) / 86400000));
}

function Invitation({ theme, event, story }) {
  const { t } = useLanguage();
  const birthday = theme.category === "birthday";
  const photoCard = birthdayThemeAssets[theme.id]?.photoCard;
  if (["football-club", "ballerina", "cobalt-cheers", "ribbon-social", "strawberry-social", "paper-garland", "pastel-disco", "checkerboard-cheers", "velvet-post", "disco-scrapbook", "pink-post"].includes(theme.visual)) return (
    <div className={`theme-invitation-card invitation-preview-art full-image-cover preview-${theme.visual} is-large`} style={{ "--cover-image": `url("${birthdayThemeAssets[theme.id].coverImage}")` }} aria-label={t("themeCanvas.aria", { name: t(`themes.${theme.id}.name`) })}>
      {["cobalt-cheers", "ribbon-social"].includes(theme.visual) ? <ReferenceSocialPoster variant={theme.visual} name={event.hostName} age={event.age} date={event.date} time={event.time} location={event.location} line={event.description} /> : <FullImageInvitationPoster variant={theme.visual} title={event.title} line={event.description} date={`${event.date} · ${event.time}`} location={event.location} />}
    </div>
  );
  if (photoCard) return (
    <div className="theme-invitation-card modern-toast-invitation photo-invitation-card" style={photoCardStyle(photoCard)} aria-label={t("themeCanvas.aria", { name: t(`themes.${theme.id}.name`) })}>
      <PhotoInvitationPoster photoCard={photoCard} name={event.hostName} age={event.age} turns={t("modernToast.turns", { age: event.age })} opening={t("modernToast.celebration")} closing={t("invitations.invited")} details={`${event.date} · ${event.time} · ${event.location}`} />
    </div>
  );
  return (
    <div className="theme-invitation-card" aria-label={t("themeCanvas.aria", { name: t(`themes.${theme.id}.name`) })}>
      <span className="theme-invite-top">11:11 {theme.decor && <span aria-hidden="true">✦</span>} {t(birthday ? "themeCanvas.birthdayInvite" : "themeCanvas.weddingInvite")}</span>
      {theme.decor && <span className="theme-invite-ornament" aria-hidden="true">{theme.decor}</span>}
      <p className="theme-invite-opening">{story.inviteOpening}</p>
      {birthday ? (
        <div className="theme-invite-names theme-invite-birthday"><span>{event.hostName}’s</span><em>{event.celebrationName}</em></div>
      ) : (
        <div className="theme-invite-names theme-invite-wedding"><span>{event.brideName}</span><em>&amp;</em><span>{event.groomName}</span></div>
      )}
      <span className="theme-invite-divider" aria-hidden="true" />
      <p className="theme-invite-message">{story.inviteMessage}</p>
      <div className="theme-invite-facts"><span>{event.date}</span><span>{event.time} · {event.location}</span></div>
      <span className="theme-invite-bottom">{story.inviteFooter}</span>
      <span className="theme-invite-shape shape-one" aria-hidden="true" />
      <span className="theme-invite-shape shape-two" aria-hidden="true" />
    </div>
  );
}

function Gallery({ theme, story }) {
  const { t } = useLanguage();
  const names = [0, 1, 2, 3].map((index) => t(`themeCanvas.gallery.${theme.category}.${index}`));
  return (
    <section id="gallery" className="theme-world-gallery theme-world-section">
      <div className="theme-world-section-heading"><span>{t("themeCanvas.gallery.label")}</span><h3>{story.galleryTitle}</h3><p>{story.galleryText}</p></div>
      <div className="theme-world-gallery-grid">
        {names.map((name, index) => <figure className={`theme-world-image theme-image-${index + 1}`} key={name}><div role="img" aria-label={name} /><figcaption><span>0{index + 1}</span>{name}</figcaption></figure>)}
      </div>
    </section>
  );
}

function CompactCanvas({ theme, event }) {
  const { t } = useLanguage();
  return (
    <div className={`theme-canvas theme-${theme.visual} theme-compact-world composition-${theme.layout}`} aria-hidden="true">
      <span className="theme-compact-top">11:11 <span>{t(`common.${theme.category}`)}</span></span>
      {theme.decor && <span className="theme-compact-ornament">{theme.decor}</span>}
      <div className="theme-compact-copy"><span>{t("invitations.invited")}</span><strong>{event.title}</strong><small>{event.date} · {event.location}</small></div>
      <span className="theme-compact-photo" />
    </div>
  );
}

export default function ThemeCanvas({ theme, event, compact = false, moduleId }) {
  const { t } = useLanguage();
  if (compact) return <CompactCanvas theme={theme} event={event} />;

  const story = themeStories[theme.visual];
  const birthday = theme.category === "birthday";
  const decoration = normalizeBirthdayAsset(birthdayThemeAssets[theme.id]?.invitation?.[0])?.image;
  const photoCard = birthdayThemeAssets[theme.id]?.photoCard;
  return (
    <article className={`theme-canvas theme-${theme.visual} theme-experience composition-${theme.layout} theme-${theme.category}${photoCard ? " photo-theme-experience" : ""}`} style={{ ...(decoration ? { "--world-decoration": `url("${decoration}")` } : {}), ...photoCardStyle(photoCard) }}>
      <div className="theme-world-nav"><span>11:11 {theme.decor && <b aria-hidden="true">✦</b>} {t(`themes.${theme.id}.name`)}</span><nav aria-label={t("themeCanvas.nav")}><a href="#invitation">{t("themeCanvas.nav.invitation")}</a><a href="#details">{t("themeCanvas.nav.details")}</a><a href="#gallery">{t("themeCanvas.nav.moments")}</a></nav></div>
      <section className="theme-world-hero">
        {theme.decor && <span className="theme-world-hero-watermark" aria-hidden="true">{theme.decor}</span>}
        <div className="theme-world-hero-copy"><span className="theme-world-eyebrow">{story.eyebrow}</span><h2>{event.title}</h2><p>{story.heroLine}</p><div className="theme-world-hero-date"><span>{event.date}</span><span>{event.location}</span></div><a className="theme-world-button" href="#invitation">{t("themeCanvas.open")} <Icon name="arrow-down-right" size={18} /></a></div>
        <div className="theme-world-hero-visual" aria-hidden="true"><span className="theme-world-hero-photo" />{theme.decor && <span className="theme-world-hero-seal">{theme.decor}</span>}<span className="theme-world-hero-caption">{story.photoTag}</span></div>
        <span className="theme-world-scroll">{t("themeCanvas.scroll")} <Icon name="arrow-down" size={18} /></span>
      </section>
      <div className="theme-world-ticker" aria-hidden="true"><span>{story.ticker}</span>{theme.decor && <span>{theme.decor}</span>}<span>{story.ticker}</span>{theme.decor && <span>{theme.decor}</span>}</div>
      <section className="theme-world-story theme-world-section"><div className="theme-world-story-lead"><span>{t("themeCanvas.story")}</span><h3>{story.storyTitle}</h3></div><div className="theme-world-story-body"><p>{story.storyText}</p><span>{story.storySignoff}</span></div></section>
      <section id="invitation" className="theme-world-invitation theme-world-section"><div className="theme-world-section-heading"><span>{t("themeCanvas.invitation.label")}</span><h3>{t("themeCanvas.invitation.title")}</h3><p>{t("themeCanvas.invitation.description")}</p></div><Invitation theme={theme} event={event} story={story} /></section>
      <section id="details" className="theme-world-details theme-world-section"><div className="theme-world-section-heading"><span>{t("themeCanvas.celebration")}</span><h3>{t(birthday ? "themeCanvas.celebrateBirthday" : "themeCanvas.celebrateWedding")}</h3></div><div className="theme-world-detail-grid"><div><span>{t("themeCanvas.when")}</span><strong>{event.date}</strong><small>{t("themeCanvas.at", { time: event.time })}</small></div><div><span>{t("themeCanvas.where")}</span><strong>{event.location}</strong><small>{t(birthday ? "themeCanvas.birthdayShoes" : "themeCanvas.weddingSeeYou")}</small></div><div><span>{t("themeCanvas.countdown")}</span><strong>{t("themeCanvas.days", { count: daysUntil(event.dateISO) })}</strong><small>{t("themeCanvas.until")}</small></div></div></section>
      <Gallery theme={theme} story={story} />
      <section className="theme-world-community theme-world-section"><div className="theme-world-community-intro"><span>{t("themeCanvas.community")}</span><h3>{story.communityTitle}</h3><p>{story.communityText}</p></div><div className="theme-world-module"><ThemeModulePreview moduleId={moduleId} event={event} /></div></section>
      <section className="theme-world-rsvp theme-world-section"><span>{t("themeCanvas.rsvp")}</span><h3>{story.rsvpTitle}</h3><p>{story.rsvpText}</p><RSVPPreview guest={demoGuest} /></section>
      <footer className="theme-world-footer"><span>11:11 {theme.decor && <b aria-hidden="true">✦</b>}</span><span>{story.footer}</span><span>{event.date}</span></footer>
    </article>
  );
}
