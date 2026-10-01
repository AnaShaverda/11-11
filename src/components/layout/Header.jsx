import { NavLink } from "react-router-dom";
import { useLanguage } from "../../localization/LanguageContext.jsx";
import { languages, languageNames } from "../../localization/captions.js";
import { useAppearance } from "../../appearance/AppearanceContext.jsx";
import Icon from "../ui/Icon.jsx";

const navItems = [
  { to: "/", key: "nav.home", end: true },
  { to: "/surprises", key: "nav.surprises" },
  { to: "/invitations", key: "nav.invitations" },
  { to: "/about", key: "nav.about" },
  { to: "/contact", key: "nav.contact" },
];

export default function Header() {
  const { t, language, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useAppearance();
  return (
    <header className="site-header">
      <NavLink className="brand" to="/" aria-label={t("nav.brand")}>
        <span className="brand-time">
          11:11{" "}
          <span aria-hidden="true" className="brand-plus">
            +
          </span>
        </span>
        <span className="brand-name">ELEVEN</span>
      </NavLink>
      <nav aria-label={t("nav.main")} className="main-nav">
        {navItems.map(({ to, key, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `nav-link${isActive ? " is-active" : ""}`
            }
          >
            {t(key)}
          </NavLink>
        ))}
      </nav>
      <div className="header-preferences">
        <div className="language-switch" role="group" aria-label={t("nav.language")}>
          {languages.map((code) => <button key={code} type="button" lang={code} className={language === code ? "is-active" : ""} aria-label={languageNames[code] ?? code} aria-pressed={language === code} onClick={() => setLanguage(code)}>{code.toUpperCase()}</button>)}
        </div>
        <button type="button" className={`appearance-switch is-${theme}`} onClick={toggleTheme} aria-label={t(theme === "dark" ? "appearance.switchLight" : "appearance.switchDark")} aria-pressed={theme === "light"} title={t(theme === "dark" ? "appearance.dark" : "appearance.light")}><Icon name={theme === "dark" ? "moon" : "sun"} size={20} /></button>
      </div>
    </header>
  );
}
