'use client';

import { useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { EventToolbar, type EventView } from '@/components/EventToolbar';
import { EventChipFilter } from '@/components/EventChipFilter';
import { EventMonthGroup } from '@/components/EventMonthGroup';
import { EventEmptyState } from '@/components/EventEmptyState';
import type { EventType } from '@/components/EventList';
import { EventCardCompact } from '@/components/EventCardCompact';
import { RegistrationModal } from '@/components/RegistrationModal';
import { groupEventsByMonth, groupEventsByDay } from '@/lib/events';

type EventsListingClientProps = {
  events: EventType[];
  locations: string[];
  speakers: string[];
};

function updateQueryParam(params: URLSearchParams, key: string, values: string[]) {
  params.delete(key);
  values.forEach((value) => params.append(key, value));
}

export function EventsListingClient({
  events,
  locations,
  speakers,
}: EventsListingClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialLocations = searchParams.getAll('location');
  const initialSpeakers = searchParams.getAll('speaker');
  const initialQuery = searchParams.get('q') ?? '';

  const [search, setSearch] = useState(initialQuery);
  const [appliedSearch, setAppliedSearch] = useState(initialQuery);
  const [selectedLocations, setSelectedLocations] = useState<string[]>(initialLocations);
  const [selectedSpeakers, setSelectedSpeakers] = useState<string[]>(initialSpeakers);
  const [filtersVisible, setFiltersVisible] = useState(true);
  const [view, setView] = useState<EventView>('month');
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);

  const filtered = useMemo(() => {
    const q = appliedSearch.trim().toLowerCase();
    return events.filter((event) => {
      const matchesQuery =
        !q ||
        event.title.toLowerCase().includes(q) ||
        (event.location ?? '').toLowerCase().includes(q) ||
        (event.speaker ?? '').toLowerCase().includes(q);
      const matchesLocation =
        selectedLocations.length === 0 || selectedLocations.includes(event.location);
      const matchesSpeaker =
        selectedSpeakers.length === 0 ||
        (event.speaker ? selectedSpeakers.includes(event.speaker) : false);
      return matchesQuery && matchesLocation && matchesSpeaker;
    });
  }, [events, appliedSearch, selectedLocations, selectedSpeakers]);

  const monthGroups = useMemo(() => groupEventsByMonth(filtered), [filtered]);
  const dayGroups = useMemo(() => groupEventsByDay(filtered), [filtered]);

  const syncUrl = (params: {
    locations?: string[];
    speakers?: string[];
    q?: string;
  }) => {
    const next = new URLSearchParams(searchParams.toString());
    if (params.locations !== undefined) updateQueryParam(next, 'location', params.locations);
    if (params.speakers !== undefined) updateQueryParam(next, 'speaker', params.speakers);
    if (params.q !== undefined) {
      next.delete('q');
      if (params.q) next.set('q', params.q);
    }
    const qs = next.toString();
    router.replace(`/veranstaltungen${qs ? `?${qs}` : ''}`);
  };

  const toggleLocation = (value: string) => {
    const next = selectedLocations.includes(value)
      ? selectedLocations.filter((loc) => loc !== value)
      : [...selectedLocations, value];
    setSelectedLocations(next);
    syncUrl({ locations: next });
  };

  const toggleSpeaker = (value: string) => {
    const next = selectedSpeakers.includes(value)
      ? selectedSpeakers.filter((sp) => sp !== value)
      : [...selectedSpeakers, value];
    setSelectedSpeakers(next);
    syncUrl({ speakers: next });
  };

  const clearLocations = () => {
    setSelectedLocations([]);
    syncUrl({ locations: [] });
  };

  const clearSpeakers = () => {
    setSelectedSpeakers([]);
    syncUrl({ speakers: [] });
  };

  const submitSearch = () => {
    setAppliedSearch(search);
    syncUrl({ q: search });
  };

  const registerForEvent = (event: EventType) => {
    setSelectedEvent(event);
  };

  const hasActiveFilters =
    selectedLocations.length > 0 || selectedSpeakers.length > 0 || appliedSearch.length > 0;

  const resetAll = () => {
    setSearch('');
    setAppliedSearch('');
    setSelectedLocations([]);
    setSelectedSpeakers([]);
    router.replace('/veranstaltungen');
  };

  return (
    <div className="space-y-6">
      <EventToolbar
        search={search}
        onSearchChange={setSearch}
        onSubmitSearch={submitSearch}
        filtersVisible={filtersVisible}
        onToggleFilters={() => setFiltersVisible((v) => !v)}
        view={view}
        onChangeView={setView}
      />

      {filtersVisible && (
        <div className="flex flex-wrap items-center gap-2">
          <EventChipFilter
            label="Veranstaltungsorte"
            options={locations}
            selected={selectedLocations}
            onToggle={toggleLocation}
            onClear={clearLocations}
          />
          <EventChipFilter
            label="Referenten"
            options={speakers}
            selected={selectedSpeakers}
            onToggle={toggleSpeaker}
            onClear={clearSpeakers}
          />
          {hasActiveFilters && (
            <button
              type="button"
              onClick={resetAll}
              className="ml-1 text-xs font-semibold uppercase tracking-wide text-ppt-pink hover:opacity-80"
            >
              Alle zurücksetzen
            </button>
          )}
        </div>
      )}

      <div className="space-y-10">
        {filtered.length === 0 ? (
          <EventEmptyState />
        ) : view === 'list' ? (
          <div className="space-y-4">
            {filtered.map((event, index) => (
              <EventCardCompact
                key={event.id}
                event={event}
                index={index}
                onRegister={registerForEvent}
              />
            ))}
          </div>
        ) : view === 'month' ? (
          monthGroups.map((group) => (
            <EventMonthGroup
              key={group.month}
              month={group.month}
              events={group.items}
              onRegister={registerForEvent}
            />
          ))
        ) : (
          dayGroups.map((group) => (
            <EventMonthGroup
              key={group.day}
              month={group.day}
              events={group.items}
              onRegister={registerForEvent}
            />
          ))
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
