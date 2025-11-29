import { ProductsResponse } from '@/app/models/product';
import { getCategories, getProducts } from '@/app/api/api';
import Link from 'next/link';

import CategoryList from './CategoryList';
import { Suspense } from 'react';

export default async function ProductList() {
  const data: ProductsResponse = await getProducts();
  const categoriesPromise = getCategories();
  return (
    <>
      <div className="bg-green-900 p-2">
        <h1>Categories</h1>
        <Suspense fallback={<div>Loading categories...</div>}>
          <CategoryList categoriesPromise={categoriesPromise} />
        </Suspense>
      </div>

      <div className="container mx-auto grid grid-cols-4 gap-2 p-4">
        {data.products.map((product) => (
          <div className="m-0 rounded-xl bg-gray-900 p-2" key={product.id}>
            <div className="display-inline-block w-fit rounded-full bg-amber-900 px-2 py-0">
              {product.category}
            </div>

            <p className="font-bold">{product.title}</p>

            <Link
              className="text-sm text-blue-300 hover:underline"
              href={`/products/${product.id}`}
            >
              View Product
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
