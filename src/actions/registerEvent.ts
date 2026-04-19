'use server';

import { z } from 'zod';
import { getPayload } from 'payload';
import configPromise from '@payload-config';

const registrationSchema = z.object({
  firstName: z.string().min(2, 'Bitte gib deinen Vornamen ein.').max(100),
  lastName: z.string().min(2, 'Bitte gib deinen Nachnamen ein.').max(100),
  email: z.string().email('Bitte gib eine gültige E-Mail-Adresse ein.').max(254),
  company: z.string().max(200).optional(),
  message: z.string().max(2000).optional(),
  eventId: z.string().min(1).max(20),
});

const SUCCESS_MESSAGE = (firstName: string) =>
  `Super, ${firstName}! Deine Anmeldung wurde verarbeitet. Du erhältst in Kürze eine Bestätigung per E-Mail.`;

export type RegistrationState =
  | { status: 'idle' }
  | { status: 'success'; message: string }
  | { status: 'error'; message: string; fieldErrors?: Record<string, string[]> };

export async function registerForEvent(
  _prevState: RegistrationState,
  formData: FormData,
): Promise<RegistrationState> {
  const honeypot = formData.get('website');
  if (typeof honeypot === 'string' && honeypot.length > 0) {
    // Bots fill hidden fields. Pretend success, don't store.
    return {
      status: 'success',
      message: SUCCESS_MESSAGE(((formData.get('firstName') as string) || '').trim() || 'Hallo'),
    };
  }

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
  const eventIdNum = Number(eventId);

  try {
    const payload = await getPayload({ config: configPromise });

    // Check capacity
    const event = await payload.findByID({ collection: 'events', id: eventIdNum });
    if (!event) {
      return { status: 'error', message: 'Event nicht gefunden.' };
    }

    if (event.capacity) {
      const { totalDocs } = await payload.find({
        collection: 'participants',
        where: { event: { equals: eventIdNum } },
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
          { event: { equals: eventIdNum } },
        ],
      },
      limit: 1,
    });
    if (existing.length > 0) {
      // Same response on duplicate to avoid email enumeration.
      // The first registration already sent a confirmation email.
      return { status: 'success', message: SUCCESS_MESSAGE(firstName) };
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
        event: eventIdNum,
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
          to: process.env.EMAIL_TEST_OVERRIDE || email,
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

    return { status: 'success', message: SUCCESS_MESSAGE(firstName) };
  } catch (err) {
    console.error('Registration error:', err);
    return {
      status: 'error',
      message: 'Es ist ein Fehler aufgetreten. Bitte versuche es später erneut.',
    };
  }
}
