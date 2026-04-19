import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { notFound } from 'next/navigation';
import { EventSchema } from '@/components/EventSchema';
import { EventDetailClient } from '@/components/EventDetailClient';
import { EventNavArrows } from '@/components/EventNavArrows';
import { mapPayloadEventToCard, type PayloadEvent } from '@/lib/events';
import { RichText } from '@payloadcms/richtext-lexical/react';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function EventDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const payload = await getPayload({ config: configPromise });

  const { docs } = await payload.find({
    collection: 'events',
    where: {
      slug: { equals: slug },
      status: { equals: 'published' },
    },
    limit: 1,
  });

  const event = docs[0] as PayloadEvent | undefined;
  if (!event) return notFound();

  const allRes = await payload.find({
    collection: 'events',
    where: { status: { equals: 'published' } },
    sort: 'startDate',
    limit: 500,
    depth: 0,
  });
  const all = allRes.docs as PayloadEvent[];
  const idx = all.findIndex((e) => e.slug === event.slug);
  const prevDoc = idx > 0 ? all[idx - 1] : null;
  const nextDoc = idx >= 0 && idx < all.length - 1 ? all[idx + 1] : null;
  const prev = prevDoc ? { slug: prevDoc.slug, title: prevDoc.title } : null;
  const next = nextDoc ? { slug: nextDoc.slug, title: nextDoc.title } : null;

  const mapped = mapPayloadEventToCard(event);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ppt-events.de';
  const url = `${siteUrl}/veranstaltungen/${event.slug}`;

  return (
    <main>
      <EventSchema
        title={event.title}
        description={typeof event.description === 'string' ? event.description : undefined}
        startDate={event.startDate}
        endDate={event.endDate}
        image={event.image?.url}
        location={event.location}
        url={url}
      />

      <div className="bg-[#FBFCFC] pt-24">
        <div className="container mx-auto max-w-6xl px-6">
          <EventNavArrows prev={prev} next={next} />
        </div>
      </div>

      <EventDetailClient event={mapped} shareUrl={url} />

      {event.description ? (
        <section className="bg-white py-16">
          <div className="container mx-auto max-w-4xl px-6">
            <RichText
              data={event.description as Parameters<typeof RichText>[0]['data']}
              className="richtext"
            />
          </div>
        </section>
      ) : null}

      <div className="bg-[#FBFCFC] pb-16">
        <div className="container mx-auto max-w-6xl px-6">
          <EventNavArrows prev={prev} next={next} />
        </div>
      </div>
    </main>
  );
}
