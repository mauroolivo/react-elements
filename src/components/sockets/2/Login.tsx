"use client";
import { useState, type FormEvent, type ChangeEvent } from "react";

interface LoginProps {
  onSubmit: (username: string) => void;
}

export function Login({ onSubmit }: LoginProps) {
  const [username, setUsername] = useState<string>("");
  return (
    <>
      <h1>Welcome</h1>
      <p>What should people call you?</p>
      <form
        onSubmit={(e: FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          onSubmit(username);
        }}
      >
        <input
          type="text"
          value={username}
          placeholder="username"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setUsername(e.target.value)
          }
        />
        <input type="submit" />
      </form>
    </>
  );
}
