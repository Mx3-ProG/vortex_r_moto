import type { ChoreographyConfig, SceneConfig } from "./types";

/**
 * Single source of truth for the whole scroll-driven experience.
 * Every camera move, text reveal, hotspot and lighting change is defined
 * here. Retune the choreography by editing values in this file only.
 *
 * World layout reference (bike root at origin, +Z = front of bike).
 * Calibrated against the real vortex-r.glb (single merged mesh, no named
 * nodes — see GLTFMotorcycle.tsx): overall footprint is roughly
 * width [-0.37, 0.37], length [-1, 1] (front at +Z), height [0, 1.18].
 *  - wheelFront   (0,    0.32,  0.80)
 *  - wheelRear    (0,    0.32, -0.80)
 *  - engineBlock  (0,    0.40,  0.15)
 *  - fairing/nose (0,    0.70,  0.90)
 *  - winglets     (0.30, 0.65,  0.70)
 *  - tank/frame   (0,    0.55,  0.00)
 *  - tail         (0,    0.60, -0.90)
 *  - exhaust      (0.20, 0.35, -0.85)
 *  - cockpit      (0,    1.05,  0.45)
 *  - brakeFront   (0.15, 0.32,  0.80)
 *  - brakeRear    (0.15, 0.32, -0.80)
 *
 * Close-in camera keyframes are deliberately kept at a moderate distance
 * (~0.6-1.2 units from their anchor) — the real mesh has a lot of dense
 * mechanical surface detail that pokes out further than a simple bounding
 * box, so tight macro shots clip through geometry.
 */

const intro: SceneConfig = {
  id: "intro",
  index: 0,
  navLabel: "01 INTRO",
  range: { start: 0, end: 0.1 },
  lighting: { keyIntensity: 0.15, fillIntensity: 0.02, rimIntensity: 0.35, envIntensity: 0.1 },
  background: { type: "void" },
  cameraKeyframes: [
    { progress: 0, position: [0, 0.55, 3.6], lookAt: [0, 0.5, 0], fov: 35 },
    { progress: 0.1, position: [0, 0.62, 2.6], lookAt: [0, 0.55, 0], fov: 32 },
  ],
  textReveals: [
    { id: "intro-eyebrow", variant: "eyebrow", content: "INTRODUCING", progressIn: 0.0, progressOut: 0.055, position: "center" },
    { id: "intro-title", variant: "title", content: "VORTEX R", progressIn: 0.01, progressOut: 0.075, position: "center" },
    { id: "intro-subtitle", variant: "subtitle", content: "Engineered without compromise.", progressIn: 0.03, progressOut: 0.09, position: "center" },
  ],
};

const discovery: SceneConfig = {
  id: "discovery",
  index: 1,
  navLabel: "02 DISCOVERY",
  range: { start: 0.1, end: 0.25 },
  lighting: { keyIntensity: 0.9, fillIntensity: 0.3, rimIntensity: 0.6, envIntensity: 0.5 },
  background: { type: "gradient" },
  cameraKeyframes: [
    { progress: 0.1, position: [0, 0.62, 2.6], lookAt: [0, 0.55, 0], fov: 32 },
    { progress: 0.17, position: [2.2, 0.9, 2.0], lookAt: [0, 0.55, 0], fov: 32 },
    { progress: 0.25, position: [2.6, 1.0, 1.3], lookAt: [0, 0.55, 0], fov: 30 },
  ],
  textReveals: [
    { id: "discovery-hint", variant: "caption", content: "SCROLL TO EXPLORE", progressIn: 0.1, progressOut: 0.16, position: "bottom" },
  ],
  hotspots: [
    {
      id: "hotspot-engine",
      scene: "discovery",
      anchor: [0, 0.4, 0.15],
      targetPart: "engineBlock",
      title: "ENGINE",
      description: "998cc V4 performance core producing 218 HP.",
      activeRange: [0.13, 0.25],
      orientation: "right",
    },
    {
      id: "hotspot-brakes",
      scene: "discovery",
      anchor: [0.15, 0.32, 0.8],
      targetPart: "brakeDiscFront",
      title: "BRAKES",
      description: "Brembo racing system with 320mm dual discs.",
      activeRange: [0.13, 0.25],
      orientation: "top",
    },
    {
      id: "hotspot-aero",
      scene: "discovery",
      anchor: [0.3, 0.65, 0.7],
      targetPart: "winglets",
      title: "AERODYNAMICS",
      description: "Active winglets generate downforce at speed.",
      activeRange: [0.13, 0.25],
      orientation: "left",
    },
    {
      id: "hotspot-exhaust",
      scene: "discovery",
      anchor: [0.2, 0.35, -0.85],
      targetPart: "exhaust",
      title: "EXHAUST",
      description: "Titanium exhaust system, engineered for weight.",
      activeRange: [0.13, 0.25],
      orientation: "bottom",
    },
  ],
};

