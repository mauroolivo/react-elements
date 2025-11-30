"use client";
import useScreenSize from "../hooks/useScreenSize";
export default function ViewPort() {
  const screen = useScreenSize();

  return (
    <h1>
      Current screen breakpoint: {screen.breakpoint} ({screen.width} x{" "}
      {screen.height})
    </h1>
  );
}
