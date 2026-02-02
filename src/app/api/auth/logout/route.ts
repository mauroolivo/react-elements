import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { githubAuthCookieNames } from '@/app/api/github/_token';

export const runtime = 'nodejs';

export async function POST() {
  // Clears the token and any leftover OAuth/PKCE cookies.
  const cookieStore = await cookies();
  cookieStore.delete(githubAuthCookieNames.ACCESS_TOKEN_COOKIE);
  cookieStore.delete(githubAuthCookieNames.ACCESS_TOKEN_EXPIRES_AT_COOKIE);
  cookieStore.delete(githubAuthCookieNames.REFRESH_TOKEN_COOKIE);
  cookieStore.delete(githubAuthCookieNames.REFRESH_TOKEN_EXPIRES_AT_COOKIE);
  cookieStore.delete('gh_oauth_state');
  cookieStore.delete('gh_pkce_verifier');

  return NextResponse.json({ ok: true });
}
