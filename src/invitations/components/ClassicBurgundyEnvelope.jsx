export default function ClassicBurgundyEnvelope({ phase, onOpen, openLabel, variant = "burgundy" }) {
  const sage = variant === "sage";
  return <>
  <div className={`classic-burgundy-scene${sage ? " is-sage" : ""}`}>
    <div className="classic-burgundy-envelope" aria-hidden="true">
      <svg className="classic-burgundy-body" viewBox="0 0 500 356" preserveAspectRatio="none">
        <defs>
          <linearGradient id="classic-burgundy-shell" x1="0" x2="1" y1="0" y2="1"><stop stopColor="#701429"/><stop offset=".52" stopColor="#811d32"/><stop offset="1" stopColor="#5d0d20"/></linearGradient>
          <linearGradient id="classic-burgundy-left" x1="0" x2="1" y1="0" y2="1"><stop stopColor="#861f35"/><stop offset="1" stopColor="#681226"/></linearGradient>
          <linearGradient id="classic-burgundy-right" x1="1" x2="0" y1="0" y2="1"><stop stopColor="#7b1930"/><stop offset="1" stopColor="#5f0e22"/></linearGradient>
          <linearGradient id="classic-burgundy-front" x1=".5" x2=".5" y1="0" y2="1"><stop stopColor="#7f1b30"/><stop offset="1" stopColor="#570b1d"/></linearGradient>
          <linearGradient id="classic-burgundy-lining" x1="0" x2="1" y1="0" y2="1"><stop stopColor="#fffdf8"/><stop offset=".55" stopColor="#f8f3ed"/><stop offset="1" stopColor="#ebe4dd"/></linearGradient>
        </defs>
        <rect x="1" y="1" width="498" height="354" rx="3" fill="url(#classic-burgundy-shell)" stroke="#54091c" strokeWidth="2"/>
        <path d="M10 3H490V192L333 146H167L10 192Z" fill="url(#classic-burgundy-lining)"/>
        <path d="M0 0 C4 2 12 7 19 14 L167 145 L0 356Z" fill="url(#classic-burgundy-left)" stroke="#4c0a1c" strokeOpacity=".34"/>
        <path d="M500 0 C496 2 488 7 481 14 L333 145 L500 356Z" fill="url(#classic-burgundy-right)" stroke="#4c0a1c" strokeOpacity=".4"/>
        <path d="M0 356 Q1 331 17 315 L167 145 H333 L483 315 Q499 331 500 356Z" fill="url(#classic-burgundy-front)" stroke="#4c0a1c" strokeOpacity=".55" strokeWidth="1.5"/>
        <path d="M1 354 Q2 332 17 316 L167 145 H333 L483 316 Q498 332 499 354" fill="none" stroke="#b54b59" strokeOpacity=".27" strokeWidth="1.3"/>
      </svg>
      <div className="classic-burgundy-flap">
        <svg className="classic-burgundy-flap-face" viewBox="0 0 500 270" preserveAspectRatio="none">
          <defs><linearGradient id="classic-burgundy-flap-fill" x1="0" x2="1" y1="0" y2="1"><stop stopColor="#76182d"/><stop offset=".54" stopColor="#8a2034"/><stop offset="1" stopColor="#5e0d21"/></linearGradient></defs>
          <path d="M0 0 H500 C495 46 483 66 450 98 L270 260 Q250 279 230 260 L50 98 C17 66 5 46 0 0Z" fill="url(#classic-burgundy-flap-fill)" stroke="#4c091b" strokeWidth="1.5"/>
          <path d="M2 2 C7 47 24 68 51 96 L231 259 Q250 276 269 259 L449 96 C476 68 493 47 498 2" fill="none" stroke="#b24955" strokeOpacity=".35" strokeWidth="1.4"/>
        </svg>
        <svg className="classic-burgundy-flap-lining" viewBox="0 0 500 270" preserveAspectRatio="none">
          {sage ? <><defs><linearGradient id="classic-burgundy-flap-back" x1="0" x2="1" y1="0" y2="1"><stop stopColor="#620c22"/><stop offset=".6" stopColor="#7b172b"/><stop offset="1" stopColor="#4b0719"/></linearGradient></defs><path d="M0 0 H500 C495 46 483 66 450 98 L270 260 Q250 279 230 260 L50 98 C17 66 5 46 0 0Z" fill="#490719"/><path d="M12 4 H488 C481 40 470 60 441 87 L267 248 Q250 264 233 248 L59 87 C30 60 19 40 12 4Z" fill="url(#classic-burgundy-flap-back)" stroke="#8d2c3d" strokeOpacity=".45" strokeWidth="1.5"/></> : <path d="M0 0 H500 C495 46 483 66 450 98 L270 260 Q250 279 230 260 L50 98 C17 66 5 46 0 0Z" fill="#7d1b30" stroke="#4c091b" strokeWidth="1.5"/>}
        </svg>
      </div>
      {!sage && <svg className="classic-burgundy-seal" viewBox="0 0 100 100">
        <defs><radialGradient id="classic-burgundy-wax"><stop stopColor="#f5d476"/><stop offset=".48" stopColor="#ca8c2e"/><stop offset=".8" stopColor="#925714"/><stop offset="1" stopColor="#f1c866"/></radialGradient></defs>
        <path d="M50 4 C59 1 65 8 73 9 C83 10 84 19 90 26 C96 34 92 40 96 49 C98 59 90 65 88 73 C85 83 75 83 69 90 C62 96 54 92 47 96 C38 98 33 90 25 88 C16 85 16 75 9 68 C3 61 8 54 4 46 C2 38 9 32 11 24 C14 15 24 16 31 10 C38 4 43 8 50 4Z" fill="url(#classic-burgundy-wax)" stroke="#6c3c0c" strokeWidth="2"/>
        <circle cx="50" cy="50" r="36" fill="none" stroke="#f6d77e" strokeWidth="2"/><circle cx="50" cy="50" r="32" fill="none" stroke="#74420e" strokeWidth="1.4"/>
        <path d="M69 35 C60 26 43 26 34 36 C25 45 25 61 34 69 C43 78 60 76 69 66" fill="none" stroke="#68400f" strokeWidth="6" strokeLinecap="round"/>
        <path d="M69 35 C60 26 43 26 34 36 C25 45 25 61 34 69 C43 78 60 76 69 66" fill="none" stroke="#ffe49a" strokeWidth="2" strokeLinecap="round"/>
      </svg>}
    </div>
    {phase === "sealed" && <button type="button" className="classic-burgundy-open" aria-label={openLabel} onClick={onOpen} />}
  </div>
  <svg className={`classic-burgundy-pocket-overlay${sage ? " is-sage" : ""}`} viewBox="0 0 500 356" preserveAspectRatio="none" aria-hidden="true">
    <defs>
      <linearGradient id="classic-burgundy-overlay-left" x1="0" x2="1" y1="0" y2="1"><stop stopColor="#861f35"/><stop offset="1" stopColor="#681226"/></linearGradient>
      <linearGradient id="classic-burgundy-overlay-right" x1="1" x2="0" y1="0" y2="1"><stop stopColor="#7b1930"/><stop offset="1" stopColor="#5f0e22"/></linearGradient>
      <linearGradient id="classic-burgundy-overlay-front" x1=".5" x2=".5" y1="0" y2="1"><stop stopColor="#7f1b30"/><stop offset="1" stopColor="#570b1d"/></linearGradient>
    </defs>
    <path d="M0 0 C4 2 12 7 19 14 L167 145 L0 356Z" fill="url(#classic-burgundy-overlay-left)"/>
    <path d="M500 0 C496 2 488 7 481 14 L333 145 L500 356Z" fill="url(#classic-burgundy-overlay-right)"/>
    <path d="M0 356 Q1 331 17 315 L167 145 H333 L483 315 Q499 331 500 356Z" fill="url(#classic-burgundy-overlay-front)" stroke="#4c0a1c" strokeOpacity=".55" strokeWidth="1.5"/>
    <path d="M1 354 Q2 332 17 316 L167 145 H333 L483 316 Q498 332 499 354" fill="none" stroke="#b54b59" strokeOpacity=".27" strokeWidth="1.3"/>
  </svg>
  </>;
}
