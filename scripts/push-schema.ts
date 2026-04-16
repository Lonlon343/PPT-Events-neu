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
  const { generateDrizzleJson, generateMigration, pushSchema } = adapter.requireDrizzleKit();
  const drizzle = adapter.drizzle;

  // First: ensure all tables exist (CREATE TABLE / TYPE for any that are missing)
  console.log('[push-schema] Generating base schema...');
  const currentSnapshot = generateDrizzleJson(adapter.schema);
  const emptySnapshot = generateDrizzleJson({});
  const createStatements = await generateMigration(emptySnapshot, currentSnapshot);

  console.log(`[push-schema] Running ${createStatements.length} base statements (skipping duplicates)...`);
  for (const sql of createStatements) {
    if (!sql.trim()) continue;
    try {
      await adapter.execute({ drizzle, raw: sql });
    } catch (err: any) {
      const code = err.code ?? err.cause?.code;
      if (code === '42710' || code === '42P07' || err.message?.includes('already exists')) {
        // table/type already exists — skip silently
      } else {
        throw err;
      }
    }
  }

  // Second: apply any structural diffs (e.g. NOT NULL → nullable, new columns)
  // pushSchema introspects the live DB and generates ALTER TABLE etc. — no prompts
  // since all tables already exist (no rename ambiguity).
  console.log('[push-schema] Applying schema diff (ALTER TABLE etc.)...');
  const { apply, warnings } = await pushSchema(
    adapter.schema,
    drizzle,
    adapter.schemaName ? [adapter.schemaName] : undefined,
    adapter.tablesFilter,
  );

  if (warnings.length) {
    console.log('[push-schema] Warnings:', warnings.join('\n'));
  }

  await apply();

  console.log('[push-schema] Schema push complete.');
  process.exit(0);
};

run().catch((err) => {
  console.error('[push-schema] Failed:', err);
  process.exit(1);
});
