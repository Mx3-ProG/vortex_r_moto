"use client";

import { useMemo } from "react";
import { brushedMetalMaterial, blackPlasticMaterial } from "@/lib/r3f/materials";

interface BrakeDiscProps {
  position: [number, number, number];
  radius?: number;
}

export function BrakeDisc({ position, radius = 0.13 }: BrakeDiscProps) {
  const discMaterial = useMemo(() => brushedMetalMaterial("#d8d8da"), []);
  const caliperMaterial = useMemo(() => blackPlasticMaterial(), []);

  return (
    <group position={position}>
      <mesh rotation={[0, 0, Math.PI / 2]} material={discMaterial} castShadow>
        <cylinderGeometry args={[radius, radius, 0.008, 32]} />
      </mesh>
      <mesh position={[0, radius * 0.55, 0]} material={caliperMaterial}>
        <boxGeometry args={[0.03, radius * 0.5, 0.06]} />
      </mesh>
    </group>
  );
}
