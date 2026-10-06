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

export function useGuestComponentReveals(root, reduced) {
  useLayoutEffect(() => {
    const container = root.current;
    if (!container || reduced || typeof IntersectionObserver === "undefined") return;
    const tracked = new Set();
    const counts = new Map();
    const reveal = element => {
      element.classList.add("is-component-visible");
    };
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) reveal(entry.target);
        else if (!entry.target.matches(":focus-within")) {
          entry.target.classList.remove("is-component-visible", "is-component-focused");
        }
      }
    }, { threshold: .04, rootMargin: "0px 0px -24px 0px" });
    const discover = () => {
      const candidates = container.querySelectorAll([
        ".guest-note-content > h2", ".guest-note-content > p", ".guest-note-content > .guest-note-rule",
        ".guest-rsvp form > h2", ".guest-name-field", ".guest-attendance-options", ".guest-party-size",
        ".guest-note-field", ".guest-rsvp form > .guest-button", ".guest-reply-settings",
        ".guest-event-tools > h2", ".guest-event-zone", ".guest-countdown > div", ".guest-event-date", ".guest-calendar-menu",
        ".guest-gallery-heading", ".guest-polaroid", ".guest-plan-items > li", ".guest-reply-confirmation > *",
        ".guest-editable-artwork [data-card-edit]", ".guest-card-decoration > img",
      ].join(","));
      for (const element of candidates) {
        if (tracked.has(element) || element.parentElement.closest(".guest-component-reveal")) continue;
        const card = element.closest(".guest-note, .guest-gallery, .guest-main-card");
        const index = counts.get(card) ?? 0;
        counts.set(card, index + 1);
        tracked.add(element);
        element.style.setProperty("--component-delay", `${Math.min(index, 4) * 65}ms`);
        element.classList.add("guest-component-reveal");
        observer.observe(element);
      }
      for (const list of container.querySelectorAll(".wedding-stationery .guest-custom-moments ol")) {
        list.querySelectorAll(":scope > li").forEach((item, index) => item.style.setProperty("--moment-delay", `${150 + index * 190}ms`));
        if (tracked.has(list)) continue;
        tracked.add(list);
        list.classList.add("guest-moments-reveal");
        observer.observe(list);
      }
      for (const element of tracked) if (!container.contains(element)) { observer.unobserve(element); tracked.delete(element); }
    };
    const onFocus = event => {
      const element = event.target.closest(".guest-component-reveal, .guest-moments-reveal");
      if (element) { element.classList.add("is-component-focused"); reveal(element); }
    };
    discover();
    const changes = new MutationObserver(discover);
    changes.observe(container, { childList: true, subtree: true });
    container.addEventListener("focusin", onFocus);
    return () => {
      observer.disconnect(); changes.disconnect(); container.removeEventListener("focusin", onFocus);
      for (const element of tracked) {
        element.classList.remove("guest-component-reveal", "guest-moments-reveal", "is-component-visible", "is-component-focused");
        element.style.removeProperty("--component-delay");
        if (element.matches("ol")) element.querySelectorAll(":scope > li").forEach(item => item.style.removeProperty("--moment-delay"));
      }
    };
  }, [root, reduced]);
}

export function useElegantGuestMotion(root, enabled, complete, reduced, replayKey) {
  useLayoutEffect(() => {
    const container = root.current;
    if (!enabled || !complete || reduced || typeof IntersectionObserver === "undefined") return;
    const tracked = new Set();
    const reveal = element => {
      element.classList.add("is-revealed");
    };
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) reveal(entry.target);
        else if (!entry.target.matches(":focus-within")) {
          entry.target.classList.remove("is-revealed", "is-focus-revealed");
        }
      }
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
