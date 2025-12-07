'use client';
import { use } from 'react';
import { UserContext } from './UserContext';

export function Content() {
  const { permissions, togglePermissions } = use(UserContext);
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
