'use client';

import { useActionState } from 'react';
import { submitContact, type ContactState } from '@/actions/submitContact';

const initialState: ContactState = { status: 'idle' };

export function ContactClient() {
  const [state, action, isPending] = useActionState(submitContact, initialState);

  if (state.status === 'success') {
    return (
      <div className="rounded-3xl border border-black/5 bg-white p-8 shadow-sm">
        <div className="rounded-2xl bg-ppt-blue/5 px-4 py-6 text-center text-sm text-ppt-blue">
          {state.message}
        </div>
      </div>
    );
  }

  return (
    <form
      action={action}
      className="rounded-3xl border border-black/5 bg-white p-8 shadow-sm space-y-5"
    >
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
      />

      <div>
        <label className="text-xs font-bold uppercase tracking-wide text-ppt-blue">
          Name
        </label>
        <input
          name="name"
          required
          maxLength={120}
          placeholder="Dein Name"
          className="mt-2 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm focus:border-ppt-pink focus:outline-none"
        />
      </div>
      <div>
        <label className="text-xs font-bold uppercase tracking-wide text-ppt-blue">
          E-Mail
        </label>
        <input
          type="email"
          name="email"
          required
          maxLength={254}
          placeholder="name@beispiel.de"
          className="mt-2 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm focus:border-ppt-pink focus:outline-none"
        />
      </div>
      <div>
        <label className="text-xs font-bold uppercase tracking-wide text-ppt-blue">
          Nachricht
        </label>
        <textarea
          name="message"
          rows={5}
          required
          maxLength={4000}
          placeholder="Wie können wir helfen?"
          className="mt-2 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm focus:border-ppt-pink focus:outline-none"
        />
      </div>

      {state.status === 'error' && (
        <p className="text-sm font-medium text-red-600">{state.message}</p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-full bg-ppt-pink px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-ppt-pink/90 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isPending ? 'Wird gesendet…' : 'Nachricht senden'}
      </button>
    </form>
  );
}
