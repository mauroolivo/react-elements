import Image from "next/image";

type Item = {
  id: number;
  title: string;
  subtitle: string;
  image: string;
};

export function SelectedItem({
  item,
  onClear,
}: {
  item: Item | null;
  onClear: () => void;
}) {
  if (!item) {
    return (
      <div className="mb-4 rounded-lg border border-gray-200 bg-white p-3 text-gray-700 dark:border-gray-800 dark:bg-zinc-900 dark:text-gray-300">
        <p className="text-sm">No item selected.</p>
      </div>
    );
  }

  return (
    <div className="mb-4 flex items-center gap-3 rounded-lg border border-emerald-300 bg-emerald-50 p-3 text-emerald-900 dark:border-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-200">
      <Image
        src={item.image}
        alt="selected"
        width={40}
        height={40}
        className="h-10 w-10 rounded object-cover"
      />
      <div className="min-w-0 flex-1">
        <p className="truncate font-medium">{item.title}</p>
        <p className="truncate text-sm opacity-75">{item.subtitle}</p>
      </div>
      <button
        className="rounded-md border border-emerald-300 px-2 py-1 text-xs font-medium text-emerald-900 hover:bg-emerald-100 dark:border-emerald-700 dark:text-emerald-200 dark:hover:bg-emerald-900/40"
        onClick={onClear}
      >
        Clear
      </button>
    </div>
  );
}
