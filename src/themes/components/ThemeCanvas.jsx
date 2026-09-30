import { useState } from "react";
import ThemeModulePreview from "../../modules/components/ThemeModulePreview.jsx";
import { themeStories } from "../data/themeStories.js";

function daysUntil(isoDate) {
  return Math.max(0, Math.ceil((new Date(isoDate).getTime() - Date.now()) / 86400000));
}

function Invitation({ theme, event, story }) {
  const birthday = theme.category === "birthday";
  return (
    <div className="theme-invitation-card" aria-label={`${theme.name} invitation design`}>
      <span className="theme-invite-top">11:11 <span aria-hidden="true">✦</span> {birthday ? "A BIRTHDAY INVITATION" : "A WEDDING INVITATION"}</span>
      <span className="theme-invite-ornament" aria-hidden="true">{theme.decor}</span>
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
  const names = theme.category === "birthday"
    ? ["The dance floor", "Make a wish", "Our people", "One more toast"]
    : ["Together", "The table", "The promise", "The celebration"];
  return (
    <section id="gallery" className="theme-world-gallery theme-world-section">
      <div className="theme-world-section-heading"><span>03 / MOMENTS</span><h3>{story.galleryTitle}</h3><p>{story.galleryText}</p></div>
      <div className="theme-world-gallery-grid">
        {names.map((name, index) => <figure className={`theme-world-image theme-image-${index + 1}`} key={name}><div role="img" aria-label={name} /><figcaption><span>0{index + 1}</span>{name}</figcaption></figure>)}
      </div>
    </section>
  );
}

function CompactCanvas({ theme, event }) {
  return (
    <div className={`theme-canvas theme-${theme.visual} theme-compact-world composition-${theme.layout}`} aria-hidden="true">
      <span className="theme-compact-top">11:11 <span>{theme.category.toUpperCase()}</span></span>
      <span className="theme-compact-ornament">{theme.decor}</span>
      <div className="theme-compact-copy"><span>YOU’RE INVITED</span><strong>{event.title}</strong><small>{event.date} · {event.location}</small></div>
      <span className="theme-compact-photo" />
    </div>
  );
}

export default function ThemeCanvas({ theme, event, compact = false, moduleId }) {
  const [replyPreview, setReplyPreview] = useState(false);
  if (compact) return <CompactCanvas theme={theme} event={event} />;

  const story = themeStories[theme.visual];
  const birthday = theme.category === "birthday";
  return (
    <article className={`theme-canvas theme-${theme.visual} theme-experience composition-${theme.layout} theme-${theme.category}`}>
      <div className="theme-world-nav"><span>11:11 <b aria-hidden="true">✦</b> {theme.name}</span><nav aria-label="Event preview sections"><a href="#invitation">Invitation</a><a href="#details">Details</a><a href="#gallery">Moments</a></nav></div>
      <section className="theme-world-hero">
        <span className="theme-world-hero-watermark" aria-hidden="true">{theme.decor}</span>
        <div className="theme-world-hero-copy"><span className="theme-world-eyebrow">{story.eyebrow}</span><h2>{event.title}</h2><p>{story.heroLine}</p><div className="theme-world-hero-date"><span>{event.date}</span><span>{event.location}</span></div><a className="theme-world-button" href="#invitation">Open the invitation <span aria-hidden="true">↘</span></a></div>
        <div className="theme-world-hero-visual" aria-hidden="true"><span className="theme-world-hero-photo" /><span className="theme-world-hero-seal">{theme.decor}</span><span className="theme-world-hero-caption">{story.photoTag}</span></div>
        <span className="theme-world-scroll">SCROLL TO EXPLORE <span aria-hidden="true">↓</span></span>
      </section>
      <div className="theme-world-ticker" aria-hidden="true"><span>{story.ticker}</span><span>{theme.decor}</span><span>{story.ticker}</span><span>{theme.decor}</span></div>
      <section className="theme-world-story theme-world-section"><div className="theme-world-story-lead"><span>01 / THE STORY</span><h3>{story.storyTitle}</h3></div><div className="theme-world-story-body"><p>{story.storyText}</p><span>{story.storySignoff}</span></div></section>
      <section id="invitation" className="theme-world-invitation theme-world-section"><div className="theme-world-section-heading"><span>02 / THE INVITATION</span><h3>A first hello, made for this moment.</h3><p>This is how the celebration arrives: a little piece of the day, before the day begins.</p></div><Invitation theme={theme} event={event} story={story} /></section>
      <section id="details" className="theme-world-details theme-world-section"><div className="theme-world-section-heading"><span>THE CELEBRATION</span><h3>{birthday ? "Come celebrate with us." : "Join us for the day."}</h3></div><div className="theme-world-detail-grid"><div><span>WHEN</span><strong>{event.date}</strong><small>At {event.time}</small></div><div><span>WHERE</span><strong>{event.location}</strong><small>{birthday ? "Bring your favorite dancing shoes" : "We can’t wait to see you there"}</small></div><div><span>COUNTING DOWN</span><strong>{daysUntil(event.dateISO)} days</strong><small>Until the celebration</small></div></div></section>
      <Gallery theme={theme} story={story} />
      <section className="theme-world-community theme-world-section"><div className="theme-world-community-intro"><span>04 / YOUR PEOPLE</span><h3>{story.communityTitle}</h3><p>{story.communityText}</p></div><div className="theme-world-module"><ThemeModulePreview moduleId={moduleId} event={event} /></div></section>
      <section className="theme-world-rsvp theme-world-section"><span>05 / SAVE YOUR PLACE</span><h3>{story.rsvpTitle}</h3><p>{story.rsvpText}</p><button type="button" className="theme-world-button" onClick={() => setReplyPreview((value) => !value)} aria-pressed={replyPreview}>{replyPreview ? "Reply previewed ✓" : "Preview your reply ↗"}</button><small>{replyPreview ? "A real event page would send this response to the host." : "Interactive example · no response is saved"}</small></section>
      <footer className="theme-world-footer"><span>11:11 <b aria-hidden="true">✦</b></span><span>{story.footer}</span><span>{event.date}</span></footer>
    </article>
  );
}