const engine: SceneConfig = {
  id: "engine",
  index: 2,
  navLabel: "03 ENGINE",
  range: { start: 0.25, end: 0.4 },
  lighting: { keyIntensity: 1.1, fillIntensity: 0.15, rimIntensity: 0.55, accentColor: "#e10600", envIntensity: 0.3 },
  background: { type: "void" },
  cameraKeyframes: [
    { progress: 0.25, position: [2.6, 1.0, 1.3], lookAt: [0, 0.55, 0], fov: 30 },
    { progress: 0.32, position: [1.0, 0.65, 0.85], lookAt: [0.05, 0.42, 0.15], fov: 26 },
    { progress: 0.4, position: [0.6, 0.6, 1.4], lookAt: [0, 0.5, 0.1], fov: 28 },
  ],
  textReveals: [
    { id: "engine-eyebrow", variant: "eyebrow", content: "998 CC", progressIn: 0.26, progressOut: 0.305, position: "left" },
    { id: "engine-title", variant: "title", content: "V4 PERFORMANCE ENGINE", progressIn: 0.27, progressOut: 0.32, position: "left" },
    { id: "engine-hp", variant: "bigNumber", content: "HP", progressIn: 0.325, progressOut: 0.375, position: "center", numeric: { from: 0, to: 218, decimals: 0 } },
    { id: "engine-rpm", variant: "bigNumber", content: "RPM", progressIn: 0.345, progressOut: 0.385, position: "right", numeric: { from: 0, to: 13500, decimals: 0 } },
    { id: "engine-torque", variant: "bigNumber", content: "NM", progressIn: 0.36, progressOut: 0.4, position: "left", numeric: { from: 0, to: 124, decimals: 0 } },
  ],
};

const power: SceneConfig = {
  id: "power",
  index: 3,
  navLabel: "04 POWER",
  range: { start: 0.4, end: 0.52 },
  lighting: { keyIntensity: 0.8, fillIntensity: 0.1, rimIntensity: 0.75, accentColor: "#e10600", envIntensity: 0.2 },
  background: { type: "particles", density: 1 },
  cameraKeyframes: [
    { progress: 0.4, position: [0.6, 0.6, 1.4], lookAt: [0, 0.5, 0.1], fov: 28 },
    // High overhead waypoint: front and rear framings are on opposite sides
    // of the bike, so a straight line between them would cut through the
    // body — arc up and over instead (Y well above the ~1.18 max height).
    { progress: 0.43, position: [0.3, 2.6, 0.2], lookAt: [0, 0.5, 0], fov: 30 },
    { progress: 0.46, position: [-0.5, 0.45, -1.1], lookAt: [0, 0.5, 0.3], fov: 42 },
    { progress: 0.52, position: [-0.3, 0.4, -1.8], lookAt: [0, 0.5, 0.2], fov: 40 },
  ],
  textReveals: [
    { id: "power-hp", variant: "bigNumber", content: "HP", progressIn: 0.41, progressOut: 0.445, position: "center", numeric: { from: 0, to: 218, decimals: 0 } },
    { id: "power-label", variant: "label", content: "0–100 KM/H", progressIn: 0.445, progressOut: 0.475, position: "left" },
    { id: "power-time", variant: "bigNumber", content: "S", progressIn: 0.465, progressOut: 0.515, position: "right", numeric: { from: 0, to: 2.8, decimals: 1 } },
  ],
};

