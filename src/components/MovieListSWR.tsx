"use client";
import useSWR from "swr";
import { MoviesSchema } from "@/models/movie";
import { NewMovieSWR } from "./NewMovieSWR";

const fetcher = async (url: string) => {
  const res = await fetch(url);
  return MoviesSchema.parse(await res.json());
};

export default function MovieListSWR() {
  const { data, error, isLoading } = useSWR("/api/movies", fetcher);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
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
      <NewMovieSWR />
    </>
  );
}
