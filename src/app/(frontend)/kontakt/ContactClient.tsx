'use client';

import { useState } from 'react';

export function ContactClient() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <form
      className="rounded-3xl border border-black/5 bg-white p-8 shadow-sm space-y-5"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
    >
      {submitted ? (
        <div className="rounded-2xl bg-ppt-blue/5 px-4 py-6 text-center text-sm text-ppt-blue">
          Danke! Wir melden uns so schnell wie möglich bei dir.
        </div>
      ) : (
        <>
          <div>
            <label className="text-xs font-bold uppercase tracking-wide text-ppt-blue">
              Name
            </label>
            <input
              name="name"
              required
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
              placeholder="Wie können wir helfen?"
              className="mt-2 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm focus:border-ppt-pink focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-full bg-ppt-pink px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-ppt-pink/90"
          >
            Nachricht senden
          </button>
        </>
      )}
    </form>
  );
}
