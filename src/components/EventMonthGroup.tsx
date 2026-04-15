'use client';

import { motion } from 'framer-motion';
import type { EventType } from '@/components/EventList';
import { EventCardCompact } from '@/components/EventCardCompact';

type EventMonthGroupProps = {
  month: string;
  events: EventType[];
  onRegister: (event: EventType) => void;
};

export function EventMonthGroup({ month, events, onRegister }: EventMonthGroupProps) {
  return (
    <div className="space-y-6">
      {month && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3"
        >
          <span className="h-2 w-2 rounded-full bg-ppt-pink" />
          <h3 className="text-xl font-extrabold uppercase tracking-widest text-ppt-blue">
            {month}
          </h3>
        </motion.div>
      )}

      <div className="space-y-4">
        {events.map((event, index) => (
          <EventCardCompact
            key={event.id}
            event={event}
            index={index}
            onRegister={onRegister}
          />
        ))}
      </div>
    </div>
  );
}
