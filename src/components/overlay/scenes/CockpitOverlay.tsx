"use client";

import { SCENES } from "@/lib/choreography/scenes";
import { Reveal } from "../Reveal";

const scene = SCENES.find((s) => s.id === "cockpit")!;

const VERTICAL_OFFSET: Record<string, string> = {
  "cockpit-gear": "top-[38%] -translate-y-1/2",
  "cockpit-rpm": "top-[48%] -translate-y-1/2",
  "cockpit-speed": "top-1/2 -translate-y-1/2",
  "cockpit-mode": "top-[36%] -translate-y-1/2",
  "cockpit-traction": "top-[46%] -translate-y-1/2",
  "cockpit-abs": "top-[56%] -translate-y-1/2",
};

export function CockpitOverlay() {
  return (
    <>
      {scene.textReveals.map((reveal) => (
        <Reveal
          key={reveal.id}
          reveal={reveal}
          verticalClass={VERTICAL_OFFSET[reveal.id]}
          className="font-body text-[11px] sm:text-xs tracking-[0.3em] text-paper/80 uppercase border-l-2 border-red/70 pl-3"
        />
      ))}
    </>
  );
}
