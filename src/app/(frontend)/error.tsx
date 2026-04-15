'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#FBFCFC] px-6">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-ppt-pink/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl">⚠️</span>
        </div>
        <h1 className="text-3xl font-extrabold text-ppt-blue mb-4">Etwas ist schiefgelaufen</h1>
        <p className="text-zinc-500 mb-8">
          Ein unerwarteter Fehler ist aufgetreten. Bitte versuche es erneut oder kontaktiere uns.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={reset}
            className="bg-ppt-pink text-white font-bold py-3 px-6 rounded-full hover:bg-ppt-pink/90 transition-transform hover:scale-105"
          >
            Erneut versuchen
          </button>
          <Link
            href="/"
            className="border border-ppt-blue text-ppt-blue font-bold py-3 px-6 rounded-full hover:bg-ppt-blue/5 transition-colors"
          >
            Zur Startseite
          </Link>
        </div>
      </div>
    </main>
  );
}
