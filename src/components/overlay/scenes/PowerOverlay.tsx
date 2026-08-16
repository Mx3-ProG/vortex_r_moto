"use client";

import { SCENES } from "@/lib/choreography/scenes";
import { Reveal } from "../Reveal";
import { BigNumber } from "../BigNumber";

const scene = SCENES.find((s) => s.id === "power")!;

export function PowerOverlay() {
  return (
    <>
      {scene.textReveals.map((reveal) =>
        reveal.numeric ? (
          <BigNumber key={reveal.id} reveal={reveal} />
        ) : (
          <Reveal key={reveal.id} reveal={reveal} verticalClass="top-1/2 -translate-y-1/2" />
        ),
      )}
    </>
  );
}
