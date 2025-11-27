'use client';
import { useEffect, useRef } from 'react';

export default function AutoFocusForm() {
  const inputRef1 = useRef<HTMLInputElement>(null);
  const inputRef2 = useRef<HTMLInputElement>(null);
  const inputRef3 = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef1.current?.focus();
  }, []);

  return (
    <div className="mt-4 flex justify-center gap-4 bg-zinc-50 font-sans dark:bg-black">
      <input
        ref={inputRef1}
        className="rounded border p-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        placeholder="Auto-focused input"
      />
      <input
        ref={inputRef2}
        className="rounded border p-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        placeholder="input"
      />
      <input
        ref={inputRef3}
        className="rounded border p-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        placeholder="input"
      />
    </div>
  );
}
