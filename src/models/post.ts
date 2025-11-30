import { z } from 'zod';

const ReactionsSchema = z.object({
  likes: z.number(),
  dislikes: z.number(),
});
// type Reactions = z.infer<typeof ReactionsSchema>;

const PostSchema = z.object({
  id: z.number(),
  title: z.string(),
  body: z.string(),
  tags: z.array(z.string()),
  reactions: ReactionsSchema,
  views: z.number(),
  userId: z.number(),
});
type Post = z.infer<typeof PostSchema>;

const PostsResponseSchema = z.object({
  posts: z.array(PostSchema),
  total: z.number(),
  skip: z.number(),
  limit: z.number(),
});
type PostsResponse = z.infer<typeof PostsResponseSchema>;

export { PostSchema, PostsResponseSchema };
export type { Post, PostsResponse };
