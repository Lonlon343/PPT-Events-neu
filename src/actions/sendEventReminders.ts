'use server';

import { getPayload } from 'payload';
import configPromise from '@payload-config';

type PayloadEvent = {
  id: string | number;
  title: string;
  startDate: string;
  location?: string;
  eventType?: 'online' | 'in-person';
  onlineLink?: string;
  reminderHoursBefore?: number;
};

type Participant = {
  id: string | number;
  firstName: string;
  email: string;
};

type ParticipantRecord = {
  id: string;
  event: string | PayloadEvent;
};

function getReminderWindow(hoursBefore: number) {
  const now = new Date();
  const target = new Date(now.getTime() + hoursBefore * 60 * 60 * 1000);
  const windowStart = new Date(target.getTime() - 30 * 60 * 1000);
  const windowEnd = new Date(target.getTime() + 30 * 60 * 1000);
  return { windowStart, windowEnd };
}

export async function sendEventReminders(dryRun = false) {
  if (!process.env.RESEND_API_KEY) {
    return { ok: false, message: 'RESEND_API_KEY fehlt. Keine Erinnerungen gesendet.' };
  }

  const payload = await getPayload({ config: configPromise });

  const { docs: events } = await payload.find({
    collection: 'events',
    where: {
      status: { equals: 'published' },
      eventStatus: { equals: 'upcoming' },
    },
    limit: 200,
    sort: 'startDate',
  });

  let sent = 0;
  let skipped = 0;
  const failures: Array<{ participantId: string; error: string }> = [];

  for (const ev of events as PayloadEvent[]) {
    const hoursBefore = ev.reminderHoursBefore ?? 24;
    const { windowStart, windowEnd } = getReminderWindow(hoursBefore);
    const start = new Date(ev.startDate);

    if (start < windowStart || start > windowEnd) {
      continue;
    }

    const { docs: participants } = await payload.find({
      collection: 'participants',
      where: { event: { equals: ev.id } },
      limit: 1000,
    });

    for (const participant of participants as Participant[]) {
      try {
        const reminderWindowStart = new Date(windowStart);
        reminderWindowStart.setMinutes(0, 0, 0);
        const reminderWindowEnd = new Date(windowEnd);
        reminderWindowEnd.setMinutes(59, 59, 999);

        const alreadySent = await payload.find({
          collection: 'reminder-logs',
          where: {
            and: [
              { event: { equals: ev.id } },
              { participant: { equals: participant.id } },
              { reminderAt: { greater_than_equal: reminderWindowStart.toISOString() } },
              { reminderAt: { less_than_equal: reminderWindowEnd.toISOString() } },
            ],
          },
          limit: 1,
        });

        if (alreadySent.docs.length > 0) {
          skipped += 1;
          continue;
        }

        if (dryRun) {
          sent += 1;
          continue;
        }

        const { Resend } = await import('resend');
        const { EventReminderEmail } = await import('@/emails/EventReminder');
        const { createElement } = await import('react');

        const resend = new Resend(process.env.RESEND_API_KEY);
        await resend.emails.send({
          from: process.env.EMAIL_FROM || 'PPT-Events <noreply@ppt-events.de>',
          to: participant.email,
          subject: `Erinnerung: ${ev.title}`,
          react: createElement(EventReminderEmail, {
            firstName: participant.firstName,
            eventTitle: ev.title,
            eventDate: new Date(ev.startDate).toLocaleDateString('de-DE', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            }),
            eventTime: new Date(ev.startDate).toLocaleTimeString('de-DE', {
              hour: '2-digit',
              minute: '2-digit',
            }),
            eventLocation: ev.location || '',
            eventType: ev.eventType || 'in-person',
            onlineLink: ev.onlineLink,
          }),
        });

        sent += 1;

        await payload.create({
          collection: 'reminder-logs',
          data: {
            event: ev.id,
            participant: participant.id,
            reminderAt: new Date().toISOString(),
          },
        });
      } catch (err) {
        failures.push({
          participantId: String(participant.id),
          error: err instanceof Error ? err.message : 'Unbekannter Fehler',
        });
      }
    }
  }

  return { ok: true, sent, skipped, failures };
}
