import { ProductsResponse, Product } from '@/app/models/product';
import { ProductsResponseSchema, ProductSchema } from '@/app/models/product';

export async function getProducts(): Promise<ProductsResponse> {
  const res = await fetch('https://dummyjson.com/products');
  const data: ProductsResponse = await res.json();
  return ProductsResponseSchema.parse(data);
}
export async function getProductById(id: string): Promise<Product> {
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  const data: Product = await res.json();
  return ProductSchema.parse(data);
}
