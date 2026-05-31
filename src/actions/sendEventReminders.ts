import { neon } from '@neondatabase/serverless';
import { Resend } from 'resend';
import { createElement } from 'react';
import { EventReminderEmail } from '@/emails/EventReminder';

type ReminderResult = {
  ok: boolean;
  sent?: number;
  skipped?: number;
  failures?: Array<{ participantId: string; error: string }>;
  message?: string;
};

function getReminderWindow(hoursBefore: number) {
  const now = new Date();
  const target = new Date(now.getTime() + hoursBefore * 60 * 60 * 1000);
  const windowStart = new Date(target.getTime() - 30 * 60 * 1000);
  const windowEnd = new Date(target.getTime() + 30 * 60 * 1000);
  return { windowStart, windowEnd };
}

export async function sendEventReminders(dryRun = false): Promise<ReminderResult> {
  if (!process.env.RESEND_API_KEY) {
    return { ok: false, message: 'RESEND_API_KEY fehlt.' };
  }
  if (!process.env.DATABASE_URL) {
    return { ok: false, message: 'DATABASE_URL fehlt.' };
  }

  const sql = neon(process.env.DATABASE_URL);
  const resend = new Resend(process.env.RESEND_API_KEY);

  const events = await sql`
    SELECT id, title, start_date, location, event_type, online_link, reminder_hours_before
    FROM events
    WHERE status = 'published'
      AND event_status = 'upcoming'
    ORDER BY start_date
  `;

  let sent = 0;
  let skipped = 0;
  const failures: Array<{ participantId: string; error: string }> = [];

  for (const ev of events) {
    const hoursBefore = (ev.reminder_hours_before as number) ?? 24;
    const { windowStart, windowEnd } = getReminderWindow(hoursBefore);
    const start = new Date(ev.start_date as string);

    if (start < windowStart || start > windowEnd) continue;

    const participants = await sql`
      SELECT id, first_name, email
      FROM participants
      WHERE event_id = ${ev.id as number}
    `;

    for (const p of participants) {
      try {
        const logWindowStart = new Date(windowStart);
        logWindowStart.setMinutes(0, 0, 0);
        const logWindowEnd = new Date(windowEnd);
        logWindowEnd.setMinutes(59, 59, 999);

        const existing = await sql`
          SELECT id FROM reminder_logs
          WHERE event_id = ${ev.id as number}
            AND participant_id = ${p.id as number}
            AND reminder_at >= ${logWindowStart.toISOString()}
            AND reminder_at <= ${logWindowEnd.toISOString()}
          LIMIT 1
        `;

        if (existing.length > 0) {
          skipped += 1;
          continue;
        }

        if (dryRun) {
          sent += 1;
          continue;
        }

        await resend.emails.send({
          from: process.env.EMAIL_FROM || 'PPT-Events <noreply@ppt-events.de>',
          to: process.env.EMAIL_TEST_OVERRIDE || (p.email as string),
          subject: `Erinnerung: ${ev.title as string}`,
          react: createElement(EventReminderEmail, {
            firstName: p.first_name as string,
            eventTitle: ev.title as string,
            eventDate: new Date(ev.start_date as string).toLocaleDateString('de-DE', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              timeZone: 'Europe/Berlin',
            }),
            eventTime: new Date(ev.start_date as string).toLocaleTimeString('de-DE', {
              hour: '2-digit',
              minute: '2-digit',
              timeZone: 'Europe/Berlin',
            }),
            eventLocation: (ev.location as string) || '',
            eventType: (ev.event_type as 'online' | 'in-person') || 'in-person',
            onlineLink: (ev.online_link as string | undefined) || undefined,
          }),
        });

        sent += 1;

        const now = new Date().toISOString();
        await sql`
          INSERT INTO reminder_logs (event_id, participant_id, reminder_at, created_at, updated_at)
          VALUES (${ev.id as number}, ${p.id as number}, ${now}, ${now}, ${now})
        `;
      } catch (err) {
        failures.push({
          participantId: String(p.id),
          error: err instanceof Error ? err.message : 'Unbekannter Fehler',
        });
      }
    }
  }

  return { ok: true, sent, skipped, failures };
}
