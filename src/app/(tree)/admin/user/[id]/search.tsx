'use client';
import { useSearchParams, useRouter } from 'next/navigation';

export default function Section() {
  const searchParams: URLSearchParams = useSearchParams();
  const router = useRouter();

  function updateSorting(sortOrder: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set('action', sortOrder);
    window.history.pushState(null, '', `?${params.toString()}`);
  }
  return (
    <div className="mt-4 border p-4">
      <div>update the query parameters from the client (search simulation</div>
      <button className="m-2 border px-1 rounded" onClick={() => updateSorting('active')}>Inject Active</button>
      <button className="m-2 border px-1 rounded" onClick={() => updateSorting('inactive')}>Inject Inactive</button>
      <button className="m-2 border px-1 rounded" onClick={() => router.push('/')}>Home</button>
    </div>
  );
}
