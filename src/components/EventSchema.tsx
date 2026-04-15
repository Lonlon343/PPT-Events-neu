import React from 'react';

type EventSchemaProps = {
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  image?: string;
  location?: string;
  url: string;
};

export function EventSchema({
  title,
  description,
  startDate,
  endDate,
  image,
  location,
  url,
}: EventSchemaProps) {
  const payload = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: title,
    description,
    startDate,
    endDate,
    image: image ? [image] : undefined,
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    location: location
      ? {
          '@type': 'Place',
          name: location,
        }
      : undefined,
    organizer: {
      '@type': 'Organization',
      name: 'PPT-Events',
      url: 'https://ppt-events.de',
    },
    url,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}
