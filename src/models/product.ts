import { z } from 'zod';

const DimensionsSchema = z.object({
  width: z.number(),
  height: z.number(),
  depth: z.number(),
});
// type Dimensions = z.infer<typeof DimensionsSchema>;

const ReviewSchema = z.object({
  rating: z.number(),
  comment: z.string(),
  date: z.string(),
  reviewerName: z.string(),
  reviewerEmail: z.string().email(),
});
// type Review = z.infer<typeof ReviewSchema>;

const MetaSchema = z.object({
  createdAt: z.string(),
  updatedAt: z.string(),
  barcode: z.string(),
  qrCode: z.string(),
});
// type Meta = z.infer<typeof MetaSchema>;

const ProductSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  category: z.string(),
  price: z.number(),
  discountPercentage: z.number(),
  rating: z.number(),
  stock: z.number(),
  tags: z.array(z.string()).optional(),
  brand: z.string().optional(),
  sku: z.string().optional(),
  weight: z.number().optional(),
  dimensions: DimensionsSchema.optional(),
  warrantyInformation: z.string().optional(),
  shippingInformation: z.string().optional(),
  availabilityStatus: z.string().optional(),
  reviews: z.array(ReviewSchema).optional(),
  returnPolicy: z.string().optional(),
  minimumOrderQuantity: z.number().optional(),
  meta: MetaSchema.optional(),
  images: z.array(z.string()),
  thumbnail: z.string(),
});
type Product = z.infer<typeof ProductSchema>;

const ProductsResponseSchema = z.object({
    products: z.array(ProductSchema),
    total: z.number(),
    skip: z.number(),
    limit: z.number(),
});
type ProductsResponse = z.infer<typeof ProductsResponseSchema>;

const CategoriesResponseSchema = z.array(z.string());
type CategoriesResponse = z.infer<typeof CategoriesResponseSchema>;

export { ProductSchema, ProductsResponseSchema, CategoriesResponseSchema };
export type { Product, ProductsResponse, CategoriesResponse };