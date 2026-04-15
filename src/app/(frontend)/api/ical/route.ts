import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { buildCalendarICS } from '@/lib/ical';
import type { PayloadEvent } from '@/lib/events';

export const dynamic = 'force-dynamic';

export async function GET() {
  const payload = await getPayload({ config: configPromise });
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ppt-events.de';

  const { docs } = await payload.find({
    collection: 'events',
    where: {
      status: { equals: 'published' },
      or: [
        { eventStatus: { equals: 'upcoming' } },
        { eventStatus: { exists: false } },
      ],
    },
    limit: 200,
    sort: 'startDate',
  });

  const ics = buildCalendarICS(docs as PayloadEvent[], siteUrl);

  return new Response(ics, {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': 'attachment; filename="ppt-events.ics"',
    },
  });
}
