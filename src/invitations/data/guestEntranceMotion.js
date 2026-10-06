// Shared timing contract: CSS uses the same durations for its visual transitions.
export function getEntranceTransition(entrance, phase, reducedMotion) {
  if (phase === "opening" && ["embossedIvoryEnvelope", "embossedSageEnvelope"].includes(entrance)) return { next: "finishing", duration: reducedMotion ? 0 : 2400, celebrationDelay: reducedMotion ? null : 1800 };
  if (phase === "opening") return (entrance === "doors" || entrance === "doorsBrown")
    ? { next: "finishing", duration: reducedMotion ? 0 : 4400, celebrationDelay: reducedMotion ? null : 1600 }
    : { next: "opened", duration: reducedMotion ? 0 : 3800, celebrationDelay: reducedMotion ? null : 2400 };
  if (phase === "finishing") return { next: "opened", duration: reducedMotion ? 0 : ["embossedIvoryEnvelope", "embossedSageEnvelope"].includes(entrance) ? 700 : 650, celebrationDelay: null };
  return null;
}
