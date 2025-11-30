"use client";
import { useQuery } from "@tanstack/react-query";
import { PostsResponseSchema } from "@/models/post";

export default function PostList() {
  const { data } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await fetch("/api/posts");
      return PostsResponseSchema.parse(await res.json());
    },
  });

  return (
    <ul>
      {data?.posts.map((post) => (
        <li key={post.id}>
          <p>{post.title}</p>
        </li>
      ))}
    </ul>
  );
}
