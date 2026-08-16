"use client";

import { useEffect, useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

interface GLTFMotorcycleProps {
  url: string;
}

/**
 * Loads a dropped-in real motorcycle model. The exported model has no named
 * sub-parts (single merged mesh) — camera framing and hotspots don't need
 * them: hotspot anchors are resolved against the bike ROOT's local space
 * (see HotspotProjector), not per-node refs. This component only needs to
 * get the model's own local axes aligned to the app's convention
 * (+Z = front of bike, wheels resting on y = 0) once, on load.
 */
export function GLTFMotorcycle({ url }: GLTFMotorcycleProps) {
  const { scene } = useGLTF(url);

  const prepared = useMemo(() => {
    scene.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      if (mesh.isMesh) {
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        const material = mesh.material as THREE.MeshStandardMaterial;
        if (material && "envMapIntensity" in material) {
          material.envMapIntensity = 1.1;
        }
      }
    });
    return scene;
  }, [scene]);

  useEffect(() => {
    return () => {
      useGLTF.clear(url);
    };
  }, [url]);

  return (
    <group rotation={[0, -Math.PI / 2, 0]} position={[0, 0.589, 0]}>
      <primitive object={prepared} />
    </group>
  );
}

useGLTF.preload("/assets/motorcycle/model/vortex-r.glb");
