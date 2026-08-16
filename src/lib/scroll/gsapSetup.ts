"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

let registered = false;

/** Idempotent GSAP plugin registration — safe against React Strict Mode double-invoke. */
export function ensureGsapRegistered(): void {
  if (registered) return;
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
  registered = true;
}

export { gsap, ScrollTrigger, ScrollToPlugin };
