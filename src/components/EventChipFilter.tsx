'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';

type EventChipFilterProps = {
  label: string;
  options: string[];
  selected: string[];
  onToggle: (value: string) => void;
  onClear: () => void;
};

export function EventChipFilter({
  label,
  options,
  selected,
  onToggle,
  onClear,
}: EventChipFilterProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const count = selected.length;

  return (
    <div ref={ref} className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className={`flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold transition ${
          count > 0
            ? 'border-ppt-pink/50 bg-ppt-pink/10 text-ppt-pink'
            : 'border-black/10 bg-white text-ppt-blue hover:border-ppt-blue/30'
        }`}
      >
        <span>{label}</span>
        {count > 0 && (
          <span className="rounded-full bg-ppt-pink px-2 py-0.5 text-[10px] text-white">
            {count}
          </span>
        )}
        <ChevronDown size={14} className={open ? 'rotate-180 transition' : 'transition'} />
      </button>

      {open && (
        <div className="absolute left-0 top-full z-30 mt-2 w-64 rounded-2xl border border-black/10 bg-white p-3 shadow-xl">
          {options.length === 0 ? (
            <p className="px-3 py-4 text-xs text-zinc-400">Keine Optionen verfügbar.</p>
          ) : (
            <>
              <div className="max-h-72 space-y-1 overflow-y-auto">
                {options.map((opt) => {
                  const checked = selected.includes(opt);
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => onToggle(opt)}
                      className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition ${
                        checked ? 'bg-ppt-pink/10 text-ppt-pink' : 'hover:bg-zinc-50 text-ppt-blue'
                      }`}
                    >
                      <span className="truncate">{opt}</span>
                      <span
                        className={`ml-2 flex h-4 w-4 items-center justify-center rounded-full border ${
                          checked
                            ? 'border-ppt-pink bg-ppt-pink text-white'
                            : 'border-black/15 text-transparent'
                        }`}
                      >
                        <Check size={10} />
                      </span>
                    </button>
                  );
                })}
              </div>
              {count > 0 && (
                <button
                  type="button"
                  onClick={onClear}
                  className="mt-2 w-full rounded-lg border border-black/10 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-ppt-blue hover:border-ppt-pink/40 hover:text-ppt-pink"
                >
                  Zurücksetzen
                </button>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
