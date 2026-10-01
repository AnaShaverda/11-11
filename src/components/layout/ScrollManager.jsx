import { useLayoutEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

export default function ScrollManager() {
  const { pathname, hash } = useLocation();
  const navigationType = useNavigationType();
  const previousLocation = useRef(null);

  useLayoutEffect(() => {
    // Updating a catalog filter should keep the current scroll position.
    if (previousLocation.current?.pathname === pathname && previousLocation.current?.hash === hash) return;
    previousLocation.current = { pathname, hash };
    if (hash) {
      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (target) target.scrollIntoView({ block: "start", behavior: "instant" });
    } else if (navigationType !== "POP") {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [pathname, hash, navigationType]);

  return null;
}
