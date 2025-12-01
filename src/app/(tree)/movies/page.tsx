import MovieList from '@/components/MovieList';
import MovieListSWR from '@/components/MovieListSWR';

export default function Page() {
  return (
    <div>
      <h1>Movies Page</h1>
      <div className="mx-auto max-w-6xl p-4">
        <h1 className="mb-6 text-2xl font-semibold">Movies Page</h1>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded border border-gray-200 p-4 dark:border-gray-700">
            <h2 className="mb-4 text-lg font-medium">Tanstack Query Fetch</h2>
            <MovieList />
          </div>
          <div className="rounded border border-gray-200 p-4 dark:border-gray-700">
            <h2 className="mb-4 text-lg font-medium">SWR Fetch</h2>
            <MovieListSWR />
          </div>
        </div>
      </div>
    </div>
  );
}
