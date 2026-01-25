import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export const runtime = 'nodejs';

type GitHubRepo = {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  private: boolean;
  fork: boolean;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
};

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get('gh_token')?.value;

  if (!token) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  // Authorized call to list repositories for the authenticated user.
  // Docs: https://docs.github.com/rest/repos/repos#list-repositories-for-the-authenticated-user
  const url = new URL('https://api.github.com/user/repos');
  url.searchParams.set('per_page', '100');
  url.searchParams.set('sort', 'updated');
  url.searchParams.set('direction', 'desc');

  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
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

  const data = (await res.json()) as GitHubRepo[];

  // Return only the fields the UI needs.
  const slim = data.map((r) => ({
    id: r.id,
    name: r.name,
    full_name: r.full_name,
    html_url: r.html_url,
    description: r.description,
    private: r.private,
    fork: r.fork,
    stargazers_count: r.stargazers_count,
    forks_count: r.forks_count,
    language: r.language,
    updated_at: r.updated_at,
  }));

  return NextResponse.json(slim);
}
