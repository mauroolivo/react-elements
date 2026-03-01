import useSWR from "swr";

/**
 * Subset of GitHub repository metadata used by the UI.
 */
export type Repo = {
  /** Unique GitHub repository identifier. */
  id: number;
  /** Repository short name. */
  name: string;
  /** Repository full name in `owner/name` format. */
  full_name: string;
  /** Public GitHub URL for the repository. */
  html_url: string;
  /** Repository description, when provided. */
  description: string | null;
  /** Indicates whether the repository is private. */
  private: boolean;
  /** Indicates whether the repository is a fork. */
  fork: boolean;
  /** Number of stars on GitHub. */
  stargazers_count: number;
  /** Number of forks on GitHub. */
  forks_count: number;
  /** Primary language detected by GitHub. */
  language: string | null;
  /** Last update timestamp in ISO format. */
  updated_at: string;
};

type RepoResponse = { repos: Repo[]; unauthorized: boolean };

/**
 * Fetches repositories for the authenticated GitHub user.
 *
 * Returns an empty list with `unauthorized: true` on `401` responses.
 */
const fetcher = async (url: string): Promise<RepoResponse> => {
  const res = await fetch(url, { cache: "no-store" });
  if (res.status === 401) return { repos: [], unauthorized: true };
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = (await res.json()) as Repo[];
  return { repos: data, unauthorized: false };
};

/**
 * React hook that loads GitHub repositories through `/api/github/repos`.
 *
 * @returns Repository list, auth status, and SWR loading/error state.
 */
export function useGithubRepos() {
  const { data, error, isLoading } = useSWR<RepoResponse>(
    "/api/github/repos",
    fetcher,
    { shouldRetryOnError: false },
  );

  return {
    repos: data?.repos ?? [],
    unauthorized: Boolean(data?.unauthorized),
    error,
    isLoading,
  };
}
