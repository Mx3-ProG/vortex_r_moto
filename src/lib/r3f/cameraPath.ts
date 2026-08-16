import * as THREE from "three";
import { ALL_CAMERA_KEYFRAMES } from "@/lib/choreography/scenes";
import { easeInOutCubic } from "@/lib/utils/easing";

const scratchPosition = new THREE.Vector3();
const scratchLookAt = new THREE.Vector3();

export interface CameraPose {
  position: THREE.Vector3;
  lookAt: THREE.Vector3;
  fov: number;
}

/**
 * Piecewise-eased linear interpolation between the two camera keyframes
 * surrounding `progress`. Reused scratch vectors — safe to call every frame,
 * allocation-free. Fully reversible (pure function of progress).
 */
export function sampleCameraPose(progress: number): CameraPose {
  const kfs = ALL_CAMERA_KEYFRAMES;
  const clamped = Math.min(1, Math.max(0, progress));

  let i = 0;
  for (; i < kfs.length - 1; i++) {
    if (clamped >= kfs[i].progress && clamped <= kfs[i + 1].progress) break;
  }
  const a = kfs[Math.min(i, kfs.length - 1)];
  const b = kfs[Math.min(i + 1, kfs.length - 1)];
  const span = b.progress - a.progress || 1;
  const t = easeInOutCubic(Math.min(1, Math.max(0, (clamped - a.progress) / span)));

  scratchPosition.set(
    a.position[0] + (b.position[0] - a.position[0]) * t,
    a.position[1] + (b.position[1] - a.position[1]) * t,
    a.position[2] + (b.position[2] - a.position[2]) * t,
  );
  scratchLookAt.set(
    a.lookAt[0] + (b.lookAt[0] - a.lookAt[0]) * t,
    a.lookAt[1] + (b.lookAt[1] - a.lookAt[1]) * t,
    a.lookAt[2] + (b.lookAt[2] - a.lookAt[2]) * t,
  );
  const fovA = a.fov ?? 35;
  const fovB = b.fov ?? 35;

  return { position: scratchPosition, lookAt: scratchLookAt, fov: fovA + (fovB - fovA) * t };
}
