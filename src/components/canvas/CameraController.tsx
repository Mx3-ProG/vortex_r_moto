"use client";

import { useRef, type RefObject } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { getState } from "@/lib/scroll/scrollStore";
import { sampleCameraPose } from "@/lib/r3f/cameraPath";
import { damp } from "@/lib/utils/lerp";
import type { MouseState } from "@/lib/r3f/useMouseParallax";

const DISCOVERY_RANGE: [number, number] = [0.1, 0.25];
const MAX_PARALLAX_POSITION = 0.16;
const MAX_PARALLAX_ROTATION = 0.035;

interface CameraControllerProps {
  motorcycleRef: RefObject<THREE.Group | null>;
  mouseRef: RefObject<MouseState>;
  reducedMotion: boolean;
}

export function CameraController({ motorcycleRef, mouseRef, reducedMotion }: CameraControllerProps) {
  const { camera } = useThree();
  const lookAtTarget = useRef(new THREE.Vector3(0, 0.5, 0));
  const parallaxOffset = useRef(new THREE.Vector3());

  useFrame((_state, delta) => {
    const { progress } = getState();
    const pose = sampleCameraPose(progress);

    camera.position.set(pose.position.x, pose.position.y, pose.position.z);
    lookAtTarget.current.set(pose.lookAt.x, pose.lookAt.y, pose.lookAt.z);

    if (!reducedMotion && mouseRef.current) {
      const targetX = mouseRef.current.x * MAX_PARALLAX_POSITION;
      const targetY = -mouseRef.current.y * MAX_PARALLAX_POSITION * 0.6;
      parallaxOffset.current.x = damp(parallaxOffset.current.x, targetX, 4, delta);
      parallaxOffset.current.y = damp(parallaxOffset.current.y, targetY, 4, delta);
      camera.position.x += parallaxOffset.current.x;
      camera.position.y += parallaxOffset.current.y;
      lookAtTarget.current.x += mouseRef.current.x * MAX_PARALLAX_ROTATION;
    }

    camera.lookAt(lookAtTarget.current);

    if (camera instanceof THREE.PerspectiveCamera && Math.abs(camera.fov - pose.fov) > 0.001) {
      camera.fov = pose.fov;
      camera.updateProjectionMatrix();
    }

    // Discovery scene: bike performs a continuous 360 turn tied 1:1 to scroll.
    const bike = motorcycleRef.current;
    if (bike) {
      const [start, end] = DISCOVERY_RANGE;
      let targetRotation: number;
      if (progress <= start) {
        targetRotation = 0;
      } else if (progress >= end) {
        targetRotation = Math.PI * 2;
      } else {
        targetRotation = ((progress - start) / (end - start)) * Math.PI * 2;
      }
      bike.rotation.y = targetRotation;
    }
  });

  return null;
}
