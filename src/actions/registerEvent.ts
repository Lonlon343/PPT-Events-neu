'use server';

import { z } from 'zod';
import { getPayload } from 'payload';
import configPromise from '@payload-config';

const registrationSchema = z.object({
  firstName: z.string().min(2, 'Bitte gib deinen Vornamen ein.'),
  lastName: z.string().min(2, 'Bitte gib deinen Nachnamen ein.'),
  email: z.string().email('Bitte gib eine gültige E-Mail-Adresse ein.'),
  company: z.string().optional(),
  message: z.string().optional(),
  eventId: z.string().min(1),
});

export type RegistrationState =
  | { status: 'idle' }
  | { status: 'success'; message: string }
  | { status: 'error'; message: string; fieldErrors?: Record<string, string[]> };

export async function registerForEvent(
  _prevState: RegistrationState,
  formData: FormData,
): Promise<RegistrationState> {
  const raw = {
    firstName: formData.get('firstName') as string,
    lastName: formData.get('lastName') as string,
    email: formData.get('email') as string,
    company: formData.get('company') as string,
    message: formData.get('message') as string,
    eventId: formData.get('eventId') as string,
  };

  const parsed = registrationSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Record<string, string[]> = {};
    for (const [key, errs] of Object.entries(parsed.error.flatten().fieldErrors)) {
      fieldErrors[key] = errs as string[];
    }
    return { status: 'error', message: 'Bitte prüfe deine Eingaben.', fieldErrors };
  }

  const { firstName, lastName, email, company, message, eventId } = parsed.data;

  try {
    const payload = await getPayload({ config: configPromise });

    // Check capacity
    const event = await payload.findByID({ collection: 'events', id: eventId });
    if (!event) {
      return { status: 'error', message: 'Event nicht gefunden.' };
    }

    if (event.capacity) {
      const { totalDocs } = await payload.find({
        collection: 'participants',
        where: { event: { equals: eventId } },
        limit: 0,
      });
      if (totalDocs >= event.capacity) {
        return {
          status: 'error',
          message: 'Leider sind keine Plätze mehr verfügbar. Bitte wende dich direkt an uns.',
        };
      }
    }

    // Check for duplicate
    const { docs: existing } = await payload.find({
      collection: 'participants',
      where: {
        and: [
          { email: { equals: email } },
          { event: { equals: eventId } },
        ],
      },
      limit: 1,
    });
    if (existing.length > 0) {
      return {
        status: 'error',
        message: 'Du bist bereits für dieses Event angemeldet.',
      };
    }

    // Create participant
    await payload.create({
      collection: 'participants',
      data: {
        firstName,
        lastName,
        email,
        company: company || undefined,
        message: message || undefined,
        event: eventId,
      },
    });

    // Send confirmation email via Resend
    if (process.env.RESEND_API_KEY) {
      try {
        const { Resend } = await import('resend');
        const { EventConfirmationEmail } = await import('@/emails/EventConfirmation');
        const { createElement } = await import('react');

        const resend = new Resend(process.env.RESEND_API_KEY);
        await resend.emails.send({
          from: process.env.EMAIL_FROM || 'PPT-Events <noreply@ppt-events.de>',
          to: email,
          subject: `Anmeldebestätigung: ${event.title}`,
          react: createElement(EventConfirmationEmail, {
            firstName,
            eventTitle: event.title as string,
            eventDate: new Date(event.startDate as string).toLocaleDateString('de-DE', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            }),
            eventTime: new Date(event.startDate as string).toLocaleTimeString('de-DE', {
              hour: '2-digit',
              minute: '2-digit',
            }),
            eventLocation: event.location as string,
            eventType: (event.eventType as 'online' | 'in-person') || 'in-person',
            onlineLink: (event.onlineLink as string | undefined) || undefined,
          }),
        });
      } catch (emailErr) {
        console.error('Email error (non-fatal):', emailErr);
        // Non-fatal — registration still succeeded
      }
    }

    return {
      status: 'success',
      message: `Super, ${firstName}! Deine Anmeldung war erfolgreich. Wir haben dir eine Bestätigungs-E-Mail geschickt.`,
    };
  } catch (err) {
    console.error('Registration error:', err);
    return {
      status: 'error',
      message: 'Es ist ein Fehler aufgetreten. Bitte versuche es später erneut.',
    };
  }
}
