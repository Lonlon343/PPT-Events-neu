import { sendEventReminders } from '@/actions/sendEventReminders';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const token = url.searchParams.get('token');
  const dryRun = url.searchParams.get('dryRun') === 'true';

  if (!process.env.REMINDER_TOKEN || token !== process.env.REMINDER_TOKEN) {
    return new Response('Unauthorized', { status: 401 });
  }

  const result = await sendEventReminders(dryRun);

  return Response.json(result);
}
