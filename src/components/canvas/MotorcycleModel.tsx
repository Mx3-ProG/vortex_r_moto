"use client";

import { forwardRef, useEffect, useRef } from "react";
import * as THREE from "three";
import { Frame } from "./motorcycle-parts/Frame";
import { Fairing } from "./motorcycle-parts/Fairing";
import { EngineBlock } from "./motorcycle-parts/EngineBlock";
import { Exhaust } from "./motorcycle-parts/Exhaust";
import { Cockpit } from "./motorcycle-parts/Cockpit";
import { Wheel } from "./motorcycle-parts/Wheels";
import { GLTFMotorcycle } from "./GLTFMotorcycle";
import { registerBikeRoot } from "@/lib/r3f/refsRegistry";

/**
 * Single switch point: 'procedural' for the built-in placeholder geometry,
 * 'gltf' to load public/assets/motorcycle/model/vortex-r.glb instead.
 * Either way the root group is registered into refsRegistry so
 * CameraController/HotspotProjector work unchanged.
 */
const MOTORCYCLE_SOURCE: string = "gltf"; // "procedural" | "gltf"

interface MotorcycleModelProps {
  glassTransmission: boolean;
  detail: "high" | "low";
}

export const MotorcycleModel = forwardRef<THREE.Group, MotorcycleModelProps>(
  function MotorcycleModel({ glassTransmission, detail }, ref) {
    const localRef = useRef<THREE.Group>(null);

    useEffect(() => {
      if (typeof ref === "function") ref(localRef.current);
      else if (ref) ref.current = localRef.current;
      registerBikeRoot(localRef.current);
      return () => registerBikeRoot(null);
    }, [ref]);

    if (MOTORCYCLE_SOURCE === "gltf") {
      return (
        <group ref={localRef} name="VortexR">
          <GLTFMotorcycle url="/assets/motorcycle/model/vortex-r.glb" />
        </group>
      );
    }

    return (
      <group ref={localRef} name="VortexR">
        <Frame />
        <Fairing glassTransmission={glassTransmission} />
        <EngineBlock />
        <Exhaust />
        <Cockpit />
        <Wheel
          position={[0, 0.32, 1.05]}
          partName="wheelFront"
          discPartName="brakeDiscFront"
          detail={detail}
        />
        <Wheel
          position={[0, 0.32, -1.05]}
          partName="wheelRear"
          discPartName="brakeDiscRear"
          detail={detail}
        />
      </group>
    );
  },
);
