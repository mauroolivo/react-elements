"use client";
import { useUserStore } from "./useUserStore";

export function Header2() {
  const { userName, handleSignIn, handleSignOut, loading, togglePermissions } =
    useUserStore();
  return (
    <header>
      {userName ? (
        <>
          <span onClick={togglePermissions}>{userName} has signed in</span>
          <button type="button" onClick={handleSignOut} disabled={loading}>
            {loading ? "..." : "Sign out"}
          </button>
        </>
      ) : (
        <button type="button" onClick={handleSignIn} disabled={loading}>
          {loading ? "..." : "Sign in"}
        </button>
      )}
    </header>
  );
}
