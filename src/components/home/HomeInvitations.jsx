import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import InvitationCard from "../../invitations/components/InvitationCard.jsx";
import { invitationTemplates } from "../../invitations/data/templates.js";
import { useLanguage } from "../../localization/LanguageContext.jsx";
import Icon from "../ui/Icon.jsx";

const featured = ["birthday-retro-pop", "birthday-painted-summer", "birthday-pink-glam", "wedding-heartmarked"]
  .map((slug) => invitationTemplates.find((template) => template.slug === slug));

export default function HomeInvitations() {
  const { t } = useLanguage();
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);

  function updatePosition() {
    const track = trackRef.current;
    const slides = [...track.children];
    const start = slides[0].offsetLeft;
    const nearest = slides.reduce((best, slide, index) =>
      Math.abs(slide.offsetLeft - start - track.scrollLeft) < Math.abs(slides[best].offsetLeft - start - track.scrollLeft) ? index : best, 0);
    setActive(nearest);
  }

  function goTo(index) {
    const track = trackRef.current;
    const target = Math.max(0, Math.min(featured.length - 1, index));
    track.scrollTo({
      left: track.children[target].offsetLeft - track.children[0].offsetLeft,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    });
  }

  function onKeyDown(event) {
    if (trackRef.current.scrollWidth <= trackRef.current.clientWidth) return;
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    goTo(active + (event.key === "ArrowRight" ? 1 : -1));
  }

  return (
    <section className="home-invitations" aria-labelledby="home-invitations-title">
      <div className="home-section-top">
        <div><span className="home-section-index">{t("home.invitations.index")}</span><h2 id="home-invitations-title">{t("home.invitations.title")}</h2><p>{t("home.invitations.description")}</p></div>
        <Link className="home-invitations-link" to="/invitations">{t("common.exploreInvitations")} <Icon name="arrow-up-right" size={18} /></Link>
      </div>
      <div ref={trackRef} className="home-invitations-track" data-scroll-restoration="home-invitations" role="list" aria-label={t("home.invitations.title")} onScroll={updatePosition} onKeyDown={onKeyDown}>
        {featured.map((template) => <div key={template.id} className="home-invitation-slide" role="listitem"><InvitationCard template={template} /></div>)}
      </div>
      <div className="home-carousel-controls" role="group" aria-label={t("home.carousel.controls")}>
        <button type="button" onClick={() => goTo(active - 1)} disabled={active === 0} aria-label={t("home.carousel.previous")}><Icon name="arrow-left" size={20} /></button>
        <div className="home-carousel-position"><div className="home-carousel-dots" aria-hidden="true">{featured.map((template, index) => <span key={template.id} className={index === active ? "is-active" : ""} />)}</div><span role="status">{t("home.carousel.position", { current: active + 1, total: featured.length })}</span></div>
        <button type="button" onClick={() => goTo(active + 1)} disabled={active === featured.length - 1} aria-label={t("home.carousel.next")}><Icon name="arrow-right" size={20} /></button>
      </div>
    </section>
  );
}
