/*
  Repositories screen

  We can't call GitHub directly from the browser because the OAuth token is stored
  in an httpOnly cookie. Instead we call our own server route:
    GET /api/github/repos
*/

'use client';

import { useGithubRepos } from '@/hooks/useGithubRepos';
import type { Repo } from '@/hooks/useGithubRepos';

export default function Page() {
  const { repos, unauthorized, error, isLoading } = useGithubRepos();

  return (
    <main className="mx-auto max-w-4xl p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-semibold">Your GitHub repositories</h1>
        <p className="mt-1 text-sm text-slate-400">
          Loaded via <code className="text-slate-200">/api/github/repos</code>
        </p>
      </header>

      {isLoading ? (
        <div className="rounded-lg border border-slate-700 bg-slate-900/40 p-4 text-sm text-slate-300">
          Loading repositories…
        </div>
      ) : unauthorized ? (
        <div className="rounded-lg border border-amber-900/50 bg-amber-950/30 p-4">
          <p className="text-sm text-amber-100">
            You are not logged in. Connect your GitHub account to load
            repositories.
          </p>
          <a
            href="/github/auth"
            className="mt-3 inline-flex rounded-md bg-emerald-600 px-3 py-2 text-sm font-medium text-white hover:bg-emerald-500"
          >
            Go to login
          </a>
        </div>
      ) : error ? (
        <div className="rounded-lg border border-red-900/60 bg-red-950/40 p-4 text-sm text-red-200">
          {error.message}
        </div>
      ) : repos && repos.length ? (
        <ul className="space-y-3">
          {repos.map((r: Repo) => (
            <li
              key={r.id}
              className="rounded-lg border border-slate-700 bg-slate-900/40 p-4"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <a
                    href={r.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg font-semibold text-emerald-400 hover:text-emerald-300"
                  >
                    {r.full_name}
                  </a>
                  {r.description ? (
                    <p className="mt-1 text-sm text-slate-300">
                      {r.description}
                    </p>
                  ) : (
                    <p className="mt-1 text-sm text-slate-500">
                      No description
                    </p>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-2 text-xs">
                  {r.private ? (
                    <span className="rounded-full bg-slate-700 px-2 py-1 text-slate-200">
                      Private
                    </span>
                  ) : (
                    <span className="rounded-full bg-slate-800 px-2 py-1 text-slate-300">
                      Public
                    </span>
                  )}
                  {r.fork ? (
                    <span className="rounded-full bg-slate-800 px-2 py-1 text-slate-300">
                      Fork
                    </span>
                  ) : null}
                </div>
              </div>

              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-400">
                <span>Language: {r.language ?? '—'}</span>
                <span>Stars: {r.stargazers_count}</span>
                <span>Forks: {r.forks_count}</span>
                <span>
                  Updated:{' '}
                  {new Date(r.updated_at).toLocaleString(undefined, {
                    year: 'numeric',
                    month: 'short',
                    day: '2-digit',
                  })}
                </span>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="rounded-lg border border-slate-700 bg-slate-900/40 p-4 text-sm text-slate-300">
          No repositories found.
        </div>
      )}
    </main>
  );
}
