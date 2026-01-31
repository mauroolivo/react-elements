/*
  GitHub OAuth UI (Authorization Code flow)

  The actual OAuth steps are handled by server routes under /api/auth/github/*.
  This page:
  - provides a "Connect GitHub" button
  - shows the authenticated GitHub user by calling /api/github/user

  Important: we store the access token in an httpOnly cookie, so it is never
  readable by client JavaScript.
*/

'use client';

import { useGithubAuth } from '@/hooks/useGithubAuth';

export default function Page() {
  const { user, error, isLoading, logout, loggingOut } = useGithubAuth();

  return (
    <div className="mx-auto flex max-w-xl flex-col gap-4 p-6">
      <h1 className="text-2xl font-semibold">GitHub OAuth</h1>

      <p>
        If an app wants to use the authorization code grant but can’t protect
        its secret (i.e. native mobile apps or single-page JavaScript apps),
        then the client secret is not required when making a request to exchange
        the auth code for an access token, and PKCE must be used as well.
        However, some services still do not support PKCE (Proof Key for Code
        Exchange), so it may not be possible to perform an authorization flow
        from the single-page app itself, and the client-side JavaScript code may
        need to have a companion server-side component that performs the OAuth
        flow instead.
      </p>
      <p className="text-sm text-slate-400">
        This page starts OAuth, receives the authorization code via the callback
        route, and then uses a stored access token (httpOnly cookie) to call
        GitHub APIs.
      </p>

      {isLoading || loggingOut ? (
        <div className="rounded-lg border border-slate-700 bg-slate-900/40 p-4 text-sm">
          Loading…
        </div>
      ) : user ? (
        <div className="flex items-center gap-3 rounded-lg border border-slate-700 bg-slate-900/40 p-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={user.avatar_url}
            alt=""
            className="h-10 w-10 rounded-full"
          />
          <div className="flex-1">
            <div className="font-medium">{user.login}</div>
            <div className="text-sm text-slate-400">{user.name ?? '—'}</div>
          </div>
          <button
            onClick={() => void logout()}
            className="rounded-md bg-slate-700 px-3 py-2 text-sm hover:bg-slate-600"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="rounded-lg border border-slate-700 bg-slate-900/40 p-4">
          {/* Server route builds authorize URL and redirects to GitHub */}
          <a
            href="/api/auth/github/start"
            className="inline-flex rounded-md bg-emerald-600 px-3 py-2 text-sm font-medium hover:bg-emerald-500"
          >
            Connect GitHub
          </a>
        </div>
      )}

      {error ? (
        <div className="rounded-lg border border-red-900/60 bg-red-950/40 p-3 text-sm text-red-200">
          {error.message}
        </div>
      ) : null}
    </div>
  );
}
