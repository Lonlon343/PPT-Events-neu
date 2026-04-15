import type { MetadataRoute } from 'next';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import type { PayloadEvent } from '@/lib/events';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ppt-events.de';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${siteUrl}/veranstaltungen`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${siteUrl}/kontakt`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  ];

  try {
    const payload = await getPayload({ config: configPromise });
    const { docs: events } = await payload.find({
      collection: 'events',
      where: { status: { equals: 'published' } },
      limit: 100,
    });

    const eventRoutes: MetadataRoute.Sitemap = (events as PayloadEvent[]).map((event) => ({
      url: `${siteUrl}/veranstaltungen/${event.slug}`,
      lastModified: event.updatedAt ? new Date(event.updatedAt) : new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));

    return [...staticRoutes, ...eventRoutes];
  } catch {
    return staticRoutes;
  }
}
