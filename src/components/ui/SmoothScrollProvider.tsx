"use client";

import { useEffect } from "react";

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let lenis: { raf: (t: number) => void; destroy: () => void } | null = null;

    import("@studio-freight/lenis").then(({ default: Lenis }) => {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 0.9,
      });

      const raf = (time: number) => {
        lenis?.raf(time);
        requestAnimationFrame(raf);
      };
      requestAnimationFrame(raf);
    });

    return () => {
      if (lenis) lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
