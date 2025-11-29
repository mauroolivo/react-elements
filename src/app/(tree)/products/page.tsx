import { Suspense } from 'react';
import ProductList from '@/app/components/ProductList';
import Loader from '@/app/components/Loader';

export default async function Page() {
  
  return (
    <Suspense fallback={<Loader />}>
      <ProductList />
    </Suspense>
  );
}
