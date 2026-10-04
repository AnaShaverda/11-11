const clamp = value => Math.min(1, Math.max(0, value));
const smooth = value => { const t = clamp(value); return t * t * (3 - 2 * t); };

// Entry progresses with scrolling; the caller preserves progress after revealing.
export function getGuestSectionMotion(top, height, viewportHeight, focused = false, minimumProgress = 0) {
  const available = Math.max(1, viewportHeight - 66);
  const progress = Math.max(minimumProgress, clamp((viewportHeight - top) / (height + available)));
  const entrance = smooth(progress / .28);
  return {
    progress,
    opacity: focused ? 1 : entrance,
    y: focused ? 0 : 24 * (1 - entrance),
    scale: focused ? 1 : 1 - .015 * (1 - entrance),
    parallax: focused ? 0 : (1 - entrance) * 20,
  };
}

export function getGuestSlideshowMotion(top, height, viewportHeight, viewportWidth, focused = false, kind = 'default', minimumProgress = 0) {
  const motion = getGuestSectionMotion(top, height, viewportHeight, focused, minimumProgress);
  const fits = height <= viewportHeight - 66 + 2;
  const enter = smooth(motion.progress / .38);
  const calmForm = kind === 'rsvp' || kind === 'notes';
  const entryOffset = calmForm ? 8 : kind === 'event' ? 18 : 12;
  const drift = focused ? 0 : entryOffset * (1 - enter);
  return {
    ...motion,
    opacity: focused ? 1 : fits ? enter : motion.opacity,
    x: 0,
    y: drift,
    detailY: (focused ? 0 : kind === 'event' ? drift * 1.65 : drift),
    detailOpacity: focused ? 1 : kind === 'event' && fits ? smooth((motion.progress - .03) / .35) : focused ? 1 : fits ? enter : motion.opacity,
    scale: focused || calmForm ? 1 : kind === 'gallery' ? 1 + .025 * (1 - enter) : 1 - .012 * (1 - enter),
    parallax: focused || calmForm ? 0 : (1 - enter) * 10,
    layer: 1,
  };
}
