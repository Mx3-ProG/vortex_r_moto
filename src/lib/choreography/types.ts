export type SceneId =
  | "intro"
  | "discovery"
  | "engine"
  | "power"
  | "aero"
  | "braking"
  | "weight"
  | "cockpit"
  | "final";

export type PartName =
  | "frame"
  | "fairing"
  | "windscreen"
  | "winglets"
  | "tank"
  | "tail"
  | "engineBlock"
  | "exhaust"
  | "cockpit"
  | "wheelFront"
  | "wheelRear"
  | "brakeDiscFront"
  | "brakeDiscRear"
  | "swingArm"
  | "forkAssembly";

/** Inclusive-exclusive range in GLOBAL scroll progress, 0..1 */
export interface ScenePercent {
  start: number;
  end: number;
}

export interface CameraKeyframe {
  /** Global scroll progress 0..1 at which the camera is exactly at this pose */
  progress: number;
  position: [number, number, number];
  lookAt: [number, number, number];
  fov?: number;
}

export interface TextReveal {
  id: string;
  progressIn: number;
  progressOut: number;
  variant: "eyebrow" | "title" | "subtitle" | "bigNumber" | "label" | "caption";
  content: string;
  numeric?: {
    from: number;
    to: number;
    decimals?: number;
    suffix?: string;
  };
  position?: "center" | "left" | "right" | "top" | "bottom";
  /** External link target, for CTA-style labels rendered as anchors. */
  href?: string;
}

export interface HotspotDef {
  id: string;
  scene: SceneId;
  anchor: [number, number, number];
  targetPart: PartName;
  title: string;
  description: string;
  activeRange: [number, number];
  orientation?: "left" | "right" | "top" | "bottom";
}

export interface SceneLighting {
  keyIntensity: number;
  fillIntensity: number;
  rimIntensity: number;
  accentColor?: string;
  envIntensity?: number;
}

export interface SceneBackground {
  type: "void" | "gradient" | "particles";
  density?: number;
}

export interface SceneConfig {
  id: SceneId;
  index: number;
  navLabel: string;
  range: ScenePercent;
  cameraKeyframes: CameraKeyframe[];
  textReveals: TextReveal[];
  hotspots?: HotspotDef[];
  lighting: SceneLighting;
  background?: SceneBackground;
}

export interface ChoreographyConfig {
  scenes: SceneConfig[];
  totalScrollHeightVh: number;
}
