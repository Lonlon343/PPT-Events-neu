'use client';

import React from 'react';
import { EventDetails } from '@/components/EventDetails';
import { RegistrationModal } from '@/components/RegistrationModal';
import type { EventType } from '@/components/EventList';

export function EventDetailClient({ event }: { event: EventType }) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <EventDetails
        title={event.title}
        image={event.image}
        dateLabel={event.dateFull}
        timeLabel={event.time}
        location={event.location}
        speaker={event.speaker}
        onRegister={() => setOpen(true)}
      />
      {open && (
        <RegistrationModal
          isOpen={open}
          onClose={() => setOpen(false)}
          event={{
            id: String(event.id),
            title: event.title,
            dateFull: event.dateFull,
            time: event.time,
            location: event.location,
          }}
        />
      )}
    </>
  );
}
