'use server';

import { z } from 'zod';
import { getPayload } from 'payload';
import configPromise from '@payload-config';

const schema = z.object({
  name: z.string().min(2, 'Bitte gib deinen Namen ein.').max(120),
  email: z.string().email('Bitte gib eine gültige E-Mail-Adresse ein.').max(254),
  message: z.string().min(5, 'Bitte schreibe eine kurze Nachricht.').max(4000),
});

export type ContactState =
  | { status: 'idle' }
  | { status: 'success'; message: string }
  | { status: 'error'; message: string };

const GENERIC_SUCCESS = 'Danke! Wir melden uns so schnell wie möglich bei dir.';

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const honeypot = formData.get('website');
  if (typeof honeypot === 'string' && honeypot.length > 0) {
    return { status: 'success', message: GENERIC_SUCCESS };
  }

  const parsed = schema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  });

  if (!parsed.success) {
    return {
      status: 'error',
      message: parsed.error.issues[0]?.message ?? 'Bitte prüfe deine Eingaben.',
    };
  }

  try {
    const payload = await getPayload({ config: configPromise });
    await payload.create({
      collection: 'contact-messages',
      data: {
        name: parsed.data.name.trim(),
        email: parsed.data.email.trim().toLowerCase(),
        message: parsed.data.message.trim(),
      },
    });

    return { status: 'success', message: GENERIC_SUCCESS };
  } catch (err) {
    console.error('Contact submit error:', err);
    return {
      status: 'error',
      message: 'Es ist ein Fehler aufgetreten. Bitte versuche es später erneut.',
    };
  }
}
