"use client";

import { useEffect, useRef, type RefObject } from "react";
import { subscribe, getState } from "./scrollStore";
import { clamp } from "@/lib/utils/lerp";

/**
 * Subscribes an element to scroll progress and reports a 0..1 "reveal" value
 * (0 before progressIn, 1 between in/out, back to 0 after progressOut — or
 * a fade curve depending on `mode`). Runs the callback synchronously off the
 * scrollStore listener (already rAF-paced by ScrollTrigger) — no React
 * re-render, no extra rAF loop.
 */
export function useProgressReveal(
  ref: RefObject<HTMLElement | null>,
  progressIn: number,
  progressOut: number,
  onUpdate: (el: HTMLElement, reveal: number, progress: number) => void,
) {
  const savedCallback = useRef(onUpdate);

  useEffect(() => {
    savedCallback.current = onUpdate;
  });

  useEffect(() => {
    const apply = (progress: number) => {
      const el = ref.current;
      if (!el) return;
      const fadeWindow = Math.max(0.01, (progressOut - progressIn) * 0.25);
      let reveal: number;
      if (progress < progressIn) {
        reveal = 0;
      } else if (progress < progressIn + fadeWindow) {
        reveal = clamp((progress - progressIn) / fadeWindow, 0, 1);
      } else if (progressOut >= 1) {
        // Nothing to fade out into — progress can't go past 1 (end of scroll).
        reveal = 1;
      } else if (progress < progressOut - fadeWindow) {
        reveal = 1;
      } else if (progress < progressOut) {
        reveal = clamp((progressOut - progress) / fadeWindow, 0, 1);
      } else {
        reveal = 0;
      }
      savedCallback.current(el, reveal, progress);
    };

    apply(getState().progress);
    return subscribe((s) => apply(s.progress));
  }, [ref, progressIn, progressOut]);
}
