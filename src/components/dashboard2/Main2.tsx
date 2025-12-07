"use client";
import { useUserStore } from "./useUserStore";

export function Main2({ children }: { children: ReactNode }) {
  const { userName } = useUserStore();
  return (
    <main>
      <h1>Welcome</h1>
      <p>{userName ? `Hello ${userName}!` : "Please sign in"}</p>
      {children}
    </main>
  );
}
