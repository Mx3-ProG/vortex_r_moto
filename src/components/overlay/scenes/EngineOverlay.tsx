"use client";

import { SCENES } from "@/lib/choreography/scenes";
import { Reveal } from "../Reveal";
import { BigNumber } from "../BigNumber";

const scene = SCENES.find((s) => s.id === "engine")!;

const VERTICAL_OFFSET: Record<string, string> = {
  "engine-eyebrow": "top-[36%] -translate-y-1/2",
  "engine-title": "top-[44%] -translate-y-1/2",
};

export function EngineOverlay() {
  const [eyebrow, title, ...bigNumbers] = scene.textReveals;

  return (
    <>
      <Reveal reveal={eyebrow} verticalClass={VERTICAL_OFFSET[eyebrow.id]} />
      <Reveal reveal={title} verticalClass={VERTICAL_OFFSET[title.id]} />
      {bigNumbers.map((reveal) => (
        <BigNumber key={reveal.id} reveal={reveal} />
      ))}
    </>
  );
}
