import Link from "next/link";
import Image from "next/image";

type SelectorItemProps = {
  item: { id: number; title: string; subtitle: string; image: string };
  active: boolean;
  onToggle: () => void;
};

export function ListItem({ item, active, onToggle }: SelectorItemProps) {
  return (
    <div
      className={`flex items-center gap-3 rounded-md p-2 transition ${
        active
          ? "border border-blue-400 bg-blue-50 dark:border-blue-700 dark:bg-blue-900/20"
          : "hover:bg-gray-50 dark:hover:bg-zinc-800/60"
      }`}
    >
      <button
        type="button"
        aria-pressed={active}
        onClick={onToggle}
        className="flex flex-1 items-center gap-3 text-left"
      >
        <Image
          src={item.image}
          alt="avatar"
          width={48}
          height={48}
          className="h-12 w-12 flex-none rounded object-cover"
        />
        <div className="min-w-0 flex-1">
          <p className="truncate font-medium text-gray-900 dark:text-gray-100">
            {item.title}
          </p>
          <p className="truncate text-sm text-gray-600 dark:text-gray-300">
            {item.subtitle}
          </p>
        </div>
      </button>
      <Link
        href="#"
        aria-label="Open"
        className="rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-zinc-800"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-5 w-5"
        >
          <path
            fillRule="evenodd"
            d="M13.72 3.72a.75.75 0 011.06 0l6.5 6.5a.75.75 0 010 1.06l-6.5 6.5a.75.75 0 11-1.06-1.06l5.22-5.22H3.75a.75.75 0 010-1.5h15.19l-5.22-5.22a.75.75 0 010-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </Link>
    </div>
  );
}
