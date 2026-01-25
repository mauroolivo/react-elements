import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export const runtime = 'nodejs';

export async function GET(req: Request) {
  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return NextResponse.json(
      { error: 'Missing env GITHUB_CLIENT_ID or GITHUB_CLIENT_SECRET' },
      { status: 500 }
    );
  }

  const url = new URL(req.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');

  if (!code || !state) {
    return NextResponse.json({ error: 'Missing code/state' }, { status: 400 });
  }

  const cookieStore = await cookies();
  const expectedState = cookieStore.get('gh_oauth_state')?.value;
  const codeVerifier = cookieStore.get('gh_pkce_verifier')?.value;

  // Verify state to prevent CSRF
  if (!expectedState || state !== expectedState) {
    return NextResponse.json({ error: 'Invalid state' }, { status: 400 });
  }

  // Exchange authorization code for access token (server-side)
  const origin = url.origin;
  const redirectUri = `${origin}/api/auth/github/callback`;

  // GitHub Token Endpoint
  const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      code,
      redirect_uri: redirectUri,
      // If we sent PKCE in /start, we should also send the verifier here.
      ...(codeVerifier ? { code_verifier: codeVerifier } : {}),
    }),
  });

  if (!tokenRes.ok) {
    const text = await tokenRes.text();
    return NextResponse.json(
      {
        error: `Token exchange failed: HTTP ${tokenRes.status}`,
        details: text,
      },
      { status: 502 }
    );
  }

  const tokenJson = (await tokenRes.json()) as {
    access_token?: string;
    token_type?: string;
    scope?: string;
    error?: string;
    error_description?: string;
  };

  if (!tokenJson.access_token) {
    return NextResponse.json(
      { error: tokenJson.error ?? 'No access_token', details: tokenJson },
      { status: 400 }
    );
  }

  // Store token in httpOnly cookie so client JS can't read it.
  cookieStore.set('gh_token', tokenJson.access_token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  // Clear one-time cookies
  cookieStore.delete('gh_oauth_state');
  cookieStore.delete('gh_pkce_verifier');

  // Redirect back to the UI page
  return NextResponse.redirect(new URL('/github/auth', req.url));
}
