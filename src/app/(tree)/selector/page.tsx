'use client';
import { useMemo, useState } from 'react';
import { ListItem } from '@/components/selector/ListItem';
import { SelectedItem } from '@/components/selector/SelectedItem';
type Item = {
  id: number;
  title: string;
  subtitle: string;
  image: string;
};

function makeItems(count = 100): Item[] {
  return Array.from({ length: count }).map((_, i) => {
    const id = i + 1;
    return {
      id,
      title: `Item #${id}`,
      subtitle: `This is the subtitle for item ${id}`,
      image: `https://picsum.photos/seed/selector-${id}/64/64`,
    } satisfies Item;
  });
}

export default function Page() {
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const items = useMemo(() => makeItems(100), []);
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q)
    );
  }, [items, query]);

  const selected = selectedId
    ? (items.find((i) => i.id === selectedId) ?? null)
    : null;

  return (
    <div className="min-h-screen bg-zinc-50 p-4 dark:bg-black">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-center gap-6 md:gap-8">
        <div className="w-full max-w-3xl">
          <h1 className="mb-2 text-center text-2xl font-semibold text-gray-900 dark:text-gray-100">
            Selector
          </h1>
          <p className="mb-4 text-center text-sm text-gray-600 dark:text-gray-300">
            Filter and pick one item. Only one selection at a time.
          </p>

          <SelectedItem item={selected} onClear={() => setSelectedId(null)} />
        </div>

        {/* Card */}
        <div className="w-full max-w-3xl rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-zinc-900">
          {/* Search */}
          <div className="mb-3">
            <label htmlFor="search" className="sr-only">
              Search
            </label>
            <input
              id="search"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by title or subtitle"
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm transition outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-gray-700 dark:bg-zinc-800 dark:text-gray-100"
            />
          </div>

          {/* List with vertical scroll */}
          <div className="selector-scroll max-h-[60vh] overflow-y-auto pr-1">
            <ul className="divide-y divide-gray-200 dark:divide-gray-800">
              {filtered.map((item) => {
                const active = selectedId === item.id;
                return (
                  <li key={item.id} className="py-2">
                    <ListItem
                      item={item}
                      active={active}
                      onToggle={() => setSelectedId(active ? null : item.id)}
                    />
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Footer */}
          <div className="mt-3 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>
              Showing {filtered.length} of {items.length}
            </span>
            <span>Selected: {selectedId ?? '—'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
