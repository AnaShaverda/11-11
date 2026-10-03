import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../../localization/LanguageContext.jsx";
import Icon from "../../components/ui/Icon.jsx";
import OpeningCelebration from "./OpeningCelebration.jsx";
import DecorativeDoors from "./DecorativeDoors.jsx";
import { getEntranceTransition } from "../data/guestEntranceMotion.js";

export default function InvitationEntrance({ settings, design, title, reducedMotion, onComplete, children }) {
  const { t } = useLanguage();
  const entrance = settings.entrance;
  const [phase, setPhase] = useState(entrance === "immediate" ? "opened" : "sealed");
  const [celebrating, setCelebrating] = useState(entrance === "immediate");
  const artwork = useRef(null);
  const viewButton = useRef(null);
  const openedByGuest = useRef(false);

  useEffect(() => {
    const transition = getEntranceTransition(entrance, phase, reducedMotion);
    if (!transition) return;
    if (!transition.duration) { setPhase(transition.next); return; }
    const celebrationTimer = transition.celebrationDelay === null ? null : setTimeout(() => setCelebrating(true), transition.celebrationDelay);
    const revealTimer = setTimeout(() => setPhase(transition.next), transition.duration);
    return () => { clearTimeout(celebrationTimer); clearTimeout(revealTimer); };
  }, [entrance, phase, reducedMotion]);

  useEffect(() => {
    if (phase === "preview" && openedByGuest.current) viewButton.current?.focus({ preventScroll: true });
    if (phase === "opened") {
      onComplete();
      if (openedByGuest.current) artwork.current?.focus({ preventScroll: true });
    }
  }, [phase, onComplete]);

  function openInvitation() {
    openedByGuest.current = true;
    const page = artwork.current.closest(".guest-preview-page");
    if (page?.dataset.previewMode === "mobile") {
      const cardTop = artwork.current.closest(".guest-main-card").getBoundingClientRect().top + window.scrollY;
      const toolbarHeight = page.querySelector(".guest-preview-toolbar").getBoundingClientRect().height;
      window.scrollTo({ top: Math.max(0, cardTop - toolbarHeight), behavior: "instant" });
    }
    setPhase(reducedMotion ? entrance === "doors" ? "preview" : "opened" : "opening");
  }

  return <div className={`guest-invitation-entrance entrance-${entrance} is-${phase}`} data-entrance-state={phase} data-entrance={entrance}>
    <div className="guest-letter-window">
      <div className="guest-invitation-artwork" ref={artwork} tabIndex={-1} aria-label={t("guestCards.invitation")}
        aria-hidden={phase === "sealed" || phase === "opening" ? "true" : undefined} inert={phase !== "opened"}>
        {children}
      </div>
    </div>
    {entrance === "envelope" && phase !== "opened" && <div className="guest-envelope-scene">
      <p className="guest-envelope-greeting">{t("guestCards.envelope.forYou")}</p>
      <div className="guest-envelope guest-envelope-back-layer" aria-hidden="true">
        <div className="guest-envelope-back" />
      </div>
      <div className="guest-envelope guest-envelope-flap-layer" aria-hidden="true">
        <svg className="guest-envelope-flap" viewBox="0 0 420 168"><path d="M1 1H419L210 166Z" /></svg>
      </div>
      <div className="guest-envelope guest-envelope-front-layer" aria-hidden="true">
        <svg className="guest-envelope-pocket" viewBox="0 0 420 280">
          <path className="guest-envelope-left" d="M0 0L210 150L0 280Z" />
          <path className="guest-envelope-right" d="M420 0L210 150L420 280Z" />
          <path className="guest-envelope-bottom" d="M0 280V264L210 126L420 264V280Z" />
          <path className="guest-envelope-fold" d="M0 264L210 126L420 264" />
        </svg>
        <span className="guest-envelope-title">{title}</span>
      </div>
      <div className="guest-envelope guest-envelope-seal-layer" aria-hidden="true"><span className="guest-envelope-seal"><Icon name="heart" size={21} /></span></div>
      {phase === "sealed" && <button type="button" className="guest-envelope-open" onClick={openInvitation}>
        <span>{t("guestCards.envelope.open")} <Icon name="arrow-up-right" size={17} /></span>
      </button>}
    </div>}
    {entrance === "doors" && phase !== "opened" && <DecorativeDoors phase={phase} title={title} onOpen={openInvitation}
      onView={() => setPhase(reducedMotion ? "opened" : "finishing")} viewButton={viewButton} />}
    {celebrating && <OpeningCelebration key={`${settings.openingEffect}:${settings.openingIntensity}:${settings.openingSpeed}:${settings.openingDuration}:${settings.openingPalette}`} settings={settings} design={design} />}
    {phase === "opened" && openedByGuest.current && <span className="guest-screen-reader" role="status">{t("guestCards.envelope.opened")}</span>}
    {phase === "opening" && <span className="guest-screen-reader" role="status">{t("guestCards.doors.opening")}</span>}
  </div>;
}
