import type * as THREE from "three";
import type { PartName } from "@/lib/choreography/types";

const registry = new Map<PartName, THREE.Object3D>();
let bikeRoot: THREE.Object3D | null = null;

export function registerPart(name: PartName, obj: THREE.Object3D | null): void {
  if (obj) registry.set(name, obj);
  else registry.delete(name);
}

export function getPart(name: PartName): THREE.Object3D | undefined {
  return registry.get(name);
}

/**
 * The single root group of the motorcycle (procedural or GLTF). Hotspot
 * anchors are defined in this root's local space and resolved through it —
 * that works whether the model exposes named sub-parts or is one merged
 * mesh, and it stays correct through the root's own rotation (e.g. the
 * Discovery scene's 360 spin).
 */
export function registerBikeRoot(obj: THREE.Object3D | null): void {
  bikeRoot = obj;
}

export function getBikeRoot(): THREE.Object3D | null {
  return bikeRoot;
}

export function clearRegistry(): void {
  registry.clear();
  bikeRoot = null;
}
