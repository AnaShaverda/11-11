import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import WebsiteLayout from "../components/layout/WebsiteLayout.jsx";
import WebsiteIntroLayout from "../components/layout/WebsiteIntroLayout.jsx";
import HomePage from "../pages/HomePage.jsx";
import AboutPage from "../pages/AboutPage.jsx";
import ContactPage from "../pages/ContactPage.jsx";
import ProjectDetailPage from "../pages/ProjectDetailPage.jsx";
import NotFoundPage from "../pages/NotFoundPage.jsx";
import { projects } from "../data/projects.js";
import InvitationsPage from "../invitations/pages/InvitationsPage.jsx";
import InvitationPreviewPage from "../invitations/pages/InvitationPreviewPage.jsx";
import FriendshipDiaryModulePage from "../modules/pages/FriendshipDiaryModulePage.jsx";
import SurpriseShowcasePage from "../surprises/pages/SurpriseShowcasePage.jsx";
import SurpriseDemoPage from "../surprises/pages/SurpriseDemoPage.jsx";
import ThemePreviewPage from "../themes/pages/ThemePreviewPage.jsx";
import LoginPage from "../auth/pages/LoginPage.jsx";
import RegisterPage from "../auth/pages/RegisterPage.jsx";

function InvitationCatalogRedirect() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const type = params.get("type")?.toLowerCase();
  const project = projects.find((item) => item.id === type || item.slug === type);
  const style = params.get("style");
  params.delete("type");
  params.delete("style");
  if (style && style !== "all") {
    if (project) params.set(`${project.id}Style`, style);
    else for (const id of ["birthday", "wedding"]) params.set(`${id}Style`, style);
  }
  const query = params.toString();
  if (!project && !new URLSearchParams(search).has("type") && !new URLSearchParams(search).has("style")) return <InvitationsPage />;
  return <Navigate to={`${project ? `/projects/${project.slug}` : "/invitations"}${query ? `?${query}` : ""}`} replace />;
}

export default function App() {
  return (
    <Routes>
      <Route element={<WebsiteLayout />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route element={<WebsiteIntroLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="projects" element={<Navigate to="/#projects" replace />} />
        </Route>
        <Route path="invitations" element={<InvitationCatalogRedirect />} />
        <Route path="projects/:slug" element={<ProjectDetailPage />} />
        <Route path="invitations/:slug" element={<InvitationPreviewPage />} />
        <Route path="themes/:slug" element={<Navigate to="/invitations" replace />} />
        <Route path="experiences/:slug/demo" element={<ThemePreviewPage />} />
        <Route path="modules/friendship-diary" element={<FriendshipDiaryModulePage />} />
        <Route path="surprises" element={<SurpriseShowcasePage />} />
        <Route path="surprises/demo" element={<SurpriseDemoPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
