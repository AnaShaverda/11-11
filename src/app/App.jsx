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
import ThemePreviewPage from "../themes/pages/ThemePreviewPage.jsx";
import LoginPage from "../auth/pages/LoginPage.jsx";
import RegisterPage from "../auth/pages/RegisterPage.jsx";
import InvitationOpeningPage from "../invitations/pages/InvitationOpeningPage.jsx";
import CustomInvitationPage from "../invitations/pages/CustomInvitationPage.jsx";
import CustomDesignGalleryPage from "../invitations/pages/CustomDesignGalleryPage.jsx";
import CustomDesignExperiencePage from "../invitations/pages/CustomDesignExperiencePage.jsx";

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
      <Route
        path="invitations/:slug/open"
        element={<InvitationOpeningPage />}
      />
      <Route
        path="invitations/create/:category/demo/:theme"
        element={<CustomDesignExperiencePage />}
      />
      <Route
        path="invitations/create/:category/designs"
        element={<CustomDesignGalleryPage />}
      />
      <Route
        path="invitations/create/:category"
        element={<CustomInvitationPage />}
      />
      <Route element={<WebsiteLayout />}>
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
        <Route path="experiences/:slug/demo" element={<ThemePreviewPage />} />
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
