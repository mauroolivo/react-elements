import { useEffect, useRef } from "react";

/**
 * Tuple-like coordinate representation used for cursor positions.
 */
type Point = [number, number] | number[];

/**
 * Creates a smooth cursor movement handler.
 *
 * Each received point becomes a target that is interpolated with
 * `requestAnimationFrame` and forwarded to `callback`.
 *
 * @param callback Function called with interpolated cursor coordinates.
 * @returns A function that accepts target cursor coordinates.
 */
export function usePerfectCursor(callback: (p: Point) => void) {
  const target = useRef<Point | null>(null);
  const rafId = useRef<number | null>(null);
  const current = useRef<[number, number]>([0, 0]);

  const step = () => {
    if (!target.current) {
      rafId.current = null;
      return;
    }

    const [tx, ty] = target.current as [number, number];
    const [cx, cy] = current.current;

    const nx = cx + (tx - cx) * 0.2;
    const ny = cy + (ty - cy) * 0.2;
    current.current = [nx, ny];
    try {
      callback([nx, ny]);
    } catch {
      // ignore callback errors
    }

    if (Math.hypot(tx - nx, ty - ny) < 0.5) {
      current.current = [tx, ty];
      try {
        callback([tx, ty]);
      } catch {}
      target.current = null;
      rafId.current = null;
      return;
    }

    rafId.current = requestAnimationFrame(step);
  };

  const onPointMove = (p: Point) => {
    target.current = p;
    if (rafId.current == null) rafId.current = requestAnimationFrame(step);
  };

  useEffect(() => {
    return () => {
      if (rafId.current != null) cancelAnimationFrame(rafId.current);
      rafId.current = null;
      target.current = null;
    };
  }, []);

  return onPointMove;
}
