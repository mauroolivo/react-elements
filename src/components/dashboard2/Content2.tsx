"use client";
import { useUserStore } from "./useUserStore";

export function Content2() {
  const { permissions, togglePermissions } = useUserStore();
  if (permissions === undefined) {
    return null;
  }
  return (
    <>
      <p>
        {permissions.includes("admin")
          ? "Some important stuff that only an admin can do"
          : "Insufficient permissions"}
      </p>
      <button onClick={togglePermissions} type="button">
        Toggle Permissions
      </button>
    </>
  );
}
