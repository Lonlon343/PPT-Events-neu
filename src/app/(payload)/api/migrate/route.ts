import { getPayload } from 'payload';
import configPromise from '@payload-config';

export const dynamic = 'force-dynamic';

// NOTE: drizzle-kit is excluded from the Vercel deployment bundle by withPayload,
// so schema migrations must run during build (payload migrate:create && payload migrate).
// This route applies any pending file-based migrations committed to src/migrations/.
export async function POST(request: Request) {
  const token = request.headers.get('x-migrate-token');

  if (!process.env.MIGRATE_TOKEN || token !== process.env.MIGRATE_TOKEN) {
    return new Response('Unauthorized', { status: 401 });
  }

  const payload = await getPayload({ config: configPromise });

  try {
    await payload.db.migrate();
    return Response.json({ ok: true });
  } catch (error) {
    payload.logger.error({ err: error, msg: 'Migration failed' });
    return Response.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    );
  }
}
