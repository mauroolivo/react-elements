import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export const runtime = 'nodejs';

export async function POST() {
  // Clears the token and any leftover OAuth/PKCE cookies.
  const cookieStore = await cookies();
  cookieStore.delete('gh_token');
  cookieStore.delete('gh_oauth_state');
  cookieStore.delete('gh_pkce_verifier');

  return NextResponse.json({ ok: true });
}
