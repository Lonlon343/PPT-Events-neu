'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

type EventFiltersProps = {
  locations: string[];
  speakers: string[];
  selectedLocations: string[];
  selectedSpeakers: string[];
  onToggleLocation: (value: string) => void;
  onToggleSpeaker: (value: string) => void;
  onClearLocations: () => void;
  onClearSpeakers: () => void;
  onDone?: () => void;
};

function CheckboxRow({
  label,
  checked,
  onClick,
}: {
  label: string;
  checked: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left text-sm font-medium transition ${
        checked
          ? 'border-ppt-pink/60 bg-ppt-pink/10 text-ppt-pink'
          : 'border-black/5 bg-white text-ppt-blue hover:border-ppt-blue/20'
      }`}
    >
      <span>{label}</span>
      <span
        className={`flex h-5 w-5 items-center justify-center rounded-full border text-xs ${
          checked
            ? 'border-ppt-pink bg-ppt-pink text-white'
            : 'border-black/10 text-transparent'
        }`}
      >
        <Check size={12} />
      </span>
    </button>
  );
}

export function EventFilters({
  locations,
  speakers,
  selectedLocations,
  selectedSpeakers,
  onToggleLocation,
  onToggleSpeaker,
  onClearLocations,
  onClearSpeakers,
  onDone,
}: EventFiltersProps) {
  return (
    <motion.aside
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex flex-col gap-6 rounded-2xl border border-black/5 bg-white p-6 shadow-sm"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-extrabold text-ppt-blue">Filter</h3>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold uppercase tracking-wide text-ppt-blue/70">
            Orte
          </p>
          {selectedLocations.length > 0 && (
            <button
              type="button"
              onClick={onClearLocations}
              className="text-xs font-semibold text-ppt-pink hover:text-ppt-pink/80"
            >
              Zurücksetzen
            </button>
          )}
        </div>
        <div className="space-y-3">
          {locations.length === 0 && (
            <p className="text-xs text-zinc-400">Noch keine Orte verfügbar.</p>
          )}
          {locations.map((loc) => (
            <CheckboxRow
              key={loc}
              label={loc}
              checked={selectedLocations.includes(loc)}
              onClick={() => onToggleLocation(loc)}
            />
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold uppercase tracking-wide text-ppt-blue/70">
            Speaker
          </p>
          {selectedSpeakers.length > 0 && (
            <button
              type="button"
              onClick={onClearSpeakers}
              className="text-xs font-semibold text-ppt-pink hover:text-ppt-pink/80"
            >
              Zurücksetzen
            </button>
          )}
        </div>
        <div className="space-y-3">
          {speakers.length === 0 && (
            <p className="text-xs text-zinc-400">Noch keine Speaker verfügbar.</p>
          )}
          {speakers.map((speaker) => (
            <CheckboxRow
              key={speaker}
              label={speaker}
              checked={selectedSpeakers.includes(speaker)}
              onClick={() => onToggleSpeaker(speaker)}
            />
          ))}
        </div>
      </div>

      {onDone && (
        <button
          type="button"
          onClick={onDone}
          className="mt-2 rounded-full bg-ppt-blue px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white lg:hidden"
        >
          Fertig
        </button>
      )}
    </motion.aside>
  );
}
