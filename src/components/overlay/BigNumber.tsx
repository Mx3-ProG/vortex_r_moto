"use client";

import { useRef } from "react";
import clsx from "clsx";
import { useProgressReveal } from "@/lib/scroll/useProgressReveal";
import type { TextReveal } from "@/lib/choreography/types";

const POSITION_CLASS: Record<NonNullable<TextReveal["position"]>, string> = {
  center: "left-1/2 -translate-x-1/2 text-center items-center",
  left: "left-6 sm:left-12 lg:left-20 text-left items-start",
  right: "right-6 sm:right-12 lg:right-20 text-right items-end",
  top: "left-1/2 -translate-x-1/2 top-16 text-center items-center",
  bottom: "left-1/2 -translate-x-1/2 bottom-16 text-center items-center",
};

interface BigNumberProps {
  reveal: TextReveal;
}

/** Huge animated statistic — value counts up in sync with scroll, never via setInterval/timers. */
export function BigNumber({ reveal }: BigNumberProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const valueRef = useRef<HTMLSpanElement>(null);
  const { numeric } = reveal;

  useProgressReveal(wrapperRef, reveal.progressIn, reveal.progressOut, (el, t) => {
    el.style.opacity = String(t);
    el.style.transform = `translateY(${(1 - t) * 22}px) scale(${0.94 + t * 0.06})`;
  });

  useProgressReveal(
    valueRef as unknown as React.RefObject<HTMLElement | null>,
    reveal.progressIn,
    reveal.progressOut,
    (el, _t, progress) => {
      if (!numeric) return;
      const span = reveal.progressOut - reveal.progressIn || 1;
      const countT = Math.min(1, Math.max(0, (progress - reveal.progressIn) / span));
      const value = numeric.from + (numeric.to - numeric.from) * Math.min(1, countT * 1.6);
      const decimals = numeric.decimals ?? 0;
      el.textContent = value.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      });
    },
  );

  const position = reveal.position ?? "center";

  return (
    <div
      ref={wrapperRef}
      className={clsx(
        "absolute top-1/2 -translate-y-1/2 flex flex-col gap-1 opacity-0 will-change-transform",
        POSITION_CLASS[position],
      )}
    >
      <span
        ref={valueRef}
        className="font-display tabular-nums text-[3.5rem] sm:text-[5.5rem] lg:text-[7.5rem] font-bold leading-none text-paper"
      >
        {numeric ? numeric.from : ""}
      </span>
      <span className="font-body text-xs sm:text-sm tracking-[0.35em] text-red uppercase">
        {reveal.content}
      </span>
    </div>
  );
}
