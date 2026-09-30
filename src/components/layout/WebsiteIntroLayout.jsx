import { Outlet } from "react-router-dom";
import SiteLoader from "../ui/SiteLoader.jsx";

export default function WebsiteIntroLayout() {
  return (
    <>
      <Outlet />
      <SiteLoader />
    </>
  );
}
