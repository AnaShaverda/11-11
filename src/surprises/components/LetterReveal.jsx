import { useState } from "react";
import { useLanguage } from "../../localization/LanguageContext.jsx";

export default function LetterReveal({ letter, creatorName }) {
  const { t } = useLanguage();
  const [opened, setOpened] = useState(false);
  return (
    <section className={`surprise-section surprise-letter-section${opened ? " is-open" : ""}`} aria-labelledby="letter-title">
      <div className="surprise-section-copy"><span className="surprise-section-number">{t("surprise.letter.label")}</span><h2 id="letter-title">{t("surprise.letter.title")}</h2><p>{t("surprise.letter.description")}</p></div>
      <div className="surprise-envelope" aria-hidden="true"><span className="surprise-envelope-back"/><span className="surprise-envelope-paper">{t("surprise.letter.envelope")}</span><span className="surprise-envelope-front"/><span className="surprise-envelope-flap"/></div>
      <button type="button" className="surprise-solid-button" aria-expanded={opened} onClick={() => setOpened((value) => !value)}>{t(opened ? "surprise.letter.close" : "surprise.letter.open")}</button>
      {opened ? <article className="surprise-letter-paper"><p>{letter}</p><span>{t("surprise.letter.sign", { name: creatorName })}</span></article> : null}
    </section>
  );
}
