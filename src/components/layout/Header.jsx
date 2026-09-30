import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/", label: "Home", end: true },
  { to: "/projects", label: "Experiences" },
  { to: "/invitations", label: "Invitations" },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact Us" },
];

export default function Header() {
  return (
    <header className="site-header">
      <NavLink className="brand" to="/" aria-label="11:11 home">
        <span className="brand-time">
          11:11{" "}
          <span aria-hidden="true" className="brand-plus">
            +
          </span>
        </span>
        <span className="brand-name">ELEVEN</span>
      </NavLink>
      <nav aria-label="Main navigation" className="main-nav">
        {navItems.map(({ to, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `nav-link${isActive ? " is-active" : ""}`
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
