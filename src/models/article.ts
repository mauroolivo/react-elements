import { z } from "zod";
import { Timestamp } from "firebase/firestore";

export const ArticleSchema = z.object({
  content: z.string(),
  tags: z.array(z.string()),
  title: z.string(),
  createdAt: z.instanceof(Timestamp),
  validFrom: z.instanceof(Timestamp),
  validUntil: z.instanceof(Timestamp),
});

export type Article = z.infer<typeof ArticleSchema>;

export const ArticleInputSchema = z.object({
  content: z.string().trim().min(1, {
    message: "Content cannot be empty",
  }),
  tags: z.array(z.string()).min(1, {
    message: "At least one tag is required",
  }),
  title: z.string().trim().min(1, {
    message: "Title cannot be empty",
  }),
  createdAt: z.any(),
  validFrom: z.any(),
  validUntil: z.any(),
});

export type ArticleInput = z.infer<typeof ArticleInputSchema>;
