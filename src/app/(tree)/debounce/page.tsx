'use client';

import DebouncedInput from '@/components/DebouncedInput';

export default function Page() {
  return (
    <main className="mx-auto max-w-2xl space-y-4 p-6">
      <h1 className="text-2xl font-semibold">Debounced Search</h1>
      <p className="text-sm text-slate-400">
        This input simulates a remote server request while typing, with a
        debounce to avoid firing on every keystroke.
      </p>
      <DebouncedInput />
    </main>
  );
}
