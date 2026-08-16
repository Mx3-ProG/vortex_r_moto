"use client";

import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { titaniumMaterial } from "@/lib/r3f/materials";
import { registerPart } from "@/lib/r3f/refsRegistry";

export function Exhaust() {
  const exhaustRef = useRef<THREE.Group>(null);
  const titanium = useMemo(() => titaniumMaterial(), []);

  const tubeGeometry = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.12, 0.55, -0.15),
      new THREE.Vector3(0.2, 0.4, -0.5),
      new THREE.Vector3(0.24, 0.3, -0.9),
      new THREE.Vector3(0.25, 0.45, -1.25),
      new THREE.Vector3(0.25, 0.48, -1.42),
    ]);
    return new THREE.TubeGeometry(curve, 32, 0.035, 10, false);
  }, []);

  useEffect(() => {
    registerPart("exhaust", exhaustRef.current);
    return () => registerPart("exhaust", null);
  }, []);

  return (
    <group ref={exhaustRef} name="exhaust">
      <mesh geometry={tubeGeometry} material={titanium} />
      <mesh position={[0.25, 0.48, -1.44]} rotation={[Math.PI / 2, 0, 0]} material={titanium}>
        <cylinderGeometry args={[0.055, 0.05, 0.06, 16, 1, true]} />
      </mesh>
    </group>
  );
}
