"use client";

import { SCENES } from "@/lib/choreography/scenes";
import { Reveal } from "../Reveal";

const scene = SCENES.find((s) => s.id === "discovery")!;

export function DiscoveryOverlay() {
  return (
    <>
      {scene.textReveals.map((reveal) => (
        <Reveal key={reveal.id} reveal={reveal} verticalClass="" />
      ))}
    </>
  );
}
