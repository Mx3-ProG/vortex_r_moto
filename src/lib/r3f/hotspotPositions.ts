export interface HotspotScreenState {
  x: number; // normalized 0..1, left-to-right
  y: number; // normalized 0..1, top-to-bottom
  active: boolean; // within its scene's activeRange
  behindCamera: boolean;
}

export const hotspotScreenPositions = new Map<string, HotspotScreenState>();
