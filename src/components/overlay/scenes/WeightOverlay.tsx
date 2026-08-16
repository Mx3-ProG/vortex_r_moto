"use client";

import { SCENES } from "@/lib/choreography/scenes";
import { Reveal } from "../Reveal";
import { BigNumber } from "../BigNumber";

const scene = SCENES.find((s) => s.id === "weight")!;

export function WeightOverlay() {
  const [number, label] = scene.textReveals;
  return (
    <>
      <BigNumber reveal={number} />
      <Reveal reveal={label} verticalClass="top-[64%] -translate-y-1/2" />
    </>
  );
}
