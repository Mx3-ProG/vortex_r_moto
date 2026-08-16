import { resolveScene } from "@/lib/choreography/scenes";

export interface ScrollState {
  progress: number;
  sceneIndex: number;
  localProgress: number;
  velocity: number;
  direction: 1 | -1;
}

type Listener = (state: ScrollState) => void;

const state: ScrollState = {
  progress: 0,
  sceneIndex: 0,
  localProgress: 0,
  velocity: 0,
  direction: 1,
};

const listeners = new Set<Listener>();

export function getState(): ScrollState {
  return state;
}

export function setProgress(progress: number, velocity = 0): void {
  const clamped = Math.min(1, Math.max(0, progress));
  const delta = clamped - state.progress;
  const { sceneIndex, localProgress } = resolveScene(clamped);
  state.progress = clamped;
  state.sceneIndex = sceneIndex;
  state.localProgress = localProgress;
  state.velocity = velocity;
  if (delta !== 0) state.direction = delta > 0 ? 1 : -1;
  listeners.forEach((l) => l(state));
}

export function subscribe(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/** Subscribe but only fire when the selected slice changes (for low-frequency React state). */
export function subscribeSelector<T>(
  selector: (s: ScrollState) => T,
  onChange: (value: T) => void,
): () => void {
  let last = selector(state);
  return subscribe((s) => {
    const next = selector(s);
    if (next !== last) {
      last = next;
      onChange(next);
    }
  });
}
