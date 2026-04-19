'use server';

import { z } from 'zod';
import { getPayload } from 'payload';
import configPromise from '@payload-config';

const schema = z.object({
  email: z.string().email('Bitte gib eine gültige E-Mail-Adresse ein.'),
});

export type SubscribeState =
  | { status: 'idle' }
  | { status: 'success'; message: string }
  | { status: 'error'; message: string };

export async function subscribeNewsletter(
  _prevState: SubscribeState,
  formData: FormData,
): Promise<SubscribeState> {
  const parsed = schema.safeParse({ email: formData.get('email') });
  if (!parsed.success) {
    return {
      status: 'error',
      message: parsed.error.issues[0]?.message ?? 'Ungültige Eingabe.',
    };
  }

  const email = parsed.data.email.trim().toLowerCase();

  try {
    const payload = await getPayload({ config: configPromise });

    const { docs: existing } = await payload.find({
      collection: 'subscribers',
      where: { email: { equals: email } },
      limit: 1,
    });

    if (existing.length > 0) {
      return {
        status: 'success',
        message: 'Du bist bereits eingetragen — danke!',
      };
    }

    await payload.create({
      collection: 'subscribers',
      data: {
        email,
        status: 'active',
        source: 'website-newsletter',
      },
    });

    return {
      status: 'success',
      message: 'Danke! Du erhältst zukünftig unsere Updates.',
    };
  } catch (err) {
    console.error('Newsletter subscribe error:', err);
    return {
      status: 'error',
      message: 'Es ist ein Fehler aufgetreten. Bitte versuche es später erneut.',
    };
  }
}
