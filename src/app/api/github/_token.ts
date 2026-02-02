import { cookies } from 'next/headers';

const ACCESS_TOKEN_COOKIE = 'gh_token';
const ACCESS_TOKEN_EXPIRES_AT_COOKIE = 'gh_token_expires_at';
const REFRESH_TOKEN_COOKIE = 'gh_refresh_token';
const REFRESH_TOKEN_EXPIRES_AT_COOKIE = 'gh_refresh_token_expires_at';

const CLOCK_SKEW_SECONDS = 30;

type CookieStore = Awaited<ReturnType<typeof cookies>>;

type TokenResponse = {
  access_token?: string;
  token_type?: string;
  scope?: string;
  expires_in?: number;
  refresh_token?: string;
  refresh_token_expires_in?: number;
  error?: string;
  error_description?: string;
};

function nowSeconds() {
  return Math.floor(Date.now() / 1000);
}

function readIntCookie(cookieStore: CookieStore, name: string): number | null {
  const v = cookieStore.get(name)?.value;
  if (!v) return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

function setAuthCookies(cookieStore: CookieStore, token: TokenResponse) {
  if (!token.access_token) return;

  const now = nowSeconds();
  const expiresIn = token.expires_in;
  const refreshExpiresIn = token.refresh_token_expires_in;

  // Access token cookie
  cookieStore.set(ACCESS_TOKEN_COOKIE, token.access_token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    // Keep cookie short-lived if we know token lifetime; otherwise default.
    maxAge: typeof expiresIn === 'number' ? expiresIn : 60 * 60 * 24 * 7,
  });

  // Store computed expiry timestamps to support refresh.
  if (typeof expiresIn === 'number') {
    cookieStore.set(ACCESS_TOKEN_EXPIRES_AT_COOKIE, String(now + expiresIn), {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });
  }

  // Refresh token cookies (only available if "expiring user authorization tokens" is enabled)
  if (token.refresh_token) {
    cookieStore.set(REFRESH_TOKEN_COOKIE, token.refresh_token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge:
        typeof refreshExpiresIn === 'number'
          ? refreshExpiresIn
          : 60 * 60 * 24 * 30,
    });
  }

  if (typeof refreshExpiresIn === 'number') {
    cookieStore.set(
      REFRESH_TOKEN_EXPIRES_AT_COOKIE,
      String(now + refreshExpiresIn),
      {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: 60 * 60 * 24 * 30,
      }
    );
  }
}

async function refreshAccessToken(cookieStore: CookieStore) {
  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;
  if (!clientId || !clientSecret) return null;

  const refreshToken = cookieStore.get(REFRESH_TOKEN_COOKIE)?.value;
  if (!refreshToken) return null;

  const refreshExpiresAt = readIntCookie(
    cookieStore,
    REFRESH_TOKEN_EXPIRES_AT_COOKIE
  );
  if (
    refreshExpiresAt &&
    nowSeconds() >= refreshExpiresAt - CLOCK_SKEW_SECONDS
  ) {
    return null;
  }

  const res = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }),
  });

  if (!res.ok) return null;
  const json = (await res.json()) as TokenResponse;
  if (!json.access_token) return null;

  setAuthCookies(cookieStore, json);
  return json.access_token;
}

export async function getGitHubAccessToken(cookieStore: CookieStore) {
  const token = cookieStore.get(ACCESS_TOKEN_COOKIE)?.value;
  if (!token) return null;

  const expiresAt = readIntCookie(cookieStore, ACCESS_TOKEN_EXPIRES_AT_COOKIE);
  if (expiresAt && nowSeconds() >= expiresAt - CLOCK_SKEW_SECONDS) {
    const refreshed = await refreshAccessToken(cookieStore);
    return refreshed ?? token;
  }

  return token;
}

export async function refreshGitHubAccessToken(cookieStore: CookieStore) {
  return refreshAccessToken(cookieStore);
}

export async function fetchWithGitHubAuth(
  cookieStore: CookieStore,
  input: RequestInfo,
  init?: RequestInit
) {
  const token = await getGitHubAccessToken(cookieStore);

  if (!token) {
    return new Response(JSON.stringify({ error: 'Not authenticated' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const mergeHeaders = (t: string) => {
    const base: Record<string, string> = {
      Authorization: `Bearer ${t}`,
      Accept: 'application/vnd.github+json',
      'User-Agent': 'react-elements',
    };

    const h = init?.headers;
    if (!h) return base;

    // Normalize HeadersInit into a plain object where possible.
    if (h instanceof Headers) {
      h.forEach((v, k) => (base[k] = v));
      return base;
    }

    if (Array.isArray(h)) {
      for (const [k, v] of h) base[k] = v;
      return base;
    }

    return { ...base, ...(h as Record<string, string>) };
  };

  const makeRequest = (t: string) =>
    fetch(input, { ...(init ?? {}), headers: mergeHeaders(t) });

  let res = await makeRequest(token);

  if (res.status === 401) {
    const refreshed = await refreshAccessToken(cookieStore);
    if (refreshed) res = await makeRequest(refreshed);
  }

  return res;
}

export const githubAuthCookieNames = {
  ACCESS_TOKEN_COOKIE,
  ACCESS_TOKEN_EXPIRES_AT_COOKIE,
  REFRESH_TOKEN_COOKIE,
  REFRESH_TOKEN_EXPIRES_AT_COOKIE,
};

export { setAuthCookies };
