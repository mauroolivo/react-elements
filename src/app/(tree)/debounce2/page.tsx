'use client';

import DebouncedInput2 from '@/components/DebouncedInput2';

export default function Debounce2Page() {
  return (
    <div className="min-h-screen bg-slate-900 p-6 text-slate-100">
      <div className="mx-auto max-w-3xl space-y-6">
        <section className="rounded bg-gray-800 p-6">
          <h1 className="text-2xl font-semibold">Debounce Ref-based Demo</h1>
          <p className="mt-2 text-sm text-gray-400">
            This demo uses refs to avoid rerenders while typing.
          </p>
          <div className="mt-4">
            <DebouncedInput2 />
          </div>
        </section>
      </div>
    </div>
  );
}
