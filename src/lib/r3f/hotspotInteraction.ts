"use client";

import { useSyncExternalStore } from "react";

let openId: string | null = null;
const listeners = new Set<() => void>();

export function setOpenHotspot(id: string | null): void {
  openId = id;
  listeners.forEach((l) => l());
}

export function useOpenHotspotId(): string | null {
  return useSyncExternalStore(
    (onChange) => {
      listeners.add(onChange);
      return () => listeners.delete(onChange);
    },
    () => openId,
    () => openId,
  );
}
