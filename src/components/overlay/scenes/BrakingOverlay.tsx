"use client";

import { SCENES } from "@/lib/choreography/scenes";
import { Reveal } from "../Reveal";
import { BigNumber } from "../BigNumber";

const scene = SCENES.find((s) => s.id === "braking")!;

export function BrakingOverlay() {
  const [title, number] = scene.textReveals;
  return (
    <>
      <Reveal reveal={title} verticalClass="top-1/2 -translate-y-1/2" />
      <BigNumber reveal={number} />
    </>
  );
}