const aero: SceneConfig = {
  id: "aero",
  index: 4,
  navLabel: "05 AERO",
  range: { start: 0.52, end: 0.65 },
  lighting: { keyIntensity: 0.95, fillIntensity: 0.35, rimIntensity: 0.5, envIntensity: 0.55 },
  background: { type: "gradient" },
  cameraKeyframes: [
    { progress: 0.52, position: [-0.3, 0.4, -1.8], lookAt: [0, 0.5, 0.2], fov: 40 },
    // Same rear-to-front overhead arc as the engine-to-power transition.
    { progress: 0.555, position: [0.3, 2.6, -0.2], lookAt: [0, 0.5, 0], fov: 30 },
    { progress: 0.58, position: [1.7, 0.55, 0.4], lookAt: [0, 0.55, 0], fov: 28 },
    { progress: 0.65, position: [1.5, 0.6, 0.75], lookAt: [0, 0.55, 0], fov: 28 },
  ],
  textReveals: [
    { id: "aero-title", variant: "title", content: "BUILT AROUND AIR.", progressIn: 0.53, progressOut: 0.585, position: "center" },
    { id: "aero-subtitle", variant: "subtitle", content: "Active aerodynamic architecture", progressIn: 0.555, progressOut: 0.62, position: "center" },
  ],
  hotspots: [
    {
      id: "hotspot-fairing",
      scene: "aero",
      anchor: [0, 0.7, 0.9],
      targetPart: "fairing",
      title: "FAIRING",
      description: "Sculpted carbon fairing channels air around the rider.",
      activeRange: [0.56, 0.65],
      orientation: "top",
    },
    {
      id: "hotspot-winglets-aero",
      scene: "aero",
      anchor: [0.3, 0.65, 0.7],
      targetPart: "winglets",
      title: "WINGLETS",
      description: "Race-derived winglets generate downforce above 150 km/h.",
      activeRange: [0.56, 0.65],
      orientation: "left",
    },
    {
      id: "hotspot-tail",
      scene: "aero",
      anchor: [0, 0.6, -0.9],
      targetPart: "tail",
      title: "TAIL SECTION",
      description: "Reduces drag and stabilizes airflow at the rear.",
      activeRange: [0.56, 0.65],
      orientation: "right",
    },
  ],
};

const braking: SceneConfig = {
  id: "braking",
  index: 5,
  navLabel: "06 BRAKES",
  range: { start: 0.65, end: 0.75 },
  lighting: { keyIntensity: 1.0, fillIntensity: 0.2, rimIntensity: 0.5, envIntensity: 0.3 },
  background: { type: "void" },
  cameraKeyframes: [
    { progress: 0.65, position: [1.5, 0.6, 0.75], lookAt: [0, 0.55, 0], fov: 28 },
    { progress: 0.75, position: [0.75, 0.45, 1.2], lookAt: [0, 0.32, 0.8], fov: 24 },
  ],
  textReveals: [
    { id: "braking-title", variant: "title", content: "BREMBO RACING SYSTEM", progressIn: 0.66, progressOut: 0.705, position: "left" },
    { id: "braking-number", variant: "bigNumber", content: "MM", progressIn: 0.705, progressOut: 0.745, position: "right", numeric: { from: 0, to: 320, decimals: 0 } },
  ],
};

