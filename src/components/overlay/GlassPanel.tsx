"use client";

import type { ReactNode } from "react";
import clsx from "clsx";

interface GlassPanelProps {
  children: ReactNode;
  className?: string;
}

export function GlassPanel({ children, className }: GlassPanelProps) {
  return (
    <div
      className={clsx(
        "rounded-md border border-glass-border bg-glass backdrop-blur-md px-4 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.45)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
