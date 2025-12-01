"use client";
import useSWR from "swr";
import { addMovie } from "@/query/query";
import { MoviesSchema } from "@/models/movie";

const fetcher = async (url: string) => {
  const res = await fetch(url);
  return MoviesSchema.parse(await res.json());
};
export function NewMovieSWR() {

  const { mutate } = useSWR("/api/movies", fetcher);

  const handleAddMovie = async () => {
    try {
      await addMovie({
        title: "New Movie from SWR",
        description: "A description of the new movie",
        author: "SWR User",
      });
      mutate();
    } catch (error) {
      console.error("Failed to add movie:", error);
    }
  };

  return (
    <div className="actions">
      <button
        className="bg-blue-500 hover:bg-blue-600 p-2 rounded"
        type="button"
        onClick={handleAddMovie}
      >
        Add New Movie SWR
      </button>
    </div>
  );
}
