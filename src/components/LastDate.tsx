"use client";
import { useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export default function LastDate() {
  const { setItem, getItem, removeItem } = useLocalStorage("value");

  useEffect(() => {
    console.log("Current local storage item:", getItem());
  }, [getItem]);

  return (
    <div className="flex justify-center bg-zinc-50 font-sans dark:bg-black">
      <button
        className="rounded-lg bg-blue-500 px-4 py-2 font-mono text-white hover:bg-blue-600"
        onClick={() => setItem(new Date())}
      >
        Set Local Storage Item
      </button>
      <button
        className="ml-4 rounded-lg bg-green-500 px-4 py-2 font-mono text-white hover:bg-green-600"
        onClick={() => {
          const item = getItem();
          console.log("Retrieved local storage item:", item);
        }}
      >
        Get Local Storage Item
      </button>
      <button
        className="ml-4 rounded-lg bg-red-500 px-4 py-2 font-mono text-white hover:bg-red-600"
        onClick={() => removeItem()}
      >
        Remove Local Storage Item
      </button>
    </div>
  );
}
