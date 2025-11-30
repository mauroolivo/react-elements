import ErrorProduct from '@/components/ErrorProduct';
import ProductDetail from '@/components/ProductDetail';
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
