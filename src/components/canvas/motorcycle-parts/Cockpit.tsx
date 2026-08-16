"use client";

import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { blackPlasticMaterial, brushedMetalMaterial } from "@/lib/r3f/materials";
import { registerPart } from "@/lib/r3f/refsRegistry";

export function Cockpit() {
  const cockpitRef = useRef<THREE.Group>(null);
  const metal = useMemo(() => brushedMetalMaterial("#9a9da2"), []);
  const plastic = useMemo(() => blackPlasticMaterial(), []);

  useEffect(() => {
    registerPart("cockpit", cockpitRef.current);
    return () => registerPart("cockpit", null);
  }, []);

  return (
    <group ref={cockpitRef} name="cockpit" position={[0, 1.05, 0.55]}>
      {/* handlebars */}
      <mesh rotation={[0, 0, Math.PI / 2]} material={metal}>
        <cylinderGeometry args={[0.012, 0.012, 0.42, 10]} />
      </mesh>
      <mesh position={[0.19, -0.02, 0.06]} rotation={[0.3, -0.3, 0]} material={plastic}>
        <cylinderGeometry args={[0.014, 0.014, 0.12, 8]} />
      </mesh>
      <mesh position={[-0.19, -0.02, 0.06]} rotation={[0.3, 0.3, 0]} material={plastic}>
        <cylinderGeometry args={[0.014, 0.014, 0.12, 8]} />
      </mesh>
      {/* dash housing */}
      <mesh position={[0, 0.02, -0.05]} material={plastic}>
        <boxGeometry args={[0.16, 0.07, 0.03]} />
      </mesh>
      {/* mirrors */}
      <mesh position={[0.22, 0.1, 0.02]} material={plastic}>
        <boxGeometry args={[0.05, 0.03, 0.02]} />
      </mesh>
      <mesh position={[-0.22, 0.1, 0.02]} material={plastic}>
        <boxGeometry args={[0.05, 0.03, 0.02]} />
      </mesh>
      {/* seat */}
      <mesh position={[0, -0.35, -0.55]} material={plastic}>
        <boxGeometry args={[0.24, 0.06, 0.55]} />
      </mesh>
    </group>
  );
}
