"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import debounce from "lodash.debounce";

type Result = {
  query: string;
  timestamp: number;
};

async function simulateRemoteCall(q: string) {
  const delay = 500 + Math.floor(Math.random() * 400);
  await new Promise((r) => setTimeout(r, delay));
  return { query: q, timestamp: Date.now() } satisfies Result;
}

export default function DebouncedInput() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const reqIdRef = useRef(0);

  const debouncedRequest = useMemo(
    () =>
      debounce(async (q: string, currentReqId: number) => {
        try {
          const data = await simulateRemoteCall(q);
          // ignore out-of-order responses
          if (reqIdRef.current !== currentReqId) return;
          setResult(data);
        } finally {
          if (reqIdRef.current === currentReqId) setLoading(false);
        }
      }, 400),
    [],
  );

  useEffect(() => {
    return () => {
      debouncedRequest.cancel();
    };
  }, [debouncedRequest]);

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const q = e.target.value;
    setQuery(q);
    setLoading(true);
    const id = ++reqIdRef.current;
    debouncedRequest(q, id);
  }

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="mx-auto flex max-w-xl flex-col gap-3"
    >
      <label htmlFor="search" className="text-sm text-slate-300">
        Search (debounced)
      </label>
      <input
        id="search"
        name="search"
        type="text"
        value={query}
        onChange={onChange}
        placeholder="Type to search..."
        className="rounded-md border border-slate-700 bg-slate-900 px-3 py-2 outline-none focus:border-emerald-600"
        autoComplete="off"
      />

      <div className="rounded-lg border border-slate-700 bg-slate-900/40 p-3 text-sm">
        {loading ? (
          <span className="text-slate-300">Loading…</span>
        ) : result ? (
          <div className="space-y-1 text-slate-200">
            <div>
              Result for: <span className="font-medium">{result.query}</span>
            </div>
            <div className="text-xs text-slate-400">
              At: {new Date(result.timestamp).toLocaleTimeString()}
            </div>
          </div>
        ) : (
          <span className="text-slate-500">No results yet.</span>
        )}
      </div>
    </form>
  );
}
