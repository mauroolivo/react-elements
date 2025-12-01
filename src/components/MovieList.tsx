"use client";
import { useQuery } from "@tanstack/react-query";
import { MoviesSchema } from "@/models/movie";
import { NewMovie } from "./NewMovie";

export default function MoviewList() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["movies"],
    queryFn: async () => {
      const res = await fetch("/api/movies");
      return MoviesSchema.parse(await res.json());
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading movies</div>;
  }
  return (
    <>
      <ul>
        {data?.map((movie) => (
          <li key={movie.id}>
            {/* <Link href={`/posts/${post.id}`}>{post.title}</Link> */}
            <p>{movie.title}</p>
          </li>
        ))}
      </ul>
      <NewMovie />
    </>
  );
}
