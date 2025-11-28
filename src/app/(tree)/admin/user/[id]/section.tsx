'use client';
import { useParams, useSearchParams } from "next/navigation";

export default function Section() {
    const params: { id: string } = useParams();
    const searchParams: URLSearchParams = useSearchParams();
  return (
    <div className="p-4 border mt-4">
      <div>This is a client component using params and searchParams.</div>
      <p>user id: {params.id}</p>
      <p>action: {searchParams.get('action')}</p>
    </div>
  );
}   