import { formatCardDate, localizeCardRecord } from "../../localization/cardCopy.js";
import Icon from "../../components/ui/Icon.jsx";
import RSVPPreview from "../../modules/components/RSVPPreview.jsx";
import { demoGuest } from "../data/demoGuests.js";
import ThemeModulePreview from "../../modules/components/ThemeModulePreview.jsx";
import { themeStories } from "../data/themeStories.js";
import { birthdayThemeAssets } from "../../invitations/data/birthdayAssets.js";
import { useLanguage } from "../../localization/LanguageContext.jsx";
import { InvitationArtwork } from "../../invitations/components/InvitationCard.jsx";
import { invitationTemplates } from "../../invitations/data/templates.js";
import { normalizeBirthdayAsset, photoCardStyle } from "../../invitations/data/assetPresentation.js";

function daysUntil(isoDate) {
  return Math.max(0, Math.ceil((new Date(isoDate).getTime() - Date.now()) / 86400000));
}

function Invitation({ theme, event, story, template }) {
  const { language, t } = useLanguage();
  const compactDate = formatCardDate(event.dateISO, language, t);
  const birthday = theme.category === "birthday";
  if ((template?.visualAssets?.christeningCard || theme.subcategory === "gender-reveal" || theme.subcategory === "bridal-party" || birthday || ["ink-and-ivy", "garden-dance", "blue-pour", "heart-hideaway", "tipsy-together", "blue-clink", "wedding-day-notes", "celebration-table", "little-vows", "date-and-dinner", "our-people", "happily-away", "first-dance", "rose-letter", "sage-letter", "side-by-side", "come-rain-or-shine", "ribbon-revel", "ivory-vows", "garden-table", "linked-steps", "colorful-company", "heartmarked", "portrait-promise", "sweet-snapshot", "happy-table", "watercolor-banquet", "ring-and-spark", "golden-promise", "cherry-toast", "little-yes", "blush-lift"].includes(theme.visual)) && template) return (
    <InvitationArtwork
      template={template}
      large
      className="theme-invitation-card"
      ariaLabel={t("themeCanvas.aria", { name: t(`themes.${theme.id}.name`) })}
      sample={{
        title: event.title, name: event.hostName, namePossessive: event.hostNamePossessive, age: event.age ?? 25,
        posterName: event.hostName, posterAge: event.age ?? 25, posterOccasion: event.celebrationName,
        line: event.description,
        date: ["cobalt-cheers", "ribbon-social", "wedding-day-notes", "date-and-dinner", "colorful-company"].includes(theme.visual) ? compactDate : theme.subcategory === "gender-reveal" ? compactDate : `${compactDate} · ${event.time}`,
        time: event.time, location: event.location, details: `${compactDate} · ${event.time} · ${event.location}`,
      }}
    />
  );
  return (
    <div className="theme-invitation-card" aria-label={t("themeCanvas.aria", { name: t(`themes.${theme.id}.name`) })}>
      <span className="theme-invite-top">11:11  {t(birthday ? "themeCanvas.birthdayInvite" : "themeCanvas.weddingInvite")}</span>
      {theme.decor && <span className="theme-invite-ornament" aria-hidden="true">{theme.decor}</span>}
      <p className="theme-invite-opening">{story.inviteOpening}</p>
      {birthday ? (
        <div className="theme-invite-names theme-invite-birthday"><span>{event.hostNamePossessive ?? t("cards.possessive", { name: event.hostName })}</span><em>{event.celebrationName}</em></div>
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
  const names = [0, 1, 2, 3].map((index) => t(theme.subcategory === "bridal-party" ? `themeCanvas.gallery.bridal.${index}` : `themeCanvas.gallery.${theme.category}.${index}`));
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

  const story = localizeCardRecord("stories", theme.visual, themeStories[theme.visual], t);
  const birthday = theme.category === "birthday";
  const template = invitationTemplates.find((item) => item.themeId === theme.id);
  const assets = template?.visualAssets ?? birthdayThemeAssets[theme.id];
  const decoration = normalizeBirthdayAsset(assets?.invitation?.[0])?.image;
  const photoCard = assets?.photoCard;
  const bridal = theme.subcategory === "bridal-party";
  return (
    <article className={`theme-canvas theme-${theme.visual} theme-experience composition-${theme.layout} theme-${theme.category}${photoCard ? " photo-theme-experience" : ""}`} style={{ ...(decoration ? { "--world-decoration": `url("${decoration}")` } : {}), ...((birthday || theme.subcategory === "bridal-party") && assets?.coverImage ? { "--world-photo": `url("${assets.coverImage}")` } : {}), ...photoCardStyle(photoCard) }}>
      <div className="theme-world-nav"><span>11:11  {t(`themes.${theme.id}.name`)}</span><nav aria-label={t("themeCanvas.nav")}><a href="#invitation">{t("themeCanvas.nav.invitation")}</a><a href="#details">{t("themeCanvas.nav.details")}</a><a href="#gallery">{t("themeCanvas.nav.moments")}</a>{(birthday || bridal) && <a className="theme-world-nav-rsvp" href="#rsvp">{t("themeCanvas.nav.rsvp")}</a>}</nav></div>
      <section className="theme-world-hero">
        {theme.decor && <span className="theme-world-hero-watermark" aria-hidden="true">{theme.decor}</span>}
        <div className="theme-world-hero-copy"><span className="theme-world-eyebrow">{story.eyebrow}</span><h2>{event.title}</h2><p>{story.heroLine}</p><div className="theme-world-hero-date"><span>{event.date}</span><span>{event.location}</span></div><a className="theme-world-button" href="#invitation">{t("themeCanvas.open")} <Icon name="arrow-down-right" size={18} /></a></div>
        <div className="theme-world-hero-visual" aria-hidden="true"><span className="theme-world-hero-photo" />{theme.decor && <span className="theme-world-hero-seal">{theme.decor}</span>}<span className="theme-world-hero-caption">{story.photoTag}</span></div>
        <span className="theme-world-scroll">{t("themeCanvas.scroll")} <Icon name="arrow-down" size={18} /></span>
      </section>
      <div className="theme-world-ticker" aria-hidden="true"><span>{story.ticker}</span>{theme.decor && <span>{theme.decor}</span>}<span>{story.ticker}</span>{theme.decor && <span>{theme.decor}</span>}</div>
      <section className="theme-world-story theme-world-section"><div className="theme-world-story-lead"><span>{t("themeCanvas.story")}</span><h3>{story.storyTitle}</h3></div><div className="theme-world-story-body"><p>{story.storyText}</p><span>{story.storySignoff}</span></div></section>
      <section id="invitation" className="theme-world-invitation theme-world-section"><div className="theme-world-section-heading"><span>{t("themeCanvas.invitation.label")}</span><h3>{t("themeCanvas.invitation.title")}</h3><p>{t("themeCanvas.invitation.description")}</p></div><Invitation theme={theme} event={event} story={story} template={template} /></section>
      <section id="details" className="theme-world-details theme-world-section"><div className="theme-world-section-heading"><span>{t("themeCanvas.celebration")}</span><h3>{t(bridal ? "project.bridal-party" : birthday ? "themeCanvas.celebrateBirthday" : "themeCanvas.celebrateWedding")}</h3></div><div className="theme-world-detail-grid"><div><span>{t("themeCanvas.when")}</span><strong>{event.date}</strong><small>{t("themeCanvas.at", { time: event.time })}</small></div><div><span>{t("themeCanvas.where")}</span><strong>{event.location}</strong><small>{t(birthday ? "themeCanvas.birthdayShoes" : "themeCanvas.weddingSeeYou")}</small></div><div><span>{t("themeCanvas.countdown")}</span><strong>{t("themeCanvas.days", { count: daysUntil(event.dateISO) })}</strong><small>{t("themeCanvas.until")}</small></div></div></section>
      <Gallery theme={theme} story={story} />
      <section className="theme-world-community theme-world-section"><div className="theme-world-community-intro"><span>{t("themeCanvas.community")}</span><h3>{story.communityTitle}</h3><p>{story.communityText}</p></div><div className="theme-world-module"><ThemeModulePreview moduleId={moduleId} event={event} /></div></section>
      <section id="rsvp" className="theme-world-rsvp theme-world-section"><span>{t("themeCanvas.rsvp")}</span><h3>{story.rsvpTitle}</h3><p>{story.rsvpText}</p><RSVPPreview guest={demoGuest} /></section>
      <footer className="theme-world-footer"><span>11:11 </span><span>{story.footer}</span><span>{event.date}</span></footer>
    </article>
  );
}
