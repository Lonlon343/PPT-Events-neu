import type { EventType } from '@/components/EventList';

export type PayloadEvent = {
  id: string | number;
  title: string;
  slug: string;
  startDate: string;
  endDate: string;
  location?: string;
  speaker?: string;
  updatedAt?: string;
  image?: {
    url?: string;
  } | null;
  description?: unknown;
  eventStatus?: 'upcoming' | 'past';
};

const FALLBACK_IMAGE =
  'https://ppt-events.de/wp-content/uploads/2022/08/AdobeStock_249512191-scaled.jpeg';

export function mapPayloadEventToCard(ev: PayloadEvent): EventType {
  const start = new Date(ev.startDate);
  const end = new Date(ev.endDate);
  const time =
    start.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }) +
    ' - ' +
    end.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });

  return {
    id: ev.id,
    title: ev.title,
    slug: ev.slug,
    startDate: ev.startDate,
    endDate: ev.endDate,
    location: ev.location ?? '',
    speaker: ev.speaker,
    time,
    day: start.getDate().toString(),
    month: start.toLocaleString('de-DE', { month: 'short' }).toUpperCase(),
    dateFull: start.toLocaleDateString('de-DE', { day: 'numeric', month: 'long' }),
    image: ev.image?.url || FALLBACK_IMAGE,
    eventStatus: ev.eventStatus,
  };
}

export function groupEventsByMonth(events: EventType[]) {
  const groups = new Map<string, EventType[]>();

  const sorted = [...events].sort(
    (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
  );

  for (const event of sorted) {
    const date = new Date(event.startDate);
    const monthKey = date.toLocaleString('de-DE', { month: 'long', year: 'numeric' });
    const current = groups.get(monthKey) ?? [];
    current.push(event);
    groups.set(monthKey, current);
  }

  return Array.from(groups.entries()).map(([month, items]) => ({ month, items }));
}

export function groupEventsByDay(events: EventType[]) {
  const groups = new Map<string, EventType[]>();

  const sorted = [...events].sort(
    (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
  );

  for (const event of sorted) {
    const date = new Date(event.startDate);
    const key = date.toLocaleDateString('de-DE', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    const current = groups.get(key) ?? [];
    current.push(event);
    groups.set(key, current);
  }

  return Array.from(groups.entries()).map(([day, items]) => ({ day, items }));
}
