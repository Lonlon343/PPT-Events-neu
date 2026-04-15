'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export function EventEmptyState({ onReset }: { onReset: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border border-black/5 bg-white px-8 py-16 text-center shadow-sm"
    >
      <h3 className="text-2xl font-extrabold text-ppt-blue">Keine Events gefunden</h3>
      <p className="mt-3 text-sm text-zinc-500">
        Aktuell gibt es keine Veranstaltungen, die diesen Kriterien entsprechen.
      </p>
      <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <button
          type="button"
          onClick={onReset}
          className="rounded-full bg-ppt-pink px-6 py-3 text-sm font-bold uppercase tracking-wide text-white"
        >
          Filter zurücksetzen
        </button>
        <Link
          href="/kontakt"
          className="rounded-full border border-ppt-blue px-6 py-3 text-sm font-bold uppercase tracking-wide text-ppt-blue"
        >
          Kontakt aufnehmen
        </Link>
      </div>
    </motion.div>
  );
}
