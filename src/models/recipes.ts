import { z } from 'zod';

const RecipeSchema = z.object({
  id: z.number(),
  name: z.string(),
  ingredients: z.array(z.string()),
  instructions: z.array(z.string()),
  prepTimeMinutes: z.number(),
  cookTimeMinutes: z.number(),
  servings: z.number(),
  difficulty: z.string(),
  cuisine: z.string(),
  caloriesPerServing: z.number(),
  tags: z.array(z.string()),
  userId: z.number(),
  image: z.string(),
  rating: z.number(),
  reviewCount: z.number(),
  mealType: z.array(z.string()),
});
type Recipe = z.infer<typeof RecipeSchema>;
const RecipesResponseSchema = z.object({
  recipes: z.array(RecipeSchema),
  total: z.number(),
  skip: z.number(),
  limit: z.number(),
});
type RecipesResponse = z.infer<typeof RecipesResponseSchema>;

export type { Recipe, RecipesResponse };
export { RecipeSchema, RecipesResponseSchema };