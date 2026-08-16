import { CHOREOGRAPHY } from "./config";
import type { CameraKeyframe, SceneConfig, SceneLighting } from "./types";

export const SCENES = CHOREOGRAPHY.scenes;

export const SCENE_BOUNDARIES = SCENES.map((s) => s.range.start).concat(
  SCENES[SCENES.length - 1].range.end,
);

/** All camera keyframes across all scenes, flattened and sorted by progress. */
export const ALL_CAMERA_KEYFRAMES: CameraKeyframe[] = SCENES.flatMap(
  (s) => s.cameraKeyframes,
).sort((a, b) => a.progress - b.progress);

export interface LightingKeyframe extends SceneLighting {
  progress: number;
}

export const LIGHTING_KEYFRAMES: LightingKeyframe[] = [
  ...SCENES.map((s) => ({ progress: s.range.start, ...s.lighting })),
  { progress: 1, ...SCENES[SCENES.length - 1].lighting },
];

export function resolveScene(progress: number): {
  scene: SceneConfig;
  sceneIndex: number;
  localProgress: number;
} {
  const clamped = Math.min(1, Math.max(0, progress));
  let scene = SCENES[SCENES.length - 1];
  for (const s of SCENES) {
    if (clamped >= s.range.start && clamped < s.range.end) {
      scene = s;
      break;
    }
  }
  if (clamped >= SCENES[SCENES.length - 1].range.end) {
    scene = SCENES[SCENES.length - 1];
  }
  const span = scene.range.end - scene.range.start || 1;
  const localProgress = Math.min(
    1,
    Math.max(0, (clamped - scene.range.start) / span),
  );
  return { scene, sceneIndex: scene.index, localProgress };
}

export function sampleLighting(progress: number): SceneLighting {
  const clamped = Math.min(1, Math.max(0, progress));
  let a = LIGHTING_KEYFRAMES[0];
  let b = LIGHTING_KEYFRAMES[LIGHTING_KEYFRAMES.length - 1];
  for (let i = 0; i < LIGHTING_KEYFRAMES.length - 1; i++) {
    if (clamped >= LIGHTING_KEYFRAMES[i].progress && clamped <= LIGHTING_KEYFRAMES[i + 1].progress) {
      a = LIGHTING_KEYFRAMES[i];
      b = LIGHTING_KEYFRAMES[i + 1];
      break;
    }
  }
  const span = b.progress - a.progress || 1;
  const t = Math.min(1, Math.max(0, (clamped - a.progress) / span));
  return {
    keyIntensity: a.keyIntensity + (b.keyIntensity - a.keyIntensity) * t,
    fillIntensity: a.fillIntensity + (b.fillIntensity - a.fillIntensity) * t,
    rimIntensity: a.rimIntensity + (b.rimIntensity - a.rimIntensity) * t,
    envIntensity: (a.envIntensity ?? 0.3) + ((b.envIntensity ?? 0.3) - (a.envIntensity ?? 0.3)) * t,
    accentColor: t < 0.5 ? a.accentColor : b.accentColor,
  };
}
