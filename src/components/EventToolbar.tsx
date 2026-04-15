'use client';

import { motion } from 'framer-motion';
import { CalendarDays, Filter, Grid2x2, List, RotateCcw } from 'lucide-react';
import Link from 'next/link';

type EventToolbarProps = {
  dateRangeLabel: string;
  icalUrl: string;
  view: 'list' | 'grid';
  onToggleView: () => void;
  filtersOpen: boolean;
  onToggleFilters: () => void;
  onReset: () => void;
};

export function EventToolbar({
  dateRangeLabel,
  icalUrl,
  view,
  onToggleView,
  filtersOpen,
  onToggleFilters,
  onReset,
}: EventToolbarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-4 rounded-2xl border border-black/5 bg-white px-6 py-5 shadow-sm"
    >
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3 text-ppt-blue">
          <CalendarDays size={20} className="text-ppt-pink" />
          <p className="text-sm font-semibold">{dateRangeLabel}</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href={icalUrl}
            className="rounded-full border border-ppt-blue/20 bg-ppt-blue/5 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-ppt-blue transition hover:border-ppt-pink/40 hover:text-ppt-pink"
          >
            Kalender abonnieren
          </Link>

          <button
            type="button"
            onClick={onToggleView}
            className="flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wide text-ppt-blue transition hover:border-ppt-pink/40 hover:text-ppt-pink"
          >
            {view === 'list' ? <Grid2x2 size={16} /> : <List size={16} />}
            {view === 'list' ? 'Grid' : 'Liste'}
          </button>

          <button
            type="button"
            onClick={onToggleFilters}
            className="flex items-center gap-2 rounded-full bg-ppt-blue px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-ppt-blue/90"
          >
            <Filter size={16} />
            {filtersOpen ? 'Filter ausblenden' : 'Filter anzeigen'}
          </button>

          <button
            type="button"
            onClick={onReset}
            className="flex items-center gap-2 rounded-full border border-transparent bg-ppt-pink/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-ppt-pink transition hover:bg-ppt-pink/20"
          >
            <RotateCcw size={16} />
            Reset
          </button>
        </div>
      </div>
    </motion.div>
  );
}
