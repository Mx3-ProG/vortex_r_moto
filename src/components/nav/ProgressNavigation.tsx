"use client";

import clsx from "clsx";
import { SCENES } from "@/lib/choreography/scenes";
import { useScrollProgress } from "@/lib/scroll/useScrollProgress";
import { ensureGsapRegistered, gsap } from "@/lib/scroll/gsapSetup";

export function ProgressNavigation() {
  const activeIndex = useScrollProgress((s) => s.sceneIndex);

  const goTo = (index: number) => {
    ensureGsapRegistered();
    const track = document.getElementById("experience-track");
    if (!track) return;
    const trackHeight = track.offsetHeight - window.innerHeight;
    const targetY = track.offsetTop + trackHeight * SCENES[index].range.start + 1;
    gsap.to(window, { duration: 1.1, scrollTo: targetY, ease: "power2.inOut" });
  };

  return (
    <nav
      aria-label="Scene progress"
      className="pointer-events-auto fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-3 lg:flex"
    >
      {SCENES.map((scene, i) => (
        <button
          key={scene.id}
          type="button"
          onClick={() => goTo(i)}
          className="group flex items-center gap-3"
          aria-current={activeIndex === i}
        >
          <span
            className={clsx(
              "font-body text-[10px] tracking-[0.25em] uppercase transition-colors duration-300",
              activeIndex === i ? "text-paper" : "text-steel-dim group-hover:text-steel",
            )}
          >
            {scene.navLabel}
          </span>
          <span
            className={clsx(
              "h-px transition-all duration-300",
              activeIndex === i ? "w-8 bg-red" : "w-4 bg-steel-dim group-hover:bg-steel",
            )}
          />
        </button>
      ))}
    </nav>
  );
}
