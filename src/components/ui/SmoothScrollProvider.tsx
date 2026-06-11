"use client";

// Lenis removed 2026-06-10: the deprecated @studio-freight/lenis package was
// causing main-thread freezes on production (renderer lockups — clicks did
// nothing, checkout appeared broken). Native CSS smooth scrolling is used
// instead (see globals: html { scroll-behavior: smooth }).
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
