import { useState } from "react";
import { useLanguage } from "../../localization/LanguageContext.jsx";

export default function GiftReveal({ message }) {
  const { t } = useLanguage();
  const [opened, setOpened] = useState(false);
  return (
    <section className={`surprise-section surprise-gift-section${opened ? " is-open" : ""}`} aria-labelledby="gift-title">
      <div className="surprise-section-copy"><span className="surprise-section-number">{t("surprise.gift.label")}</span><h2 id="gift-title">{t("surprise.gift.title")}</h2><p>{t("surprise.gift.description")}</p></div>
      <div className="surprise-gift-stage">
        <div className="surprise-gift-box" aria-hidden="true"><span className="surprise-gift-lid"/><span className="surprise-gift-ribbon"/><span className="surprise-gift-bow">∞</span><span className="surprise-gift-front"/></div>
        <div className="surprise-gift-note" aria-hidden={!opened}><span>✦</span><p>{message}</p></div>
      </div>
      <button type="button" className="surprise-solid-button" aria-expanded={opened} onClick={() => setOpened((value) => !value)}>{t(opened ? "surprise.gift.wrap" : "surprise.gift.open")}</button>
    </section>
  );
}
