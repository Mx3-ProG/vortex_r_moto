"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { getState } from "@/lib/scroll/scrollStore";
import { sampleLighting } from "@/lib/choreography/scenes";

/**
 * Three-point rig whose intensities/color are driven by scroll progress
 * every frame via refs — never via React state.
 */
export function SceneLighting() {
  const keyRef = useRef<THREE.DirectionalLight>(null);
  const fillRef = useRef<THREE.DirectionalLight>(null);
  const rimRef = useRef<THREE.DirectionalLight>(null);
  const ambientRef = useRef<THREE.AmbientLight>(null);

  useFrame(() => {
    const { progress } = getState();
    const l = sampleLighting(progress);
    if (keyRef.current) keyRef.current.intensity = l.keyIntensity;
    if (fillRef.current) fillRef.current.intensity = l.fillIntensity;
    if (rimRef.current) {
      rimRef.current.intensity = l.rimIntensity;
      rimRef.current.color.set(l.accentColor ?? "#cfd2d6");
    }
    if (ambientRef.current) ambientRef.current.intensity = 0.04 + l.keyIntensity * 0.03;
  });

  return (
    <>
      <ambientLight ref={ambientRef} intensity={0.05} />
      <directionalLight ref={keyRef} position={[3, 4, 2]} intensity={0.5} color="#f5f5f5" />
      <directionalLight ref={fillRef} position={[-3, 1.5, 1]} intensity={0.1} color="#8a8d93" />
      <directionalLight ref={rimRef} position={[-1.2, 2.6, -3.4]} intensity={0.5} color="#e10600" />
    </>
  );
}
