"use client";

import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { blackPlasticMaterial, brushedMetalMaterial } from "@/lib/r3f/materials";
import { registerPart } from "@/lib/r3f/refsRegistry";
import type { PartName } from "@/lib/choreography/types";
import { BrakeDisc } from "./BrakeDiscs";

interface WheelProps {
  position: [number, number, number];
  partName: Extract<PartName, "wheelFront" | "wheelRear">;
  discPartName: Extract<PartName, "brakeDiscFront" | "brakeDiscRear">;
  radius?: number;
  detail: "high" | "low";
}

const SPOKE_COUNT_HIGH = 9;
const SPOKE_COUNT_LOW = 5;

export function Wheel({ position, partName, discPartName, radius = 0.32, detail }: WheelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const discGroupRef = useRef<THREE.Group>(null);
  const spokesRef = useRef<THREE.InstancedMesh>(null);

  const tireMaterial = useMemo(() => blackPlasticMaterial(), []);
  const rimMaterial = useMemo(() => brushedMetalMaterial("#a9acb0"), []);

  const spokeCount = detail === "high" ? SPOKE_COUNT_HIGH : SPOKE_COUNT_LOW;

  useEffect(() => {
    registerPart(partName, groupRef.current);
    registerPart(discPartName, discGroupRef.current);
    return () => {
      registerPart(partName, null);
      registerPart(discPartName, null);
    };
  }, [partName, discPartName]);

  useEffect(() => {
    if (!spokesRef.current) return;
    const dummy = new THREE.Object3D();
    for (let i = 0; i < spokeCount; i++) {
      const angle = (i / spokeCount) * Math.PI * 2;
      dummy.position.set(0, 0, 0);
      dummy.rotation.set(0, 0, angle);
      dummy.updateMatrix();
      spokesRef.current.setMatrixAt(i, dummy.matrix);
    }
    spokesRef.current.instanceMatrix.needsUpdate = true;
  }, [spokeCount]);

  return (
    <group position={position} ref={groupRef} name={partName}>
      <mesh rotation={[0, 0, Math.PI / 2]} material={tireMaterial} castShadow receiveShadow>
        <torusGeometry args={[radius, radius * 0.28, 16, detail === "high" ? 32 : 18]} />
      </mesh>
      <mesh rotation={[0, 0, Math.PI / 2]} material={rimMaterial}>
        <cylinderGeometry args={[radius * 0.55, radius * 0.55, 0.05, 24]} />
      </mesh>
      <instancedMesh
        ref={spokesRef}
        args={[undefined, undefined, spokeCount]}
        material={rimMaterial}
      >
        <boxGeometry args={[0.015, radius * 1.0, 0.015]} />
      </instancedMesh>
      <mesh material={blackPlasticMaterial()}>
        <sphereGeometry args={[0.06, 16, 16]} />
      </mesh>
      <group ref={discGroupRef} name={discPartName}>
        <BrakeDisc position={[0.05, 0, 0]} />
      </group>
    </group>
  );
}
