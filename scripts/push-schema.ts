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
      // 42P07 = duplicate_table, 42710 = duplicate_object (type/constraint),
      // 42701 = duplicate_column. All "already exists" cases — phase 2 reconciles.
      // 42703 = undefined_column: happens when a new collection adds an FK column
      // to an existing relation table (e.g. payload_locked_documents_rels). The
      // CREATE TABLE is skipped because the table exists, so the FK ALTER fails
      // since the column hasn't been added yet. Phase 2 (pushSchema) adds the
      // column AND re-adds the FK via its diff.
      if (
        code === '42710' ||
        code === '42P07' ||
        code === '42701' ||
        code === '42703' ||
        err.message?.includes('already exists')
      ) {
        // skip silently — phase 2 will reconcile
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
