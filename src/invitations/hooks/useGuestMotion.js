import { useEffect, useLayoutEffect, useState } from "react";

export function useReducedGuestMotion() {
  const [reduced, setReduced] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  return reduced;
}

export function useElegantGuestMotion(root, enabled, complete, reduced, replayKey) {
  useLayoutEffect(() => {
    const container = root.current;
    if (!enabled || !complete || reduced || typeof IntersectionObserver === "undefined") return;
    const tracked = new Set();
    const reveal = element => {
      element.classList.add("is-revealed");
      observer.unobserve(element);
    };
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) reveal(entry.target);
    }, { threshold: .08, rootMargin: "0px 0px -24px 0px" });
    function discover() {
      const cards = container.querySelectorAll(".guest-note, .guest-gallery");
      cards.forEach((element, index) => {
        if (tracked.has(element)) return;
        tracked.add(element);
        element.classList.add("guest-reveal-target");
        element.style.setProperty("--guest-reveal-delay", `${index % 3 * 75}ms`);
        observer.observe(element);
      });
      for (const element of tracked) if (!container.contains(element)) { observer.unobserve(element); tracked.delete(element); }
    }
    // Keyboard navigation must never land in an invisible form or link.
    const onFocus = event => {
      const card = event.target.closest(".guest-reveal-target");
      if (card) { card.classList.add("is-focus-revealed"); reveal(card); }
    };
    discover();
    container.dataset.elegantActive = "true";
    const changes = new MutationObserver(discover);
    changes.observe(container, { childList: true, subtree: true });
    container.addEventListener("focusin", onFocus);
    return () => {
      observer.disconnect(); changes.disconnect();
      container.removeEventListener("focusin", onFocus);
      delete container.dataset.elegantActive;
      for (const element of tracked) {
        element.classList.remove("guest-reveal-target", "is-revealed", "is-focus-revealed");
        element.style.removeProperty("--guest-reveal-delay");
      }
    };
  }, [root, enabled, complete, reduced, replayKey]);
}
