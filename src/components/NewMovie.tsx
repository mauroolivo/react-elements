"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addMovie } from "@/query/query";

export function NewMovie() {
  const queryClient = useQueryClient();
  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationFn: ({
      title,
      description,
      author,
    }: {
      title: string;
      description: string;
      author: string;
    }) => addMovie({ title, description, author }),
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ["movies"],
      });
    },
    onError(error) {
      console.log("Mutation error:", error);
    },
    onSettled() {
      console.log("Mutation settled");
    },
  });

  function handleClick() {
    mutate(
      {
        title: "Future Movie Title 1",
        description: "Future Movie Description",
        author: "Me the Jedi",
      },
      {
        onSuccess: () => {
          console.log("Movie added successfully from onClick handler");
        },
        onError: (error) => {
          console.log("Error adding movie from onClick handler:", error);
        },
        onSettled: () => {
          console.log("Add movie mutation settled from onClick handler");
        },
      }
    );
  }
  return (
    <div className="actions">
      <button
        className="bg-blue-500 hover:bg-blue-600 p-2 rounded"
        type="button"
        onClick={handleClick}
      >
        {isPending ? "Creating..." : "Create New Movie"}
      </button>
      {isError && <span role="alert">An unexpected error occurred</span>}
      {isSuccess && (
        <span role="alert" className="success">
          Movie successfully created
        </span>
      )}
    </div>
  );
}
