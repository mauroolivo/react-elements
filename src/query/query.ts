"use server";
import { createClient } from "@libsql/client";
import type { Movie } from "@/models/movie";
import { MoviesSchema } from "@/models/movie";

export async function listMovies(): Promise<Movie[]> {
  const client = createClient({
    url: process.env.DB_URL ?? "",
  });
  const res = await client.execute(
    `SELECT id, title, description, author FROM movies ORDER BY id ASC`
  );
  client.close();
  return MoviesSchema.parse(res.rows);
}

export async function getMovie(id: number): Promise<Movie | null> {
  const client = createClient({
    url: process.env.DB_URL ?? "",
  });
  const res = await client.execute({
    sql: `SELECT id, title, description, author FROM movies WHERE id = ? LIMIT 1`,
    args: [id],
  });
  if (res.rows.length === 0) return null;
  const r = res.rows[0];
  return MoviesSchema.element.parse(r);
}

export async function addMovie(input: Omit<Movie, "id">): Promise<Movie> {
  console.log("Adding movie:", input);
  const client = createClient({
    url: process.env.DB_URL ?? "",
  });
  const res = await client.execute({
    sql: `INSERT INTO movies (title, description, author) VALUES (?, ?, ?)`,
    args: [input.title, input.description, input.author],
  });
  const insertedId = Number(res.lastInsertRowid);
  console.log("Inserted movie with ID:", insertedId);
  const inserted = await getMovie(insertedId);
  if (!inserted) throw new Error("Insert failed");
  return inserted;
}

// // Update an existing movie by id (partial update)
// export async function updateMovie(
//   id: number,
//   changes: Partial<Omit<Movie, "id">>
// ): Promise<Movie | null> {
//   const current = await getMovie(id);
//   if (!current) return null;

//   const next = {
//     ...current,
//     ...changes,
//   };

//   await client.execute({
//     sql: `UPDATE movies SET title = ?, description = ?, author = ? WHERE id = ?`,
//     args: [next.title, next.description, next.author, id],
//   });

//   return getMovie(id);
// }

// // Delete a movie by id (returns true if deleted)
// export async function deleteMovie(id: number): Promise<boolean> {
//   const res = await client.execute({
//     sql: `DELETE FROM movies WHERE id = ?`,
//     args: [id],
//   });
//   // libsql returns affectedRows on some drivers; fallback to checking existence
//   if ((res as any).affectedRows !== undefined) {
//     return Number((res as any).affectedRows) > 0;
//   }
//   return (await getMovie(id)) === null;
// }
