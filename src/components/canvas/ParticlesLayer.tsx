"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { getState } from "@/lib/scroll/scrollStore";

const POWER_RANGE: [number, number] = [0.4, 0.52];
const COUNT = 220;

/** Deterministic seed pool computed once at module load (not during render). */
const SEED_POOL = Array.from({ length: COUNT }, () => ({
  x: (Math.random() - 0.5) * 6,
  y: (Math.random() - 0.5) * 2.2,
  z: Math.random() * -8,
  speed: 4 + Math.random() * 6,
  length: 0.6 + Math.random() * 1.8,
}));

/** Streaking speed-line particles that intensify through the Power scene, then fade. */
export function ParticlesLayer({ count = COUNT }: { count?: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const seeds = useMemo(() => SEED_POOL.slice(0, count), [count]);

  useFrame((state) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const { progress } = getState();
    const [start, end] = POWER_RANGE;
    const intensity =
      progress < start || progress > end
        ? 0
        : Math.sin(((progress - start) / (end - start)) * Math.PI);

    mesh.visible = intensity > 0.01;
    if (!mesh.visible) return;

    const t = state.clock.elapsedTime;
    seeds.forEach((seed, i) => {
      const z = ((seed.z - t * seed.speed) % 8) + 4;
      dummy.position.set(seed.x, seed.y + 0.5, z);
      dummy.scale.set(0.01, 0.01, seed.length * intensity);
      dummy.rotation.set(0, 0, 0);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;

    const material = mesh.material as THREE.MeshBasicMaterial;
    material.opacity = intensity * 0.6;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]} frustumCulled={false}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color="#e6e6e6" transparent opacity={0} />
    </instancedMesh>
  );
}
