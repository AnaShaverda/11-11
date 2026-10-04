import { useEffect, useState } from "react";
import { useLanguage } from "../../localization/LanguageContext.jsx";

export default function BackToTop() {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const update = () => setVisible(window.scrollY > Math.max(600, window.innerHeight));
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
    const heading = document.querySelector(".invitation-collection-heading h2");
    heading?.setAttribute("tabindex", "-1");
    heading?.focus({ preventScroll: true });
  }

  return visible ? <button type="button" className="collection-back-to-top" onClick={scrollToTop}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m6 12 6-6 6 6M12 6v14" /></svg>{t("catalog.backToTop")}</button> : null;
}
