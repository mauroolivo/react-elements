import ErrorProduct from '@/app/components/ErrorProduct';
import ProductDetail from '@/app/components/ProductDetail';
import { ErrorBoundary } from 'react-error-boundary';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <ErrorBoundary fallback={<ErrorProduct />}>
      <ProductDetail params={params} />
    </ErrorBoundary>
  );
}
