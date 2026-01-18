"use client";
import { useState } from "react";
import { Login } from "./Login";
import { Home } from "./Home";

export default function Server2() {
  const [username, setUsername] = useState<string>("");
  return (
    <>
      <div>Server2 Component</div>
      {username ? (
        <Home username={username} />
      ) : (
        <Login
          onSubmit={(username: string) => {
            setUsername(username);
          }}
        />
      )}
    </>
  );
}
