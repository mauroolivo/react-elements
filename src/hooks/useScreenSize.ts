import { useState, useEffect } from "react";

/**
 * Maps a viewport width to Tailwind-style breakpoint labels.
 */
function getBreakpoint(width: number): string {
  if (width >= 1536) return "2xl";
  if (width >= 1280) return "xl";
  if (width >= 1024) return "lg";
  if (width >= 768) return "md";
  if (width >= 640) return "sm";
  return "xs";
}

/**
 * Tracks the current viewport dimensions and derived breakpoint.
 *
 * Safe for SSR by using an initial zero-sized state and updating after mount.
 *
 * @returns Current `width`, `height`, and `breakpoint`.
 */
export default function useScreenSize() {
  // SSR-safe initial value
  const [screenSize, setScreenSize] = useState({
    width: 0,
    height: 0,
    breakpoint: "",
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const update = () =>
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
        breakpoint: getBreakpoint(window.innerWidth),
      });

    update(); // sync after mount

    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []); // run once after mount

  return screenSize;
}
