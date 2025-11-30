"use client";
import { useQuery } from "@tanstack/react-query";
import { getRecipes } from "../server/server";

export default function RecipeList() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["recipes"],
    queryFn: () => {
      return getRecipes();
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading recipes</div>;
  }
  return (
    <ul>
      {data?.recipes.map((recipe) => (
        <li key={recipe.id}>
          {/* <Link href={`/posts/${post.id}`}>{post.title}</Link> */}
          <p>{recipe.name}</p>
        </li>
      ))}
    </ul>
  );
}
