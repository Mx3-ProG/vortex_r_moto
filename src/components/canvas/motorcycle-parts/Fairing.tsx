"use client";

import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { carbonFiberMaterial, glassMaterial, paintRedMaterial } from "@/lib/r3f/materials";
import { registerPart } from "@/lib/r3f/refsRegistry";

interface FairingProps {
  glassTransmission: boolean;
}

export function Fairing({ glassTransmission }: FairingProps) {
  const fairingRef = useRef<THREE.Group>(null);
  const windscreenRef = useRef<THREE.Group>(null);
  const wingletsRef = useRef<THREE.Group>(null);
  const tankRef = useRef<THREE.Group>(null);
  const tailRef = useRef<THREE.Group>(null);

  const carbon = useMemo(() => carbonFiberMaterial(), []);
  const paint = useMemo(() => paintRedMaterial(), []);
  const glass = useMemo(() => glassMaterial(glassTransmission), [glassTransmission]);

  const noseGeometry = useMemo(() => {
    const points: THREE.Vector2[] = [];
    for (let i = 0; i <= 10; i++) {
      const t = i / 10;
      points.push(new THREE.Vector2(0.22 * (1 - t * t) + 0.03, t * 0.45));
    }
    return new THREE.LatheGeometry(points, 24, 0, Math.PI);
  }, []);

  const tankGeometry = useMemo(() => {
    const points: THREE.Vector2[] = [];
    for (let i = 0; i <= 8; i++) {
      const t = i / 8;
      const r = Math.sin(t * Math.PI) * 0.19 + 0.02;
      points.push(new THREE.Vector2(r, t * 0.55 - 0.27));
    }
    return new THREE.LatheGeometry(points, 20, -Math.PI / 2, Math.PI);
  }, []);

  useEffect(() => {
    registerPart("fairing", fairingRef.current);
    registerPart("windscreen", windscreenRef.current);
    registerPart("winglets", wingletsRef.current);
    registerPart("tank", tankRef.current);
    registerPart("tail", tailRef.current);
    return () => {
      registerPart("fairing", null);
      registerPart("windscreen", null);
      registerPart("winglets", null);
      registerPart("tank", null);
      registerPart("tail", null);
    };
  }, []);

  return (
    <>
      <group ref={fairingRef} name="fairing" position={[0, 0.6, 1.3]} rotation={[0, Math.PI / 2, 0]}>
        <mesh geometry={noseGeometry} material={carbon} rotation={[0, 0, Math.PI / 2]} />
      </group>

      <group ref={windscreenRef} name="windscreen" position={[0, 0.82, 1.15]} rotation={[-0.35, 0, 0]}>
        <mesh material={glass}>
          <sphereGeometry args={[0.16, 16, 12, 0, Math.PI]} />
        </mesh>
      </group>

      <group ref={wingletsRef} name="winglets">
        <mesh position={[0.32, 0.6, 1.02]} rotation={[0, 0, -0.25]} material={carbon}>
          <boxGeometry args={[0.16, 0.02, 0.09]} />
        </mesh>
        <mesh position={[-0.32, 0.6, 1.02]} rotation={[0, 0, 0.25]} material={carbon}>
          <boxGeometry args={[0.16, 0.02, 0.09]} />
        </mesh>
      </group>

      <group ref={tankRef} name="tank" position={[0, 0.85, 0.15]}>
        <mesh geometry={tankGeometry} material={paint} />
      </group>

      <group ref={tailRef} name="tail" position={[0, 0.72, -1.15]}>
        <mesh material={paint} rotation={[-Math.PI / 2, 0, 0]}>
          <coneGeometry args={[0.16, 0.42, 16, 1, true]} />
        </mesh>
        <mesh position={[0, -0.02, -0.2]} material={carbon}>
          <boxGeometry args={[0.24, 0.05, 0.22]} />
        </mesh>
      </group>
    </>
  );
}
