"use client";

import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { brushedMetalMaterial, blackPlasticMaterial } from "@/lib/r3f/materials";
import { registerPart } from "@/lib/r3f/refsRegistry";

export function EngineBlock() {
  const engineRef = useRef<THREE.Group>(null);
  const metal = useMemo(() => brushedMetalMaterial("#8f9297"), []);
  const plastic = useMemo(() => blackPlasticMaterial(), []);

  const finPositions = useMemo(
    () => Array.from({ length: 6 }, (_, i) => -0.09 + i * 0.036),
    [],
  );

  useEffect(() => {
    registerPart("engineBlock", engineRef.current);
    return () => registerPart("engineBlock", null);
  }, []);

  return (
    <group ref={engineRef} name="engineBlock" position={[0, 0.55, -0.05]}>
      <mesh material={metal}>
        <boxGeometry args={[0.26, 0.28, 0.42]} />
      </mesh>
      {/* cylinder heads */}
      <mesh position={[0.08, 0.17, 0.05]} rotation={[0, 0, 0.15]} material={metal}>
        <cylinderGeometry args={[0.055, 0.06, 0.18, 12]} />
      </mesh>
      <mesh position={[-0.08, 0.17, 0.05]} rotation={[0, 0, -0.15]} material={metal}>
        <cylinderGeometry args={[0.055, 0.06, 0.18, 12]} />
      </mesh>
      {/* radiator / cooling fins */}
      {finPositions.map((z, i) => (
        <mesh key={i} position={[0, 0.02, z - 0.24]} material={plastic}>
          <boxGeometry args={[0.24, 0.2, 0.006]} />
        </mesh>
      ))}
      {/* sump */}
      <mesh position={[0, -0.19, 0]} material={plastic}>
        <boxGeometry args={[0.2, 0.06, 0.34]} />
      </mesh>
    </group>
  );
}
