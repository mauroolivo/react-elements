
import { getPosts } from '@/server/server';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  return Response.json(await getPosts());
}