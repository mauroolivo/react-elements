import Link from 'next/link';
import { ProductsResponse } from '@/app/models/product';
import { getProducts } from '@/app/api/api';

export default async function Page() {
  const data: ProductsResponse = await getProducts();
  return (
    <div className="grid grid-cols-4 gap-2 container mx-auto p-4">
      {data.products.map((product) => (
        <div className="m-0 bg-gray-900 rounded-xl p-2" key={product.id}>
          <div className='bg-amber-900 px-2 py-0 rounded-full display-inline-block w-fit'>{product.category}</div>
          
          <p className='font-bold'>{product.title}</p>

          <Link
            className="text-sm text-blue-300 hover:underline"
            href={`/products/${product.id}`}
          >
            View Product
          </Link>
        </div>
      ))}
    </div>
  );
}
