"use client";

import { useRef } from "react";
import { SCENES } from "@/lib/choreography/scenes";
import { Reveal } from "../Reveal";
import { useProgressReveal } from "@/lib/scroll/useProgressReveal";

const scene = SCENES.find((s) => s.id === "final")!;
const [title, subtitle, ctaPrimary, ctaSecondary] = scene.textReveals;

function MagneticButton({
  progressIn,
  progressOut,
  href,
  children,
  variant,
}: {
  progressIn: number;
  progressOut: number;
  href: string;
  children: string;
  variant: "primary" | "secondary";
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  useProgressReveal(ref, progressIn, progressOut, (el, t) => {
    el.style.opacity = String(t);
    el.style.transform = `translateY(${(1 - t) * 12}px)`;
    el.style.pointerEvents = t > 0.4 ? "auto" : "none";
  });

  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = (e.clientX - rect.left - rect.width / 2) * 0.25;
    const dy = (e.clientY - rect.top - rect.height / 2) * 0.25;
    el.style.transform = `translate(${dx}px, ${dy}px)`;
  };

  const handleLeave = () => {
    if (ref.current) ref.current.style.transform = "translate(0, 0)";
  };

  return (
    <a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={
        variant === "primary"
          ? "px-8 py-3 bg-paper text-void font-body text-xs tracking-[0.3em] uppercase transition-colors hover:bg-red hover:text-paper opacity-0 will-change-transform"
          : "px-8 py-3 border border-paper/40 text-paper font-body text-xs tracking-[0.3em] uppercase transition-colors hover:border-red hover:text-red opacity-0 will-change-transform"
      }
    >
      {children}
    </a>
  );
}

export function FinalOverlay() {
  return (
    <>
      <Reveal reveal={title} verticalClass="top-[38%] -translate-y-1/2" />
      <Reveal reveal={subtitle} verticalClass="top-[50%] -translate-y-1/2" />
      <div className="absolute left-1/2 top-[62%] flex -translate-x-1/2 -translate-y-1/2 gap-4">
        <MagneticButton
          progressIn={ctaPrimary.progressIn}
          progressOut={ctaPrimary.progressOut}
          href={ctaPrimary.href!}
          variant="primary"
        >
          {ctaPrimary.content}
        </MagneticButton>
        <MagneticButton
          progressIn={ctaSecondary.progressIn}
          progressOut={ctaSecondary.progressOut}
          href={ctaSecondary.href!}
          variant="secondary"
        >
          {ctaSecondary.content}
        </MagneticButton>
      </div>
    </>
  );
}
