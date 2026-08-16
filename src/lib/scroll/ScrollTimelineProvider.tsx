"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { CHOREOGRAPHY } from "@/lib/choreography/config";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { ensureGsapRegistered, ScrollTrigger } from "./gsapSetup";
import { setProgress } from "./scrollStore";

interface ScrollTimelineProviderProps {
  children: ReactNode;
}

/**
 * Mounts the tall scroll track and the single master ScrollTrigger that
 * drives the entire experience. Everything else reads progress from
 * `scrollStore` — nothing here triggers React re-renders per frame.
 */
export function ScrollTimelineProvider({ children }: ScrollTimelineProviderProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    ensureGsapRegistered();
    if (!trackRef.current) return;

    const st = ScrollTrigger.create({
      trigger: trackRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: reducedMotion ? 0.3 : 1,
      onUpdate: (self) => {
        setProgress(self.progress, self.getVelocity() / 1000);
      },
    });

    return () => {
      st.kill();
    };
  }, [reducedMotion]);

  return (
    <div
      id="experience-track"
      ref={trackRef}
      style={{ height: `${CHOREOGRAPHY.totalScrollHeightVh}vh`, position: "relative" }}
    >
      <div id="experience-viewport" className="sticky top-0 h-screen w-full overflow-hidden">
        {children}
      </div>
    </div>
  );
}
