'use client';

import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type NavTarget = { slug: string; title: string } | null;

type EventNavArrowsProps = {
  prev: NavTarget;
  next: NavTarget;
};

export function EventNavArrows({ prev, next }: EventNavArrowsProps) {
  return (
    <div className="flex items-center justify-between gap-3">
      {prev ? (
        <Link
          href={`/veranstaltungen/${prev.slug}`}
          className="group flex max-w-[45%] items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wide text-ppt-blue transition hover:border-ppt-pink/40 hover:text-ppt-pink"
        >
          <ChevronLeft size={16} className="shrink-0" />
          <span className="truncate">{prev.title}</span>
        </Link>
      ) : (
        <span className="invisible flex max-w-[45%] items-center gap-2 rounded-full px-4 py-2 text-xs">.</span>
      )}

      <Link
        href="/veranstaltungen"
        className="hidden text-xs font-semibold uppercase tracking-widest text-ppt-blue/60 hover:text-ppt-pink sm:inline"
      >
        Alle Events
      </Link>

      {next ? (
        <Link
          href={`/veranstaltungen/${next.slug}`}
          className="group flex max-w-[45%] items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wide text-ppt-blue transition hover:border-ppt-pink/40 hover:text-ppt-pink"
        >
          <span className="truncate">{next.title}</span>
          <ChevronRight size={16} className="shrink-0" />
        </Link>
      ) : (
        <span className="invisible flex max-w-[45%] items-center gap-2 rounded-full px-4 py-2 text-xs">.</span>
      )}
    </div>
  );
}
