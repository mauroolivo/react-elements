import { createClient } from "@libsql/client";

const client = createClient({
  url: "file:src/data/movies.db",
});

// Create movies table
await client.execute(
  `CREATE TABLE IF NOT EXISTS movies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title STRING NOT NULL,
    description STRING NOT NULL,
    author STRING NOT NULL
  )`
);

// Star Wars movies
const movies = [
  {
    id: 1,
    title: "A New Hope",
    description:
      "The Rebel Alliance launches a daring mission to destroy the Death Star.",
    author: "George Lucas",
  },
  {
    id: 2,
    title: "The Empire Strikes Back",
    description:
      "The Empire pursues the Rebels as Luke trains with Yoda and faces Vader.",
    author: "Irvin Kershner",
  },
  {
    id: 3,
    title: "Return of the Jedi",
    description:
      "The Rebels battle the Empire on Endor while Luke confronts the Emperor.",
    author: "Richard Marquand",
  },
  {
    id: 4,
    title: "The Phantom Menace",
    description:
      "Jedi discover a powerful child as the Sith return to threaten the Republic.",
    author: "George Lucas",
  },
  {
    id: 5,
    title: "Attack of the Clones",
    description:
      "Amid political turmoil, Anakin and Padmé grow closer while war looms.",
    author: "George Lucas",
  },
  {
    id: 6,
    title: "Revenge of the Sith",
    description:
      "Anakin falls to the dark side as the Republic transforms into the Empire.",
    author: "George Lucas",
  },
  {
    id: 7,
    title: "The Force Awakens",
    description: "A scavenger discovers her destiny as the First Order rises.",
    author: "J.J. Abrams",
  },
  {
    id: 8,
    title: "The Last Jedi",
    description:
      "The Resistance fights to survive while Rey seeks guidance from Luke.",
    author: "Rian Johnson",
  },
  {
    id: 9,
    title: "The Rise of Skywalker",
    description:
      "The final battle against the Sith brings the Skywalker saga to a close.",
    author: "J.J. Abrams",
  },
  {
    id: 10,
    title: "Rogue One",
    description:
      "A team of Rebels steals the Death Star plans in a desperate mission.",
    author: "Gareth Edwards",
  },
];

for await (const movie of movies) {
  await client.execute({
    sql: "INSERT INTO movies (id, title, description, author) VALUES (?, ?, ?, ?)",
    args: [movie.id, movie.title, movie.description, movie.author],
  });
}

client.close();

console.log("Database created with Star Wars movies");
