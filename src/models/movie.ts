import { z } from "zod";

const MoviesSchema = z.array(
  z.object({
    id: z.number(),
    title: z.string(),
    description: z.string(),
    author: z.string(),
  })
);

export type Movie = z.infer<typeof MoviesSchema.element>;
export { MoviesSchema };
