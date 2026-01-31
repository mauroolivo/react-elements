import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

export type GitHubUser = {
  login: string;
  name: string | null;
  avatar_url: string;
};

const fetcher = async (url: string): Promise<GitHubUser | null> => {
  const res = await fetch(url, { cache: 'no-store' });
  if (res.status === 401) return null; // no token cookie present yet
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return (await res.json()) as GitHubUser;
};

export function useGithubAuth() {
  const {
    data: user,
    error,
    isLoading,
    mutate,
  } = useSWR<GitHubUser | null>('/api/github/user', fetcher, {
    shouldRetryOnError: false,
  });

  const { trigger: logout, isMutating: loggingOut } = useSWRMutation(
    '/api/auth/logout',
    async (url: string) => {
      await fetch(url, { method: 'POST' });
      await mutate();
    }
  );

  return { user, error, isLoading, logout, loggingOut };
}
