import { getPayload } from 'payload';
import { pushDevSchema } from '@payloadcms/drizzle';
import config from '@payload-config';

const run = async () => {
  if (!process.env.DATABASE_URL?.startsWith('postgres')) {
    console.log('[push-schema] DATABASE_URL is not postgres, skipping schema push.');
    process.exit(0);
  }

  console.log('[push-schema] Initializing Payload...');
  const payload = await getPayload({ config });

  console.log('[push-schema] Pushing schema to Neon...');
  await pushDevSchema(payload.db as unknown as Parameters<typeof pushDevSchema>[0]);

  console.log('[push-schema] Schema push complete.');
  process.exit(0);
};

run().catch((err) => {
  console.error('[push-schema] Failed:', err);
  process.exit(1);
});
