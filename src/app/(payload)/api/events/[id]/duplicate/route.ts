import { getPayload } from 'payload';
import { headers as nextHeaders } from 'next/headers';
import configPromise from '@payload-config';

export const dynamic = 'force-dynamic';

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const payload = await getPayload({ config: configPromise });

  const { user } = await payload.auth({ headers: await nextHeaders() });
  if (!user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const event = await payload.findByID({ collection: 'events', id });
  if (!event) {
    return Response.json({ error: 'Event nicht gefunden' }, { status: 404 });
  }

  const weeks =
    typeof event.recurrenceWeeks === 'number' && event.recurrenceWeeks > 0
      ? event.recurrenceWeeks
      : 2;

  const shiftMs = weeks * 7 * 24 * 60 * 60 * 1000;
  const newStart = new Date(new Date(event.startDate as string).getTime() + shiftMs);
  const newEnd = new Date(new Date(event.endDate as string).getTime() + shiftMs);

  const baseSlug = (event.slug as string ?? '').replace(/-\d{4}-\d{2}-\d{2}$/, '');
  const dateSuffix = newStart.toISOString().slice(0, 10);
  const newSlug = `${baseSlug}-${dateSuffix}`;

  const imageId =
    event.image == null
      ? undefined
      : typeof event.image === 'object'
        ? (event.image as { id: number }).id
        : (event.image as number);

  const newEvent = await payload.create({
    collection: 'events',
    data: {
      title: event.title as string,
      slug: newSlug,
      startDate: newStart.toISOString(),
      endDate: newEnd.toISOString(),
      location: event.location as string,
      eventType: (event.eventType as 'in-person' | 'online') ?? 'in-person',
      onlineLink: (event.onlineLink as string | undefined) ?? undefined,
      speaker: event.speaker as string,
      description: event.description ?? undefined,
      image: imageId,
      price: (event.price as string | undefined) ?? undefined,
      capacity: (event.capacity as number | undefined) ?? undefined,
      recurrenceWeeks: weeks,
      status: (event.status as 'published' | 'draft') ?? 'published',
    },
  });

  return Response.json({ id: newEvent.id });
}
