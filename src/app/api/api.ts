import {
  ProductsResponse,
  Product,
  CategoriesResponse,
  CategoriesResponseSchema,
} from '@/app/models/product';
import { ProductsResponseSchema, ProductSchema } from '@/app/models/product';

const DELAY = 1000;
export async function getProducts(): Promise<ProductsResponse> {
  const res = await fetch(`https://dummyjson.com/products?delay=${DELAY}`);
  const data: ProductsResponse = await res.json();
  return ProductsResponseSchema.parse(data);
}
export async function getProductById(id: string): Promise<Product> {
  const res = await fetch(`https://dummyjson.com/products/${id}?delay=${DELAY}`);
  const data: Product = await res.json();
  return ProductSchema.parse(data);
}
export async function updateProduct(
  id: string,
  product: Partial<Product>
): Promise<Product> {
  const res = await fetch(`https://dummyjson.com/products/${id}?delay=${DELAY}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  });
  const data: Product = await res.json();
  return ProductSchema.parse(data);
}
export async function getCategories(): Promise<CategoriesResponse> {
  const res = await fetch(`https://dummyjson.com/products/category-list?delay=${5000}`);
  const data: string[] = await res.json();
  return CategoriesResponseSchema.parse(data);
}
