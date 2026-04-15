'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import type { EventType } from '@/components/EventList';

type EventCardCompactProps = {
  event: EventType;
  index: number;
  onRegister: (event: EventType) => void;
};

export function EventCardCompact({ event, index, onRegister }: EventCardCompactProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group"
    >
      <div className="hidden lg:flex items-stretch overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-ppt-pink/40 hover:shadow-xl">
        <div className="flex w-24 flex-col items-center justify-center border-r border-black/5 bg-zinc-100 p-4 text-center transition-colors group-hover:bg-ppt-pink/5">
          <span className="text-xs font-bold uppercase tracking-widest text-ppt-pink">{event.month}</span>
          <span className="text-3xl font-extrabold text-ppt-blue">{event.day}</span>
        </div>

        <div className="relative hidden w-44 shrink-0 lg:block">
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            unoptimized={event.image.startsWith('http')}
          />
        </div>

        <div className="flex flex-1 flex-col justify-center px-6 py-5">
          <Link href={`/veranstaltungen/${event.slug}`} className="space-y-1">
            <h4 className="text-lg font-bold text-ppt-blue transition-colors group-hover:text-ppt-pink">
              {event.title}
            </h4>
            <p className="text-sm font-medium text-zinc-500">
              {event.dateFull} · {event.time}
            </p>
            {event.location && (
              <p className="text-xs text-zinc-400">📍 {event.location}</p>
            )}
          </Link>
        </div>

        <div className="flex items-center justify-center border-l border-black/5 px-6">
          <button
            onClick={() => onRegister(event)}
            className="rounded-full bg-ppt-pink px-5 py-2 text-xs font-bold uppercase tracking-wide text-white transition-transform hover:scale-105"
          >
            Jetzt anmelden
          </button>
        </div>
      </div>

      <div className="flex flex-col overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition lg:hidden">
        <div className="flex border-b border-black/5">
          <div className="flex w-20 flex-col items-center justify-center bg-zinc-100 py-4">
            <span className="text-xs font-bold uppercase tracking-widest text-ppt-pink">{event.month}</span>
            <span className="text-2xl font-extrabold text-ppt-blue">{event.day}</span>
          </div>
          <Link href={`/veranstaltungen/${event.slug}`} className="flex-1 px-4 py-4">
            <h4 className="text-base font-bold text-ppt-blue">{event.title}</h4>
            {event.location && <p className="text-xs text-zinc-400">📍 {event.location}</p>}
          </Link>
        </div>
        <div className="flex items-center justify-between bg-zinc-50 px-4 py-3">
          <p className="text-xs font-medium text-zinc-500">{event.dateFull} · {event.time}</p>
          <button
            onClick={() => onRegister(event)}
            className="rounded-full bg-ppt-pink px-4 py-2 text-xs font-bold uppercase tracking-wide text-white"
          >
            Anmelden
          </button>
        </div>
      </div>
    </motion.article>
  );
}
