import { Outlet } from "react-router-dom";
import Header from "./Header.jsx";
import DecorativeLayer from "./DecorativeLayer.jsx";

export default function WebsiteLayout({ children }) {
  return (
    <div className="site-background">
      <DecorativeLayer />
      <div className="site-frame">
        <Header />
        <main id="main-content" className="site-main">
          {children ?? <Outlet />}
        </main>
      </div>
    </div>
  );
}
