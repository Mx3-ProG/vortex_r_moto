"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { ScrollTimelineProvider } from "@/lib/scroll/ScrollTimelineProvider";
import { MotorcycleScene } from "./canvas/MotorcycleScene";
import { TechnicalOverlay } from "./overlay/TechnicalOverlay";
import { HotspotLayer } from "./overlay/HotspotLayer";
import { ProgressNavigation } from "./nav/ProgressNavigation";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { useResponsiveTier } from "@/lib/hooks/useResponsiveTier";
import { useMouseParallax } from "@/lib/r3f/useMouseParallax";

const PerformanceMonitor = dynamic(
  () => import("./dev/PerformanceMonitor").then((m) => m.PerformanceMonitor),
  { ssr: false },
);

export function Experience() {
  const reducedMotion = useReducedMotion();
  const tier = useResponsiveTier();
  const mouseRef = useMouseParallax(tier.mouseParallax && !reducedMotion);
  const [showPerf] = useState(
    () =>
      process.env.NODE_ENV === "development" &&
      typeof window !== "undefined" &&
      new URLSearchParams(window.location.search).has("debug"),
  );

  const isTouch = tier.tier !== "desktop";

  return (
    <main className="relative bg-void">
      <ScrollTimelineProvider>
        <MotorcycleScene tier={tier} reducedMotion={reducedMotion} mouseRef={mouseRef} />
        <TechnicalOverlay />
        <HotspotLayer isTouch={isTouch} maxHotspots={tier.maxHotspots} />
      </ScrollTimelineProvider>
      <ProgressNavigation />
      {showPerf && <PerformanceMonitor />}
    </main>
  );
}
