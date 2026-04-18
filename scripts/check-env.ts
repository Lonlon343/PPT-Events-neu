import { getPayload } from 'payload';
import config from '@payload-config';

const run = async () => {
  const resolved = typeof config === 'function' ? await config() : await config;
  console.log('token present:', !!process.env.BLOB_READ_WRITE_TOKEN);
  console.log('plugins count:', (resolved as any).plugins?.length ?? 0);
  console.log('media collection upload config:');
  const mediaColl = (resolved as any).collections.find((c: any) => c.slug === 'media');
  console.log(JSON.stringify(mediaColl?.upload, null, 2));
  process.exit(0);
};
run().catch((e) => { console.error(e); process.exit(1); });
