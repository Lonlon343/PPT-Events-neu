'use client';

import { useMemo, useState } from 'react';
import { EventToolbar } from '@/components/EventToolbar';
import { EventMonthGroup } from '@/components/EventMonthGroup';
import { EventEmptyState } from '@/components/EventEmptyState';
import type { EventType } from '@/components/EventList';
import { EventCardCompact } from '@/components/EventCardCompact';
import { RegistrationModal } from '@/components/RegistrationModal';
import { groupEventsByMonth } from '@/lib/events';

type EventsListingClientProps = {
  events: EventType[];
  dateRangeLabel: string;
};

export function EventsListingClient({
  events,
  dateRangeLabel,
}: EventsListingClientProps) {
  const [view, setView] = useState<'list' | 'grid'>('list');
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);

  const grouped = useMemo(() => groupEventsByMonth(events), [events]);

  const registerForEvent = (event: EventType) => {
    setSelectedEvent(event);
  };

  return (
    <div className="space-y-8">
      <EventToolbar
        dateRangeLabel={dateRangeLabel}
        icalUrl="/api/ical"
        view={view}
        onToggleView={() => setView((prev) => (prev === 'list' ? 'grid' : 'list'))}
      />

      <div className="space-y-10">
        {events.length === 0 ? (
          <EventEmptyState />
        ) : view === 'list' ? (
          grouped.map((group) => (
            <EventMonthGroup
              key={group.month}
              month={group.month}
              events={group.items}
              onRegister={registerForEvent}
            />
          ))
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {events.map((event, index) => (
              <EventCardCompact
                key={event.id}
                event={event}
                index={index}
                onRegister={registerForEvent}
              />
            ))}
          </div>
        )}
      </div>

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
    </div>
  );
}
