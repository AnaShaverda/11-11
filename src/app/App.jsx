import { lazy, Suspense } from "react";
import { useLanguage } from "../localization/LanguageContext.jsx";
import SiteLoader from "../components/ui/SiteLoader.jsx";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import WebsiteLayout from "../components/layout/WebsiteLayout.jsx";
import WebsiteIntroLayout from "../components/layout/WebsiteIntroLayout.jsx";
const HomePage = lazy(() => import("../pages/HomePage.jsx"));
const AboutPage = lazy(() => import("../pages/AboutPage.jsx"));
const ContactPage = lazy(() => import("../pages/ContactPage.jsx"));
const ProjectDetailPage = lazy(() => import("../pages/ProjectDetailPage.jsx"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage.jsx"));
import {
  getInvitationCatalogLink,
  readCatalogCategory,
} from "../invitations/data/catalogFilters.js";
const InvitationsPage = lazy(() => import("../invitations/pages/InvitationsPage.jsx"));
const InvitationPreviewPage = lazy(() => import("../invitations/pages/InvitationPreviewPage.jsx"));
const FriendshipDiaryModulePage = lazy(() => import("../modules/pages/FriendshipDiaryModulePage.jsx"));

const LoginPage = lazy(() => import("../auth/pages/LoginPage.jsx"));
const RegisterPage = lazy(() => import("../auth/pages/RegisterPage.jsx"));
const CustomInvitationPage = lazy(() => import("../invitations/pages/CustomInvitationPage.jsx"));
const CustomDesignGalleryPage = lazy(() => import("../invitations/pages/CustomDesignGalleryPage.jsx"));
const CustomDesignExperiencePage = lazy(() => import("../invitations/pages/CustomDesignExperiencePage.jsx"));
const CustomOrderRoute = lazy(() => import("../custom-orders/CustomOrderRoute.jsx"));
const PizzaPartyExperience = lazy(() => import("../invitations/pages/PizzaPartyExperience.jsx"));
const SliceClubExperience = lazy(() => import("../invitations/pages/SliceClubExperience.jsx"));
const PinkLidoExperience = lazy(() => import("../invitations/pages/PinkLidoExperience.jsx"));
const CherryTowerExperience = lazy(() => import("../invitations/pages/CherryTowerExperience.jsx"));
const PeachFizzExperience = lazy(() => import("../invitations/pages/PeachFizzExperience.jsx"));
const MidnightMartiniExperience = lazy(() => import("../invitations/pages/MidnightMartiniExperience.jsx"));
const CocktailSummerExperience = lazy(() => import("../invitations/pages/CocktailSummerExperience.jsx"));

const PopDiscoExperience = lazy(() => import("../invitations/pages/PopDiscoExperience.jsx"));
const PinkGlamExperience = lazy(() => import("../invitations/pages/PinkGlamExperience.jsx"));
const Y2KPartyExperience = lazy(() => import("../invitations/pages/Y2KPartyExperience.jsx"));
const SpiderBirthdayExperience = lazy(() => import("../invitations/pages/SpiderBirthdayExperience.jsx"));

const CheckerboardCheersExperience = lazy(() => import("../invitations/pages/CheckerboardCheersExperience.jsx"));

const StationeryBirthdayExperience = lazy(() => import("../invitations/pages/StationeryBirthdayExperience.jsx"));

const BirthdayPlaygroundExperience = lazy(() => import("../invitations/pages/BirthdayPlaygroundExperience.jsx"));

const RibbonSketchExperience = lazy(() => import("../invitations/pages/RibbonSketchExperience.jsx"));

function GiftsPlaceholder() {
  const { t } = useLanguage();
  return <section className="inner-page copy-page"><h1>{t("common.gifts")}</h1></section>;
}

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
  const { pathname } = useLocation();
  return (
    <Suspense fallback={<SiteLoader pending />} >
    <SiteLoader key={pathname} />
    <Routes>
      <Route path="invitations/birthday-city-after-dark" element={<SpiderBirthdayExperience key="city-after-dark" theme="city-after-dark" />} />
      <Route path="invitations/birthday-comic-cutout" element={<SpiderBirthdayExperience key="comic-cutout" theme="comic-cutout" />} />
      <Route path="invitations/birthday-upside-down" element={<Navigate to="/invitations/birthday-city-after-dark" replace />} />
      <Route path="invitations/birthday-retro-sport" element={<Navigate to="/invitations/birthday-comic-cutout" replace />} />
      <Route path="invitations/birthday-pink-glam" element={<PinkGlamExperience />} />
      <Route path="invitations/birthday-y2k-party" element={<Y2KPartyExperience key="arcade" theme="arcade" />} />
      <Route path="invitations/birthday-desktop-sleepover" element={<Y2KPartyExperience key="sleepover" theme="sleepover" />} />
      <Route path="invitations/birthday-disco-scrapbook" element={<PopDiscoExperience />} />
      <Route path="invitations/birthday-checkerboard-cheers" element={<CheckerboardCheersExperience />} />
      <Route path="invitations/birthday-white-and-blue" element={<StationeryBirthdayExperience key="white-and-blue" />} />
      <Route path="invitations/birthday-playground" element={<BirthdayPlaygroundExperience />} />
      <Route path="invitations/birthday-party-doodles" element={<Navigate to="/invitations/birthday-playground" replace />} />
      <Route path="invitations/birthday-ribbon-sketch" element={<RibbonSketchExperience />} />
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
      <Route path="invitations/birthday-peach-fizz" element={<PeachFizzExperience />} />
      <Route path="invitations/birthday-midnight-martini" element={<MidnightMartiniExperience />} />
      <Route path="invitations/birthday-little-pizza-chef" element={<PizzaPartyExperience />} />
      <Route path="invitations/birthday-slice-club" element={<SliceClubExperience />} />
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
      <Route path="order-online/:category/demo/:theme" element={<CustomDesignExperiencePage />} />
      <Route path="order-online/:category/create" element={<CustomInvitationPage />} />
      <Route element={<WebsiteLayout />}>
      <Route path="order-online" element={<CustomDesignGalleryPage />} />
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
        <Route path="gifts" element={<GiftsPlaceholder />} />
        <Route path="gifts-surprises" element={<GiftsPlaceholder />} />
        <Route path="surprises" element={<GiftsPlaceholder />} />
        <Route path="surprises/demo" element={<GiftsPlaceholder />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
    </Suspense>
  );
}
