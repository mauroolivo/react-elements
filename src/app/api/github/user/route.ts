import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export const runtime = 'nodejs';

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get('gh_token')?.value;

  if (!token) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  // Example authorized API call to GitHub using the stored OAuth access token.
  const res = await fetch('https://api.github.com/user', {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      // Some GitHub endpoints prefer having a UA.
      'User-Agent': 'react-elements',
    },
    cache: 'no-store',
  });

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
