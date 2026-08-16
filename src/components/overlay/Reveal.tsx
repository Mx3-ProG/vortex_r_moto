"use client";

import { useRef } from "react";
import clsx from "clsx";
import { useProgressReveal } from "@/lib/scroll/useProgressReveal";
import type { TextReveal } from "@/lib/choreography/types";

const VARIANT_CLASS: Record<TextReveal["variant"], string> = {
  eyebrow: "font-body text-xs sm:text-sm tracking-[0.35em] text-steel uppercase",
  title: "font-display text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-paper",
  subtitle: "font-body text-sm sm:text-base text-steel max-w-md",
  bigNumber: "font-display text-paper",
  label: "font-body text-[11px] sm:text-xs tracking-[0.3em] text-steel uppercase",
  caption: "font-body text-[11px] tracking-[0.3em] text-steel uppercase",
};

const POSITION_CLASS: Record<NonNullable<TextReveal["position"]>, string> = {
  center: "left-1/2 -translate-x-1/2 text-center items-center",
  left: "left-6 sm:left-12 lg:left-20 text-left items-start",
  right: "right-6 sm:right-12 lg:right-20 text-right items-end",
  top: "top-16",
  bottom: "bottom-16",
};

interface RevealProps {
  reveal: TextReveal;
  className?: string;
  verticalClass?: string;
}

export function Reveal({ reveal, className, verticalClass = "top-1/2 -translate-y-1/2" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useProgressReveal(ref, reveal.progressIn, reveal.progressOut, (el, t) => {
    el.style.opacity = String(t);
    el.style.transform = `translateY(${(1 - t) * 16}px)`;
    el.style.pointerEvents = t > 0.05 ? "auto" : "none";
  });

  const position = reveal.position ?? "center";
  const needsVerticalCenter = position === "center" || position === "left" || position === "right";

  return (
    <div
      ref={ref}
      className={clsx(
        "absolute flex flex-col gap-3 opacity-0 will-change-transform",
        POSITION_CLASS[position],
        needsVerticalCenter && verticalClass,
        VARIANT_CLASS[reveal.variant],
        className,
      )}
    >
      {reveal.content}
    </div>
  );
}
