import { clamp } from "./lerp";

export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
  clampOutput = true,
): number {
  const span = inMax - inMin || 1;
  const t = (value - inMin) / span;
  const result = outMin + t * (outMax - outMin);
  return clampOutput ? clamp(result, Math.min(outMin, outMax), Math.max(outMin, outMax)) : result;
}
