import { lazy, Suspense } from "react";
import SiteLoader from "../components/ui/SiteLoader.jsx";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import WebsiteLayout from "../components/layout/WebsiteLayout.jsx";
import WebsiteIntroLayout from "../components/layout/WebsiteIntroLayout.jsx";
import HomePage from "../pages/HomePage.jsx";
import AboutPage from "../pages/AboutPage.jsx";
import ContactPage from "../pages/ContactPage.jsx";
import ProjectDetailPage from "../pages/ProjectDetailPage.jsx";
import NotFoundPage from "../pages/NotFoundPage.jsx";
import {
  getInvitationCatalogLink,
  readCatalogCategory,
} from "../invitations/data/catalogFilters.js";
import InvitationsPage from "../invitations/pages/InvitationsPage.jsx";
import InvitationPreviewPage from "../invitations/pages/InvitationPreviewPage.jsx";
import FriendshipDiaryModulePage from "../modules/pages/FriendshipDiaryModulePage.jsx";
import SurpriseShowcasePage from "../surprises/pages/SurpriseShowcasePage.jsx";
import SurpriseDemoPage from "../surprises/pages/SurpriseDemoPage.jsx";
import LoginPage from "../auth/pages/LoginPage.jsx";
import RegisterPage from "../auth/pages/RegisterPage.jsx";
import CustomInvitationPage from "../invitations/pages/CustomInvitationPage.jsx";
import CustomDesignGalleryPage from "../invitations/pages/CustomDesignGalleryPage.jsx";
import CustomDesignExperiencePage from "../invitations/pages/CustomDesignExperiencePage.jsx";
import CustomOrderRoute from "../custom-orders/CustomOrderRoute.jsx";
import PizzaChefExperience from "../invitations/pages/PizzaChefExperience.jsx";
import PinkLidoExperience from "../invitations/pages/PinkLidoExperience.jsx";
import CherryTowerExperience from "../invitations/pages/CherryTowerExperience.jsx";
import CocktailSummerExperience from "../invitations/pages/CocktailSummerExperience.jsx";

const RibbonSketchExperience = lazy(() => import("../invitations/pages/RibbonSketchExperience.jsx"));

function InvitationCatalogRedirect() {
  const { search, hash, state } = useLocation();
  const params = new URLSearchParams(search);
  if (!params.has("type")) return <InvitationsPage />;
  return (
    <Navigate
      to={{
        ...getInvitationCatalogLink(readCatalogCategory(params), params),
        hash,
      }}
      state={state}
      replace
    />
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="invitations/birthday-ribbon-sketch" element={<Suspense fallback={<SiteLoader pending />}><RibbonSketchExperience /></Suspense>} />
      <Route path="invitations/bridal-pink-country-club" element={<CocktailSummerExperience key="pink-country-club" theme="pink-country-club" />} />
      <Route path="invitations/bridal-citrus-cool" element={<CocktailSummerExperience key="citrus-cool" theme="citrus-cool" />} />
      <Route path="invitations/bridal-cherry-soda" element={<CocktailSummerExperience key="cherry-soda" theme="cherry-soda" />} />
      <Route path="invitations/bridal-lilac-lemonade" element={<CocktailSummerExperience key="lilac-lemonade" theme="lilac-lemonade" />} />

      <Route path="invitations/birthday-cherry-tower" element={<CherryTowerExperience key="birthday-cherry" />} />
      <Route path="invitations/bridal-cherry-tower" element={<CherryTowerExperience key="bridal-cherry" bridal />} />
      <Route path="invitations/bridal-mint-bash" element={<CherryTowerExperience key="mint-bash" bridal variant="mint-bash" originalArtwork />} />
      <Route path="invitations/bridal-sunny-pop" element={<CherryTowerExperience key="sunny-pop" bridal variant="sunny-pop" originalArtwork />} />
      <Route path="invitations/bridal-mint-ribbon" element={<CherryTowerExperience key="mint-ribbon" bridal variant="mint-bash" />} />
      <Route path="invitations/bridal-sunny-ribbon" element={<CherryTowerExperience key="sunny-ribbon" bridal variant="sunny-pop" />} />
      <Route path="invitations/birthday-peach-fizz" element={<CherryTowerExperience key="peach-fizz" variant="peach-fizz" />} />
      <Route path="invitations/birthday-little-pizza-chef" element={<PizzaChefExperience key="pizza-chef" />} />
      <Route path="invitations/birthday-slice-club" element={<PizzaChefExperience key="slice-club" theme="slice-club" />} />
      <Route path="invitations/birthday-blue-splash" element={<PinkLidoExperience key="blue-splash" theme="blue-splash" />} />
      <Route path="invitations/birthday-pink-lido" element={<PinkLidoExperience key="pink-lido" />} />
      <Route path="surprises/for/:orderId/*" element={<CustomOrderRoute />} />
      <Route
        path="invitations/create/:category/demo/:theme"
        element={<CustomDesignExperiencePage />}
      />
      <Route
        path="invitations/create/:category"
        element={<CustomInvitationPage />}
      />
      <Route element={<WebsiteLayout />}>
      <Route
        path="invitations/create/:category/designs"
        element={<CustomDesignGalleryPage />}
      />

        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route element={<WebsiteIntroLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route
            path="projects"
            element={<Navigate to="/#projects" replace />}
          />
        </Route>
        <Route path="invitations" element={<InvitationCatalogRedirect />} />
        <Route path="projects/:slug" element={<ProjectDetailPage />} />
        <Route path="invitations/:slug" element={<InvitationPreviewPage />} />
        <Route
          path="themes/:slug"
          element={<Navigate to="/invitations" replace />}
        />
        <Route
          path="modules/friendship-diary"
          element={<FriendshipDiaryModulePage />}
        />
        <Route path="surprises" element={<SurpriseShowcasePage />} />
        <Route path="surprises/demo" element={<SurpriseDemoPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
