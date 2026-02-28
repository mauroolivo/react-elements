"use client";

import { useState } from "react";

type ToggleProps = {
  ariaLabel?: string;
  defaultOn?: boolean;
};

export default function Toggle({
  ariaLabel = "Abilita estensione",
  defaultOn = true,
}: ToggleProps) {
  const [isOn, setIsOn] = useState(defaultOn);

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      aria-pressed={isOn}
      onClick={() => setIsOn((prev) => !prev)}
      className={`relative inline-flex h-6 w-12 items-center rounded-full border px-1 transition-colors duration-200 ease-in-out ${
        isOn
          ? "border-blue-500 bg-slate-800"
          : "border-slate-500 bg-slate-700/70"
      }`}
    >
      <span
        className={`h-4 w-4 rounded-full transition-all duration-200 ease-in-out ${
          isOn
            ? "translate-x-6 bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.55)]"
            : "translate-x-0 bg-slate-300"
        }`}
      />
    </button>
  );
}
