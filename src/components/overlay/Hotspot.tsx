"use client";

import { forwardRef, useState } from "react";
import clsx from "clsx";
import type { HotspotDef } from "@/lib/choreography/types";
import { GlassPanel } from "./GlassPanel";
import { useOpenHotspotId, setOpenHotspot } from "@/lib/r3f/hotspotInteraction";

interface HotspotProps {
  def: HotspotDef;
  isTouch: boolean;
}

const ORIENTATION_PANEL: Record<NonNullable<HotspotDef["orientation"]>, string> = {
  left: "right-full mr-4 top-1/2 -translate-y-1/2",
  right: "left-full ml-4 top-1/2 -translate-y-1/2",
  top: "bottom-full mb-4 left-1/2 -translate-x-1/2",
  bottom: "top-full mt-4 left-1/2 -translate-x-1/2",
};

const ORIENTATION_LINE: Record<NonNullable<HotspotDef["orientation"]>, string> = {
  left: "right-full top-1/2 w-4 h-px",
  right: "left-full top-1/2 w-4 h-px",
  top: "bottom-full left-1/2 w-px h-4",
  bottom: "top-full left-1/2 w-px h-4",
};

export const Hotspot = forwardRef<HTMLDivElement, HotspotProps>(function Hotspot(
  { def, isTouch },
  ref,
) {
  const [hovered, setHovered] = useState(false);
  const openId = useOpenHotspotId();
  const orientation = def.orientation ?? "right";
  const open = isTouch ? openId === def.id : hovered;

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute h-0 w-0"
      style={{ opacity: 0 }}
      data-hotspot-id={def.id}
    >
      <button
        type="button"
        aria-label={def.title}
        className="pointer-events-auto relative -translate-x-1/2 -translate-y-1/2 outline-none"
        onMouseEnter={() => !isTouch && setHovered(true)}
        onMouseLeave={() => !isTouch && setHovered(false)}
        onClick={() => isTouch && setOpenHotspot(open ? null : def.id)}
      >
        <span
          className={clsx(
            "relative flex items-center justify-center rounded-full border transition-all duration-300",
            open ? "h-9 w-9 border-red bg-red/10" : "h-2.5 w-2.5 border-paper/70 bg-paper/80",
          )}
        >
          <span className={clsx("absolute inset-0 rounded-full border border-red/60", open && "animate-ping")} />
          <span className={clsx("h-1.5 w-1.5 rounded-full bg-red transition-opacity", open ? "opacity-100" : "opacity-0")} />
        </span>

        <span
          className={clsx(
            "absolute bg-red/70 transition-opacity duration-300",
            ORIENTATION_LINE[orientation],
            open ? "opacity-100" : "opacity-0",
          )}
        />

        <div
          className={clsx(
            "absolute w-56 text-left transition-all duration-300",
            ORIENTATION_PANEL[orientation],
            open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1 pointer-events-none",
          )}
        >
          <GlassPanel>
            <p className="font-body text-[11px] tracking-[0.25em] text-red uppercase mb-1">{def.title}</p>
            <p className="font-body text-xs text-steel leading-relaxed">{def.description}</p>
          </GlassPanel>
        </div>
      </button>
    </div>
  );
});
