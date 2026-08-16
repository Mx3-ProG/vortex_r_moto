"use client";

import { useEffect, useState } from "react";

export type Tier = "mobile" | "tablet" | "desktop";

export interface TierSettings {
  tier: Tier;
  dpr: [number, number];
  detail: "high" | "low";
  glassTransmission: boolean;
  particles: boolean;
  mouseParallax: boolean;
  maxHotspots: number;
}

function computeTier(width: number): Tier {
  if (width < 768) return "mobile";
  if (width < 1024) return "tablet";
  return "desktop";
}

function settingsFor(tier: Tier): TierSettings {
  switch (tier) {
    case "mobile":
      return {
        tier,
        dpr: [1, 1],
        detail: "low",
        glassTransmission: false,
        particles: false,
        mouseParallax: false,
        maxHotspots: 2,
      };
    case "tablet":
      return {
        tier,
        dpr: [1, 1.5],
        detail: "high",
        glassTransmission: false,
        particles: true,
        mouseParallax: false,
        maxHotspots: 3,
      };
    case "desktop":
    default:
      return {
        tier,
        dpr: [1, 2],
        detail: "high",
        glassTransmission: true,
        particles: true,
        mouseParallax: true,
        maxHotspots: 4,
      };
  }
}

export function useResponsiveTier(): TierSettings {
  const [tier, setTier] = useState<Tier>("desktop");

  useEffect(() => {
    let frame = 0;
    const update = () => setTier(computeTier(window.innerWidth));
    update();
    const onResize = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
    };
  }, []);

  return settingsFor(tier);
}
