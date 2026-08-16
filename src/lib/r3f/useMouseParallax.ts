"use client";

import { useEffect, useRef } from "react";

export interface MouseState {
  x: number;
  y: number;
}

/**
 * Tracks normalized (-1..1) pointer position in a mutable ref, rAF-throttled.
 * Never triggers React re-renders — read `.current` inside useFrame.
 */
export function useMouseParallax(enabled: boolean) {
  const mouse = useRef<MouseState>({ x: 0, y: 0 });
  const raw = useRef<MouseState>({ x: 0, y: 0 });
  const frame = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled) {
      mouse.current.x = 0;
      mouse.current.y = 0;
      return;
    }

    const onMove = (e: PointerEvent) => {
      raw.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      raw.current.y = (e.clientY / window.innerHeight) * 2 - 1;
      if (frame.current === null) {
        frame.current = requestAnimationFrame(() => {
          mouse.current.x = raw.current.x;
          mouse.current.y = raw.current.y;
          frame.current = null;
        });
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, [enabled]);

  return mouse;
}
