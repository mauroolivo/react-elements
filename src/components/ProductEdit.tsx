"use client";
import { Product } from "@/models/product";
import { updateProduct } from "@/server/server";

export default function ProductEdit({ params }: { params: Product }) {
  async function handleUpdate() {
    const draft = { title: "Updated Product Title" };
    const p = await updateProduct(`${params.id}`, draft);
    console.log("Updated product:", p);
  }
  // client component to update product
  // using server function
  return (
    <>
      <button
        className="mt-4 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        onClick={() => handleUpdate()}
      >
        Update
      </button>
    </>
  );
}
