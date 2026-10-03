import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useLanguage } from "../../localization/LanguageContext.jsx";
import { languages, languageNames } from "../../localization/captions.js";
import { useAppearance } from "../../appearance/AppearanceContext.jsx";
import Icon from "../ui/Icon.jsx";

const navItems = [
  { to: "/", key: "nav.home", end: true },
  { to: "/surprises", key: "common.gifts" },
  { to: "/invitations", key: "nav.collections" },
  { to: "/about", key: "nav.about" },
  { to: "/contact", key: "nav.contact" },
];

export default function Header() {
  const { t, language, setLanguage } = useLanguage();
  const { theme, setTheme, toggleTheme } = useAppearance();
  const location = useLocation();
  const [openLocationKey, setOpenLocationKey] = useState(null);
  const menuOpen = openLocationKey === location.key;
  const headerRef = useRef(null);
  const toggleRef = useRef(null);

  function closeMenu() {
    setOpenLocationKey(null);
  }

  function followLink() {
    if (menuOpen) toggleRef.current?.focus();
    closeMenu();
  }

  useEffect(() => {
    if (!menuOpen) return;

    function onKeyDown(event) {
      if (event.key !== "Escape") return;
      setOpenLocationKey(null);
      toggleRef.current?.focus();
    }
    function onOutsideInteraction(event) {
      if (!headerRef.current?.contains(event.target)) setOpenLocationKey(null);
    }
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onOutsideInteraction);
    document.addEventListener("focusin", onOutsideInteraction);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onOutsideInteraction);
      document.removeEventListener("focusin", onOutsideInteraction);
    };
  }, [menuOpen]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1101px)");
    function onResize(event) {
      if (!event.matches) return;
      if (document.activeElement === toggleRef.current) {
        headerRef.current?.querySelector(".brand")?.focus();
      }
      setOpenLocationKey(null);
    }
    desktop.addEventListener("change", onResize);
    return () => desktop.removeEventListener("change", onResize);
  }, []);

  return (
    <header className="site-header" ref={headerRef}>
      <NavLink className="brand" to="/" aria-label={t("nav.brand")} onClick={closeMenu}>
        <img className="brand-logo" src="/logos/logo-white.svg" alt="" width="1330" height="1112" />
      </NavLink>
      <button ref={toggleRef} type="button" className="mobile-menu-toggle" aria-controls="header-menu" aria-expanded={menuOpen} aria-label={t(menuOpen ? "nav.closeMenu" : "nav.openMenu")} onClick={() => setOpenLocationKey(menuOpen ? null : location.key)}>
        <Icon name={menuOpen ? "close" : "menu"} size={22} />
        <span>{t("nav.menu")}</span>
      </button>
      <div id="header-menu" className={`header-menu${menuOpen ? " is-open" : ""}`}>
        <nav aria-label={t("nav.main")} className="main-nav">
          <ul>
            {navItems.map(({ to, key, end }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={end}
                  onClick={followLink}
                  className={({ isActive }) =>
                    `nav-link${isActive ? " is-active" : ""}`
                  }
                >
                  {t(key)}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="header-preferences">
          <NavLink to="/login" onClick={followLink} className={({ isActive }) => `header-auth-link${isActive ? " is-active" : ""}`}>{t("auth.login.action")}</NavLink>
          <div className="header-preference-row">
            <span className="header-preference-label">{t("nav.language")}</span>
            <div className="language-switch" role="group" aria-label={t("nav.language")}>
              {languages.map((code) => <button key={code} type="button" lang={code} className={language === code ? "is-active" : ""} aria-label={languageNames[code] ?? code} aria-pressed={language === code} onClick={() => setLanguage(code)}><span className="language-code">{code.toUpperCase()}</span><span className="language-name">{languageNames[code] ?? code}</span></button>)}
            </div>
          </div>
          <div className="header-preference-row">
            <span className="header-preference-label">{t("appearance.label")}</span>
            <button type="button" className={`appearance-switch is-${theme}`} onClick={toggleTheme} aria-label={t(theme === "dark" ? "appearance.switchLight" : "appearance.switchDark")} aria-pressed={theme === "light"} title={t(theme === "dark" ? "appearance.dark" : "appearance.light")}><Icon name={theme === "dark" ? "moon" : "sun"} size={20} /></button>
            <div className="mobile-appearance-switch" role="group" aria-label={t("appearance.label")}>
              {["dark", "light"].map((mode) => <button key={mode} type="button" onClick={() => setTheme(mode)} aria-pressed={theme === mode}><Icon name={mode === "dark" ? "moon" : "sun"} size={16} /><span>{t(`appearance.choice.${mode}`)}</span></button>)}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
