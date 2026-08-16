"use client";

import { useEffect, useRef } from "react";
import { SCENES } from "@/lib/choreography/scenes";
import { hotspotScreenPositions } from "@/lib/r3f/hotspotPositions";
import { setOpenHotspot } from "@/lib/r3f/hotspotInteraction";
import { Hotspot } from "./Hotspot";

interface HotspotLayerProps {
  isTouch: boolean;
  maxHotspots: number;
}

export function HotspotLayer({ isTouch, maxHotspots }: HotspotLayerProps) {
  const nodeRefs = useRef(new Map<string, HTMLDivElement>());
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const tick = () => {
      nodeRefs.current.forEach((el, id) => {
        const pos = hotspotScreenPositions.get(id);
        if (!pos) return;
        const visible = pos.active && !pos.behindCamera && pos.x > -0.05 && pos.x < 1.05 && pos.y > -0.05 && pos.y < 1.05;
        el.style.left = `${pos.x * 100}%`;
        el.style.top = `${pos.y * 100}%`;
        el.style.opacity = visible ? "1" : "0";
        el.style.pointerEvents = visible ? "auto" : "none";
      });
      frameRef.current = requestAnimationFrame(tick);
    };
    frameRef.current = requestAnimationFrame(tick);
    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  useEffect(() => {
    if (!isTouch) return;
    const onDocClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("[data-hotspot-id]")) setOpenHotspot(null);
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, [isTouch]);

  const bySceneCapped = SCENES.flatMap((s) => (s.hotspots ?? []).slice(0, maxHotspots));

  return (
    <div className="pointer-events-none absolute inset-0 z-30">
      {bySceneCapped.map((def) => (
        <Hotspot
          key={def.id}
          def={def}
          isTouch={isTouch}
          ref={(el) => {
            if (el) nodeRefs.current.set(def.id, el);
            else nodeRefs.current.delete(def.id);
          }}
        />
      ))}
    </div>
  );
}
