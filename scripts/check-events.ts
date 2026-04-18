import { getPayload } from 'payload';
import config from '@payload-config';

const run = async () => {
  const payload = await getPayload({ config });

  const { docs } = await payload.find({ collection: 'events', limit: 50 });
  const broken = (docs as any[]).filter(
    (d) => !d.slug || !/^[a-z0-9-]+$/.test(d.slug),
  );

  if (broken.length === 0) {
    console.log('[check-events] All slugs are URL-safe.');
    process.exit(0);
  }

  console.log(`[check-events] Fixing ${broken.length} broken slug(s)...`);
  for (const doc of broken) {
    const fixed = (doc.title || `event-${doc.id}`)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '') || `event-${doc.id}`;
    console.log(`  #${doc.id}: "${doc.slug}" -> "${fixed}"`);
    await payload.update({
      collection: 'events',
      id: doc.id,
      data: { slug: fixed },
    });
  }
  process.exit(0);
};

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
