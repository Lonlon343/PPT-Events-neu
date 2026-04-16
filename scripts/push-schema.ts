import { getPayload } from 'payload';
import config from '@payload-config';

const run = async () => {
  if (!process.env.DATABASE_URL?.startsWith('postgres')) {
    console.log('[push-schema] DATABASE_URL is not postgres, skipping schema push.');
    process.exit(0);
  }

  console.log('[push-schema] Initializing Payload...');
  const payload = await getPayload({ config });

  const adapter = payload.db as any;
  const { generateDrizzleJson, generateMigration } = adapter.requireDrizzleKit();

  console.log('[push-schema] Generating schema diff...');
  const drizzle = adapter.drizzle;

  const currentSnapshot = generateDrizzleJson(adapter.schema);
  const emptySnapshot = generateDrizzleJson({});

  const sqlStatements = await generateMigration(emptySnapshot, currentSnapshot);

  if (!sqlStatements.length) {
    console.log('[push-schema] No SQL statements generated, schema may already be up to date.');
    process.exit(0);
  }

  console.log(`[push-schema] Executing ${sqlStatements.length} migration statements...`);

  for (const sql of sqlStatements) {
    if (sql.trim()) {
      try {
        await adapter.execute({ drizzle, raw: sql });
      } catch (err: any) {
        if (err.message?.includes('already exists')) {
          console.log(`[push-schema] Skipped (already exists): ${sql.slice(0, 80)}...`);
        } else {
          throw err;
        }
      }
    }
  }

  console.log('[push-schema] Schema push complete.');
  process.exit(0);
};

run().catch((err) => {
  console.error('[push-schema] Failed:', err);
  process.exit(1);
});
