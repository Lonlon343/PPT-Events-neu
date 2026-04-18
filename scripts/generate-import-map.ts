import { generateImportMap } from 'payload';
import config from '@payload-config';

const run = async () => {
  const resolved = await config;
  await generateImportMap(resolved, { force: true, log: true });
  console.log('[generate-import-map] Done.');
  process.exit(0);
};

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
