import * as THREE from "three";

/** Dispose a mesh/group's geometries and materials — call on unmount for anything not owned by R3F's declarative tree. */
export function disposeObject3D(root: THREE.Object3D): void {
  root.traverse((obj) => {
    const mesh = obj as THREE.Mesh;
    if (mesh.geometry) mesh.geometry.dispose();
    const material = mesh.material;
    if (Array.isArray(material)) {
      material.forEach((m) => m.dispose());
    } else if (material) {
      (material as THREE.Material).dispose();
    }
  });
}

/** Matrix array (position/rotation) for N spokes evenly distributed around a wheel, for InstancedMesh. */
export function spokeMatrices(count: number, radius: number, length: number): THREE.Matrix4[] {
  const matrices: THREE.Matrix4[] = [];
  const scratchPos = new THREE.Vector3();
  const scratchQuat = new THREE.Quaternion();
  const scratchScale = new THREE.Vector3(1, length, 1);
  const axis = new THREE.Vector3(0, 0, 1);
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2;
    scratchPos.set(Math.cos(angle) * radius * 0.5, Math.sin(angle) * radius * 0.5, 0);
    scratchQuat.setFromAxisAngle(axis, angle);
    matrices.push(new THREE.Matrix4().compose(scratchPos, scratchQuat, scratchScale));
  }
  return matrices;
}
