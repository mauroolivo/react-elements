import { Suspense } from 'react';
import ProductList from '@/components/ProductList';
import Loader from '@/components/Loader';

export default async function Page() {
  return (
    <Suspense fallback={<Loader />}>
      <ProductList />
    </Suspense>
  );
}
