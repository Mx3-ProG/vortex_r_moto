"use client";

import { Environment as DreiEnvironment, Lightformer } from "@react-three/drei";

/** Studio-style reflection environment built from generated Lightformers — no HDR file needed. */
export function Environment({ resolution = 256 }: { resolution?: number }) {
  return (
    <DreiEnvironment resolution={resolution}>
      <group rotation={[0, Math.PI / 3, 0]}>
        <Lightformer form="rect" intensity={2} position={[0, 3, -3]} scale={[4, 2, 1]} color="#ffffff" />
        <Lightformer form="rect" intensity={1} position={[-3, 1, 2]} scale={[2, 3, 1]} color="#c9ccd1" />
        <Lightformer form="rect" intensity={0.6} position={[3, 1, 2]} scale={[2, 3, 1]} color="#e10600" />
        <Lightformer form="ring" intensity={1.2} position={[0, -2, 0]} scale={4} color="#0a0a0b" />
      </group>
    </DreiEnvironment>
  );
}
