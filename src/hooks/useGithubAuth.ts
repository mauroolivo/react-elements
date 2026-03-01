import useSWR from "swr";
import useSWRMutation from "swr/mutation";

/**
 * Minimal GitHub user data returned by the app auth endpoints.
 */
export type GitHubUser = {
  /** GitHub username (unique login handle). */
  login: string;
  /** Public display name, if available on the user profile. */
  name: string | null;
  /** URL of the user's GitHub avatar image. */
  avatar_url: string;
};

/**
 * Fetches the authenticated GitHub user from the backend.
 *
 * Returns `null` when the user is unauthenticated (`401`) and throws for
 * all other non-success responses.
 */
const fetcher = async (url: string): Promise<GitHubUser | null> => {
  const res = await fetch(url, { cache: "no-store" });
  if (res.status === 401) return null; // no token cookie present yet
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return (await res.json()) as GitHubUser;
};

/**
 * React hook to read and manage GitHub authentication state.
 *
 * It retrieves the current authenticated user from `/api/github/user`, exposes
 * loading and error states, and provides a `logout` action that calls
 * `/api/auth/logout` and refreshes the user state.
 *
 * @returns Auth state and logout controls.
 */
export function useGithubAuth() {
  const {
    data: user,
    error,
    isLoading,
    mutate,
  } = useSWR<GitHubUser | null>("/api/github/user", fetcher, {
    shouldRetryOnError: false,
  });

  const { trigger: logout, isMutating: loggingOut } = useSWRMutation(
    "/api/auth/logout",
    async (url: string) => {
      await fetch(url, { method: "POST" });
      await mutate();
    },
  );

  return { user, error, isLoading, logout, loggingOut };
}
