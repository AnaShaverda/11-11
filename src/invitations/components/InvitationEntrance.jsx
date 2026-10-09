import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { weddingThemeStyle } from "./WeddingThemeDecoration.jsx";
import { useLanguage } from "../../localization/LanguageContext.jsx";
import InvitationArtwork from "./InvitationArtwork.jsx";
import InvitationMotif from "./InvitationMotif.jsx";
import OpeningCelebration from "./OpeningCelebration.jsx";
import DecorativeDoors from "./DecorativeDoors.jsx";
import StampedPaperOpening from "./StampedPaperOpening.jsx";
import ClassicBurgundyEnvelope from "./ClassicBurgundyEnvelope.jsx";
import EmbossedEnvelope from "./EmbossedEnvelope.jsx";
import { getWaxMonogram } from "./EmbossedWaxSeal.jsx";
import { getEntranceTransition } from "../data/guestEntranceMotion.js";

export default function InvitationEntrance({ settings, design, title, initials, reducedMotion, onComplete, paperTexture, sealArtwork, children }) {
  const { t } = useLanguage();
  const laceEnvelope = ["bordeauxLaceEnvelope", "greenLaceEnvelope", "roseFiberEnvelope"].includes(settings.entrance);
  const roseFiberEnvelope = settings.entrance === "roseFiberEnvelope";
  const verticalEnvelope = ["redPortraitEnvelope", "embossedIvoryEnvelope", "embossedSageEnvelope", "embossedBurgundyEnvelope"].includes(settings.entrance);
  const paperVariant = settings.entrance === "embossedIvoryEnvelope" ? "embossed-ivory" : settings.entrance === "embossedSageEnvelope" ? "embossed-sage" : settings.entrance === "embossedBurgundyEnvelope" ? "embossed-burgundy" : settings.entrance === "pastelGreenEnvelope" ? "pastel-green" : verticalEnvelope ? "floral" : settings.entrance === "ivoryPaperEnvelope" ? "ivory" : settings.entrance === "redVelvetEnvelope" ? "velvet" : settings.entrance === "pinkPaperEnvelope" ? "pink" : settings.entrance === "bluePaperEnvelope" ? "blue" : null;
  const softPaperEnvelope = ["ivory", "pink", "blue", "pastel-green"].includes(paperVariant);
  const mutedPaperTexture = ["pink", "blue", "pastel-green"].includes(paperVariant);
  const softPaperTexture = paperTexture ?? (paperVariant === "ivory" ? "/images/opening/ivory-open-pocket.webp" : paperVariant === "pastel-green" ? "/images/opening/pastel-green-plain-envelope.webp" : `/images/opening/paper-envelope-${paperVariant}.png`);
  const monogram = getWaxMonogram(title, initials);
  const entrance = paperVariant ? "envelope" : ["doorsBrown", "doorsBlueFloral"].includes(settings.entrance) ? "doors" : settings.entrance;
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
      const toolbarHeight = page.querySelector(".guest-preview-toolbar")?.getBoundingClientRect().height ?? 0;
      window.scrollTo({ top: Math.max(0, cardTop - toolbarHeight), behavior: "instant" });
    }
    setPhase(reducedMotion ? "opened" : "opening");
  }

  return <div className={`guest-invitation-entrance entrance-${entrance} ${entrance === "classicBurgundyEnvelope" ? "classic-burgundy-entrance" : ""} ${paperVariant ? `paper-envelope paper-envelope-${paperVariant}${softPaperEnvelope ? " paper-envelope-soft" : ""}${verticalEnvelope ? " is-vertical-envelope" : ""}` : ""} ${laceEnvelope ? `is-lace-envelope${settings.entrance === "greenLaceEnvelope" ? " is-green-lace" : ""}${settings.entrance === "roseFiberEnvelope" ? " is-rose-fiber" : ""}` : ""} is-${phase}`} data-entrance-state={phase} data-entrance={entrance} style={design.weddingTheme && (entrance === "envelope" || entrance === "doors") ? { "--guest-paper": design.paper, "--guest-ink": design.ink, "--guest-accent": design.accent } : undefined}>
    <div className="guest-letter-window">
      <div className="guest-invitation-artwork" ref={artwork} tabIndex={-1} aria-label={t("guestCards.invitation")}
        style={{ "--guest-paper": design.paper, "--guest-ink": design.ink, "--guest-accent": design.accent }}
        aria-hidden={phase === "sealed" || phase === "opening" ? "true" : undefined} inert={phase !== "opened"}>
        {children}
      </div>
    </div>
    {entrance === "classicBurgundyEnvelope" && phase !== "opened" && <ClassicBurgundyEnvelope phase={phase} onOpen={openInvitation} openLabel={t("guestCards.envelope.open")} />}
    {laceEnvelope && phase !== "opened" && <div className="bordeaux-lace-scene" aria-hidden={phase !== "sealed" ? "true" : undefined}>
      {roseFiberEnvelope && <svg className="rose-flap-clips" width="0" height="0" aria-hidden="true"><defs>
        <clipPath id="rose-flap-top" clipPathUnits="objectBoundingBox"><path d="M0 0 H1 C.91 .13 .73 .26 .58 .43 Q.5 .53 .42 .43 C.27 .26 .09 .13 0 0 Z" /></clipPath>
        <clipPath id="rose-flap-bottom" clipPathUnits="objectBoundingBox"><path d="M0 1 H1 C.91 .87 .73 .74 .58 .57 Q.5 .47 .42 .57 C.27 .74 .09 .87 0 1 Z" /></clipPath>
        <clipPath id="rose-flap-right" clipPathUnits="objectBoundingBox"><path d="M1 0 V1 C.83 .91 .68 .72 .54 .57 Q.46 .5 .54 .43 C.68 .28 .83 .09 1 0 Z" /></clipPath>
        <clipPath id="rose-flap-left" clipPathUnits="objectBoundingBox"><path d="M0 0 H.2 C.3 .14 .43 .35 .53 .45 Q.57 .5 .53 .55 C.43 .65 .3 .86 .2 1 H0 Z" /></clipPath>
      </defs></svg>}
      <div className="bordeaux-lace-fold lace-fold-top" aria-hidden="true" />
      <div className="bordeaux-lace-fold lace-fold-bottom" aria-hidden="true" />
      <div className="bordeaux-lace-fold lace-fold-right" aria-hidden="true" />
      <div className="bordeaux-paper-hinge" aria-hidden="true"><div className="bordeaux-paper-fold" /><span className="bordeaux-wax">{roseFiberEnvelope ? null : monogram}</span></div>
      {roseFiberEnvelope && <svg className="rose-curved-seams" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path d="M1 1 C9 17 19 29 30 39 Q38 46 44 45 M99 1 C84 15 68 31 56 45 M1 99 C16 85 32 69 44 55 M99 99 C84 85 68 69 56 55" /></svg>}
      {phase === "sealed" && <button type="button" className="bordeaux-lace-open" aria-label={t("guestCards.envelope.open")} onClick={openInvitation} />}
    </div>}
    {verticalEnvelope && phase !== "opened" && <div className="guest-envelope-scene vertical-double-scene">
      <div className="vertical-envelope-wing wing-left"><img className="vertical-wing-flowers" src="/images/opening/red-envelope-flowers.webp" alt="" /></div>
      <div className="vertical-envelope-wing wing-right"><img className="vertical-wing-flowers" src="/images/opening/red-envelope-flowers.webp" alt="" /></div>
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
        {softPaperEnvelope && <svg className="paper-envelope-folded-front" viewBox="0 0 500 356" preserveAspectRatio="none">
          <defs><pattern id="soft-envelope-paper" patternUnits="userSpaceOnUse" width="500" height="356">{mutedPaperTexture && <rect width="500" height="356" fill="var(--soft-paper-base)" />}<image href={softPaperTexture} x="-500" width="1500" height="1068" preserveAspectRatio="none" opacity={mutedPaperTexture ? .48 : 1} /></pattern></defs>
          <path className="paper-envelope-fold-side-left" d="M0 0 C4 2 12 7 19 14 L167 145 L0 356Z" />
          <path className="paper-envelope-fold-side-right" d="M500 0 C496 2 488 7 481 14 L333 145 L500 356Z" />
          <path className="paper-envelope-fold-bottom" d="M0 356 Q1 331 17 315 L167 145 H333 L483 315 Q499 331 500 356Z" />
          <path className="paper-envelope-fold-seam" d="M1 354 Q2 332 17 316 L167 145 H333 L483 316 Q498 332 499 354" />
        </svg>}
        <svg className="guest-envelope-pocket" viewBox="0 0 420 280">
          <path className="guest-envelope-left" d="M0 0L210 150L0 280Z" />
          <path className="guest-envelope-right" d="M420 0L210 150L420 280Z" />
          <path className="guest-envelope-bottom" d="M0 280V264L210 126L420 264V280Z" />
          <path className="guest-envelope-fold" d="M0 264L210 126L420 264" />
        </svg>
        
        <span className="guest-envelope-title">{title}</span>
      </div>
      <div className="guest-envelope guest-envelope-seal-layer" aria-hidden="true">{settings.envelopeStamp && ["pink", "blue"].includes(paperVariant) && <span className="paper-envelope-stamp"><span className="paper-stamp-art"><img src={`/images/christening/${paperVariant === "velvet" ? "pink" : paperVariant}-dove.png`} alt="" /><span>{monogram || <InvitationMotif name="heart" />}</span></span></span>}{paperVariant === "floral" && <><img className="envelope-flower-drawing is-left" src="/images/opening/red-envelope-flowers.webp" alt="" /><img className="envelope-flower-drawing is-right" src="/images/opening/red-envelope-flowers.webp" alt="" /></>}<span className="guest-envelope-seal">{sealArtwork ? <img className="guest-envelope-custom-seal" src={sealArtwork} alt="" /> : paperVariant && monogram ? <span className="paper-envelope-monogram">{monogram}</span> : <InvitationArtwork name="heart" size={21} />}</span></div>
      {phase === "sealed" && <button type="button" className="guest-envelope-open" aria-label={t("guestCards.envelope.open")} onClick={openInvitation}>
        <span>{t("guestCards.envelope.open")} <InvitationArtwork name="arrow-up-right" size={17} /></span>
      </button>}
    </div>}
    {embossedVariant && phase !== "opened" && createPortal(<EmbossedEnvelope variant={embossedVariant} phase={phase} title={title} initials={initials} style={design.weddingTheme ? weddingThemeStyle(design.weddingTheme) : undefined}
      openLabel={t("guestCards.envelope.open")} onOpen={openInvitation}>{children}</EmbossedEnvelope>, document.body)}
    {entrance === "doors" && phase !== "opened" && <DecorativeDoors variant={settings.entrance === "doorsBrown" ? "brown" : settings.entrance === "doorsBlueFloral" ? "blueFloral" : "white"} phase={phase} title={title} onOpen={openInvitation} />}
    {entrance === "stampedPaper" && phase !== "opened" && createPortal(<StampedPaperOpening phase={phase} onOpen={openInvitation} openLabel={t("guestCards.envelope.open")} />, document.body)}
    {celebrating && <OpeningCelebration key={`${settings.openingEffect}:${settings.openingIntensity}:${settings.openingSpeed}:${settings.openingDuration}:${settings.openingPalette}`} settings={settings} design={design} />}
    {phase === "opened" && openedByGuest.current && <span className="guest-screen-reader" role="status">{t("guestCards.envelope.opened")}</span>}
    {phase === "opening" && <span className="guest-screen-reader" role="status">{t("guestCards.doors.opening")}</span>}
  </div>;
}
