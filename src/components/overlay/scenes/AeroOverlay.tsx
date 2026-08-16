"use client";

import { SCENES } from "@/lib/choreography/scenes";
import { Reveal } from "../Reveal";

const scene = SCENES.find((s) => s.id === "aero")!;

const VERTICAL_OFFSET: Record<string, string> = {
  "aero-title": "top-[42%] -translate-y-1/2",
  "aero-subtitle": "top-[52%] -translate-y-1/2",
};

export function AeroOverlay() {
  return (
    <>
      {scene.textReveals.map((reveal) => (
        <Reveal key={reveal.id} reveal={reveal} verticalClass={VERTICAL_OFFSET[reveal.id]} />
      ))}
    </>
  );
}
