"use client";

import { useEffect, useRef, useState } from "react";
import { getState } from "@/lib/scroll/scrollStore";

/** Dev-only FPS + scroll-state HUD. Excluded from production via NODE_ENV check at the call site. */
export function PerformanceMonitor() {
  const [fps, setFps] = useState(0);
  const frameCount = useRef(0);
  const lastTime = useRef(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    lastTime.current = performance.now();
    let raf = 0;
    const tick = () => {
      frameCount.current += 1;
      const now = performance.now();
      if (now - lastTime.current >= 500) {
        setFps(Math.round((frameCount.current * 1000) / (now - lastTime.current)));
        frameCount.current = 0;
        lastTime.current = now;
        setProgress(getState().progress);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="pointer-events-none fixed bottom-4 left-4 z-50 rounded bg-black/70 px-3 py-2 font-mono text-[10px] text-lime-400">
      <div>{fps} fps</div>
      <div>progress {(progress * 100).toFixed(1)}%</div>
    </div>
  );
}
