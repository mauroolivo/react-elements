import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { fetchWithGitHubAuth } from '../_token';

export const runtime = 'nodejs';

export async function GET() {
  const cookieStore = await cookies();
  const res = await fetchWithGitHubAuth(
    cookieStore,
    'https://api.github.com/user',
    {
      cache: 'no-store',
    }
  );

  if (res.status === 401) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  if (!res.ok) {
    const text = await res.text();
    return NextResponse.json(
      { error: `GitHub API failed: HTTP ${res.status}`, details: text },
      { status: 502 }
    );
  }

  const data = await res.json();
  return NextResponse.json(data);
}
