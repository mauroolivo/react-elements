import { PerfectCursor } from "perfect-cursors";
import * as React from "react";

type Point = [number, number] | number[];

interface PerfectCursorLike {
  addPoint(p: Point): void;
  dispose(): void;
}

export function usePerfectCursor(
  cb: (p: Point) => void,
  point?: Point
): (p: Point) => void {
  const [pc] = React.useState<PerfectCursorLike>(() => {
    const Ctor = PerfectCursor as unknown as {
      new (cb: (p: Point) => void): PerfectCursorLike;
    };
    return new Ctor(cb);
  });

  React.useLayoutEffect(() => {
    if (point) pc.addPoint(point);
  }, [pc, point]);

  React.useEffect(() => {
    return () => pc.dispose();
  }, [pc]);

  const onPointChange = React.useCallback((p: Point) => pc.addPoint(p), [pc]);

  return onPointChange;
}
