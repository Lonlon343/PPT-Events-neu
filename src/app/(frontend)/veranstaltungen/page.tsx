import type { Metadata } from "next";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import { mapPayloadEventToCard, type PayloadEvent } from "@/lib/events";
import { EventsListingClient } from "@/app/(frontend)/veranstaltungen/EventsListingClient";

export const dynamic = 'force-dynamic';

export default async function VeranstaltungenPage() {
  const payload = await getPayload({ config: configPromise });

  let eventsPayload: PayloadEvent[] = [];
  let locations: string[] = [];
  let speakers: string[] = [];

  try {
    const { docs } = await payload.find({
      collection: "events",
      where: {
        status: { equals: "published" },
        or: [
          { eventStatus: { equals: "upcoming" } },
          { eventStatus: { exists: false } },
        ],
      },
      sort: "startDate",
      limit: 200,
    });
    eventsPayload = docs as PayloadEvent[];

    locations = Array.from(
      new Set(eventsPayload.map((d) => d.location).filter(Boolean) as string[]),
    );
    speakers = Array.from(
      new Set(eventsPayload.map((d) => d.speaker).filter(Boolean) as string[]),
    );
  } catch (err) {
    console.error("Payload db error:", err);
  }

  const mappedEvents = eventsPayload.map(mapPayloadEventToCard);

  const dateRangeLabel = mappedEvents.length
    ? `Nächste Termine: ${mappedEvents[0].dateFull} – ${mappedEvents[mappedEvents.length - 1].dateFull}`
    : 'Keine Termine verfügbar';

  return (
    <main className="min-h-screen bg-[#FBFCFC] pt-32 pb-24">
      <div className="container mx-auto px-6 lg:px-12 max-w-6xl space-y-8">
        <div>
          <p className="text-ppt-pink font-bold uppercase tracking-widest text-sm">Veranstaltungen</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-ppt-blue mt-3">
            Alle Events im Überblick
          </h1>
        </div>

        <EventsListingClient
          events={mappedEvents}
          locations={locations}
          speakers={speakers}
          dateRangeLabel={dateRangeLabel}
        />
      </div>
    </main>
  );
}

export const metadata: Metadata = {
  title: 'Veranstaltungen',
  description: 'Alle kommenden Veranstaltungen und Events von PPT-Events.',
};
