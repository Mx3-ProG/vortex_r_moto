/** Aspect ratio the choreography's camera keyframes were composed against (landscape ~16:9). */
const REFERENCE_ASPECT = 16 / 9;

/** Never dolly out more than this, even on very tall/narrow phones — keeps close-up shots meaningful. */
const MAX_ZOOM_OUT = 2.2;

/**
 * Every camera keyframe was composed and eyeballed on a landscape viewport.
 * On a portrait phone the same FOV covers far less *horizontal* ground, so
 * every shot reads as zoomed-in and crops the sides of the bike. Rather
 * than widening the (vertical) FOV — which fisheyes close-up shots — this
 * dollies the camera back along its existing view direction on narrow
 * aspects, recovering horizontal framing with zero added distortion.
 */
export function aspectZoomOutFactor(aspect: number): number {
  if (aspect >= REFERENCE_ASPECT) return 1;
  return Math.min(MAX_ZOOM_OUT, REFERENCE_ASPECT / aspect);
}
