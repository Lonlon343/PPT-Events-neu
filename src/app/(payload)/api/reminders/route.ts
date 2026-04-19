import { sendEventReminders } from '@/actions/sendEventReminders';

export const dynamic = 'force-dynamic';

function authorized(request: Request): boolean {
  const expected = process.env.REMINDER_TOKEN;
  if (!expected) return false;

  const header = request.headers.get('authorization') ?? '';
  const bearer = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (bearer && bearer === expected) return true;

  const xToken = request.headers.get('x-reminder-token');
  if (xToken && xToken === expected) return true;

  return false;
}

async function run(request: Request) {
  if (!authorized(request)) {
    return new Response('Unauthorized', { status: 401 });
  }
  const url = new URL(request.url);
  const dryRun = url.searchParams.get('dryRun') === 'true';
  const result = await sendEventReminders(dryRun);
  return Response.json(result);
}

export async function GET(request: Request) {
  return run(request);
}

export async function POST(request: Request) {
  return run(request);
}
