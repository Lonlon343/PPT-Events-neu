import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { buildParticipantsCsv } from '@/lib/participantsExport';

export const dynamic = 'force-dynamic';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const url = new URL(request.url);
  const token = url.searchParams.get('token');

  if (!process.env.EXPORT_TOKEN || token !== process.env.EXPORT_TOKEN) {
    return new Response('Unauthorized', { status: 401 });
  }
  const payload = await getPayload({ config: configPromise });

  const event = await payload.findByID({ collection: 'events', id });
  if (!event) {
    return new Response('Event nicht gefunden', { status: 404 });
  }

  const { docs } = await payload.find({
    collection: 'participants',
    where: { event: { equals: id } },
    limit: 1000,
    sort: '-createdAt',
  });

  const rows = docs.map((doc) => ({
    firstName: doc.firstName,
    lastName: doc.lastName,
    email: doc.email,
    company: doc.company,
    message: doc.message,
    createdAt: doc.createdAt,
  }));

  const csv = buildParticipantsCsv(rows);
  const filename = `teilnehmer-${event.slug || event.id}.csv`;

  return new Response(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="${filename}"`,
    },
  });
}
