import { type NextRequest } from 'next/server';
import { listMovies } from '@/query/query';

export async function GET(request: NextRequest) {
  return Response.json(await listMovies());
}
