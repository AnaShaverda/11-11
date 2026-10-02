import { useEffect, useLayoutEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

const storageKey = "1111-scroll-positions";

function savedPositions() {
  try { return new Map(JSON.parse(sessionStorage.getItem(storageKey) ?? "[]")); }
  catch { return new Map(); }
}

export default function ScrollManager() {
  const location = useLocation();
  const navigationType = useNavigationType();
  const previous = useRef(null);
  const currentKey = useRef(location.key);
  const positions = useRef(null);
  if (!positions.current) positions.current = savedPositions();

  useEffect(() => {
    const original = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    function save(event) {
      const link = event?.target instanceof Element ? event.target.closest("a[id]") : null;
      const old = positions.current.get(currentKey.current);
      const scrollAreas = [...document.querySelectorAll("[data-scroll-restoration]")].map((el) => ({ id: el.dataset.scrollRestoration, left: el.scrollLeft, top: el.scrollTop }));
      const details = [...document.querySelectorAll("[data-scroll-restoration-details]")].map((el) => ({ id: el.dataset.scrollRestorationDetails, open: el.open }));
      positions.current.set(currentKey.current, { top: window.scrollY, focus: link?.id || document.activeElement?.id || old?.focus, scrollAreas, details });
    }
    function persist() {
      save();
      try { sessionStorage.setItem(storageKey, JSON.stringify([...positions.current].slice(-80))); }
      catch { /* Scroll restoration still works without storage. */ }
    }
    window.addEventListener("scroll", save, { passive: true, capture: true });
    window.addEventListener("popstate", save);
    window.addEventListener("pagehide", persist);
    document.addEventListener("click", save, true);
    return () => {
      window.removeEventListener("scroll", save, true);
      window.removeEventListener("popstate", save);
      window.removeEventListener("pagehide", persist);
      document.removeEventListener("click", save, true);
      window.history.scrollRestoration = original;
    };
  }, []);

  useLayoutEffect(() => {
    const prior = previous.current;
    const returning = navigationType === "POP";
    const saved = positions.current.get(location.key);
    const preserve = location.state?.preserveScroll || (prior?.pathname === location.pathname && prior.hash === location.hash && !returning);
    const priorPosition = prior && positions.current.get(prior.key);
    previous.current = location;
    currentKey.current = location.key;

    if (returning && saved) {
      for (const detail of saved.details ?? []) {
        const el = [...document.querySelectorAll("[data-scroll-restoration-details]")].find((el) => el.dataset.scrollRestorationDetails === detail.id);
        if (el) el.open = detail.open;
      }
      for (const area of saved.scrollAreas ?? []) {
        const el = [...document.querySelectorAll("[data-scroll-restoration]")].find((el) => el.dataset.scrollRestoration === area.id);
        el?.scrollTo({ left: area.left, top: area.top, behavior: "instant" });
      }
      window.scrollTo({ top: saved.top, behavior: "instant" });
      document.getElementById(saved.focus)?.focus({ preventScroll: true });
    } else if (preserve) {
      if (priorPosition) window.scrollTo({ top: priorPosition.top, behavior: "instant" });
    } else {
      let target;
      if (location.hash) {
        try { target = document.getElementById(decodeURIComponent(location.hash.slice(1))); }
        catch { target = document.getElementById(location.hash.slice(1)); }
      }
      if (target) target.scrollIntoView({ block: "start", behavior: "instant" });
      else window.scrollTo({ top: 0, behavior: "instant" });
      const heading = document.querySelector(".site-main h1");
      if (heading) {
        heading.setAttribute("tabindex", "-1");
        heading.focus({ preventScroll: true });
      }
    }
    positions.current.set(location.key, { ...saved, top: window.scrollY });
  }, [location, navigationType]);

  return null;
}
