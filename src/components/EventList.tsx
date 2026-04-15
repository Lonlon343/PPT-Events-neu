'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { RegistrationModal } from '@/components/RegistrationModal';
import { EventMonthGroup } from '@/components/EventMonthGroup';
import { groupEventsByMonth } from '@/lib/events';

export interface EventType {
  id: number | string;
  title: string;
  slug: string;
  startDate: string;
  endDate: string;
  location: string;
  speaker?: string;
  time: string;
  day: string;
  month: string;
  dateFull: string;
  image: string;
  eventStatus?: 'upcoming' | 'past';
}

export function EventList({ events }: { events: EventType[] }) {
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);

  return (
    <>
      <section id="naechste-events" className="py-24 bg-[#FBFCFC] text-ppt-blue">
        <div className="container mx-auto px-6 lg:px-12 max-w-5xl">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-ppt-pink font-bold text-center uppercase tracking-widest text-sm md:text-base mb-2"
          >
            Veranstaltungen
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-center mb-16 max-w-3xl mx-auto leading-tight text-ppt-blue"
          >
            Unsere nächsten Events
          </motion.h2>

          <div className="flex flex-col gap-10">
            {groupEventsByMonth(events).map((group) => (
              <EventMonthGroup
                key={group.month}
                month={group.month}
                events={group.items}
                onRegister={(event) => setSelectedEvent(event)}
              />
            ))}
          </div>

          {/* Mehr Events button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <Link
              href="/veranstaltungen"
              className="inline-block bg-ppt-blue text-white hover:bg-ppt-blue/90 font-bold uppercase tracking-wider py-4 px-8 rounded-full transition-transform transform hover:scale-105"
            >
              Mehr Events entdecken
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Registration Modal */}
      {selectedEvent && (
        <RegistrationModal
          isOpen={!!selectedEvent}
          onClose={() => setSelectedEvent(null)}
          event={{
            id: String(selectedEvent.id),
            title: selectedEvent.title,
            dateFull: selectedEvent.dateFull,
            time: selectedEvent.time,
            location: selectedEvent.location,
          }}
        />
      )}
    </>
  );
}
