"use server";

// server functions to fetch data from external APIs
import {
  ProductsResponse,
  Product,
  CategoriesResponse,
  CategoriesResponseSchema,
} from "@/models/product";
import { ProductsResponseSchema, ProductSchema } from "@/models/product";
import { RecipesResponse, RecipesResponseSchema } from "../models/recipes";
import { PostsResponse, PostsResponseSchema } from "@/models/post";

const DELAY = 1000;
export async function getProducts(): Promise<ProductsResponse> {
  const res = await fetch(`https://dummyjson.com/products?delay=${DELAY}`);
  const data: ProductsResponse = await res.json();
  return ProductsResponseSchema.parse(data);
}
export async function getProductById(id: string): Promise<Product> {
  const res = await fetch(
    `https://dummyjson.com/products/${id}?delay=${DELAY}`
  );
  const data: Product = await res.json();
  return ProductSchema.parse(data);
}
export async function updateProduct(
  id: string,
  product: Partial<Product>
): Promise<Product> {
  const res = await fetch(
    `https://dummyjson.com/products/${id}?delay=${DELAY}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    }
  );
  const data: Product = await res.json();
  return ProductSchema.parse(data);
}
export async function getCategories(): Promise<CategoriesResponse> {
  const res = await fetch(
    `https://dummyjson.com/products/category-list?delay=${5000}`
  );
  const data: string[] = await res.json();
  return CategoriesResponseSchema.parse(data);
}
export async function getRecipes(): Promise<RecipesResponse> {
  const res = await fetch(`https://dummyjson.com/recipes?delay=${DELAY}`);
  const data: RecipesResponse = await res.json();
  return RecipesResponseSchema.parse(data);
}
export async function getPosts(): Promise<PostsResponse> {
  const res = await fetch(`https://dummyjson.com/posts?delay=${DELAY}`);
  const data: PostsResponse = await res.json();
  return PostsResponseSchema.parse(data);
}
