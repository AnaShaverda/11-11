import { Route, Routes } from "react-router-dom";
import WebsiteLayout from "../components/layout/WebsiteLayout.jsx";
import WebsiteIntroLayout from "../components/layout/WebsiteIntroLayout.jsx";
import HomePage from "../pages/HomePage.jsx";
import AboutPage from "../pages/AboutPage.jsx";
import ContactPage from "../pages/ContactPage.jsx";
import ProjectsPage from "../pages/ProjectsPage.jsx";
import ProjectDetailPage from "../pages/ProjectDetailPage.jsx";
import NotFoundPage from "../pages/NotFoundPage.jsx";
import InvitationsPage from "../invitations/pages/InvitationsPage.jsx";
import InvitationPreviewPage from "../invitations/pages/InvitationPreviewPage.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<WebsiteLayout />}>
        <Route element={<WebsiteIntroLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="projects" element={<ProjectsPage />} />
        </Route>
        <Route path="invitations" element={<InvitationsPage />} />
        <Route path="projects/:slug" element={<ProjectDetailPage />} />
        <Route path="invitations/:slug" element={<InvitationPreviewPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
