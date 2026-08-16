"use client";

import dynamic from "next/dynamic";

// The whole experience is WebGL/GSAP-driven and has no meaningful server-rendered
// markup — loading it client-only avoids any risk of SSR/client hydration mismatch.
const Experience = dynamic(() => import("./Experience").then((m) => m.Experience), {
  ssr: false,
});

export function ExperienceLoader() {
  return <Experience />;
}
