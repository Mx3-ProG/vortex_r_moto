"use client";

import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { brushedMetalMaterial } from "@/lib/r3f/materials";
import { registerPart } from "@/lib/r3f/refsRegistry";

export function Frame() {
  const frameRef = useRef<THREE.Group>(null);
  const swingArmRef = useRef<THREE.Group>(null);
  const forkRef = useRef<THREE.Group>(null);

  const metal = useMemo(() => brushedMetalMaterial("#7d8085"), []);

  useEffect(() => {
    registerPart("frame", frameRef.current);
    registerPart("swingArm", swingArmRef.current);
    registerPart("forkAssembly", forkRef.current);
    return () => {
      registerPart("frame", null);
      registerPart("swingArm", null);
      registerPart("forkAssembly", null);
    };
  }, []);

  return (
    <>
      <group ref={frameRef} name="frame" position={[0, 0.75, -0.1]}>
        {/* twin-spar backbone */}
        <mesh position={[0.09, 0, 0]} rotation={[0, 0, 0.08]} material={metal}>
          <boxGeometry args={[0.03, 0.09, 1.1]} />
        </mesh>
        <mesh position={[-0.09, 0, 0]} rotation={[0, 0, -0.08]} material={metal}>
          <boxGeometry args={[0.03, 0.09, 1.1]} />
        </mesh>
      </group>

      <group ref={swingArmRef} name="swingArm" position={[0, 0.42, -0.6]}>
        <mesh position={[0.08, 0, -0.35]} material={metal}>
          <boxGeometry args={[0.025, 0.05, 0.9]} />
        </mesh>
        <mesh position={[-0.08, 0, -0.35]} material={metal}>
          <boxGeometry args={[0.025, 0.05, 0.9]} />
        </mesh>
      </group>

      <group ref={forkRef} name="forkAssembly" position={[0, 0.6, 0.75]} rotation={[0.35, 0, 0]}>
        <mesh position={[0.09, 0, 0]} material={metal}>
          <cylinderGeometry args={[0.017, 0.017, 0.62, 12]} />
        </mesh>
        <mesh position={[-0.09, 0, 0]} material={metal}>
          <cylinderGeometry args={[0.017, 0.017, 0.62, 12]} />
        </mesh>
      </group>
    </>
  );
}
