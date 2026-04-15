'use client';

import { useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { EventToolbar } from '@/components/EventToolbar';
import { EventFilters } from '@/components/EventFilters';
import { EventMonthGroup } from '@/components/EventMonthGroup';
import { EventEmptyState } from '@/components/EventEmptyState';
import type { EventType } from '@/components/EventList';
import { EventCardCompact } from '@/components/EventCardCompact';
import { RegistrationModal } from '@/components/RegistrationModal';
import { groupEventsByMonth } from '@/lib/events';

type EventsListingClientProps = {
  events: EventType[];
  locations: string[];
  speakers: string[];
  dateRangeLabel: string;
};

function updateQueryParam(params: URLSearchParams, key: string, values: string[]) {
  params.delete(key);
  values.forEach((value) => params.append(key, value));
}

export function EventsListingClient({
  events,
  locations,
  speakers,
  dateRangeLabel,
}: EventsListingClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialLocations = searchParams.getAll('location');
  const initialSpeakers = searchParams.getAll('speaker');

  const [selectedLocations, setSelectedLocations] = useState<string[]>(initialLocations);
  const [selectedSpeakers, setSelectedSpeakers] = useState<string[]>(initialSpeakers);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [view, setView] = useState<'list' | 'grid'>('list');
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const locationMatch =
        selectedLocations.length === 0 || selectedLocations.includes(event.location);
      const speakerMatch =
        selectedSpeakers.length === 0 ||
        (event.speaker ? selectedSpeakers.includes(event.speaker) : false);
      return locationMatch && speakerMatch;
    });
  }, [events, selectedLocations, selectedSpeakers]);

  const grouped = useMemo(() => groupEventsByMonth(filteredEvents), [filteredEvents]);

  const syncUrl = (nextLocations: string[], nextSpeakers: string[]) => {
    const params = new URLSearchParams(searchParams.toString());
    updateQueryParam(params, 'location', nextLocations);
    updateQueryParam(params, 'speaker', nextSpeakers);
    const next = params.toString();
    router.replace(`/veranstaltungen${next ? `?${next}` : ''}`);
  };

  const toggleLocation = (value: string) => {
    const next = selectedLocations.includes(value)
      ? selectedLocations.filter((loc) => loc !== value)
      : [...selectedLocations, value];
    setSelectedLocations(next);
    syncUrl(next, selectedSpeakers);
  };

  const toggleSpeaker = (value: string) => {
    const next = selectedSpeakers.includes(value)
      ? selectedSpeakers.filter((sp) => sp !== value)
      : [...selectedSpeakers, value];
    setSelectedSpeakers(next);
    syncUrl(selectedLocations, next);
  };

  const resetFilters = () => {
    setSelectedLocations([]);
    setSelectedSpeakers([]);
    router.replace('/veranstaltungen');
  };

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
        filtersOpen={filtersOpen}
        onToggleFilters={() => setFiltersOpen((prev) => !prev)}
        onReset={resetFilters}
      />

      <div className="grid gap-8 lg:grid-cols-[280px,1fr]">
        {filtersOpen ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 lg:static lg:z-auto lg:block lg:bg-transparent">
            <div className="w-full max-w-sm lg:sticky lg:top-28 lg:max-w-none lg:self-start">
              <EventFilters
                locations={locations}
                speakers={speakers}
                selectedLocations={selectedLocations}
                selectedSpeakers={selectedSpeakers}
                onToggleLocation={toggleLocation}
                onToggleSpeaker={toggleSpeaker}
                onClearLocations={() => {
                  setSelectedLocations([]);
                  syncUrl([], selectedSpeakers);
                }}
                onClearSpeakers={() => {
                  setSelectedSpeakers([]);
                  syncUrl(selectedLocations, []);
                }}
                onDone={() => setFiltersOpen(false)}
              />
            </div>
          </div>
        ) : (
          <div className="hidden lg:block lg:sticky lg:top-28 lg:self-start">
            <EventFilters
              locations={locations}
              speakers={speakers}
              selectedLocations={selectedLocations}
              selectedSpeakers={selectedSpeakers}
              onToggleLocation={toggleLocation}
              onToggleSpeaker={toggleSpeaker}
              onClearLocations={() => {
                setSelectedLocations([]);
                syncUrl([], selectedSpeakers);
              }}
              onClearSpeakers={() => {
                setSelectedSpeakers([]);
                syncUrl(selectedLocations, []);
              }}
            />
          </div>
        )}

        <div className="space-y-10">
          {filteredEvents.length === 0 ? (
            <EventEmptyState onReset={resetFilters} />
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
              {filteredEvents.map((event, index) => (
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
