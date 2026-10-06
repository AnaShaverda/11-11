import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { weddingThemeStyle } from "./WeddingThemeDecoration.jsx";
import { useLanguage } from "../../localization/LanguageContext.jsx";
import Icon from "../../components/ui/Icon.jsx";
import OpeningCelebration from "./OpeningCelebration.jsx";
import DecorativeDoors from "./DecorativeDoors.jsx";
import EmbossedEnvelope from "./EmbossedEnvelope.jsx";
import { getWaxMonogram } from "./EmbossedWaxSeal.jsx";
import { getEntranceTransition } from "../data/guestEntranceMotion.js";

export default function InvitationEntrance({ settings, design, title, initials, reducedMotion, onComplete, children }) {
  const { t } = useLanguage();
  const laceEnvelope = ["bordeauxLaceEnvelope", "greenLaceEnvelope"].includes(settings.entrance);
  const verticalEnvelope = ["redPortraitEnvelope", "pastelGreenEnvelope", "embossedIvoryEnvelope", "embossedSageEnvelope", "embossedBurgundyEnvelope"].includes(settings.entrance);
  const paperVariant = settings.entrance === "embossedIvoryEnvelope" ? "embossed-ivory" : settings.entrance === "embossedSageEnvelope" ? "embossed-sage" : settings.entrance === "embossedBurgundyEnvelope" ? "embossed-burgundy" : settings.entrance === "pastelGreenEnvelope" ? "pastel-green" : verticalEnvelope ? "floral" : settings.entrance === "ivoryPaperEnvelope" ? "ivory" : settings.entrance === "greenPineEnvelope" ? "pine" : settings.entrance === "greenMoonEnvelope" ? "moon" : settings.entrance === "redFloralEnvelope" ? "floral" : settings.entrance === "redGoldEnvelope" ? "gold" : settings.entrance === "redVelvetEnvelope" ? "velvet" : settings.entrance === "pinkPaperEnvelope" ? "pink" : settings.entrance === "bluePaperEnvelope" ? "blue" : null;
  const monogram = getWaxMonogram(title, initials);
  const entrance = paperVariant ? "envelope" : settings.entrance === "doorsBrown" ? "doors" : settings.entrance;
  const embossedVariant = entrance === "embossedIvoryEnvelope" ? "ivory" : entrance === "embossedSageEnvelope" ? "sage" : null;
  const [phase, setPhase] = useState(entrance === "immediate" ? "opened" : "sealed");
  const [celebrating, setCelebrating] = useState(entrance === "immediate");
  const artwork = useRef(null);
  const openedByGuest = useRef(false);

  useEffect(() => {
    const transition = getEntranceTransition(settings.entrance, phase, reducedMotion);
    if (!transition) return;
    if (!transition.duration) { setPhase(transition.next); return; }
    const celebrationTimer = transition.celebrationDelay === null ? null : setTimeout(() => setCelebrating(true), transition.celebrationDelay);
    const revealTimer = setTimeout(() => setPhase(transition.next), transition.duration);
    return () => { clearTimeout(celebrationTimer); clearTimeout(revealTimer); };
  }, [entrance, settings.entrance, phase, reducedMotion]);

  useEffect(() => {
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
    setPhase(reducedMotion ? "opened" : "opening");
  }

  return <div className={`guest-invitation-entrance entrance-${entrance} ${paperVariant ? `paper-envelope paper-envelope-${paperVariant}${verticalEnvelope ? " is-vertical-envelope" : ""}` : ""} ${laceEnvelope ? `is-lace-envelope${settings.entrance === "greenLaceEnvelope" ? " is-green-lace" : ""}` : ""} is-${phase}`} data-entrance-state={phase} data-entrance={entrance} style={design.weddingTheme && (entrance === "envelope" || entrance === "doors") ? { "--guest-paper": design.paper, "--guest-ink": design.ink, "--guest-accent": design.accent } : undefined}>
    <div className="guest-letter-window">
      <div className="guest-invitation-artwork" ref={artwork} tabIndex={-1} aria-label={t("guestCards.invitation")}
        aria-hidden={phase === "sealed" || phase === "opening" ? "true" : undefined} inert={phase !== "opened"}>
        {children}
      </div>
    </div>
    {laceEnvelope && phase !== "opened" && <div className="bordeaux-lace-scene" aria-hidden={phase !== "sealed" ? "true" : undefined}>
      <div className="bordeaux-lace-fold lace-fold-top" aria-hidden="true" />
      <div className="bordeaux-lace-fold lace-fold-bottom" aria-hidden="true" />
      <div className="bordeaux-lace-fold lace-fold-right" aria-hidden="true" />
      <div className="bordeaux-paper-hinge" aria-hidden="true"><div className="bordeaux-paper-fold" /><span className="bordeaux-wax">{monogram}</span></div>
      {phase === "sealed" && <button type="button" className="bordeaux-lace-open" aria-label={t("guestCards.envelope.open")} onClick={openInvitation} />}
    </div>}
    {verticalEnvelope && phase !== "opened" && <div className="guest-envelope-scene vertical-double-scene">
      <div className="vertical-envelope-wing wing-left"><img className="vertical-wing-flowers" src="/images/opening/red-envelope-flowers.png" alt="" /></div>
      <div className="vertical-envelope-wing wing-right"><img className="vertical-wing-flowers" src="/images/opening/red-envelope-flowers.png" alt="" /></div>
      <span className="vertical-envelope-wax">{monogram && <span>{monogram}</span>}</span>
      {phase === "sealed" && <button type="button" className="vertical-envelope-tap" aria-label={t("guestCards.envelope.open")} onClick={openInvitation} />}
    </div>}
    {entrance === "envelope" && !verticalEnvelope && phase !== "opened" && <div className="guest-envelope-scene">
      {paperVariant && <svg width="0" height="0" aria-hidden="true" style={{ position: "absolute" }}><defs><clipPath id="paper-flap-outline" clipPathUnits="objectBoundingBox"><path d="M0 0H1C1 .08 .98 .14 .94 .22L.53 .975Q.5 1.015 .47 .975L.06 .22C.02 .14 0 .08 0 0Z" /></clipPath><pattern id="envelope-photo-paper" width="420" height="280" patternUnits="userSpaceOnUse"><image href={`/images/opening/paper-envelope-${paperVariant}.png`} x="-420" y="-20" width="1260" height="840" preserveAspectRatio="none" /></pattern><linearGradient id="envelope-paper-face" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="var(--guest-paper)" /><stop offset=".5" stopColor="color-mix(in srgb,var(--guest-paper) 92%,white)" /><stop offset="1" stopColor="color-mix(in srgb,var(--guest-paper) 90%,var(--guest-ink))" /></linearGradient><linearGradient id="envelope-paper-flap" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="color-mix(in srgb,var(--guest-paper) 80%,white)" /><stop offset="1" stopColor="var(--guest-paper)" /></linearGradient><filter id="envelope-paper-grain" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".35 .55" numOctaves="4" stitchTiles="stitch" result="grain" /><feColorMatrix in="grain" type="saturate" values="0" /><feComponentTransfer><feFuncA type="linear" slope=".16" /></feComponentTransfer><feBlend in="SourceGraphic" mode="multiply" /></filter></defs></svg>}
      <p className="guest-envelope-greeting">{t("guestCards.envelope.forYou")}</p>
      <div className="guest-envelope guest-envelope-back-layer" aria-hidden="true">
        <div className="guest-envelope-back" />
      </div>
      <div className="guest-envelope guest-envelope-flap-layer" aria-hidden="true">
        {paperVariant ? <><div className="guest-envelope-flap paper-photo-flap" />{verticalEnvelope && <div className="guest-envelope-flap paper-photo-flap paper-opposite-flap" />}</> : <svg className="guest-envelope-flap" viewBox="0 0 420 168"><path d="M1 1H419L210 166Z" /></svg>}
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
      <div className="guest-envelope guest-envelope-seal-layer" aria-hidden="true">{settings.envelopeStamp && ["pink", "blue"].includes(paperVariant) && <span className="paper-envelope-stamp"><span className="paper-stamp-art"><img src={`/images/christening/${paperVariant === "velvet" ? "pink" : paperVariant}-dove.png`} alt="" /><span>{monogram || "♡"}</span></span></span>}{paperVariant === "floral" && <><img className="envelope-flower-drawing is-left" src="/images/opening/red-envelope-flowers.png" alt="" /><img className="envelope-flower-drawing is-right" src="/images/opening/red-envelope-flowers.png" alt="" /></>}<span className="guest-envelope-seal">{paperVariant && monogram ? <span className="paper-envelope-monogram">{monogram}</span> : <Icon name="heart" size={21} />}</span></div>
      {phase === "sealed" && <button type="button" className="guest-envelope-open" aria-label={t("guestCards.envelope.open")} onClick={openInvitation}>
        <span>{t("guestCards.envelope.open")} <Icon name="arrow-up-right" size={17} /></span>
      </button>}
    </div>}
    {embossedVariant && phase !== "opened" && createPortal(<EmbossedEnvelope variant={embossedVariant} phase={phase} title={title} initials={initials} style={design.weddingTheme ? weddingThemeStyle(design.weddingTheme) : undefined}
      openLabel={t("guestCards.envelope.open")} onOpen={openInvitation}>{children}</EmbossedEnvelope>, document.body)}
    {entrance === "doors" && phase !== "opened" && <DecorativeDoors variant={settings.entrance === "doorsBrown" ? "brown" : "white"} phase={phase} title={title} onOpen={openInvitation} />}
    {celebrating && <OpeningCelebration key={`${settings.openingEffect}:${settings.openingIntensity}:${settings.openingSpeed}:${settings.openingDuration}:${settings.openingPalette}`} settings={settings} design={design} />}
    {phase === "opened" && openedByGuest.current && <span className="guest-screen-reader" role="status">{t("guestCards.envelope.opened")}</span>}
    {phase === "opening" && <span className="guest-screen-reader" role="status">{t("guestCards.doors.opening")}</span>}
  </div>;
}
