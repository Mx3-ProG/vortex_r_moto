"use client";

import { useSyncExternalStore } from "react";
import { getState, subscribe, type ScrollState } from "./scrollStore";

/**
 * React binding to scrollStore. Only use this for LOW-FREQUENCY UI
 * (e.g. active nav index) via a selector — never for per-frame animation.
 */
export function useScrollProgress<T>(selector: (s: ScrollState) => T): T {
  return useSyncExternalStore(
    subscribe,
    () => selector(getState()),
    () => selector(getState()),
  );
}
