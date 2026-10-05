// Shared timing contract: CSS uses the same durations for its visual transitions.
export function getEntranceTransition(entrance, phase, reducedMotion) {
  if (phase === "opening" && entrance === "portraitEnvelope") return { next: "opened", duration: reducedMotion ? 0 : 2600, celebrationDelay: reducedMotion ? null : 1900 };
  if (phase === "opening") return (entrance === "doors" || entrance === "doorsBrown")
    ? { next: "preview", duration: reducedMotion ? 0 : 4400, celebrationDelay: reducedMotion ? null : 1600 }
    : { next: "opened", duration: reducedMotion ? 0 : 3800, celebrationDelay: reducedMotion ? null : 2400 };
  if (phase === "finishing") return { next: "opened", duration: reducedMotion ? 0 : 650, celebrationDelay: null };
  return null;
}
