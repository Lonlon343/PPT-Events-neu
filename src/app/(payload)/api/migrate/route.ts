import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { pushDevSchema } from '@payloadcms/drizzle';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const token = request.headers.get('x-migrate-token');

  if (!process.env.MIGRATE_TOKEN || token !== process.env.MIGRATE_TOKEN) {
    return new Response('Unauthorized', { status: 401 });
  }

  const payload = await getPayload({ config: configPromise });

  await pushDevSchema(payload.db as unknown as Parameters<typeof pushDevSchema>[0]);

  return Response.json({ ok: true });
}
