import { getGuestSlideshowMotion } from "../data/guestScrollMotion.js";
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

export function useGuestSectionFlow(root, enabled, reduced) {
  useLayoutEffect(() => {
    const container = root.current;
    if (!container || !enabled || reduced) return;
    const tracked = new Set();
    const focusOffsets = new Map();
    const revealedProgress = new Map();
    let frame = 0;
    const update = () => {
      frame = 0;
      const active = document.activeElement;
      // Read every position before writing styles to avoid repeated layout work.
      const measurements = Array.from(tracked).map(section => ({ section, rect: section.getBoundingClientRect() }));
      for (const { section, rect } of measurements) {
        const motion = getGuestSlideshowMotion(rect.top, rect.height, window.innerHeight, window.innerWidth, section.contains(active), section.classList.contains("guest-event-screen") ? "event" : section.dataset.section ?? "default", revealedProgress.get(section) ?? 0);
        revealedProgress.set(section, section.contains(active) ? Math.max(.5, motion.progress) : motion.progress);
        if (section.contains(active)) {
          if (!focusOffsets.has(section)) focusOffsets.set(section, {
            y: parseFloat(section.style.getPropertyValue("--screen-y")) || 0,
            detailY: parseFloat(section.style.getPropertyValue("--screen-detail-y")) || 0,
          });
          Object.assign(motion, focusOffsets.get(section));
        } else focusOffsets.delete(section);
        section.style.setProperty("--screen-x", `${motion.x.toFixed(2)}px`);
        section.style.setProperty("--screen-layer", String(motion.layer));
        section.style.setProperty("--screen-opacity", motion.opacity.toFixed(4));
        section.style.setProperty("--screen-y", `${motion.y.toFixed(2)}px`);
        section.style.setProperty("--screen-detail-y", `${motion.detailY.toFixed(2)}px`);
        section.style.setProperty("--screen-detail-opacity", motion.detailOpacity.toFixed(4));
        section.style.setProperty("--screen-scale", motion.scale.toFixed(4));
        section.style.setProperty("--screen-parallax", `${motion.parallax.toFixed(2)}px`);
      }
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const discover = () => {
      const candidates = container.querySelectorAll(".guest-event-screen, .guest-section-screen, .guest-invitation-column, .guest-main-card");
      for (const section of candidates) {
        if (section.matches(".guest-invitation-column") && getComputedStyle(section).display === "contents") continue;
        if (section.matches(".guest-main-card") && getComputedStyle(section.parentElement).display !== "contents") continue;
        tracked.add(section); section.classList.add("guest-scroll-screen");
      }
      for (const section of tracked) if (!container.contains(section)
        || section.matches(".guest-invitation-column") && getComputedStyle(section).display === "contents"
        || section.matches(".guest-main-card") && getComputedStyle(section.parentElement).display !== "contents") {
        clearSection(section); tracked.delete(section);
      }
      schedule();
    };
    function clearSection(section) {
      focusOffsets.delete(section);
      revealedProgress.delete(section);
      section.classList.remove("guest-scroll-screen");
      for (const property of ["opacity", "x", "y", "detail-y", "detail-opacity", "scale", "parallax", "layer"]) section.style.removeProperty(`--screen-${property}`);
    }
    discover(); cancelAnimationFrame(frame); update();
    const changes = new MutationObserver(discover);
    changes.observe(container, { childList: true, subtree: true });
    const resize = () => discover();
    document.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", resize);
    container.addEventListener("focusin", schedule);
    container.addEventListener("focusout", schedule);
    return () => {
      cancelAnimationFrame(frame); changes.disconnect();
      document.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", resize);
      container.removeEventListener("focusin", schedule);
      container.removeEventListener("focusout", schedule);
      for (const section of tracked) clearSection(section);
    };
  }, [root, enabled, reduced]);
}

export function useGuestCenteredScroll(root, reduced) {
  useEffect(() => {
    if (reduced) return;
    let timer;
    let settling = false;
    const settle = () => {
      if (settling) { settling = false; return; }
      if (document.querySelector("dialog[open]") || document.activeElement?.matches("input, textarea, select, [contenteditable=true]")) return;
      const available = window.innerHeight - 66;
      const center = 66 + available / 2;
      const candidates = Array.from(root.current?.querySelectorAll(".guest-event-screen, .guest-section-screen, .guest-invitation-column, .guest-main-card") ?? [])
        .map(element => element.getBoundingClientRect())
        .filter(rect => rect.width > 0 && rect.height > 0 && rect.height <= available + 2)
        .map(rect => rect.top + rect.height / 2 - center)
        .sort((a, b) => Math.abs(a) - Math.abs(b));
      const distance = candidates[0];
      if (distance === undefined || Math.abs(distance) < 2 || Math.abs(distance) > available * .45) return;
      const top = Math.max(0, Math.min(document.documentElement.scrollHeight - window.innerHeight, window.scrollY + distance));
      if (Math.abs(top - window.scrollY) < 2) return;
      settling = true;
      window.scrollTo({ top, behavior: "smooth" });
    };
    const onScroll = () => { clearTimeout(timer); timer = setTimeout(settle, 180); };
    document.addEventListener("scroll", onScroll, { passive: true });
    return () => { clearTimeout(timer); document.removeEventListener("scroll", onScroll); };
  }, [root, reduced]);
}

export function useGuestComponentReveals(root, reduced) {
  useLayoutEffect(() => {
    const container = root.current;
    if (!container || reduced || typeof IntersectionObserver === "undefined") return;
    const tracked = new Set();
    const counts = new Map();
    const reveal = element => {
      element.classList.add("is-component-visible");
      observer.unobserve(element);
    };
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) reveal(entry.target);
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
      for (const element of tracked) if (!container.contains(element)) { observer.unobserve(element); tracked.delete(element); }
    };
    const onFocus = event => {
      const element = event.target.closest(".guest-component-reveal");
      if (element) { element.classList.add("is-component-focused"); reveal(element); }
    };
    discover();
    const changes = new MutationObserver(discover);
    changes.observe(container, { childList: true, subtree: true });
    container.addEventListener("focusin", onFocus);
    return () => {
      observer.disconnect(); changes.disconnect(); container.removeEventListener("focusin", onFocus);
      for (const element of tracked) {
        element.classList.remove("guest-component-reveal", "is-component-visible", "is-component-focused");
        element.style.removeProperty("--component-delay");
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
