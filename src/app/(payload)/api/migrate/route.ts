import { getPayload } from 'payload';
import configPromise from '@payload-config';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const token = request.headers.get('x-migrate-token');

  if (!process.env.MIGRATE_TOKEN || token !== process.env.MIGRATE_TOKEN) {
    return new Response('Unauthorized', { status: 401 });
  }

  const payload = await getPayload({ config: configPromise });

  await payload.db.migrate({
    payload,
    migrations: payload.db.migrations,
    req: undefined,
  });

  return Response.json({ ok: true });
}
