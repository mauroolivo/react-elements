"use client";
import { useState } from "react";
import Link from "next/link";

const STORAGE_KEY = "cookie_consent";

export default function CookieBanner() {
  const [visible, setVisible] = useState(() => {
    try {
      const v = localStorage.getItem(STORAGE_KEY);
      return !v;
    } catch {
      return true;
    }
  });

  function acceptAll() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ mode: "all" }));
    setVisible(false);
  }

  function declineNonNecessary() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ mode: "necessary" }));
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed left-4 right-4 bottom-4 z-50">
      <div className="max-w-6xl mx-auto bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 flex items-center justify-between gap-6">
        <div className="flex-1 pr-4">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            This website uses cookies to ensure you get the best experience.
          </h3>
          <p className="mt-2 text-sm text-slate-700 dark:text-slate-200">
            We use cookies to personalise content and analyze traffic. See our{" "}
            <Link href="/cookie-policy" className="underline text-amber-600">
              Cookie Policy
            </Link>{" "}
            to read more about the cookies we set.
          </p>
        </div>

        <div className="w-64 flex flex-col items-end gap-3">
          <button
            onClick={acceptAll}
            className="w-full inline-flex justify-center items-center rounded-full bg-amber-500 hover:bg-amber-600 text-white px-4 py-3 text-sm font-medium shadow"
          >
            Accept all cookies
          </button>

          <button
            onClick={declineNonNecessary}
            className="w-full inline-flex justify-center items-center rounded-full bg-amber-300 hover:bg-amber-400 text-white px-4 py-3 text-sm font-medium shadow"
          >
            Decline all non-necessary cookies
          </button>

          <Link
            href="/cookie-preferences"
            className="w-full inline-flex justify-center items-center rounded-full bg-amber-400 hover:bg-amber-500 text-white px-4 py-3 text-sm font-medium shadow"
          >
            Cookie preferences
          </Link>
        </div>
      </div>
    </div>
  );
}
