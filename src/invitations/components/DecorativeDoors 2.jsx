import { useLanguage } from "../../localization/LanguageContext.jsx";
import InvitationArtwork from "./InvitationArtwork.jsx";

function DoorLeaf({ side }) {
  return <div className={`guest-door-leaf is-${side}`} aria-hidden="true">
    <svg viewBox="0 0 210 600" preserveAspectRatio="none">
      <path className="guest-door-paper" d="M210 24C111 24 30 100 30 194V580H210Z" />
      <g className="guest-door-trim">
        <path d="M198 42C111 46 45 111 45 199V566H198Z" />
        <path d="M186 62C112 71 60 124 60 202V334H186Z" />
        <path d="M177 77C111 87 70 135 70 206V324H177Z" />
        <path d="M75 310V215C75 147 112 100 172 88" />
        <rect x="60" y="362" width="126" height="78" rx="3" />
        <path d="M77 373H169Q169 383 177 383V420Q167 420 167 429H79Q79 419 69 419V383Q77 383 77 373Z" />
        <rect x="60" y="462" width="126" height="88" rx="3" />
        <path d="M77 474H168Q168 482 176 484V529Q167 530 167 540H79Q79 530 70 529V484Q77 482 77 474Z" />
        <circle cx="193" cy="351" r="5" /><circle cx="192" cy="356" r="10" />
      </g>
    </svg>
  </div>;
}

export default function DecorativeDoors({ phase, title, onOpen, onView, viewButton }) {
  const { t } = useLanguage();
  return <div className="guest-door-scene">
    <div className="guest-door-scrim" aria-hidden="true" />
    <p className="guest-door-greeting">{t("guestCards.envelope.forYou")}</p>
    <div className="guest-door-stage" aria-hidden="true">
      <svg className="guest-door-arch" viewBox="0 0 420 600" fill="none">
        <path d="M18 580V193C18 88 104 10 210 10S402 88 402 193V580" />
        <path d="M25 580V194C25 93 107 18 210 18S395 93 395 194V580" />
        <path d="M34 580V196C34 103 113 29 210 29S386 103 386 196V580" />
        <path d="M6 193H42V206H6ZM378 193H414V206H378ZM8 566H42V586H8ZM378 566H412V586H378Z" />
        <path d="M14 214V558M22 214V558M30 214V558M390 214V558M398 214V558M406 214V558" />
      </svg>
      <DoorLeaf side="left" /><DoorLeaf side="right" />
      <span className="guest-door-light" />
    </div>
    {phase === "sealed" && <button type="button" className="guest-door-open" onClick={onOpen} aria-label={t("guestCards.doors.open")}>
      <span>{title}</span><small>{t("guestCards.doors.open")} <InvitationArtwork name="arrow-up-right" size={16} /></small>
    </button>}
    {(phase === "preview" || phase === "finishing") && <button className="guest-door-view" ref={viewButton} type="button" onClick={onView} disabled={phase === "finishing"}>
      {t("guestCards.doors.view")} <InvitationArtwork name="arrow-down" size={16} />
    </button>}
  </div>;
}
