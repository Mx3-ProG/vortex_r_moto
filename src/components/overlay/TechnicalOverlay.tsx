"use client";

import { IntroOverlay } from "./scenes/IntroOverlay";
import { DiscoveryOverlay } from "./scenes/DiscoveryOverlay";
import { EngineOverlay } from "./scenes/EngineOverlay";
import { PowerOverlay } from "./scenes/PowerOverlay";
import { AeroOverlay } from "./scenes/AeroOverlay";
import { BrakingOverlay } from "./scenes/BrakingOverlay";
import { WeightOverlay } from "./scenes/WeightOverlay";
import { CockpitOverlay } from "./scenes/CockpitOverlay";
import { FinalOverlay } from "./scenes/FinalOverlay";

/**
 * All per-scene overlays are mounted simultaneously — each individual
 * Reveal/BigNumber self-gates its own visibility from scrollStore, so
 * there is no scene-level mount/unmount churn during scroll.
 */
export function TechnicalOverlay() {
  return (
    <div className="pointer-events-none absolute inset-0 z-20">
      <IntroOverlay />
      <DiscoveryOverlay />
      <EngineOverlay />
      <PowerOverlay />
      <AeroOverlay />
      <BrakingOverlay />
      <WeightOverlay />
      <CockpitOverlay />
      <FinalOverlay />
    </div>
  );
}
