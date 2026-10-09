import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./app/App.jsx";
import { LanguageProvider } from "./localization/LanguageContext.jsx";
import { AppearanceProvider } from "./appearance/AppearanceContext.jsx";
import "./styles/fonts.css";
import "./styles/global.css";
import "./styles/invitations.css";
import "./styles/experiences.css";
import "./styles/home.css";
import "./styles/themes.css";
import "./styles/theme-worlds.css";
import "./styles/invitation-showcase.css";
import "./styles/invitation-moodboards.css";
import "./styles/birthday-illustrations.css";
import "./styles/painted-summer.css";
import "./styles/birthday-art-direction.css";
import "./styles/modern-toast.css";
import "./styles/supper-club.css";
import "./styles/race-day.css";
import "./styles/kids-adventures.css";
import "./styles/khinkali-beer.css";
import "./styles/classic-celebration.css";
import "./styles/retro-pop.css";
import "./styles/y2k-party.css";
import "./styles/pastel-dream.css";
import "./styles/football-ballet.css";
import "./styles/reference-socials.css";
import "./styles/strawberry-social.css";
import "./styles/painted-parties.css";
import "./styles/letter-parties.css";
import "./styles/ink-and-ivy.css";
import "./styles/garden-dance.css";
import "./styles/playful-weddings.css";
import "./styles/personal-weddings.css";
import "./styles/birthday-guests.css";
import "./styles/category-previews.css";
import "./styles/surprises.css";
import "./styles/appearance.css";
import "./styles/auth.css";
import "./styles/usability.css";
import "./styles/reference-theme.css";
import "./styles/home-invitations.css";
import "./styles/design-preview.css";
import "./styles/navigation.css";
import "./styles/pink-disco-bride.css";
import "./styles/typography.css";

const rootElement = document.getElementById("root");
const bootScene = document.getElementById("boot-scene");
if (bootScene) {
  const observer = new MutationObserver(() => {
    if (!rootElement.firstElementChild) return;
    observer.disconnect();
    requestAnimationFrame(() => {
      bootScene.classList.add("is-leaving");
      window.setTimeout(() => bootScene.remove(), 250);
    });
  });
  observer.observe(rootElement, { childList: true });
}

createRoot(rootElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <AppearanceProvider>
          <App />
        </AppearanceProvider>
      </LanguageProvider>
    </BrowserRouter>
  </React.StrictMode>,
);

import "./styles/retro-bridal.css";

import "./styles/christening-cards.css";

import "./styles/card-image-sizing.css";
import "./styles/invitation-portrait.css";
import "./styles/card-typography.css";
import "./styles/birthday-card-layout.css";

import "./styles/girly-birthday.css";
import "./styles/ivory-vows-watercolor.css";

import "./styles/comic-birthday.css";
import "./styles/pool-birthday.css";

import "./styles/pizza-birthday.css";

import "./styles/cocktail-birthday.css";

import "./styles/selected-bridal.css";
import "./styles/separated-theme-art.css";
import "./styles/guest-cards.css";

import "./styles/card-content-fit.css";
import "./styles/glass-catalog-cards.css";

import "./styles/light-mode.css";
import "./styles/page-gutters.css";

import "./styles/wedding-themes.css";
import "./styles/invitation-form.css";
import "./styles/custom-design-gallery.css";

import "./styles/form-interactions.css";
