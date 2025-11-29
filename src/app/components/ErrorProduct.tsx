'use client';
import { useRouter } from 'next/navigation';
export default function ErrorProduct() {
  const router = useRouter();
  return (
    <>
      <h1>Error loading product</h1>
      <button onClick={() => router.replace('/products')}>Products</button>
    </>
  );
}
