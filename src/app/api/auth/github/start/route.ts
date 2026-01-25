import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createHash, randomBytes } from 'crypto';

// Ensure we can use Node's crypto + Buffer APIs.
export const runtime = 'nodejs';

function base64url(input: Buffer) {
  return input
    .toString('base64')
    .replaceAll('+', '-')
    .replaceAll('/', '_')
    .replaceAll('=', '');
}

/**
 * PKCE scaffolding (recommended by oauth.com).
 * - code_verifier: random secret stored server-side
 * - code_challenge: SHA256(verifier) sent to the authorization server
 */
function pkceChallenge(verifier: string) {
  const hash = createHash('sha256').update(verifier).digest();
  return base64url(hash);
}

export async function GET(req: Request) {
  const clientId = process.env.GITHUB_CLIENT_ID;
  if (!clientId) {
    return NextResponse.json(
      { error: 'Missing env GITHUB_CLIENT_ID' },
      { status: 500 }
    );
  }

  // Build redirect_uri dynamically so it works in dev/prod.
  // This MUST match the callback URL configured in your GitHub OAuth App.
  const url = new URL(req.url);
  const origin = url.origin;
  const redirectUri = `${origin}/api/auth/github/callback`;

  // state prevents CSRF. We store it and verify it on callback.
  const state = base64url(randomBytes(32));

  // PKCE values
  const codeVerifier = base64url(randomBytes(32));
  const codeChallenge = pkceChallenge(codeVerifier);

  const cookieStore = await cookies();
  cookieStore.set('gh_oauth_state', state, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 10 * 60, // 10 minutes
  });
  cookieStore.set('gh_pkce_verifier', codeVerifier, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 10 * 60,
  });

  // GitHub Authorization Endpoint
  const authorize = new URL('https://github.com/login/oauth/authorize');
  authorize.searchParams.set('client_id', clientId);
  authorize.searchParams.set('redirect_uri', redirectUri);
  authorize.searchParams.set('state', state);

  // Scopes: adjust as needed (e.g. "repo" for private repo access)
  authorize.searchParams.set('scope', 'read:user');

  // PKCE params
  authorize.searchParams.set('code_challenge', codeChallenge);
  authorize.searchParams.set('code_challenge_method', 'S256');

  return NextResponse.redirect(authorize.toString());
}
