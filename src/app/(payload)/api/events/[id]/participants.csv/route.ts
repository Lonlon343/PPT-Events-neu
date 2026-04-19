import { getPayload } from 'payload';
import { headers as nextHeaders } from 'next/headers';
import configPromise from '@payload-config';
import { buildParticipantsCsv } from '@/lib/participantsExport';

export const dynamic = 'force-dynamic';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const payload = await getPayload({ config: configPromise });

  const { user } = await payload.auth({ headers: await nextHeaders() });
  if (!user) {
    return new Response('Unauthorized', { status: 401 });
  }

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
  const safeSlug = (event.slug ?? '').toString().replace(/[^a-zA-Z0-9_-]/g, '');
  const filename = `teilnehmer-${safeSlug || event.id}.csv`;

  return new Response(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="${filename}"`,
    },
  });
}
