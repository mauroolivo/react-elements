import type { NextRequest } from 'next/server';
import { contactSchema } from '@/models/contact';
import { insertContact } from '@/query/query';

export async function POST(request: NextRequest) {
  const payload = await request.json().catch(() => null);
  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return Response.json(
      { ok: false, error: 'Invalid contact payload' },
      { status: 400 }
    );
  }

  try {
    await insertContact(parsed.data);
    return Response.json({ ok: true }, { status: 201 });
  } catch (e) {
    return Response.json(
      { ok: false, error: e instanceof Error ? e.message : 'Save failed' },
      { status: 500 }
    );
  }
}
