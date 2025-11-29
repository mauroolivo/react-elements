'use client';
import { CategoriesResponse } from '@/app/models/product';
import { getCategories } from '@/app/api/api';
import { use, useState } from 'react';
import { fa } from 'zod/locales';

export default function CategoryList({
  categoriesPromise,
}: {
  categoriesPromise: Promise<CategoriesResponse>;
}) {
  const categories = use(categoriesPromise);
  const [show, setShow] = useState(false);
  return (
    <div className="container mx-auto grid grid-cols-4 gap-2 p-4">
      <button
        className="m-0 rounded-xl bg-gray-700 p-2"
        onClick={() => setShow(!show)}
      >
        {show ? 'Hide Categories' : 'Show Categories'}
      </button>
      {show &&
        categories.map((category) => (
          <div className="m-0 rounded-xl bg-gray-900 p-2" key={category}>
            {category}
          </div>
        ))}
    </div>
  );
}
