'use client';

import { motion } from 'framer-motion';
import { Search, SlidersHorizontal } from 'lucide-react';

export type EventView = 'list' | 'month' | 'day';

type EventToolbarProps = {
  search: string;
  onSearchChange: (value: string) => void;
  onSubmitSearch: () => void;
  filtersVisible: boolean;
  onToggleFilters: () => void;
  view: EventView;
  onChangeView: (view: EventView) => void;
};

const VIEW_TABS: { key: EventView; label: string }[] = [
  { key: 'list', label: 'Liste' },
  { key: 'month', label: 'Monat' },
  { key: 'day', label: 'Tag' },
];

export function EventToolbar({
  search,
  onSearchChange,
  onSubmitSearch,
  filtersVisible,
  onToggleFilters,
  view,
  onChangeView,
}: EventToolbarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-black/5 bg-white p-3 shadow-sm sm:p-4"
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmitSearch();
        }}
        className="flex flex-col gap-3 lg:flex-row lg:items-center"
      >
        <div className="flex flex-1 items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2.5">
          <Search size={16} className="text-zinc-400" />
          <input
            type="search"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Suche nach Veranstaltungen"
            className="w-full bg-transparent text-sm text-ppt-blue placeholder:text-zinc-400 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="rounded-full bg-ppt-pink px-5 py-2.5 text-xs font-bold uppercase tracking-wide text-white transition hover:opacity-90"
        >
          Suche Veranstaltungen
        </button>

        <div className="flex flex-wrap items-center gap-3 lg:gap-4">
          <button
            type="button"
            onClick={onToggleFilters}
            className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-ppt-blue transition hover:text-ppt-pink"
          >
            <SlidersHorizontal size={14} />
            {filtersVisible ? 'Hide Filters' : 'Show Filters'}
          </button>

          <div className="flex items-center gap-1">
            {VIEW_TABS.map((tab) => {
              const active = view === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => onChangeView(tab.key)}
                  className={`relative px-3 py-1.5 text-xs font-semibold uppercase tracking-wide transition ${
                    active ? 'text-ppt-blue' : 'text-zinc-400 hover:text-ppt-blue'
                  }`}
                >
                  {tab.label}
                  {active && (
                    <span className="absolute inset-x-2 -bottom-0.5 h-0.5 rounded bg-ppt-blue" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </form>
    </motion.div>
  );
}
