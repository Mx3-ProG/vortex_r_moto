"use client";

import { useRef, type RefObject } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { MotorcycleModel } from "./MotorcycleModel";
import { CameraController } from "./CameraController";
import { SceneLighting } from "./SceneLighting";
import { Environment } from "./Environment";
import { HotspotProjector } from "./HotspotProjector";
import { ParticlesLayer } from "./ParticlesLayer";
import type { TierSettings } from "@/lib/hooks/useResponsiveTier";
import type { MouseState } from "@/lib/r3f/useMouseParallax";

interface MotorcycleSceneProps {
  tier: TierSettings;
  reducedMotion: boolean;
  mouseRef: RefObject<MouseState>;
}

export function MotorcycleScene({ tier, reducedMotion, mouseRef }: MotorcycleSceneProps) {
  const motorcycleRef = useRef<THREE.Group>(null);

  return (
    <Canvas
      dpr={tier.dpr}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0.42, 4.6], fov: 35, near: 0.05, far: 40 }}
      className="!absolute inset-0"
    >
      <color attach="background" args={["#050505"]} />
      <fog attach="fog" args={["#050505", 6, 14]} />
      <SceneLighting />
      <Environment resolution={tier.detail === "high" ? 256 : 128} />
      <MotorcycleModel
        ref={motorcycleRef}
        glassTransmission={tier.glassTransmission}
        detail={tier.detail}
      />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <circleGeometry args={[5, 48]} />
        <meshStandardMaterial color="#030303" roughness={1} metalness={0} />
      </mesh>
      {tier.particles && <ParticlesLayer count={tier.tier === "desktop" ? 220 : 90} />}
      <HotspotProjector />
      <CameraController motorcycleRef={motorcycleRef} mouseRef={mouseRef} reducedMotion={reducedMotion} />
    </Canvas>
  );
}
