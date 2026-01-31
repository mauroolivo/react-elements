import useSWR from "swr";

export type Repo = {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  private: boolean;
  fork: boolean;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
};

type RepoResponse = { repos: Repo[]; unauthorized: boolean };

const fetcher = async (url: string): Promise<RepoResponse> => {
  const res = await fetch(url, { cache: "no-store" });
  if (res.status === 401) return { repos: [], unauthorized: true };
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = (await res.json()) as Repo[];
  return { repos: data, unauthorized: false };
};

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
