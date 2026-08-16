"use client";

import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { getState } from "@/lib/scroll/scrollStore";
import { getBikeRoot } from "@/lib/r3f/refsRegistry";
import { hotspotScreenPositions } from "@/lib/r3f/hotspotPositions";
import { SCENES } from "@/lib/choreography/scenes";

const ALL_HOTSPOTS = SCENES.flatMap((s) => s.hotspots ?? []);
const scratchWorld = new THREE.Vector3();
const scratchProjected = new THREE.Vector3();

/**
 * Projects each hotspot's 3D anchor to normalized screen space every frame.
 * Anchors are defined in the bike root's local space, so this works whether
 * the model has named sub-parts (procedural) or is a single merged mesh
 * (a dropped-in GLTF) — and stays correct through the root's own rotation.
 */
export function HotspotProjector() {
  const { camera } = useThree();

  useFrame(() => {
    const { progress } = getState();
    const bikeRoot = getBikeRoot();
    if (!bikeRoot) return;

    for (const hotspot of ALL_HOTSPOTS) {
      scratchWorld.set(hotspot.anchor[0], hotspot.anchor[1], hotspot.anchor[2]);
      bikeRoot.localToWorld(scratchWorld);
      scratchProjected.copy(scratchWorld).project(camera);

      const [rangeStart, rangeEnd] = hotspot.activeRange;
      const active = progress >= rangeStart && progress <= rangeEnd;
      const behindCamera = scratchProjected.z > 1;

      hotspotScreenPositions.set(hotspot.id, {
        x: (scratchProjected.x + 1) / 2,
        y: (1 - scratchProjected.y) / 2,
        active,
        behindCamera,
      });
    }
  });

  return null;
}
