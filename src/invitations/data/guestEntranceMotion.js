// Shared timing contract: CSS uses the same durations for its visual transitions.
export function getEntranceTransition(entrance, phase, reducedMotion) {
  if (phase === "opening" && ["bordeauxLaceEnvelope", "greenLaceEnvelope", "roseFiberEnvelope"].includes(entrance)) return { next: "opened", duration: reducedMotion ? 0 : 4600, celebrationDelay: reducedMotion ? null : 4100 };
  if (phase === "opening" && entrance === "stampedPaper") return { next: "opened", duration: reducedMotion ? 0 : 2200, celebrationDelay: reducedMotion ? null : 1100 };
  if (phase === "opening" && ["classicBurgundyEnvelope", "ivoryPaperEnvelope", "pinkPaperEnvelope", "bluePaperEnvelope", "redVelvetEnvelope", "redPortraitEnvelope", "pastelGreenEnvelope", "embossedIvoryEnvelope", "embossedSageEnvelope", "embossedBurgundyEnvelope"].includes(entrance)) return { next: "opened", duration: reducedMotion ? 0 : 4600, celebrationDelay: reducedMotion ? null : 3900 };
  if (phase === "opening" && ["embossedIvoryEnvelope", "embossedSageEnvelope"].includes(entrance)) return { next: "finishing", duration: reducedMotion ? 0 : 2400, celebrationDelay: reducedMotion ? null : 1800 };
  if (phase === "opening") return (["doors", "doorsBrown", "doorsBlueFloral"].includes(entrance))
    ? { next: "finishing", duration: reducedMotion ? 0 : 4400, celebrationDelay: reducedMotion ? null : 1600 }
    : { next: "opened", duration: reducedMotion ? 0 : 3800, celebrationDelay: reducedMotion ? null : 2400 };
  if (phase === "finishing") return { next: "opened", duration: reducedMotion ? 0 : ["embossedIvoryEnvelope", "embossedSageEnvelope"].includes(entrance) ? 700 : 650, celebrationDelay: null };
  return null;
}