const weight: SceneConfig = {
  id: "weight",
  index: 6,
  navLabel: "07 MATERIALS",
  range: { start: 0.75, end: 0.85 },
  lighting: { keyIntensity: 0.9, fillIntensity: 0.3, rimIntensity: 0.55, envIntensity: 0.45 },
  background: { type: "gradient" },
  cameraKeyframes: [
    { progress: 0.75, position: [0.75, 0.45, 1.2], lookAt: [0, 0.32, 0.8], fov: 24 },
    { progress: 0.85, position: [0, 1.2, 2.6], lookAt: [0, 0.5, 0], fov: 34 },
  ],
  textReveals: [
    { id: "weight-number", variant: "bigNumber", content: "KG", progressIn: 0.76, progressOut: 0.8, position: "center", numeric: { from: 0, to: 186, decimals: 0 } },
    { id: "weight-label", variant: "label", content: "DRY WEIGHT", progressIn: 0.765, progressOut: 0.8, position: "center" },
  ],
  hotspots: [
    {
      id: "hotspot-carbon",
      scene: "weight",
      anchor: [0, 0.6, -0.9],
      targetPart: "tail",
      title: "CARBON FIBER",
      description: "Fairing, tail and winglets in woven carbon.",
      activeRange: [0.8, 0.85],
      orientation: "right",
    },
    {
      id: "hotspot-aluminium",
      scene: "weight",
      anchor: [0, 0.55, 0],
      targetPart: "frame",
      title: "ALUMINIUM",
      description: "Twin-spar aluminium frame, machined and welded by hand.",
      activeRange: [0.815, 0.85],
      orientation: "top",
    },
    {
      id: "hotspot-titanium",
      scene: "weight",
      anchor: [0.2, 0.35, -0.85],
      targetPart: "exhaust",
      title: "TITANIUM",
      description: "Full titanium exhaust system saves 3.4kg over steel.",
      activeRange: [0.83, 0.85],
      orientation: "bottom",
    },
  ],
};

const cockpit: SceneConfig = {
  id: "cockpit",
  index: 7,
  navLabel: "08 COCKPIT",
  range: { start: 0.85, end: 0.93 },
  lighting: { keyIntensity: 0.5, fillIntensity: 0.1, rimIntensity: 0.6, accentColor: "#e10600", envIntensity: 0.15 },
  background: { type: "void" },
  cameraKeyframes: [
    { progress: 0.85, position: [0, 1.2, 2.6], lookAt: [0, 0.5, 0], fov: 34 },
    { progress: 0.93, position: [0, 1.6, -0.15], lookAt: [0, 1.0, 0.9], fov: 46 },
  ],
  textReveals: [
    { id: "cockpit-gear", variant: "label", content: "GEAR", progressIn: 0.87, progressOut: 0.93, position: "left" },
    { id: "cockpit-rpm", variant: "label", content: "RPM", progressIn: 0.875, progressOut: 0.93, position: "left" },
    { id: "cockpit-speed", variant: "label", content: "SPEED", progressIn: 0.88, progressOut: 0.93, position: "center" },
    { id: "cockpit-mode", variant: "label", content: "RIDE MODE", progressIn: 0.885, progressOut: 0.93, position: "right" },
    { id: "cockpit-traction", variant: "label", content: "TRACTION CONTROL", progressIn: 0.89, progressOut: 0.93, position: "right" },
    { id: "cockpit-abs", variant: "label", content: "ABS", progressIn: 0.895, progressOut: 0.93, position: "right" },
  ],
};

const final: SceneConfig = {
  id: "final",
  index: 8,
  navLabel: "09 FINAL",
  range: { start: 0.93, end: 1.0 },
  lighting: { keyIntensity: 1.0, fillIntensity: 0.15, rimIntensity: 0.5, envIntensity: 0.25 },
  background: { type: "void" },
  cameraKeyframes: [
    { progress: 0.93, position: [0, 1.6, -0.15], lookAt: [0, 1.0, 0.9], fov: 46 },
    { progress: 1.0, position: [0, 0.6, 3.4], lookAt: [0, 0.5, 0], fov: 35 },
  ],
  textReveals: [
    { id: "final-title", variant: "title", content: "VORTEX R", progressIn: 0.95, progressOut: 1.0, position: "center" },
    { id: "final-subtitle", variant: "subtitle", content: "218 HP. 186 KG. PURE ENGINEERING.", progressIn: 0.965, progressOut: 1.0, position: "center" },
    { id: "final-cta-primary", variant: "label", content: "MAKE THIS YOURS", progressIn: 0.97, progressOut: 1.0, position: "center", href: "https://www.wayne-web.com" },
    { id: "final-cta-secondary", variant: "label", content: "RESERVATION", progressIn: 0.97, progressOut: 1.0, position: "center", href: "https://www.wayne-web.com/contact" },
  ],
};

export const CHOREOGRAPHY: ChoreographyConfig = {
  scenes: [intro, discovery, engine, power, aero, braking, weight, cockpit, final],
  totalScrollHeightVh: 900,
};
