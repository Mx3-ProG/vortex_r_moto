"use client";

import { SCENES } from "@/lib/choreography/scenes";
import { Reveal } from "../Reveal";

const scene = SCENES.find((s) => s.id === "intro")!;

const VERTICAL_OFFSET: Record<string, string> = {
  "intro-eyebrow": "top-[38%] -translate-y-1/2",
  "intro-title": "top-[47%] -translate-y-1/2",
  "intro-subtitle": "top-[58%] -translate-y-1/2",
};

export function IntroOverlay() {
  return (
    <>
      {scene.textReveals.map((reveal) => (
        <Reveal key={reveal.id} reveal={reveal} verticalClass={VERTICAL_OFFSET[reveal.id]} />
      ))}
    </>
  );
}
